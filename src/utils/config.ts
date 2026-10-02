/**
 * Global application configuration and environment variables.
 */
export const Config = {
  baseUrl: process.env.BASE_URL || 'https://blazedemo.com',
  defaultTimeout: 30000,
  actionTimeout: 10000,
  navigationTimeout: 15000,
  isCI: !!process.env.CI,
};
