// ✅ 1. Checkbox state persistence & green highlight
document.querySelectorAll('.card-item input[type="checkbox"]').forEach(box => {
    const id = box.id;
    const parent = box.closest('.card-item');
    box.checked = localStorage.getItem(id) === 'true';
  
    if (box.checked) {
      parent.classList.add('checked');
    }
  
    box.addEventListener('change', () => {
      localStorage.setItem(id, box.checked);
      parent.classList.toggle('checked', box.checked);
    });
  });
  
  // ✅ 2. Select All / Clear All functionality
  const checkboxes = document.querySelectorAll('.card-item input[type="checkbox"]');
  
  document.getElementById('select-all').addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
      checkbox.closest('.card-item').classList.add('checked');
      localStorage.setItem(checkbox.id, true);
    });
  });
  
  document.getElementById('clear-all').addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      checkbox.closest('.card-item').classList.remove('checked');
      localStorage.setItem(checkbox.id, false);
    });
  });
  
  // ✅ 3. Deck suggestion with save + delete
  const suggestionForm = document.getElementById('suggestion-form');
  const suggestionInput = document.getElementById('suggestion-input');
  const suggestionList = document.getElementById('suggestion-list');
  
  // Load saved suggestions on page load
  window.addEventListener('DOMContentLoaded', () => {
    const suggestions = JSON.parse(localStorage.getItem('deckSuggestions')) || [];
    suggestions.forEach(renderSuggestion);
  });
  
  suggestionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = suggestionInput.value.trim();
    if (text) {
      renderSuggestion(text);
      saveSuggestion(text);
      suggestionInput.value = '';
    }
  });
  
  function renderSuggestion(text) {
    const div = document.createElement('div');
    div.classList.add('suggestion-item');
  
    const p = document.createElement('p');
    p.textContent = `• ${text}`;
  
    const del = document.createElement('button');
    del.textContent = 'x';
    del.title = 'Delete this suggestion';
    del.style.marginLeft = '10px';
    del.style.cursor = 'pointer';
  
    del.addEventListener('click', () => {
      div.remove();
      removeSuggestion(text);
    });
  
    div.appendChild(p);
    div.appendChild(del);
    suggestionList.appendChild(div);
  }
  
  function saveSuggestion(text) {
    const suggestions = JSON.parse(localStorage.getItem('deckSuggestions')) || [];
    if (!suggestions.includes(text)) {
      suggestions.push(text);
      localStorage.setItem('deckSuggestions', JSON.stringify(suggestions));
    }
  }
  
  function removeSuggestion(text) {
    let suggestions = JSON.parse(localStorage.getItem('deckSuggestions')) || [];
    suggestions = suggestions.filter(item => item !== text);
    localStorage.setItem('deckSuggestions', JSON.stringify(suggestions));
  }
  