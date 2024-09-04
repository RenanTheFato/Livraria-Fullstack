import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from "fastify";
import { CreateBookController } from "./controllers/CreateBookController";
import { ListBookController } from "./controllers/ListBookController";
import { DeleteBookController } from "./controllers/DeleteBookController";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserController } from "./controllers/AuthUserCotroller";
import { LoginUserController } from "./controllers/LoginUserController";
import { authUserMiddleware } from "./middlewares/authUserMiddleware";
import { authPublisherMiddleware } from "./middlewares/authPublisherMiddleware";
import { CreatePublisherController } from "./controllers/CreatePublisherController";
import { AuthPublisherController } from "./controllers/AuthPublisherController";
import { LoginPublisherController } from "./controllers/LoginPublisherController";
// import { UserPurchaseController } from "./controllers/UserPurchaseController";

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

  fastify.get("/user-profile", {preHandler: authUserMiddleware}, async (req: FastifyRequest, res: FastifyReply) => {
    return new LoginUserController().handle(req, res);
  })

  fastify.post("/create-publisher", async (req: FastifyRequest, res: FastifyReply) => {
    return new CreatePublisherController().handle(req, res);
  })

  fastify.post("/login-publisher", async (req: FastifyRequest, res: FastifyReply) => {
    return new AuthPublisherController().handle(req, res);
  })

  fastify.get("/publisher-profile", {preHandler: authPublisherMiddleware}, async (req: FastifyRequest, res: FastifyReply) => {
    return new LoginPublisherController().handle(req, res);
  })

  // fastify.post("/user-purchase", {preHandler: authUserMiddleware}, async (req: FastifyRequest, res: FastifyReply) => {
  // return new UserPurchaseController().handle(req, res);
  // })
}