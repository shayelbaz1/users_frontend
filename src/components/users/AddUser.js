import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserService from "../../services/UserService.js";

const AddUser = ({setIsAddUser,users,setHomeUsers}) => {
  let history = useHistory();
  const [user, setUser] = useState({
    image: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
    fname: "Roni",
    lname: "Bonim",
    phone: "050 9998376",
    address:{
      city: "Tel Aviv",
      street: "Rotchild",
      number: "22"
    },
    company: " Technology",
    roll: "",
    start_date: new Date(),
    email:"shay01@gmail.com",
    password:"1234"
  });

  const { fname, lname, phone, address ,roll, email,password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:3000/api/user", user);
    await UserService.addUser(user);
    setIsAddUser(false)
    history.push("/");
  };

  return (
    <div className="add-user container">
      <div className="mx-auto shadow p-5">
        <h2 className="mb-4">Add Employee</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="First Name"
              name="fname"
              value={fname}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Last Name"
              name="lname"
              value={lname}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="City"
              name="city"
              value={address.city}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Street"
              name="street"
              value={address.street}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Street Number"
              name="number"
              value={address.number}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <select
              id="formsel"
              className="form-control form-control-lg"
              name="roll"
              onChange={(e) => onInputChange(e)}
              value={roll}
            >
              <option value="" disabled defaultValue>
                Roll
              </option>
              <option value="HR">HR</option>
              <option value="FS">FS</option>
              <option value="CEO">CEO</option>
            </select>
          </div>

          <button className="btn btn-primary btn-block">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
