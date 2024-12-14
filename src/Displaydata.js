import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Displaydata() {
  const [user, setUser] = useState({
    full: "",
    address: "",
  });

  const [count, setcount] = useState(0);

  const fetchData = async () => {
    const data = await axios.get("https://randomuser.me/api");
    // console.log(data.data.results[0])
    const obj1 = data.data.results[0];
    // console.log(obj1)
    const { name, location } = obj1;

    const newObject = {
      full: `${name.first} ${name.last}`,
      address: `${location.street.number}, 
        ${location.street.name}, ${location.city}`,
    };
    setUser(newObject);

    return;
  };

  useEffect(() => {
    fetchData();

    //Local Storage Settings
    localStorage.clear();
    //setting value
    localStorage.setItem("fullname", JSON.stringify(user.full));
    //getting value
    const localStorageValue = JSON.parse(localStorage.getItem("fullname"));
  }, [count]);

  return (
    <div className="App">
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{user.full}</h5>
          <p className="card-text">{user.address}</p>
          <button
            className="btn btn-success"
            value={count}
            onClick={() => {
              setcount(count + 1);
            }}
          >
            {" "}
            Click To Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
