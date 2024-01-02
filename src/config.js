const { 
  VITE_USER_POOL_CLIENT_ID,
  VITE_USER_POOL_ID,
  VITE_AWS_REGION,
  VITE_AUTH_URL,
  VITE_API_URL
} = import.meta.env;

export const config = {
  Auth: {
    Cognito: {
      userPoolId: VITE_USER_POOL_ID,
      userPoolClientId: VITE_USER_POOL_CLIENT_ID,
      region: VITE_AWS_REGION,
      loginWith: {
        oauth: {
          domain: VITE_AUTH_URL,
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: ['http://localhost:8080'],
          redirectSignOut: ['http://localhost:8080'],
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
      }
    } 
  },
  API: {
    REST: {
      SkillsApi:{
        endpoint: VITE_API_URL,
        region: VITE_AWS_REGION,
      }
    }
  }
}
