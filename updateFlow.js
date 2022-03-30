const dotenv = require("dotenv").config({ path: '/_Code/CP Audio/.env' })
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const fs = require('fs');
const { validateExpressRequest } = require("twilio/lib/webhooks/webhooks");
const client = require('twilio')(accountSid, authToken);

client.studio.flows