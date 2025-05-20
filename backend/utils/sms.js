import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

export const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error.response?.data || error.message);
  }
};











// import twilio from 'twilio';
// import dotenv from 'dotenv';
// dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// console.log('SID:', accountSid, 'TOKEN:', authToken, 'FROM:', fromNumber);

// const client = twilio(accountSid, authToken);

// export const sendSMS = (to, body) => {
//   return client.messages.create({
//     body,
//     from: fromNumber,
//     to,
//   });
// };