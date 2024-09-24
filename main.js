import { candidatesByCountry } from './candidates.js';

const recentWinners = [
    {
        name: 'Candidate C',
        country: 'UK',
        img: 'images/Keir.jpg',
        news: 'Promised to improve healthcare and education.'
    },
    {
        name: 'Candidate A',
        country: 'Russia',
        img: 'images/Halla.jpg',
        news: 'Recently won the 2023 elections with a historic margin.'
    },
    {
        name: 'Candidate E',
        country: 'India',
        img: 'images/Jair.jpg',
        news: 'Focused on economic reforms and digitalization.'
    },
];

// Function to show the landing page
function showLandingPage() {
    const recentWinnersList = recentWinners.map(winner => `
        <div class="candidate-card">
            <img src="${winner.img}" alt="${winner.name}" class="img-fluid candidate-image">
            <h5>${winner.name} - ${winner.country}</h5>
            <p>${winner.news}</p>
        </div>
    `).join('');

    document.querySelector('#app').innerHTML = `
       <div class="logo-container">
            <img src="images/logo.jpg" alt="Logo" style="width: 130px;" class="rounded-pill img-fluid">
        </div>
        <br>
        <h1 class="text-cent">Welcome To MOCK BALLOT</h1>
        <div class="recent-winners">
            <h2>Recently Won Candidates</h2>
            <div class="candidate-row">${recentWinnersList}</div>
            <button id="seeMore" class="btn btn-link">See More Candidates</button>
        </div>
        <div id="top-right-buttons">
            <button id="subscribe" class="text-primary">Subscribe Version</button><br><br>
            <button id="free" class="text-danger">Free Version</button>
        </div>
    `;

    document.querySelector('#subscribe').addEventListener('click', () => {
        showCountrySelection(true);
    });

    document.querySelector('#free').addEventListener('click', () => {
        showCountrySelection(false);
    });
}

// Function to show country selection
function showCountrySelection(isSubscribed) {
    const modeText = isSubscribed ? 'Subscribe Version' : 'Free Version';
    const countries = ['USA', 'JAPAN', 'India', 'Canada'];
    const countryOptions = countries.map(country => `<option value="${country}">${country}</option>`).join('');

    document.querySelector('#app').innerHTML = `
        <h1 class="text-center">${modeText}</h1>
        <select id="countrySelect" class="form-control mt-3">
            <option value="">Select a country</option>
            ${countryOptions}
        </select>
        <button id="nextBtn" class="btn btn-primary mt-3">Next</button>
        <button id="backBtn" class="btn btn-secondary mt-3">Back</button>
    `;

    document.querySelector('#nextBtn').addEventListener('click', () => {
        const selectedCountry = document.querySelector('#countrySelect').value;
        if (selectedCountry) {
            showCandidates(selectedCountry, isSubscribed);
        } else {
            alert('Please select a country');
        }
    });

    document.querySelector('#backBtn').addEventListener('click', () => {
        showLandingPage();
    });
}

// Function to show candidates based on selected country
function showCandidates(country, isSubscribed) {
    const candidates = candidatesByCountry[country] || [];
    
    const candidatesList = candidates.map(candidate => `
        <div class="candidate-card">
            <img src="${candidate.img}" alt="${candidate.name}" class="img-fluid candidate-image">
            <h5>${candidate.name}</h5>
            <p>${candidate.details}</p>
            <button class="btn btn-success vote-btn" data-name="${candidate.name}">Vote</button>
        </div>
    `).join('');

    document.querySelector('#app').innerHTML = `
        <h1 class="text-center">${country} Candidates</h1>
        <div class="candidate-row">${candidatesList}</div>
        <div class="text-center mt-4">
            <button id="backBtn" class="btn btn-secondary">Back</button>
        </div>
    `;

    document.querySelectorAll('.vote-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const candidateName = e.target.getAttribute('data-name');
            alert(`You voted for ${candidateName}!`);
        });
    });

    document.querySelector('#backBtn').addEventListener('click', () => {
        showCountrySelection(isSubscribed);
    });
}

// Show the landing page when the app loads
showLandingPage();
