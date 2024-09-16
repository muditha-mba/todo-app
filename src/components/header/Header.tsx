import "../../styles/components/header/header.scss";
import logo from "../../assets/png/logo.png";
import CustomSVGs from "../abstracts/CustomSVGs";
import HeaderDropdown from "./HeaderDropdown";
import { AnimatePresence } from "framer-motion";
import { useComponentVisibility } from "../../custom-hooks/useComponentVisibility";

function Header() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const {
    ref: profileRef,
    isComponentVisible: isProfileVisible,
    setIsComponentVisible: setIsProfileVisible,
  } = useComponentVisibility<HTMLLIElement>(false);
  const handleProfileClick = () => {
    setIsProfileVisible((prev) => !prev);
  };

  const handleProfileItemClick = () => {
    setIsProfileVisible(false);
    // Handle specific actions when a dropdown item is clicked
  };

  return (
    <div className="header">
      <div className="header__left">
        <div title="logo" className="header__left--logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <div className="header__center">Todo APP</div>
      <ul className="header__right">
        <AnimatePresence>
          <li
            ref={profileRef}
            onClick={handleProfileClick}
            className="header__right--profile"
          >
            <CustomSVGs svgName="userSVG" />
            {isProfileVisible && (
              <div onClick={handleProfileItemClick}>
                <HeaderDropdown />
              </div>
            )}
          </li>
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default Header;
