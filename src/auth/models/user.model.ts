export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface UserToken {
  accessToken: string;
  typeToken: string;
}
