export interface IUserRepository {
  createUser(user: any): Promise<any>;
  isUserExist(email: string): Promise<boolean>;
  getUserByFirebaseUid(firebaseUid: string): Promise<any>;
  getUserById(id: number): Promise<any>;
}
