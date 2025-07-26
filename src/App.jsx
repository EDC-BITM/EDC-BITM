import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

import NavBar from "./components/layout/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./Home.jsx";
import Speakerpage from "./otherpages/Speakerpage/Speakerpage.jsx";
import Eventspage from "./otherpages/Eventspage/Eventspage.jsx";
import Teamspage from "./otherpages/Teamspage/team.jsx";
import Startups from "./otherpages/Startupspage/Startups.jsx";
import IATPage from "./otherpages/IAT/IATPage.jsx";

const PageWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={location.pathname}
        initial={{
          y: 50,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: -30,
          opacity: 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          willChange: "opacity, transform",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function RouteLayout({ Component }) {
  return (
    <>
      <NavBar />
      <PageWrapper>
        <Component />
      </PageWrapper>
      <Footer />
    </>
  );
}

RouteLayout.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout Component={Home} />,
  },
  {
    path: "/Speakers",
    element: <RouteLayout Component={Speakerpage} />,
  },
  {
    path: "/Events",
    element: <RouteLayout Component={Eventspage} />,
  },
  {
    path: "/Team",
    element: <RouteLayout Component={Teamspage} />,
  },
  {
    path: "/Startups",
    element: <RouteLayout Component={Startups} />,
  },
  {
    path: "/iat",
    element: <IATPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
