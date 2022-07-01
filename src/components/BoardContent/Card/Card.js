import React from 'react';
import './Card.scss';

function Card(props) {
  const { card } = props;

  return (
    <>
      <li className='card-item'>
        {card.image && <img className='card-cover' alt='' src={card.image} />}
        {card.title}
      </li>
    </>
  );
}

export default Card;
