export interface IBusinessUseCases {
  getBusinessByUserId(userId: number): Promise<any>;
}
