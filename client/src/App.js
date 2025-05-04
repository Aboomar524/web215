// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Loader from './Loader';
import Login from './Login';
import Register from './Register';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem('username');

  if (!storedUser || storedUser === 'null' || storedUser === 'undefined') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Home component (the main birthday tracking app)
const Home = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', date: '', note: '' });
  const [formData, setFormData] = useState({ name: '', date: '', note: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      fetchBirthdays(storedUser);
    }
  }, []);

  const fetchBirthdays = async (username) => {
    try {
      const res = await axios.get(`${API_URL}?username=${username}`);
      setBirthdays(res.data);
    } catch (error) {
      console.error('Error fetching birthdays:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('username');
    await axios.post(API_URL, { ...formData, username: storedUser });
    setFormData({ name: '', date: '', note: '' });
    fetchBirthdays(storedUser);
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: 'Birthday added successfully.',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleEdit = (birthday) => {
    setEditingId(birthday._id);
    setEditFormData({
      name: birthday.name,
      date: birthday.date.split('T')[0],
      note: birthday.note || ''
    });
  };

  const handleUpdate = async (id) => {
    await axios.put(`${API_URL}/${id}`, editFormData);
    setEditingId(null);
    fetchBirthdays(localStorage.getItem('username'));
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Birthday updated successfully.',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleCancel = () => setEditingId(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        fetchBirthdays(localStorage.getItem('username'));
        Swal.fire('Deleted!', 'Birthday has been deleted.', 'success');
      }
    });
  };

  const calculateDaysLeft = (date) => {
    const today = new Date();
    const birthday = new Date(date);
    birthday.setFullYear(today.getFullYear());
    if (birthday < today) birthday.setFullYear(today.getFullYear() + 1);
    const diffTime = birthday - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🎉 Birthday Tracker</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="note"
            placeholder="Note (optional)"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Note</th>
            <th>Days Left</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {birthdays.map((b) => (
            <tr key={b._id}>
              {editingId === b._id ? (
                <>
                  <td>
                    <input type="text" className="form-control" name="name" value={editFormData.name} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input type="date" className="form-control" name="date" value={editFormData.date} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input type="text" className="form-control" name="note" value={editFormData.note} onChange={handleEditChange} />
                  </td>
                  <td>{calculateDaysLeft(editFormData.date)} days</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(b._id)}>Update</button>
                    <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{b.name}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>{b.note}</td>
                  <td>{calculateDaysLeft(b.date)} days</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(b)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main App component with routing
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;