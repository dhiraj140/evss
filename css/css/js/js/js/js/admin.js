// Admin page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    const password = sessionStorage.getItem('adminAuth');
    const data = getElectionData();
    
    if (password !== data.adminPassword) {
        // Redirect to login with admin modal
        sessionStorage.setItem('showAdminModal', 'true');
        window.location.href = 'index.html';
        return;
    }
    
    // Setup tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Load initial data
    loadElectionSettings();
    loadCandidatesTable();
    loadVoterStats();
    
    // Setup event listeners
    document.getElementById('admin-logout-btn').addEventListener('click', handleAdminLogout);
    document.getElementById('back-to-vote-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    document.getElementById('save-election-btn').addEventListener('click', saveElectionSettings);
    document.getElementById('add-candidate-btn').addEventListener('click', addCandidate);
    document.getElementById('search-voter-btn').addEventListener('click', searchVoter);
    document.getElementById('add-voter-btn').addEventListener('click', addVoter);
    document.getElementById('reset-votes-btn').addEventListener('click', () => showResetConfirm('votes'));
    document.getElementById('full-reset-btn').addEventListener('click', () => showResetConfirm('full'));
    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('export-results-btn').addEventListener('click', exportResults);
    
    document.getElementById('confirm-reset-btn').addEventListener('click', confirmReset);
    document.getElementById('cancel-reset-btn').addEventListener('click', hideResetConfirm);
    
    // Set default dates (today and tomorrow)
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = tomorrowStr;
    
    // Update election status timer
    updateElectionStatus();
    setInterval(updateElectionStatus, 1000);
});

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

function loadElectionSettings() {
    const data = getElectionData();
    
    // Election title
    document.getElementById('election-name').value = data.election.title || 'General Election 2024';
    
    // Election times
    if (data.electionStart) {
        const startDate = new Date(data.electionStart);
        document.getElementById('start-date').value = startDate.toISOString().split('T')[0];
        document.getElementById('start-time').value = startDate.toTimeString().slice(0, 5);
    }
    
    if (data.electionEnd) {
        const endDate = new Date(data.electionEnd);
        document.getElementById('end-date').value = endDate.toISOString().split('T')[0];
        document.getElementById('end-time').value = endDate.toTimeString().slice(0, 5);
    }
}

function saveElectionSettings() {
    const title = document.getElementById('election-name').value.trim();
    const startDate = document.getElementById('start-date').value;
    const startTime = document.getElementById('start-time').value;
    const endDate = document.getElementById('end-date').value;
    const endTime = document.getElementById('end-time').value;
    
    if (!title) {
        alert('Election title is required');
        return;
    }
    
    const data = getElectionData();
    
    // Update election data
    data.election.title = title;
    
    if (startDate && startTime) {
        data.electionStart = `${startDate}T${startTime}:00`;
    }
    
    if (endDate && endTime) {
        data.electionEnd = `${endDate}T${endTime}:00`;
    }
    
    saveElectionData(data);
    
    alert('Election settings saved successfully!');
    updateElectionStatus();
}

function loadCandidatesTable() {
    const data = getElectionData();
    const tbody = document.getElementById('candidates-table-body');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.candidates.forEach(candidate => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${candidate.id}</td>
            <td>${candidate.name}</td>
            <td>${candidate.party}</td>
            <td>${candidate.symbol || '⚪'}</td>
            <td>${candidate.votes || 0}</td>
            <td>
                <button class="btn-small btn-danger remove-candidate" data-id="${candidate.id}">Remove</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-candidate').forEach(btn => {
        btn.addEventListener('click', function() {
            const candidateId = parseInt(this.dataset.id);
            removeCandidate(candidateId);
        });
    });
}

function addCandidate() {
    const name = document.getElementById('candidate-name').value.trim();
    const party = document.getElementById('candidate-party').value.trim();
    const symbol = document.getElementById('candidate-symbol').value.trim();
    
    if (!name || !party) {
        alert('Candidate name and party are required');
        return;
    }
    
    const data = getElectionData();
    
    // Generate new ID
    const newId = data.candidates.length > 0 ? 
        Math.max(...data.candidates.map(c => c.id)) + 1 : 1;
    
    // Add new candidate
    data.candidates.push({
        id: newId,
        name,
        party,
        symbol: symbol || '⚪',
        votes: 0
    });
    
    saveElectionData(data);
    
    // Clear form
    document.getElementById('candidate-name').value = '';
    document.getElementById('candidate-party').value = '';
    document.getElementById('candidate-symbol').value = '⚪';
    
    // Reload table
    loadCandidatesTable();
    
    alert('Candidate added successfully!');
}

function removeCandidate(candidateId) {
    if (!confirm('Are you sure you want to remove this candidate? This action cannot be undone.')) {
        return;
    }
    
    const data = getElectionData();
    data.candidates = data.candidates.filter(c => c.id !== candidateId);
    saveElectionData(data);
    
    loadCandidatesTable();
    alert('Candidate removed successfully!');
}

function searchVoter() {
    const voterId = document.getElementById('search-voter-id').value.trim().toUpperCase();
    const resultDiv = document.getElementById('voter-search-result');
    
    if (!voterId) {
        resultDiv.innerHTML = '<p class="error">Please enter a Voter ID</p>';
        return;
    }
    
    const data = getElectionData();
    
    if (!data.voters[voterId]) {
        resultDiv.innerHTML = `<p class="error">Voter ID "${voterId}" not found</p>`;
        return;
    }
    
    const voter = data.voters[voterId];
    const status = voter.hasVoted ? 'Voted' : 'Not Voted';
    const statusClass = voter.hasVoted ? 'success' : 'warning';
    
    resultDiv.innerHTML = `
        <div class="voter-details">
            <h4>Voter Details</h4>
            <p><strong>Voter ID:</strong> ${voterId}</p>
            <p><strong>Status:</strong> <span class="${statusClass}">${status}</span></p>
            <p><strong>PIN:</strong> ${voter.pin}</p>
        </div>
    `;
}

function addVoter() {
    const voterId = document.getElementById('new-voter-id').value.trim().toUpperCase();
    const pin = document.getElementById('new-voter-pin').value.trim();
    
    if (!voterId) {
        alert('Voter ID is required');
        return;
    }
    
    if (!pin || pin.length !== 6 || !/^\d+$/.test(pin)) {
        alert('PIN must be 6 digits');
        return;
    }
    
    const data = getElectionData();
    
    if (data.voters[voterId]) {
        alert('Voter ID already exists');
        return;
    }
    
    // Add new voter
    data.voters[voterId] = {
        pin,
        hasVoted: false
    };
    
    saveElectionData(data);
    
    // Clear form
    document.getElementById('new-voter-id').value = '';
    document.getElementById('new-voter-pin').value = '';
    
    // Reload stats
    loadVoterStats();
    
    alert('Voter added successfully!');
}

function loadVoterStats() {
    const data = getElectionData();
    const voters = Object.keys(data.voters);
    
    const totalVoters = voters.length;
    const votedCount = voters.filter(id => data.voters[id].hasVoted).length;
    const notVotedCount = totalVoters - votedCount;
    const votingPercentage = totalVoters > 0 ? Math.round((votedCount / totalVoters) * 100) : 0;
    
    document.getElementById('total-voters').textContent = totalVoters;
    document.getElementById('voted-count').textContent = votedCount;
    document.getElementById('not-voted-count').textContent = notVotedCount;
    document.getElementById('voting-percentage').textContent = `${votingPercentage}%`;
}

function showResetConfirm(type) {
    const modal = document.getElementById('reset-confirm-modal');
    const text = document.getElementById('reset-confirm-text');
    
    if (type === 'votes') {
        text.textContent = 'Are you sure you want to reset all votes? This will reset vote counts for all candidates and mark all voters as not voted. This action cannot be undone.';
    } else {
        text.textContent = 'Are you sure you want to perform a full reset? This will reset the entire system including candidates, voters, and election settings. This action cannot be undone.';
    }
    
    modal.classList.add('active');
    modal.dataset.resetType = type;
}

function hideResetConfirm() {
    document.getElementById('reset-confirm-modal').classList.remove('active');
}

function confirmReset() {
    const modal = document.getElementById('reset-confirm-modal');
    const type = modal.dataset.resetType;
    
    if (type === 'votes') {
        resetVotes();
    } else {
        fullReset();
    }
    
    hideResetConfirm();
}

function resetVotes() {
    const data = getElectionData();
    
    // Reset candidate votes
    data.candidates.forEach(candidate => {
        candidate.votes = 0;
    });
    
    // Reset voter status
    Object.keys(data.voters).forEach(voterId => {
        data.voters[voterId].hasVoted = false;
    });
    
    saveElectionData(data);
    
    // Reload tables and stats
    loadCandidatesTable();
    loadVoterStats();
    
    alert('Votes reset successfully!');
}

function fullReset() {
    if (!confirm('WARNING: This will delete ALL data including candidates and voters. Are you absolutely sure?')) {
        return;
    }
    
    // Clear all data
    localStorage.removeItem('electionData');
    
    // Reinitialize with default data
    initData();
    
    // Reload page
    window.location.reload();
}

function exportResults() {
    const results = getResults();
    const data = {
        election: getElectionData().election,
        results: {
            candidates: results.candidates,
            totalVotes: results.totalVotes,
            winner: results.winner,
            generated: new Date().toISOString()
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `election-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function updateElectionStatus() {
    const data = getElectionData();
    
    // Update status texts
    document.getElementById('current-election-status').textContent = 
        isElectionActive() ? 'Active' : 'Inactive';
    
    if (data.electionStart) {
        const start = new Date(data.electionStart);
        document.getElementById('current-start-time').textContent = start.toLocaleString();
    }
    
    if (data.electionEnd) {
        const end = new Date(data.electionEnd);
        document.getElementById('current-end-time').textContent = end.toLocaleString();
    }
    
    document.getElementById('current-time-remaining').textContent = getTimeRemaining();
}

function handleAdminLogout() {
    sessionStorage.removeItem('adminAuth');
    window.location.href = 'index.html';
}
