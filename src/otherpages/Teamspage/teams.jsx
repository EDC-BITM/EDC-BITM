import React from 'react'
import Collage from './Collage'
import Timeline from './Timeline'
import sir1 from '../../assets/Sir1.png'
import sir2 from '../../assets/VShah.png'
import '../Teamspage/teams.css'
import ujjwalS from '../../assets/ujjalSir.png'
import '../Teamspage/timeline.css';
import blob from "../../assets/blobs.png"
import blobR from "../../assets/blobR.png"
import AdarshRaj from "../../assets/Adarsh raj.jpg";
import Debjyoti from "../../assets/Debjyoti Dey.jpeg"
import Diptanshu from "../../assets/Diptanshu Mahakud.jpg";
import Nikhil from "../../assets/NIKHIL KUMAR.png";
import Nishit from "../../assets/Nishit Sharma.png";
import Pranav from "../../assets/Pranav raj.jpg";
import Prince from "../../assets/Prince Raj.jpg";
import Pulkit from "../../assets/Pulkit Rewri.jpg";
import Shubham from "../../assets/Shubham Kumar.jpg";
import VarunG from "../../assets/Varun Gupta.jpg";
import Yash from "../../assets/YASHWANT Bhise.jpeg";
import Yogesh from "../../assets/YOGESH KUMAR.jpg";
import Mugdha from "../../assets/mugdha.png";
import AnshumanRaj from "../../assets/Anshuman Raj-min.jpeg";
import Anudeep from "../../assets/Anudeep.png";
import Aayush from "../../assets/Aayush.png";
import Shantanu from "../../assets/SHANTANU SAMEER.png";
import Varun from "../../assets/Varun.png";
import Shailesh from "../../assets/SHAILESH KASHYAP.png";
import AnshumanT from "../../assets/AnshumanTomar.png";
import VarunS from "../../assets/VarunS.png";
import Amarnath from "../../assets/Amarnath.png";
import Bhawesh from "../../assets/bhawesh.png";
import Aditya from "../../assets/Aditya.png";
import Chirag from "../../assets/Chirag.png";
import { FaLinkedin, FaFacebook, FaInstagram, } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import harshit from "../../assets/Harshit.png";
import rachit from "../../assets/rachit.png";
import aman from "../../assets/Aman Pratik-min.jpeg";
import Sachit from "../../assets/Sanchit.png";
import Harshvardhan from "../../assets/Harshvardhan.png";
import Krish from "../../assets/Krish.png";
import Vaibhav from "../../assets/Vaibhav.png";
import Singh from "../../assets/Singh.png";
import Sushil from "../../assets/Sushil.png";
import Savit from "../../assets/Savit.png";
import Shivam from "../../assets/Shivam.png";
import Aatis from "../../assets/Aatis.png";
import Ashwini from "../../assets/Ashwini.png";
import Ravikant from "../../assets/Ravikant.png";
import Adarsh2 from "../../assets/Adarsh2.png";
import AyushK from "../../assets/AyushK.png";
import vedant from "../../assets/vedantgupta.jpg";

function Teamspage() {
    return (
        <>
            <Collage />
            <div className='mains'>
                <div className='hero-2'>
                <div className="flex flex-row justify-start items-center mt-5 ml-5">
                <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
                <h1 className="text-[25px] ml-[-35px] font-bold">Our Team</h1>
              </div>
                    <div className='flex justify-evenly columns pt-4'>
                    <h2 className='text-2xl font-bold mb-4 text-center '>Faculty Members</h2>

                        <div className='prof'>
                            <img src={sir1} className='sir mb-8' />
                            <div className='text align-center text-center'>
                                <p className='text-center text-2xl name'>Dr. C Jeganathan</p>
                                <div className='flex flex-col justify-center items-center'>
                                    <div class="overlay-text ">Dean of RIE</div>
                                    <div className=' flex gap-4'>
                                        <div class="icon flex "><FaLinkedin /></div>
                                        <div class="icon flex "><FaFacebook /></div>
                                        <div class="icon flex "><IoIosMail /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='prof'>
                            <img src={sir2} className='sir mb-8' />
                            <div className='text align-center text-center'>
                                <p className='text-center text-2xl name'>Vishal H. Shah</p>
                                <div className='flex flex-col justify-center items-center'>
                                    <div class="overlay-text">Faculty Advisor</div>
                                    <div className=' flex  gap-4'>
                                        <div class="icon flex "><FaLinkedin /></div>
                                        <div class="icon flex "><FaFacebook /></div>
                                        <div class="icon flex "><IoIosMail /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='columns'>
                        <div className='p-1'>
                            <h2 className='text-2xl font-bold mb-4 text-center '>Leadership Body</h2>

                        </div>
                        <div className='prof1 flex flex-col align-center justify-evenly '>

                            <div className='flex space*-x-4 justify-evenly columns'>
                                <div className='prof'>
                                    <img src={ujjwalS} className='sir mb-8' />
                                    <div className='text align-center text-center'>
                                        <p className='text-center text-2xl name'>Ujjwal Aman</p>
                                        <div className='flex flex-col justify-center items-center'>
                                            <div class="overlay-text">President</div>
                                            <div className=' flex  gap-4'>
                                                <div class="icon flex "><FaLinkedin /></div>
                                                <div class="icon flex "><FaFacebook /></div>
                                                <div class="icon flex "><IoIosMail /></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className='flex  justify-evenly columns '>
                            <div className='prof flex ' >
                                <img src={Varun} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Kumar Varun</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Joint President</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={vedant} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Vedant Gupta</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Joint President</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Mugdha} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Mugdha Shukla</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Joint President</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={AnshumanRaj} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Anshuman Raj</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Vice President (Operations)</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Anudeep} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Anudeep Kumar</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Vice President (Resources)</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Pulkit} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Pulkit Rewri</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Vice President (Events) </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Aayush} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Aayush Verma</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Vice President (Finance)</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Shantanu} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Shantanu Sameer</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">DIRECTOR -Tech</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Shailesh} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Shailesh Kashyap</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">DIRECTOR-events </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='columns align-center '>
                        <div className='p-1'>
                            <h2 className='text-2xl font-bold mb-4 text-center'>Executive Body</h2>
                        </div>
                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Pranav} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Pranav Raj Srivastav</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">General Secretary</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={AnshumanT} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Anshuman Tomar</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">General Secretary</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Nishit} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Nishit Sharma</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Treasurer</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Yogesh} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Yogesh Kr.</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Joint Secretary</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={VarunS} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Varun Sharma</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Joint Secretary</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Amarnath} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Amarnath</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Joint Treasurer </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Bhawesh} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Bhawesh Pandey</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">ASSOCIATE DIRECTOR </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Debjyoti} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Debjyoti Dey</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Assosiate Director</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Aditya} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Aditya Kr Singh</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Associate Director</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Chirag} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Chirag Agarwal</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">ASSOCIATE DIRECTOR  </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Shubham} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>Shubham Kr</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Events Head </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={harshit} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>HARSHIT SINGH</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Events head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={rachit} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>RACHIT BANSAL</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Content head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={aman} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>AMAN PRATIK</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Content Head  </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Yash} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>YASHWANT BHISE</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">SOCIAL-MEDIA head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={VarunG} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>VARUN GUPTA</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Design head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Sachit} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>SANCHIT JAIN</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Design head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Harshvardhan} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>HARSHVARDHAN </p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Design head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Krish} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>KRISHNANSHU JHA</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">TECH head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>


                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Nikhil} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>NIKHIL KR</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">TECH HEAD</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Vaibhav} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>VAIBHAV KR.</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">TECH HEAD</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Singh} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>SHOURYAMAN SINGH </p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Public relations head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Sushil} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>SUSHIL GUPTA</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">PUBLIC RELATIONS</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>


                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Savit} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>SAVIT RAJ</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Logistics head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Shivam} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>SHIVAM CHOUBEY</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">LOGISTICS HEAD</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Aatis} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>AATISH GANGURDE</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Resource head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Ashwini} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>ASHWINI KUMAR</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Resource head</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>



                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Adarsh2} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>ADARSH KUMAR</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Senior executive members </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={AdarshRaj} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>ADARSH RAJ</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Senior executive members </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Ravikant} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>RAVIKANT SINHA </p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">SENIOR EXECUTIVE MEMBER</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={AyushK} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>AYUSH KARAN</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">SENIOR EXECUTIVE MEMBER</div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>


                        <div className='flex space*-x-4 justify-evenly columns'>
                            <div className='prof flex'>
                                <img src={Diptanshu} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>DIPTANSHU MAHAKUD</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Senior executive members </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='prof flex'>
                                <img src={Prince} className='sir  h-64 w-64' />
                                <div className='text align-center text-center'>
                                    <p className='text-center text-2xl name'>PRINCE RAJ</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div class="overlay-text">Senior executive members </div>
                                        <div className=' flex  gap-4'>
                                            <div class="icon flex "><FaLinkedin /></div>
                                            <div class="icon flex "><FaFacebook /></div>
                                            <div class="icon flex "><IoIosMail /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>




                        </div>












                    </div>
                </div>

            </div>
            <Timeline />
            <img src={blob} class="blob11" />
            <img src={blob} class="blob22" />
            <img src={blobR} class="blob33" />
            <img src={blobR} class="blob55" />
        </>
    )
}

export default Teamspage