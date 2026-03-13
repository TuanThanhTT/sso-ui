export interface LoginRequest {
  username: string
  password: string
  clientId: string
  redirectUri: string
  state: string | null
  codeChallenge: string
}

export interface LoginResponse {
  redirect: string
}