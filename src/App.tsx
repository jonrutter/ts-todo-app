import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { nanoid } from 'nanoid';

import { Input } from './components/Input';
import { TodoList } from './components/TodoList';

import { Todo } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [list, setList] = useState<Todo[]>([]);
  const [completedList, setCompletedList] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      setList((list) => [
        ...list,
        { id: nanoid(), todo: input, isComplete: false },
      ]);
      setInput('');
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination?.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add;
    let active = [...list];
    let completed = [...completedList];
    if (source.droppableId === 'ActiveList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === 'ActiveList') {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }
    setCompletedList(completed);
    setList(active);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-tr from-indigo-600 to-blue-500 text-slate-50 px-6 py-4 selection:bg-purple-400">
        <div className="container mx-auto">
          <header>
            <h1 className="mb-8 text-4xl text-center">Taskify</h1>
          </header>
          <main>
            <Input input={input} setInput={setInput} handleAdd={handleAdd} />
            <TodoList
              list={list}
              setList={setList}
              completedList={completedList}
              setCompletedList={setCompletedList}
            />
          </main>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
