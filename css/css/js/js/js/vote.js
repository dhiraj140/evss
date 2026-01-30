// Voting page specific JavaScript

let selectedCandidate = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load voter ID
    const voterId = sessionStorage.getItem('currentVoterId');
    if (!voterId) {
        // Redirect to login if no voter ID
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('current-voter-id').textContent = voterId;
    
    // Load candidates
    loadCandidates();
    
    // Update election info
    updateElectionInfo();
    
    // Setup event listeners
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('confirm-vote-btn').addEventListener('click', showConfirmation);
    document.getElementById('reset-selection-btn').addEventListener('click', resetSelection);
    document.getElementById('final-confirm-btn').addEventListener('click', castVoteFinal);
    document.getElementById('cancel-vote-btn').addEventListener('click', hideConfirmation);
    document.getElementById('close-success-btn').addEventListener('click', closeSuccess);
    
    // Start timer
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Disable back button
    disableBackButton();
});

function loadCandidates() {
    const data = getElectionData();
    const container = document.getElementById('candidates-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    data.candidates.forEach(candidate => {
        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.dataset.id = candidate.id;
        
        card.innerHTML = `
            <div class="candidate-symbol">${candidate.symbol || '⚪'}</div>
            <div class="candidate-name">${candidate.name}</div>
            <div class="candidate-party">${candidate.party}</div>
            <div class="candidate-id">${candidate.id}</div>
        `;
        
        card.addEventListener('click', () => selectCandidate(candidate.id));
        container.appendChild(card);
    });
}

function selectCandidate(candidateId) {
    // Deselect all candidates
    document.querySelectorAll('.candidate-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select the clicked candidate
    const selectedCard = document.querySelector(`.candidate-card[data-id="${candidateId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedCandidate = candidateId;
        
        // Update selected candidate display
        updateSelectedCandidateDisplay(candidateId);
        
        // Enable confirm button
        document.getElementById('confirm-vote-btn').disabled = false;
    }
}

function updateSelectedCandidateDisplay(candidateId) {
    const data = getElectionData();
    const candidate = data.candidates.find(c => c.id === candidateId);
    const container = document.getElementById('selected-info');
    
    if (!candidate || !container) return;
    
    container.innerHTML = `
        <div class="candidate-card selected" style="max-width: 300px; margin: 0 auto; pointer-events: none;">
            <div class="candidate-symbol">${candidate.symbol || '⚪'}</div>
            <div class="candidate-name">${candidate.name}</div>
            <div class="candidate-party">${candidate.party}</div>
            <div class="candidate-id">${candidate.id}</div>
        </div>
    `;
}

function resetSelection() {
    selectedCandidate = null;
    
    // Deselect all candidates
    document.querySelectorAll('.candidate-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Reset selected candidate display
    document.getElementById('selected-info').innerHTML = `
        <p id="no-selection-msg">No candidate selected yet</p>
    `;
    
    // Disable confirm button
    document.getElementById('confirm-vote-btn').disabled = true;
}

function showConfirmation() {
    if (!selectedCandidate) return;
    
    const data = getElectionData();
    const candidate = data.candidates.find(c => c.id === selectedCandidate);
    
    if (!candidate) return;
    
    // Update confirmation modal
    const confirmCandidate = document.getElementById('confirm-candidate');
    confirmCandidate.innerHTML = `
        <div class="candidate-symbol">${candidate.symbol || '⚪'}</div>
        <div class="candidate-name">${candidate.name}</div>
        <div class="candidate-party">${candidate.party}</div>
        <div class="candidate-id">${candidate.id}</div>
    `;
    
    // Show modal
    document.getElementById('confirm-modal').classList.add('active');
}

function hideConfirmation() {
    document.getElementById('confirm-modal').classList.remove('active');
}

function castVoteFinal() {
    const voterId = sessionStorage.getItem('currentVoterId');
    
    if (!voterId || !selectedCandidate) {
        alert('Error: Unable to process your vote. Please try again.');
        return;
    }
    
    // Cast the vote
    if (castVote(selectedCandidate) && markVoted(voterId)) {
        // Show success message
        document.getElementById('confirm-modal').classList.remove('active');
        document.getElementById('success-modal').classList.add('active');
        
        // Clear session storage to prevent back button voting
        sessionStorage.removeItem('currentVoterId');
        
        // Disable voting buttons
        document.getElementById('confirm-vote-btn').disabled = true;
        document.getElementById('reset-selection-btn').disabled = true;
        
        // Change logout button to return to home
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.textContent = 'Return to Home';
        logoutBtn.onclick = function() {
            window.location.href = 'index.html';
        };
    } else {
        alert('Error: Failed to cast your vote. Please try again.');
    }
}

function closeSuccess() {
    document.getElementById('success-modal').classList.remove('active');
    window.location.href = 'index.html';
}

function handleLogout() {
    sessionStorage.removeItem('currentVoterId');
    window.location.href = 'index.html';
}

function updateTimer() {
    const timerElement = document.getElementById('countdown');
    if (timerElement) {
        timerElement.textContent = getTimeRemaining();
    }
}

function updateElectionInfo() {
    const data = getElectionData();
    
    // Update election title
    const titleElement = document.getElementById('current-election-title');
    if (titleElement && data.election.title) {
        titleElement.textContent = data.election.title;
    }
}

function disableBackButton() {
    // Prevent back button navigation after voting
    history.pushState(null, null, location.href);
    window.onpopstate = function() {
        history.go(1);
    };
}
