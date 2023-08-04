import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AuthController } from "../src/infrastructure/controllers/v0/auth/auth.controller";
import { FirebaseService } from "../src/infrastructure/services/firebase/firebase.service";
import { StubFirebaseService } from "./__mocks__/firebase.service";
import { UsecasesProxyModule } from "../src/infrastructure/usecases-proxy/usecases-proxy.module";
import { StubAuthUsecase } from "./__mocks__/auth.usecase";
import { UseCaseProxy } from "../src/infrastructure/usecases-proxy/usecases-proxy";
import { StubUserBusinessUsecase } from "./__mocks__/user-business.usecase";
import { StubJwtService } from "./__mocks__/jwt.service";
import { JWT_ACCESS_SERVICE, JWT_REFRESH_SERVICE } from "../src/business/constant/jwt.const";
import { PoolTokenService } from "../src/infrastructure/services/cache/pool-token.service";
import { StubPoolTokenService } from "./__mocks__/pool-token.service";
import { IJwtService } from "../src/business/jwt/jwt.service";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let firebaseService: FirebaseService;
  let poolTokenService: PoolTokenService;
  let accessJwtService: IJwtService;
  let refreshJwtService: IJwtService;
  let authUsecase: StubAuthUsecase;
  let userBusinessUsecase: StubUserBusinessUsecase;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: FirebaseService,
          useClass: StubFirebaseService,
        },
        {
          provide: UsecasesProxyModule.AUTH_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new StubAuthUsecase()),
        },
        {
          provide: UsecasesProxyModule.USER_BUSINESS_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new StubUserBusinessUsecase()),
        },
        {
          provide: JWT_ACCESS_SERVICE,
          useClass: StubJwtService,
        },
        {
          provide: JWT_REFRESH_SERVICE,
          useClass: StubJwtService,
        },
        {
          provide: PoolTokenService,
          useClass: StubPoolTokenService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    firebaseService = moduleFixture.get<FirebaseService>(FirebaseService);
    poolTokenService = moduleFixture.get<PoolTokenService>(PoolTokenService);
    accessJwtService = moduleFixture.get<IJwtService>(JWT_ACCESS_SERVICE);
    refreshJwtService = moduleFixture.get<IJwtService>(JWT_REFRESH_SERVICE);
    authUsecase = moduleFixture.get<StubAuthUsecase>(UsecasesProxyModule.AUTH_USECASES_PROXY);
    userBusinessUsecase = moduleFixture.get<StubUserBusinessUsecase>(
      UsecasesProxyModule.USER_BUSINESS_USECASES_PROXY,
    );

    await app.init();
  });

  describe("/auth/sign-in (POST)", () => {
    it("Should return 401 error", async () => {
      const result = await request(app.getHttpServer()).post("/api/v0/auth/sign-in");
      expect(result.status).toBe(401);
      expect(result.body).toMatchObject({
        message: "Empty token",
        error: "Unauthorized",
        statusCode: 401,
      });
    });

    it("Should return 401 error", async () => {
      jest.spyOn(firebaseService, "verifyIdToken").mockRejectedValue(new Error("error"));
      const result = await request(app.getHttpServer())
        .post("/api/v0/auth/sign-in")
        .set("Authorization", "Bearer token");
      expect(result.status).toBe(401);
      expect(result.body).toMatchObject({
        message: "error",
        error: "Unauthorized",
        statusCode: 401,
      });
    });

    it("Should return token", async () => {
      const result = await request(app.getHttpServer())
        .post("/api/v0/auth/sign-in")
        .set("Authorization", "Bearer token");
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("accessToken");
      expect(result.body).toHaveProperty("refreshToken");
    });
  });

  describe("/auth/refresh (POST)", () => {
    it("Should return 401 error", async () => {
      const result = await request(app.getHttpServer()).post("/api/v0/auth/refresh");
      expect(result.status).toBe(401);
      expect(result.body).toMatchObject({
        message: "Empty token",
        error: "Unauthorized",
        statusCode: 401,
      });
    });

    it("Should return 401 error", async () => {
      const result = await request(app.getHttpServer())
        .post("/api/v0/auth/refresh")
        .set("Authorization", "Bearer token");
      expect(result.status).toBe(401);
      expect(result.body).toMatchObject({
        message: "Not actual token",
        error: "Unauthorized",
        statusCode: 401,
      });
    });

    it("Should return 401 error", async () => {
      jest.spyOn(refreshJwtService, "verify").mockReturnValue(null);
      const result = await request(app.getHttpServer())
        .post("/api/v0/auth/refresh")
        .set("Authorization", "Bearer token");
      expect(result.status).toBe(401);
      expect(result.body).toMatchObject({
        message: "Invalid token",
        error: "Unauthorized",
        statusCode: 401,
      });
    });

    it("Should return token", async () => {
      const result = await request(app.getHttpServer())
        .post("/api/v0/auth/refresh")
        .set("Authorization", "Bearer refreshToken");
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("accessToken");
      expect(result.body).toHaveProperty("refreshToken");
    });
  });

  describe("/auth/sign-out (POST)", () => {
    it("Should return 401 error", async () => {
      const result = await request(app.getHttpServer()).post("/api/v0/auth/sign-out");
      expect(result.status).toBe(401);
      expect(result.body).toMatchObject({
        message: "Empty token",
        error: "Unauthorized",
        statusCode: 401,
      });
    });

    it("Should return 401 error", async () => {
      const result = await request(app.getHttpServer())
        .post("/api/v0/auth/sign-out")
        .set("Authorization", "Bearer token");
      expect(result.status).toBe(401);
      expect(result.body).toMatchObject({
        message: "Not actual token",
        error: "Unauthorized",
        statusCode: 401,
      });
    });

    it("Should return token", async () => {
      const result = await request(app.getHttpServer())
        .post("/api/v0/auth/sign-out")
        .set("Authorization", "Bearer accessToken");
      expect(result.status).toBe(204);
    });
  });
});
