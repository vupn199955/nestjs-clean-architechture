export interface IUrlShortenerService {
  createShortenedUrl(destinationUrl: string): Promise<string>;
}
