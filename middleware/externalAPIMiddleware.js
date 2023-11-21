const axios = require('axios');

// Middleware para interactuar con la API externa
const callExternalApi = async (req, res, next) => {
  try {
    const response = await axios.get(process.env.EXTERNAL_API_URL);
    req.externalApiResponse = response.data;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al llamar a la API externa' });
  }
};

module.exports = { callExternalApi };
