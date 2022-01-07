const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'localhost';

let redisClient;
let app;

(async () => {
  redisClient = redis.createClient({ url: `redis://${REDIS_URL}` });
  redisClient.on('error', err => console.log('Redis client error', err));

  await redisClient.connect();

  app = express();

  app.post('/counter/:id/incr', async (req, res) => {
    const { id } = req.params;
  
    const cnt = await redisClient.incr(id);
  
    res.send({ status: 'ok', newValue: Number(cnt) });
  });
  
  app.get('/counter/:id', async (req, res) => {
    const { id } = req.params;
    const cnt = await redisClient.get(id);
  
    res.send({ value: Number(cnt) });
  });

  app.listen(PORT, () => {
    console.log('Counter is ready');
  });
})();
