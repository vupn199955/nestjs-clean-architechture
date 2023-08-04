import { Module } from "@nestjs/common";
import { UsecasesProxyModule } from "../usecases-proxy/usecases-proxy.module";
import { ClientController } from "./v0/client/client.controller";
import { FirebaseModule } from "../services/firebase/firebase.module";
import { AuthController } from "./v0/auth/auth.controller";
import { CacheModule } from "../services/cache/cache.module";
import { JwtModule } from "../services/jwt/jwt.module";
import { BusinessController } from "./v0/business/business.controller";
import { CustomerController } from "./v0/customer/customer.controller";

@Module({
  imports: [FirebaseModule, CacheModule, JwtModule, UsecasesProxyModule.register()],
  controllers: [ClientController, AuthController, BusinessController, CustomerController],
})
export class ControllersModule {}
