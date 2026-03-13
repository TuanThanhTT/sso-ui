// import { useState } from "react"

// interface Props {
//   onSubmit: (username: string, password: string) => void
// }

// export default function LoginForm({ onSubmit }: Props) {

//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")

//   return (

//     <div className="login-box">

//       <input
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={() => onSubmit(username, password)}>
//         Login
//       </button>

//     </div>

//   )

// }



import { useState } from "react"

interface Props {
  onSubmit: (username: string, password: string) => void
  loading?: boolean
}

export default function LoginForm({ onSubmit, loading }: Props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (

    <div className="space-y-4">

      <input
        className="
        w-full
        px-4
        py-3
        rounded-lg
        bg-white/70
        border border-white/40
        focus:ring-2
        focus:ring-blue-400
        outline-none
        "
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="
        w-full
        px-4
        py-3
        rounded-lg
        bg-white/70
        border border-white/40
        focus:ring-2
        focus:ring-blue-400
        outline-none
        "
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={() => onSubmit(username, password)}
        className="
        w-full
        py-3
        rounded-lg
        bg-blue-600
        text-white
        hover:bg-blue-700
        transition
        shadow-lg
        disabled:opacity-60
        "
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

    </div>

  )

}