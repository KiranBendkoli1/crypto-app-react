import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Typography, Row, Col, Card, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { Coin, getCryptoData } from "../../app/cryptoSlice";
import { Link } from "react-router-dom";
import { millify } from "millify";
// import Title from "antd/es/typography/Title";
type Props = {
  simplified?: boolean;
};

const { Option } = Select;

const { Title } = Typography;
const CryptoCurrencies: FC<Props> = ({ simplified }) => {
  const count = useMemo(() => (simplified ? 10 : 100), [simplified]);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<string[]>([]);

  const coins: Coin[] = useSelector<RootState>(
    (state) => state.crypto.coins
  ) as Coin[];

  const coin_names = useMemo(() => coins.map((coin) => coin.name), [coins]);

  const handleChange = useCallback((val: string[]) => {
    console.log(val);
    setSelected(val);
  }, []);

  useEffect(() => {
    dispatch(getCryptoData(count));
  }, [count]);
  return (
    <>
      <div
        className="homepage-title-div"
        style={{ marginTop: `${simplified ? "20px" : "0px"}` }}
      >
        <Title level={2} className="heading">
          Top {count} CryptoCurrencies in the World
        </Title>
      </div>
      <div className="search-section">
        {!simplified && (
          <Select
            mode="multiple"
            style={{
              width: "50%",
              textAlign: "center",
              justifyContent: "center",
            }}
            placeholder="Select name of crypto currency"
            onChange={handleChange}
            optionLabelProp="label"
          >
            {coin_names.map((name) => (
              <Option value={name} label={name}>
                {name}
              </Option>
            ))}
          </Select>
        )}
      </div>
      <Row gutter={[16, 16]}>
        {!selected.length
          ? coins.map((coin) => {
            return (
              <Col xs={24} sm={12} lg={6} key={coin.uuid}>
                <Link to={`/crypto/${coin.uuid}`}>
                  <Card
                    title={`${coin.rank}. ${coin.name}`}
                    extra={<img src={coin.iconUrl} height={"30px"} />}
                    hoverable
                    bordered
                  >
                    <p>Price: {millify(Number.parseFloat(coin.price))}</p>
                    <p>
                      Market Cap: {millify(Number.parseInt(coin.marketCap))}
                    </p>
                    <p>
                      Daily Change: {millify(Number.parseFloat(coin.change))}%
                    </p>
                  </Card>
                </Link>
              </Col>
            );
          })
          : coins
            .filter((coin) => selected.includes(coin.name))
            .map((coin) => {
              return (
                <Col xs={24} sm={12} lg={6} key={coin.uuid}>
                  <Link to={`/crypto/${coin.uuid}`}>
                    <Card
                      title={`${coin.rank}. ${coin.name}`}
                      extra={<img src={coin.iconUrl} height={"30px"} />}
                      hoverable
                      bordered
                    >
                      <p>Price: {millify(Number.parseFloat(coin.price))}</p>
                      <p>
                        Market Cap: {millify(Number.parseInt(coin.marketCap))}
                      </p>
                      <p>
                        Daily Change:{" "}
                        {millify(Number.parseFloat(coin.change))}%
                      </p>
                    </Card>
                  </Link>
                </Col>
              );
            })}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
