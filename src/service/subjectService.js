import FirebaseService from "@service/firebaseService";

class SubjectService {
    constructor() {
        this.basePath = "subjects"; // node trong Firebase
    }

    // ✅ Tạo subject mới
    async createSubject(subjectData) {
        try {
            const finalData = {
                ...subjectData,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            const subjectId = await FirebaseService.create(this.basePath, finalData);
            return subjectId;
        } catch (error) {
            console.error("Error creating subject:", error);
            throw error;
        }
    }

    // ✅ Lấy tất cả subjects
    async getAllSubjects() {
        try {
            const subjects = await FirebaseService.readAll(this.basePath);
            return subjects;
        } catch (error) {
            console.error("Error getting all subjects:", error);
            throw error;
        }
    }

    // Cập nhật trạng thái môn học
    async updateSubjectStatus(subjectId, status) {
        try {
            await this.updateSubject(subjectId, { status });
            return true;
        } catch (error) {
            console.error("Error updating subject status:", error);
            throw error;
        }
    }

    // ✅ Lấy subject theo id
    async getSubjectById(subjectId) {
        try {
            const subject = await FirebaseService.read(`${this.basePath}/${subjectId}`);
            return subject;
        } catch (error) {
            console.error("Error getting subject by id:", error);
            throw error;
        }
    }

    // ✅ Cập nhật subject
    async updateSubject(subjectId, subjectData) {
        try {
            await FirebaseService.update(`${this.basePath}/${subjectId}`, {
                ...subjectData,
                updatedAt: Date.now(),
            });
            return true;
        } catch (error) {
            console.error("Error updating subject:", error);
            throw error;
        }
    }

    // ✅ Xóa subject
    async deleteSubject(subjectId) {
        try {
            await FirebaseService.delete(`${this.basePath}/${subjectId}`);
            return true;
        } catch (error) {
            console.error("Error deleting subject:", error);
            throw error;
        }
    }

    // ✅ Lắng nghe realtime changes
    listenToSubjects(callback) {
        return FirebaseService.listen(this.basePath, (subjectsArray) => {
            callback(Array.isArray(subjectsArray) ? subjectsArray : []);
        });
    }
}

export default new SubjectService();