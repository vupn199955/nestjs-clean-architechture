import { BaseModel } from "../core/base.model";

export interface CampaignModel extends BaseModel {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  goals: string[];
  status: string;
  channels: string[];
  targetAudience: string;
  budget: number;
  utmLinkIds: string[];
}
