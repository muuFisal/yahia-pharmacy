/**
 * Dashboard Route Definitions & Nav Items.
 */
export interface DashboardRouteConfig {
  path: string;
  label: string;
  icon: string;
  permission?: string | string[];
}

export const DASHBOARD_NAV_ITEMS: DashboardRouteConfig[] = [
  {
    path: '/admin/dashboard',
    label: 'نظرة عامة',
    icon: 'dashboard',
  },
];
