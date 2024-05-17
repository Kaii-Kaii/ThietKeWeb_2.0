
let loginWindow;
let check = false;
let tenNguoiDungHienTai = null;
let profileDiv = document.getElementById('profile');
let ds_taiKhoan = [
    { taiKhoan: 'admin', matKhau: 'admin', hovaTen: 'Admin', email: 'admin#gmail.com', sdt: '0123456789' },
    { taiKhoan: 'vana01', matKhau: '12345678', hovaTen: 'Văn A', email: 'vana01#gmail.com', sdt: '0123456789' },
    { taiKhoan: 'thanh02', matKhau: '12345678', hovaTen: 'Thanh B', email: 'thanh02#gmail.com', sdt: '0123456789' },
];

window.addEventListener('message', function (event) {
    // Kiểm tra nếu thông điệp được gửi từ cửa sổ con và có dữ liệu hợp lệ
    if (event.data && event.data.username) {
        var username = event.data.username;
        tenNguoiDungHienTai = username;
        document.getElementById('name').innerHTML = username;
    }
});

function openLogin() {
    if (!tenNguoiDungHienTai) {
        loginWindow = window.open('HTML/login.html', 'login', 'width=700,height=900');
    }
    else {
        // Nếu trạng thái là true, hiển thị thông tin người dùng
        popupThongTin();
        profileDiv.style.display = 'block';
    }
}

function popupThongTin() {
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
    let popupContent = `
            <html>
            <head>
                <title>Thông tin người dùng</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h2>Thông tin người dùng</h2>
                    <p><strong>Tên người dùng:</strong> ${ten}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Số điện thoại:</strong> ${sdt}</p>
                    <p><strong>Tài khoản:</strong> ${tennguoidung}</p>
                </div>
            </body>
            </html>
        `;
    profileDiv.innerHTML = popupContent;
    profileDiv.style.display = 'none';
}

function toggleForm(formId) {
    document.getElementById('login').style.display = formId === 'login' ? 'block' : 'none';
    document.getElementById('signup').style.display = formId === 'signup' ? 'block' : 'none';
}

function checkLogin() {
    const taiKhoan = document.getElementById('username').value;
    const matKhau = document.getElementById('password').value;
    for (let i = 0; i < ds_taiKhoan.length; i++) {
        if (ds_taiKhoan[i].taiKhoan === taiKhoan && ds_taiKhoan[i].matKhau === matKhau) {
            trangThai = true;
            return true;
        }
    }
    return false;
}
