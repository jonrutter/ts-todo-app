import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

// icons
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

// types
import { Todo } from '../types';

type Props = {
  item: Todo;
  list: Todo[];
  setList: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

// TODO: implement useReducer to handle state changes in the TodoItem

export const TodoItem: React.FC<Props> = ({ item, list, setList, index }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = (id: string) =>
    setList((list) =>
      list.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );

  const handleDelete = (id: string) =>
    setList((list) => list.filter((item) => item.id !== id));

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setList((list) =>
      list.map((item) => (item.id === id ? { ...item, todo: input } : item))
    );
    setEditing(false);
  };

  useEffect(() => {
    if (editing && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <form
          className={`flex items-center justify-between selection:rounded-md p-5 mt-4 bg-[url('https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg')] transition-all hover:shadow-md hover:scale-[1.03] ${
            snapshot.isDragging ? 'shadow-md scale-[1.03]' : ''
          }`}
          onSubmit={(e) => handleEdit(e, item.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            {editing ? (
              <input
                ref={inputRef}
                type="text"
                id="todos__single--text"
                className="flex-1 p-1 border-none text-lg focus:outline-none inline-block"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              <span
                id="todos__single--text"
                className={`flex-1 p-1 text-lg ${
                  item.isComplete ? 'line-through' : ''
                }`}
              >
                {item.todo}
              </span>
            )}
          </div>
          <div className="flex items-center flex-wrap">
            <button
              type="button"
              id="icon"
              className="ml-3 text-2xl cursor-pointer"
              onClick={() => setEditing((editing) => !editing)}
              aria-label="Edit task"
            >
              <AiFillEdit aria-hidden />
            </button>
            <button
              type="button"
              id="icon"
              className="ml-3 text-2xl cursor-pointer"
              onClick={() => handleDelete(item.id)}
              aria-label="Delete task"
            >
              <AiFillDelete aria-hidden />
            </button>
            <button
              type="button"
              className="ml-3 text-2xl cursor-pointer"
              onClick={() => handleComplete(item.id)}
              aria-label="Mark task as completed"
            >
              <MdDone aria-hidden />
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};
