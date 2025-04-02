import React, { useState } from 'react'
import Globe from 'react-globe.gl'
import Button from '../components/Button'

const About = () => {
    const [hasCopy, setHasCopy] = useState()

    const handleCopy = () => {
        navigator.clipboard.writeText('lindooscar635@gmail.com')

        setHasCopy(true)

        setTimeout(() => {
            setHasCopy(false)
        }, 2000)
    }

    return (
        <section className='c-space my-20' id='about'>
            <div className='grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'>
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img
                            src='/assets/grid1.png'
                            alt='grid-1'
                            className='w-full sm:h-[276px] h-fit object-contain'
                        />

                        <div>
                            <p className='grid-headtext'>Hallo, I'm Oscar!</p>
                            <p className='grid-subtext'>
                                As a Software Ingenieur with experience as a Frontend-Entwickler and solid Backend skills,
                                I create dynamic and responsive web applications.
                                I love writing sauber und effizient code while continuously learning and improving!
                            </p>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img
                            src='/assets/grid2.png'
                            alt='grid-2'
                            className='w-full sm:h-[276px] h-fit object-contain'
                        />

                        <div className='grid-headtext'>Tech Stack</div>
                        <div className='grid-subtext'>
                            I have expertise in multiple programming languages,
                            frameworks, and tools, enabling me to develop robust, scalable, and high-performance applications.
                        </div>
                    </div>
                </div>

                <div className='col-span-1 xl:row-span-4'>
                    <div className='grid-container'>
                        <div className='rounded-3xl w-full sm:h-[326px] h-fit justify-center items-center'>
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor='rgba(0, 0, 0, 0)'
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{
                                    lat: -1.2491,
                                    lng: -78.6167,
                                    text: "I'm Here!",
                                    color: 'black',
                                    size: 20
                                }]}
                            />
                        </div>

                        <div>
                            <p className="grid-headtext">I’m very flexible with remote collaboration</p>
                            <p className="grid-subtext">
                                I'm based in Ecuador and experienced in working remotely with teams across different time zones.
                                I'm open to global opportunities and always ready to adapt to new challenges.
                            </p>

                            <Button
                                name='Contact Me'
                                isBeam
                                containerClass='w-full mt-10'
                            />
                        </div>
                    </div>
                </div>

                <div className='xl:col-span-2 xl:row-span-3'>
                    <div className='grid-container'>
                        <img
                            src='/assets/grid3.png'
                            alt='grid-3'
                            className='w-full sm:h-[266px] h-fit object-contain'
                        />

                        <div>
                            <p className="grid-headtext">Building Solutions Through Code</p>
                            <p className="grid-subtext">
                                I enjoy developing software that solves real-world problems.
                                For me, programming isn’t just a job—it’s a constant learning journey.
                                I love exploring new technologies, improving my skills, and writing clean,
                                efficient code to build scalable solutions.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='xl:col-span-1 xl:row-span-2'>
                    <div className='grid-container'>
                        <img
                            src='/assets/grid4.png'
                            alt='grid-4'
                            className='w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top'
                        />

                        <div className='space-y-2'>
                            <p className='grid-subtext text-center'>Contact Me</p>

                            <div className='copy-container' onClick={handleCopy}>
                                <img 
                                    src={hasCopy ? 'assets/tick.svg' : 'assets/copy.svg'}
                                    alt='copy'
                                />

                                <p className='lg:text-2xl md:text-xl font-medium text-gray_gradient text-white'>lindooscar635@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
