import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AutheticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const service = new AuthenticateUserService();
    //service.execute("asfasgsa");
  }
}

export { AuthenticateUserController };
