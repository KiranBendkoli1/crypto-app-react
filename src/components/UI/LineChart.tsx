import { useContext } from "react";
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
import { Skeleton, Alert } from "antd";
import { getHistory } from "../../utils/methods";

type Props = {
  currentPrice: string;
  coinName: string;
  timeperiod: string;
  color: string;
  coinId: string;
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

const LineChart = ({
  currentPrice,
  coinId,
  coinName,
  timeperiod,
  color,
}: Props) => {
  const themeContext = useContext(ThemeContext);

  const {
    status: historyStatus,
    data: historyData,
    error: historyError,
  } = useQuery({
    queryKey: ["history", coinId, timeperiod],
    queryFn: () => getHistory(coinId, timeperiod),
  });

  if (historyStatus === "loading") {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  if (historyStatus === "error") {
    return (
      <Alert
        message="Failed to load price history"
        description={(historyError as Error)?.message || "Unknown error"}
        type="error"
        showIcon
      />
    );
  }

  const history: History[] = historyData as History[];

  const prices: string[] = history.map((item) => item.price).reverse();

  const timestamps: string[] = history
    .map((item) =>
      moment(new Date(item.timestamp * 1000)).format(
        timeperiod === "3h"
          ? "HH:mm"
          : timeperiod === "24h" || timeperiod === "7d"
          ? "DD-MM HH:mm"
          : "DD-MM-YYYY"
      )
    )
    .reverse();

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price in USD",
        data: prices,
        fill: false,
        backgroundColor: color,
        borderColor:
          tinycolor(color).getBrightness() > 70 ||
          themeContext.theme === "light"
            ? color
            : "grey",
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
      <Line datasetIdKey="id" data={data} options={options} />
    </div>
  );
};

export default LineChart;
