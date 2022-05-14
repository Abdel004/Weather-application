import LogIn from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Cookies from 'universal-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Map from "./components/Map";
const cookies = new Cookies();

function createCookie(res) {
  cookies.set('userName', res.userName)
  cookies.set('role', res.role)
  console.log(cookies.get('userName'))
  console.log(cookies.get('role'))
}
// <Map multipleLocations={false}  name={"ho"}/>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn createCookie={createCookie} />} />
        <Route path="/login-admin" element={<AdminLogin createCookie={createCookie} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
