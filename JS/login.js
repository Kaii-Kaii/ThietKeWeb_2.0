let loginWindow;
let check = false;
let tenNguoiDungHienTai = null;
let profileDiv = document.getElementById('profile');
let user_hienTai = document.getElementById('tenNguoiDungHienTai');
let ds_taiKhoan = [
    { taiKhoan: 'admin', matKhau: 'admin', hovaTen: 'Admin', email: 'admin@gmail.com', sdt: '0123456789' },
    { taiKhoan: 'vana01', matKhau: '12345678', hovaTen: 'Văn A', email: 'vana01@gmail.com', sdt: '0123456789' },
    { taiKhoan: 'thanh02', matKhau: '12345678', hovaTen: 'Thanh B', email: 'thanh02@gmail.com', sdt: '0123456789' },
];

profileDiv.style.display = 'none';

window.addEventListener('message', function (event) {
    // Kiểm tra nếu thông điệp được gửi từ cửa sổ con và có dữ liệu hợp lệ
    if (event.data && event.data.username) {
        var username = event.data.username;
        tenNguoiDungHienTai = username;
        user_hienTai.textContent = `${username}`;
        setTT();
    }
    // Kiểm tra nếu thông điệp được gửi từ cửa sổ con và có dữ liệu hợp lệ
    if (event.data && event.data.username_dk) {
        var username_dk = event.data.username_dk;
        var password_dk = event.data.password_dk;
        var hovaTen = event.data.ten;
        var email = event.data.email;
        var sdt = event.data.sdt;
        ds_taiKhoan.push({ taiKhoan: username_dk, matKhau: password_dk, hovaTen: hovaTen, email: email, sdt: sdt });
    }
});

function openLogin() {
    if (!tenNguoiDungHienTai) {
        Swal.fire({
            position: "top-middle",
            icon: "warning",
            title: "Vui lòng đăng nhập trước khi xem thông tin cá nhân",
            showConfirmButton: false,
            timer: 1000
        });
        setTimeout(() => {
            loginWindow = window.open('HTML/login.html', 'login', 'width=700,height=900');
        }, 1000);
    }
    else {
        profileDiv.style.display = 'block';
    }
}

function setTT() {
    let ten;
    let email;
    let sdt;
    let tennguoidung;
    for (let i = 0; i < ds_taiKhoan.length; i++) {
        if (ds_taiKhoan[i].taiKhoan === tenNguoiDungHienTai) {
            ten = ds_taiKhoan[i].hovaTen;
            email = ds_taiKhoan[i].email;
            sdt = ds_taiKhoan[i].sdt;
            tennguoidung = ds_taiKhoan[i].taiKhoan;
            break;
        }
    }
    document.getElementById("show-name").innerHTML = ten;
    document.getElementById("show-email").innerHTML = email;
    document.getElementById("show-sdt").innerHTML = sdt;
    document.getElementById("show-username").innerHTML = tennguoidung;
}

function DangXuat() {
    tenNguoiDungHienTai = null;
    user_hienTai.textContent = '';
    closeProfile();
}

//đóng cửa sổ thông tin khi click vào nút đăng xuất
function closeProfile() {
    profileDiv.style.display = 'none';
}

function toggleForm(formId) {
    document.getElementById('login').style.display = formId === 'login' ? 'block' : 'none';
    document.getElementById('signup').style.display = formId === 'signup' ? 'block' : 'none';
}

function checkLogin(username, password) {
    for (let i = 0; i < ds_taiKhoan.length; i++) {
        if (ds_taiKhoan[i].taiKhoan === username && ds_taiKhoan[i].matKhau === password) {
            return true;
        }
    }
    return false;
}

function handleLogin(event) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (!username || !password) {
        return;
    }
    event.preventDefault();
    check = checkLogin(username, password);
    if (check) {
        // Gửi thông tin về tên người dùng hiện tại về cửa sổ mẹ
        window.opener.postMessage({ username: username }, '*');
        LoginThanhCong();
        // Đóng cửa sổ đăng nhập sau 1.5s
        setTimeout(function () {
            window.close();
        }, 1500);
    } else {
        LoginThatBai();
    }
}

function LoginThanhCong() {
    Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500
    });
}

function LoginThatBai() {
    Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: "Tên đăng nhập hoặc mật khẩu không đúng",
        showConfirmButton: false,
        timer: 1500
    });
}

function DangXuatConfirm() {
    Swal.fire({
        title: "Bạn có chắc muốn đăng xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng xuất"
    }).then((result) => {
        if (result.isConfirmed) {
            DangXuat();
            Swal.fire({
                title: "Đăng xuất thành công",
                icon: "success"
            });
        }
    });
}

function handleSignup(event) {
    var username_dk = document.getElementById('username_signup').value;
    var password_dk = document.getElementById('password_signup').value;
    var hovaTen = document.getElementById('ten').value;
    var email = document.getElementById('email').value;
    var sdt = document.getElementById('sdt').value;
    if (!username_dk || !password_dk || !hovaTen || !email || !sdt) {
        return;
    }
    event.preventDefault();
    ds_taiKhoan.push({ taiKhoan: username_dk, matKhau: password_dk, hovaTen: hovaTen, email: email, sdt: sdt });
    // Gửi thông tin về tên người dùng hiện tại về cửa sổ mẹ
    window.opener.postMessage({ username_dk: username_dk, password_dk: password_dk, ten: hovaTen, email: email, sdt: sdt }, '*');
    toggleForm('login');
}

function checkTenNguoiDung(username) {
    for (let i = 0; i < ds_taiKhoan.length; i++) {
        if (ds_taiKhoan[i].taiKhoan === username) {
            return true;
        }
    }
    return false;
}
