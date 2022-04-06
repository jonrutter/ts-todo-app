import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

// components
import { TodoItem } from './TodoItem';

// types
import { Todo } from '../types';

type Props = {
  list: Todo[];
  setList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedList: Todo[];
  setCompletedList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<Props> = ({
  list,
  setList,
  completedList,
  setCompletedList,
}) => {
  // todo list contents
  const activeContent = list.map((item, index) => (
    <TodoItem
      key={item.id}
      item={item}
      list={list}
      setList={setList}
      index={index}
    />
  ));
  const completedContent = completedList.map((item, index) => (
    <TodoItem
      key={item.id}
      item={item}
      list={completedList}
      setList={setCompletedList}
      index={index}
    />
  ));

  return (
    <div
      id="container"
      className="w-full my-4 justify-between grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <Droppable droppableId="ActiveList">
        {(provided, snapshot) => (
          <div
            id="todos"
            className={`rounded-lg text-slate-900 w-full py-4 px-6 transition-all ${
              snapshot.isDraggingOver ? 'bg-cyan-200 shadow-lg' : 'bg-cyan-400'
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="text-2xl">Active Tasks</h2>
            {activeContent}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="CompletedList">
        {(provided, snapshot) => (
          <div
            id="todos"
            className={`rounded-lg text-slate-900 w-full py-4 px-6 transition-all ${
              snapshot.isDraggingOver ? 'bg-red-200 shadow-lg' : 'bg-red-400'
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="text-2xl">Completed Tasks</h2>
            {completedContent}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
