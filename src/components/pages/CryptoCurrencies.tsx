import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Typography, Row, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { Coin, getCryptoData } from "../../app/cryptoSlice";
import CustomCryptoCard from "../UI/CustomCryptoCard";
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
    if (coins.length < 100 && !simplified) dispatch(getCryptoData(count));
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
        {
          simplified ?
            coins.filter((coin) => coin.rank <= 10).map((coin) => (
              <CustomCryptoCard coin={coin} />
            ))
            :
            !selected.length
              ? coins.map((coin) => {
                return (
                  <CustomCryptoCard coin={coin} />
                );
              })
              : coins
                .filter((coin) => selected.includes(coin.name))
                .map((coin) => {
                  return (
                    <CustomCryptoCard coin={coin} />
                  );
                })}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
