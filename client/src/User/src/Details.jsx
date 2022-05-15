import React from 'react';

class Home extends React.Component {
   render() {
      return (
      <div>
          <h2 className = "check">Location Details</h2>
          <h3 className = "check">Providing location details to user.</h3>
          <p className = "check">Should Contain: </p>
          <p className = "check">
            <ul className = "check">
               <li className = "check"> Big map showing the location using Google map API, click linking to small map</li>
               <li className = "check"> Table showing the Locations, having the sort function, clicking and linking to small map, search function, add to favourites column</li>
               <li className = "check"> Big map showing the location using Google map API, click linking to small map</li>
            </ul>
            </p>
  
        </div>
      );
   }
}

export default Home;
