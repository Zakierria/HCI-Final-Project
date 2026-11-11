const destinations = [
  { name: 'Cardiology', department: 'Heart & Vascular', room: '214', floor: 2, wing: 'North Care Wing', position: { left: '50%', top: '26%' } },
  { name: 'Diagnostic Imaging', department: 'Imaging & Radiology', room: '108', floor: 1, wing: 'Imaging Wing', position: { left: '51%', top: '76%' } },
  { name: 'Emergency Department', department: 'Emergency Care', room: 'ED', floor: 1, wing: 'East Outpatient Wing', position: { left: '78%', top: '42%' } },
  { name: 'Family Medicine', department: 'Primary Care', room: '126', floor: 1, wing: 'East Outpatient Wing', position: { left: '73%', top: '51%' } },
  { name: 'Laboratory', department: 'Lab Services', room: '142', floor: 1, wing: 'East Outpatient Wing', position: { left: '77%', top: '61%' } },
  { name: 'Maternity & Birth Center', department: 'Women & Infants', room: '322', floor: 3, wing: 'North Care Wing', position: { left: '51%', top: '26%' } },
  { name: 'Neurology', department: 'Neurosciences', room: '238', floor: 2, wing: 'East Outpatient Wing', position: { left: '77%', top: '54%' } },
  { name: 'Pediatrics', department: 'Children’s Health', room: '205', floor: 2, wing: 'West Care Wing', position: { left: '22%', top: '49%' } },
  { name: 'Pharmacy', department: 'Visitor Services', room: '116', floor: 1, wing: 'Main Lobby', position: { left: '20%', top: '64%' } },
  { name: 'Physical Therapy', department: 'Rehabilitation', room: '306', floor: 3, wing: 'South Care Wing', position: { left: '51%', top: '75%' } },
  { name: 'Surgery Check-in', department: 'Surgical Services', room: '248', floor: 2, wing: 'East Outpatient Wing', position: { left: '77%', top: '54%' } }
];

const searchInput = document.querySelector('#destination-search');
const clearButton = document.querySelector('#clear-search');
const departmentFilter = document.querySelector('#department-filter');
const destinationList = document.querySelector('#destination-list');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const roomMarker = document.querySelector('#room-marker');
const map = document.querySelector('#map');
const mapTitle = document.querySelector('#map-title');
const selectionName = document.querySelector('#selection-name');
const selectionDetail = document.querySelector('#selection-detail');
const selectionRoom = document.querySelector('#selection-room');
let activeFloor = 1;
let selectedRoom = null;

const departments = [...new Set(destinations.map((destination) => destination.department))].sort();
for (const department of departments) {
  const option = document.createElement('option');
  option.value = department;
  option.textContent = department;
  departmentFilter.append(option);
}

function renderDestinations() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const department = departmentFilter.value;
  const matches = destinations.filter((destination) => {
    const searchable = `${destination.name} ${destination.department} ${destination.room} ${destination.wing}`.toLocaleLowerCase();
    return searchable.includes(query) && (department === 'all' || destination.department === department);
  });

  destinationList.replaceChildren();
  for (const destination of matches) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'destination-item';
    button.setAttribute('aria-pressed', String(selectedRoom === destination));

    const details = document.createElement('span');
    const name = document.createElement('span');
    name.className = 'destination-name';
    name.textContent = destination.name;
    const meta = document.createElement('span');
    meta.className = 'destination-meta';
    meta.textContent = `${destination.department} · Level ${destination.floor}`;
    details.append(name, meta);

    const room = document.createElement('span');
    room.className = 'destination-room';
    room.textContent = destination.room;
    button.append(details, room);
    button.addEventListener('click', () => selectDestination(destination));
    destinationList.append(button);
  }

  resultCount.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'}`;
  emptyState.hidden = matches.length > 0;
  clearButton.hidden = searchInput.value.length === 0;
}

function selectDestination(destination) {
  selectedRoom = destination;
  if (activeFloor !== destination.floor) setFloor(destination.floor);
  roomMarker.hidden = false;
  roomMarker.style.left = destination.position.left;
  roomMarker.style.top = destination.position.top;
  roomMarker.querySelector('.marker-label').textContent = destination.name;
  map.setAttribute('aria-label', `Schematic map of level ${destination.floor}, selected location ${destination.name}, room ${destination.room}`);
  selectionName.textContent = destination.name;
  selectionDetail.textContent = `${destination.wing} · Level ${destination.floor}`;
  selectionRoom.textContent = `Room ${destination.room}`;
  selectionRoom.hidden = false;
  renderDestinations();
}

function setFloor(floor) {
  activeFloor = floor;
  const floorNames = { 1: 'Main lobby', 2: 'Inpatient care', 3: 'Specialty care' };
  mapTitle.innerHTML = `Level ${floor} <span>·</span> ${floorNames[floor]}`;
  map.setAttribute('aria-label', `Schematic map of level ${floor}`);
  document.querySelectorAll('.floor-switch button').forEach((button) => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.floor) === floor));
  });
  if (!selectedRoom || selectedRoom.floor !== floor) {
    roomMarker.hidden = true;
    selectionName.textContent = 'Choose a room from the list';
    selectionDetail.textContent = 'Its location will appear on the floor map.';
    selectionRoom.hidden = true;
    selectedRoom = null;
  }
  renderDestinations();
}

searchInput.addEventListener('input', renderDestinations);
departmentFilter.addEventListener('change', renderDestinations);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
  renderDestinations();
});
document.querySelectorAll('.floor-switch button').forEach((button) => {
  button.addEventListener('click', () => setFloor(Number(button.dataset.floor)));
});

renderDestinations();