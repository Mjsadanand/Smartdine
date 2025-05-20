import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

console.log('SID:', accountSid, 'TOKEN:', authToken, 'FROM:', fromNumber);

const client = twilio(accountSid, authToken);

export const sendSMS = (to, body) => {
  return client.messages.create({
    body,
    from: fromNumber,
    to,
  });
};