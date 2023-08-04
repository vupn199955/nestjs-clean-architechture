export interface JwtConfig {
  getJwtAccessSecret(): string;
  getJwtAccessExpirationTime(): string;
  getJwtRefreshSecret(): string;
  getJwtRefreshExpirationTime(): string;
}
