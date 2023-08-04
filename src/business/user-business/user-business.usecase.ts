export interface IUserBusinessUseCases {
  getBusinessByUserId(userId: number): Promise<any>;
}
