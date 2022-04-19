import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AthenticateUserUseCase";

class AthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    console.log(email, password);
    const athenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await athenticateUserUseCase.execute({ email, password });

    return response.status(200).json(token);
  }
}

export { AthenticateUserController };
