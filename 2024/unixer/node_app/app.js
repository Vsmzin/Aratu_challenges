const axios = require('axios');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'], 
}));

const localhostOnly = (req, res, next) => {
  const ip = req.connection.remoteAddress;

  if (ip === '::1' || ip === '127.0.0.1') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};

const swaggerOptionsV1 = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation v1',
      version: '1.0.0',
      description: 'Automatically generated Swagger documentation for version 1',
    },
    servers: [{ url: 'http://127.0.0.1:3000' }],
  },
  apis: ['/app/node_app/swagger.js'],
};

const swaggerOptionsV2 = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation v2',
      version: '2.0.0',
      description: 'Automatically generated Swagger documentation for version 2',
    },
    servers: [{ url: 'http://127.0.0.1:3000' }],
  },
  apis: ['/app/node_app/swagger2.js'],
};

const swaggerDocsV1 = swaggerJsdoc(swaggerOptionsV1);
const swaggerDocsV2 = swaggerJsdoc(swaggerOptionsV2);

const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    urls: [
      { url: '/api-docs/v1/swagger.json', name: 'API v1' },
      { url: '/api-docs/v2/swagger.json', name: 'API v2' },
    ],
  },
};

app.get('/api-docs/v1/swagger.json', (req, res) => res.json(swaggerDocsV1));
app.get('/api-docs/v2/swagger.json', (req, res) => res.json(swaggerDocsV2));

app.get('/', (req, res) => res.redirect('/api-docs'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUiOptions));

app.post('/api/v1/try_request', async (req, res) => {
  try {
    const response = await axios(req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/api/v2/get_readme', localhostOnly, (req, res) => {
  res.status(200).json({
    "README.txt": "A API v2 está em desenvolvimento. Use /dev/shm/v2.sock por enquanto (nao tem todas as funcionalidades ainda).",
  });
});

app.listen(3000, '0.0.0.0', () => console.log('Server started on port 3000'));
