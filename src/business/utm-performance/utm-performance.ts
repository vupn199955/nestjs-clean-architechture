import { BaseModel } from "../core/base.model";

export interface UtmPerformanceModel extends BaseModel {
  utmId: string;
  date: Date;
  clicks: number;
  conversions: number;
  revenue: number;
}
