"use client";

import React from "react";
const now = new Date();

export default function TodoList({
  todos,
  deleteTodo,
  completeTodo,
  openEditPopup,
}) {
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

        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2  bg-white flex-1 overflow-hidden`}
          >
            <span
              onClick={() => completeTodo(index)} // danh dau hoan thanh khi click vao todo
              className={`cursor-pointer flex-1 overflow-hidden ${
                todo.completed ? "line-through" : ""
              } `} // Gach ngang todo da hoan thanh
            >
              {todo.text}
            </span>
            <span
              onClick={() => completeTodo(index)}
              className="text-xs px-2 font-bold"
            >
              {todo.completed
                ? `${now.getHours().toString()} : ${now.getMinutes()}`
                : ""}
            </span>
            <div className="flex space-x-2">
              {/* Nut edit */}
              <button
                onClick={() => openEditPopup(todo, index)}
                className="bg-yellow-500 text-white px-2 ml-2 py-1 rounded"
              >
                Edit
              </button>
              {/* Nut Delete  */}
              <button
                onClick={() => deleteTodo(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              {/* nut hoan thanh */}
              <button
                onClick={() => completeTodo(index)} // bam vao nut hoan thanh
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
