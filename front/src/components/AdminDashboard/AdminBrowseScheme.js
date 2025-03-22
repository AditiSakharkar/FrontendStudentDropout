import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AdminBrowse.css';
import { getparticular_schemenames } from '../../redux/slices/authslice';

const AdminBrowseScheme = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { schemesnames } = useSelector((state) => state.auth);

  const handleApply = async (schemeId) => {
    await dispatch(getparticular_schemenames(schemeId)).unwrap();
    navigate(`/SchemeDetails/${schemeId}`);
  };

  return (
    <div className="browse-container">
      <h2>Browse Schemes</h2>
      <input
        type="text"
        placeholder="Search schemes..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="scheme-table">
        <thead>
          <tr>
            <th>Scheme Id</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schemesnames?.length > 0 ? (
            schemesnames
              .filter(scheme => scheme.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .reverse()
              .map((scheme) => (
                <tr key={scheme._id}>
                  <td>{scheme._id}</td>
                  <td>{scheme.title}</td>
                  <td>
                    <button className="apply-btn" onClick={() => handleApply(scheme._id)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="3">No schemes available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBrowseScheme;