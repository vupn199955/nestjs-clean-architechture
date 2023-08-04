import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { IFirebaseUser } from "../../../business/core/firebase-user.model";

export const FirebaseUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): IFirebaseUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const client = request["user"];

    return data ? client?.[data] : client;
  },
);
