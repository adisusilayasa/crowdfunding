import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
import { client } from "./client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import Sidebar from "./components/atoms/Sidebar";
import Navbar from "./components/atoms/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-grow">
        <div className="relative hidden mr-10 sm:flex">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
