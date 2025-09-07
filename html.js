const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

function pressKeyEffect(key) {
  buttons.forEach(btn => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (val === key || (key === 'Enter' && action === 'calculate') || (key === 'Backspace' && action === 'delete') || (key === 'Escape' && action === 'clear')) {
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 150);
    }
  });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
      display.value += value;
    } else if (action === 'clear') {
      display.value = '';
    } else if (action === 'delete') {
      display.value = display.value.slice(0, -1);
    } else if (action === 'calculate') {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    }
  });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Show animation on corresponding key
  pressKeyEffect(key);

  if (/[0-9+\-*/.]/.test(key)) {
    display.value += key;
  } else if (key === 'Enter') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    display.value = '';
  }
});
