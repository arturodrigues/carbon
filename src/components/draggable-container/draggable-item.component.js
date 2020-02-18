import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { StyledDraggableItem } from './draggable-item.style';

const DraggableItem = ({
  id, findItem, moveItem, onUpdate, children
}) => {
  const oIndex = findItem(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'draggableItem', id, oIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveItem(droppedId, originalIndex);
      }

      onUpdate();
    }
  });

  const [, drop] = useDrop({
    accept: 'draggableItem',
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findItem(id);
        moveItem(draggedId, overIndex);
      }
    }
  });

  return (
    <StyledDraggableItem
      data-element='draggable'
      isDragging={ isDragging }
      ref={ node => drag(drop(node)) }
    >
      {children}
    </StyledDraggableItem>
  );
};

DraggableItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  children: PropTypes.node.isRequired,
  onUpdate: PropTypes.func
};

export default DraggableItem;
