import { useState } from "react"
import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import Foto2 from "@/assets/3.jpg"

interface FirstPuzzleProps {
  onComplete: () => void;
}

export default function FirstPuzzle({ onComplete }: FirstPuzzleProps) {
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // The answer is "cinta"
  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === "cinta") {
      setIsCorrect(true)
    }
  }

  return (
    <>
      <Head title="Teka-teki Pertama" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg border-2 border-pink-300"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 text-center mb-4 sm:mb-6">Teka-teki #1: Kenangan Pertama</h1>

          <div className="mb-6 sm:mb-8 flex justify-center">
            <img
              src={Foto2}
              alt="Kenangan kita"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-center text-gray-700 mb-4">
              Kata dengan 5 huruf yang membuat dunia berputar,
              Dalam kisah kita, itulah yang kita temukan.
              Itulah yang kurasakan saat melihat wajahmu,
              Dan yang membuat jantungku berdebar lebih cepat.
            </p>

            {!isCorrect ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-4 py-2 border border-pink-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2 sm:mb-0"
                    placeholder="Jawaban kamu..."
                  />
                  <button
                    onClick={checkAnswer}
                    className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white font-semibold rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-pink-600 transition duration-300"
                  >
                    Periksa
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-pink-500 hover:text-pink-700 underline"
                  >
                    {showHint ? "Sembunyikan Petunjuk" : "Butuh Petunjuk?"}
                  </button>

                  {showHint && (
                    <p className="mt-2 text-gray-600 italic">Ini adalah emosi terkuat, dan itulah yang kita bagi bersama.</p>
                  )}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <p className="text-green-600 font-semibold mb-4">Benar sekali! Cinta adalah jawabannya. ❤️</p>

                <button
                  onClick={onComplete}
                  className="inline-block px-5 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 shadow-md"
                >
                  Lanjut ke Teka-teki Berikutnya
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
