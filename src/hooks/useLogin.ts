import { useMutation } from "@tanstack/react-query"
import { loginSSO } from "../api/authApi"
import type { LoginRequest } from "../types/auth"

export const useLogin = () => {

  return useMutation({
    mutationFn: (data: LoginRequest) => loginSSO(data)
  })

}