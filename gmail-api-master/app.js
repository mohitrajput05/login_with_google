const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '742259376043-q6fer0npkfncv5ibjavt2dsifcpt9d8a.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04hCD6x7ycYLMCgYIARAAGAQSNgF-L9IrD9qB2-BJt5QCOWm6dE8N8xE7Dhz4iJlV6mcRDuPnh_g0F4pTSYoG5gSEGTuGrIdRqQ';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mohit.ibfoundation@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Mohit Rajput🙂<mohit.ibfoundtion@gmail.com>',
      to: 'mohit.ibfoundation@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>' +
      '<a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=742259376043-q6fer0npkfncv5ibjavt2dsifcpt9d8a.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com&access_type=offline&flowName=GeneralOAuthFlow"><button type="button" style="background-color: blue; color : white;">Click Here</button></a>'
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));
