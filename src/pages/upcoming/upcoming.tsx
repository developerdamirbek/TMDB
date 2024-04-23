import { Card, Pagination, PaginationProps, Spin, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useGetUpcoming } from './service/useGetUpcoming';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

export const Upcoming = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetUpcoming(currentPage);

    const pageChange: PaginationProps["onChange"] = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return isLoading ? <div style={{ width: "100%", display: "flex", marginTop: 150, justifyContent: "center", alignItems: "center" }}><Spin /></div> : (
        <section style={{ paddingTop: 140, paddingBottom: 30 }}>

            <div className='container'>
            <Typography.Title style={{marginBottom: 40}} level={2}>Upcoming</Typography.Title>

                <div style={{ display: 'flex', marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
                    {data?.data.results.map((item: { poster_path: string, id: string, title: string, release_date: string }) => {
                        const releaseDate = new Date(item.release_date);
                        const formattedReleaseDate = releaseDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        });
                        return (
                            <Link to={`/movie/${item.id}`} key={item.id}>
                                <Card
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img style={{ objectFit: 'cover', width: '100%', height: '320px' }} alt="example" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />}
                                >
                                    <Meta title={item.title} description={formattedReleaseDate} />
                                </Card>
                            </Link>
                        );
                    })}
                </div>
                <Pagination
                    style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: 10, marginTop: 30 }}
                    current={currentPage}
                    total={data?.totalPages * 20}
                    pageSize={10}
                    onChange={pageChange} />
            </div>
        </section>
    )
}
