import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";
import { HackerRoom } from "../components/HackerRoom";
import CanvasLoader from "../components/CanvasLoader";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import Target from "../components/Target";
import ReactLogo from "../components/ReactLogo";
import Cube from "../components/Cube";
import Rings from "../components/Rings";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";

const Hero = () => {
    const binaryText = "01001000 01100001 01101100 01101100 01101111 00100001"
    const finalText = "Hallo! I'm Oscar"
    const [currentText, setCurrentText] = useState(binaryText)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const textRef = useRef(null)

    const isSmall = useMediaQuery({ maxWidth: 440 })
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })

    const sizes = calculateSizes(isSmall, isMobile, isTablet)

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
        <section className="min-h-screen w-full flex flex-col relative" id="home">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p
                    ref={textRef}
                    className={`sm:text-3xl text-xl font-medium text-center font-generalsans transition-all duration-300 ${isTransitioning ? "text-cyan-500 matrix-effect" : "text-cyan-600 matrix-effect"}`}
                >
                    {currentText}
                    <span className="waving-hand">👋🏻</span>
                </p>

                <p className="hero_tag text-gray_gradient">Coding Apps mit Passion und solving Probleme, one line at a time!</p>
            </div>

            <div className="w-full h-full absolute inset-0">
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />

                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0.1, -Math.PI, 0]}
                            />
                        </HeroCamera>

                        <group>
                            <Target position={sizes.targetPosition} />
                            <ReactLogo position={sizes.reactLogoPosition} />
                            {/* <Rings position={sizes.ringPosition} scale={0.5} /> */}
                            <Cube position={sizes.cubePosition} />
                        </group>

                        <ambientLight intensity={1} />

                        <directionalLight
                            position={[10, 10, 10]}
                            intensity={0.5}
                        />
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-7 left-0 right-0 w-full z-0 c-space">
                <a href="#contact" className="w-fit">
                    <Button 
                        name="Let's work together"
                        isBeam
                        containerClass='sm:w-fit w-full sm:min-w-96'
                    />
                </a>
            </div>
        </section>
    );
};

export default Hero