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
    await server.listen({ port: 3333 });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
