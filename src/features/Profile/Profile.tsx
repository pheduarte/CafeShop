import { CloseButton } from "../../global/ui/closeButton";
import { LoadingIndicator } from "../../global/ui/LoadingIndicator";
import "./Profile.scss";
import { useState, useEffect } from "react";
import type { Order } from "../../types/orders";
import { getOrders } from "../../api/orders";
import { useAuth } from "../../hooks/useAuth";
import { Modal } from "../../global/components/Modal";
import { useDisclosure } from "../../hooks/useDisclosure";
import { sortOrdersByNewestDate } from "../Order/helper/sortOrdersByNewestDate";
import { filterOrdersByUserId } from "../Order/helper/filterOrderByUser";

type ProfileProps = {
  onCloseButton: () => void;
};

function Profile({ onCloseButton }: ProfileProps) {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const latestOrders = useDisclosure();

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

  const filteredOrders = filterOrdersByUserId(orders, user?.id);
  const sortedOrders = sortOrdersByNewestDate(filteredOrders);

  return (
    <>
      <div className="admin-card-header">
        <h2>Profile</h2>
        <CloseButton onCloseButton={onCloseButton} />
      </div>

      <div>
        <button className="refresh-btn" onClick={refreshOrders}>
          Refresh
        </button>

        {sortedOrders.length === 0 ? (
          <>
            <h3>No recent orders</h3>
          </>
        ) : (
          <section>
            <div className="subheading">
              <h3
                onClick={
                  latestOrders.isOpen ? latestOrders.close : latestOrders.open
                }
              >
                Latest Orders
              </h3>
            </div>

            <Modal isOpen={latestOrders.isOpen} onClose={latestOrders.close}>
              <table className="table-order-list">
                <thead>
                  <tr>
                    <th>Order number</th>
                    <th>Table</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedOrders.map((order) => (
                    <tr key={order.id ?? order.orderNumber}>
                      <td>{order.orderNumber}</td>
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
            </Modal>
          </section>
        )}
      </div>
    </>
  );
}

export default Profile;
