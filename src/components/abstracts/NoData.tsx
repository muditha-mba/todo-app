import svg from "../../assets/svg/noData.svg";
import "../../styles/abstracts/noData.scss";

interface Props {
  title: string;
  subTitle?: string;
}

const NoData = ({ title, subTitle }: Props) => {
  return (
    <div className="noData">
      <img src={svg} alt="noData" />
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
};

export default NoData;
