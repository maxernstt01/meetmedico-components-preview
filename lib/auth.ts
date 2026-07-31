// A soft, client-side-only gate in front of the component library - a single
// hardcoded credential checked in the browser, no backend/session involved.
// Shared between the login page (which sets it) and RequireAuth (which reads it).
export const AUTH_STORAGE_KEY = 'mm-components-authed';
export const DEFAULT_EMAIL = 'admin@meetmedico.com';
export const DEFAULT_PASSWORD = '123123';
