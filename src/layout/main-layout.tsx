import { Layout } from 'antd'
import { Header } from './header/header'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import { Footer } from './footer/footer'
import './style.scss'

export const MainLayout = () => {
  return (
    <Layout>
      <div className='layout'>
        <div>
          <Header />
          <Content>
            <Outlet />
          </Content>
        </div>
        <Footer />
      </div>
    </Layout>
  )
}
