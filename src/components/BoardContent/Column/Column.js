import React, { useEffect, useState, useRef } from 'react';
import Card from '../Card/Card';
import './Column.scss';
import { Container, Draggable } from 'react-smooth-dnd';
import { mapOrder } from '../../../utilities/sort.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import ConfirmModal from '../../Common/ConfirmModal';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../../constant';

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrders, 'id');

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [titleColumn, setTitleColumn] = useState('');
  const [isFirstClick, setIsFirstClick] = useState(true); // (1) tạo state
  const inputRef = useRef(); // (2) tạo inputRef

  useEffect(() => {
    if (column && column.title) {
      setTitleColumn(column.title);
    }
  }, [column.title]);

  const toggleModal = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };

  const onModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
      // do nothing
    }
    if (type === MODAL_ACTION_CONFIRM) {
      // remove column
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }

    toggleModal();
  };

  const selectAllText = (event) => {
    setIsFirstClick(false); // (4) set lại isFirstClick = false
    if (isFirstClick) {
      // (5) nếu isFirstClick = true => select all text
      event.target.select();
    } else {
      inputRef.current.setSelectionRange(
        // (6) nếu isFirstClick = false => method setSelectionRange(start, end)
        titleColumn.length,
        titleColumn.length
      );
    }
  };

  const handleClickOutside = () => {
    setIsFirstClick(true);
    const newColumn = {
      ...column,
      title: titleColumn,
      _destroy: false,
    };
    onUpdateColumn(newColumn);
  };

  return (
    <>
      <div className='column'>
        <header className='column-drag-handle'>
          <div className='column-title'>
            <Form.Control
              size={'sm'}
              type='text'
              value={titleColumn}
              className='customize-input-colum'
              onClick={selectAllText}
              onChange={(e) => setTitleColumn(e.target.value)}
              spellCheck='false'
              onBlur={handleClickOutside}
              onMouseUp={(event) => event.preventDefault()}
              ref={inputRef} // (3) thêm props
            />
          </div>
          <div className='column-dropdown'>
            <Dropdown>
              <Dropdown.Toggle
                variant=''
                id='dropdown-basic'
                size='sm'
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#'>Add card...</Dropdown.Item>
                <Dropdown.Item href='#'>Copy list...</Dropdown.Item>
                <Dropdown.Item href='#'>Move List</Dropdown.Item>
                <Dropdown.Item href='#'>
                  Move all cards in this list...
                </Dropdown.Item>
                <Dropdown.Item onClick={toggleModal}>
                  Remove this column
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
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
            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
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
        <footer>
          <div className='footer-action'>
            <i className='fa fa-plus plus-icon icon'></i>
            <span className='add-text'>Add a new card</span>
          </div>
        </footer>
      </div>

      <ConfirmModal
        title={'Remove this column'}
        content={`Are you sure to remove this column: <b>${column.title}</b> `}
        show={isShowModalDelete}
        onAction={onModalAction}
      />
    </>
  );
}

export default Column;
