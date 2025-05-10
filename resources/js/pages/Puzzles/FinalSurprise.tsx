import { useEffect, useState } from "react"
import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import Foto5 from "@/assets/1.jpg"

export default function FinalSurprise() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Trigger confetti when the page loads
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(confettiInterval)
        return
      }

      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.6 },
        colors: ["#ff77e9", "#ff77a9", "#ff9be9", "#ffcbf2"],
      })
    }, 250)

    // Show message after a delay
    setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => clearInterval(confettiInterval)
  }, [])

  return (
    <>
      <Head title="Selamat Ulang Tahun Sri Mulyarni!" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg border-2 border-pink-300"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 text-center mb-6 sm:mb-8"
          >
            Selamat Ulang Tahun Cintaku! ❤️
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <img
                src={Foto5}
                alt="Kenangan spesial 1"
                className="w-full h-auto sm:h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              />
            </motion.div>
          </div>

          {showMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-center space-y-4 sm:space-y-6"
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Untuk Cintaku yang luar biasa,
                <br />
                <br />
                Di hari spesial ini, aku ingin membuat sesuatu yang unik hanya untukmu. Setiap teka-teki yang kamu pecahkan
                mewakili bagian dari perjalanan kita bersama. Cintamu, senyummu, dan hatimu telah membuat hidupku
                lengkap. Terima kasih telah berjuang bersamaku melewati suka dan duka, dan menjadi diri sendiri.
              </p>

              <div className="py-3 sm:py-4">
                <motion.p
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="text-xl sm:text-2xl font-bold text-pink-600"
                >
                  Aku mencintaimu lebih dari yang bisa diungkapkan kata-kata!
                </motion.p>
              </div>

              <p className="text-base sm:text-lg text-gray-700">
                Ciee yang umurnya udah 21 tahun,
                <br />
                Semoga yang di semogkan tersemogakan cintaku!
              </p>

              <p className="text-lg sm:text-xl font-semibold text-pink-500 mt-6 sm:mt-8">
                Dengan segenap cintaku,
                <br />
                Aku yang mencintaimu
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  )
}
