export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200"></div>

      {/* cubes */}
      <div className="absolute bottom-0 w-full h-full">

        <div className="cube cube1"></div>
        <div className="cube cube2"></div>
        <div className="cube cube3"></div>
        <div className="cube cube4"></div>
        <div className="cube cube5"></div>

      </div>

    </div>
  )
}