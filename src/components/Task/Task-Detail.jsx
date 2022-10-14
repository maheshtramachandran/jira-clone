import React from "react";
import { useState } from "react";

export default function TaskDetail(props) {
  const [taskInfo, setTaskInfo] = useState(props.task ?? {});

  return (
    <div className="task__detail-modal">
      <div className="task__overlay"></div>
      <div className="task__modal-content">
        <h2>{props.task?.title}</h2>
        <div>
          <h4>Description</h4>
          <div>
            <textarea
              placeholder="Please enter description about the task"
              value={taskInfo?.description}
              onChange={(e) =>
                setTaskInfo({ ...taskInfo, description: e.target.value })
              }
            />
          </div>
        </div>
        <button
          className="task__modal-btn-save"
          onClick={() => props.OnModalSave(taskInfo)}
        >
          SAVE
        </button>
        <button
          className="task__modal-btn-close"
          onClick={() => props.OnModalClose(false)}
        >
          CLOSE
        </button>
        <div>
          <button className="task__modal-btn-attachment" onClick={() => {}}>
            Add Attachment
          </button>
        </div>
      </div>
    </div>
  );
}
