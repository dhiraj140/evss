// Index page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set up language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.id.split('-')[1];
            setLanguage(lang);
        });
    });
    
    // Login button
    document.getElementById('login-btn')?.addEventListener('click', handleLogin);
    
    // Admin login button
    document.getElementById('admin-login-btn')?.addEventListener('click', function() {
        document.getElementById('admin-modal').classList.add('active');
    });
    
    // View results button
    document.getElementById('view-results-btn')?.addEventListener('click', function() {
        const data = getElectionData();
        const now = new Date().getTime();
        const end = data.electionEnd ? new Date(data.electionEnd).getTime() : null;
        
        // If election has ended or no end time set, show results directly
        if (!end || now > end) {
            window.location.href = 'result.html';
        } else {
            // Show password modal for admin access
            document.getElementById('admin-modal').classList.add('active');
        }
    });
    
    // Admin access button in modal
    document.getElementById('admin-access-btn')?.addEventListener('click', function() {
        const password = document.getElementById('admin-password').value;
        const data = getElectionData();
        
        if (password === data.adminPassword) {
            window.location.href = 'admin.html';
        } else {
            document.getElementById('admin-password-error').textContent = 'Incorrect password';
        }
    });
    
    // Result access button in modal
    document.getElementById('result-access-btn')?.addEventListener('click', function() {
        const password = document.getElementById('admin-password').value;
        const data = getElectionData();
        
        if (password === data.adminPassword) {
            window.location.href = 'result.html';
        } else {
            document.getElementById('admin-password-error').textContent = 'Incorrect password';
        }
    });
    
    // Close modal
    document.querySelector('.close-modal')?.addEventListener('click', function() {
        document.getElementById('admin-modal').classList.remove('active');
        document.getElementById('admin-password').value = '';
        document.getElementById('admin-password-error').textContent = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('admin-modal');
        if (event.target === modal) {
            modal.classList.remove('active');
            document.getElementById('admin-password').value = '';
            document.getElementById('admin-password-error').textContent = '';
        }
    });
    
    // Handle Enter key in login form
    document.getElementById('pin')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // Initialize election info display
    updateElectionInfo();
});

function handleLogin() {
    const voterId = document.getElementById('voterId').value.trim().toUpperCase();
    const pin = document.getElementById('pin').value.trim();
    
    // Reset errors
    document.getElementById('voterId-error').textContent = '';
    document.getElementById('pin-error').textContent = '';
    
    // Validate inputs
    if (!voterId) {
        document.getElementById('voterId-error').textContent = 'Voter ID is required';
        return;
    }
    
    if (!pin) {
        document.getElementById('pin-error').textContent = 'PIN is required';
        return;
    }
    
    // Check voter credentials
    const data = getElectionData();
    
    if (!data.voters[voterId]) {
        document.getElementById('voterId-error').textContent = 'Voter ID not found';
        return;
    }
    
    if (data.voters[voterId].pin !== pin) {
        document.getElementById('pin-error').textContent = 'Incorrect PIN';
        return;
    }
    
    // Check if election is active
    if (!isElectionActive()) {
        alert('Voting is not active at this time. Please check election schedule.');
        return;
    }
    
    // Check if voter has already voted
    if (hasVoted(voterId)) {
        alert('You have already voted. Each voter can vote only once.');
        return;
    }
    
    // Store current voter ID in session storage for vote page
    sessionStorage.setItem('currentVoterId', voterId);
    
    // Redirect to voting page
    window.location.href = 'vote.html';
}

function updateElectionInfo() {
    const data = getElectionData();
    
    // Update election title
    const titleElement = document.getElementById('election-title');
    if (titleElement && data.election.title) {
        titleElement.textContent = data.election.title;
    }
    
    // Update election time if set
    const timeElement = document.getElementById('election-time');
    if (timeElement && data.electionStart && data.electionEnd) {
        const start = new Date(data.electionStart);
        const end = new Date(data.electionEnd);
        
        const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        timeElement.textContent = `Voting: ${startTime} - ${endTime}`;
    }
}
