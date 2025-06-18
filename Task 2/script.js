const addBtn = document.getElementById('addBtn');
const popup = document.getElementById('popup');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const noteInput = document.getElementById('noteInput');
const noteContainer = document.getElementById('noteContainer');

addBtn.addEventListener('click', () => {
  popup.classList.remove('hidden');
  noteInput.value = '';
  noteInput.focus();
});

saveBtn.addEventListener('click', () => {
  const noteText = noteInput.value.trim();
  if (noteText !== '') {
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = noteText;
    noteContainer.appendChild(note);
  }
  popup.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

 