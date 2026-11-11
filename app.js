const routeSteps = [
  {
    floor: 'LEVEL 1',
    kicker: 'START HERE',
    title: 'Find the elevators',
    description: 'From the main lobby, walk toward the information desk. The elevators are just beyond it.',
    landmark: 'Main lobby'
  },
  {
    floor: 'LEVEL 2',
    kicker: 'GO TO LEVEL 2',
    title: 'Take the elevator up',
    description: 'Take an elevator to Level 2. When you exit, turn right toward the East Outpatient Wing.',
    landmark: 'Level 2 elevators'
  },
  {
    floor: 'LEVEL 2',
    kicker: 'ALMOST THERE',
    title: 'Continue to Neurology',
    description: 'Follow the Neurosciences signs to room 238. Ask the reception desk if you need help finding the room.',
    landmark: 'East Outpatient Wing'
  }
];

const destinationScreen = document.querySelector('#destination-screen');
const routeScreen = document.querySelector('#route-screen');
const startRouteButton = document.querySelector('#start-route');
const backToDestinationsButton = document.querySelector('#back-to-destinations');
const previousStepButton = document.querySelector('#previous-step');
const nextStepButton = document.querySelector('#next-step');
const stepCount = document.querySelector('#step-count');
const stepFloor = document.querySelector('#step-floor');
const progressFill = document.querySelector('#progress-fill');
const stepNumber = document.querySelector('#step-number');
const stepKicker = document.querySelector('#step-kicker');
const stepTitle = document.querySelector('#step-title');
const stepDescription = document.querySelector('#step-description');
const stepLandmark = document.querySelector('#step-landmark');
let currentStep = 0;

function renderStep() {
  const step = routeSteps[currentStep];
  stepCount.textContent = `Step ${currentStep + 1} of ${routeSteps.length}`;
  stepFloor.textContent = step.floor;
  progressFill.style.width = `${((currentStep + 1) / routeSteps.length) * 100}%`;
  stepNumber.textContent = String(currentStep + 1).padStart(2, '0');
  stepKicker.textContent = step.kicker;
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;
  stepLandmark.textContent = step.landmark;
  previousStepButton.disabled = currentStep === 0;

  const isLastStep = currentStep === routeSteps.length - 1;
  nextStepButton.innerHTML = isLastStep ? 'Finish route <span aria-hidden="true">&#10003;</span>' : 'Next step <span aria-hidden="true">&#8594;</span>';
}

function showDestinations() {
  routeScreen.hidden = true;
  destinationScreen.hidden = false;
  currentStep = 0;
}

startRouteButton.addEventListener('click', () => {
  destinationScreen.hidden = true;
  routeScreen.hidden = false;
  currentStep = 0;
  renderStep();
  backToDestinationsButton.focus();
});

backToDestinationsButton.addEventListener('click', showDestinations);
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
    showDestinations();
    startRouteButton.focus();
  }
});
