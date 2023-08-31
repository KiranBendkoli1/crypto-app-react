import { FC, useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { History } from "../../app/cryptoSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import moment from "moment";
import tinycolor from "tinycolor2";
import { ThemeContext } from "../../context/theme-context";
type Props = {
  currentPrice: string;
  coinName: string;
  timeperiod: string;
  color:string
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const { Title } = Typography;
const LineChart: FC<Props> = ({ currentPrice, coinName, timeperiod, color }) => {
  const [price, setPrice] = useState<string[]>([]);
  const [timestamp, setTimestamp] = useState<string[]>([]);
  const history: History[] = useSelector<RootState>(
    (state) => state.crypto.history
  ) as History[];
  const change: string = useSelector<RootState>(
    (state) => state.crypto.change
  ) as string;

  const themeContext = useContext(ThemeContext);
    console.log(tinycolor(color).getBrightness())
  useEffect(() => {
    const prices: string[] = history.map((item) => item.price).reverse();
    setPrice(prices);
    const timestamps: string[] = history.map((item) =>
      moment(new Date(item.timestamp * 1000)).format(
        `${
          timeperiod === "3h"
            ? "HH:mm"
            : timeperiod === "24h" || timeperiod==="7d"
            ? "DD-MM HH:mm"
            : "DD-MM-YYYY"
        }`
      )
    ).reverse();
    setTimestamp(timestamps);
  }, [history]);
  const data = {
    labels: timestamp,
    datasets: [
      {
        label: "Price in USD",
        data: price,
        fill: false,
        backgroundColor:`${color}`,
        borderColor: `${tinycolor(color).getBrightness()>70 || themeContext.theme === "light" ? color :"grey" }`,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${coinName} Price Chart`,
      },
    },
  };

  return (
    <div>
      <p>
        Price change to {change}% <br /> Current {coinName} Price : ${" "}
        {currentPrice}
      </p>
      <Line datasetIdKey="id" data={data} options={options} />
    </div>
  );
};

export default LineChart;
