import { useGetPerson } from './service/useGetPerson'
import { Spin } from 'antd';

export const People = () => {

    const {data, isLoading} = useGetPerson()
    console.log(data);
    

  return isLoading ? <div style={{ width: "100%", display: "flex", marginTop: 150, justifyContent: "center", alignItems: "center" }}><Spin /></div> : (
    <section>
        <div className="container"></div>
    </section>
  )
}
