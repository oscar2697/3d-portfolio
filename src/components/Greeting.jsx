import { useEffect, useState, useRef } from "react";

const Greeting = () => {
    const binaryText = "01001000 01100001 01101100 01101100 01101111 00100001"
    const finalText = "Hallo! I'm Oscar"
    const [currentText, setCurrentText] = useState(binaryText)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const textRef = useRef(null)

    const scrambleText = () => {
        let iteration = 0
        const maxIterations = 10

        const interval = setInterval(() => {
            setCurrentText((prev) => {
                const progress = iteration / maxIterations
                const targetLength = Math.floor(finalText.length * progress)
                let result = finalText.substring(0, targetLength)
                const remainingLength = finalText.length - targetLength

                if (remainingLength > 0) {
                    const randomBinary = Array(remainingLength)
                        .fill()
                        .map(() => (Math.random() > 0.5 ? "0" : "1"))
                        .join("")
                    result += randomBinary
                }
                return result
            })

            iteration++

            if (iteration > maxIterations) {
                clearInterval(interval)
                setCurrentText(finalText)
            }
        }, 100)
    }

    useEffect(() => {
        const startAnimation = () => {
            setCurrentText(binaryText)
            setIsTransitioning(false)
            setTimeout(() => {
                setIsTransitioning(true)
                scrambleText()
            }, 1500)
        }

        startAnimation()

        const loopInterval = setInterval(() => {
            startAnimation()
        }, 5000)
        return () => clearInterval(loopInterval)
    }, [])

    return (
        <div className="w-full mx-auto flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center mb-2">
                <p
                    ref={textRef}
                    className={`sm:text-3xl text-xl font-medium text-center font-generalsans transition-all duration-300 ${isTransitioning ? "text-cyan-500 matrix-effect" : "text-cyan-600 matrix-effect"}`}
                >
                    {currentText}
                    <span className="waving-hand">👋🏻</span>
                </p>
            </div>

            <p className="hero_tag text-gray_gradient text-center">Coding Apps mit Passion und solving Probleme, one line at a time!</p>
        </div>
    )
}

export default Greeting