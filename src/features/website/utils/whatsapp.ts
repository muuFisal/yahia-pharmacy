/**
 * WhatsApp Helper Utilities for Yahia Pharmacy (صيدلية يحيى)
 */

export const DEFAULT_PHARMACY_PHONE = '201000000000'; // Default phone number (customizable)

export interface WhatsAppOrderParams {
  productName: string;
  price: number | string;
  originalPrice?: number | string;
  category?: string;
  productId?: string | number;
  phone?: string;
  customNote?: string;
  language?: string;
}

const getCurrentLanguage = (override?: string): string => {
  if (override) return override;
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('language') || 'ar';
  }
  return 'ar';
};

/**
 * Generate a WhatsApp chat URL with a pre-filled bilingual message for ordering a product
 */
export const createWhatsAppOrderUrl = ({
  productName,
  price,
  originalPrice,
  category,
  productId,
  phone = DEFAULT_PHARMACY_PHONE,
  customNote,
  language
}: WhatsAppOrderParams): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const isEn = getCurrentLanguage(language) === 'en';

  // Build a polite, organized order message in selected language
  const lines = isEn
    ? [
        'Hello, I would like to order this item from Yahia Pharmacy 💊:',
        `• Product: *${productName}*`,
        category ? `• Category: ${category}` : '',
        originalPrice
          ? `• Offer Price: *${price} EGP* (was ~${originalPrice} EGP~)`
          : `• Price: *${price} EGP*`,
        productId ? `• SKU/ID: #${productId}` : '',
        customNote ? `• Notes: ${customNote}` : '',
        '',
        '📍 Please confirm product availability and delivery details to my address.'
      ].filter(Boolean)
    : [
        'السلام عليكم، أود طلب هذا المنتج من صيدلية يحيى 💊:',
        `• اسم المنتج: *${productName}*`,
        category ? `• القسم: ${category}` : '',
        originalPrice
          ? `• السعر في العرض: *${price} ج.م* (بدلاً من ~${originalPrice} ج.م~)`
          : `• السعر: *${price} ج.م*`,
        productId ? `• كود المنتج: #${productId}` : '',
        customNote ? `• ملاحظات إضافية: ${customNote}` : '',
        '',
        '📍 برجاء تأكيد توفر المنتج وتفاصيل التوصيل للعنوان.'
      ].filter(Boolean);

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanPhone}?text=${message}`;
};

/**
 * Generate a WhatsApp chat URL for sending a medical prescription (روشتة)
 */
export const createPrescriptionWhatsAppUrl = (
  phone = DEFAULT_PHARMACY_PHONE,
  language?: string
): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const isEn = getCurrentLanguage(language) === 'en';

  const text = isEn
    ? 'Hello, I would like to send my medical prescription 📋 for preparation and delivery to my address.\n\n(Prescription photo attached in next message)'
    : 'السلام عليكم، أود إرسال صورة الروشتة الطبية 📋 لتحضير الأدوية وتوصيلها إلى العنوان.\n\n(مرفق صورة الروشتة في الرسالة التالية)';

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};

/**
 * Generate a WhatsApp chat URL for general pharmacy consultation / inquiry
 */
export const createConsultationWhatsAppUrl = (
  phone = DEFAULT_PHARMACY_PHONE,
  language?: string
): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const isEn = getCurrentLanguage(language) === 'en';

  const text = isEn
    ? 'Hello, I would like to consult the pharmacist regarding a medical inquiry or medication 🩺'
    : 'السلام عليكم، أود استشارة الصيدلي بخصوص استفسار طبي أو دواء 🩺';

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};
