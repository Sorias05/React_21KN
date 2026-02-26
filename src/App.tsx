import './App.css'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.tsx";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./componetns/layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage.tsx";
import TestPage from "./pages/TestPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"register"} element={<RegisterPage/>}/>
                <Route path={"profile"} element={<ProfilePage/>}/>
                <Route path={"test"} element={<TestPage/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default App
