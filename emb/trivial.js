if (history && "pushState" in history) {
    history.pushState({}, document.title, window.location.pathname + href);
    return false;
}