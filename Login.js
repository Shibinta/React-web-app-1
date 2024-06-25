import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      username: username,
      password: password
    };

    axios.post('http://localhost:5000/api/login', data)
      .then(response => {
        if (response.data.message === 'Login successful') {
          alert('Login successful');
          navigate('/Home'); // Navigate to home page
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('Invalid username or password');
      });
  };

  return (
    <div className="login-background">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
          <Card style={{ width: 800, height: 500, overflow: 'hidden', boxShadow: '0 10px 18px rgba(0, 0, 0, 0.1)' }}>
            <Row style={{ height: '100%' }}>
              <Col span={9}>
                <img 
                  src="https://cdn.dribbble.com/users/2026891/screenshots/5591175/media/9cdd0b4585a876eb641dd3211207ed6b.png" 
                  alt="Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Col>
              <Col span={15} style={{ padding: '70px' }}>
                <Form
                  name="login"
                  initialValues={{ remember: true }}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    style={{ marginBottom: '50px' }}
                  >
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    style={{ marginBottom: '50px' }}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      block 
                      style={{ width: '70px', display: 'block', margin: '0 auto', marginBottom: '50px' }}
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <p style={{ textAlign: 'center' }}>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;




/*
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import './Login.css';

const { TextArea } = Input;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Fetch all users from the database
    axios.get('http://localhost:3001/users')
      .then(response => {
        const users = response.data;

        // Check if there is a user with matching username and password
        const user = users.find(u => u.username === values.username && u.password === values.password);

        if (user) {
          alert('Login successful');
          navigate('/Home'); // Navigate to home page
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  };

  return (
    <div className="login-background">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
        
        <Card style={{ width: 800, height: 500,overflow:'hidden', boxShadow: '0 10px 18px rgba(0, 0, 0, 0.1)' }}>
            <Row style={{ height: '100%' }}>
              <Col span={9}>
                <img 
                  src="https://cdn.dribbble.com/users/2026891/screenshots/5591175/media/9cdd0b4585a876eb641dd3211207ed6b.png" 
                  alt="Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Col>
              <Col span={15} style={{ padding: '70px' }}>
                <Form
                  name="login"
                  initialValues={{ remember: true }}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    style={{ marginBottom: '50px' }}
                  >
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    style={{ marginBottom: '50px' }}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      block 
                      style={{ width: '70px', display: 'block', margin: '0 auto', marginBottom: '50px' }}
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <p style={{ textAlign: 'center' }}>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
*/