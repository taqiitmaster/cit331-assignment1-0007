// Piece 1: find the parts of the page we need
var form = document.getElementById("regForm");
var message = document.getElementById("message");
var list = document.getElementById("list");
var clearBtn = document.getElementById("clearBtn");

// Piece 2: read localStorage and show the saved registrations
function showRegistrations() {
  var saved = JSON.parse(localStorage.getItem("registrations")) || [];
  list.innerHTML = "";

  if (saved.length === 0) {
    list.innerHTML = "<li>No registrations yet.</li>";
    return;
  }

  for (var i = 0; i < saved.length; i++) {
    var item = document.createElement("li");
    item.textContent = saved[i].name + " | " + saved[i].email + " | " + saved[i].phone + " | " + saved[i].event + " | Heard from: " + saved[i].source;
    list.appendChild(item);
  }
}



// Piece 3: what happens when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  var saved = JSON.parse(localStorage.getItem("registrations")) || [];
  var person = {
    name: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    event: document.getElementById("event").value,
    source: document.querySelector('input[name="source"]:checked').value
  };

  saved.push(person);
  localStorage.setItem("registrations", JSON.stringify(saved));

  message.textContent = "Thank you, " + person.name + "! You are registered for " + person.event + ".";
  form.reset();
  showRegistrations();
});

// The Clear all button
clearBtn.addEventListener("click", function () {
  localStorage.removeItem("registrations");
  message.textContent = "All registrations cleared.";
  showRegistrations();
});

// Show the saved list when the page opens
showRegistrations();