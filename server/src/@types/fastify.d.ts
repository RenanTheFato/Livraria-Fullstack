import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user: Partial<{
      id: number,
      nome: string,
      email: string,
      senha: string,
    }>
  }
}