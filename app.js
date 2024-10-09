
const users = {
    user: { password: 'userpass', type: 'user', name: 'Ravi Kumar' },
    admin: { password: 'adminpass', type: 'admin', name: 'Admin User' }
};


const vacancies = [
    { id: 1, title: 'Frontend Developer', description: 'Experienced in React, HTML, and CSS.' },
    { id: 2, title: 'Backend Developer', description: 'Proficient in Node.js, Express, and MongoDB.' },
    { id: 3, title: 'UI/UX Designer', description: 'Skilled in Figma and Adobe XD.' },
    { id: 4, title: 'Full Stack Developer', description: 'Versatile in both frontend and backend technologies.' }
];

const teams = [
    { id: 1, name: 'Team Alpha', project: 'AI Development', members: 5 },
    { id: 2, name: 'Team Beta', project: 'Web Applications', members: 4 },
    { id: 3, name: 'Team Gamma', project: 'Mobile Apps', members: 6 },
    { id: 4, name: 'Team Delta', project: 'Cybersecurity', members: 3 }
];


let applications = [];
let currentUser = null;

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        currentUser = { ...users[username], username };
        document.getElementById('login-container').style.display = 'none';
        if (users[username].type === 'user') {
            showUserDashboard();
        } else {
            showAdminDashboard();
        }
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

function showUserDashboard() {
    const dashboard = document.getElementById('user-dashboard');
    dashboard.style.display = 'block';
    
    
    const existingNav = document.querySelector('.user-nav');
    if (existingNav) {
        existingNav.remove();
    }

   
    document.getElementById('user-content').innerHTML = '';
    
    
    const nav = document.createElement('div');
    nav.className = 'user-nav';
    nav.innerHTML = `
        <button class="btn-primary" onclick="showUserProfile()">My Profile</button>
        <button class="btn-primary" onclick="showUserApplications()">My Applications</button>
        <button class="btn-primary" onclick="showAvailableVacancies()">Available Vacancies</button>
        <button class="logout-btn" onclick="logout()">Logout</button>
    `;
    dashboard.insertBefore(nav, dashboard.firstChild);
    
    showUserProfile();
}

function showUserProfile() {
    const content = document.getElementById('user-content');
    content.innerHTML = `
        <h3>Welcome, ${currentUser.name}</h3>
        <p>Username: ${currentUser.username}</p>
        <p>Account Type: ${currentUser.type}</p>
    `;
}

function showUserApplications() {
    const content = document.getElementById('user-content');
    content.innerHTML = '<h3>My Applications</h3>';
    const userApplications = applications.filter(app => app.username === currentUser.username);

    if (userApplications.length === 0) {
        content.innerHTML += '<p>You haven\'t submitted any applications yet.</p>';
    } else {
        userApplications.forEach(app => {
            content.innerHTML += `
                <div class="application-card">
                    <h4>${app.vacancy}</h4>
                    <p>Status: ${app.status}</p>
                    <p>Submitted on: ${app.date}</p>
                </div>
            `;
        });
    }
}

function showAvailableVacancies() {
    const content = document.getElementById('user-content');
    content.innerHTML = '<h3>Available Vacancies</h3>';
    const container = document.createElement('div');
    container.id = 'vacancies-container';

    vacancies.forEach(vacancy => {
        const card = document.createElement('div');
        card.className = 'vacancy-card';
        card.innerHTML = `
            <h3>${vacancy.title}</h3>
            <p>${vacancy.description}</p>
            <button class="btn-primary" onclick="showApplicationForm(${vacancy.id})">Apply Now</button>
        `;
        container.appendChild(card);
    });

    content.appendChild(container);
}

function showApplicationForm(vacancyId) {
    document.getElementById('user-dashboard').style.display = 'none';
    document.getElementById('application-form').style.display = 'block';
}

function backToUserDashboard() {
    document.getElementById('application-form').style.display = 'none';
    showUserDashboard();
}

function showAdminDashboard() {
    const dashboard = document.getElementById('admin-dashboard');
    dashboard.style.display = 'block';

    
    const existingNav = document.querySelector('.admin-nav');
    if (existingNav) {
        existingNav.remove();
    }

    
    document.getElementById('admin-content').innerHTML = '';

    
    const nav = document.createElement('div');
    nav.className = 'admin-nav';
    nav.innerHTML = `
        <button class="btn-primary" onclick="showVacancies()">Manage Vacancies</button>
        <button class="btn-primary" onclick="showTeams()">Manage Teams</button>
        <button class="btn-primary" onclick="showApplications()">View Applications</button>
        <button class="btn-primary" onclick="showInterviewSchedule()">Interview Schedule</button>
        <button class="logout-btn" onclick="logout()">Logout</button>
    `;
    dashboard.insertBefore(nav, dashboard.firstChild);

    showVacancies(); 
}

function showVacancies() {
    const content = document.getElementById('admin-content');
    content.innerHTML = '<h3>Manage Vacancies</h3>';
    vacancies.forEach(vacancy => {
        content.innerHTML += `
            <div class="vacancy-card">
                <h4>${vacancy.title}</h4>
                <p>${vacancy.description}</p>
                <button class="btn-primary" onclick="editVacancy(${vacancy.id})">Edit</button>
                <button class="btn-danger" onclick="deleteVacancy(${vacancy.id})">Delete</button>
            </div>
        `;
    });
    content.innerHTML += '<button class="admin-action-btn" onclick="addVacancy()">Add New Vacancy</button>';
}

function showTeams() {
    const content = document.getElementById('admin-content');
    content.innerHTML = '<h3>Manage Teams</h3>';
    teams.forEach(team => {
        content.innerHTML += `
            <div class="team-card">
                <h4>${team.name}</h4>
                <p>Project: ${team.project}</p>
                <p>Members: ${team.members}</p>
                <button class="btn-primary" onclick="editTeam(${team.id})">Edit</button>
                <button class="btn-danger" onclick="deleteTeam(${team.id})">Delete</button>
            </div>
        `;
    });
    content.innerHTML += '<button class="admin-action-btn" onclick="addTeam()">Add New Team</button>';
}

function showApplications() {
    const content = document.getElementById('admin-content');
    content.innerHTML = '<h3>View Applications</h3>';
    if (applications.length === 0) {
        content.innerHTML += '<p>No applications submitted yet.</p>';
    } else {
        applications.forEach(app => {
            content.innerHTML += `
                <div class="application-card">
                    <h4>${app.vacancy}</h4>
                    <p>Applicant: ${app.name}</p>
                    <p>Status: ${app.status}</p>
                    <p>Submitted on: ${app.date}</p>
                    <button class="btn-primary" onclick="viewApplicationDetails(${app.id})">View Details</button>
                </div>
            `;
        });
    }
}

function showInterviewSchedule() {
    const content = document.getElementById('admin-content');
    content.innerHTML = '<h3>Interview Schedule</h3>';
    const schedule = [
        { date: '2024-10-10', time: '10:00 AM', venue: 'Office HQ', vacancy: 'Frontend Developer' },
        { date: '2024-10-12', time: '2:00 PM', venue: 'Office HQ', vacancy: 'Backend Developer' },
        { date: '2024-10-15', time: '11:00 AM', venue: 'Remote', vacancy: 'Full Stack Developer' }
    ];

    schedule.forEach(interview => {
        content.innerHTML += `
            <div class="interview-card">
                <h4>${interview.vacancy}</h4>
                <p>Date: ${interview.date}</p>
                <p>Time: ${interview.time}</p>
                <p>Venue: ${interview.venue}</p>
            </div>
        `;
    });
}


function addVacancy() {
    const vacancyTitle = prompt('Enter vacancy title:');
    const vacancyDescription = prompt('Enter vacancy description:');
    const newVacancy = {
        id: vacancies.length + 1,
        title: vacancyTitle,
        description: vacancyDescription
    };
    vacancies.push(newVacancy);
    showVacancies();
}

function editVacancy(vacancyId) {
    const vacancy = vacancies.find(v => v.id === vacancyId);
    const newTitle = prompt('Enter new title:', vacancy.title);
    const newDescription = prompt('Enter new description:', vacancy.description);
    vacancy.title = newTitle;
    vacancy.description = newDescription;
    showVacancies();
}

function deleteVacancy(vacancyId) {
    const index = vacancies.findIndex(v => v.id === vacancyId);
    vacancies.splice(index, 1);
    showVacancies();
}


function addTeam() {
    const teamName = prompt('Enter team name:');
    const teamProject = prompt('Enter project name:');
    const newTeam = {
        id: teams.length + 1,
        name: teamName,
        project: teamProject,
        members: 0
    };
    teams.push(newTeam);
    showTeams();
}

function editTeam(teamId) {
    const team = teams.find(t => t.id === teamId);
    const newName = prompt('Enter new team name:', team.name);
    const newProject = prompt('Enter new project name:', team.project);
    team.name = newName;
    team.project = newProject;
    showTeams();
}

function deleteTeam(teamId) {
    const index = teams.findIndex(t => t.id === teamId);
    teams.splice(index, 1);
    showTeams();
}

function viewApplicationDetails(applicationId) {
    const app = applications.find(a => a.id === applicationId);
    alert(`
        Vacancy: ${app.vacancy}
        Applicant Name: ${app.name}
        Status: ${app.status}
        Submitted on: ${app.date}
    `);
}

function logout() {
    currentUser = null;
    document.getElementById('user-dashboard').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
   
    document.querySelector('.user-nav')?.remove();
    document.querySelector('.admin-nav')?.remove();
    document.getElementById('user-content').innerHTML = '';
    document.getElementById('admin-content').innerHTML = '';
}
