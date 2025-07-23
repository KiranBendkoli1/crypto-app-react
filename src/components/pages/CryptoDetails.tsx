import { useMemo, useState } from "react";
import millify from "millify";
import { Select, Typography, Col, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
} from "react-icons/ai";
import LineChart from "../UI/LineChart";
import { useQuery } from "@tanstack/react-query";
import { getCoin } from "../../utils/methods";
import { OneCoin } from "../../app/cryptoSlice";


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const [timeperiod, setTimeperiod] = useState<string>("7d");
  const time = useMemo(() => ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"], []);
  const { coinId } = useParams();

  const { status: coinStatus, data: coinData, error: coinError } = useQuery({
    enabled: coinId !== null, 
    queryKey: ['coin'], queryFn: () => getCoin(coinId ? coinId : "")
  })

  if (coinStatus === "loading") return <></>
  if (coinStatus === "error") return <>{JSON.stringify(coinError)}</>

  const coin: OneCoin = coinData as OneCoin;

  return (
    <Col>
      <Col style={{ display: "flex" }}>
        <Image src={coin.iconUrl} alt="" height={"50px"} width={"50px"} />
        <Title>
          {coin.name} ({coin.symbol}) Price: $
          {millify(Number.parseFloat(coin.price))}
        </Title>
      </Col>
      <Col>
        <Text>{coin.description}</Text>
      </Col>
      <Select
        defaultValue="3h"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinId={coin.uuid}
        currentPrice={coin.price}
        coinName={coin.name}
        timeperiod={timeperiod}
        color={coin.color}
      />
      <Col>
        <Title level={2}>{coin.name} Value Statistics</Title>
        <Col>
          <AiOutlineDollarCircle
            style={{
              color: `${coin.color}`,
              height: "1.25rem",
              width: "1.25rem",
            }}
          />{" "}
          <span className="key">Price in USD</span>{" "}
          <span className="value">
            {" "}
            $ {millify(Number.parseFloat(coin.price))}
          </span>
        </Col>

        <Col>
          <AiOutlineNumber
            style={{
              color: `${coin.color}`,
              height: "1.25rem",
              width: "1.25rem",
            }}
          />{" "}
          <span className="key">Rank</span>{" "}
          <span className="value">{coin.rank}</span>
        </Col>
        <Col>
          <AiOutlineThunderbolt
            style={{
              color: `${coin.color}`,
              height: "1.25rem",
              width: "1.25rem",
            }}
          />{" "}
          <span className="key">24Hour Volume</span>{" "}
          <span className="value">
            {" "}
            $ {millify(Number.parseFloat(coin["24hVolume"]))}
          </span>
        </Col>
        <Col>
          <AiOutlineDollarCircle
            style={{
              color: `${coin.color}`,
              height: "1.25rem",
              width: "1.25rem",
            }}
          />
          <span className="key"> Market Capital</span>
          <span className="value">
            $ {millify(Number.parseFloat(coin.marketCap))}
          </span>
        </Col>
        <Col>
          <AiOutlineTrophy
            style={{
              color: `${coin.color}`,
              height: "1.25rem",
              width: "1.25rem",
            }}
          />{" "}
          <span className="key">All Time High</span>{" "}
          <span className="value">
            {" "}
            $ {millify(Number.parseFloat(coin.allTimeHigh.price))}
          </span>
        </Col>
      </Col>
      <Col>
        <Title level={2}>{coin.name} Links</Title>
        {coin.links.map((link) => (
          <Row
            key={link.name}
            style={{
              maxWidth: "800px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Title level={5}>{link.type}</Title>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </Row>
        ))}
      </Col>
    </Col>
  );
};

export default CryptoDetails;
