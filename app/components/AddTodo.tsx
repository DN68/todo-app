'use client'
import React, { useState } from 'react';

interface AddTodoProps {
  addTodo: (text: string) => void;
}

export default function AddTodo({ addTodo }: AddTodoProps) {
  const [inputValue, setInputValue] = useState(''); // Lưu giá trị nhập ở input

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue); // Gọi hàm addTodo khi người dùng nhấn Submit
      setInputValue(''); // Reset ô input khi thêm todo
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Cập nhật giá trị input
        className="border p-2 w-full mb-2"
        placeholder="Add a new todo"
      />
      <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
        Add Todo
      </button>
    </form>
  );
}