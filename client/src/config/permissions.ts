/**
 * Centralized Permissions Configuration
 * 
 * This file defines all permissions used throughout the application.
 * Use these constants with PermissionGuard to protect routes and features.
 * 
 * Permission naming convention: PERMISSIONS.[feature].[action]
 */

export const PERMISSIONS = {
  // Chat permissions
  chat: {
    view: 'chat.view',
    create: 'chat.create',
    delete: 'chat.delete',
    manage: 'chat.manage',
    viewAll: 'chat.view_all',
  },
  
  // User permissions
  users: {
    view: 'users.view',
    create: 'users.create',
    edit: 'users.edit',
    delete: 'users.delete',
    manage: 'users.manage',
  },
  
  // Message permissions
  messages: {
    send: 'messages.send',
    edit: 'messages.edit',
    delete: 'messages.delete',
    viewHistory: 'messages.view_history',
  },
  
  // Group/Channel permissions
  groups: {
    view: 'groups.view',
    create: 'groups.create',
    edit: 'groups.edit',
    delete: 'groups.delete',
    manage: 'groups.manage',
    invite: 'groups.invite',
    kick: 'groups.kick',
  },
  
  // Admin permissions
  admin: {
    viewDashboard: 'admin.view_dashboard',
    manageUsers: 'admin.manage_users',
    viewLogs: 'admin.view_logs',
    systemSettings: 'admin.system_settings',
  },
  
  // Settings permissions
  settings: {
    viewProfile: 'settings.view_profile',
    editProfile: 'settings.edit_profile',
    viewPreferences: 'settings.view_preferences',
    editPreferences: 'settings.edit_preferences',
  },
} as const;

// Type helper to extract all permission values
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS][keyof typeof PERMISSIONS[keyof typeof PERMISSIONS]];

// Helper function to check if user has permission
export const hasPermission = (userPermissions: string[], requiredPermission: string): boolean => {
  return userPermissions.includes(requiredPermission);
};

// Helper function to check if user has any of the required permissions
export const hasAnyPermission = (userPermissions: string[], requiredPermissions: string[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

// Helper function to check if user has all required permissions
export const hasAllPermissions = (userPermissions: string[], requiredPermissions: string[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};
