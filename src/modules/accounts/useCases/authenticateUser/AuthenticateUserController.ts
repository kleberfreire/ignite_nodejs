import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    console.log(email, password);
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({ email, password });

    return response.status(200).json(token);
  }
}

export { AuthenticateUserController };
