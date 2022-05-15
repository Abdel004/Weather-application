import LogIn from "./components/Login";
import Cookies from 'universal-cookie';
import { Routes, Route } from 'react-router-dom';
import Map from "./components/Map";
import MapLoc from "./components/MapLoc";
import EditUser from "./components/EditUser";
import FavLocations from "./components/FavLocations";
import LocationsTable from "./components/LocationsTable";
import EditLocation from "./components/EditLocation";
import Search from "./components/Search";
import Refresh from "./components/Refresh";
import AdminNav from "./components/AdminNav";
import UserNav from "./components/UserNav";

const cookies = new Cookies();

//Set Cookies
function createCookie(res) {
  cookies.set('userName', res.userName)
  cookies.set('role', res.role)
}


//Route to different API calls.
function App() {
  let userName = cookies.get('userName')

  if (window.location.pathname === '/logout') {
    console.log("signing out");
    cookies.remove('userName', { path: '/' });
    cookies.remove('role', { path: '/' });
    window.location.href = '/';
  }

  return (

    <Routes>
      <Route path="/" element={<LogIn createCookie={createCookie} />} />
      <Route path="/admin/home" element={<AdminNav username={userName} />} />
      <Route path="/requests" element={<AdminNav username={userName} children={<Refresh />} />} />
      <Route path="/user" element={<AdminNav username={userName} children={<EditUser />} />} />
      <Route path="/loc" element={<AdminNav username={userName} children={<EditLocation />} />} />
      <Route path="/user/home" element={<UserNav username={userName} />} />
      <Route path="/locations" element={<UserNav username={userName} children={<LocationsTable username={userName} />} />} />
      <Route path="/map/:name" element={<UserNav username={userName} children={<MapLoc username={userName} />} />} />
      <Route path="/map" element={<UserNav username={userName} children={<Map />} />} />
      <Route path="/fav"  element={<UserNav username={userName} children={<FavLocations username={userName}/>} />} />
      <Route path="/search" element={<UserNav username={userName} children={<Search username={userName}/>} />} />
    </Routes>

  );
}

export default App;
