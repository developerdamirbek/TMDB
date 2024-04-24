// Detail.js
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleTv } from '../tv-shows/service/useGetSingleTv';
import { Button, Card, Progress, Space, Spin, Tooltip, Typography } from 'antd';

import AOS from 'aos';
import 'aos/dist/aos.css';
import useLikedItems from '../../store/likedStore';
import useSavedItems from '../../store/savedStore';
import { HeartOutlined, SaveOutlined } from '@ant-design/icons';

export const TvDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleTv(id);
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
                    <div data-aos="fade-down" style={{ color: '#fff', marginLeft: 20, display: 'flex', flexDirection: 'column' }}>
                        <Typography.Title style={{ color: '#fff' }} level={1}>{data?.data.name}</Typography.Title>
                        <Space>
                            {data?.data.genres.map((genre: { name: string, id: number }) => <Typography.Text key={genre.id} style={{ color: '#fff' }}>{genre.name} </Typography.Text>)}
                        </Space>
                        <Space align='center' style={{ marginTop: 20 }}>
                            <Progress size={60} className='progress' strokeColor={data?.data.vote_average * 10 > 70 ? '#20CB77' : '#D1D431'} status="active" strokeWidth={10} type="circle" percent={data?.data.vote_average ? Math.round(data?.data.vote_average * 10) : 0} />
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0, marginLeft: 10 }}>User <br /> Score</Typography.Title>
                        </Space>
                        <Space style={{ marginTop: 20 }} >
                            <Tooltip color='#032541' title="You can't add this item to your list" placement="bottom" >
                                <Button size='large' type='primary' shape='circle' style={{ backgroundColor: "#032541" }} icon={<HeartOutlined style={{ color: "#fff", padding: "10px", }} />} />
                            </Tooltip>
                            <Tooltip color='#032541' title="You can't add this item to your list" placement="bottom" >
                            <Button size='large' type='primary' shape='circle' style={{ backgroundColor: '#032541' }} icon={<SaveOutlined style={{ color: "#fff" }} />} />
                            </Tooltip>
                            
                        </Space>
                        <Typography.Title level={4} style={{ color: '#fff', marginTop: 20, marginBottom: 20 }}>Overview</Typography.Title>
                        <Typography.Text style={{ color: '#fff' }}>{data?.data.overview}</Typography.Text>
                    </div>
                </Space>
            </div>
        </div>
    );
};
