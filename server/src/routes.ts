import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from "fastify";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get("/setup" , async (req: FastifyRequest, res: FastifyReply ) => {
    console.log("Setup Working")
    return {ok: true} 
  })
}