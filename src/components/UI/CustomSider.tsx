import { Layout, Menu, Drawer, Button, theme } from "antd";
import { SiBitcoinsv } from "react-icons/si";
import { BiNews, BiHomeCircle } from "react-icons/bi";
const { Sider } = Layout;
import icon from "../../assets/cryptocurrency.png";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";

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

  const menu = useMemo(
    () => (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onChange={onClose}
        items={[
          {
            key: "1",
            icon: (
              <Link to={"/"}>
                <BiHomeCircle />
              </Link>
            ),
            label: "Home Page",
          },
          {
            key: "2",
            icon: (
              <Link to={"/cryptocurrencies"}>
                <SiBitcoinsv />
              </Link>
            ),
            label: "Crypto Currencies",
          },
          {
            key: "3",
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
              <p>Crypto App</p>
            </div>
          </div>
          {menu}
        </Sider>
      )}
      {!isActive && (
        <div className="app-header" style={{justifyContent:"space-around"}}>
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
            <p style={{ margin: "20px 5px" }}>Crypto App</p>
          </div>
          {!isActive && (
            <Button
              style={{ margin: "20px 10px" }}
              icon={<AiOutlineMenuFold />}
              onClick={showDrawer}
            />
          )}
        </div>
      )}
      <Drawer title="" placement="right" onClose={onClose} open={open}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={onClose}
          items={[
            {
              key: "1",
              icon: (
                <Link to={"/"}>
                  <BiHomeCircle />
                </Link>
              ),
              label: "Home Page",
            },
            {
              key: "2",
              icon: (
                <Link to={"/cryptocurrencies"}>
                  <SiBitcoinsv />
                </Link>
              ),
              label: "Crypto Currencies",
            },
            {
              key: "3",
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
