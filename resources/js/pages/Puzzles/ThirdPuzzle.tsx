import { useState } from "react"
import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import Foto4 from "@/assets/7.jpg"

interface ThirdPuzzleProps {
  onComplete: () => void;
}

export default function ThirdPuzzle({ onComplete }: ThirdPuzzleProps) {
  const [dragItems, setDragItems] = useState([
    { id: 1, text: "Senyummu", order: null as number | null },
    { id: 2, text: "Membuat", order: null as number | null },
    { id: 3, text: "Hatiku", order: null as number | null },
    { id: 4, text: "Bahagia", order: null as number | null },
    { id: 5, text: "Setiap", order: null as number | null },
    { id: 6, text: "Hari", order: null as number | null },
  ])

  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("id", id.toString())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropOrder: number) => {
    const dragId = e.dataTransfer.getData("id")

    setDragItems(dragItems.map((item) => (item.id === Number.parseInt(dragId) ? { ...item, order: dropOrder } : item)))
  }

  const checkAnswer = () => {
    // Check if all items have been placed
    const allPlaced = dragItems.every((item) => item.order !== null)

    if (allPlaced) {
      // Check if the order is correct: "Senyummu Membuat Hatiku Bahagia Setiap Hari"
      const correctOrder = [1, 2, 3, 4, 5, 6]
      const currentOrder = [...dragItems]
        .filter(item => item.order !== null)
        .sort((a, b) => (a.order as number) - (b.order as number))
        .map((item) => item.id)

      if (JSON.stringify(correctOrder) === JSON.stringify(currentOrder)) {
        setIsCorrect(true)
      }
    }
  }

  const resetPuzzle = () => {
    setDragItems(dragItems.map((item) => ({ ...item, order: null })))
  }

  return (
    <>
      <Head title="Teka-teki Ketiga" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg border-2 border-pink-300"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 text-center mb-4 sm:mb-6">Teka-teki #3: Kata-kata dari Hati</h1>

          <div className="mb-6 sm:mb-8 flex justify-center">
            <img
              src={Foto4}
              alt="Bersama"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-center text-gray-700 mb-4 sm:mb-6">
              Susun kata-kata ini untuk membentuk pesan spesial.
              <br />
              Seret setiap kata ke posisi yang benar.
            </p>

            {!isCorrect ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
                  {dragItems
                    .filter((item) => item.order === null)
                    .map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-pink-100 text-pink-800 rounded-md cursor-move shadow-sm hover:bg-pink-200 transition text-sm sm:text-base"
                      >
                        {item.text}
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const placedItem = dragItems.find((item) => item.order === index)

                    return (
                      <div
                        key={index}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className="h-10 sm:h-12 border-2 border-dashed border-pink-300 rounded-md flex items-center justify-center"
                      >
                        {placedItem && (
                          <div className="px-1 py-1 sm:px-2 sm:py-1 bg-pink-500 text-white rounded-md text-xs sm:text-sm">{placedItem.text}</div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <button
                    onClick={checkAnswer}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition duration-300"
                  >
                    Periksa Jawaban
                  </button>

                  <button
                    onClick={resetPuzzle}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-white text-pink-500 border border-pink-500 font-semibold rounded-md hover:bg-pink-50 transition duration-300 mt-2 sm:mt-0"
                  >
                    Reset
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
                    <p className="mt-2 text-gray-600 italic text-sm sm:text-base">
                      Pesan dimulai dengan "Senyummu" dan diakhiri dengan "Hari".
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <p className="text-green-600 font-semibold mb-4">Itulah Cimulia ❤️</p>

                <button
                  onClick={onComplete}
                  className="inline-block px-5 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 shadow-md"
                >
                  Lanjut ke Kejutan Akhir
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
