// Authentication functions
async function registerUser(name, email, password) {
    try {
        console.log('📨 Sending registration request...');
        
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        console.log('📨 Registration response:', data);
         
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showMessage('message', '✅ Inscription réussie! Redirection...', 'success');
            
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 2000);
        } else {
            showMessage('message', `❌ ${data.message}`, 'error');
        }
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('message', '❌ Erreur de connexion au serveur', 'error');
        return { success: false, message: 'Network error' };
    }
}

async function loginUser(email, password) {
    try {
        console.log('📨 Sending login request...');
        
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        console.log('📨 Login response:', data);
        
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showMessage('message', '✅ Connexion réussie! Redirection...', 'success');
            
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 2000);
        } else {
            showMessage('message', `❌ ${data.message}`, 'error');
        }
        return data;
    } catch (error) {
        console.error('Login error:', error);
        showMessage('message', '❌ Erreur de connexion au serveur', 'error');
        return { success: false, message: 'Network error' };
    }
}

// Helper function to show messages
function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    } else {
        console.log('Message element not found:', elementId);
        alert(message); // Fallback if message element doesn't exist
    }
}

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('❌ No token found');
        return false;
    }
    console.log('✅ User is authenticated');
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Export functions for use in other files
window.authFunctions = {
    registerUser,
    loginUser,
    showMessage,
    checkAuth,
    logout,
    getCurrentUser
};