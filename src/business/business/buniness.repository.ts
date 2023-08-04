export interface IBusinessRepository {
  createBusiness(business: any): Promise<any>;
}
