// Kiểm tra thông tin đăng nhập
document.addEventListener('DOMContentLoaded', function () {
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

    emailInput.addEventListener('input', function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailWarning.style.display = emailPattern.test(emailInput.value) ? 'none' : 'block';
    });

    sdtInput.addEventListener('input', function () {
        const sdtPattern = /^[0-9]{10}$/;
        sdtWarning.style.display = sdtPattern.test(sdtInput.value) ? 'none' : 'block';
    });

    passwordInput.addEventListener('input', function () {
        passwordWarning.style.display = passwordInput.value.length >= 8 ? 'none' : 'block';
    });

    repasswordInput.addEventListener('input', function () {
        repasswordWarning.style.display = repasswordInput.value === passwordInput.value ? 'none' : 'block';
        repasswordInput === '' ? repasswordWarning.style.display = 'none' : '';
    });

    usernameInput.addEventListener('input', function () {
        usernameWarning.style.display = checkTenNguoiDung(usernameInput.value) ? 'block' : 'none';
    });
});