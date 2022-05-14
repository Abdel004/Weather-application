import LogIn from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Cookies from 'universal-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from "./components/Map";
import MapLoc from "./components/MapLoc";

const cookies = new Cookies();

function createCookie(res) {
  cookies.set('userName', res.userName)
  cookies.set('role', res.role)
}

function App() {
  let userName = cookies.get('userName')
  let role = cookies.get('role')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userName ? <Map /> : <LogIn createCookie={createCookie} />} />
        <Route path="/login-admin" element={(userName && role && role === 'admin') ? <Map /> : <AdminLogin createCookie={createCookie} />} />
        <Route path="/map" element={<Map />} />
        <Route path="/map/:name" element={<MapLoc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
