import { ref, push, set, onValue } from "firebase/database";
import { db } from "../config/configFirebase";

/**
 *  Thêm 1 địa chỉ mới vào Realtime Database
 */
export const addAddress = async (data) => {
    const addressesRef = ref(db, "addresses/");
    const newAddressRef = push(addressesRef); // tạo key mới

    try {
        await set(newAddressRef, data);
        console.log(" Đã thêm địa chỉ mới:", data);
    } catch (error) {
        console.error("Lỗi khi thêm địa chỉ:", error);
    }
};

/**
 *  Lắng nghe thay đổi trong danh sách địa chỉ
 */
export const listenAddresses = () => {
    const addressesRef = ref(db, "addresses/");
    onValue(addressesRef, (snapshot) => {
        const data = snapshot.val();
        console.log("📡 Dữ liệu Realtime:", data);
    });
};
