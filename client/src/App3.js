// important imports
import React from 'react'
import { BrowserRouter as Router,Route, Routes }from 'react-router-dom';

import Create from './components/Create';
import Edit from './components/Edit';
import Home from './components/Home';

//Route to admin functions.
function App() {
return (
	<div className='App'>
	
	<Router>
	<Routes>
		<Route path='/' element={<Home/>}/>
		<Route path='/create' element={<Create/>}/>
		<Route path='/edit' element={<Edit/>}/>
	</Routes>
	</Router>
</div>
);

}

export default App;
