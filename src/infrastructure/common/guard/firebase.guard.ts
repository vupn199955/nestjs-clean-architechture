import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { FirebaseService } from "../../services/firebase/firebase.service";
import { ErrorMessage } from "../../../business/enum/error-message.enum";

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException(ErrorMessage.EMPTY_TOKEN);
    }

    try {
      request["user"] = await this.firebaseService.verifyIdToken(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
