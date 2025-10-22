import FirebaseService from "@service/firebaseService"

class UserService {
  constructor() {
    this.basePath = 'users';
  }

  async getUserByPhone(phone) {
    try {
      const users = await FirebaseService.queryByField(
        this.basePath,
        'phone',
        phone
      );
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error getting user by phone:', error);
      return null;
    }
  }

  async createUser(userData) {
    try {
      const userId = await FirebaseService.create(this.basePath, userData);
      return userId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await FirebaseService.read(`${this.basePath}/${userId}`);
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await FirebaseService.readAll(this.basePath);
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }

  async getUsersByRole(role) {
    try {
      const users = await FirebaseService.queryByField(
        this.basePath,
        'role',
        role
      );
      return users;
    } catch (error) {
      console.error('Error getting users by role:', error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      await FirebaseService.update(`${this.basePath}/${userId}`, userData);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${userId}`);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async authenticateUser(phone, password) {
    try {
      const users = await FirebaseService.queryByField(
        this.basePath,
        'phone',
        phone
      );
      const user = users.find((u) => u.password === password);
      return user || null;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  }

  async phoneExists(phone) {
    try {
      const users = await FirebaseService.queryByField(
        this.basePath,
        'phone',
        phone
      );
      return users.length > 0;
    } catch (error) {
      console.error('Error checking if phone exists:', error);
      throw error;
    }
  }

  async emailExists(email) {
    try {
      const users = await FirebaseService.queryByField(
        this.basePath,
        'email',
        email
      );
      return users.length > 0;
    } catch (error) {
      console.error('Error checking if email exists:', error);
      throw error;
    }
  }

  // Đặt lại mật khẩu bằng số điện thoại
  async resetPasswordByPhone(phone, newPassword) {
    try {
      const users = await FirebaseService.queryByField(
        this.basePath,
        'phone',
        phone
      );
      if (!users || users.length === 0) return false;
      const user = users[0];
      await FirebaseService.update(`${this.basePath}/${user.id}`, {
        password: newPassword,
        updatedAt: Date.now(),
      });
      return true;
    } catch (error) {
      console.error('Error resetting password by phone:', error);
      return false;
    }
  }

  // Real-time listener for users
  listenToUsers(callback) {
    return FirebaseService.listen(this.basePath, (usersArray) => {
      callback(Array.isArray(usersArray) ? usersArray : []);
    });
  }
}

export default new UserService();
