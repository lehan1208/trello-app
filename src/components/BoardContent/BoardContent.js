import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './BoardContent.scss';
import Column from './Column/Column';
import { initData } from '../../actions/initData';
import { Container, Draggable } from 'react-smooth-dnd';
import { mapOrder } from '../../utilities/sort.js';
import { applyDrag } from '../../utilities/dragDrop.js';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumn] = useState([]);
  const [valueInput, setValueInput] = useState('');

  const [isShowAddList, setIsShowAddList] = useState(false); // state cho input của add-new-column

  const inputRef = useRef();

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

  useEffect(() => {
    if (isShowAddList === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowAddList]);

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

  const handleAddList = () => {
    if (!valueInput) {
      if (inputRef && inputRef.current) inputRef.current.focus();
      return;
    }
    // Update board column
    let createNewColumn = [...columns];
    createNewColumn.push({
      id: uuidv4(),
      boardId: board.id,
      title: valueInput,
      cards: [],
    });
    setColumn(createNewColumn);
    inputRef.current.focus();
    setValueInput('');
  };

  const onUpdateColumn = (newColumn) => {
    const columnIdUpdate = newColumn.id;
    let cols = [...columns]; // origin cols
    let index = cols.findIndex((item) => item.id === columnIdUpdate);

    if (newColumn._destroy === true) {
      // remove column
      cols.splice(index, 1);
    } else {
      // update column
      cols[index] = newColumn;
    }

    setColumn(cols);
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
                  <Column
                    column={column}
                    onCardDrop={onCardDrop}
                    onUpdateColumn={onUpdateColumn}
                  />
                </Draggable>
              );
            })}
        </Container>

        {isShowAddList === false ? (
          <div
            className='add-new-column'
            onClick={() => setIsShowAddList(true)}
          >
            <i className='fa fa-plus icon'></i>
            <span>Add another list</span>
          </div>
        ) : (
          <div className='content-add-new-column'>
            <input
              type='text'
              placeholder='Enter list title...'
              className='form-control'
              ref={inputRef}
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
            />
            <div className='group-btn'>
              <button
                className='btn btn-primary'
                onClick={() => handleAddList()}
              >
                Add list
              </button>
              <i
                className='fa fa-times icon'
                onClick={() => setIsShowAddList(false)}
              ></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BoardContent;
