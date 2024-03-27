import { Pagination } from 'antd';
import React, { useState } from 'react';


async function MyComponent() {

    const res = await fetch('https://jsonplaceholder.typicode.com/users'); 
    const data = await res.json();
    const [inputData, setInputData] = useState('');

    console.log()

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    }

    const handleSearch = () => {
        const foundUser = data.find(user => user.name === inputData);
        if (foundUser) {
           alert('yes')
        }
         else {
            alert('User not found');
        }
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
                            <input className="form-control me-2" onChange={handleInputChange} value={inputData} type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
                        </form>
                    </div>
                </div>
            </nav>

    

            <div className="container mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address.city</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td>{data.address.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination defaultCurrent={1} total={data.length} pageSize={1} />

        </>
    );
};

export default MyComponent;
