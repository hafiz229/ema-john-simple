import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useAuth from "../../hooks/useAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); // get current user
  // send unauthorize users to the login page
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          history.push("/login");
        }
      })
      .then((data) => setOrders(data));
  }, []);
  return (
    <div>
      <h2>You have placed: {orders.length} Orders</h2>
      <h2>{user.email}</h2>
    </div>
  );
};

export default Orders;
