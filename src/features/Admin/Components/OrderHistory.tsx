import { CloseButton } from "../../../global/ui/closeButton";
import "./AllOrders.scss";
import type { Order } from "../../../types/orders";
import { useState, useEffect } from "react";
import { getOrders } from "../../../api/orders";
import { LoadingIndicator } from "../../../global/ui/LoadingIndicator";

type AllOrdersProps = {
  onCloseButton: () => void;
};

function AllOrders({ onCloseButton }: AllOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadInitialOrders() {
      try {
        const data = await getOrders();

        if (!ignore) {
          setOrders(data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);

        if (!ignore) {
          setError("Failed to load orders. Please try again later.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInitialOrders();

    return () => {
      ignore = true;
    };
  }, []);

  async function refreshOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <div className="card-header">
        <h3>All Orders</h3>
        <CloseButton onCloseButton={onCloseButton} />
      </div>

      <div>
        <button className="refresh-btn" onClick={refreshOrders}>
          Refresh
        </button>

        {orders.length === 0 ? (
          <>
            <h3>No recent orders</h3>
          </>
        ) : (
          <table className="table-user-list">
            <thead>
              <tr>
                <th>Order number</th>
                <th>Customer</th>
                <th>Table</th>
                <th>Type</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id ?? order.orderNumber}>
                  <td>{order.orderNumber}</td>
                  <td>{order.customerName}</td>
                  <td>{order.tableNumber}</td>
                  <td>{order.type}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.createdAt?.toDate().toLocaleString("en-AU", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AllOrders;
