// import LoginForm from "../components/LoginForm"
// import { login } from "../services/authService"

// export default function LoginPage() {

//   const params = new URLSearchParams(window.location.search)

//   const clientId = params.get("client_id")
//   const redirectUri = params.get("redirect_uri")
//   const state = params.get("state")
//   const codeChallenge = params.get("code_challenge")

//   if (!clientId || !redirectUri || !codeChallenge) {
//     return <h3>Invalid SSO request</h3>
//   }

//   const handleLogin = async (username: string, password: string) => {

//     const res = await login({
//       username,
//       password,
//       clientId,
//       redirectUri,
//       state,
//       codeChallenge
//     })

//     window.location.href = res.redirect
//   }

//   return (
//     <div className="login-page">
//       <h2>SSO Gateway Login</h2>
//       <LoginForm onSubmit={handleLogin} />
//     </div>
//   )
// }

import LoginForm from "../components/LoginForm"
import { useLogin } from "../hooks/useLogin"
import FloatingBlocks from "../components/FloatingBlocks"

export default function LoginPage() {

  const params = new URLSearchParams(window.location.search)

  const clientId = params.get("client_id")
  const redirectUri = params.get("redirect_uri")
  const state = params.get("state")
  const codeChallenge = params.get("code_challenge")

  const loginMutation = useLogin()

  const handleLogin = (username: string, password: string) => {

    loginMutation.mutate(
      {
        username,
        password,
        clientId: clientId!,
        redirectUri: redirectUri!,
        state,
        codeChallenge: codeChallenge!
      },
      {
        onSuccess: (data) => {
          window.location.href = data.redirect
        }
      }
    )

  }

  return (

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">

      <FloatingBlocks />

      <div
        className="
        relative
        w-full
        max-w-md
        p-8
        rounded-2xl
        bg-white/30
        backdrop-blur-xl
        border border-white/40
        shadow-2xl
        ">

        <div className="flex flex-col items-center mb-6">

          <img
            src="https://upload.wikimedia.org/wikipedia/vi/4/43/%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%E1%BB%93ng_Th%C3%A1p.png"
            className="w-20 mb-3"
          />

          <h1 className="text-xl font-semibold">
            Dong Thap University
          </h1>

          <p className="text-sm text-gray-600">
            Single Sign-On Portal
          </p>

        </div>

        <LoginForm
          onSubmit={handleLogin}
          loading={loginMutation.isPending}
        />

      </div>

    </div>

  )

}