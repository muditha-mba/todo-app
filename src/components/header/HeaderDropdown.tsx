import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import "../../styles/components/header/headerDropdown.scss";
import CustomSVGs from "../abstracts/CustomSVGs";
import { RootState } from "../../store/store";
import NormalButton from "../ui/buttons/NormalButton";
import { logOut } from "../../store/reducers/authSlice";
import { setAppMode } from "../../store/reducers/appSlice";

const dropdownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function HeaderDropdown() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state: RootState) => state.auth.auth.currentUserId
  );
  const userProfile = useSelector(
    (state: RootState) => state.user.allUsers[currentUserId]
  );

  const isAppThemeDark = useSelector(
    (state: RootState) => state.app.isDarkMode
  );

  const logoutHandler = () => {
    dispatch(logOut());
  };

  return (
    <motion.div
      className="headerDropdown"
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <div className="headerDropdown__top">
        <div className="headerDropdown__top--text">
          <p>{`${userProfile.firstName} ${userProfile.lastName}`}</p>
          <span>{"User"}</span>
        </div>
      </div>
      <div className="headerDropdown__center">
        <div
          onClick={() => {
            dispatch(setAppMode());
          }}
          className="headerDropdown__center--item"
        >
          <div
            data-profile-mode={isAppThemeDark?.toString()}
            className="headerDropdown__center--item-left headerDropdown__center--item-mode"
          >
            {isAppThemeDark ? (
              <CustomSVGs svgName={"sunSVG"} />
            ) : (
              <CustomSVGs svgName={"moonSVG"} />
            )}
          </div>
          <div className="headerDropdown__center--item-right">
            {!isAppThemeDark && <p>Switch to darkMode</p>}
            {isAppThemeDark && <p>Switch to lightMode</p>}
          </div>
        </div>
      </div>
      <div className="headerDropdown__bottom">
        <NormalButton
          value="Logout"
          icon={<CustomSVGs svgName="logoutSVG" />}
          onClick={logoutHandler}
        />
      </div>
    </motion.div>
  );
}

export default HeaderDropdown;
