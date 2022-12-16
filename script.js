// // If markers should be stored somewhere, we can make an array
// let Markers = new Array();

let markerWidth = 30;
let markerHeight = 30;

let validate = (formData) => {
    document.getElementById("nameErrorDiv").innerHTML = "";

    // name validation
    let name = formData.get("name");
    // alphanumeric and spaces
    if (!name.match(/^[a-z\d\-_\s]+$/i)) {
        let nameError = document.createElement("span");
        if (name === null || name === "") {
            nameError.textContent = "Name cannot be empty";
        } else {
            nameError.textContent = "Name should contain only letters, numbers and spaces";
        }
        nameError.style.color = "red";
        document.getElementById("nameErrorDiv").appendChild(nameError);
    }

    // description validation
    // (htmlspecialchars() equivalent)
    let desc = formData.get("desc");
    let map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    desc = desc.replace(/[&<>"']/g, function (m) {
        return map[m];
    });

    // // If date should be required and valid:
    // let date = new Date(formData.get("date"));
    // if (!date instanceof Date || isNaN(date.valueOf())) {
    //     // error
    // }
};

document.getElementById("overlay").onclick = function (e) {
    alert("Please submit the form with marker information first!");
};

document.getElementById("submit").onclick = function (e) {
    e.preventDefault();

    validate(new FormData(document.querySelector("form")));
    document.getElementById("overlay").hidden = true;

    document.getElementById("invitation").textContent = "Place a marker.";
};

document.getElementById("map").onclick = function (e) {
    let form = document.getElementById("form");
    let formData = new FormData(document.querySelector("form"));

    // for (let pair of formData.entries()) {
    //     console.log(pair[0] + ", " + pair[1]);
    // }

    // get position relative to image
    let rect = e.target.getBoundingClientRect();
    let xCursorPosition = e.clientX - rect.left;
    let yCursorPosition = e.clientY - rect.top;

    let markerDesc = formData.get("desc");
    let markerType = formData.get("type");
    let markerDate = formData.get("date");
    let markerCreated = formData.get("show-date");

    // marker hover text creation
    let markerTitle = formData.get("name");
    if (markerDesc) {
        markerTitle += "\n" + markerDesc;
    }
    if (markerType !== null && markerType !== "none") {
        markerTitle += "\nType: " + markerType.replace(/-/g, " ");
    }
    if (markerDate) {
        markerTitle += "\nDate: " + markerDate;
    }
    if (markerCreated) {
        markerTitle += "\nCreated: " + new Date().toLocaleString();
    }

    // // If markers should be stored somewhere, we can push them to the array Markers
    // Markers.push(xCursorPosition, yCursorPosition, markerTitle);

    let newMarker = document.createElement("img");
    newMarker.src = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png";

    newMarker.classList += "marker";
    newMarker.style.left = xCursorPosition + rect.left - markerWidth / 2 + "px"; // 15 = half of marker width
    newMarker.style.top = yCursorPosition + rect.top - markerHeight + "px"; // 28 = marker height
    newMarker.title = markerTitle;

    document.body.appendChild(newMarker);
    document.getElementById("overlay").hidden = false;
    document.getElementById("invitation").textContent = "";
    form.reset();
};
