import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";
import Statistics from "./Statistics";


const HomePage = () => {

  return (
    <>
      <Statistics />
      <CryptoCurrencies simplified />
      <News simplified />
    </>
  );

};

export default HomePage;
