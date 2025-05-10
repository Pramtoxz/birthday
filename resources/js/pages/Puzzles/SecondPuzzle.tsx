import { useState } from "react"
import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import Foto3 from "@/assets/4.jpg"

interface SecondPuzzleProps {
  onComplete: () => void;
}

export default function SecondPuzzle({ onComplete }: SecondPuzzleProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Tanggal ulang tahun - ganti dengan tanggal yang benar
  const checkAnswer = () => {
    if (selectedDate === "2024-11-11") {
      setIsCorrect(true)
    }
  }

  return (
    <>
      <Head title="Teka-teki Kedua" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg border-2 border-pink-300"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 text-center mb-4 sm:mb-6">Teka-teki #2: Hari Spesial</h1>

          <div className="mb-6 sm:mb-8 flex justify-center">
            <img
              src={Foto3}
              alt="Hari spesial"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-center text-gray-700 mb-4">
              Ingatkah kamu hari yang mengubah segalanya?
              Ketika hati kita mulai bernyanyi bersama?
              Pilih tanggal yang menandai awal kita,
              Kenangan yang masih membuatku tersenyum bahagia.
            </p>

            {!isCorrect ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
                  />
                  <button
                    onClick={checkAnswer}
                    className="w-full max-w-xs px-6 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition duration-300"
                  >
                    Periksa Tanggal
                  </button>
                </div>

                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-pink-500 hover:text-pink-700 underline"
                  >
                    {showHint ? "Sembunyikan Petunjuk" : "Butuh Petunjuk?"}
                  </button>

                  {showHint && (
                    <p className="mt-2 text-gray-600 italic">Itu adalah hari yang hangat di bulan November ketika kita pertama kali bertemu.</p>
                  )}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <p className="text-green-600 font-semibold mb-4">
                  Ya! Itulah hari yang memulai perjalanan indah kita bersama. ❤️
                </p>

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
