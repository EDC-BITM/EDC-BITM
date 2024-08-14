import React from 'react'

import akshay from './akshay.png'
import vatsal from './vatsal.png'
import ravi from './ravi.png'
import jyoti from './jyoti.jpg'
import pawan from './pawan.png'
import rahul from './rahul.png'
import aman from './aman.png'
import vineet from './vineet.png'
import ayush from './ayush.png'
import anshul from './anshul.png'
import anmol from './anmol.png'
import aditya from './aditya.png'
import richa from './richa.png'
import sreedhar from './sreedhar.png'
import adityaRanjan from './adityaRanjan.png'
import rishavJain from './Rishabh Jain.png'
import prateek from './prateek.png'
import sanjeev from './sanjeev.png'
import karan from './karan.png'
import amit from './amit.png'


import '../Speakerpage/speakerpage.css'


function Speakerpage() {
  return (
    <>
    <div className="flex flex-col items-center w-screen">
            <div className="speakerbg h-auto w-full text-white bg-cover ">
                <div className="h-screen md:text-[50px] backdrop-brightness-50 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl sm:text-5xl uppercase font-bold sm:p-4">noteworthy Entrepreneurs</h1>
                <span className='text-4xl sm:text-5xl uppercase font-bold'>who graced our events</span>
                </div>
            </div>
            <div className="lg:m-20 pl-12 pr-12 lg:pl-12 lg:pr-12 w-full">
            <div className="flex flex-row justify-start items-center pt-8 md:p-0 mb-6">
                <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
                <h1 className="text-[25px] ml-[-35px] font-bold">Notable Past Speakers</h1>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 md:p-8 gap-8 pb-8'>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={aman} className='' alt="" />
                <h1 className=' text-xl md:text-2xl'>Aman Dhattarwal</h1>
                <h2 className='text-sm md:text-lg font-normal'>Founder - Apni Kaksha</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={pawan} alt="" />
                <h1  className=' text-lg md:text-2xl'>Pawan Kumar Rai</h1>
                <h2 className='text-sm md:text-lg font-normal' >Founder - Ditto Insurance</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={ravi} alt="" />
                <h1  className=' text-lg md:text-2xl'>Ravi K Ranjan</h1>
                <h2 className='text-sm md:text-lg font-normal'>Ex Shark Tank</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={amit} alt="" />
                <h1  className=' text-lg md:text-2xl'>Amit Chaudhary</h1>
                <h2 className='text-sm md:text-lg font-normal'>Founder - Lenskart</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={karan} alt="" />
                <h1  className=' text-lg md:text-2xl'>Karan Bajaj</h1>
                <h2 className='text-sm md:text-lg font-normal'>Founder - WhiteHat Jr.</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={rishavJain} alt="" />
                <h1  className=' text-lg md:text-2xl'>Rishabh Jain </h1>
                <h2 className='text-sm md:text-lg font-normal'>Labour Law Advisor</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={akshay} alt="" />
                <h1  className=' text-lg md:text-2xl'>Akshay Makar</h1>
                <h2 className='text-sm md:text-lg font-normal'>Educator</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={ayush} alt="" />
                <h1  className=' text-lg md:text-2xl'>Ayush Jaiswal</h1>
                <h2 className='text-sm md:text-lg font-normal'>Founder-Pesto</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={vatsal} alt="" />
                <h1  className=' text-lg md:text-2xl'>Vatsal Kanakiya </h1>
                <h2 className='text-sm md:text-lg font-normal'>Founder - 100X.VC</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={richa} alt="" />
                <h1  className=' text-lg md:text-2xl'>Richa Shrivastava</h1>
                <h2 className='text-sm md:text-lg font-normal'>Managing partner-
                Maker's Asylum</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={sreedhar} alt="" />
                <h1  className=' text-lg md:text-2xl'>Sridhar Jeychandran</h1>
                <h2 className='text-sm md:text-lg font-normal'>Co-founder - Crio.do</h2>
              </div>
              <div className='glass-morphism flex flex-col md:p-20 p-8 justify-center items-center gap-2 font-bold'>
                <img src={adityaRanjan} alt="" />
                <h1  className=' text-lg md:text-2xl'>Aditya Ranjan</h1>
                <h2 className='text-sm md:text-lg font-normal'>Journey of an IAS</h2>
              </div>

            </div>
            
        </div>
        
        </div>
    </>
     )
 }

export default Speakerpage;

