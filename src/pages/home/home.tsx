import BgImage from '../../assets/images/bg.jpeg';
import Title from 'antd/es/typography/Title';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';
import { Tabs, TabsProps } from 'antd';
import { Movies } from './components/movies/movies';
import { Tv } from './components/tv/tv';
import './style.scss';

export const Home = () => {
    const [activeTab, setActiveTab] = useState(() => {
        const storedTab = localStorage.getItem('activeTab');
        return storedTab ? storedTab : '1';
    });

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        localStorage.setItem('activeTab', key); // Store active tab in local storage
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Movies',
            children: <Movies />,
        },
        {
            key: '2',
            label: 'TV',
            children: <Tv/>,
        }
    ];

    const herosytle: React.CSSProperties = {
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: '100%',
        minHeight: 400,
        height: "100%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingTop: 80,
        paddingBottom: 30,
    }

    const inputStyle: React.CSSProperties = {
        width: '100%',
        margin: '20px auto',
        borderRadius: '50%',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    return (
        <>
            <section style={herosytle}>
                <div className="container">
                    <div style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginTop: 30 }} data-aos="fade-right"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine">
                            <Title style={{ margin: 0, fontSize: 60, color: "#fff" }} level={1}>
                                Welcome.
                            </Title>
                            <Title style={{ margin: 0, marginBottom: 40, color: "#fff" }} level={2}>
                                Millions of movies, TV shows and people to discover. Explore now.
                            </Title>
                        </div>
                        <div data-aos="fade-up"
                            data-aos-anchor-placement="bottom-bottom">
                            <Search
                                style={inputStyle}
                                placeholder="Search for a movie, tv show, person..."
                                allowClear
                                enterButton="Search"
                                size="large"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section style={{ paddingTop: 30, paddingBottom: 30 }}>
                <div className='container'>
                    <div>
                        <Tabs activeKey={activeTab} onChange={handleTabChange} centered items={items} />
                    </div>
                </div>
            </section>
        </>
    )
}
