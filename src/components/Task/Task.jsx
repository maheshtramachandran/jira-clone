import React, { useState, useRef } from "react";
import "./Task.scss";

export default function Task(props) {
  const [title, setTitle] = useState(props.title);
  const [editActive, setEditActive] = useState(false);
  const inputRef = useRef();

  const handleEdit = () => {
    setEditActive(true);
    inputRef.current.focus();
  };

  const handleUpdate = () => {
    setEditActive(false);
    props.onUpdate(title);
    inputRef.current.blur();
  };

  return (
    <div
      className={`task ${editActive ? "task--active" : ""}`}
      draggable
      onDragStart={(e) => props.onDrag(e)}
    >
      <input
        type="text"
        className={`task__title ${editActive ? "task__title--active" : ""}`}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onBlur={handleUpdate}
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleUpdate();
          }
        }}
      />
      {!editActive && (
        <div className="task__actions">
          <button className="task__action" onClick={handleEdit}>
            Edit
          </button>
          <button
            className="task__action task__delete"
            onClick={props.onDelete}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
