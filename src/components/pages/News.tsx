import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect, useMemo, FC, useState } from "react";
import { Value, getNewsData } from "../../app/newsSlice";
import { Typography, Row, Col, Card, Select } from "antd";
import moment from "moment";
import { Coin } from "../../app/cryptoSlice";

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

  const coin_names = useMemo(() => coins.map((coin) => coin.name), [coins]);
  const handleChange = (val: string) => {
    setNewsCategory(val);
  };
  console.log(cryptoNews);
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
        {cryptoNews.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a
                href={news.url}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
                rel="noreferrer"
              >
                <div className="contents">
                  <Title level={4}>{news.name}</Title>
                  <img src={news.image?.thumbnail.contentUrl} />
                </div>
                <p>
                  {news.description.length > 200
                    ? `${news.description.substring(0, 200)}...`
                    : news.description}
                </p>
                <div className="contents">
                  <p>
                    {
                      <img
                        src={news.provider[0].image?.thumbnail.contentUrl}
                        alt={news.provider[0].name}
                        style={{
                          height: "20px",
                          width: "20px",
                          marginRight: "5px",
                        }}
                      />
                    }
                    {news.provider[0].name}
                  </p>
                  <p>{moment(news.datePublished).toNow()}</p>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
