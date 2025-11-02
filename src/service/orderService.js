import FirebaseService from "./firebaseService"

class OrderService {
  constructor() {
    this.basePath = "tutorSessions"
  }

  async createOrder(orderData) {
    try {
      const orderId = await FirebaseService.create(this.basePath, orderData)
      return orderId
    } catch (error) {
      console.error("❌ Error creating order:", error)
      throw error
    }
  }

  async getOrderById(orderId) {
    try {
      return await FirebaseService.read(`${this.basePath}/${orderId}`)
    } catch (error) {
      console.error("❌ Error getting order:", error)
      throw error
    }
  }

  async getAllOrders() {
    try {
      return await FirebaseService.readAll(this.basePath)
    } catch (error) {
      console.error("❌ Error getting all orders:", error)
      throw error
    }
  }

  async getOrdersByCustomer(customerId) {
    try {
      return await FirebaseService.queryByField(this.basePath, "customerId", customerId)
    } catch (error) {
      console.error("❌ Error getting orders by customer:", error)
      throw error
    }
  }

  async getOrdersByWorker(workerId) {
    try {
      return await FirebaseService.queryByField(this.basePath, "workerId", workerId)
    } catch (error) {
      console.error("❌ Error getting orders by worker:", error)
      throw error
    }
  }

  async getOrdersByStatus(status) {
    try {
      return await FirebaseService.queryByField(this.basePath, "status", status)
    } catch (error) {
      console.error("❌ Error getting orders by status:", error)
      throw error
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      await FirebaseService.update(`${this.basePath}/${orderId}`, orderData)
      return true
    } catch (error) {
      console.error("❌ Error updating order:", error)
      throw error
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      await FirebaseService.update(`${this.basePath}/${orderId}`, { status })
      return true
    } catch (error) {
      console.error("❌ Error updating order status:", error)
      throw error
    }
  }

  async deleteOrder(orderId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${orderId}`)
      return true
    } catch (error) {
      console.error("❌ Error deleting order:", error)
      throw error
    }
  }

  // 👇 Real-time listener for all orders
  listenToOrders(callback) {
    return FirebaseService.listen(this.basePath, (dataArray) => {
      callback(Array.isArray(dataArray) ? dataArray : []);
    });
  }

  // 👇 Real-time listener for a specific worker's order
  listenToWorkerOrders(workerId, callback) {
    return FirebaseService.listen(this.basePath, (data) => {
      
      
      if (!data) {
        callback([]);
        return;
      }
      const order = Object.entries(data).map(([id, item]) => ({
        id,
        ...item,

      }));
      
      const filtered = order.filter((item) => item.workerId === workerId);
      callback(filtered);
    });
  }
  // ✅ Thêm alias này để fix lỗi listenToTutorOrders undefined
  listenToTutorOrders(tutorId, callback) {
    return this.listenToWorkerOrders(tutorId, callback);
  }
}

export default new OrderService()