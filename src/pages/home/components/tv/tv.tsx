import { Card, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useGetTv } from '../../service/useGetTv';
import './style.scss'

export const Tv = () => {

    const { data, isLoading } = useGetTv();
    console.log(data);
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return isLoading ? <Spin/> : (
        <div style={{ display: 'flex', marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
            {data?.data.results.map((item: { poster_path: string, name: string, first_air_date: string }) => {
                const releaseDate = new Date(item.first_air_date);
                const formattedReleaseDate = releaseDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                });

                return (
                    <Card
                        data-aos="fade-up"
                        data-aos-duration="3000"
                        key={item.name}
                        hoverable
                        style={{ width: 200 }}
                        cover={<img style={{ objectFit: 'cover', width: '100%', height: '320px' }} alt="example" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />}
                    >
                        <Meta title={item.name} description={formattedReleaseDate} />
                    </Card>
                );
            })}
        </div>
    )
}
