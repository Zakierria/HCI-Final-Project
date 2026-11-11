const routeSteps = [
  {
    title: 'Take a right and get on the elevator to floor 3.',
    description: 'Follow the signs for the elevators and select Level 3.'
  },
  {
    title: 'Take a left.',
    description: 'When you exit the elevator on Level 3, turn left and continue down the hallway.'
  },
  {
    title: 'Take a right.',
    description: 'Turn right at the end of the hallway. The Neurology front desk is just ahead.'
  }
];

const homeScreen = document.querySelector('#home-screen');
const departmentsScreen = document.querySelector('#departments-screen');
const neurologyScreen = document.querySelector('#neurology-screen');
const routeScreen = document.querySelector('#route-screen');
const arrivalScreen = document.querySelector('#arrival-screen');
const routeDialog = document.querySelector('#route-dialog');
const checkinScreen = document.querySelector('#checkin-screen');
const directionsScreen = document.querySelector('#directions-screen');
const directionCount = document.querySelector('#step-count');
const progressFill = document.querySelector('#progress-fill');
const stepNumber = document.querySelector('#step-number');
const stepTitle = document.querySelector('#step-title');
const stepDescription = document.querySelector('#step-description');
const previousStepButton = document.querySelector('#previous-step');
const nextStepButton = document.querySelector('#next-step');
let currentStep = 0;

const screens = [homeScreen, departmentsScreen, neurologyScreen, routeScreen, arrivalScreen];

function showScreen(activeScreen) {
  screens.forEach((screen) => {
    screen.hidden = screen !== activeScreen;
  });
}

function renderStep() {
  const step = routeSteps[currentStep];
  directionCount.textContent = `Step ${currentStep + 1} of ${routeSteps.length}`;
  progressFill.style.width = `${((currentStep + 1) / routeSteps.length) * 100}%`;
  stepNumber.textContent = String(currentStep + 1).padStart(2, '0');
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;
  previousStepButton.disabled = currentStep === 0;
  nextStepButton.innerHTML = currentStep === routeSteps.length - 1
    ? "I'm here"
    : 'Done, next step <span aria-hidden="true">&#8594;</span>';
}

function startRoute() {
  routeDialog.close();
  currentStep = 0;
  checkinScreen.hidden = false;
  directionsScreen.hidden = true;
  showScreen(routeScreen);
  document.querySelector('#checkin-button').focus();
}

document.querySelector('.brand').addEventListener('click', () => showScreen(homeScreen));
document.querySelector('#open-departments').addEventListener('click', () => showScreen(departmentsScreen));
document.querySelector('#departments-home').addEventListener('click', () => showScreen(homeScreen));
document.querySelector('[data-department="Neurology"]').addEventListener('click', () => showScreen(neurologyScreen));
document.querySelector('#detail-back').addEventListener('click', () => showScreen(departmentsScreen));
document.querySelector('#open-route-dialog').addEventListener('click', () => routeDialog.showModal());
document.querySelector('#cancel-route').addEventListener('click', () => routeDialog.close());
document.querySelector('#begin-route').addEventListener('click', startRoute);
document.querySelector('#exit-route').addEventListener('click', () => showScreen(neurologyScreen));

document.querySelector('#checkin-button').addEventListener('click', () => {
  currentStep = 0;
  renderStep();
  checkinScreen.hidden = true;
  directionsScreen.hidden = false;
  nextStepButton.focus();
});

previousStepButton.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep();
  }
});

nextStepButton.addEventListener('click', () => {
  if (currentStep < routeSteps.length - 1) {
    currentStep += 1;
    renderStep();
  } else {
    showScreen(arrivalScreen);
    document.querySelector('#done-button').focus();
  }
});

document.querySelector('#done-button').addEventListener('click', () => showScreen(homeScreen));
