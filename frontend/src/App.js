import './App.css';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import { UserContextProvider } from './UserContext';


function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path={"/Login"} element={<LoginPage/>} />
        <Route path={"/Register"} element={<RegisterPage/>} />
        <Route path={'/Create'} element={<CreatePost/>}/>
        <Route path={'/post/:id'} element={<PostPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
    

  );

}

export default App;
