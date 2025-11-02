import FirebaseService from "./firebaseService";

class PaymentService {
  constructor() {
    this.basePath = "payments";
  }

  async createPayment(paymentData) {
    try {
      const paymentId = await FirebaseService.create(
        this.basePath,
        paymentData
      );
      return paymentId;
    } catch (error) {
      console.error("❌ Error creating payment:", error);
      throw error;
    }
  }

  async getPaymentById(paymentId) {
    try {
      const payment = await FirebaseService.read(
        `${this.basePath}/${paymentId}`
      );
      return payment;
    } catch (error) {
      console.error("❌ Error getting payment by ID:", error);
      throw error;
    }
  }

  async getAllPayments() {
    try {
      const payments = await FirebaseService.readAll(this.basePath);
      return payments;
    } catch (error) {
      console.error("❌ Error getting all payments:", error);
      throw error;
    }
  }

  async getPaymentsByUserId(userId) {
    try {
      const snapshot = await FirebaseService.queryByField(
        this.basePath,
        "userId",
        userId
      );
      const data = snapshot.val();

      const paymentList = data
        ? Object.entries(data).map(([id, payment]) => ({ id, ...payment }))
        : [];

      return paymentList;
    } catch (error) {
      console.error("❌ Error getting payments by userId:", error);
      throw error;
    }
  }

  async updatePayment(paymentId, paymentData) {
    try {
      const pathToUpdate = `${this.basePath}/${paymentId}`;
      await FirebaseService.update(pathToUpdate, paymentData);
      return true;
    } catch (error) {
      console.error("❌ Error updating payment:", error);
      throw error;
    }
  }

  async setDefaultPayment(userId, paymentId) {
    const allPayments = await FirebaseService.readAll("payments");
    const updates = {};

    Object.entries(allPayments).forEach(([key, item]) => {
      if (item.userId === userId) {
        updates[`${item.id}/isDefault`] = item.id === paymentId;
      }
    });

    await FirebaseService.update("payments", updates);
  }

  async deletePayment(paymentId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${paymentId}`);
      return true;
    } catch (error) {
      console.error("❌ Error deleting payment:", error);
      throw error;
    }
  }

  listenToPayments(callback) {
    return FirebaseService.listen(this.basePath, (paymentsObj) => {
      const payments = paymentsObj
        ? Object.entries(paymentsObj).map(([id, item]) => ({ id, ...item }))
        : [];
      callback(payments);
    });
  }

  listenToPaymentsByUserId(userId, callback) {
    return FirebaseService.listen(this.basePath, (paymentsObj) => {
      if (!paymentsObj) {
        callback([]);
        return;
      }

      const payments = Object.entries(paymentsObj).map(([id, item]) => ({
        id,
        ...item,
      }));
      const filtered = payments.filter((item) => item.userId === userId);
      callback(filtered);
    });
  }
}

export default new PaymentService();
