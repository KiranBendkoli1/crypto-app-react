import { Card } from "antd";

type Props = {
  style: React.CSSProperties;
  isLoading: boolean;
};

const CustomLoadingCard = ({ isLoading }: Props) => {
  return (
    <Card
      style={{ height: "10rem", width: "12rem" }}
      loading={isLoading}
    ></Card>
  );
};

export default CustomLoadingCard;
