// src/components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h2>SHIKSHA SETU - Student Portal</h2>

      <Link to="/Login" state={{ role: 'admin' }}>
        <button className="home-btn">Login as admin</button>
      </Link>

      <Link to="/Login" state={{ role: 'student' }}>
        <button className="home-btn">Login as student</button>
      </Link>

      <Link to="/Register">
        <button className="home-btn">Create Account as student</button>
      </Link>
    </div>
  );
}

export default Home;














// // src/components/Home/Home.js
// import React from 'react';
// import { Link } from 'react-router-dom';  
// import './Home.css';

// function Home() {
//   return (
//     <div className="home">
//       <h2>SHIKSHA SETU - Student Portal</h2>
      
//       <Link to="/LoginAdmin">
//         <button className="home-btn">Login as admin</button>
//       </Link>

//       <Link to="/Login">
//         <button className="home-btn">Login as student</button>
//       </Link>

//       <Link to="/Register">
//         <button className="home-btn">Create Account as student</button>
//       </Link>

      
//     </div>

    

//   );
// }

// export default Home;
