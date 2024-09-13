export interface User {
  password?:string;
  email?: string;

  [key: string]: unknown;
}
