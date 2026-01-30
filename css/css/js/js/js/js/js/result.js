// Results page specific JavaScript

let resultsChart = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check if results should be accessible
    const data = getElectionData();
    const now = new Date().getTime();
    const end = data.electionEnd ? new Date(data.electionEnd).getTime() : null;
    
    // If election hasn't ended, check for admin authentication
    if (end && now < end) {
        const password = sessionStorage.getItem('adminAuth');
        if (password !== data.adminPassword) {
            showPasswordModal();
            return;
        }
    }
    
    // Load results
    loadResults();
    
    // Setup event listeners
    document.getElementById('back-to-vote-from-results').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    document.getElementById('print-results-btn').addEventListener('click', () => {
        window.open('print.html', '_blank');
    });
    
    document.getElementById('refresh-results-btn').addEventListener('click', loadResults);
    
    document.getElementById('submit-results-password').addEventListener('click', checkResultsPassword);
    document.getElementById('cancel-results-password').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Auto-refresh every 30 seconds
    setInterval(loadResults, 30000);
});

function showPasswordModal() {
    document.getElementById('results-password-modal').classList.add('active');
}

function checkResultsPassword() {
    const password = document.getElementById('results-password').value;
    const data = getElectionData();
    
    if (password === data.adminPassword) {
        // Store auth for this session
        sessionStorage.setItem('adminAuth', password);
        document.getElementById('results-password-modal').classList.remove('active');
        loadResults();
    } else {
        document.getElementById('results-password-error').textContent = 'Incorrect password';
    }
}

function loadResults() {
    const results = getResults();
    const data = getElectionData();
    
    // Update header info
    document.getElementById('last-updated-time').textContent = new Date().toLocaleString();
    document.getElementById('total-votes-count').textContent = results.totalVotes;
    
    // Update election title
    const titleElement = document.getElementById('results-election-title');
    if (titleElement && data.election.title) {
        titleElement.textContent = `${data.election.title} - Results`;
    }
    
    // Update results table
    updateResultsTable(results);
    
    // Update winner section
    updateWinnerSection(results);
    
    // Update chart
    updateChart(results);
}

function updateResultsTable(results) {
    const tbody = document.getElementById('results-table-body');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    results.candidates.forEach((candidate, index) => {
        const voteCount = candidate.votes || 0;
        const percentage = results.totalVotes > 0 ? 
            ((voteCount / results.totalVotes) * 100).toFixed(2) : 0;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${candidate.name}</td>
            <td>${candidate.party}</td>
            <td>${candidate.symbol || '⚪'}</td>
            <td>${voteCount}</td>
            <td>${percentage}%</td>
        `;
        
        tbody.appendChild(row);
    });
}

function updateWinnerSection(results) {
    const winnerSection = document.getElementById('winner-section');
    
    if (!results.winner || results.totalVotes === 0) {
        winnerSection.innerHTML = `
            <h3>Leading Candidate</h3>
            <div class="winner-card">
                <div class="winner-symbol">🏆</div>
                <div class="winner-details">
                    <h4>No votes cast yet</h4>
                    <p>No results available</p>
                    <div class="winner-stats">
                        <span>0 votes</span>
                        <span>0%</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    const winner = results.winner;
    const winnerVotes = winner.votes || 0;
    const winnerPercentage = results.totalVotes > 0 ? 
        ((winnerVotes / results.totalVotes) * 100).toFixed(2) : 0;
    
    winnerSection.innerHTML = `
        <h3>Leading Candidate</h3>
        <div class="winner-card">
            <div class="winner-symbol">${winner.symbol || '🏆'}</div>
            <div class="winner-details">
                <h4>${winner.name}</h4>
                <p>${winner.party}</p>
                <div class="winner-stats">
                    <span>${winnerVotes} votes</span>
                    <span>${winnerPercentage}%</span>
                </div>
            </div>
        </div>
    `;
}

function updateChart(results) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (resultsChart) {
        resultsChart.destroy();
    }
    
    // Prepare data
    const labels = results.candidates.map(c => c.name);
    const votes = results.candidates.map(c => c.votes || 0);
    const backgroundColors = [
        '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
        '#1abc9c', '#d35400', '#c0392b', '#16a085', '#8e44ad'
    ];
    
    // Create chart
    resultsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Votes',
                data: votes,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = results.totalVotes;
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                            return `${value} votes (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    },
                    title: {
                        display: true,
                        text: 'Number of Votes'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Candidates'
                    }
                }
            }
        }
    });
}
