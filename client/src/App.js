import LogIn from "./components/Login";
import Cookies from 'universal-cookie';
import { Routes, Route } from 'react-router-dom';
import Map from "./components/Map";
import MapLoc from "./components/MapLoc";
import EditUser from "./components/EditUser";
import FavLocations from "./components/FavLocations";
import LocationsTable from "./components/LocationsTable";
import EditLocation from "./components/EditLocation";
import Search from "./components/search";
import Comments from "./components/Comments";
import Refresh from "./components/Refresh";
import UserNav from "./components/UserNav";

const cookies = new Cookies();

//Set Cookies
function createCookie(res) {
  cookies.set('userName', res.userName)
  cookies.set('role', res.role)
}

//Remove Cookies
function removeCookies() {
  cookies.remove('userName')
  cookies.remove('role')
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
      <Route path="/admin/home" element={<UserNav removeCookies={removeCookies} username={userName} />} />
      <Route path="/requests" element={<UserNav removeCookies={removeCookies} username={userName} children={<Refresh/>}/> } />
      <Route path="/user" element={<UserNav removeCookies={removeCookies} username={userName} children={<EditUser/>} />} />
      <Route path="/loc" element={<UserNav removeCookies={removeCookies} username={userName} children={<EditLocation/>} />} />
      {/* <Route path="/edit/refresh" element={<Refresh />} />
      <Route path="/map/:name" element={<MapLoc username={userName} />} /> */}
      {/* <Route path="/map" element={<Map />} />
        <Route path="/user-edit" element={<EditUser />} />
        <Route path="/fav" element={<FavLocations username={userName} />}></Route>
        <Route path="/table" element={<LocationsTable username={userName} />} />
        <Route path="/edit-location" element={<EditLocation />} />
        <Route path="/search" element={<Search username={userName} />} />
        <Route path="/comment" element={<Comments userName={userName} name={"London"} />} /> */}
    </Routes>

  );
}

export default App;
