## Local Project setup
The app uses AWS Cognito for authentication and authorization. These env vars (found in .env file) are needed to run the app in any environment. You can find these in the Outputs of your CloudFOrmation stack if you used the bootstrap.yaml file.
- VUE_APP_IDENTITY_POOL_ID
- VUE_APP_REGION
- VUE_APP_USER_POOL_ID
- VUE_APP_WEB_CLIENT_ID


Then run:
```
npm install
npm run serve
```

## Deployment
Runs a static production build of Vue.js, served by Nginx. Using AWS Cognito and AWS Amplify to authenticate, this simple webapp generates a simple sign-in page and landing page which allows for uploading to an S3 bucket.
