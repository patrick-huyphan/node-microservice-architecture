import jwt from "jsonwebtoken";
import { mockControllerInputs } from "../test.functions";
import { authenticate } from "./authenticate";

jest.mock("../configuration/config", () => ({
  config: {
    authentication: {
      enabled: true,
      jwksUrl: "https://some-url.com",
    },
  },
}));

jest.mock("jwks-rsa", () => () => ({
  getSigningKey: () =>
    Promise.resolve({
      getPublicKey: () => `-----BEGIN RSA PUBLIC KEY-----
      abc
      -----END RSA PUBLIC KEY-----`,
    }),
}));

describe("authenticate", () => {
  const jwtToken: jwt.Jwt = {
    payload: {
      id: "42",
      username: "adm@company.org",
    },
    header: {
      kid: "kid",
      alg: "RS256",
    },
    signature: "",
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns a 401 if no authorization header is present", async () => {
    const { request, response, next } = mockControllerInputs({
      headers: {},
    });
    jest.spyOn(jwt, "decode").mockReturnValue(jwtToken);
    jest.spyOn(jwt, "verify").mockReturnValue();
    await authenticate(request, response, next);
    expect(response.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns a 403 if authorization header can not be verified", async () => {
    const { request, response, next } = mockControllerInputs({
      headers: {
        authorization: `Bearer TOKEN`,
      },
    });
    jest.spyOn(jwt, "decode").mockReturnValue(jwtToken);
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Error");
    });
    await authenticate(request, response, next);
    expect(response.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("assigns the token payload to response.locals", async () => {
    const { request, response, next } = mockControllerInputs({
      headers: {
        authorization: `Bearer TOKEN`,
      },
    });
    jest.spyOn(jwt, "decode").mockReturnValue(jwtToken);
    jest.spyOn(jwt, "verify").mockReturnValue();
    await authenticate(request, response, next);
    expect(response.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(response.locals).toHaveProperty("token", jwtToken.payload);
  });

  it("does not return a 403 if authentication is disabled", async () => {
    const { request, response, next } = mockControllerInputs({
      headers: {
        authorization: `Bearer TOKEN`,
      },
    });
    require("../configuration/config").config.authentication.enabled = false;
    jest.spyOn(jwt, "decode").mockReturnValue(jwtToken);
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Error");
    });
    await authenticate(request, response, next);
    expect(response.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(response.locals).toHaveProperty("token", jwtToken.payload);
  });
});
