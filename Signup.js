import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Input, Button, Select } from 'antd';
import './Signup.css';

const { Option } = Select;

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const newUser = {
      username: values.username,
      password: values.password,
      phone: values.phone,
      source: values.source
    };

    axios.post('http://localhost:5000/api/signup', newUser)
      .then(response => {
        alert('Signup successful');
        navigate('/home');
      })
      .catch(error => {
        console.error('Error signing up:', error);
        alert('Error signing up. Please try again.');
      });
  };

  const handleSourceChange = (value) => {
    setSource(value);
  };

  return (
    <div className='signup-background'>
      <Card className="signup-card">
        <h2>Signup Page</h2>
        <Form
          name="signup"
          initialValues={{ source: 'Our customers' }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="How did you hear about us?"
            name="source"
            style={{ marginBottom: '70px' }}
          >
            <Select
              onChange={handleSourceChange}
              placeholder="Select how you heard about us"
            >
              <Option value="Our customers">Our customers</Option>
              <Option value="Social Media">Social Media</Option>
              <Option value="Google">Google</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-button" style={{ width: '70px', display: 'block', margin: '0 auto', marginBottom: '50px', textAlign: "center" }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;



/*import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Input, Button, Select } from 'antd';
import './Signup.css';

const { Option } = Select;

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState(''); // Default source
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Create a new user object
    const newUser = {
      username: values.username,
      password: values.password,
      phone: values.phone,
      source: values.source
    };

    // Send POST request to add user to db.json
    axios.post('http://localhost:3001/users', newUser)
      .then(response => {
        alert('Signup successful');
        navigate('/Home'); // Navigate to home page after signup
      })
      .catch(error => {
        console.error('Error signing up:', error);
        alert('Error signing up. Please try again.');
      });
  };

  const handleSourceChange = (value) => {
    setSource(value);
  };

  return (
    <div className='signup-background'>
      <Card className="signup-card">
        <h2>Signup Page</h2>
        <Form
          name="signup"
          initialValues={{ source: 'Our customers' }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
            
          >
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="How did you hear about us?"
            name="source"
            
            style={{ marginBottom: '70px' }}
            
          >
            <Select
              onChange={handleSourceChange}
              placeholder="Select how you heard about us"
            >
              <Option value="Our customers">Our customers</Option>
              <Option value="Social Media">Social Media</Option>
              <Option value="Google">Google</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-button" style={{ width: '70px', display: 'block', margin: '0 auto', marginBottom: '50px', textAlign: "center" }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
*/
