import "../../styles/components/header/header.scss";
import logo from "../../assets/png/logo.png";
import CustomSVGs from "../abstracts/CustomSVGs";
import HeaderDropdown from "./HeaderDropdown";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div className="header">
      <div className="header__left">
        <div title="logo" className="header__left--logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <div className="header__center">Todo APP</div>
      <div className="header__right">
        <div
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className="header__right--profile"
        >
          <CustomSVGs svgName="userSVG" />
        </div>
      </div>
      <AnimatePresence>{isDropdownOpen && <HeaderDropdown />}</AnimatePresence>
    </div>
  );
}

export default Header;
