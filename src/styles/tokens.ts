export const DESIGN_TOKENS = {
  colors: {
    light: {
      primary: "#C8262E", // Pharmacy Red - اللون الأحمر الأساسي من اللوجو
      primaryContainer: "#A91F27", // Deep Red - للـ buttons / active states / emphasis
      secondary: "#173E73", // Yahia Navy Blue - الأزرق الأساسي من اللوجو
      secondaryContainer: "#24558F", // Brighter Navy Blue
      background: "#F8FAFC", // Clean Medical Background
      surface: "#FFFFFF",
      onBackground: "#172033",
      onSurface: "#172033",
      error: "#DC2626",
    },
    dark: {
      primary: "#F0525B", // Brighter Pharmacy Red for dark backgrounds
      primaryContainer: "#C8262E", // Original Brand Red
      secondary: "#6EA1D8", // Soft Medical Blue
      secondaryContainer: "#294F7D",
      background: "#0C1420", // Deep Navy Background
      surface: "#131E2B",
      onBackground: "#F8FAFC",
      onSurface: "#F8FAFC",
      error: "#F87171",
    },
  },
  fonts: [
    { id: "cairo", label: "Cairo", family: '"Cairo", sans-serif' },
    { id: "tajawal", label: "Tajawal", family: '"Tajawal", sans-serif' },
    {
      id: "ibm-plex",
      label: "IBM Plex Sans Arabic",
      family: '"IBM Plex Sans Arabic", sans-serif',
    },
    { id: "inter", label: "Inter", family: '"Inter", sans-serif' },
    { id: "poppins", label: "Poppins", family: '"Poppins", sans-serif' },
  ],
  roundness: {
    sm: "0.25rem",
    DEFAULT: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
  spacing: {
    unit: "8px",
    containerMax: "1280px",
    gutter: "24px",
    marginMobile: "16px",
    marginDesktop: "32px",
    sidebarWidth: "280px",
  },
};
