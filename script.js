// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const mealForm = document.getElementById('mealForm');
  const submitBtn = document.getElementById('submitBtn');
  const editBtn = document.getElementById('editBtn');
  const resultSection = document.getElementById('result');

  const breakfastSelect = document.getElementById('breakfast');
  const lunchSelect = document.getElementById('lunch');
  const dinnerSelect = document.getElementById('dinner');

  const breakfastError = document.getElementById('breakfastError');
  const lunchError = document.getElementById('lunchError');
  const dinnerError = document.getElementById('dinnerError');

  const resultBreakfast = document.getElementById('resultBreakfast');
  const resultLunch = document.getElementById('resultLunch');
  const resultDinner = document.getElementById('resultDinner');

  // Real-time validation feedback
  [breakfastSelect, lunchSelect, dinnerSelect].forEach(select => {
    select.addEventListener('change', () => {
      validateField(select);
    });
  });

  // Validate a select field
  function validateField(field) {
    const errorSpan = document.getElementById(field.id + 'Error');
    if (!field.value.trim()) {
      errorSpan.textContent = "Please make a selection!";
      return false;
    } else {
      errorSpan.textContent = "";
      return true;
    }
  }

  // Form submit handler
  mealForm.addEventListener('submit', event => {
    event.preventDefault();

    const isBreakfastValid = validateField(breakfastSelect);
    const isLunchValid = validateField(lunchSelect);
    const isDinnerValid = validateField(dinnerSelect);

    if (isBreakfastValid && isLunchValid && isDinnerValid) {
      // Show result
      resultBreakfast.textContent = breakfastSelect.value;
      resultLunch.textContent = lunchSelect.value;
      resultDinner.textContent = dinnerSelect.value;

      mealForm.hidden = true;
      resultSection.hidden = false;
    }
  });

  // Edit button: show form again
  editBtn.addEventListener('click', () => {
    resultSection.hidden = true;
    mealForm.hidden = false;
  });

  // Bonus: Secret double-click on header changes background color randomly
  const header = document.querySelector('header h1');
  header.addEventListener('dblclick', () => {
    const colors = ['#f39c12', '#e74c3c', '#8e44ad', '#27ae60', '#2980b9'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  });

  // Gallery hover effect updates caption
  const galleryImages = document.querySelectorAll('.gallery-img');
  const galleryCaption = document.getElementById('galleryCaption');

  galleryImages.forEach(img => {
    img.addEventListener('mouseover', () => {
      galleryCaption.textContent = img.dataset.caption;
    });
    img.addEventListener('mouseout', () => {
      galleryCaption.textContent = 'Hover over an image to see its name';
    });
  });

  // Keypress detection: if user presses 'r', reset form
  document.addEventListener('keypress', e => {
    if (e.key.toLowerCase() === 'r') {
      if (confirm('Reset your meal plan?')) {
        mealForm.reset();
        resultSection.hidden = true;
        mealForm.hidden = false;
        [breakfastError, lunchError, dinnerError].forEach(span => span.textContent = '');
      }
    }
  });
});
