import { Test, TestingModule } from "@nestjs/testing";
import { UrlShortenerService } from "./url-shortener.service";
import { IUrlShortenerService } from "../../../business/url-shortener/url-shortener.service";
import { StubUrlShortenerService } from "../../../../test/__mocks__/url-shortener.service";

describe("Url shortener service", () => {
  let urlShortenerService: IUrlShortenerService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UrlShortenerService,
          useClass: StubUrlShortenerService,
        },
      ],
    }).compile();

    urlShortenerService = moduleFixture.get<IUrlShortenerService>(UrlShortenerService);
  });

  it("Should return a shortener url", () => {
    expect(urlShortenerService.createShortenedUrl("test-destination-url")).resolves.toEqual(
      `http://short.url/${"test-destination-url"}`,
    );
  });
});
