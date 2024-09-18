import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path'; 
import fastifyMultipart from '@fastify/multipart';
import { routes } from './routes';

const server = Fastify({ logger: true });

const start = async () => {
  await server.register(cors);
  await server.register(require('@fastify/multipart'));
  
  server.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'), 
    prefix: '/uploads/',
  });
  await server.register(routes);

  try {
    await server.listen({ 
      host: '0.0.0.0',
      port: process.env.PORT ? Number(process.env.PORT) : 3333 
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

export default server;
