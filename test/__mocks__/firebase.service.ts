import { IFirebaseService } from "../../src/business/firebase/firebase.service";
import * as admin from "firebase-admin";

export class StubFirebaseService implements IFirebaseService {
  async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return {
      aud: "aud",
      auth_time: 0,
      exp: 0,
      firebase: {
        identities: {},
        sign_in_provider: "sign_in_provider",
      },
      iat: 0,
      iss: "iss",
      sub: "sub",
      uid: "uid",
    };
  }
}
