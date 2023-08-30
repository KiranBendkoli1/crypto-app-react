import { FC } from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Stats } from "../../app/cryptoSlice";
import CryptoCurrencies from "./CryptoCurrencies";
import millify from "millify";
import News from "./News";
type Props = {};

const { Title } = Typography;
const HomePage: FC<Props> = () => {
  const stats: Stats = useSelector<RootState>(
    (state) => state.crypto.stats
  ) as Stats;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(stats.totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(stats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(Number.parseInt(stats.totalMarketCap))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(Number.parseInt(stats.total24hVolume))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(stats.totalMarkets)}
          />
        </Col>
      </Row>

      <CryptoCurrencies simplified />
      <News simplified />
    </>
  );
};

export default HomePage;
