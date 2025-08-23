import { WebSocketServer } from 'ws';
import Server from './classes/server.js';

const wss = new WebSocketServer({ port: 8080 });

const server = new Server(wss)

console.log('WebSocket server is running on ws://localhost:8080');