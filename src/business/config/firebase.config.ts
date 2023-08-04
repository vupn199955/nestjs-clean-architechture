export interface FirebaseConfig {
  getFirebaseClientEmail(): string;
  getFirebaseProjectId(): string;
  getFirebasePrivateKey(): string;
  getFirebasePrivateKeyId(): string;
  getFirebaseClientID(): string;
}
