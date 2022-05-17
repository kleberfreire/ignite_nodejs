export interface IMailProvider {
  sendMail(to: string, subject, variables: any, path: string): Promise<void>;
}
