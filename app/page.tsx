"use client";

import { useState, useReducer } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

//Reducer để xử lý các action và cập nhật state
const todoReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          text: action.payload.text,
          completed: false,
        },
      ];
    case "delete":
      return state.filter((_, index) => index !== action.payload.index);
    case "complete":
      return state.map((todo, index) =>
        index === action.payload.index
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "edit":
      return state.map((todo, index) =>
        index === action.payload.index
          ? { ...todo, text: action.payload.text ? `${action.payload.text}` : `${todo.text}` }
          : todo
      );
      
    default:
      return state;
  }
};

export default function Home() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); //quan ly trang thai popup edit, mac dinh la false (dong)
  const [editingTodo, setEditingTodo] = useState(null); // luu Todo dang chinh sua

  // add todo
  const addTodo = (text) => {
    dispatch({ type: "add", payload: { text } });
  };

  // delete todo
  const deleteTodo = (index) => {
    dispatch({ type: "delete", payload: { index } });
  };

  // Complete todo
  const completeTodo = ( index) => {
    dispatch({ type: "complete", payload: { index } });
  };

  //Edit todo
  const editTodo = (text, index) => {
    dispatch({ type: "edit", payload: { text, index } });
  };

  //Open popup with info of todo
  const openEditPopup = (todo, index) => {
    setEditingTodo({ text: todo.text, index }); // set cai pop up edit co noi dung la noi dung todo o nut edit
    setIsEditPopupOpen(true); // set trang thai pop up thanh true de hien thi pop up
  };

  //close popup
  const closeEditPopup = () => {
    setIsEditPopupOpen(false); // set trang thai pop up thanh false de dong pop up
    setEditingTodo(null); // set text o popup edit quay lai trong
  };

  //Save edit
  const saveEdit = () => {
    editTodo(editingTodo.text, editingTodo.index); // dung ham editTodo o tren de luu lai todo voi text moi o index cu
    closeEditPopup();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo} // truyen ham completeTodo vao TodoList
          openEditPopup={openEditPopup} // truyen ham  popup vao TodoList
        />
      </div>

      {/* Popup Edit */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl mb-4">Edit Todo</h2>
            <input
              type="text"
              value={editingTodo?.text}
              onChange={(e) => setEditingTodo({ ...editingTodo, text: e.target.value })}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button onClick={saveEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={closeEditPopup} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
