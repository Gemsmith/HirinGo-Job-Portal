import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseWindowResize from './utils/UseWindowResize';

const DefaultLayout = ({ children, pageHasSider = true }) => {
  const { Header, Content, Sider } = Layout;

  // Collapsiblity of the sidebar:
  const { width } = UseWindowResize();
  const [collapsed, setCollapsed] = useState(false);
  const [customLeftMargin, setCustomLeftMargin] = useState('200px');

  const onCollapse = (collapsed) => {
    collapsed ? setCustomLeftMargin('80px') : setCustomLeftMargin('200px');
    setCollapsed(collapsed);
  };

  //Getting latest window size (to get responsive behavior):
  // Refactoring - Just came across this link and now using it to create a custom hook:
  // https://dev.to/reedbarger/how-to-create-a-usewindowsize-react-hook-2bcm
  // const [size, setSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });
  // const updateSize = () => {
  //   setSize({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // };
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  // useEffect(() => {
  //   window.onresize = updateSize;
  // }, []);

  useEffect(() => {
    if (pageHasSider === true) {
      if (width < 640) {
        setCollapsedWidth(0);
        setCustomLeftMargin('0px');
      } else {
        setCollapsedWidth(80);
        collapsed ? setCustomLeftMargin('80px') : setCustomLeftMargin('200px');
      }
    } else if (pageHasSider === false) {
      setCollapsedWidth(0);
      setCustomLeftMargin('0px');
    }
  }, [width]);

  return (
    <>
      <Layout>
        {/* Navbar */}
        <Navbar />

        <Layout>
          {/* SideBar */}
          {pageHasSider &&
            (collapsedWidth === 0 ? (
              <Menu
                className="flex items-center justify-center"
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[window.location.pathname]}
                style={{
                  height: '100%',
                  borderRight: 0,
                  marginTop: '64px',
                }}
              >
                <Menu.Item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key="/"
                  icon={<UserOutlined />}
                >
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key="/profile"
                  icon={<LaptopOutlined />}
                >
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key="/appliedjobs"
                  icon={<NotificationOutlined />}
                >
                  <Link to="/appliedjobs">AppliedJobs</Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key="/jobs/post"
                  icon={<FileOutlined />}
                >
                  <Link to="/jobs/post">Post A Job</Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key="/postedjobs"
                  icon={<FileOutlined />}
                >
                  <Link to="/postedjobs">Posted Jobs</Link>
                </Menu.Item>
              </Menu>
            ) : (
              <Sider
                width={200}
                breakpoint={'lg'}
                collapsedWidth={collapsedWidth}
                className="site-layout-background"
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  marginTop: '64px',
                  left: 0,
                  top: 0,
                  bottom: 0,
                }}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
              >
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={[window.location.pathname]}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <Menu.Item key="/" icon={<UserOutlined />}>
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key="/profile" icon={<LaptopOutlined />}>
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="/appliedjobs" icon={<NotificationOutlined />}>
                    <Link to="/appliedjobs">AppliedJobs</Link>
                  </Menu.Item>
                  <Menu.Item key="/jobs/post" icon={<FileOutlined />}>
                    <Link to="/jobs/post">Post A Job</Link>
                  </Menu.Item>
                  <Menu.Item key="/postedjobs" icon={<FileOutlined />}>
                    <Link to="/postedjobs">Posted Jobs</Link>
                  </Menu.Item>
                </Menu>
              </Sider>
            ))}

          {/* Main Content Area */}
          <Layout
            style={{
              margin: `${
                pageHasSider && collapsedWidth === 0 ? '0px' : '64px'
              } 0 0 ${customLeftMargin}`,
            }}
          >
            <Content
              className="site-layout-background"
              style={{
                backgroundColor: 'white',
                margin: 0,
                minHeight: '100vh',
              }}
            >
              {children}
            </Content>
            {/* Footer */}
            <Footer />
          </Layout>
        </Layout>
      </Layout>

      <ToastContainer position="bottom-left" />
    </>
  );
};

export default DefaultLayout;
