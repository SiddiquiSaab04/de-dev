// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:3000/user/login', formData);
//       localStorage.setItem('token', res.data.token);
//       alert('Login successful');
//       navigate('/home'); 
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-3"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded mb-4"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/user/login', formData);

      const token = res.data.data; // your token is returned in "data"
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      alert('Login successful');

      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
