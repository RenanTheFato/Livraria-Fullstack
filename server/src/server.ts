import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { routes } from './routes';

const server = Fastify({ logger: true });

const start = async () => {
  await server.register(cors);
  await server.register(multipart);
  await server.register(routes);

  try {
    await server.listen({ port: 3333 });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();