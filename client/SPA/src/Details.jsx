import React from 'react';

class Home extends React.Component {
   render() {
      return (
      <div>
          <h2>Location Details</h2>
          <h3>Providing location details to user.</h3>
          <p>Should Contain: </p>
          <p>
            <ul>
               <li> Big map showing the location using Google map API, click linking to small map</li>
               <li> Table showing the Locations, having the sort function, clicking and linking to small map, search function, add to favourites column</li>
               <li> Big map showing the location using Google map API, click linking to small map</li>
            </ul>
            </p>
  
        </div>
      );
   }
}

export default Home;
