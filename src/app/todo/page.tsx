"use client";
import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { ModalDanger, ModalDefault } from "../components/Modal";
import { useRouter } from "next/navigation";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (!storedName) {
      router.push('/login');
    } else {
      setUsername(storedName);
    }
  }, [router]);

  useEffect(() => {
    const storedTodos = localStorage.getItem(`todos_${username}`);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [username]);

  useEffect(() => {
    saveTodosInStorage();
  }, [todos]);

  const saveTodosInStorage = () => {
    localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
  };

  const toggleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = () => {
    if (todoToDelete !== null) {
      setTodos(todos.filter((todo) => todo.id !== todoToDelete));
      setTodoToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setTodoToDelete(id);
    setShowDeleteModal(true);
  };

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
    setShowModal(false);
    setNewTodo("");
  };

  return (
    <div className="todo">
      {todos.length !== 0 && (  
          <div className="todo-list-container">
          {todos.filter((todo) => !todo.done).length !== 0 && (
            <div>
              <div className="todo-list-header">
                  <p className="todo-list-header-title">Suas tarefas de hoje</p>
              </div>
              <div className="list-itens-container">
                {todos
                .filter((todo) => !todo.done)
                .map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleDone={toggleDone}
                    onDelete={() => openDeleteModal(todo.id)}
                  />
                ))}
              </div>
            </div>
          )}
          {todos.filter((todo) => todo.done).length !== 0 && (
            <div>
              <div className="todo-list-header">
                <p className="todo-list-header-title">Tarefas finalizadas</p>
              </div>
              <div className="list-itens-container">
                {todos
                  .filter((todo) => todo.done)
                  .map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggleDone={toggleDone}
                      onDelete={() => openDeleteModal(todo.id)}
                    />
                ))}
              </div>
            </div>
          )}  
        </div>
      )}
    <button className="add-button" onClick={() => setShowModal(true)}>
       Adicionar nova tarefa
    </button>
    {showModal && (
      <ModalDefault onClose={() => setShowModal(false)} modalAction={addTodo} modalActionText="Adicionar" modalTitle="Nova Tarefa">
        <div className="input-group">
          <label className="input-label" htmlFor="text">
            Título
          </label>
          <input
            id="text"
            placeholder="Digite"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
      </ModalDefault>
    )}
    {showDeleteModal && (
        <ModalDanger
          onClose={() => setShowDeleteModal(false)}
          modalAction={deleteTodo}
          modalActionText="Deletar"
          modalTitle="Deletar Tarefa"
        >
          <p>Tem certeza que você deseja deletar essa tarefa?</p>
        </ModalDanger>
      )}
  </div>
  );
};

export default TodoList;