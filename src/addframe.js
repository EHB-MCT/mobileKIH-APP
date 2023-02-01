import QrScanner from "qr-scanner"; // if installed via package and bundling with a module bundler like webpack or rollup
const Swal = require("sweetalert2");
import Cookies from "js-cookie";

if (!Cookies.get('user')) window.location = './signup.html'

let videoElem = document.querySelector(".full");
const { io } = require("../node_modules/socket.io/client-dist/socket.io.js");
var socket = io("https://dimetrondon-backend.onrender.com/");
let guid = "";
let ipp = "";

const qrScanner = new QrScanner(
  videoElem,
  (result) => {
    socket.emit("broadcast", result.split("+")[0] + '-load');
    guid = result;
    ipp = result.split("+")[1]
    qrScanner.destroy();
    videoElem.remove();

    document.querySelector(".bx-qr-scan").remove();
    document.getElementById("framename").classList.toggle("hidden");
  }
  // No options provided. This will use the old api and is deprecated in the current version until next major version.
);

fetch("https://dimetrondon-backend.onrender.com/getUserRooms", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ iduser: 1 }),
})
  .then((e) => e.json())
  .then((e) => {
    console.log(e);
    e.forEach((element) => {
      let op = document.createElement("option");
      op.value = element.name;
      op.innerText = element.name;
      insertAfter(document.getElementById("inserthere"), op);
    });
  });

document.querySelector(".bx-qr-scan").addEventListener("click", () => {
  videoElem.requestFullscreen();
  videoElem.classList.toggle("videohide");
  qrScanner.start();
});

document.getElementById("roomname").addEventListener("change", function () {
  document.getElementById("addframe").disabled = false;
  if (this.value == "new") {
    let inp = document.createElement("input");
    inp.type = "text";
    inp.classList.add("fieldfont");
    inp.classList.add("roomname");
    inp.placeholder = "Room Name....";
    inp.id = "roomname";
    insertAfter(this, inp);
    this.remove();
  }
});

document.getElementById("framename").addEventListener("input", function () {
  if (this.value.length == 4) {
    document.getElementById("roomname").classList.remove("hidden");
  } else if (this.value.length < 4) {
    document.getElementById("roomname").classList.add("hidden");
  }
});

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

document.getElementById("addframe").addEventListener("click", () => {
  let bod = {
    framename: document.getElementById("framename").value,
    roomname: document.getElementById("roomname").value,
    guid: guid,
    iduser: 1,
    ip: ipp
  };

  fetch("https://dimetrondon-backend.onrender.com/createFrame", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bod),
  })
    .then((e) => e.json())
    .then((e) => {
      if (e.message == "succes") {
        socket.emit("broadcast", guid + "-succes");

        Swal.fire({
          title: "Frame Succesfully added!",
          html: "We're rederecting you to finish up the process.",
          timer: 1500,
          timerProgressBar: true,
        }).then((result) => {
          console.log(result);
          console.log("I was closed by the timer");
          window.location.href = "./oneFrameEx.html?id=" + guid;
        });
      }
    });
});
