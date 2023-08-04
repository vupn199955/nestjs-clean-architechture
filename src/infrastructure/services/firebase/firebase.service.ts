import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as admin from "firebase-admin";
import { EnvironmentConfigService } from "../../configs/env.config.service";
import { Environment } from "../../../business/enum/env.enum";
import { IFirebaseService } from "../../../business/firebase/firebase.service";

@Injectable()
export class FirebaseService implements OnApplicationBootstrap, IFirebaseService {
  constructor(private readonly configService: EnvironmentConfigService) {}
  onApplicationBootstrap(): void {
    if (this.configService.getNodeEnv() !== Environment.Test) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.getFirebaseProjectId(),
          privateKey: this.configService.getFirebasePrivateKey(),
          clientEmail: this.configService.getFirebaseClientEmail(),
        }),
      });
    }
  }

  async createCustomToken(phoneNumber: string) {
    let user;
    try {
      user = await admin.auth().getUserByPhoneNumber(phoneNumber);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        user = await admin.auth().createUser({
          phoneNumber,
        });
      }
    }

    return admin.auth().createCustomToken(user.uid);
  }

  async createCustomTokenByEmail(email: string) {
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        user = await admin.auth().createUser({
          email,
        });
      }
    }

    return admin.auth().createCustomToken(user.uid);
  }

  async updateUser(
    uid,
    payload: {
      email?: string;
      phoneNumber?: string;
      emailVerified?: boolean;
      password?: string;
    },
  ) {
    try {
      const user = await admin
        .auth()
        .updateUser(uid, payload)
        .then((userRecord) => userRecord.toJSON());
      return user;
    } catch (error) {
      console.log(error, payload.email);
      return;
    }
  }

  verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return new Promise((resolve, reject): void => {
      admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => resolve(decodedToken))
        .catch((error) => reject(error));
    });
  }

  verifyNumber(phoneNumber: string): Promise<admin.auth.UserRecord> {
    return new Promise((resolve, reject): void => {
      admin
        .auth()
        .getUserByPhoneNumber(phoneNumber)
        .then((userRecord) => {
          resolve(userRecord);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  verifyEmail(email: string): Promise<admin.auth.UserRecord> {
    return new Promise((resolve, reject): void => {
      admin
        .auth()
        .getUserByEmail(email)
        .then((userRecord) => {
          resolve(userRecord);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  send(payload: admin.messaging.TokenMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      admin
        .messaging()
        .send(payload)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  sendMulticast(payload: admin.messaging.MulticastMessage): Promise<admin.messaging.BatchResponse> {
    return new Promise((resolve, reject) => {
      admin
        .messaging()
        .sendMulticast(payload)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  deleteUser(uid: string) {
    if (!uid) return;
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .deleteUser(uid)
        .then((data) => resolve(data))
        .catch((error) => {
          if (error?.code === "auth/user-not-found") {
            resolve(true);
          }
          reject(error);
        });
    });
  }
}
