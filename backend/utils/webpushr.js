import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const WEBPUSHR_API_KEY = process.env.WEBPUSHR_API_KEY;
const WEBPUSHR_REST_KEY = process.env.WEBPUSHR_REST_KEY;

export const sendWebpushrNotification = async ({ title, message, url = '', subscriberIds = [] }) => {
  const headers = {
    'webpushrKey': WEBPUSHR_API_KEY,
    'webpushrAuthToken': WEBPUSHR_REST_KEY,
    'Content-Type': 'application/json'
  };

  const data = {
    title,
    message,
    target_url: url,
    subscriber_ids: subscriberIds
  };

  try {
    const response = await axios.post(
      'https://api.webpushr.com/v1/notification/send',
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.error('Webpushr notification error:', err.response?.data || err.message);
    throw err;
  }
};