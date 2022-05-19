import { LocalStorageProvider } from "./StorageProvider/Implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { DayjsDateProvider } from "./DateProvider/Implementations/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { container } from "tsyringe";
import { EtherealMailProvider } from "./MailProvider/Implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
