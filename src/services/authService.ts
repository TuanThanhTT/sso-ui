import axios from "axios"

export async function login(data: {
  username: string
  password: string
  clientId: string
  redirectUri: string
  state: string | null
  codeChallenge: string
}) {

  const res = await axios.post(
    "http://172.16.1.11:5001/api/Auth/loginSSO",
    data
  )

  return res.data
}