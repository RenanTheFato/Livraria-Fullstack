import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from "fastify";
import { CreateBookController } from "./controllers/CreateBookController";
import { ListBookController } from "./controllers/ListBookController";
import { DeleteBookController } from "./controllers/DeleteBookController";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserController } from "./controllers/AuthUserCotroller";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get("/setup" , async (req: FastifyRequest, res: FastifyReply ) => {
    console.log("Setup Working")
    return {ok: true} 
  })

  fastify.post("/insert-book", async (req: FastifyRequest, res: FastifyReply) => {
    return new CreateBookController().handle(req, res);
  })

  fastify.get("/list-book", async (req: FastifyRequest, res: FastifyReply) => {
    return new ListBookController().handle(req, res);
  })

  fastify.delete("/delete-book", async (req: FastifyRequest, res: FastifyReply) => {
    return new DeleteBookController().handle(req, res);
  })

  fastify.post("/create-user", async (req: FastifyRequest, res: FastifyReply) => {
    return new CreateUserController().handle(req, res);
  })

  fastify.post("/login-user", async (req: FastifyRequest, res: FastifyReply) => {
    return new AuthUserController().handle(req, res);
  })
}