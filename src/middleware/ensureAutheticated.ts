import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).json({ errorCode: "token.invalid" });
  }

  // separa o token "bearer akfslçjlçgjajn1-24-821-48-1284" pelos espaços "
  // [0] bearer
  // [1] akfslçjlçgjajn1-24-821-48-1284

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayLoad;
    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}
