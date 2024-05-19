/*
 * 인증이 요구되지 않는 public routes
 * @type {string[]}
 */
export const publicRoutes = ['/auth/login'];

/*
 * 인증이 요구되는 routes
 * DEFAULT_LOGIN_REDIRECT로 redirect
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/*
 * 이 prefix로 시작하는 routes는 API 인증 목적
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/*
 * 로그인 후 redirect path
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
