import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect, useMemo, FC, useState, useCallback } from "react";
import { Value, getNewsData } from "../../app/newsSlice";
import { Typography, Row, Select } from "antd";
import { Coin } from "../../app/cryptoSlice";
import CustomNewsCard from "../UI/CustomNewsCard";

const { Option } = Select;
type Props = {
  simplified?: boolean;
};
const { Title } = Typography;
const News: FC<Props> = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState<string>("cryptocurrency");
  const count = useMemo(() => (simplified ? 10 : 30), [simplified]);
  const dispatch = useDispatch<AppDispatch>();
  const cryptoNews: Value[] = useSelector<RootState>(
    (state) => state.news.value
  ) as Value[];
  const coins: Coin[] = useSelector<RootState>(
    (state) => state.crypto.coins
  ) as Coin[];
  const isNewsLoading: boolean = useSelector<RootState>(state => state.news.isLoading) as boolean;

  const coin_names = useMemo(() => coins.map((coin) => coin.name), [coins]);
  const handleChange = useCallback((val: string) => {
    setNewsCategory(val);
  }, []);
  // console.log(cryptoNews);
  useEffect(() => {
    console.log(newsCategory, count);
    dispatch(getNewsData({ newsCategory, count }));
  }, [newsCategory]);

  return (
    <>
      {" "}

      <div className="homepage-title-div" style={{ marginTop: `${simplified ? "20px" : "0px"}` }}>
        <Title level={2} className="heading">
          Top {count} Crypto News in the World
        </Title>
      </div>
      <div className="search-section">
        {!simplified && (
          <Select
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
      <Row gutter={[24, 24]}>
        {
          simplified ? cryptoNews.filter((_, i) => i < 10).map((news, i) => <CustomNewsCard isNewsLoading={isNewsLoading} news={news} i={i} />) :
            cryptoNews.map((news, i) => (
              <CustomNewsCard isNewsLoading={isNewsLoading} news={news} i={i} />
            ))}
      </Row>
    </>
  );
};

export default News;
