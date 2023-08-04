export interface IUserBusinessRepository {
  createUserBusiness(userId: number, businessId: number): Promise<any>;
  getUserBusiness(userId: number): Promise<any>;
}
