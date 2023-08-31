import { Card, Col } from 'antd'
import { Coin } from '../../app/cryptoSlice'
import { Link } from 'react-router-dom'
import millify from 'millify'

type Props = {
    coin: Coin
}

const CustomCryptoCard = ({ coin }: Props) => {
    return (
        <Col xs={24} sm={12} lg={6} key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
                <Card
                    title={`${coin.rank}. ${coin.name}`}
                    extra={<img src={coin.iconUrl} height={"30px"} />}
                    hoverable
                    bordered
                >
                    <p>Price: $ {millify(Number.parseFloat(coin.price))}</p>
                    <p>
                        Market Cap: $ {millify(Number.parseInt(coin.marketCap))}
                    </p>
                    <p>
                        Daily Change: {millify(Number.parseFloat(coin.change))}%
                    </p>
                </Card>
            </Link>
        </Col>
    )
}

export default CustomCryptoCard