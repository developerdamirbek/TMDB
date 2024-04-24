import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useSavedItems from '../../store/savedStore';
import Meta from 'antd/es/card/Meta';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export const Saved = () => {

  useEffect(() => {
    AOS.init();
  })

  const savedItems = useSavedItems((state) => state.savedItems);

  return (
    <div style={{ marginTop: 140, paddingBottom: 50 }}>
      <div className="container">
        {
          savedItems.length ? (
            <><Typography.Title style={{ marginBottom: 40 }} level={2}>Saved Movies</Typography.Title>
              <div style={{ display: 'flex', marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
                {savedItems.map((item) => {
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
              </div></>
          ) : <Typography.Title style={{ marginBottom: 40, marginTop: 200, textAlign: 'center', width: '100%' }} level={2}>No Saved Movies</Typography.Title>
        }

      </div>
    </div>
  )
}
