import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

import "../styles/layout.css";

const MainLayout = ({
  children,
}) => {
  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="main-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;