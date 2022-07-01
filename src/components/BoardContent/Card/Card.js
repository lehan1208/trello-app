import React from 'react';
import './Card.scss';

function Card(props) {
  const { card } = props;

  return (
    <>
      <div className='card-item'>
        {card.image && (
          <img
            className='card-cover'
            alt=''
            src={card.image}
            onMouseDown={(e) => e.preventDefault()}
          />
        )}
        {card.title}
      </div>
    </>
  );
}

export default Card;
