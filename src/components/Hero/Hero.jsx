import React, { useState } from 'react'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'
import img1 from '../Hero/Idea.png'
import img2 from '../Hero/Event.png'
import img3 from '../Hero/People.png'
import img4 from '../Hero/Feet.png'
import stats1 from '../../assets/stats1.jpeg'
import stats2 from '../../assets/stats2.jpeg'

function Hero() {
   const [counterOn, setCounterOn] = useState(false)

   return (
      <div id='our_stats' className="sm:pt-8 pt-32">
         <div className="glass-morphic lg:m-20 p-4 lg:p-12 shadow-2xl rounded-2xl">
            <div className='flex md:flex-row flex-col'>
               <div>
                  <div className='w-full hero-2'>
                     <div className="flex flex-column justify-start items-center">
                        <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
                        <h1 className="text-[25px] ml-[-30px] font-bold">EDC, BIT Mesra</h1>
                     </div>
                     <div className="mt-6 mb-6">
                        <h1 className="text-[35px] font-bold">Our Stats</h1>
                     </div>
                     <h3 className='text-start text-base mb-4'>With a team of dedicated experts and passionate empowering entrepreneurs, we bring a wealth of experience and knowledge to every proposal. Our expertise helps to enhance one's fostered growth and supports each entrepreneurial journey.</h3>
                  </div>
                  <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                     <div className='w-full h-1/2 flex mt-2 mb-10 flex-col gap-8'>
                        <div className='flex items-center md:justify-start justify-center pt-5 pl-20 gap-24 hero-3'>
                           <div className='w-24 flex flex-col items-center text-xl font-semibold'>
                              <div className=''><span className=' text-3xl decoration-yellow-300'> <img src={img1} alt="" /> </span></div>
                              <h1 >{counterOn && <CountUp start={0} end={30} duration={2} delay={0.25} />}+</h1>
                              <h5 className=''>Startups</h5>
                           </div>
                           <div className='w-24  flex flex-col items-center text-xl font-semibold '>
                              <div className='text-3xl'> <img src={img2} alt="" /> </div>
                              <h1 >{counterOn && <CountUp start={0} end={100} duration={2} delay={0.25} />}+</h1>
                              <h5 className=''>Events</h5>
                           </div>
                        </div>
                        <div className='flex gap-24 hero-3 items-center md:justify-start justify-center pl-20 text-xl font-semibold'>
                           <div className=' w-24  flex flex-col items-center'>
                              <div className='text-3xl'> <img src={img3} alt="" /> </div>
                              <h1 > {counterOn && <CountUp start={0} end={80} duration={2} delay={0.25} />}+</h1>
                              <h5 className=''>Members</h5>
                           </div>
                           <div className=' w-24  flex flex-col items-center text-xl font-semibold'>
                              <div className='pt-3'> <img src={img4} alt="" /></div>
                              <h1 > {counterOn && <CountUp start={0} end={10000} duration={2} delay={0.25} />}+</h1>
                              <h5 className=''>Footfalls</h5>
                           </div>
                        </div>
                     </div>
                  </ScrollTrigger>
               </div>
               <div className='w-full flex flex-col gap-6'>
                  <img className='w-full h-72 rounded-xl shadow-2xl' src={stats1} alt="" />
                  <img className=' w-full h-72 rounded-xl shadow-2xl' src={stats2} alt="" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero