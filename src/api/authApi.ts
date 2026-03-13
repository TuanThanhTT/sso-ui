import { axiosClient } from "./axiosClient"
import type { LoginRequest, LoginResponse } from "../types/auth"

export const loginSSO = async (data: LoginRequest): Promise<LoginResponse> => {

  const res = await axiosClient.post("/Auth/loginSSO", data)

  return res.data
}