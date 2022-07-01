import React from 'react';
import Card from '../Card/Card';
import './Column.scss';
import { Container, Draggable } from 'react-smooth-dnd';
import { mapOrder } from '../../../ultilities/sort.js';

function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrders, 'id');

  const onCardDrop = (dropResult) => {
    console.log('>>>Inside cardDrops: ', dropResult);
  };

  return (
    <>
      <div className='column'>
        <header className='column-drag-handle'>{column.title}</header>
        <div className='card-list'>
          <Container
            // onDragEnter={() => {
            //   console.log('drag enter:', column.id);
            // }}
            // onDragLeave={() => {
            //   console.log('drag leave:', column.id);
            // }}
            // onDropReady={(p) => console.log('Drop ready: ', p)}
            // onDragStart={(e) => console.log('drag started', e)}
            // onDragEnd={(e) => console.log('drag end', e)}
            {...column.props}
            groupName='col'
            onDrop={onCardDrop}
            getChildPayload={(index) => cards[index]}
            dragClass='card-ghost'
            dropClass='card-ghost-drop'
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'card-drop-preview',
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((card, index) => (
                <Draggable key={card.id}>
                  <Card card={card} />
                </Draggable>
              ))}
          </Container>
        </div>
        <footer>This is footer</footer>
      </div>
    </>
  );
}

export default Column;
