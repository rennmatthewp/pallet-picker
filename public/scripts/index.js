const blocks = [
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

const generatePalette = () => {
  blocks.forEach((block, index) => {
    if (block.locked === false) {
      const hexCode = generateHexCode();
      block.color = hexCode;
      $(`.block-${index}`).css('background-color', hexCode);
      $(`.block-${index}-hex`).text(hexCode);
    }
  });
};

const lockColor = ({ target }) => {
  blocks[target.id].locked = !blocks[target.id].locked;
};

const createProject = e => {
  e.preventDefault();
  const projectName = $('#create-project-input').val();
  fetch('/api/v1/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: projectName })
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const getProjects = () => {
  fetch('/api/v1/projects')
    .then(response => response.json())
    .then(createProjectSelections)
    .catch(error => console.log(error));
};

const createProjectSelections = projects => {
  projects.forEach(project => {
    $('#project-select').append(
      `<option value=${project.id}>${project.name}</option>`
    );
  });
};

const savePalette = e => {
  e.preventDefault();
  const project = $('#project-select').val();
  const paletteName = $('#palette-name').val();
  const palette = {
    name: paletteName,
    project_id: project,
    palette: blocks
  };

  postData('/api/v1/palettes', palette)
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
    .catch(console.log);
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
  getProjects();
});
