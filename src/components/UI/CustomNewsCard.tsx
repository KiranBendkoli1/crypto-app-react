import { Card, Col } from 'antd'
import Title from 'antd/es/typography/Title'
import moment from 'moment'
import { Value } from '../../app/newsSlice'

type Props = {
    news: Value
    i: number
    isNewsLoading: boolean
}

const CustomNewsCard = ({ news, i, isNewsLoading }: Props) => (
    <Col xs={24} sm={12} lg={8} key={i}>
        <Card hoverable className="news-card" loading={isNewsLoading} >
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
                        {<img
                            src={news.provider[0].image?.thumbnail.contentUrl}
                            alt={news.provider[0].name}
                            style={{
                                height: "20px",
                                width: "20px",
                                marginRight: "5px",
                            }} />}
                        {news.provider[0].name}
                    </p>
                    <p>{moment(news.datePublished).toNow()}</p>
                </div>
            </a>
        </Card>
    </Col>
)

export default CustomNewsCard