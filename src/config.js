import {Auth} from 'aws-amplify';

const { 
  VITE_USER_POOL_CLIENT_ID,
  VITE_USER_POOL_ID,
  VITE_AWS_REGION,
  VITE_AUTH_URL,
  VITE_API_URL
} = import.meta.env;

export const config = {
  Auth: {
    userPoolId: VITE_USER_POOL_ID,
    userPoolWebClientId: VITE_USER_POOL_CLIENT_ID,
    region: VITE_AWS_REGION,
    oauth: {
      domain: VITE_AUTH_URL,
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'http://localhost:8080',
      redirectSignOut: 'http://localhost:8080',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  }
  },
  API: {
    endpoints: [
      {
        name: 'SkillsApi',
        endpoint: VITE_API_URL,
        custom_header: async () => {
          const token = await Auth.currentSession();
          return {
            Authorization: `Bearer ${token.getAccessToken().getJwtToken()}`
          };
        },
      }
    ]
  }
}