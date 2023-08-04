import { IUrlShortenerService } from "../../src/business/url-shortener/url-shortener.service";

export class StubUrlShortenerService implements IUrlShortenerService {
  async createShortenedUrl(destinationUrl: string): Promise<string> {
    return `http://short.url/${destinationUrl}`;
  }
}
