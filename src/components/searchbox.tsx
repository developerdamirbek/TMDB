import {  Image, List, Spin, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useSearchQuery } from './service/useGetSearch';
import { useNavigate } from 'react-router-dom';

export const Searchbox = () => {

    const [value, setValue] = useState("");
    const search = useDebounce(value);
    const { data, isLoading } = useSearchQuery(search);
    console.log(search);
    console.log(data);
    
    
    
    const navigate = useNavigate()

    const handleItemClick = (id: number) => {
        navigate(`/movie/${id}`);
    }


    return (
        <div>
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    
                />

            </div>
            {value.length >= 2 ? (
                <>

                    {isLoading ? <Spin style={{width:"100%", display:"flex", justifyContent:"center", marginTop: 30}} /> : (
                        <List
                        style={{maxHeight: 400, overflowY:"auto"}}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item: {id: number, poster_path: string, title:string}) => (
                          <List.Item style={{cursor: "pointer"}} onClick={() => handleItemClick(item.id)}>
                            <List.Item.Meta
                              avatar={<Image width={60} height={60} style={{objectFit: "cover"}} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}` } />}
                              title={item.title}
                            />
                          </List.Item>
                        )}
                      />
                    )}
                </>
            ) : <Typography style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 30, width: "100%" }}>Search Movies</Typography>}
        </div>
    )
}
