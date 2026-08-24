export const DESIGN_TOKENS = {
  colors: {
    light: {
      primary: '#3525cd',
      primaryContainer: '#4f46e5',
      secondary: '#855300',
      secondaryContainer: '#fea619',
      background: '#fcf8ff',
      surface: '#fcf8ff',
      onBackground: '#1b1b24',
      onSurface: '#1b1b24',
      error: '#ba1a1a',
    },
    dark: {
      primary: '#c3c0ff',
      primaryContainer: '#4f46e5',
      secondary: '#ffb95f',
      secondaryContainer: '#855300',
      background: '#0f172a',
      surface: '#1e293b',
      onBackground: '#f8fafc',
      onSurface: '#f8fafc',
      error: '#ff8172ff',
    }
  },
  fonts: [
    { id: 'cairo', label: 'Cairo', family: '"Cairo", sans-serif' },
    { id: 'tajawal', label: 'Tajawal', family: '"Tajawal", sans-serif' },
    { id: 'ibm-plex', label: 'IBM Plex Sans Arabic', family: '"IBM Plex Sans Arabic", sans-serif' },
    { id: 'inter', label: 'Inter', family: '"Inter", sans-serif' },
    { id: 'poppins', label: 'Poppins', family: '"Poppins", sans-serif' }
  ],
  roundness: {
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px'
  },
  spacing: {
    unit: '8px',
    containerMax: '1280px',
    gutter: '24px',
    marginMobile: '16px',
    marginDesktop: '32px',
    sidebarWidth: '280px'
  }
};
