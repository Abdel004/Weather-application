import LogIn from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Cookies from 'universal-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from "./components/Map";
import MapLoc from "./components/MapLoc";
import EditUser from "./components/EditUser";
import FavLocations from "./components/FavLocations";
import LocationsTable from "./components/LocationsTable";
import EditLocation from "./components/EditLocation";

const cookies = new Cookies();

function createCookie(res) {
  cookies.set('userName', res.userName)
  cookies.set('role', res.role)
}

function removeCookies() {
  cookies.remove('userName')
  cookies.remove('role')
}

function App() {
  let userName = cookies.get('userName')
  let role = cookies.get('role')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userName && role === 'user' ? <Map /> : <LogIn createCookie={createCookie} />} />
        <Route path="/login-admin" element={(userName && role === 'admin') ? <EditUser /> : <AdminLogin createCookie={createCookie} />} />
        <Route path="/map" element={<Map />} />
        <Route path="/map/:name" element={<MapLoc />} />
        <Route path="/user-edit" element={<EditUser />} />
        <Route path="/fav" element={<FavLocations username={userName} />}></Route>
        <Route path="/table" element={<LocationsTable />} />
        <Route path="/edit-location" element={<EditLocation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
