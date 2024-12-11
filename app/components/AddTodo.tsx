"use client";
import React, { useState } from "react";

export default function AddTodo({ addTodo }) {
  const [inputValue, setInputValue] = useState(""); // Luu gia tri nhap o input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue); // Goi ham addTodo khi nguoi dung nhan Submit
      setInputValue(""); // Reset o input khi them todo
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // cap nhat gia tri input
        className="border p-2 w-full mb-2"
        placeholder="Add a new todo"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white w-full p-2 rounded"
      >
        Add Todo
      </button>
    </form>
  );
}
