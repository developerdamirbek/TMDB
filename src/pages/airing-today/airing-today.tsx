import { Card, Pagination, PaginationProps, Spin, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useGetAiringToday } from './service/useGetAiringToday';
import { Link } from 'react-router-dom';

export const AiringToday = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAiringToday(currentPage);


    const pageChange: PaginationProps["onChange"] = (page) => {
        setCurrentPage(page);
    }

    console.log(data);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return isLoading ? <Spin /> : (
        <section style={{ paddingTop: 140, paddingBottom: 30 }}>
            <div className="container">
            <Typography.Title style={{marginBottom: 40}} level={2}>Airing Today</Typography.Title>

                <div style={{ display: 'flex', marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
                    {data?.data.results.map((item: { poster_path: string, id: string, name: string, first_air_date: string }) => {
                        const releaseDate = new Date(item.first_air_date);
                        const formattedReleaseDate = releaseDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        });

                        return (
                            <Link to={`/tv/${item.id}`}>
                                <Card
                                    data-aos="fade-up"
                                    data-aos-duration="3000"
                                    key={item.id}
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img style={{ objectFit: 'cover', width: '100%', height: '320px' }} alt="example" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />}
                                >
                                    <Meta title={item.name} description={formattedReleaseDate} />
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
