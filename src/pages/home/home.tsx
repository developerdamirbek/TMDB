import Title from 'antd/es/typography/Title';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';
import './style.scss';
import { Image, List, Spin, Typography } from 'antd';
import { Trending } from './components/trending/trending';
import { useSearchQuery } from '../../components/service/useGetSearch';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, [])

    const [value, setValue] = useState("");
    const search = useDebounce(value);
    const { data, isLoading } = useSearchQuery(search);
    console.log(search);
    console.log(data);



    const navigate = useNavigate()

    const handleItemClick = (id: number) => {
        navigate(`/movie/${id}`);
    }

    console.log(data);


    return (
        <>
            <section className='hero'>
                <div className="container">
                    <div>
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
                        <div className='search_block' >
                            <Search
                                className='search_input'
                                placeholder="Search for a movie, tv show, person..."
                                allowClear
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                enterButton="Search"
                                size="large"
                            />
                            {value.length >= 2 ? (
                                <>

                                    {isLoading ? <Spin style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 30 }} /> : (
                                        <List
                                            style={{ maxHeight: 300, overflowY: "auto", backgroundColor: "#fff", padding: 20 }}
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            renderItem={(item: { id: number, poster_path: string, title: string }) => (
                                                <List.Item style={{ cursor: "pointer" }} onClick={() => handleItemClick(item.id)}>
                                                    <List.Item.Meta
                                                        avatar={<Image width={60} height={60} style={{ objectFit: "cover" }} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />}
                                                        title={item.title}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    )}
                                </>
                            ) : ''}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='container'>
                    <Typography.Title level={2}>Trending</Typography.Title>

                </div>
                <div>
                    <Trending />
                </div>
            </section>
        </>
    )
}
