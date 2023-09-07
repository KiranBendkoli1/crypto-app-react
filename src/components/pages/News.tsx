
import { useEffect, useMemo, useState, useCallback } from "react";
import { Value } from "../../app/newsSlice";
import { Typography, Row, Select, Spin, Card } from "antd";
import { Coin } from "../../app/cryptoSlice";
import CustomNewsCard from "../UI/CustomNewsCard";
import { useQuery } from "@tanstack/react-query";
import { getCoins, getNews } from "../../utils/methods";
import CustomLoadingCard from "../UI/CustomLoadingCard";

const { Option } = Select;
type Props = {
  simplified?: boolean;
};
const { Title } = Typography;
const News = ({ simplified }: Props) => {
  const [newsCategory, setNewsCategory] = useState<string>("cryptocurrency");
  const count = useMemo(() => (simplified ? 10 : 30), [simplified]);
  const { status: newsStatus, data: newsData, error: newsError, isLoading } = useQuery({
    queryKey: ['news', newsCategory, count], queryFn: () => getNews(newsCategory, count)
  })
  const { status: coinsStatus, data: coinsData, error: coinsError } = useQuery({
    queryKey: ['coins'], queryFn: () => getCoins(count)
  })

  const cryptoNews: Value[] = newsData as Value[];
  const coins: Coin[] = coinsData as Coin[];
  const coin_names = coins && coins.map((coin) => coin.name);
  const handleChange = useCallback((val: string) => {
    setNewsCategory(val);
  }, [])
  useEffect(() => {
    console.log(newsCategory, count);
  }, [newsCategory]);

  if (newsStatus === "loading" || coinsStatus === "loading") {
    return <>
    </>
  }

  if (newsStatus === "error" || coinsStatus === "error") {
    return <>{`${JSON.stringify(newsError)} ${JSON.stringify(coinsError)}`} </>
  }

  return (
    <>
      <div className="homepage-title-div" style={{ marginTop: `${simplified ? "20px" : "0px"}` }}>
        <Title level={2} className="heading">
          Top Crypto News in the World
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
          simplified ? cryptoNews.filter((_, i) => i < 10).map((news, i) => <CustomNewsCard isNewsLoading={isLoading} news={news} i={i} />) :
            cryptoNews.map((news, i) => (
              <CustomNewsCard isNewsLoading={isLoading} news={news} i={i} />
            ))}
      </Row>
    </>
  );
};

export default News;
