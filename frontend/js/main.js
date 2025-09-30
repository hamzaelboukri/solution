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
    
    // Setup dashboard
    if (document.getElementById('userAvatar')) {
        setupDashboard();
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
        
        if (!result.success) {
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
        
        if (!result.success) {
            showMessage('message', `❌ ${result.message}`, 'error');
        }
    });
}

function setupDashboard() {
    if (!checkAuth()) {
        window.location.href = '/login.html';
        return;
    }
    
    // User is authenticated, show dashboard content
    const user = getCurrentUser();
    if (user) {
        // Update user info in dashboard
        if (document.getElementById('userName')) {
            document.getElementById('userName').textContent = user.name;
        }
        if (document.getElementById('userAvatar')) {
            document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
        }
        
        console.log('✅ Dashboard loaded for user:', user.name);
    }
}

// Make functions globally available
window.logout = logout;