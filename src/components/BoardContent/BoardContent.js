import { useState, useEffect } from 'react';
import React from 'react';
import './BoardContent.scss';
import Column from './Column/Column';
import { initData } from '../../actions/initData';
import { mapOrder } from '../../ultilities/sort.js';
import _ from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';

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

  if (_.isEmpty(board)) {
    return (
      <>
        <div className='not-found'>Board not found</div>
      </>
    );
  }
  const onColumnDrop = (dropResult) => {
    console.log('>>>>onColumnDrop: ', dropResult);
  };

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
                  <Column column={column} />
                </Draggable>
              );
            })}
        </Container>
      </div>
    </>
  );
}

export default BoardContent;
