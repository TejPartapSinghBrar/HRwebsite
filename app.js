const users = {
    'user1': 'password1',
    'user2': 'password2',
    'user3': 'password3'
};

const admins = {
    'admin1': 'adminpass1',
    'admin2': 'adminpass2'
};

document.addEventListener('DOMContentLoaded', function() {
    // Load saved form data if available
    const savedForm = JSON.parse(localStorage.getItem('applicationForm'));
    if (savedForm) {
        document.getElementById('name').value = savedForm.name;
        document.getElementById('education').value = savedForm.education;
        document.getElementById('experience').value = savedForm.experience;
        document.getElementById('skills').value = savedForm.skills;
    }

    // Check if admin is logged in on page load
    if (localStorage.getItem('isAdminLoggedIn')) {
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
    }
});

document.getElementById('application-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        education: document.getElementById('education').value,
        experience: document.getElementById('experience').value,
        skills: document.getElementById('skills').value
    };

    // Save form data to localStorage
    localStorage.setItem('applicationForm', JSON.stringify(formData));

    // Implement your form submission logic here
    alert('Application submitted successfully!');
});

document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (admins[username] === password) {
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        
        // Save admin login state
        localStorage.setItem('isAdminLoggedIn', true);
    } else {
        document.getElementById('login-message').textContent = 'Invalid credentials. Please try again.';
    }
});

function logout() {
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('login-popup').style.display = 'block';
    
    // Clear admin login state
    localStorage.removeItem('isAdminLoggedIn');
}

function showPortal(portal) {
    if (portal === 'user') {
        document.getElementById('user-portal').style.display = 'block';
        document.getElementById('admin-portal').style.display = 'none';
    } else if (portal === 'admin') {
        document.getElementById('user-portal').style.display = 'none';
        document.getElementById('admin-portal').style.display = 'block';
        document.getElementById('login-popup').style.display = 'block';
    }
}

function showForm() {
    document.getElementById('form-container').style.display = 'block';
    document.querySelector('.vacancies-container').style.display = 'none';
}

function backToCards() {
    document.getElementById('form-container').style.display = 'none';
    document.querySelector('.vacancies-container').style.display = 'flex';
}

function showVacancies() {
    document.getElementById('vacancy-list').style.display = 'block';
    document.getElementById('team-list').style.display = 'none';
    document.getElementById('team-info').style.display = 'none';
    document.getElementById('calendar-container').style.display = 'none';
}

function showTeams() {
    document.getElementById('vacancy-list').style.display = 'none';
    document.getElementById('team-list').style.display = 'block';
    document.getElementById('team-info').style.display = 'none';
    document.getElementById('calendar-container').style.display = 'none';
}

function showTeamInfo(teamId) {
    const teams = {
        'team1': {
            name: 'Team Alpha',
            project: 'AI Development',
            members: '5',
            leader: 'Alice',
            leaves: '5',
            salary: '$5000'
        },
        'team2': {
            name: 'Team Beta',
            project: 'Web Applications',
            members: '4',
            leader: 'Bob',
            leaves: '3',
            salary: '$4000'
        },
        'team3': {
            name: 'Team Gamma',
            project: 'Mobile Apps',
            members: '6',
            leader: 'Charlie',
            leaves: '4',
            salary: '$4500'
        },
        'team4': {
            name: 'Team Delta',
            project: 'Cybersecurity',
            members: '3',
            leader: 'David',
            leaves: '2',
            salary: '$3500'
        }
    };

    const team = teams[teamId];
    if (team) {
        document.getElementById('team-details').innerHTML = `
            <p>Name: ${team.name}</p>
            <p>Project: ${team.project}</p>
            <p>Members: ${team.members}</p>
            <p>Leader: ${team.leader}</p>
            <p>Leaves: ${team.leaves}</p>
            <p>Salary: ${team.salary}</p>
        `;
        document.getElementById('team-info').style.display = 'block';
    }
}

function showInterviewDetails(date) {
    const details = {
        '2024-09-07': { time: '10:00 AM', venue: 'Conference Room A' },
        '2024-09-15': { time: '11:00 AM', venue: 'Conference Room B' },
        '2024-09-28': { time: '09:00 AM', venue: 'Conference Room C' }
    };
    
    const detail = details[date];
    if (detail) {
        document.getElementById('interview-date').textContent = date;
        document.getElementById('interview-time').textContent = detail.time;
        document.getElementById('interview-venue').textContent = detail.venue;
        document.getElementById('interview-details').style.display = 'block';
    }
}
