import { IMailProvider } from "../IMailProvider";

export class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail(
    email: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void> {
    this.message.push({ email, subject, variables, templatePath });
  }
}
