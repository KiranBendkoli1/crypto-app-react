import { useMemo, useState } from "react";
import millify from "millify";
import { Select, Typography, Col, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { FC, useEffect } from "react";
import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { OneCoin, getCoinData, getCoinHistory } from "../../app/cryptoSlice";
import LineChart from "../UI/LineChart";

type Props = {};

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails: FC<Props> = () => {
  const [timeperiod, setTimeperiod] = useState<string>("7d");
  const { coinId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const coin: OneCoin = useSelector<RootState>(
    (state) => state.crypto.coin
  ) as OneCoin;

  const time = useMemo(() => ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"], []);

  useEffect(() => {
    if (typeof coinId === "string") {
      dispatch(getCoinData(coinId));
      dispatch(getCoinHistory({ coinId, timeperiod }));
    }
  }, [coinId, timeperiod]);
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
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
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
