import React from "react";
import { Todo } from "./TodoList";
import Image from "next/image";

interface TodoItemProps {
  todo: Todo;
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleDone, onDelete }) => {
  return (
    <div className={`todo-item ${todo.done ? "done" : ""}`}>
      <div className="todo-item-content">
          <Image
            className="checkbox-icon" onClick={() => onToggleDone(todo.id)}
            src={todo.done ? "/checkcheckbox.svg" : "/checkbox.svg"}
            alt="Checkbox"
            title="Checkbox"
            width={24}
            height={24}
          />
          <span className="todo-item-text">{todo.text}</span>
          <Image
          className="delete-icon" onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}
            src="/trash.svg"
            alt="Delete"
            title="Delete"
            width={24}
            height={24}
          />
      </div>
    </div>
  );
};

export default TodoItem;
