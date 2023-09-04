// ** Auth Endpoints
export default {
  loginEndpoint: '/auth/login',
  registerEndpoint: '/api/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/auth/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: '',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
