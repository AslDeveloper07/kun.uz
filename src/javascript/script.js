   document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('switch');
    const body = document.body;

    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            localStorage.setItem('theme', 'light');
        }
    }

    // Check saved preference or prefer color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        toggleSwitch.checked = true;
        setTheme(true);
    }

    // Toggle event
    toggleSwitch.addEventListener('change', function(e) {
        setTheme(e.target.checked);
    });

    // Watch for system color scheme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
            toggleSwitch.checked = e.matches;
        }
    });
});