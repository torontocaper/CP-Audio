const dotenv = require("dotenv").config({ path: '/_Code/CP Audio/.env' })
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.serverless.services('ZSb45ac352e64c1b69f6d9de1de1eea472')
                 .functions('ZHb117db7435c94cf9151cc750c53dd92b')
                 .remove();