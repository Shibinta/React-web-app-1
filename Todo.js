import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, List, Modal } from 'antd';

const Todo = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTodos = () => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        alert('Error fetching todos');
      });
  };

  const addTask = () => {
    if (task.trim()) {
      axios.post('http://localhost:5000/api/todo', { task })
        .then(response => {
          alert('Task added successfully');
          setTask('');
          fetchTodos();
        })
        .catch(error => {
          console.error('Error adding task:', error);
          alert('Error adding task');
        });
    } else {
      alert('Task cannot be empty');
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/todo/${id}`)
      .then(response => {
        alert('Task deleted successfully');
        fetchTodos();
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        alert('Error deleting task');
      });
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = () => {
    if (editingTask && editingTask.task.trim()) {
      axios.put(`http://localhost:5000/api/todo/${editingTask._id}`, { task: editingTask.task })
        .then(response => {
          alert('Task updated successfully');
          setEditingTask(null);
          fetchTodos();
        })
        .catch(error => {
          console.error('Error updating task:', error);
          alert('Error updating task');
        });
    } else {
      alert('Task cannot be empty');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List</h1>
      <Input.TextArea
        rows={4}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task here"
      />
      <Button type="primary" onClick={addTask} style={{ margin: '10px' }}>Add</Button>
      <Button type="default" onClick={fetchTodos} style={{ margin: '10px' }}>Show All</Button>
      <List
        bordered
        dataSource={todos}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => editTask(item)}>Edit</Button>,
              <Button type="link" onClick={() => deleteTask(item._id)}>Delete</Button>
            ]}
          >
            {item.task}
          </List.Item>
        )}
        style={{ marginTop: '20px' }}
      />

      <Modal
        title="Edit Task"
        visible={editingTask !== null}
        onCancel={() => setEditingTask(null)}
        onOk={updateTask}
      >
        <Input
          value={editingTask?.task || ''}
          onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
          placeholder="Enter your task here"
        />
      </Modal>
    </div>
  );
};

export default Todo;
