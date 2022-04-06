import React from 'react';

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
};

export const Input: React.FC<Props> = ({ input, setInput, handleAdd }) => {
  return (
    <form className="flex w-full relative items-center text-slate-900">
      <input
        type="input"
        placeholder="Enter a task"
        value={input}
        onSubmit={handleAdd}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-full py-5 px-8 text-lg border-none transition-all shadow-inner outline-none  focus:ring-offset-2 focus:ring-offset-transparent focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="submit"
        onClick={handleAdd}
        className="absolute right-0 m-3 border-none bg-indigo-600 text-slate-50 w-[50px] h-[50px] rounded-full shadow-md transition-all hover:opacity-80 active:scale-95 active:shadow-sm"
      >
        Enter
      </button>
    </form>
  );
};
