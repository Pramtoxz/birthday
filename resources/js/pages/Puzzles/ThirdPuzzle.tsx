import { useState, useEffect, useRef } from "react"
import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import Foto4 from "@/assets/7.jpg"

interface ThirdPuzzleProps {
  onComplete: () => void;
}

export default function ThirdPuzzle({ onComplete }: ThirdPuzzleProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentStarCount, setCurrentStarCount] = useState(0)
  const [visibleStars, setVisibleStars] = useState<{id: number, x: number, y: number, delay: number}[]>([])
  const maxStars = 50
  const timer = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Menampilkan bintang satu per satu
  useEffect(() => {
    if (isStarted && currentStarCount < maxStars) {
      timer.current = setTimeout(() => {
        const containerWidth = containerRef.current?.clientWidth || 300
        const containerHeight = containerRef.current?.clientHeight || 300
        
        // Posisi dalam bentuk hati (algoritma parametrik)
        const t = (currentStarCount / maxStars) * 2 * Math.PI
        const x = 16 * Math.pow(Math.sin(t), 3)
        const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)
        
        // Normalisasi ke ukuran container
        const normalizedX = (x * 7) + containerWidth / 2
        const normalizedY = (-y * 7) + containerHeight / 2
        
        const newStar = {
          id: currentStarCount,
          x: normalizedX,
          y: normalizedY,
          delay: currentStarCount * 0.05
        }
        
        setVisibleStars(prevStars => [...prevStars, newStar])
        setCurrentStarCount(prev => prev + 1)
      }, 100)
    } else if (currentStarCount >= maxStars && !isCompleted) {
      // Ketika semua bintang sudah muncul, tampilkan pesan
      setTimeout(() => {
        setIsCompleted(true)
      }, 1000)
    }
    
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [isStarted, currentStarCount, isCompleted])
  
  const startAnimation = () => {
    setIsStarted(true)
  }

  return (
    <>
      <Head title="Teka-teki Ketiga" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-purple-900 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl w-full p-6 sm:p-8 bg-black/40 backdrop-blur-md rounded-lg shadow-lg border border-purple-300"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-300 text-center mb-4 sm:mb-6">Teka-teki #3: Bintang-Bintang Cinta</h1>

          <div className="mb-6 sm:mb-8 flex justify-center">
            <img
              src={Foto4}
              alt="Bersama"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-md opacity-80"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-center text-pink-100 mb-4 sm:mb-6">
              Tekan tombol untuk melihat keajaiban dari bintang-bintang yang membentuk pesan cinta khusus untukmu...
            </p>

            {!isStarted ? (
              <div className="flex justify-center">
                <button
                  onClick={startAnimation}
                  className="px-5 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 shadow-md animate-pulse"
                >
                  Mulai Keajaiban ✨
                </button>
              </div>
            ) : (
              <div 
                ref={containerRef}
                className="relative w-full h-64 sm:h-80 mx-auto mt-4 mb-6 overflow-hidden"
              >
                {visibleStars.map((star) => (
                  <motion.div
                    key={star.id}
                    className="absolute"
                    style={{ top: star.y, left: star.x }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: star.delay,
                      duration: 0.5,
                      type: "spring"
                    }}
                  >
                    <span className="text-yellow-200 text-lg md:text-xl select-none">✨</span>
                  </motion.div>
                ))}
                
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <motion.p 
                      className="text-3xl sm:text-4xl font-bold text-pink-300 mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Cintaku Abadi Untukmu
                    </motion.p>
                    <motion.p
                      className="text-lg text-white max-w-xs"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      Seperti bintang-bintang di langit, cintaku bersinar terang dan tak akan pernah padam
                    </motion.p>
                    
                    <motion.button
                      onClick={onComplete}
                      className="mt-6 px-5 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 shadow-md"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Lanjut ke Kejutan Akhir
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
