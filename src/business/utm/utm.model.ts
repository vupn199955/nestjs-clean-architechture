import { BaseModel } from "../core/base.model";

export interface UtmModel extends BaseModel {
  name: string;
  channel: string;
  type: string;
  destinationUrl: string;
  shortenedUrl: string;
  shortenedUrlQr?: string;
}
