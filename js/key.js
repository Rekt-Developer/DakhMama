
document.addEventListener('keydown', function(event) {
    // Ctrl + U
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }

    // Ctrl + Maj + C
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
    }

    // Ctrl + Maj + I
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
    }
});


$(document).ready(function() {
    $(document).bind("contextmenu", function() {
        return false;
    });
});
