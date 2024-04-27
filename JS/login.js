 //!------------------------------LOGIN--------------------------------
        // Danh sách tài khoản và mật khẩu
        const users = [
            { username: 'user1', password: 'password1', name: 'Nguyễn Văn A', email: 'vana@gmail.com' },
            { username: 'user2', password: 'password2', name: 'Trần Thị B', email: 'thib@gmail.com' },
            { username: '1', password: '1', name: 'Nguyễn Văn C', email: 'vanc@gmail.com' },
            // Thêm các tài khoản khác ở đây
        ];
        //z Khởi tạo đối tượng người dùng
        let user = {
            loggedIn: false,
            name: '',
            email: ''
        };
        const profileIcon = document.getElementById('profileIcon');
        const profileDiv = document.getElementById('profile');
        function showLoginForm() {
            const loginForm = `
<p style="font-size:20px; text-align: center;">Đăng nhập</p>
<input type="text" id="username" style="width:270px; margin:5px;" placeholder="Tên tài khoản" />
<input type="password" id="password" style="width:270px; margin:5px;" placeholder="Mật khẩu" />
<button onclick="login(event)">Đăng nhập</button>
`;
            profileDiv.innerHTML = loginForm;
            profileDiv.style.display = 'block';
        }
        // Sự kiện click vào icon profile
        profileIcon.addEventListener('click', () => {
            if (!user.loggedIn) {
                showLoginForm();
            } else {
                const info = `
<p style="font-size: 14px;">${user.name}</p>
<p style="font-size: 14px;">Email: ${user.email}</p>
<button onclick="handleLogout(event)">Đăng xuất</button>
`;
                profileDiv.innerHTML = info;
                profileDiv.style.display = 'block';
            }
        });
        function login(event) {
            event.stopPropagation();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const foundUser = users.find(u => u.username === username && u.password === password);
            if (foundUser) {
                // Đăng nhập thành công
                user.loggedIn = true;
                user.name = foundUser.name; // Lấy tên từ foundUser
                user.email = foundUser.email; // Lấy email từ foundUser

                const info = `
<p style="font-size: 18px;">${user.name}</p>
<p style="font-size: 18px;">Email: ${user.email}</p>
<button onclick="handleLogout(event)">Đăng xuất</button>
`;
                profileDiv.innerHTML = info;
            } else {
                // Đăng nhập thất bại
                const errorMessage = `
<p>Tên tài khoản hoặc mật khẩu không đúng</p>
<button onclick="showLoginForm()">Đăng nhập lại</button>
`;
                profileDiv.innerHTML = errorMessage;
            }
        }
        function handleLogout(event) {
            event.stopPropagation();
            logout();
            profileDiv.style.display = 'none';
        }
        function logout() {
            user.loggedIn = false;
            user.name = '';
            user.email = '';
            showLoginForm();
        }
        const loginButton = document.querySelector('#profile button');
        function handleClickOutside(event) {
            if (
                !profileDiv.contains(event.target) &&
                event.target !== profileIcon &&
                event.target !== loginButton
            ) {
                profileDiv.style.display = 'none';
            }
        }
        document.addEventListener('click', handleClickOutside);