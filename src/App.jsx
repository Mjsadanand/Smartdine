import { useState, useRef } from 'react';

const languages = {
  en: { label: 'English', code: 'en-US' },
  hi: { label: 'Hindi', code: 'hi-IN' },
  mr: { label: 'Marathi', code: 'mr-IN' },
  kn: { label: 'Kannada', code: 'kn-IN' },
};

function App() {
  const [language, setLanguage] = useState('en');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [listening, setListening] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = languages[language].code;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript;
      setOriginalText(spoken);
      const translated = await translateToEnglish(spoken, language);
      setTranslatedText(translated);
    };

    recognition.onerror = (err) => {
      alert('Speech recognition error: ' + err.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const translateToEnglish = async (text, fromLang) => {
    if (fromLang === 'en') return text;
  
    try {
      const response = await fetch('https://translate.argosopentech.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: fromLang,
          target: 'en',
          format: 'text'
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
  
      return data.translatedText;
    } catch (error) {
      console.error("Translation failed:", error.message);
      return `[Translation Error: ${error.message}]`;
    }
  };
  

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const appStyle = {
    background: darkMode ? '#121212' : '#f4f4f4',
    color: darkMode ? '#f4f4f4' : '#121212',
    minHeight: '100vh',
    padding: 20,
    fontFamily: 'sans-serif',
  };

  const cardStyle = {
    background: darkMode ? '#1e1e1e' : '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  return (
    <div style={appStyle}>
      <h1>🎙️ Voice to English Translator</h1>

      <div style={{ marginBottom: 10 }}>
        <label>Select Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {Object.entries(languages).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={listening ? stopListening : startListening}>
          {listening ? '🛑 Stop Listening' : '🎤 Start Listening'}
        </button>
        <button onClick={() => setDarkMode(!darkMode)} style={{ marginLeft: 10 }}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div style={cardStyle}>
        <h3>🗣 Spoken Text ({languages[language].label}):</h3>
        <p>{originalText || '---'}</p>
        {originalText && (
          <button onClick={() => copyToClipboard(originalText)}>📋 Copy</button>
        )}
      </div>

      <div style={cardStyle}>
        <h3>🌐 Translated Text (English):</h3>
        <p>{translatedText || '---'}</p>
        {translatedText && (
          <button onClick={() => copyToClipboard(translatedText)}>📋 Copy</button>
        )}
      </div>
    </div>
  );
}

export default App;
