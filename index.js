require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para sintetizar voz
app.post('/api/voice', async (req, res) => {
  const text = req.body.text;

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.elevenlabs.io/v1/text-to-speech/VRGMfU04ROivfrVJnc8n/stream',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVEN_API_KEY
      },
      data: {
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      responseType: 'stream'
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    response.data.pipe(res);
  } catch (error) {
    console.error('Error al generar voz:', error.message);
    res.status(500).send('Error al generar la voz.');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
