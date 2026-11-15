const routeSteps = [
  {
    title: 'Take a right and get on the elevator to floor 3.',
    description: 'Follow the signs for the elevators and select Level 3.',
    landmark: 'Elevator bank and its floor indicator',
    photos: [
      {
        src: 'images/elevator-img.jpg',
        alt: 'Open hospital elevator with floor buttons and nearby wayfinding signs',
        caption: 'Look for this elevator bank in the main lobby.'
      }
    ]
  },
  {
    title: 'Take a left.',
    description: 'When you exit the elevator on Level 3, turn left and continue down the hallway.',
    landmark: 'Level 3 marker beside the elevator doors',
    photos: [
      {
        src: 'images/floor_3.png.1400x1400.png',
        alt: 'Elevator bank on Level 3, marked by a large number 3 on the wall',
        caption: 'Look for the large Level 3 marker beside the elevators.'
      }
    ]
  },
  {
    title: 'Take a right.',
    description: 'Turn right at the end of the hallway. The Neurology front desk is just ahead.',
    landmark: 'Neurology sign, Room 326, and the reception desk',
    photos: [
      {
        src: 'images/blue-neurology-sign-arrow-hospital-260nw-2683712729.webp',
        alt: 'Blue Neurology sign with an arrow pointing right',
        caption: 'Follow the Neurology arrow sign.'
      },
      {
        src: 'images/ML_WaitingRoomChairs_blog_featured.jpg',
        alt: 'Seating in a hospital waiting room beside a reception counter',
        caption: 'Look for the reception area and waiting chairs near Neurology.'
      }
    ]
  }
];

const homeScreen = document.querySelector('#home-screen');
const departmentsScreen = document.querySelector('#departments-screen');
const neurologyScreen = document.querySelector('#neurology-screen');
const routeScreen = document.querySelector('#route-screen');
const arrivalScreen = document.querySelector('#arrival-screen');
const routeDialog = document.querySelector('#route-dialog');
const lostDialog = document.querySelector('#lost-dialog');
const checkinScreen = document.querySelector('#checkin-screen');
const directionsScreen = document.querySelector('#directions-screen');
const directionCount = document.querySelector('#step-count');
const progressFill = document.querySelector('#progress-fill');
const stepNumber = document.querySelector('#step-number');
const stepTitle = document.querySelector('#step-title');
const stepDescription = document.querySelector('#step-description');
const stepLandmark = document.querySelector('#step-landmark');
const landmarkPhotos = document.querySelector('#landmark-photos');
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
  stepLandmark.textContent = step.landmark;
  landmarkPhotos.replaceChildren();
  step.photos.forEach((photo) => {
    const figure = document.createElement('figure');
    figure.className = 'landmark-photo';

    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = photo.alt;

    const caption = document.createElement('figcaption');
    caption.textContent = photo.caption;

    figure.append(image, caption);
    landmarkPhotos.append(figure);
  });
  landmarkPhotos.hidden = step.photos.length === 0;
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
document.querySelector('#open-lost-dialog').addEventListener('click', () => lostDialog.showModal());
document.querySelector('#close-lost-dialog').addEventListener('click', () => lostDialog.close());

document.querySelector('#checkin-button').addEventListener('click', () => {
  currentStep = 0;
  renderStep();
  checkinScreen.hidden = true;
  directionsScreen.hidden = false;
  stepTitle.focus();
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
