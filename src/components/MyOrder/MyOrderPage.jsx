import React, { useEffect, useState } from "react";

import "./MyOrderPage.css";
import Table from "../Common/Table";
import { getOrdersAPI } from "../../service/orderServices";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    getOrdersAPI()
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="align_center myorder_page">
      <Table headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading orders...</td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="4">No orders yet</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.products.map((p) => p.product.title).join(", ")}</td>
                <td>${order.total}</td>
                <td>{order.status || "Pending"}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrderPage;
