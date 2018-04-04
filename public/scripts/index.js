const palette = [
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false },
  { color: '#FFF', locked: false }
];

const generateHexCode = () => {
  const chars = '0123456789ABCDEF';
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
    hexCode += chars[Math.floor(Math.random() * 16)];
  }
  return hexCode;
};

const generatePalette = (blocks = palette) => {
  blocks.forEach((block, index) => {
    if (block.locked === false) {
      const hexCode = generateHexCode();
      block.color = hexCode;
      $(`.block-${index}`).css('background-color', hexCode);
      $(`.block-${index}-hex`).text(hexCode);
    }
  });
};

const renderSavedPalette = () => {
  fetch('/api/v1/palettes/:id')
    .then(response => resonse.json())
    .then(console.log)
}

const lockColor = ({ target }) => {
  palette[target.id].locked = !palette[target.id].locked;
};

const createProject = e => {
  e.preventDefault();
  const name = $('#create-project-input').val();

  postData('api/v1/projects', { name });
  getProjectOptions();
};

const getProjectOptions = () => {
  fetch('/api/v1/projects')
    .then(response => response.json())
    .then(renderProjectOptions)
    .catch(error => console.log(error));
};

const renderProjectOptions = projects => {
  const dropDown = $('#project-select');
  dropDown.empty();
  projects.forEach(project => {
    dropDown.append(
      `<option value=${project.id}>${project.name}</option>`
    );
  });
};

const savePalette = e => {
  e.preventDefault();
  const project = $('#project-select').val();
  const paletteName = $('#palette-name').val();
  const savedPalette = {
    name: paletteName,
    project_id: project,
    palette
  };

  postData('/api/v1/palettes', savedPalette);
};

const postData = (url, body) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

$(document).keyup(e => {
  if (e.which === 32 && e.target === document.body) {
    generatePalette();
  }
});

$('#create-project-button').on('click', createProject);
$('#save-palette-button').on('click', savePalette);
$('.lock-icon').on('click', lockColor);
$(document).ready(() => {
  generatePalette();
  getProjectOptions();
});
