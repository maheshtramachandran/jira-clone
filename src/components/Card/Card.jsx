import React, { useState, useRef } from "react";
import Task from "../Task/Task";
import "./Card.scss";
import { generateID } from "../../utils";
import TaskDetail from "../Task/Task-Detail/Task-Detail";

export default function Card(props) {
  const { details } = props;
  const inputRef = useRef();
  const [title, setTitle] = useState(details.title);
  const [input, setInput] = useState("");
  const [editActive, setEditActive] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const addTask = () => {
    const inputTrimmed = input.trim();

    if (!inputTrimmed) {
      return;
    }

    const newDetails = { ...details };
    newDetails.tasks.push({ id: generateID(), title: inputTrimmed });
    setInput("");
    props.onDetailsChange(newDetails);
  };

  const deleteTask = (index) => {
    const newTasks = [...details.tasks];
    newTasks.splice(index, 1);
    props.onDetailsChange({ ...details, tasks: newTasks });
  };

  const updateTask = (index, title) => {
    const newTasks = [...details.tasks];
    newTasks[index] = { ...newTasks[index], title };
    props.onDetailsChange({ ...details, tasks: newTasks });
  };

  const updateTitle = () => {
    const titleTrimmed = title.trim();
    setTitle(titleTrimmed);
    props.onDetailsChange({
      ...details,
      title: titleTrimmed,
    });
    inputRef.current.blur();
  };

  const handleDrag = (e, currentCardIndex, taskIndex) => {
    e.dataTransfer.setData("sourceCardIndex", currentCardIndex);
    e.dataTransfer.setData("sourceTaskIndex", taskIndex);
  };

  const handleOnDetailExpand = (index) => {
    const newTasks = [...details.tasks];
    setSelectedTask({ ...newTasks[index], index: index });
    setShowDetailModal(true);
  };

  const handleOnSaveModal = (data) => {
    const newTasks = [...details.tasks];
    newTasks[data.index] = data;
    props.onDetailsChange({ ...details, tasks: newTasks });
    setSelectedTask(data);
    setShowDetailModal(false);
  };

  return (
    <>
      <div
        className="card"
        onDrop={(e) => props.onDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          className={`card__title ${editActive ? "card__title--active" : ""}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => {
            setEditActive(true);
          }}
          onBlur={() => {
            setEditActive(false);
            updateTitle();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateTitle();
            }
          }}
          placeholder={"Add Title"}
          ref={inputRef}
        ></input>
        <div className="card__tasks">
          {details.tasks.map((task, index) => (
            <Task
              key={task.id}
              title={task.title}
              onDelete={() => {
                deleteTask(index);
              }}
              onUpdate={(title) => {
                updateTask(index, title);
              }}
              onDrag={(e) => handleDrag(e, props.index, index)}
              onDetailExpand={() => handleOnDetailExpand(index)}
            ></Task>
          ))}
        </div>
        <div className="card__add-wrapper">
          <input
            className="card__add-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Add Task"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          ></input>
          <button
            className="card__add-button"
            onClick={addTask}
            disabled={!input.trim()}
          >
            +
          </button>
        </div>
        <button
          className="card__delete"
          onClick={props.onDelete}
          disabled={props.preventDelete}
        >
          Delete
        </button>
      </div>
      {showDetailModal && (
        <div className="task__detail-modal">
          <TaskDetail
            task={selectedTask}
            OnModalSave={handleOnSaveModal}
            OnModalClose={(e) => {
              setShowDetailModal(e);
            }}
          />
        </div>
      )}
    </>
  );
}
