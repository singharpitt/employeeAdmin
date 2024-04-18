import React from 'react';
import { Link } from 'react-router-dom';

const Unauthenticated = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h1 className="card-title mb-4">Unauthenticated ❌</h1>
              <p className="card-text">Please <Link to='/login' className="text-primary">Login</Link> to access this page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthenticated;
