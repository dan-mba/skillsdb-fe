import {Auth} from 'aws-amplify';

const { 
  VITE_USER_POOL_CLIENT_ID,
  VITE_USER_POOL_ID,
  VITE_AWS_REGION,
  VITE_API_URL
} = import.meta.env;

export const config = {
  Auth: {
    userPoolId: VITE_USER_POOL_ID,
    userPoolWebClientId: VITE_USER_POOL_CLIENT_ID,
    region: VITE_AWS_REGION,
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