import React, { useContext } from 'react';
import { DataContext } from '@/contexts/post';

const OrderDetails = ({ orderId }) => {
  const { order } = useContext(DataContext);

  // Filter the orders based on the passed orderId
  const filteredOrder = order?.filter((item) => item.id === orderId);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }); // Format as HH:mm
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {orderId}</p>

      {/* Display the filtered order details */}
      {filteredOrder && filteredOrder.length > 0 ? (
        filteredOrder.map((item) => (
          <div key={item.id}>
            {/* Display the order details */}
            <p><strong>Order Created At:</strong> {formatDate(item.createdAt)}</p>
            <p><strong>Order Updated At:</strong> {formatDate(item.updatedAt)}</p>
            {item.post && (
              <>
                {item.post.title && <p><strong>Post Title:</strong> {item.post.title}</p>}
                {item.post.status && <p><strong>Post Status:</strong> {item.post.status}</p>}
                {item.post.address && <p><strong>Post Address:</strong> {item.post.address}</p>}
              </>
            )}
            {/* Add more details as needed */}
          </div>
        ))
      ) : (
        <p>No order found with this ID.</p>
      )}

      {/* Add a button to close the order details */}
    </div>
  );
};

export default OrderDetails;
