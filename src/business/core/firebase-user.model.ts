export interface IFirebaseUser {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: IFirebase;
  uid: string;
}

export interface IFirebase {
  identities: Identities;
  sign_in_provider: string;
}

export interface Identities {
  "google.com": any[];
  email: any[];
}
