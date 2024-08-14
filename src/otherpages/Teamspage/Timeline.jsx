import React from "react";
import edclogo from "../../assets/edclogo3d.png";
import '../Teamspage/timeline.css';
import ujjwalS from '../../assets/ujjalSir.png'
import pranit from '../../assets/Pranit 23-24.jpeg'
import saumya from '../../assets/Saumya Agarwal 22-23.jpeg'
import sarwadi from '../../assets/Sarwadi.jpeg'
import utkarsh from '../../assets/utkarsh mishra 20-21.jpeg'
import rahul from '../../assets/Rahul thakur 19-20.jpeg'
function Timeline() {
  return (
    <div className='teamsparentboxx '>
      <div className='teamsboxx block'>
        <div className='p-1'> <h3 className='text-xl font-semibold ml-7 mb-4 mt-8'><span className='bg-yellow-300 pt-2 pb-2 pl-4'>Ha</span>ll of Fame</h3>
          <h2 className='text-2xl font-bold ml-7 mb-4 mt-7 '>Previous Presidents</h2>
        </div>
        <div className='teamstimeee'>
          <div className='teamstimeline'>
            <div class="teamscontainer teamsleft-container">
              <img src={edclogo} alt="EDC Logo" />
              <div>
                <div class="teamstext-box">
                  <div className=" sm:hidden bg-cover bg-center h-24 w-24 relative z-100 mr-20 ml-8 border border-black	rounded-md hidden md:block lg:block xl:block" style={{ backgroundImage: `url(${pranit})` }}>
                    {/* You can add any content here */}
                  </div>
                  <div>
                    <h2>EDC President</h2>
                    <small>2023-2024</small>
                    <p>Pranit</p>
                    <span class="left-container-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="teamscontainer teamsright-container">
              <img className="img111" src={edclogo} alt="EDC Logo" />
              <div>
                <div class="teamstext-box">
                  <div className=" bg-cover bg-center h-24 w-24 relative z-100 mr-20 ml-8 border border-black	rounded-md hidden md:block lg:block xl:block" style={{ backgroundImage: `url(${ saumya })` }}>
                    {/* You can add any content here */}
                  </div>
                  <div>
                    <h2>EDC President</h2>
                    <small>2022-2023</small>
                    <p>Saumya Agarwal</p>
                    <span class="right-container-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="teamscontainer teamsleft-container">
              <img src={edclogo} alt="EDC Logo" />
              <div>
                <div class="teamstext-box">
                  <div
                    className=" bg-cover bg-center h-24 w-24 relative z-100 mr-20 ml-8 border border-black	rounded-md hidden md:block lg:block xl:block"
                    style={{ backgroundImage: `url(${ sarwadi })` }}>
                    {/* You can add any content here */}
                  </div>
                  <div>
                    <h2>EDC President</h2>
                    <small>2021-2022</small>
                    <p>Sarwadi Satank</p>
                    <span class="left-container-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="teamscontainer teamsright-container">
              <img src={edclogo} alt="EDC Logo" />
              <div>
                <div class="teamstext-box">
                  <div
                    className=" bg-cover bg-center h-24 w-24 relative z-100 mr-20 ml-8 border border-black	rounded-md hidden md:block lg:block xl:block"
                    style={{ backgroundImage: `url(${ utkarsh })` }}>
                    {/* You can add any content here */}
                  </div>
                  <div>
                    <h2>EDC President</h2>
                    <small>2020-2021</small>
                    <p>Utkarsh Mishra</p>
                    <span class="right-container-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="teamscontainer teamsleft-container">
              <img src={edclogo} alt="EDC Logo" />
              <div>
                <div class="teamstext-box">
                  <div
                    className=" bg-cover bg-center h-24 w-24 relative z-100 mr-20 ml-8 border border-black	rounded-md hidden md:block lg:block xl:block"
                    style={{ backgroundImage: `url(${ rahul })` }}>
                    {/* You can add any content here */}
                  </div>
                  <div>
                    <h2>EDC President</h2>
                    <small>2019-2020</small>
                    <p>Rahul Thakur</p>
                    <span class="left-container-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline