function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function login(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Vui lòng điền tất cả các ô trống");
        return;
    }

    // Retrieve user from localStorage
    const storedUser = localStorage.getItem('user_' + username);
    if (!storedUser) {
        alert("Không tìm thấy tài khoản, vui lòng đăng ký trước");
        return;
    }

    const user = JSON.parse(storedUser);
    if (user.password !== password) {
        alert("Mật khẩu không đúng");
        return;
    }

    alert("Đăng nhập thành công");
    closeLogin();
}

document.querySelector('.login form').onsubmit = login;
// ##################################################################
function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegister() {
    document.getElementById('registerModal').style.display = 'none';
}

function registerModal(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    // Get form values
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // validation
    if (!username || !password || !confirmPassword) {
        alert("Vui lòng điền tất cả các ô trống");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không trùng khớp");
        return;
    }

    // Save user to localStorage
    const user = {
        username: username,
        password: password
    };

    localStorage.setItem('user_' + username, JSON.stringify(user));
    alert("Registration successful!");

    // Clear the form
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    // Close the modal
    closeRegister();
}

// Attach the registerModal function to the form's onsubmit event
document.querySelector('.register form').onsubmit = registerModal;
