import { UtmModel } from "./utm.model";

export interface IUtmRepository {
  createUtm(utm: UtmModel): Promise<UtmModel>;
  getUtm(utmId: number): Promise<UtmModel>;
}
