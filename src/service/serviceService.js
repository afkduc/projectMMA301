import FirebaseService from "./firebaseService"

class ServiceService {
  constructor() {
    this.basePath = 'services';
  }

  async createService(serviceData) {
    try {
      const serviceId = await FirebaseService.create(
        this.basePath,
        serviceData
      );
      return serviceId;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }

  async getServiceById(serviceId) {
    try {
      const service = await FirebaseService.read(
        `${this.basePath}/${serviceId}`
      );
      return service;
    } catch (error) {
      console.error('Error getting service:', error);
      throw error;
    }
  }

  async getAllServices() {
    try {
      const services = await FirebaseService.readAll(this.basePath);
      return services;
    } catch (error) {
      console.error('Error getting all services:', error);
      throw error;
    }
  }

  async getActiveServices() {
    try {
      const services = await FirebaseService.queryByField(
        this.basePath,
        'status',
        'active'
      );
      return services;
    } catch (error) {
      console.error('Error getting active services:', error);
      throw error;
    }
  }

  async updateService(serviceKey, serviceData) {
    try {
      await FirebaseService.update(
        `${this.basePath}/${serviceKey}`,
        serviceData
      );
      return true;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }

  // ✅ Đã sửa: tìm theo service.id bên trong thay vì key bên ngoài
  async updateServiceStatus(serviceId, newStatus) {
    try {
      const path = `${this.basePath}/${serviceId}`;
      await FirebaseService.update(path, { status: newStatus });
      return true;
    } catch (error) {
      console.error('❌ Error updating service status:', error);
      throw error;
    }
  }

  async deleteService(serviceKey) {
    try {
      await FirebaseService.delete(`${this.basePath}/${serviceKey}`);
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }

  // Real-time listener for services
  listenToServices(callback) {
    return FirebaseService.listen(this.basePath, (dataArray) => {
      const safeArray = Array.isArray(dataArray) ? dataArray : [];
      callback(safeArray);
    });
  }
}

export default new ServiceService();
