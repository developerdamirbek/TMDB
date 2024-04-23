import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout/main-layout"
import { routes } from "./router/routes"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
        {routes.map(({ component: Component, path, id }) => (
            <Route path={path} key={id} index={!path ? true : false} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </>
  )
}
export default App
