export interface RegisterDTO {
    email: string;
    phoneNumber: string;
    password: string;
    firstName?  : string;
    lastName?: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface JwtPayload {
    sub: string;
    sessionId: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ResendVerificationDTO {
  email: string;
}