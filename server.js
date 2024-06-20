import http from 'http';
import { handleRequest } from './routes/index.js';

const PORT = 3000;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`User server listening on ${PORT}`);
});
