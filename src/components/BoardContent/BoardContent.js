import { useState, useEffect } from 'react';
import React from 'react';
import './BoardContent.scss';
import Column from './Column/Column';
import { initData } from '../../actions/initData';
import { mapOrder } from '../../ultilities/sort.js';
import _ from 'lodash';

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
        {/* {alert('Not found board')} */}
      </>
    );
  }

  return (
    <>
      <div className='board-column'>
        {columns &&
          columns.length > 0 &&
          columns.map((column, index) => (
            <Column key={column.id} column={column} />
          ))}
      </div>
    </>
  );
}

export default BoardContent;
