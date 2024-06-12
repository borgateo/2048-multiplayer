import WebSocket from 'ws';
import { log } from "@repo/logger";
// import { createServer } from "./server";

const port = process.env.PORT || 5001;
// const server = createServer();

// server.listen(port, () => {
//   log(`api running on ${port}`);
// });

const wss = new WebSocket.Server({ port });

wss.on('connection', (ws: WebSocket) => {
  log('New client connected');

  ws.on('message', (message: string) => {
    log(`Received message: ${message}`);
    ws.send(`Server received your message: ${message}`);
  });

  ws.on('close', () => {
    log('Client disconnected');
  });
});

log(`Listening on port ${port}`);
