"use client";

import React from "react";
const now = new Date();

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  openEditPopup: (todo: Todo, id : number) => void;
}

export default function TodoList({
  todos,
  deleteTodo,
  completeTodo,
  openEditPopup,
} : TodoListProps) {
  console.log(todos);
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center p-2 bg-gray-200 font-bold">
        <span className="flex-1">Task</span>
        <span className="flex-1 " style={{ marginRight: "40%" }}>
          Time
        </span>
        <span className="flex-1 text-center">Actions</span>
      </div>
      <ul className="space-y-2">
        {/* Duyet qua todos và hien thi tung todo */}

        {todos.map((todo, id) => (
          <li
            key={id}
            className={`flex justify-between items-center p-2  bg-white flex-1 overflow-hidden`}
          >
            <span
              onClick={() => completeTodo(id)} // danh dau hoan thanh khi click vao todo
              className={`cursor-pointer flex-1 overflow-hidden ${
                todo.completed ? "line-through" : ""
              } `} // Gach ngang todo da hoan thanh
              style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {todo.todo}
            </span>
            <span
              onClick={() => completeTodo(id)}
              className="text-xs px-2 font-bold"
            >
              {todo.completed
                ? `${now.getHours().toString()} : ${now.getMinutes()}`
                : ""}
            </span>
            <div className="flex space-x-2">
              {/* Nut edit */}
              <button
                onClick={() => openEditPopup(todo, id)}
                className="bg-yellow-500 text-white px-2 ml-2 py-1 rounded"
                disabled = {todo.completed} // disable edit neu completed task
              >
                Edit
              </button>
              {/* Nut Delete  */}
              <button
                onClick={() => deleteTodo(id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              {/* nut hoan thanh */}
              <button
                onClick={() => completeTodo(id)} // bam vao nut hoan thanh
                className={`bg-blue-500 text-white px-2 py-1 w-20 rounded ${
                  todo.completed ? "bg-gray-500" : "bg-blue-500"
                }`}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
