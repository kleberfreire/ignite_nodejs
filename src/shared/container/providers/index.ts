import { DayjsDateProvider } from "./DateProvider/Implementations/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { container } from "tsyringe";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
