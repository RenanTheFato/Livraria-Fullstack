import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from "fastify";
import { CreateBookController } from "./controllers/CreateBookController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get("/setup" , async (req: FastifyRequest, res: FastifyReply ) => {
    console.log("Setup Working")
    return {ok: true} 
  })

  fastify.post("/insert-book", async (req: FastifyRequest, res: FastifyReply) => {
    return new CreateBookController().handle(req, res);
  })
}