const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const pregunta = req.body.prompt;

  try {
    const abacusResponse = await fetch('https://api.abacus.ai/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ABACUS_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'chat',
        prompt: pregunta
      })
    });

    const data = await abacusResponse.json();
    res.json(data);
  } catch (err) {
    console.error('Error al conectar con Abacus:', err);
    res.status(500).json({ error: 'Error al conectar con Abacus' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});