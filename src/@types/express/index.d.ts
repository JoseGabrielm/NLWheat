//*sobrepõe @types do express

declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
