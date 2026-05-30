import jwt, { Secret, SignOptions } from "jsonwebtoken";

type AccessTokenPayload = {
  userId: string;
  email: string;
};

type RefreshTokenPayload = {
  sessionId: string;
  userId: string;
};

const accessSecret: Secret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET!;

const accessTokenOptions: SignOptions = {
  expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
};

const refreshTokenOptions: SignOptions = {
  expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
};
export function generateAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(
    payload,
    accessSecret,
    accessTokenOptions
  );
}

export function generateRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(
    payload,
    refreshSecret,
    refreshTokenOptions
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(
    token,
    accessSecret
  ) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(
    token,
    refreshSecret
  ) as RefreshTokenPayload;
}