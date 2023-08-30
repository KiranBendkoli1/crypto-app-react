import { useEffect, useState, useContext } from "react";
import { ConfigProvider, FloatButton, Layout, Spin, theme } from "antd";
import CustomSider from "./components/UI/CustomSider";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CryptoCurrencies from "./components/pages/CryptoCurrencies";
import News from "./components/pages/News";
import CryptoDetails from "./components/pages/CryptoDetails";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoData } from "./app/cryptoSlice";
import { AppDispatch, RootState } from "./app/store";
import { BsSun, BsMoon } from "react-icons/bs";
import { ThemeContext } from "./context/theme-context";
import { BiSolidColorFill } from "react-icons/bi";

const { Content } = Layout;

const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const isCryptoLoading: boolean = useSelector<RootState>(
    (state) => state.crypto.isLoading
  ) as boolean;
  const isNewsLoading: boolean = useSelector<RootState>(
    (state) => state.news.isLoading
  ) as boolean;
  const onChange = (checked: boolean) => {
    setOpen(checked);
  };
  useEffect(() => {
    dispatch(getCryptoData(10));
  }, []);
  const themeContext = useContext(ThemeContext);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeContext.theme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Spin spinning={isCryptoLoading || isNewsLoading}>
        <BrowserRouter>
          <Layout
            style={{ minHeight: "100vh" }}
            data-theme={themeContext.theme}
          >
            <CustomSider />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                // background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/cryptocurrencies"
                  element={<CryptoCurrencies />}
                />
                <Route path="/news" element={<News />} />
                <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              </Routes>
            </Content>
          </Layout>
        </BrowserRouter>

        <FloatButton.Group
          open={open}
          trigger="click"
          onOpenChange={onChange}
          style={{ right: 24 }}
          icon={<BiSolidColorFill />}
        >
          <FloatButton
            icon={<BsSun />}
            onClick={() => {
              themeContext.setSelectedTheme("light");
            }}
          />
          <FloatButton
            icon={<BsMoon />}
            onClick={() => {
              themeContext.setSelectedTheme("dark");
            }}
          />
        </FloatButton.Group>
      </Spin>
    </ConfigProvider>
  );
};

export default App;

// Continue the react-typescript project (crypto-app)
// Implement and style cryptocurrency chart with react-chartjs-2 library
// Add Responsiveness in Application
// Solve styling related issues in Application
