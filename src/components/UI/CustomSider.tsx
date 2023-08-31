import { Layout, Menu, Drawer, Button } from "antd";
import { SiBitcoinsv } from "react-icons/si";
import { BiNews, BiHomeCircle } from "react-icons/bi";
import icon from "../../assets/cryptocurrency.png";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
const { Sider } = Layout;
const CustomSider = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const current = window.location.href.split("/")[window.location.href.split("/").length - 1];
  const menu = useMemo(
    () => (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[`/${current}`]}
        onChange={onClose}
        items={[
          {
            key: "/",
            icon: (
              <Link to={"/"}>
                <BiHomeCircle />
              </Link>
            ),
            label: "Home Page",
          },
          {
            key: "/cryptocurrencies",
            icon: (
              <Link to={"/cryptocurrencies"}>
                <SiBitcoinsv />
              </Link>
            ),
            label: "Crypto Currencies",
          },
          {
            key: "/news",
            icon: (
              <Link to={"/news"}>
                <BiNews />
              </Link>
            ),
            label: "Crypto News",
          },
        ]}
      />
    ),
    []
  );
  const resizeWindow = (event: Event) => {
    const target = event.target as Window;
    setScreenWidth(target.innerWidth);
  };
  useEffect(() => {
    addEventListener("resize", resizeWindow);
    if (screenWidth < 950) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [screenWidth]);

  return (
    <>
      {isActive && (
        <Sider trigger={null} collapsible>
          <div className="app-header">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img src={icon} className="app-icon" />
              <p className="app-title">Crypto App</p>
            </div>
          </div>
          {menu}
        </Sider>
      )}
      {!isActive && (
        <div className="app-header" style={{ justifyContent: "space-around" }}>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={icon}
              className="app-icon"
              style={{ height: "50px", width: "50px" }}
            />
            <p style={{  margin: "20px 5px" }}>Crypto App</p>
            {!isActive && (
            <Button
              style={{ margin: "20px 0px 0px 40%" }}
              icon={<AiOutlineMenuFold />}
              onClick={showDrawer}
            />
          )}
          </div>
          
        </div>
      )}
      <Drawer title="" placement="right" onClose={onClose} open={open}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[`/${current}`]}
          onClick={onClose}
          items={[
            {
              key: "/",
              icon: (
                <Link to={"/"}>
                  <BiHomeCircle />
                </Link>
              ),
              label: "Home Page",
            },
            {
              key: "/cryptocurrencies",
              icon: (
                <Link to={"/cryptocurrencies"}>
                  <SiBitcoinsv />
                </Link>
              ),
              label: "Crypto Currencies",
            },
            {
              key: "/news",
              icon: (
                <Link to={"/news"}>
                  <BiNews />
                </Link>
              ),
              label: "Crypto News",
            },
          ]}
        />
      </Drawer>
    </>
  );
};

export default CustomSider;
