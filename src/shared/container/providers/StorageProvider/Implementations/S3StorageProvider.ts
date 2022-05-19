import { S3 } from "aws-sdk";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async saveFile(file: string, folder: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
