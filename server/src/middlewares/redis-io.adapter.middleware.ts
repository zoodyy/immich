import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';

// const pubClient = createClient({ url: 'redis://immich_redis:6379' });
// const subClient = pubClient.duplicate();

const pubClient = new RedisClient({
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
});

const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
