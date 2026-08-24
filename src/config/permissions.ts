/**
 * RBAC Permission Constants for the Dashboard.
 */
export const PERMISSIONS = {
  DASHBOARD: {
    VIEW: 'dashboard.view',
    OVERVIEW: 'dashboard.overview',
  },
  USERS: {
    VIEW: 'dashboard.users.view',
    CREATE: 'dashboard.users.create',
    EDIT: 'dashboard.users.edit',
    DELETE: 'dashboard.users.delete',
  },
  SETTINGS: {
    VIEW: 'dashboard.settings.view',
    EDIT: 'dashboard.settings.edit',
  },
} as const;

export type PermissionKey =
  | (typeof PERMISSIONS.DASHBOARD)[keyof typeof PERMISSIONS.DASHBOARD]
  | (typeof PERMISSIONS.USERS)[keyof typeof PERMISSIONS.USERS]
  | (typeof PERMISSIONS.SETTINGS)[keyof typeof PERMISSIONS.SETTINGS];
