import React from "react"
import NavBar from "./components/Navbar.jsx"
import Footer from "./components/footer/Footer.jsx"
import Speakerpage from "./otherpages/Speakerpage/Speakerpage.jsx"
import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Home from "./Home.jsx"
import Eventspage from "./otherpages/Eventspage/Eventspage.jsx"
import Teamspage from "./otherpages/Teamspage/teams.jsx"
import Apppage from "./otherpages/Apppage/Apppage.jsx"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><NavBar/><Home/><Footer/></>
    },
    {
      path: "/Speakers",
      element: <><NavBar/><Speakerpage/><Footer/></>
    },
    {
      path: "/Events",
      element: <><NavBar/><Eventspage/><Footer/></>
    },
    {
      path: "/Team",
      element: <><NavBar/><Teamspage/><Footer/></>
    },
    {
      path: "/App",
      element: <><NavBar/><Apppage/><Footer/></>
    },

  ])

  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
