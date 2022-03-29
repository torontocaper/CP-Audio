const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.studio.flows('FW59ba18decc7add221ede94d0f24e6974')
             .fetch()
             .then(flow => console.log(flow.friendlyName));
