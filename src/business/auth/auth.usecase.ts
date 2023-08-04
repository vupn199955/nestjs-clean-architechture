export interface IAuthUseCases {
  signIn(firebaseUid: string): Promise<any>;
  signOut(userUid: string, token: string): Promise<any>;
  signOutAll(): Promise<any>;
  refeshToken(userId: number, refreshToken: string): Promise<any>;
}
