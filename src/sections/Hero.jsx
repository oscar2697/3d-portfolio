import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";
import { HackerRoom } from "../components/HackerRoom";
import CanvasLoader from "../components/CanvasLoader";
import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const binaryText = "01001000 01100001 01101100 01101100 01101111 00100001"
    const finalText = "Hallo! I'm Oscar"
    const [currentText, setCurrentText] = useState(binaryText)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const textRef = useRef(null)

    const controls = useControls('HackerRoom', {
        positionX: {
            value: 2.5,
            min: -10,
            max: 10,
        },
        positionY: {
            value: 2.5,
            min: -10,
            max: 10,
        },
        positionZ: {
            value: 2.5,
            min: -10,
            max: 10,
        },
        rotationX: {
            value: 2.5,
            min: -10,
            max: 10,
        },
        rotationY: {
            value: 2.5,
            min: -10,
            max: 10,
        },
        rotationZ: {
            value: 2.5,
            min: -10,
            max: 10,
        },
        scale: {
            value: 1,
            min: 0.1,
            max: 10,
        },
    })

    const mobile = useMediaQuery({maxWidth: 768})

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
        <section className="min-h-screen w-full flex flex-col relative bg-black">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 items-center c-space gap-3">
                <p
                    ref={textRef}
                    className={`sm:text-3xl text-2xl font-medium text-center font-generalsans transition-all duration-300 ${isTransitioning ? "text-cyan-500 matrix-effect" : "text-cyan-600 matrix-effect"}`}
                >
                    {currentText}
                    <span className="waving-hand">👋🏻</span>
                </p>

                <p className="hero_tag text-gray_gradient">Coding Apps mit Passion und solving Probleme, one line at a time!</p>
            </div>

            <div className="w-full h-full absolute inset-0">
                <Leva />

                <Canvas className="w-full h-full">
                    <Suspense fullback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        <HackerRoom
                            position={[2, -8, 2]}
                            rotation={[0, Math.PI, 0]}
                            scale={0.1}
                        />


                        <ambientLight intensity={1} />

                        <directionalLight
                            position={[10, 10, 10]}
                            intensity={mobile ? 0.07 : 0.1}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Hero;