export default function FloatingBlocks() {

  const blocks = Array.from({ length: 12 })

  return (

    <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden pointer-events-none">

      {blocks.map((_, i) => (

        <div
          key={i}
          className="
          absolute
          bottom-[-80px]
          w-16 h-16
          rounded-xl
          bg-white/20
          backdrop-blur-md
          animate-[blockMove_18s_linear_infinite]
          "
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />

      ))}

    </div>

  )

}