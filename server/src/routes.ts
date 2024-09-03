import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from "fastify";
import { CreateBookController } from "./controllers/CreateBookController";
import { ListBookController } from "./controllers/ListBookController";
import { DeleteBookController } from "./controllers/DeleteBookController";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserController } from "./controllers/AuthUserCotroller";
import { LoginUserController } from "./controllers/LoginUserController";
import { authUserMiddleware } from "./middlewares/authUserMiddleware";
// import { UserPurchaseController } from "./controllers/UserPurchaseController";
// import { UserCartController } from "./controllers/UserCartController";

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

  // fastify.get('/cart', { preHandler: authUserMiddleware }, async (req: FastifyRequest, res: FastifyReply) => {
  //   return new UserCartController().getCart(req, res);
  // });

  // fastify.post('/cart-add', { preHandler: authUserMiddleware }, async (req: FastifyRequest, res: FastifyReply) => {
  //    new UserCartController().addToCart(req, res);
  // });

  // fastify.post('/cart/remove', { preHandler: authUserMiddleware }, async (req: FastifyRequest, res: FastifyReply) => {
  //    new UserCartController().removeFromCart(req, res);
  // });

  // fastify.post('/user-purchase', { preHandler: authUserMiddleware }, async (req: FastifyRequest, res: FastifyReply) => {
  //    new UserPurchaseController().handle(req, res);
  // });

  // fastify.get('/user-purchases', { preHandler: authUserMiddleware }, async (req: FastifyRequest, res: FastifyReply) => {
  //   return new UserPurchaseController().handlePurchases(req, res);
  // });
}