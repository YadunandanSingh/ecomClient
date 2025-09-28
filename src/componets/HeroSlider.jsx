import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getHeroSlides, createHeroSlide, deleteHeloSlide } from "../Features/HeroSlide/HeroSlideSlice"


export default function HeroSlider() {

  const dispatch = useDispatch()
  const { heroSlides } = useSelector((state) => state.heroSlide)


  const [current, setCurrent] = useState(0)

  //Auto slide every 7s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, 7000)
    dispatch(getHeroSlides())

    console.log('slides', heroSlides)
    return () => clearInterval(interval)
  }, [heroSlides.length, dispatch])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }

  return (
    <>
      {heroSlides.length > 0 ? <div className="relative w-full h-[500px] overflow-hidden">
        {/* Slides */}

        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={'http://localhost:8000' + slide.imagePath}
              alt={`slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center">
              <h2 className="text-3xl md:text-5xl font-bold">We are Delicio</h2>
              <h2 className="text-xl md:text-2xl mt-2">
                Ideal for every Chocoholic
              </h2>
              <a
                href="#"
                className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                SEE OUR OFFER
              </a>
            </div> */}
          </div>
        ))}
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/70"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/70"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-gray-500"
                }`}
            />
          ))}
        </div>
      </div> : null}

    </>
  )
}
