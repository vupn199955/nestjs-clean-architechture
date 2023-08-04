export interface IClientRepository {
  createClient(client: any): Promise<any>;
  getClient(clientId: number): Promise<any>;
}
