const loginForm = document.querySelector('#login-form');
const visitorName = document.querySelector('#visitor-name');
const loginScreen = document.querySelector('#login-screen');
const homeScreen = document.querySelector('#home-screen');
const directionsScreen = document.querySelector('#directions-screen');
const homeTitle = document.querySelector('#home-title');
const noStairsOption = document.querySelector('#no-stairs');
const routePreview = document.querySelector('#route-preview');
const routeSteps = document.querySelector('#route-steps');

function showScreen(screen, heading) {
  [loginScreen, homeScreen, directionsScreen].forEach((item) => {
    item.hidden = item !== screen;
  });
  heading.focus();
}

function updateRoute() {
  const steps = noStairsOption.checked
    ? [
        'From the main lobby, walk past the information desk toward the central elevators.',
        'Take the elevator to Level 2.',
        'Exit the elevator, turn left, and follow the Radiology signs to check-in, room R214.'
      ]
    : [
        'From the main lobby, walk past the information desk toward the central corridor.',
        'Turn right and take the stairs to Level 2.',
        'At the top, turn left and follow the Radiology signs to check-in, room R214.'
      ];

  routePreview.textContent = noStairsOption.checked
    ? 'Main Lobby → elevator → Level 2 → Radiology'
    : 'Main Lobby → stairs → Level 2 → Radiology';
  routeSteps.replaceChildren();
  steps.forEach((step) => {
    const item = document.createElement('li');
    item.textContent = step;
    routeSteps.append(item);
  });
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = visitorName.value.trim();
  if (!name) return;
  homeTitle.textContent = `Welcome, ${name}`;
  showScreen(homeScreen, homeTitle);
});

noStairsOption.addEventListener('change', updateRoute);
document.querySelector('#directions-button').addEventListener('click', () => {
  updateRoute();
  showScreen(directionsScreen, document.querySelector('#directions-title'));
});
document.querySelector('#radiology-button').addEventListener('click', () => {
  updateRoute();
  showScreen(directionsScreen, document.querySelector('#directions-title'));
});
document.querySelector('#back-button').addEventListener('click', () => {
  showScreen(homeScreen, homeTitle);
});
document.querySelector('#sign-out').addEventListener('click', () => {
  loginForm.reset();
  homeTitle.textContent = 'Welcome';
  showScreen(loginScreen, document.querySelector('#login-title'));
});

updateRoute();