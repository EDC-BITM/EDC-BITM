import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/edclogo3d.png";
import emailjs from '@emailjs/browser';
import "./footer.css";
import edclogo from "../../assets/edclogo3d.png";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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
      setLoading(false); // Reset loading state (optional)
      // Reset form data

      setEmail(' ');
    }, 1000);
  };

  return (
    <div className="footer">
      <div className="sm:ml-20 flex flex-col justify-center items-center">
        <div className="flex md:flex-row flex-col">
          <div className="flex md:flex-row flex-col">
            <div className="sb__footer-links_edc scale-125">
              <div className="sb__footer-links_edc_upper mt-6 ">
                <p>
                <Link to="/" className="lg:text-[18px] font-bold flex flex-row justify-center items-center" onClick={() => window.scrollTo(0, 0)}>
                            <img src={logo} alt="" className="w-12 h-12" />
                            <span className="sm:block font-medium text-[15px]">Entrepreneurship <br />Development Cell</span>
                        </Link>
                </p>

              </div>
              <div className="para">
                <div className="">
                  <form onSubmit={handleSubmit}>
                    <label className="flex flex-col" >
                      <div className="flex h-10 md:w-72 text-black mb-5">
                        <input onChange={handleChange} type="text" name="email" id="email" value={email} placeholder="Send your message here" required className="h-10 w-full pl-7 pt-1 pb-1 text-sm rounded-tl-3xl rounded-bl-3xl">
                        </input>
                        <i type="submit" onClick={handleSubmit} className=" h-full w-auto text-3xl font-black pt-1 pr-2 cursor-pointer bg-white rounded-tr-3xl rounded-br-3xl"><FaArrowCircleRight className="text-black" /></i>
                      </div>
                    </label>
                  </form>
                </div>
                <div className="socialmedia">
                <p>
                    <a href="https://www.instagram.com/edcbitmesra" target="https://www.instagram.com/edcbitmesra" rel="noopener noreferrer"><FaInstagram className="instagramIcon"></FaInstagram></a>
                  </p>
                  <p>
                    <a href="https://www.facebook.com/edcbitmesra" target="_blank" rel="noopener noreferrer"><FaFacebook className="facebookIcon" /></a>
                  </p>
                  <p>
                    <a href="https://www.linkedin.com/company/edcbitmesra/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="linkedinIcon"></FaLinkedinIn></a>
                  </p>
                </div>
              </div>
            </div>
            <div className="sb__footer-links_div md:ml-40">
              <h3>Quick Links</h3>
              <a href="mailto:jeganathanc@bitmesra.ac.in">
                <p className="hover:text-yellow-400">Dean of RIE</p>
              </a>
              <a href="mailto:vishalhshah@bitmesra.ac.in">
                <p className="hover:text-yellow-400">Faculty Advisor</p>
              </a>
            </div>
          </div>
          <div className="flex gap-20 md:flex-row flex-col">
            <div className=" sb__footer-links_div w-auto ">
              <h3 className="text-lg font-semibold mb-4 align">Contact Us</h3>
              <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className=" min-w-[150px] md:min-w-[100px]">
                  <h6>For Official</h6>
                  <a href="mailto:president.edc@bitmesra.ac.in"
                    className="block mb-2 hover:scale-100">
                    <p className="hover:text-yellow-400">President</p>
                  </a>
                  <a href="mailto:team.edc@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400">EDC Team</p>
                  </a>
                </div>
                <div className="min-w-[150px] md:min-w-[100px]">
                  <h6>For Queries</h6>
                  <a href="mailto:btech10947.22@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400">Pranav Raj Srivastav</p>
                  </a>
                  <a href="mailto:btech10731.22@bitmesra.ac.in" className="block mb-2">
                    <p className="hover:text-yellow-400">Anshuman Tomar</p>
                  </a>
                </div>
                <div className=" min-w-[200px]">
                  {/* <!-- Add more links if needed --> */}
                  <h6>For Enquiries</h6>
                  <a href="mailto:btech10883.22@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400">Nikhil Kumar</p>
                  </a>
                  <a href="mailto:btech10048.22@bitmesra.ac.in" className="block mb-2">
                    <p className="hover:text-yellow-400">Vaibhav Kr Gupta</p>
                  </a>
                  <a href="mailto: mailto:btech10962.22@bitmesra.ac.in" className="block mb-2 ">
                    <p className="hover:text-yellow-400">Krishnanshu Jha</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>
              Copyright @{new Date().getFullYear()} EDC, BIT Mesra. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
