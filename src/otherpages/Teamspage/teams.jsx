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
            <div className="flex flex-row justify-start items-center mt-10 ml-10">
                <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
                <h1 className="text-[25px] ml-[-25px] font-bold">Our Team</h1>
            </div>
            <h1 className="text-2xl items-center font-bold mt-10 ml-10">Faculty Members</h1>
            <div className='flex justify-center items-center columns pt-2 sm:pt-8'>
                <div className='prof shadow-2xl'>
                    <img src={sir1} className='sir mb-8' />
                    <div className='text align-center text-center'>
                        <p className='text-center text-2xl name'>Dr. C Jeganathan</p>
                        <div className='flex flex-col justify-center items-center'>
                            <div class="overlay-text">Dean of RIE</div>
                            <div className=' flex gap-4'>
                                <div href="" class="icon flex "><a href="https://www.linkedin.com/in/jeganathan-chockalingam-126003306/"><FaLinkedin /></a></div>
                                <div href="" class="icon flex "><FaFacebook /></div>
                                <div href="" class="icon flex "><a href="mailto:jeganathanc@bitmesra.ac.in"><IoIosMail /></a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='prof shadow-2xl'>
                    <img src={sir2} className='sir mb-8' />
                    <div className='text align-center text-center'>
                        <p className='text-center text-2xl name'>Vishal H. Shah</p>
                        <div className='flex flex-col justify-center items-center'>
                            <div class="overlay-text">Faculty Advisor</div>
                            <div className=' flex  gap-4'>
                                <div class="icon flex "><a href="https://www.linkedin.com/in/vishal-hshah/"><FaLinkedin /></a></div>
                                <div class="icon flex "><a href="https://www.facebook.com/vishal.h.shah.7/"><FaFacebook /></a></div>
                                <div class="icon flex "><a href="mailto:vishalhshah@bitmesra.ac.in"></a><IoIosMail /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='columns'>
                    <h2 className='text-2xl font-bold mb-2 mt-2 text-center'>Leadership Body</h2>
                </div>
                <div className='flex flex-col align-center justify-center items-center '>
                    <div className='flex space*-x-4 justify-center items-center columns'>
                        <div className='prof shadow-2xl'>
                            <img src={ujjwalS} className='sir mb-8' />
                            <div className='text align-center text-center'>
                                <p className='text-center text-2xl name'>Ujjwal Aman</p>
                                <div className='flex flex-col justify-center items-center'>
                                    <div class="overlay-text">President</div>
                                    <div className=' flex  gap-4'>
                                        <div class="icon flex "><a href="https://www.linkedin.com/in/ujjwal-aman/"><FaLinkedin /></a></div>
                                        <div class="icon flex "><a href="https://www.instagram.com/ujjwal_aman?igsh=MXNoNDAwZnc2ODRldQ=="><FaInstagram /></a></div>
                                        <div class="icon flex "><a href="mailto:btech10033.21@bitmesra.ac.in"><IoIosMail /></a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </div>
                <div className='flex justify-center items-center columns '>
                    <div className='prof shadow-2xl flex ' >
                        <img src={Varun} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Kumar Varun</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Joint President</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/kumar-varun-srivastava-47586422a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/varunsrivastava123?igsh=emJtNGt2aWUwbTds"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10916.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={vedant} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Vedant Gupta</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Joint President</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/vedant-gupta-bloom-tide/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/vedant.gupta.1706?igsh=bHpmanU4ZXJwbXA2"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10367.21@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Mugdha} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Mugdha Shukla</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Joint President</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/mugdha10/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/mugdhaaaaa?igsh=empsNmgwMDdpc2Nm"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10259.21@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={AnshumanRaj} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Anshuman Raj</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Vice President (Operations)</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/anshuman-raj-81818b1b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/anshuman18_4?igsh=MWR2dW1wYzA1cnZlcQ%3D%3D&utm_source=qr"> <FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10048.21@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Anudeep} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Anudeep Kumar</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Vice President (Resources)</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/anudeep-appie/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/a.new_deep?igsh=MW5rY3R2ZGRkZGtvcA=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10679.21@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Pulkit} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Pulkit Rewri</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Vice President (Events) </div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/pulkit-rewri-b6b8b8136/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/pulkit_rewri?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10312.21@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Aayush} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Aayush Verma</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Vice President (Finance)</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/aayush-verma-77737b22a/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><FaInstagram /></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Shantanu} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Shantanu Sameer</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Director (Tech)</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/shantanu-sameer/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/shantanu_128?igsh=eXlhdnNhZW5ycnRr"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10594.21@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Shailesh} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Shailesh Kashyap</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Director (Events)</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/shailesh-kashyap-47030023a/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/kashyp_shailesh30?igsh=OGFrcDBpbnlmcmZi"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10643.21@bitmesra.ac.in"><IoIosMail /></a></div>
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
                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Pranav} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Pranav Raj Srivastav</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">General Secretary</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/pranav-raj-srivastav-891633240?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/pranav_raj_srivastav_03?igsh=MWkwZDhtZXByeGdzbw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10947.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={AnshumanT} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Anshuman Tomar</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">General Secretary</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/anshuman-tomar-3354a01b6/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/papabizz_?igsh=MXNkY3MzeTlwb2lrZQ=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10731.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <div className='flex justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Nishit} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Nishit Sharma</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Treasurer</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/nishit-sharma-48350a248/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/nishitsharma390/"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10875.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Yogesh} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Yogesh Kumar</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Joint Secretary</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="http://www.linkedin.com/in/yogeshkr7"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/yogex.7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10259.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={VarunS} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Varun Sharma</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Joint Secretary</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/varun-kumar-08682028a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/varunsharmaaaaaa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Amarnath} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Amarnath</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Joint Treasurer</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/amarnath-singh-90b201255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/amarnath_raj12?igsh=MXZ3ZG04OXZteTRwNw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10241.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Bhawesh} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Bhawesh Pandey</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Associate Director</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/bhawesh-pandey-b61072263/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><FaInstagram /></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Debjyoti} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Debjyoti Dey</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Assosiate Director</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="http://linkedin.com/in/debjyoti-dey-876b18270"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/debjyoti_3333?igsh=MTI3dnkzc2k4bnh0MQ=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10908.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Aditya} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Aditya Kumar Singh</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Associate Director</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/aditya-kumar-singh-730040303/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/aditya_kr_01_?igsh=MWdqcWlqdmI2NmNkdA=="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Chirag} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Chirag Agarwal</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Associate Director</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/chirag-agarwal-1476a725b/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/_chirag_27?igsh=NXBrb2swOTQza3l"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Shubham} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Shubham Kumar</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Events Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/shubhamk1608?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/kumar_shubham16?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10073.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={harshit} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Harshit Singh</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Events Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/harshit-singh-sikrawar-453142262/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a hef="https://www.instagram.com/_.harshit2?igsh=b3hsODNwbzFsZ3ln"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={VarunG} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Varun Gupta</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Design Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><FaLinkedin /></div>
                                    <div class="icon flex "><FaInstagram /></div>
                                    <div class="icon flex "><a href="mailto:btech10029.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Sachit} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Sanchit Jain</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Design Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/sanchit-jain-2a1374258/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/sanchit_1107?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Harshvardhan} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Harshvardhan</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Design Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/harshvardhanx?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/harsh._hv?igsh=cHN2Ym4ydGRlcmRl"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={rachit} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Rachit Bansal</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Content Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/this-is-rachit-bansal/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><FaInstagram /></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={aman} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Aman Pratik</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Content Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/aman-pratik-97a656262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/amanpratik7?igsh=MTg4ZDI2d2pjdDQ3MQ%3D%3D&utm_source=qr"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10642.22@bitmesra.ac.in"></a><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Krish} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Krishnanshu Jha</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Tech Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><FaLinkedin /></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/krishnanshujha?igsh=OGtjNzV3ODg1dDFh"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Nikhil} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Nikhil Kumar</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Tech Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/nikhilkr16?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/nikhil_kr16?igsh=d3N3czdiNGhqaDM0"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Vaibhav} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Vaibhav Gupta</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Tech Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/vaibhav-gupta-9b03a7270/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><FaInstagram /></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Yash} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Yashwant Bhise</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Social Media Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/yashwant-bhise-7a450424b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/ig_yashwantbhise?igsh=MWJ1Nnl1YWVzMHF5ZA%3D%3D&utm_source=qr"><FaInstagram /></a></div>
                                    <div class="icon flex "><a href="mailto:btech10800.22@bitmesra.ac.in"><IoIosMail /></a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Sushil} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Sushil Gupta</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Public Relations Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><FaLinkedin /></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/sushilgupta.202?igsh=Y3JlODcyeTB0MnNk"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Singh} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Shouryaman Singh</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Public Relations Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/shouryaman/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><FaInstagram /></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>




                </div>


                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Savit} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Savit Raj</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Logistics Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/savit-raj?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/hades_81597?igsh=MXg0YWc0OHE3bzF2Nw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Shivam} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Shivam Chaubey</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">LLogistics Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/shivam-chaubey-16a45b260/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><FaInstagram /></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Aatis} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Aatish Gangurde</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Resource Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/aatish-gangurde-baa4b8258/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/aatisshh_?igsh=MXI5dnhpeDc4Z3o3eA=="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Ashwini} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Ashwini Kumar</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Resource Head</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/ashwinikumarbit?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/ashwini6757?igsh=a2l2ZnJhYTAzMmh2"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>



                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={Adarsh2} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Adarsh Kumar</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Senior Executive Member</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href=""><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/ad.arsh21923?igsh=MW5oaXh5ZzFrY3Zneg=="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={AdarshRaj} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Adarsh Raj</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Senior Executive Member</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/iadarshraj?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/adarsh_raj18?igsh=bHQ5bWVneGEwNWw2"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Ravikant} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Ravikant Sinha</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Senior Executive Member</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/ravikant-sinha-304a0b257/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/rs__ravi01?igsh=dTh2b254d2Y3cmMz"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex space*-x-4 justify-center items-center columns'>
                    <div className='prof shadow-2xl flex'>
                        <img src={AyushK} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Ayush Karan</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Senior Executive Member</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/ayush-karan-6a06182a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/ayushkaran.006?igsh=amh2NXVyMzZrZXUz"><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Diptanshu} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Diptanshu Mahakud</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Senior Executive Member</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/diptanshu-mahakud"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/__diptanshu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='prof shadow-2xl flex'>
                        <img src={Prince} className='sir  h-64 w-64' />
                        <div className='text align-center text-center'>
                            <p className='text-center text-2xl name'>Prince Raj</p>
                            <div className='flex flex-col justify-center items-center'>
                                <div class="overlay-text">Senior Executive Member</div>
                                <div className=' flex  gap-4'>
                                    <div class="icon flex "><a href="https://www.linkedin.com/in/prince-raj-529558309/"><FaLinkedin /></a></div>
                                    <div class="icon flex "><a href="https://www.instagram.com/princeraj073?igsh=Z20wOXdsbjZhMjI="><FaInstagram /></a></div>
                                    <div class="icon flex "><IoIosMail /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Timeline />
            <img src={blob} class="blob11 -z-10 mt-10" />
            <img src={blob} class="blob22" />
            <img src={blobR} class="blob33" />
            <img src={blobR} class="blob55" />
        </>
    )
}

export default Teamspage