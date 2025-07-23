import { useCallback, useMemo, useState } from "react";
import { Typography, Row, Select } from "antd";
import { Coin } from "../../app/cryptoSlice";
import CustomCryptoCard from "../UI/CustomCryptoCard";
import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../../utils/methods";
type Props = {
  simplified?: boolean;
};

const { Option } = Select;
const { Title } = Typography;

const CryptoCurrencies = ({ simplified }: Props) => {
  const count = useMemo(() => (simplified ? 10 : 100), [simplified]);
  const [selected, setSelected] = useState<string[]>([]);

  const {
    status: coinsStatus,
    data: coinsData,
    error: coinsError,
  } = useQuery({
    queryKey: ["coins", count],
    queryFn: () => getCoins(count),
  });
  // console.log(coinsData)
  const coins: Coin[] = coinsData as Coin[];
  const coin_names = coins && coins.map((coin) => coin.name);
  const handleChange = useCallback((val: string[]) => {
    setSelected(val);
  }, []);

  if (coinsStatus === "loading") {
    return <></>;
  }
  if (coinsStatus === "error") {
    return <>{JSON.stringify(coinsError)}</>;
  }

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
        {simplified
          ? coins
              .filter((coin) => coin.rank <= 10)
              .map((coin) => <CustomCryptoCard coin={coin} />)
          : !selected.length
          ? coins.map((coin) => {
              return <CustomCryptoCard coin={coin} />;
            })
          : coins
              .filter((coin) => selected.includes(coin.name))
              .map((coin) => {
                return <CustomCryptoCard coin={coin} />;
              })}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
