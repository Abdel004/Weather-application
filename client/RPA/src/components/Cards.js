import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1> Check out these epic destinations</h1>
      <div className='cards__container'>
          <div className='cards__wrapper'>
              <ul className = "cards_items">
                  <CardItem/>
              </ul>

          </div>
      </div>

    </div>
  )
}

export default Cards

