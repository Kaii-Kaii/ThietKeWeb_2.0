let loginWindow;
let check = false;
let tenNguoiDungHienTai = null;
let profileDiv = document.getElementById('profile');
let user_hienTai = document.getElementById('tenNguoiDungHienTai');
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
        user_hienTai.textContent = `${username}`;
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
        alert('Vui lòng đăng nhập để xem thông tin cá nhân');
        loginWindow = window.open('HTML/login.html', 'login', 'width=700,height=900');
    }
    else {
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
                font-size: 16px;
            }
            
            h2 {
                color: #333;
                text-align: center;
            }

            .info-container {
                display: flex;
                flex-direction: column;
            }
            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
            }
        </style>
    </head>
    <body>
        <div>
            <h2>Thông tin người dùng</h2>
            <div class="info-container">
                <div class="info-item">
                    <strong>Tên người dùng:</strong> <span>${ten}</span>
                </div>
                <div class="info-item">
                    <strong>Email:</strong> <span>${email}</span>
                </div>
                <div class="info-item">
                    <strong>Số điện thoại:</strong> <span>${sdt}</span>
                </div>
                <div class="info-item">
                    <strong>Tài khoản:</strong> <span>${tennguoidung}</span>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
            <button onclick="closeProfile()" style="margin-right: 5px;">Đóng</button>
            <button id="logout" onclick="DangXuat()" style="margin-left: 5px;">Đăng xuất</button>
        </div>
        </div>        
        </div>
    </body>
    </html>
`;
profileDiv.innerHTML = popupContent;
profileDiv.style.display = 'none';
}

function DangXuat() { 
    alert('Đã đăng xuất khỏi ' + tenNguoiDungHienTai);
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
        alert('Đăng nhập thành công');
        window.close();
    } else {
        alert('Đăng nhập thất bại');
    }
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
    window.opener.postMessage({ username_dk: username_dk, password_dk: password_dk, ten: hovaTen, email: email, sdt: sdt }, '*');
    toggleForm('login');
}
