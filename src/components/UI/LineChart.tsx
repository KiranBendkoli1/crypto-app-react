import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { getHistory } from "../../utils/methods";
type Props = {
  currentPrice: string;
  coinName: string;
  timeperiod: string;
  color: string
  coinId: string
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
const LineChart = ({ currentPrice, coinId, coinName, timeperiod, color }: Props) => {
  const themeContext = useContext(ThemeContext);

  console.log(currentPrice)
  const { status: historyStatus, data: historyData, error: historyError } = useQuery({
    queryKey: ["history"], queryFn: () => getHistory(coinId, timeperiod)
  })

  const history: History[] = historyData as History[]
  // console.log(tinycolor(color).getBrightness())
  const prices: string[] = history && history.map((item) => item.price).reverse();

  const timestamps: string[] = history && history.map((item) =>
    moment(new Date(item.timestamp * 1000)).format(
      `${timeperiod === "3h"
        ? "HH:mm"
        : timeperiod === "24h" || timeperiod === "7d"
          ? "DD-MM HH:mm"
          : "DD-MM-YYYY"
      }`
    )
  ).reverse();


  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price in USD",
        data: prices,
        fill: false,
        backgroundColor: `${color}`,
        borderColor: `${tinycolor(color).getBrightness() > 70 || themeContext.theme === "light" ? color : "grey"}`,
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
  if (historyStatus === "loading")return <></>
  if (historyStatus === "error") return <>{JSON.stringify(historyError)} </>
  return (
    <div>
      <Line datasetIdKey="id" data={data} options={options} />
    </div>
  );

};

export default LineChart;
