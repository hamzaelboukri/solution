// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Application started');
    
    // Setup login page
    if (document.getElementById('loginForm')) {
        setupLoginPage();
    }
    
    // Setup signup page
    if (document.getElementById('signupForm')) {
        setupSignupPage();
    }
    
    // Check authentication on protected pages
    if (document.getElementById('protectedContent')) {
        checkAuthentication();
    }
});

function setupLoginPage() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log('📨 Attempting login:', email);
        
        const result = await loginUser(email, password);
        
        if (result.success) {
            showMessage('message', '✅ Login successful! Redirecting...', 'success');
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            showMessage('message', `❌ ${result.message}`, 'error');
        }
    });
}

function setupSignupPage() {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log('📨 Attempting registration:', name, email);
        
        const result = await registerUser(name, email, password);
        
        if (result.success) {
            showMessage('message', '✅ Registration successful! Redirecting to login...', 'success');
            
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            showMessage('message', `❌ ${result.message}`, 'error');
        }
    });
}

function checkAuthentication() {
    if (!checkAuth()) {
        window.location.href = '/login';
        return;
    }
    
    // User is authenticated, show protected content
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    document.getElementById('userInfo').innerHTML = `
        <h3>Welcome, ${user.name}!</h3>
        <p>Email: ${user.email}</p>
        <button onclick="logout()">Logout</button>
    `;
}