import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../store/reducers/appSlice";
import { motion } from "framer-motion";
import successSVG from "../../assets/svg/success.svg";
import errorSVG from "../../assets/svg/error.svg";
import closeSVG from "../../assets/svg/close.svg";
import "../../styles/abstracts/message.scss";

interface Props {
  msgType: string;
  msg: string;
}

const Message = ({ msgType, msg }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear message after 5 seconds
    const timer = setTimeout(() => {
      dispatch(setMessage({ messageType: "", message: "" }));
    }, 5000);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!msgType || !msg) {
    return null;
  }

  return (
    <motion.div
      data-msgtype={msgType}
      className="message"
      animate={{ y: 0 }}
      initial={{ y: -500 }}
      transition={{ duration: 0.7 }}
      exit={{ y: -500 }}
    >
      <div className="message__contentTop">
        <div className="message__contentTop--left">
          <img
            src={msgType === "success" ? successSVG : errorSVG}
            alt="message-icon"
          />
          <h1 data-msgtype={msgType}>
            {msgType === "success" ? "Success" : "Error"}
          </h1>
        </div>
        <div
          onClick={() => {
            dispatch(setMessage({ messageType: "", message: "" }));
          }}
          className="message__contentTop--right"
        >
          <img src={closeSVG} alt="close-icon" />
        </div>
      </div>
      <div className="message__contentBottom">
        <p data-msgtype={msgType}>{msg}</p>
      </div>
    </motion.div>
  );
};

export default Message;
