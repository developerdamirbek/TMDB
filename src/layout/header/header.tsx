import { Space, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import './style.scss';
import { nanoid } from "nanoid";

const { SubMenu } = Menu;

export const Header = () => {
    const navigate = useNavigate();

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
                { id: nanoid(), name: "On TV", path: "/tv/on-tv" },
                { id: nanoid(), name: "Top Rated", path: "/tv/top-rated" },
            ]
        },
        {
            id: nanoid(),
            name: "People",
            submenu: [
                { id: nanoid(), name: "Popular", path: "/person" },
            ]
        }
    ]

    const handleItemClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="header">
            <div className="container">
                <Space>
                    <Link to='/'>
                        <img className="logo" src={logo} alt="TMDB logo" />
                    </Link>
                    <Menu style={{color: '#fff', width: '100%'}}  theme="dark" mode="horizontal">
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
            </div>
        </div>
    )
}


