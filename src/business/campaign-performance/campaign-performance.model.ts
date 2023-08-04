import { BaseModel } from "../core/base.model";

export interface CampaignPerformanceModel extends BaseModel {
  campaignId: string;
  date: Date;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  reach: number;
}
