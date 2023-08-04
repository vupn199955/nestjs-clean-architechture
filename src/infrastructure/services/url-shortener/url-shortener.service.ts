import { Injectable } from "@nestjs/common";
import { IUrlShortenerService } from "../../../business/url-shortener/url-shortener.service";
import { EnvironmentConfigService } from "../../configs/env.config.service";
import { BitlyClient } from "bitly";

@Injectable()
export class UrlShortenerService implements IUrlShortenerService {
  bitlyClient: BitlyClient;
  constructor(configService: EnvironmentConfigService) {
    this.bitlyClient = new BitlyClient(configService.getBitlyAccessToken());
  }
  async createShortenedUrl(destinationUrl: string): Promise<string> {
    const bitlyLink = await this.bitlyClient.shorten(destinationUrl);

    return bitlyLink.link;
  }
}
