import upload from "@roots/config/upload";
import { S3 } from "aws-sdk";
import fs from "fs";
import { resolve } from "path";
import mime from "mime";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  // saveFile(file: string, folder: string): Promise<string> {
  //   throw new Error("Method not implemented.");
  // }
  // deleteFile(file: string, folder: string): Promise<void> {
  //   throw new Error("Method not implemented.");
  // }
  private client: S3;
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async saveFile(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalName);
    const ContentType = mime.getType(originalName);
    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();
    await fs.promises.unlink(originalName);
    return file;
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
