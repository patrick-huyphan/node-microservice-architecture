import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import JwksRsa from "jwks-rsa";
import { config } from "../configuration/config";

const jwksClient = JwksRsa({
  jwksUri: config.authentication.jwksUrl,
});

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<unknown> {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "") || "";
    if (!token) {
      return response.status(401).end();
    }

    const jwtToken = jwt.decode(token, { complete: true });
    if (!jwtToken) {
      return response.status(403).end();
    }

    if (config.authentication.enabled) {
      try {
        const signingKey = await jwksClient.getSigningKey(jwtToken.header.kid);
        jwt.verify(token, signingKey.getPublicKey(), { algorithms: ["RS256"] });
      } catch {
        return response.status(403).end();
      }
    }

    response.locals.token = jwtToken.payload;
    next();
  } catch (error) {
    next(error);
  }
}
