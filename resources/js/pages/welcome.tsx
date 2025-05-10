"use client"
import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import Foto1 from "@/assets/1.jpg"
import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import happyBirthdaySong from "@/assets/happy.mp3"
import FirstPuzzle from "./Puzzles/FirstPuzzle"
import SecondPuzzle from "./Puzzles/SecondPuzzle"
import ThirdPuzzle from "./Puzzles/ThirdPuzzle"
import FinalSurprise from "./Puzzles/FinalSurprise"

export default function Welcome() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentPage, setCurrentPage] = useState("welcome")

  useEffect(() => {
    // Menampilkan dialog saat halaman dimuat
    setIsDialogOpen(true)
    
    return () => {
      // Membersihkan audio saat komponen unmount
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
    setIsDialogOpen(false)
  }

  // Fungsi untuk navigasi antar halaman
  const navigateTo = (page: string) => {
    setCurrentPage(page)
  }

  // Render halaman berdasarkan currentPage
  const renderPage = () => {
    switch (currentPage) {
      case "first":
        return <FirstPuzzle onComplete={() => navigateTo("second")} />
      case "second":
        return <SecondPuzzle onComplete={() => navigateTo("third")} />
      case "third":
        return <ThirdPuzzle onComplete={() => navigateTo("final")} />
      case "final":
        return <FinalSurprise />
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl w-full p-6 sm:p-8 bg-white rounded-lg shadow-lg border-2 border-pink-300"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 text-center mb-6">Untuk Cintaku, <br />Sri Mulyarni ❤️</h1>

              <div className="mb-6 sm:mb-8 flex justify-center">
                <img
                  src={Foto1}
                  alt="Kenangan spesial"
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full border-4 border-pink-300 shadow-md"
                />
              </div>

              <p className="text-base sm:text-lg text-center text-gray-700 mb-6 sm:mb-8">
                Aku telah menyiapkan sesuatu yang spesial untukmu. Silahkan petunjuknya, pecahkan teka-tekinya, Selamat Ulang Tahun Cintaku
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => navigateTo("first")}
                  className="px-5 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 shadow-md"
                >
                  Mulai Perjalananmu
                </button>
              </div>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <>
      <Head title="Kejutan Spesial" />
      {renderPage()}

      {/* Audio element tersembunyi */}
      <audio ref={audioRef} src={happyBirthdaySong} loop />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Happy Birthday Cintaku</DialogTitle>
            <DialogDescription className="text-center">
              Selamat Ulang Tahun yang ke-21 Tahun
              Semoga tahun ini menjadi tahun yang paling berkesan
              <br />
              Maaf sederhanaannya, tapi aku sangat mengharapkan kamu suka!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-4">
            <button
              onClick={playMusic}
              className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition"
            >
              I Love You More
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
