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

declare module 'fastify' {
  export interface FastifyRequest {
    publisher: Partial<{
      id: number,
      CNPJ: string,
      nome: string,
      email: string,
      senha: string,
    }>
  }
}