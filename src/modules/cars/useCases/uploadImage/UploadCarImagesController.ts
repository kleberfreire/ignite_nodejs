import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log("aqui");
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const fileNames = images.map((image) => {
      return image.filename;
    });

    console.log("aqui");

    await uploadCarImagesUseCase.execute({ car_id: id, image_name: fileNames });

    return response.status(201).json({ message: "Images uploaded" });
  }
}