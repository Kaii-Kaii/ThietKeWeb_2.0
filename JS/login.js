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
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <style>
            .container {
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .row {
                display: flex;
                border-bottom: 1px solid #ccc;
                padding-left: 5px;
                padding-right: 5px;
            }
            .row>div {
                padding: 2px;
                font-weight: bold;
                font-size: 14px;
            }
            .tt {
                text-align: right;
                padding-right: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <h3 style="text-align: center;">Thông tin người dùng</h3>
            </div>
            <div class="row">
                <div class="col-4">Họ và Tên:</div>
                <div id="show-name" class="tt col-8">${ten}</div>
            </div>
            <div class="row">
                <div class="col-4">Email:</div>
                <div id="show-email" class="tt col-8">${email}</div>
            </div>
            <div class="row">
                <div class="col-4">Số điện thoại:</div>
                <div id="show-sdt" class="tt col-8">${sdt}</div>
            </div>
            <div class="row">
                <div class="col-4">Tên tài khoản:</div>
                <div id="show-username" class="tt col-8">${tennguoidung}</div>
            </div>
            <div class="row">
                <div class="col-6">
                    <button onclick="closeProfile()" class="btn btn-primary" style="margin-top: 0px;">Đóng</button>
                </div>
                <div class="col-6" style="text-align: right;">
                    <button class="btn btn-danger" onclick="DangXuat()" style="margin-top: 0px;">Đăng xuất</button>
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
    ds_taiKhoan.push({ taiKhoan: username_dk, matKhau: password_dk, hovaTen: hovaTen, email: email, sdt: sdt });
    // Gửi thông tin về tên người dùng hiện tại về cửa sổ mẹ
    window.opener.postMessage({ username_dk: username_dk, password_dk: password_dk, ten: hovaTen, email: email, sdt: sdt }, '*');
    toggleForm('login');
}


function checkTenNguoiDung(username) {
    for (let i = 0; i < ds_taiKhoan.length; i++) {
        if (ds_taiKhoan[i].taiKhoan === username) {
            return false;
        }
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const emailWarning = document.getElementById('canh-bao-email');
    const sdtInput = document.getElementById('sdt');
    const sdtWarning = document.getElementById('canh-bao-sdt');
    const passwordInput = document.getElementById('password_signup');
    const passwordWarning = document.getElementById('canh-bao-password');
    const repasswordInput = document.getElementById('repassword');
    const repasswordWarning = document.getElementById('canh-bao-repassword');
    const usernameInput = document.getElementById('username_signup');
    const usernameWarning = document.getElementById('canh-bao-username');

    emailInput.addEventListener('input', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailWarning.style.display = emailPattern.test(emailInput.value) ? 'none' : 'block';
    });

    sdtInput.addEventListener('input', function() {
        const sdtPattern = /^[0-9]{10}$/;
        sdtWarning.style.display = sdtPattern.test(sdtInput.value) ? 'none' : 'block';
    });

    passwordInput.addEventListener('input', function() {
        passwordWarning.style.display = passwordInput.value.length >= 8 ? 'none' : 'block';
    });

    repasswordInput.addEventListener('input', function() {
        repasswordWarning.style.display = repasswordInput.value === passwordInput.value ? 'none' : 'block';
        repasswordInput === '' ? repasswordWarning.style.display = 'none' : '';
    });

    usernameInput.addEventListener('input', function() {
        usernameWarning.style.display = checkTenNguoiDung(usernameInput.value) ? 'none' : 'block';
    });
});