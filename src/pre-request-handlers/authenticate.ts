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
    const encodedToken =
      request.headers.authorization?.replace("Bearer ", "") || "";
    if (!encodedToken) {
      return response.status(401).end();
    }

    const decodedToken = jwt.decode(encodedToken, { complete: true });
    if (!decodedToken) {
      return response.status(403).end();
    }

    if (config.authentication.enabled) {
      try {
        const signingKey = await jwksClient.getSigningKey(
          decodedToken.header.kid
        );
        jwt.verify(encodedToken, signingKey.getPublicKey(), {
          algorithms: ["RS256"],
        });
      } catch {
        return response.status(403).end();
      }
    }

    response.locals.token = decodedToken.payload;

    next();
  } catch (error) {
    next(error);
  }
}
