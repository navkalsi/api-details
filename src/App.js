import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [value, inputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(true);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page=1) => {    
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5&_page='+ page);
    const data = await res.json();
    setUserData(data);
    console.log(data);

  };


  const handleSearch = () => {
    if (value === '') {
      return (
        <>
          {userData.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td><button onClick={() => handleDetails(user.name, user.username, user.email)}>Detail</button></td>
            </tr>
          ))}
        </>
      );
    }
    else {
      const matchUser = userData.find(user => (user.name === value) || user.username === value);
      if (matchUser) {
        return (
          <tr>
            <th scope="row">{matchUser.id}</th>
            <td>{matchUser.name}</td>
            <td>{matchUser.username}</td>
            <td>{matchUser.email}</td>
            <td>{matchUser.address.city}</td>
            <td><button onClick={() => handleDetails(matchUser.name, matchUser.username, matchUser.email)}>Detail</button></td>

          </tr>
        );
      } else {
        return (
          <tr>
            <th colSpan='6' className='text-center'>No data</th>
          </tr>
        );
      }
    }
  };


  const handleDetails = (name, username, email) => {
    setSelectedUser({ name, username, email });
    let modal1 = document.getElementById('modal');
    modal1.style.display = 'block';
  };
  const handleClose = () => {
    setSelectedUser(false)
    let modal1 = document.getElementById('modal');
    modal1.style.display = 'none';
  }

  const  onShowSizeChange = (current, pageSize) => {
   fetchData(current);
  };

  const handleChangeValue = (e) => {
    inputValue(e.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">USER</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" onChange={handleChangeValue} type="search" value={value} placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" onClick={handleSearch} type="button" >Search</button>
            </form>
          </div>
        </div>
      </nav>
       
     <div style={{display: 'flex' , justifyContent: 'center'}} >
      { (
        <div className='clickusers' id="modal" style={{display: 'none'}}>
          <div className="close-btn"  onClick={handleClose}>
          <button className='btn btn-danger'>Close</button>
          </div>
          <p>Name:    {selectedUser.name}</p>
          <p>Username:    {selectedUser.username}</p>
          <p>Email:    {selectedUser.email}</p>
        </div>
      )}
      </div>

      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Address.city</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {handleSearch()}
          </tbody>
        </table>
      </div>
    
      <Pagination defaultCurrent={1} pageSize={5} total={10} onChange={onShowSizeChange} key="pagination" />
    </>
  );
};

export default App;
