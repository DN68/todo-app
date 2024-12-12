"use client";

import { useState, useReducer, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useRouter, useSearchParams } from "next/navigation"; // Sử dụng các hook của Next.js

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

type Action =
  | { type: "add"; payload: { todo: Todo } }
  | { type: "delete"; payload: { id: number } }
  | { type: "complete"; payload: { id: number } }
  | { type: "edit"; payload: { todo: string; id: number } }
  | { type: "set"; payload: { todos: Todo[] } };

//Reducer để xử lý các action và cập nhật state
const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "set":
      return action.payload.todos;
    case "add":
      return [...state, action.payload.todo];
    case "delete":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "complete":
      return state.map((todo, id) =>
        id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "edit":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
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
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const todosPerPage = 5; // Số task trên mỗi trang
  //GET todo
  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "set", payload: { todos: data.todos } });
      });
  }, []);

  // add todo
  const addTodo = (todo: string) => {
    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo, completed: false, userId: 1 }),
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "add", payload: { todo } });
      });
  };

  // delete todo
  const deleteTodo = (id: number) => {
    console.log(id);
    fetch(`https://dummyjson.com/todos/7`, {
      method: "DELETE",
    }).then(() => {
      dispatch({ type: "delete", payload: { id } });
      // Nếu xóa task và không còn task nào ở trang hiện tại,
      // tự động chuyển về trang trước đó
      const remainingTodos = todos.filter((todo) => todo.id !== id);
      if (
        currentPage > 1 &&
        remainingTodos.slice(indexOfFirstTodo, indexOfLastTodo).length === 0
      ) {
        paginate(currentPage - 1);
      }
    });
  };
  //complete todo
  const completeTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id + 1);
    if (!todo) return;
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({ type: "complete", payload: { id } });
      });
  };

  //Edit todo
  const editTodo = (id: number, todo: string) => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({ type: "edit", payload: { id, todo } });
      });
  };

  //Open popup with info of todo
  const openEditPopup = (todo: Todo) => {
    console.log(todo);
    setEditingTodo({ id: todo.id, todo: todo.todo }); // set cai pop up edit co noi dung la noi dung todo o nut edit
    setIsEditPopupOpen(true); // set trang thai pop up thanh true de hien thi pop up
  };
  //close popup
  const closeEditPopup = () => {
    setIsEditPopupOpen(false); // set trang thai pop up thanh false de dong pop up
    setEditingTodo(null); // set text o popup edit quay lai trong
  };

  //Save edit
  const saveEdit = () => {
    // console.log(editingTodo);
    if (editingTodo) {
      editTodo(editingTodo.id, editingTodo.todo); // dung ham editTodo o tren de luu lai todo voi text moi o id cu
      closeEditPopup();
    }
  };

  // Tính toán index cho task trong trang hiện tại
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Hàm chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div>
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Todo App</h1>
          <AddTodo addTodo={addTodo} />
          <TodoList
            todos={currentTodos}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo} // truyen ham completeTodo vao TodoList
            openEditPopup={openEditPopup} // truyen ham  popup vao TodoList
          />
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(todos.length / todosPerPage) }, // Tổng số trang
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Popup Edit */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl mb-4">Edit Todo</h2>
            <input
              type="text"
              value={editingTodo?.todo}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, todo: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={saveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={closeEditPopup}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
