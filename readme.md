# CP Audio

## An app for reporters to record phone calls

This app was born out of necessity: when the pandemic struck in March of 2020, millions of people had to learn how to work remotely.

For reporters at The Canadian Press, this meant finding new ways to record interviews and file broadcast-quality audio clips.

In the Before Times, that involved a landline phone, a mixer and a desktop; without that equipment, reporters had to improvise.

This often resulted in poor-quality audio or, worse, lost recordings from using third-party apps.

As a supervisor in the Broadcast department, I felt an urgent need to address this issue.

I couldn't find an existing app or service that did the job, so I built my own.

Using Twilio's low/no-code "Studio" platform, I made a simple call-recording app that reporters could access from anywhere.

![Screenshot of a Twilio "flow" -- a flow chart showing what happens when a call comes in to the CP Audio app.](https://github.com/torontocaper/CP-Audio/assets/79330948/8bdc8c25-3b92-48fa-9e79-6cf1ec3b7cf3)

It works by creating a conference call between the reporter, their source and a third number, which we rent from Twilio.

When the call completes, the reporter gets a text message with a link to the recording. Easy-peasy.

If you have any questions about the app, let me know!
