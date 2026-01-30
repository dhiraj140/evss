// Main JavaScript file with common utilities and language support

// Language data
const translations = {
    en: {
        // Login Page
        'login-title': 'Digital EVM System',
        'voter-login-title': 'Voter Login',
        'voter-id-label': 'Voter ID Number',
        'pin-label': 'PIN / Password',
        'voterId-placeholder': 'Enter Voter ID',
        'pin-placeholder': 'Enter PIN',
        'login-btn': 'Login to Vote',
        'admin-login-btn': 'Admin Panel',
        'view-results-btn': 'View Results',
        'instructions-title': 'Instructions',
        'instructions-list': [
            'Enter your Voter ID and PIN to login',
            'You can vote only once per election',
            'Review your selection before confirming',
            'Voting will be locked after election end time',
            'Results will be available after voting ends'
        ],
        'footer-text': 'Secure Digital Voting System © 2024',
        'disclaimer-text': 'Demo Digital EVM System – For Educational and Practice Use Only. Not for real government elections.',
        'admin-modal-title': 'Admin Authentication',
        'admin-password-label': 'Admin Password',
        'admin-access-btn': 'Access Admin Panel',
        'result-access-btn': 'Access Results',
        
        // Voting Page
        'voting-title': 'Cast Your Vote',
        'selected-title': 'Your Selected Candidate',
        'no-selection-msg': 'No candidate selected yet',
        'confirm-vote-btn': 'Confirm Vote',
        'reset-selection-btn': 'Reset Selection',
        'logout-btn': 'Logout',
        'timer-label': 'Time Remaining:',
        'confirm-title': 'Confirm Your Vote',
        'confirm-text': 'You are about to vote for:',
        'confirm-warning': 'This action cannot be undone. You can vote only once.',
        'final-confirm-btn': 'Yes, Cast My Vote',
        'cancel-vote-btn': 'No, Go Back',
        'success-title': 'Vote Cast Successfully!',
        'success-text': 'Your vote has been recorded. Thank you for participating in the democratic process.',
        'close-success-btn': 'OK',
        
        // Results Page
        'results-election-title': 'General Election 2024 - Results',
        'results-time-label': 'Last Updated:',
        'total-votes-label': 'Total Votes Cast:',
        'results-chart-title': 'Results Visualization',
        'results-table-title': 'Detailed Results',
        'winner-title': 'Leading Candidate',
        
        // Admin Panel
        'reset-confirm-text': 'Are you sure you want to reset the votes? This action cannot be undone.'
    },
    
    hi: {
        // Login Page
        'login-title': 'डिजिटल ईवीएम प्रणाली',
        'voter-login-title': 'मतदाता लॉगिन',
        'voter-id-label': 'मतदाता आईडी नंबर',
        'pin-label': 'पिन / पासवर्ड',
        'voterId-placeholder': 'मतदाता आईडी दर्ज करें',
        'pin-placeholder': 'पिन दर्ज करें',
        'login-btn': 'वोट करने के लिए लॉगिन करें',
        'admin-login-btn': 'व्यवस्थापक पैनल',
        'view-results-btn': 'परिणाम देखें',
        'instructions-title': 'निर्देश',
        'instructions-list': [
            'लॉगिन करने के लिए अपना मतदाता आईडी और पिन दर्ज करें',
            'आप प्रति चुनाव में केवल एक बार वोट कर सकते हैं',
            'पुष्टि करने से पहले अपना चयन देखें',
            'चुनाव समाप्ति समय के बाद मतदान बंद हो जाएगा',
            'मतदान समाप्त होने के बाद परिणाम उपलब्ध होंगे'
        ],
        'footer-text': 'सुरक्षित डिजिटल मतदान प्रणाली © 2024',
        'disclaimer-text': 'डेमो डिजिटल ईवीएम प्रणाली - केवल शैक्षिक और अभ्यास उपयोग के लिए। वास्तविक सरकारी चुनावों के लिए नहीं।',
        'admin-modal-title': 'व्यवस्थापक प्रमाणीकरण',
        'admin-password-label': 'व्यवस्थापक पासवर्ड',
        'admin-access-btn': 'व्यवस्थापक पैनल तक पहुंचें',
        'result-access-btn': 'परिणाम देखें',
        
        // Voting Page
        'voting-title': 'अपना वोट डालें',
        'selected-title': 'आपका चुना हुआ उम्मीदवार',
        'no-selection-msg': 'अभी तक कोई उम्मीदवार चयनित नहीं',
        'confirm-vote-btn': 'वोट की पुष्टि करें',
        'reset-selection-btn': 'चयन रीसेट करें',
        'logout-btn': 'लॉगआउट',
        'timer-label': 'शेष समय:',
        'confirm-title': 'अपने वोट की पुष्टि करें',
        'confirm-text': 'आप इस उम्मीदवार को वोट देने जा रहे हैं:',
        'confirm-warning': 'इस क्रिया को पूर्ववत नहीं किया जा सकता। आप केवल एक बार वोट कर सकते हैं।',
        'final-confirm-btn': 'हां, मेरा वोट डालें',
        'cancel-vote-btn': 'नहीं, वापस जाएं',
        'success-title': 'वोट सफलतापूर्वक डाला गया!',
        'success-text': 'आपका वोट दर्ज किया गया है। लोकतांत्रिक प्रक्रिया में भाग लेने के लिए धन्यवाद।',
        'close-success-btn': 'ठीक है',
        
        // Results Page
        'results-election-title': 'आम चुनाव 2024 - परिणाम',
        'results-time-label': 'अंतिम अपडेट:',
        'total-votes-label': 'कुल वोट डाले गए:',
        'results-chart-title': 'परिणाम विज़ुअलाइज़ेशन',
        'results-table-title': 'विस्तृत परिणाम',
        'winner-title': 'अग्रणी उम्मीदवार',
        
        // Admin Panel
        'reset-confirm-text': 'क्या आप वाकई वोट रीसेट करना चाहते हैं? इस क्रिया को पूर्ववत नहीं किया जा सकता।'
    },
    
    mr: {
        // Login Page
        'login-title': 'डिजिटल ईवीएम सिस्टम',
        'voter-login-title': 'मतदार लॉगिन',
        'voter-id-label': 'मतदार आयडी नंबर',
        'pin-label': 'पिन / पासवर्ड',
        'voterId-placeholder': 'मतदार आयडी टाका',
        'pin-placeholder': 'पिन टाका',
        'login-btn': 'मतदान करण्यासाठी लॉगिन करा',
        'admin-login-btn': 'अ‍ॅडमिन पॅनेल',
        'view-results-btn': 'निकाल पहा',
        'instructions-title': 'सूचना',
        'instructions-list': [
            'लॉगिन करण्यासाठी आपला मतदार आयडी आणि पिन टाका',
            'आपण प्रति निवडणूक केवळ एकदाच मतदान करू शकता',
            'खात्री करण्यापूर्वी आपली निवड तपासा',
            'निवडणूक समाप्ती वेळेनंतर मतदान बंद होईल',
            'मतदान संपल्यानंतर निकाल उपलब्ध होतील'
        ],
        'footer-text': 'सुरक्षित डिजिटल मतदान प्रणाली © 2024',
        'disclaimer-text': 'डेमो डिजिटल ईवीएम सिस्टम - फक्त शैक्षणिक आणि सराव वापरासाठी. वास्तविक सरकारी निवडणुकांसाठी नाही.',
        'admin-modal-title': 'प्रशासक प्रमाणीकरण',
        'admin-password-label': 'प्रशासक पासवर्ड',
        'admin-access-btn': 'प्रशासक पॅनेलमध्ये प्रवेश करा',
        'result-access-btn': 'निकाल पहा',
        
        // Voting Page
        'voting-title': 'आपले मत द्या',
        'selected-title': 'आपला निवडलेला उमेदवार',
        'no-selection-msg': 'अद्याप कोणताही उमेदवार निवडलेला नाही',
        'confirm-vote-btn': 'मताची खात्री करा',
        'reset-selection-btn': 'निवड रीसेट करा',
        'logout-btn': 'लॉगआउट',
        'timer-label': 'शिल्लक वेळ:',
        'confirm-title': 'आपल्या मताची पुष्टी करा',
        'confirm-text': 'आपण या उमेदवाराला मत देणार आहात:',
        'confirm-warning': 'ही क्रिया पूर्ववत केली जाऊ शकत नाही. आपण फक्त एकदाच मतदान करू शकता.',
        'final-confirm-btn': 'होय, माझे मत द्या',
        'cancel-vote-btn': 'नाही, मागे जा',
        'success-title': 'मत यशस्वीपणे दिले!',
        'success-text': 'आपले मत नोंदवले गेले आहे. लोकशाही प्रक्रियेत सहभागी झाल्याबद्दल धन्यवाद.',
        'close-success-btn': 'ठीक आहे',
        
        // Results Page
        'results-election-title': 'सर्वसाधारण निवडणूक 2024 - निकाल',
        'results-time-label': 'शेवटचे अद्यतन:',
        'total-votes-label': 'एकूण मते दिली:',
        'results-chart-title': 'निकाल दृश्यीकरण',
        'results-table-title': 'तपशीलवार निकाल',
        'winner-title': 'अग्रगण्य उमेदवार',
        
        // Admin Panel
        'reset-confirm-text': 'आपणांस खरोखरच मते रीसेट करायची आहेत का? ही क्रिया पूर्ववत केली जाऊ शकत नाही.'
    }
};

// Current language
let currentLanguage = 'en';

// Initialize the application
function initApp() {
    // Load language preference
    const savedLanguage = localStorage.getItem('evmLanguage') || 'en';
    setLanguage(savedLanguage);
    
    // Initialize data if not exists
    initData();
}

// Initialize data structure
function initData() {
    if (!localStorage.getItem('electionData')) {
        const defaultData = {
            election: {
                title: 'General Election 2024',
                startTime: null,
                endTime: null,
                isActive: false
            },
            candidates: [
                { id: 1, name: 'Amit Sharma', party: 'National Democratic Party', symbol: '🦁', votes: 0 },
                { id: 2, name: 'Priya Singh', party: 'Progressive Alliance', symbol: '🌹', votes: 0 },
                { id: 3, name: 'Rajesh Kumar', party: 'United Front', symbol: '⚡', votes: 0 },
                { id: 4, name: 'Sunita Patel', party: 'Green Future Party', symbol: '🌱', votes: 0 },
                { id: 5, name: 'Nota', party: 'None of the Above', symbol: '❌', votes: 0 }
            ],
            voters: {
                'VOTER001': { pin: '123456', hasVoted: false },
                'VOTER002': { pin: '234567', hasVoted: false },
                'VOTER003': { pin: '345678', hasVoted: false },
                'VOTER004': { pin: '456789', hasVoted: false },
                'VOTER005': { pin: '567890', hasVoted: false }
            },
            adminPassword: 'admin123',
            electionStart: null,
            electionEnd: null
        };
        
        localStorage.setItem('electionData', JSON.stringify(defaultData));
    }
}

// Get election data
function getElectionData() {
    return JSON.parse(localStorage.getItem('electionData')) || initData();
}

// Save election data
function saveElectionData(data) {
    localStorage.setItem('electionData', JSON.stringify(data));
}

// Set language
function setLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('evmLanguage', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.placeholder) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update lists (like instructions)
    const instructionLists = document.querySelectorAll('#instructions-list');
    instructionLists.forEach(list => {
        if (translations[lang]['instructions-list']) {
            list.innerHTML = '';
            translations[lang]['instructions-list'].forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                list.appendChild(li);
            });
        }
    });
    
    // Update language selector buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === `lang-${lang}`) {
            btn.classList.add('active');
        }
    });
}

// Check if election is active
function isElectionActive() {
    const data = getElectionData();
    if (!data.electionStart || !data.electionEnd) return false;
    
    const now = new Date().getTime();
    const start = new Date(data.electionStart).getTime();
    const end = new Date(data.electionEnd).getTime();
    
    return now >= start && now <= end;
}

// Format time remaining
function getTimeRemaining() {
    const data = getElectionData();
    if (!data.electionEnd) return '--:--:--';
    
    const now = new Date().getTime();
    const end = new Date(data.electionEnd).getTime();
    const diff = end - now;
    
    if (diff <= 0) return '00:00:00';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Check if voter has already voted
function hasVoted(voterId) {
    const data = getElectionData();
    return data.voters[voterId] && data.voters[voterId].hasVoted === true;
}

// Mark voter as voted
function markVoted(voterId) {
    const data = getElectionData();
    if (data.voters[voterId]) {
        data.voters[voterId].hasVoted = true;
        saveElectionData(data);
        return true;
    }
    return false;
}

// Cast a vote
function castVote(candidateId) {
    const data = getElectionData();
    const candidate = data.candidates.find(c => c.id === candidateId);
    
    if (candidate) {
        candidate.votes = (candidate.votes || 0) + 1;
        saveElectionData(data);
        return true;
    }
    return false;
}

// Get results
function getResults() {
    const data = getElectionData();
    const candidates = [...data.candidates].sort((a, b) => (b.votes || 0) - (a.votes || 0));
    const totalVotes = candidates.reduce((sum, c) => sum + (c.votes || 0), 0);
    
    return {
        candidates,
        totalVotes,
        winner: candidates.length > 0 ? candidates[0] : null
    };
}

// Export data
function exportData() {
    const data = getElectionData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `election-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
