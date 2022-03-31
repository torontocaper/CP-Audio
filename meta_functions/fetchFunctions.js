const dotenv = require("dotenv").config({ path: '/_Code/CP Audio/.env' })
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.serverless.services('ZSb45ac352e64c1b69f6d9de1de1eea472')
                 .functions('ZH19d5a88153854c3d7ce7ea2f8bebd69a')
                 .functionVersions('ZN7749f2739e1e10053ea4fa3ef8941805')
                 .functionVersionContent()
                 .fetch()
                 .then(function_version_content => console.log(function_version_content.content))