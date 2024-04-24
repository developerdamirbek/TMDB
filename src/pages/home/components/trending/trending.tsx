import React from "react";
import Slider from "react-slick";
import { useGetTrending } from "./service/useGetTrending";
import './style.scss'
import { Link } from "react-router-dom";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export const Trending = () => {

    const { data, isLoading } = useGetTrending();
    console.log(data);

    const settings = {
        dots: false,
        speed: 500,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 986,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <div>
            <Slider {...settings}>
                {data?.data?.results.map((item: { poster_path: string, id: number, title: string, release_date?: string }) => {
                    const releaseDate = new Date(item.release_date ? item.release_date : '');
                    const formattedReleaseDate = releaseDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    });
                    return (
                        <Link to={`/movie/${item.id}`} key={item.id}>
                            <Card
                            className="card"
                                hoverable
                                style={{ width: 180 }}
                                cover={<img style={{ objectFit: 'cover', width: '100%', height: '300px' }} alt="example" src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />}
                            >
                                <Meta title={item.title ? item.title : ''} description={formattedReleaseDate ? formattedReleaseDate : ''} />
                            </Card>
                        </Link>
                    );
                })}
            </Slider>
        </div>
    )
}
