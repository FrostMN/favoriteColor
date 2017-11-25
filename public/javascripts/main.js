function showModal(id) {
    alert("in alert")
    var modal = document.getElementById(id);
    modal.style.display = "block";
}

function closeModal(obj) {
    var caller = obj;
    while (caller.className != "modal") {
        caller = caller.parentNode;
    }
    caller.style.display = "nonde";
}