import * as admin from "firebase-admin";

export interface IFirebaseService {
  verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken>;
}
