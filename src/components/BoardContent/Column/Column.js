import React from 'react';
import Card from '../Card/Card';
import './Column.scss';
import { mapOrder } from '../../../ultilities/sort.js';

function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrders, 'id');
  return (
    <>
      <div className='column'>
        <header>{column.title}</header>
        <ul className='card-list'>
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => <Card key={card.id} card={card} />)}
        </ul>
        <footer>This is footer</footer>
      </div>
    </>
  );
}

export default Column;
