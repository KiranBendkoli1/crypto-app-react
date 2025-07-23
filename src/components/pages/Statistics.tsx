import { Typography, Row, Col, Statistic } from "antd";
import millify from "millify";
import { useQuery } from '@tanstack/react-query';
import { getStats } from '../../utils/methods';
import { Stats } from '../../app/cryptoSlice';
const { Title } = Typography;


const Statistics = () => {
  const { status: statsStatus, data: statsData, error: statsError } = useQuery({
    queryKey: ['stats'], queryFn: () => getStats()
  })

  // console.log(statsData)
  const stats: Stats = statsData as Stats;

  if (statsStatus === "loading")
   return <></>

  if (statsStatus === "error")
    return <>{JSON.stringify(statsError)}</>
    
  return (
    <> <Title level={2} className="heading">
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
      </Row></>
  )
}

export default Statistics