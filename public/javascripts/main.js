function showModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "block";
}

function closeMoodal(obj) {
    var caller = obj;
    while (caller.className != "modal") {
        caller = caller.parentNode;
    }
    caller.style.display = "nonde";
}