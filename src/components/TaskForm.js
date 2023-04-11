import React from 'react';

const TaskForm = ({ task, editing, onSubmit, onChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Task name"
        value={task.name}
        onChange={(e) => onChange({ ...task, name: e.target.value })}
      />
      <label>
        Completed:
        <input
          type="checkbox"
          name="completed"
          checked={task.completed}
          onChange={(e) => onChange({ ...task, completed: e.target.checked })}
        />
      </label>
      <button type="submit">{editing ? 'Update' : 'Create'} Task</button>
    </form>
  );
};

export default TaskForm;
