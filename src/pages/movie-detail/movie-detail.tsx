// Detail.js
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleMovie } from '../movie/service/useGetSingleMovie';
import { Card, Progress, Space, Spin, Typography } from 'antd';
import './style.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const MovieDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleMovie(id);
    console.log(data);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return isLoading ? <Spin style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 180 }} size='large' /> : (
        <div className='detail_wrapper' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data?.data.backdrop_path})` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', right: 0, bottom: 0, }}>
            </div>
            <div className='container'>
                <Space align='start'>
                    <Card className='card' data-aos="fade-right" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data?.data.poster_path})` }}>

                    </Card>
                    <div style={{ color: '#fff', marginLeft: 20 }}>
                        <Typography.Title data-aos="fade-down" style={{ color: '#fff' }} level={1}>{data?.data.title}</Typography.Title>
                        <Space data-aos="fade-up"
                            data-aos-duration="2000">
                            {
                                data?.data.genres.map((genre: { name: string, id: number }) => <Typography.Text key={genre.id} style={{ color: '#fff' }}>{genre.name} </Typography.Text>)
                            }
                        </Space>
                        <p>{data?.data.overview}</p>
                        <Progress size={60} className='progress'  strokeColor={data?.data.vote_average * 10 > 70 ? '#20CB77' : '#D1D431'} status="active" strokeWidth={10} type="circle" percent={data?.data.vote_average ? Math.round(data?.data.vote_average * 10) : 0} />
                    </div>
                </Space>
            </div>
        </div>
    );
};
