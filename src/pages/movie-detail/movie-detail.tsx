import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleMovie } from '../movie/service/useGetSingleMovie';
import { Button, Card, Progress, Space, Spin, Typography } from 'antd';
import './style.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HeartOutlined, SaveOutlined } from '@ant-design/icons';
import useLikedItems from '../../store/likedStore';
import useSavedItems from '../../store/savedStore';

export const MovieDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleMovie(id);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    const { likedItems, addLikedItem, removeLikedItem } = useLikedItems();
    const { savedItems, addSavedItem, removeSavedItem } = useSavedItems();

    const isLiked = likedItems && likedItems.some((item) => item.id === data?.data.id);
    const isSaved = savedItems && savedItems.some((item) => item.id === data?.data.id);

    const handleLike = () => {
        if (isLiked) {
            removeLikedItem(data?.data.id);
        } else {
            addLikedItem(data?.data);
        }
    }

    const handleSave = () => {
        if (isSaved) {
            removeSavedItem(data?.data.id);
        } else {
            addSavedItem(data?.data);
        }
    }

    return isLoading ? (
        <Spin style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 180 }} size='large' />
    ) : (
        <div className='detail_wrapper' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data?.data.backdrop_path})` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', right: 0, bottom: 0 }}>
            </div>
            <div className='container'>
                <Space align='start'>
                    <Card className='card' data-aos="fade-right" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data?.data.poster_path})` }}>
                    </Card>
                    <div data-aos="fade-down" style={{ color: '#fff', marginLeft: 20, display: 'flex', flexDirection: 'column' }}>
                        <Typography.Title  className='typography'  style={{ color: '#fff' }} level={1}>{data?.data.title}</Typography.Title>
                        <Space>
                            {data?.data.genres.map((genre: { name: string, id: number }) => <Typography.Text key={genre.id} style={{ color: '#fff' }}>{genre.name} </Typography.Text>)}
                        </Space>
                        <Space align='center' style={{ marginTop: 20 }}>
                            <Progress size={60} className='progress' strokeColor={data?.data.vote_average * 10 > 70 ? '#20CB77' : '#D1D431'} status="active" strokeWidth={10} type="circle" percent={data?.data.vote_average ? Math.round(data?.data.vote_average * 10) : 0} />
                            <Typography.Title level={4} style={{ color: '#fff', margin: 0, marginLeft: 10 }}>User <br /> Score</Typography.Title>
                        </Space>
                        <Space style={{ marginTop: 20 }} >
                            <Button size='large' onClick={handleLike} type='primary' shape='circle' style={{ backgroundColor: isLiked ? "red" : "#032541" }} icon={<HeartOutlined style={{ color: "#fff", padding: "10px",  }} />} /> 
                            <Button onClick={handleSave} size='large' type='primary'  shape='circle' style={{ backgroundColor: isSaved ? "#20CB77" : '#032541' }} icon={<SaveOutlined style={{ color: "#fff" }} />} />
                        </Space>
                        <Typography.Title level={4} style={{ color: '#fff', marginTop: 20, marginBottom: 20 }}>Overview</Typography.Title>
                        <Typography.Text style={{ color: '#fff' }}>{data?.data.overview}</Typography.Text>
                    </div>
                </Space>
            </div>
        </div>
    );
};
