import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddUser from "../users/AddUser";
import EditUser from "../users/EditUser";
import { useHistory } from "react-router-dom";
import UserService from '../../services/UserService.js'

const Home = () => {
  let history = useHistory();
  const user = useSelector((state) => state.userReducer.loggedInUser);
  const [users, setUser] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length === 0) history.push("/signin");
    loadUsers();
    // eslint-disable-next-line
  }, [isAddUser, isEditUser]);

  const loadUsers = async () => {
    // const users = await axios.get("http://localhost:3000/api/user");
    const users = await UserService.getUsers();
    setUser(users.reverse());
  };

  const deleteUser = async (_id) => {
    if (user._id === _id) {
      alert("Cannot delete logged in user.");
      return;
    }
    await UserService.remove(_id)
    // await axios.delete(`http://localhost:3000/api/user/${_id}`);
    loadUsers();
  };

  const formatDate = (d) => {
    var options = { year: "numeric", month: "short", day: "numeric" };
    let date = new Date(+d);
    return date.toLocaleDateString("en-US", options);
  };

  const renderBlur = () => {
    return (
      (isEditUser || isAddUser) && (
        <div
          className="blur"
          onClick={() => {
            setIsAddUser(false);
            setIsEditUser(false);
          }}
        ></div>
      )
    );
  };

  const renderAddUser = () => {
    return (
      isAddUser && (
        <AddUser
          setIsAddUser={setIsAddUser}
          setHomeUsers={setUser}
          users={users}
        />
      )
    );
  };

  const renderEditUser = () => {
    return (
      isEditUser && (
        <EditUser
          setIsEditUser={setIsEditUser}
          setHomeUsers={setUser}
          users={users}
        />
      )
    );
  };

  const renderHeader = () => {
    return (
      <section className="home-title flex space-between align-center">
        <h1>Managing Employees</h1>

        <button className="btn btn-primary" onClick={() => setIsAddUser(true)}>
          + Add Employee
        </button>
      </section>
    );
  };

  return (
    <div className="home-page container col-xl-10">
      {renderBlur()}
      {renderAddUser()}
      {renderEditUser()}

      <div className="py-4">
        {renderHeader()}

        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col" id="fname">
                First Name
              </th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Roll</th>
              <th scope="col">Start Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(0)
              .reverse()
              .map((user, index) => (
                <tr key={user._id}>
                  <td id="index">{index + 1}</td>
                  <td id="img">
                    <img className="profile" src={user.image} alt="user" />
                  </td>
                  <td id="fname">{user.fname}</td>
                  <td>{user.lname}</td>
                  <td id="phone">{user.phone}</td>
                  <td id="address">
                    {user.address.street} {user.address.number} ,{" "}
                    {user.address.city}
                  </td>
                  <td id="roll">{user.roll}</td>
                  <td id="date">{formatDate(user.start_date)}</td>
                  <td id="actions">
                    <div>
                      <Link
                        className="btn mr-2"
                        to={`/users/edit/${user._id}`}
                        onClick={() => setIsEditUser(true)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>

                      <div className="btn" onClick={() => deleteUser(user._id)}>
                        <i className="far fa-trash-alt"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
