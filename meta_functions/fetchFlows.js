const dotenv = require("dotenv").config({ path: '/_Code/CP Audio/.env' })
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const fs = require('fs');
const client = require('twilio')(accountSid, authToken);

client.studio.flows('FW59ba18decc7add221ede94d0f24e6974')
    .revisions("LatestPublished")
    .fetch()
    .then(flow => fs.writeFileSync("CP Audio/flowPublished.json", (JSON.stringify(flow, null, 2))))

client.studio.flows('FW59ba18decc7add221ede94d0f24e6974')
    .revisions("LatestRevision")
    .fetch()
    .then(flow => fs.writeFileSync("CP Audio/flowLatestRevision.json", (JSON.stringify(flow, null, 2))))

