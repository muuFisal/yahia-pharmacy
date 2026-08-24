import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  dir?: 'rtl' | 'ltr' | 'auto';
  className?: string;
  disabled?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = '',
  label,
  error,
  dir = 'auto',
  className = '',
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const { language } = useLanguage();

  // Link Modal States
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  // Toolbar Labels Dictionary (Translated)
  const labels = {
    undo: language === 'ar' ? 'تراجع' : 'Undo',
    redo: language === 'ar' ? 'إعادة' : 'Redo',
    bold: language === 'ar' ? 'خط عريض' : 'Bold',
    italic: language === 'ar' ? 'خط مائل' : 'Italic',
    underline: language === 'ar' ? 'خط تحت النص' : 'Underline',
    strikeThrough: language === 'ar' ? 'خط وسط النص' : 'Strikethrough',
    justifyLeft: language === 'ar' ? 'محاذاة لليسار' : 'Align Left',
    justifyCenter: language === 'ar' ? 'محاذاة للوسط' : 'Align Center',
    justifyRight: language === 'ar' ? 'محاذاة لليمين' : 'Align Right',
    justifyFull: language === 'ar' ? 'ضبط كامل' : 'Justify',
    foreColor: language === 'ar' ? 'لون الخط' : 'Text Color',
    bgColor: language === 'ar' ? 'لون الخلفية' : 'Background Color',
    bulletList: language === 'ar' ? 'قائمة نقطية' : 'Bulleted List',
    numberList: language === 'ar' ? 'قائمة مرقمة' : 'Numbered List',
    insertLink: language === 'ar' ? 'إدراج رابط' : 'Insert Link',
    removeLink: language === 'ar' ? 'إزالة الرابط' : 'Remove Link',
    clearFormat: language === 'ar' ? 'مسح التنسيق' : 'Clear Formatting',
    viewHtml: language === 'ar' ? 'عرض كود HTML' : 'View HTML Source',
    formatting: language === 'ar' ? 'تنسيق الخط' : 'Formatting',
  };

  // Keep track of active formatting states
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  });

  // Sync value from prop only if it is different from editor's current innerHTML
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      onChange(currentHtml);
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (isHtmlMode) return;
    
    // Focus back on editor before executing command
    editorRef.current?.focus();
    
    document.execCommand(command, false, value);
    
    // Trigger change
    handleInput();
    
    // Update active toolbar states
    updateToolbarStates();
  };

  const updateToolbarStates = () => {
    setActiveStyles({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      justifyFull: document.queryCommandState('justifyFull'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
    });
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const toggleHtmlMode = () => {
    if (isHtmlMode) {
      // Sync back raw HTML to contenteditable div
      if (editorRef.current) {
        editorRef.current.innerHTML = value;
      }
    }
    setIsHtmlMode(!isHtmlMode);
  };

  const openLinkModal = () => {
    if (isHtmlMode) return;

    // Save Selection Range
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0));
      setLinkText(selection.toString());
    } else {
      setSavedRange(null);
      setLinkText('');
    }
    setLinkUrl('');
    setIsLinkModalOpen(true);
  };

  const handleInsertLink = () => {
    setIsLinkModalOpen(false);
    if (!linkUrl) return;

    // Focus and Restore Range
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (selection && savedRange) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }

    // Insert Link using HTML template or createLink command
    if (linkText) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">${linkText}</a>`;
      document.execCommand('insertHTML', false, linkHtml);
    } else {
      document.execCommand('createLink', false, linkUrl);
    }

    // Trigger input sync
    handleInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInsertLink();
    }
  };

  // Preset Colors for Palette
  const colors = [
    '#000000', '#4b5563', '#d1d5db', '#ef4444', 
    '#f97316', '#eab308', '#22c55e', '#3b82f6', 
    '#6366f1', '#a855f7', '#ec4899', '#ffffff'
  ];

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-bold text-on-surface">
          {label}
        </label>
      )}

      <div className={`border rounded-xl bg-surface overflow-hidden flex flex-col transition-all duration-200 ${
        error 
          ? 'border-error ring-2 ring-error/10' 
          : 'border-outline-variant/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
      }`}>
        
        {/* Editor Toolbar */}
        <div className={`bg-surface-container-low border-b border-outline-variant/20 px-3 py-2 flex flex-wrap gap-1 items-center select-none ${
          disabled ? 'pointer-events-none opacity-40 bg-slate-100 dark:bg-slate-800/40' : ''
        }`}>
          
          {/* Undo/Redo */}
          <button
            type="button"
            onClick={() => executeCommand('undo')}
            disabled={isHtmlMode}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            title={labels.undo}
          >
            <span className="material-symbols-outlined text-[18px]">undo</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('redo')}
            disabled={isHtmlMode}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            title={labels.redo}
          >
            <span className="material-symbols-outlined text-[18px]">redo</span>
          </button>

          <div className="w-[1px] h-5 bg-outline-variant/30 mx-1"></div>

          {/* Heading Dropdown */}
          <select
            onChange={(e) => executeCommand('formatBlock', e.target.value)}
            disabled={isHtmlMode}
            className="h-8 px-2 text-xs font-bold rounded-lg border border-outline-variant/20 bg-surface text-on-surface-variant outline-none focus:border-primary disabled:opacity-40 cursor-pointer"
            defaultValue="<div>"
            title={labels.formatting}
          >
            <option value="<p>">{dir === 'rtl' ? 'فقرة عادية' : 'Normal Text'}</option>
            <option value="<h1>">{dir === 'rtl' ? 'عنوان رئيسي H1' : 'Heading 1'}</option>
            <option value="<h2>">{dir === 'rtl' ? 'عنوان فرعي H2' : 'Heading 2'}</option>
            <option value="<h3>">{dir === 'rtl' ? 'عنوان H3' : 'Heading 3'}</option>
            <option value="<pre>">{dir === 'rtl' ? 'كود برمجى' : 'Code Block'}</option>
          </select>

          <div className="w-[1px] h-5 bg-outline-variant/30 mx-1"></div>

          {/* Bold, Italic, Underline, Strike */}
          <button
            type="button"
            onClick={() => executeCommand('bold')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.bold 
                ? 'bg-primary/10 text-primary font-bold' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.bold}
          >
            <span className="material-symbols-outlined text-[18px] font-bold">format_bold</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('italic')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.italic 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.italic}
          >
            <span className="material-symbols-outlined text-[18px]">format_italic</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('underline')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.underline 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.underline}
          >
            <span className="material-symbols-outlined text-[18px]">format_underlined</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('strikeThrough')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.strikeThrough 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.strikeThrough}
          >
            <span className="material-symbols-outlined text-[18px]">strikethrough_s</span>
          </button>

          <div className="w-[1px] h-5 bg-outline-variant/30 mx-1"></div>

          {/* Alignments */}
          <button
            type="button"
            onClick={() => executeCommand('justifyLeft')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.justifyLeft 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.justifyLeft}
          >
            <span className="material-symbols-outlined text-[18px]">format_align_left</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('justifyCenter')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.justifyCenter 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.justifyCenter}
          >
            <span className="material-symbols-outlined text-[18px]">format_align_center</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('justifyRight')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.justifyRight 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.justifyRight}
          >
            <span className="material-symbols-outlined text-[18px]">format_align_right</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('justifyFull')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.justifyFull 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.justifyFull}
          >
            <span className="material-symbols-outlined text-[18px]">format_align_justify</span>
          </button>

          <div className="w-[1px] h-5 bg-outline-variant/30 mx-1"></div>

          {/* Color pickers */}
          <div className="relative group/color flex items-center">
            <button
              type="button"
              disabled={isHtmlMode}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 transition-all cursor-pointer"
              title={labels.foreColor}
            >
              <span className="material-symbols-outlined text-[18px]">format_color_text</span>
            </button>
            <div className="hidden group-focus-within/color:flex group-hover/color:flex absolute top-full left-0 z-35 bg-surface border border-outline-variant/20 p-2 rounded-xl shadow-lg grid grid-cols-4 gap-1 mt-1 transition-all">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => executeCommand('foreColor', c)}
                  className="w-5 h-5 rounded-full border border-outline-variant/10 cursor-pointer hover:scale-110 active:scale-95 transition-all"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="relative group/bg flex items-center">
            <button
              type="button"
              disabled={isHtmlMode}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 transition-all cursor-pointer"
              title={labels.bgColor}
            >
              <span className="material-symbols-outlined text-[18px]">format_color_fill</span>
            </button>
            <div className="hidden group-focus-within/bg:flex group-hover/bg:flex absolute top-full left-0 z-35 bg-surface border border-outline-variant/20 p-2 rounded-xl shadow-lg grid grid-cols-4 gap-1 mt-1 transition-all">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => executeCommand('hiliteColor', c)}
                  className="w-5 h-5 rounded-full border border-outline-variant/10 cursor-pointer hover:scale-110 active:scale-95 transition-all"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="w-[1px] h-5 bg-outline-variant/30 mx-1"></div>

          {/* List items */}
          <button
            type="button"
            onClick={() => executeCommand('insertUnorderedList')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.insertUnorderedList 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.bulletList}
          >
            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('insertOrderedList')}
            disabled={isHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              activeStyles.insertOrderedList 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            } disabled:opacity-40`}
            title={labels.numberList}
          >
            <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
          </button>

          <div className="w-[1px] h-5 bg-outline-variant/30 mx-1"></div>

          {/* Links */}
          <button
            type="button"
            onClick={openLinkModal}
            disabled={isHtmlMode}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 transition-all cursor-pointer"
            title={labels.insertLink}
          >
            <span className="material-symbols-outlined text-[18px]">link</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('unlink')}
            disabled={isHtmlMode}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 transition-all cursor-pointer"
            title={labels.removeLink}
          >
            <span className="material-symbols-outlined text-[18px]">link_off</span>
          </button>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => executeCommand('removeFormat')}
            disabled={isHtmlMode}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface disabled:opacity-40 transition-all cursor-pointer"
            title={labels.clearFormat}
          >
            <span className="material-symbols-outlined text-[18px]">format_clear</span>
          </button>

          <div className="flex-1"></div>

          {/* Toggle HTML view */}
          <button
            type="button"
            onClick={toggleHtmlMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              isHtmlMode 
                ? 'bg-primary/15 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
            title={labels.viewHtml}
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="relative w-full bg-surface-container-lowest">
          {isHtmlMode ? (
            <textarea
              value={value}
              onChange={handleHtmlChange}
              disabled={disabled}
              className="w-full min-h-[220px] p-4 outline-none bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed border-0"
              style={{ direction: 'ltr' }}
              placeholder="&lt;p&gt;Write raw HTML here...&lt;/p&gt;"
            />
          ) : (
            <div
              ref={editorRef}
              contentEditable={!disabled}
              onInput={handleInput}
              onKeyUp={updateToolbarStates}
              onMouseUp={updateToolbarStates}
              dir={dir}
              className={`w-full min-h-[220px] p-4 outline-none text-on-surface text-sm leading-relaxed prose prose-sm max-w-none focus:prose-headings:text-primary dark:prose-invert overflow-y-auto ${
                disabled ? 'bg-slate-50/50 dark:bg-slate-800/5 cursor-not-allowed opacity-80' : ''
              }`}
              style={{
                direction: dir === 'auto' ? undefined : dir,
              }}
            />
          )}

          {/* Placeholder Overlay */}
          {!isHtmlMode && !value && placeholder && (
            <div 
              className={`absolute top-4 pointer-events-none text-xs font-bold text-on-surface-variant/40 ${
                dir === 'rtl' ? 'right-4 text-right' : 'left-4 text-left'
              }`}
            >
              {placeholder}
            </div>
          )}
        </div>
      </div>

      {error && (
        <span className="text-xs text-error font-medium">
          {error}
        </span>
      )}

      {/* Insert Link Premium Modal */}
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title={labels.insertLink}
        className="max-w-sm"
      >
        <div onKeyDown={handleKeyDown} className="flex flex-col gap-5 text-right rtl:text-right ltr:text-left">
          <Input
            label={language === 'ar' ? 'رابط URL' : 'Link URL'}
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="py-2.5 text-sm"
            autoFocus
          />
          <Input
            label={language === 'ar' ? 'النص المعروض (اختياري)' : 'Link Text (Optional)'}
            type="text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder={language === 'ar' ? 'اضغط هنا للزيارة...' : 'Click here to visit...'}
            className="py-2.5 text-sm"
          />
          
          <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/10">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsLinkModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-bold text-sm"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleInsertLink}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-white"
            >
              {language === 'ar' ? 'إدراج' : 'Insert'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
