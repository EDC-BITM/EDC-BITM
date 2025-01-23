import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/edclogo3d.png";
import emailjs from '@emailjs/browser';
import { FaArrowCircleRight } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import './footer.css';

const Footer = () => {
  const [email, setEmail] = useState(' ');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const service_ID = 'service_okd22ng'
    const temp_ID = 'template_5nv8jld'
    const user_ID = '2APikPfV0dHkUmski'

    emailjs.send(service_ID, temp_ID,
      {
        from_name: 'unknown',
        from_email: email,
        to_name: 'TEAM EDC',
        message: email,
      },
      user_ID
    ).then((r) => {
      console.log('msg sent', r);
    })
      .catch((error) => {
        console.error('error occured', error);
      })


    setTimeout(() => {
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-black w-screen text-white p-4">
      <div className="flex flex-col md:justify-center items-center">
        <div className=" flex flex-col md:justify-center items-center">
          <div className="flex sm:flex-row flex-col gap-12">
            <div className="align-center">
                <p>
                  <Link to="/" className="lg:text-[5rem] font-bold flex flex-row md:justify-start items-center" onClick={() => window.scrollTo(0, 0)}>
                    <img src={logo} alt="" className="w-12 h-12" />
                    <span className="sm:block text-white text-[15px] pl-1">Entrepreneurship <br />Development Cell</span>
                  </Link>
                </p>
                <div className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <label className="flex flex-col" >
                      <div className="flex h-12 text-black mb-6">
                        <input onChange={handleChange} type="text" name="email" id="email" value={email} placeholder="Send your message" required className="h-12 w-full pl-4 pt-1 pb-1 pr-4 text-md rounded-tl-3xl rounded-bl-3xl">
                        </input>
                        <i type="submit" onClick={handleSubmit} className=" h-full w-auto text-3xl font-black pt-2 pr-2 pl-4 cursor-pointer bg-white rounded-tr-3xl rounded-br-3xl"><FaArrowCircleRight className="text-black" /></i>
                      </div>
                    </label>
                  </form>
                <div className="socialmedia flex flex-row gap-2">
                  <p>
                    <a href="https://www.instagram.com/edcbitmesra" target="https://www.instagram.com/edcbitmesra" rel="noopener noreferrer"><FaInstagram className="instagramIcon w-9 h-9"></FaInstagram></a>
                  </p>
                  <p>
                    <a href="https://www.facebook.com/edcbitmesra" target="_blank" rel="noopener noreferrer"><FaFacebook className="facebookIcon w-9 h-9" /></a>
                  </p>
                  <p>
                    <a href="https://www.linkedin.com/company/edcbitmesra/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="linkedinIcon w-9 h-9"></FaLinkedinIn></a>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:ml-20 flex flex-col">
              <h3 className="font-bold pb-4">Quick Links</h3>
              <a href="mailto:jeganathanc@bitmesra.ac.in">
                <p className="hover:text-yellow-400 text-xs pb-2 text-[#B6B6B6]">Dean of RIE</p>
              </a>
              <a href="mailto:vishalhshah@bitmesra.ac.in">
                <p className="hover:text-yellow-400 text-xs pb-2 text-[#B6B6B6]">Faculty Advisor</p>
              </a>
            </div>
            <div className="flex flex-col md:pl-12">
              <h3 className="text-lg font-bold sm:text-center sm:mb-2 mb-4">Contact Us</h3>
              <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className=" min-w-[150px] md:min-w-[100px]">
                  <h6 className="font-semibold mb-2">For Official</h6>
                  <a href="mailto:president.edc@bitmesra.ac.in"
                    className="block mb-2 hover:scale-100">
                    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6]">President</p>
                  </a>
                  <a href="mailto:team.edc@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6]">EDC Team</p>
                  </a>
                </div>
                <div className="min-w-[150px] md:min-w-[100px]">
                  <h6 className="font-semibold mb-2">For Queries</h6>
                  <a href="mailto:btech10947.22@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6]">Pranav Raj Srivastav</p>
                  </a>
                  <a href="mailto:btech10731.22@bitmesra.ac.in" className="block mb-2">
                    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6]">Anshuman Tomar</p>
                  </a>
                </div>
                <div className=" min-w-[200px]">
                  <h6 className="font-semibold mb-2">For Enquiries</h6>
                  <a href="mailto:btech10883.22@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6]">Nikhil Kumar</p>
                  </a>
                  <a href="mailto:btech10048.22@bitmesra.ac.in" className="block mb-2">
                    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6]">Vaibhav Kr Gupta</p>
                  </a>
                  <a href="mailto: mailto:btech10962.22@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6]">Krishnanshu Jha</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm">
            <p>
            ©{new Date().getFullYear()} EDC, BIT Mesra. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
