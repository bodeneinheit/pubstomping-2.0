document.addEventListener('keydown', (ev) => {
    if (ev.keyCode === 115) {
        window.logoutAcc();
        setTimeout(() => {
            window.location = 'https://krunker.io'
        }, 100)
    }
});