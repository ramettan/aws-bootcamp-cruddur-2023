# Week 3 — Decentralized Authentication

Create aws cognito user pool

Install aws amplify in front end directory

npm i aws-amplify --save

Add amplify modules in the code:

import { Amplify } from 'aws-amplify'

Amplify.configure({
    "AWS_PROJECT_REGION": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_cognito_region": process.env.REACT_APP_AWS_COGNITO_REGION,
    "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_CLIENT_ID,
    "oauth": {},
    Auth: {
        // We are not using an Identity Pool
        // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
        region: process.env.REACT_APP_AWS_PROJECT_REGION,         // REQUIRED - Amazon Cognito Region
        userPoolId: process.env.REACT_APP_AWS_USER_POOLS_ID,      // OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID // OPTIONAL - Amazon Cognito Web Client ID
    }
});


Update Dockercompose for frontend

Update the environment variables,
      REACT_APP_BACKEND_URL: 
      REACT_APP_AWS_PROJECT_REGION: 
      REACT_APP_AWS_COGNITO_REGION: 
      REACT_APP_AWS_USER_POOLS_ID: 
      REACT_APP_CLIENT_ID: 


Conditionally show components based on logged in or logged out 




#after making all the js changes:

aws cognito-idp admin-set-user-password --username <> --password <>--user-pool-id us-east-1_0eypH1BzF --permanent

This has to be ran inorder to make the user confirmed
