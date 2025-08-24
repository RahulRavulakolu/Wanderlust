// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


 // Horizontal scroll functionality
const filtersContainer = document.getElementById('filtersContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

const scrollAmount = 200;

function updateScrollButtons() {
    const { scrollLeft, scrollWidth, clientWidth } = filtersContainer;
    scrollLeftBtn.disabled = scrollLeft <= 0;
    scrollRightBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 1;
}

scrollLeftBtn.addEventListener('click', () => {
  filtersContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
  filtersContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

filtersContainer.addEventListener('scroll', updateScrollButtons);
window.addEventListener('resize', updateScrollButtons);

// Initialize scroll buttons
updateScrollButtons();

// Tax toggle functionality
function toggleTaxInfo(switchElement) {
  const taxInfo = document.querySelectorAll('#tax-info');
  taxInfo.forEach(info => {
      info.style.display = switchElement.checked ? 'inline' :'none' ;
  });
}

// Desktop tax switch
const desktopTaxSwitch = document.getElementById('switchCheckDefault');
desktopTaxSwitch.addEventListener('change', () => {
  toggleTaxInfo(desktopTaxSwitch);
  // Sync with mobile switch
  document.getElementById('mobileSwitchCheckDefault').checked = desktopTaxSwitch.checked;
});

// Mobile tax switch
const mobileTaxSwitch = document.getElementById('mobileSwitchCheckDefault');
mobileTaxSwitch.addEventListener('change', () => {
  toggleTaxInfo(mobileTaxSwitch);
  // Sync with desktop switch
  document.getElementById('switchCheckDefault').checked = mobileTaxSwitch.checked;
});


// Touch/swipe support for mobile
let startX = 0;
let scrollStart = 0;

filtersContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  scrollStart = filtersContainer.scrollLeft;
});

filtersContainer.addEventListener('touchmove', (e) => {
  if (!startX) return;
  
  const currentX = e.touches[0].clientX;
  const diffX = startX - currentX;
  filtersContainer.scrollLeft = scrollStart + diffX;
});

filtersContainer.addEventListener('touchend', () => {
  startX = 0;
  scrollStart = 0;
});

