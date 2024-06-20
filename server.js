import http from 'http';
import { handleRequest } from './routes/index.js';
import dotenv from 'dotenv';

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`User server listening on ${PORT}`);
});
