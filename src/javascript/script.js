   export default document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.getElementById('switch');
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const globeIcon = document.querySelector('.ri-global-line');
  const languageLabel = document.querySelector('.main');
  const burgerSpans = document.querySelectorAll('.burger span');

  function setTheme(isDark) {
    if (isDark) {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');

      // body va navbar fonlarini o'zgartirish
      body.style.backgroundColor = '#1A1B1D';
      if (navbar) navbar.style.backgroundColor = '#1E242D';

      // text ranglarini oq qilish
      body.style.color = '#ffffff';
      if (globeIcon) globeIcon.style.color = '#ffffff';
      if (languageLabel) languageLabel.style.color = '#ffffff';
      burgerSpans.forEach(span => (span.style.backgroundColor = '#ffffff'));
    } else {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      localStorage.setItem('theme', 'light');

      // Default holatga qaytarish
      body.style.backgroundColor = '#ffffff';
      if (navbar) navbar.style.backgroundColor = '#ffffff';

      body.style.color = '#000000';
      if (globeIcon) globeIcon.style.color = '#000000';
      if (languageLabel) languageLabel.style.color = '#000000';
      burgerSpans.forEach(span => (span.style.backgroundColor = '#000000'));
    }
  }

  // Saqlangan yoki avtomatik tema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    toggleSwitch.checked = true;
    setTheme(true);
  }

  toggleSwitch.addEventListener('change', function (e) {
    setTheme(e.target.checked);
  });

  // Operatsion tizim dark o‘zgarishini eshitish
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
      toggleSwitch.checked = e.matches;
    }
  });
});
