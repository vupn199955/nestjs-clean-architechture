import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxy } from "./usecases-proxy";
import { ClientUseCases } from "../../use-cases/client/client.usecase";
import { ClientRepository } from "../repositories/client.repository";
import { RepositoriesModule } from "../repositories/repositories.module";
import { BusinessRepository } from "../repositories/business.repository";
import { UserRepository } from "../repositories/user.repositoty";
import { UserBusinessRepository } from "../repositories/user-business.repository";
import { AuthUsecase } from "../../use-cases/auth/auth.usecase";
import { JwtService } from "../services/jwt/jwt.service";
import { PoolTokenService } from "../services/cache/pool-token.service";
import { JWT_ACCESS_SERVICE, JWT_REFRESH_SERVICE } from "../../business/constant/jwt.const";
import { UserBusinessUsecase } from "../../use-cases/user-business/user-business.usecase";
import { CustomerRepository } from "../repositories/customer.repository";
import { CustomerUsecase } from "../../use-cases/customer/customer.usecase";

@Module({
  imports: [RepositoriesModule],
})
export class UsecasesProxyModule {
  // Client
  static CLIENT_USECASES_PROXY = "ClientUseCasesProxy";
  static AUTH_USECASES_PROXY = "AuthUseCasesProxy";
  static USER_BUSINESS_USECASES_PROXY = "UserBusinessUseCasesProxy";
  static CUSTOMER_USECASES_PROXY = "CustomerUseCasesProxy";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [ClientRepository, BusinessRepository, UserRepository, UserBusinessRepository],
          provide: UsecasesProxyModule.CLIENT_USECASES_PROXY,
          useFactory: (
            clientRepo: ClientRepository,
            businessRepo: BusinessRepository,
            userRepo: UserRepository,
            userBusinessRepo: UserBusinessRepository,
          ) =>
            new UseCaseProxy(
              new ClientUseCases(clientRepo, businessRepo, userRepo, userBusinessRepo),
            ),
        },
        {
          inject: [JWT_ACCESS_SERVICE, JWT_REFRESH_SERVICE, UserRepository, PoolTokenService],
          provide: UsecasesProxyModule.AUTH_USECASES_PROXY,
          useFactory: (
            jwtService: JwtService,
            jwtRefreshService: JwtService,
            userRepo: UserRepository,
            poolTokenService: PoolTokenService,
          ) => {
            return new UseCaseProxy(
              new AuthUsecase(jwtService, jwtRefreshService, userRepo, poolTokenService),
            );
          },
        },
        {
          inject: [UserBusinessRepository],
          provide: UsecasesProxyModule.USER_BUSINESS_USECASES_PROXY,
          useFactory: (userBusinessRepo: UserBusinessRepository) =>
            new UseCaseProxy(new UserBusinessUsecase(userBusinessRepo)),
        },
        {
          inject: [CustomerRepository],
          provide: UsecasesProxyModule.CUSTOMER_USECASES_PROXY,
          useFactory: (customerRepo: CustomerRepository) =>
            new UseCaseProxy(new CustomerUsecase(customerRepo)),
        },
      ],
      exports: [
        UsecasesProxyModule.CLIENT_USECASES_PROXY,
        UsecasesProxyModule.AUTH_USECASES_PROXY,
        UsecasesProxyModule.USER_BUSINESS_USECASES_PROXY,
        UsecasesProxyModule.CUSTOMER_USECASES_PROXY,
      ],
    };
  }
}
