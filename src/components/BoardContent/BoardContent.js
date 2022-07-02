import { useState, useEffect } from 'react';
import React from 'react';
import './BoardContent.scss';
import Column from './Column/Column';
import { initData } from '../../actions/initData';
import { mapOrder } from '../../ultilities/sort.js';
import _ from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../ultilities/dragDrop.js';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumn] = useState([]);

  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === 'board-1');
    if (boardInitData) {
      setBoard(boardInitData);
      // Sort columns
      setColumn(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id')
      );
    }
  }, []);

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumn(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      console.log(
        '>>>Inside cardDrops: ',
        dropResult,

        'with columnID: ',
        columnId
      );

      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column.id === columnId); // Tìm ra column nào đang modify
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrders = currentColumn.cards.map((card) => card.id);

      setColumn(newColumns);
    }
  };

  if (_.isEmpty(board)) {
    return (
      <>
        <div className='not-found'>Board not found</div>
      </>
    );
  }

  return (
    <>
      <div className='board-column'>
        <Container
          orientation='horizontal'
          getChildPayload={(index) => columns[index]}
          onDrop={onColumnDrop}
          dragHandleSelector='.column-drag-handle'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview',
          }}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => {
              return (
                <Draggable key={column.id}>
                  <Column column={column} onCardDrop={onCardDrop} />
                </Draggable>
              );
            })}

          <div className='add-new-column'>
            <i className='fa fa-plus icon'></i>
            <span>Add another list</span>
          </div>
        </Container>
      </div>
    </>
  );
}

export default BoardContent;
