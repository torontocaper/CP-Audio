const dotenv = require("dotenv").config({ path: '/_Code/CP Audio/.env' })
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const fs = require('fs');
const { validateExpressRequest } = require("twilio/lib/webhooks/webhooks");
const client = require('twilio')(accountSid, authToken);

//this is asynchronous
async function validateFlow() {
    let validBool = await client.studio.flowValidate.update(
    {
        "friendlyName": "Record Calls",
        "status": "published",
        "definition": {
            "states": [
              {
                "transitions": [
                  {
                    "event": "incomingMessage"
                  },
                  {
                    "event": "incomingCall",
                    "next": "playWelcome"
                  },
                  {
                    "event": "incomingRequest"
                  },
                  {
                    "event": "incomingParent"
                  }
                ],
                "type": "trigger",
                "name": "Trigger",
                "properties": {
                  "offset": {
                    "y": 10,
                    "x": -40
                  }
                }
              },
              {
                "transitions": [
                  {
                    "event": "audioComplete",
                    "next": "recordCall"
                  }
                ],
                "type": "say-play",
                "name": "playWelcome",
                "properties": {
                  "play": "https://cp-audio-1354.twil.io/greeting.mp3",
                  "language": "en-CA",
                  "loop": 1,
                  "offset": {
                    "y": 290,
                    "x": 150
                  }
                }
              },
              {
                "transitions": [
                  {
                    "event": "recordingComplete",
                    "next": "getTinyUrl"
                  },
                  {
                    "event": "noAudio"
                  },
                  {
                    "event": "hangup",
                    "next": "getTinyUrl"
                  }
                ],
                "type": "record-voicemail",
                "name": "recordCall",
                "properties": {
                  "trim": "do-not-trim",
                  "transcribe": false,
                  "play_beep": "false",
                  "max_length": 14400,
                  "timeout": 0,
                  "offset": {
                    "y": 420,
                    "x": -470
                  },
                  "recording_status_callback_url": "https://hooks.zapier.com/hooks/catch/8909275/bs3v917/",
                  "finish_on_key": "9"
                }
              },
              {
                "transitions": [
                  {
                    "event": "sent",
                    "next": "sendLongMp3"
                  },
                  {
                    "event": "failed"
                  }
                ],
                "type": "send-message",
                "name": "sendLongWav",
                "properties": {
                  "body": "Here's your tape (in WAV form): {{widgets.recordCall.RecordingUrl}}",
                  "from": "{{trigger.call.To}}",
                  "service": "{{trigger.message.InstanceSid}}",
                  "to": "{{trigger.call.From}}",
                  "offset": {
                    "y": 920,
                    "x": 520
                  },
                  "channel": "{{trigger.message.ChannelSid}}"
                }
              },
              {
                "transitions": [
                  {
                    "event": "sent",
                    "next": "sendWarning"
                  },
                  {
                    "event": "failed"
                  }
                ],
                "type": "send-message",
                "name": "sendLongMp3",
                "properties": {
                  "body": "Here's an mp3: {{widgets.recordCall.RecordingUrl}}.mp3",
                  "from": "{{trigger.call.To}}",
                  "service": "{{trigger.message.InstanceSid}}",
                  "to": "{{trigger.call.From}}",
                  "offset": {
                    "y": 1190,
                    "x": 520
                  },
                  "channel": "{{trigger.message.ChannelSid}}"
                }
              },
              {
                "transitions": [
                  {
                    "event": "sent"
                  },
                  {
                    "event": "failed"
                  }
                ],
                "type": "send-message",
                "name": "sendWarning",
                "properties": {
                  "body": "Links expire in 14 days; please download your file(s) soon and store them locally or in OneDrive. Thanks for using CP Audio! Questions? Comments? amb@cp.org",
                  "from": "{{trigger.call.To}}",
                  "service": "{{trigger.message.InstanceSid}}",
                  "to": "{{trigger.call.From}}",
                  "offset": {
                    "y": 1460,
                    "x": 480
                  },
                  "channel": "{{trigger.message.ChannelSid}}"
                }
              },
              {
                "transitions": [
                  {
                    "event": "success",
                    "next": "sendTinyUrl"
                  },
                  {
                    "event": "failed",
                    "next": "sendLongWav"
                  }
                ],
                "type": "make-http-request",
                "name": "getTinyUrl",
                "properties": {
                  "body": "{\n\"url\": \"{{widgets.recordCall.RecordingUrl}} \"\n}",
                  "url": "https://api.tinyurl.com/create?api_token=tOwrJCDH18v4a8GTenseL1ji8EzUO6LRO5Ebmeg9geQk8FuiivBYmddEJ9lY",
                  "method": "POST",
                  "content_type": "application/json;charset=utf-8",
                  "offset": {
                    "y": 650,
                    "x": 130
                  }
                }
              },
              {
                "transitions": [
                  {
                    "event": "sent"
                  },
                  {
                    "event": "failed"
                  }
                ],
                "type": "send-message",
                "name": "sendTinyUrl",
                "properties": {
                  "body": "Here's your tape (in .wav form): {{widgets.getTinyUrl.parsed.data.tiny_url}}. Get an mp3 by adding \".mp3\" to the full URL. Links expire in 14 days; download your files soon!",
                  "from": "{{flow.channel.address}}",
                  "service": "{{trigger.message.InstanceSid}}",
                  "to": "{{contact.channel.address}}",
                  "offset": {
                    "y": 1300,
                    "x": 0
                  },
                  "channel": "{{trigger.message.ChannelSid}}"
                }
              }
            ],
            "initial_state": "Trigger",
            "flags": {
              "allow_concurrent_calls": true
            },
            "description": "A New Flow"
          },
        "commitMessage": "Re-directed 'Say/Play' to new asset"
    })
    console.log(validBool)
}

validateFlow();
