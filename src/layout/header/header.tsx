import { Space, Menu, Button, Modal, Badge, Drawer, DrawerProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import './style.scss';
import { nanoid } from "nanoid";
import { HeartOutlined, MenuFoldOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Search from "antd/es/input/Search";
import useLikedItems from "../../store/likedStore";
import useSavedItems from "../../store/savedStore";
import { Searchbox } from "../../components/searchbox";

const { SubMenu } = Menu;

export const Header = () => {
    const navigate = useNavigate();

    const likeCount = useLikedItems((state) => state.likedItems);
    const savedCount = useSavedItems((state) => state.savedItems);

    const menu = [
        {
            id: nanoid(),
            name: "Movies",
            submenu: [
                { id: nanoid(), name: "Popular", path: "/movie" },
                { id: nanoid(), name: "Now Playing", path: "/movie/now-playing" },
                { id: nanoid(), name: "Upcoming", path: "/movie/upcoming" },
                { id: nanoid(), name: "Top Rated", path: "/movie/top-rated" },
            ]
        },
        {
            id: nanoid(),
            name: "TV Shows",
            submenu: [
                { id: nanoid(), name: "Popular", path: "/tv" },
                { id: nanoid(), name: "Airing Today", path: "/tv/airing-today" },
                { id: nanoid(), name: "On TV", path: "/tv/on-the-air" },
                { id: nanoid(), name: "Top Rated", path: "/tv/top-rated" },
            ]
        },
        {
            id: nanoid(),
            name: "People",
            submenu: [
                { id: nanoid(), name: "Popular Person", path: "/person" },
            ]
        }
    ]



    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const handleItemClick = (path: string) => {
        navigate(path);
        onClose()
    };


    return (
        <div className="header">
            <div className="container">
                <div className="navigation">
                    <div className="menu_btn">
                        <Space>

                            <Button style={{ backgroundColor: "transparent" }} size="large" type="text" icon={<MenuFoldOutlined style={{ color: "#fff", fontSize: 30 }} />} onClick={showDrawer} />
                        </Space>
                        <Drawer
                        style={{backgroundColor: "#032541"}}
                            width={250}
                            className="drawer"
                            title="Basic Drawer"
                            placement={"left"}
                            closable={false}
                            onClose={onClose}
                            open={open}
                        >
                            <Menu style={{ color: '#fff', width: '100%' }} theme="dark" mode="vertical">
                                {menu.map(item => (
                                    <SubMenu key={item.id} title={item.name}>
                                        {item.submenu.map(subitem => (
                                            <Menu.Item key={subitem.id} onClick={() => handleItemClick(subitem.path)}>
                                                {subitem.name}
                                            </Menu.Item>
                                        ))}
                                    </SubMenu>
                                ))}
                            </Menu>

                            <Button style={{ backgroundColor: "transparent", position: "absolute", top: 10, right: 10 }} size="large" type="text" icon={<MenuFoldOutlined style={{ color: "#fff", fontSize: 30 }} />} onClick={onClose} />
                        </Drawer>
                    </div>
                    <Space className="menus">
                        <Link to='/'>
                            <img className="logo" src={logo} alt="TMDB logo" />
                        </Link>
                        <Menu style={{ color: '#fff', width: '100%' }} theme="dark" mode="horizontal">
                            {menu.map(item => (
                                <SubMenu key={item.id} title={item.name}>
                                    {item.submenu.map(subitem => (
                                        <Menu.Item key={subitem.id} onClick={() => handleItemClick(subitem.path)}>
                                            {subitem.name}
                                        </Menu.Item>
                                    ))}
                                </SubMenu>
                            ))}
                        </Menu>
                    </Space>
                    <Space align="center" size={30}>
                        <Badge size="small" count={likeCount.length}>
                            <Link to='/liked'>
                                <HeartOutlined style={{ color: "#fff", fontSize: 20 }} />
                            </Link>
                        </Badge>
                        <Badge size="small" count={savedCount.length}>
                            <Link to='/saved'>
                                <SaveOutlined style={{ color: "#fff", fontSize: 20 }} />
                            </Link>
                        </Badge>


                        <Button onClick={showModal} style={{ color: "#0CB5DF" }} type="text" icon={<SearchOutlined style={{ fontSize: 25 }} />}>

                        </Button>
                        <Modal title="Search" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Searchbox />
                        </Modal>
                    </Space>
                </div>
            </div>
        </div>
    )
}


