/**
 * Processes HTML content for preview rendering:
 * 1. Decodes escaped HTML entities if present (e.g. &lt;h1&gt; -> <h1>)
 * 2. Removes leading empty tags or line breaks (<br>, <h1></h1>, etc.)
 */
export const processHtmlContent = (htmlString?: string): string => {
  if (!htmlString) return '';
  let content = htmlString.trim();

  // If HTML entities are present (&lt;, &gt;), decode them using DOMParser
  if (typeof window !== 'undefined' && (content.includes('&lt;') || content.includes('&gt;'))) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const decoded = doc.body.textContent || '';
      if (decoded && (decoded.includes('<') || decoded.includes('>'))) {
        content = decoded;
      }
    } catch {
      // Fallback if parsing fails
    }
  }

  // Remove leading empty tags or line breaks repeatedly
  let prev = '';
  while (prev !== content) {
    prev = content;
    content = content
      .replace(/^<br\s*\/?>/gi, '')
      .replace(/^<([a-z0-9]+)[^>]*>\s*(<br\s*\/?>|&nbsp;|\s*)*<\/\1>/gi, '')
      .trim();
  }

  return content;
};

/**
 * Formats a WhatsApp link or phone number into a valid target URL.
 * Supports:
 * - Full URLs: https://whatsapp.com/channel/xxx, https://chat.whatsapp.com/xxx, https://wa.me/xxx
 * - Direct phone numbers: 01090493299, +201090493299, etc.
 */
export const formatWhatsappUrl = (val?: string | null): string => {
  if (!val || val === '#') return '#';
  const trimmed = val.trim();
  if (!trimmed || trimmed === '#') return '#';

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const cleanNumber = trimmed.replace(/[\s+-]/g, '');
  return `https://wa.me/${cleanNumber}`;
};
