
/* ===== LẤY CÁC PHẦN TỬ HTML ===== */
const profileModal = document.getElementById("profileModal");
const passwordModal = document.getElementById("passwordModal");
const notificationModal = document.getElementById("notificationModal");
const logoutModal = document.getElementById("logoutModal");

const toast = document.getElementById("toast");

/* ===== HIỂN THỊ THÔNG BÁO ===== */
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

/* ===== MỞ VÀ ĐÓNG CỬA SỔ ===== */
function openModal(modal) {
    modal.classList.add("show");
}

function closeModal(modal) {
    modal.classList.remove("show");
}

/* Nút mở cửa sổ */
document.getElementById("editProfile").addEventListener("click", function () {
    openModal(profileModal);
});

document.getElementById("changePassword").addEventListener("click", function () {
    openModal(passwordModal);
});

document.getElementById("notificationSettings").addEventListener("click", function () {
    openModal(notificationModal);
});

/* Các nút đóng cửa sổ */
document.querySelectorAll("[data-close]").forEach(function (button) {
    button.addEventListener("click", function () {
        const modal = document.getElementById(button.dataset.close);
        closeModal(modal);
    });
});

/* Bấm ra ngoài để đóng cửa sổ */
document.querySelectorAll(".modal").forEach(function (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

/* Nhấn Escape để đóng các cửa sổ */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(function (modal) {
            closeModal(modal);
        });
    }
});

/* ===== CHỈNH SỬA THÔNG TIN CÁ NHÂN ===== */
const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();
    const department = document.getElementById("departmentInput").value.trim();

    if (!name || !email || !phone || !department) {
        showToast("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Cập nhật thông tin trên giao diện
    document.getElementById("displayName").textContent = name;
    document.getElementById("displayEmail").textContent = email;
    document.getElementById("accountName").textContent = email;
    document.getElementById("displayPhone").textContent = phone;
    document.getElementById("displayDepartment").textContent = department;

    // Cập nhật chữ cái đại diện
    document.getElementById("avatar").textContent =
        name.charAt(0).toUpperCase();

    closeModal(profileModal);
    showToast("Đã cập nhật thông tin trên giao diện!");
});

/* ===== ĐỔI MẬT KHẨU ===== */
document.getElementById("passwordForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword.length < 8) {
        showToast("Mật khẩu mới phải có ít nhất 8 ký tự!");
        return;
    }

    if (newPassword === oldPassword) {
        showToast("Mật khẩu mới phải khác mật khẩu hiện tại!");
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast("Mật khẩu xác nhận không khớp!");
        return;
    }

    /*
       Đây chỉ là giao diện minh họa.
       Chưa có máy chủ để xác thực mật khẩu hiện tại
       hoặc lưu mật khẩu mới.
    */
    closeModal(passwordModal);
    document.getElementById("passwordForm").reset();

    showToast("Đã kiểm tra thông tin. Chức năng đổi mật khẩu thực tế cần máy chủ.");
});

/* ===== CÀI ĐẶT THÔNG BÁO ===== */
document.getElementById("saveNotifications").addEventListener("click", function () {
    const emailEnabled =
        document.getElementById("emailNotification").checked;

    const requestEnabled =
        document.getElementById("requestNotification").checked;

    // Lưu lựa chọn minh họa trong trình duyệt
    try {
        localStorage.setItem("emailNotification", emailEnabled);
        localStorage.setItem("requestNotification", requestEnabled);
    } catch (error) {
        // Vẫn hoạt động nếu trình duyệt không cho phép lưu
    }

    closeModal(notificationModal);
    showToast("Đã lưu cài đặt thông báo trên trình duyệt!");
});

/* Khôi phục lựa chọn thông báo đã lưu */
try {
    const savedEmail = localStorage.getItem("emailNotification");
    const savedRequest = localStorage.getItem("requestNotification");

    if (savedEmail !== null) {
        document.getElementById("emailNotification").checked =
            savedEmail === "true";
    }

    if (savedRequest !== null) {
        document.getElementById("requestNotification").checked =
            savedRequest === "true";
    }
} catch (error) {
    // Sử dụng các giá trị mặc định nếu không truy cập được bộ nhớ
}

/* ===== ĐĂNG XUẤT ===== */
document.getElementById("logoutButton").addEventListener("click", function () {
    openModal(logoutModal);
});

document.getElementById("logoutMenu").addEventListener("click", function () {
    openModal(logoutModal);
});

document.getElementById("confirmLogout").addEventListener("click", function () {
    closeModal(logoutModal);

    /*
       Chưa có hệ thống đăng nhập thực tế.
       Nút này chỉ minh họa thao tác đăng xuất.
    */
    showToast("Đây là giao diện minh họa, chưa kết nối đăng nhập thực tế.");
});
