import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://birthday-tracker-api.onrender.com/api/birthdays';



const App = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [formData, setFormData] = useState({ name: '', date: '', note: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async () => {
    const res = await axios.get(API_URL);
    setBirthdays(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ name: '', date: '', note: '' });
    setEditId(null);
    fetchBirthdays();
  };

  const handleEdit = (birthday) => {
    setFormData({ name: birthday.name, date: birthday.date.split('T')[0], note: birthday.note || '' });
    setEditId(birthday._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchBirthdays();
  };

  const calculateDaysLeft = (date) => {
    const today = new Date();
    const birthday = new Date(date);
    birthday.setFullYear(today.getFullYear());

    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = birthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🎉 Birthday Tracker</h2>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input type="text" className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" name="note" placeholder="Note (optional)" value={formData.note} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add'}</button>
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
              <td>{b.name}</td>
              <td>{new Date(b.date).toLocaleDateString()}</td>
              <td>{b.note}</td>
              <td>{calculateDaysLeft(b.date)} days</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(b)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
