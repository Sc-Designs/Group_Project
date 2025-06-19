let taskbar = document.getElementById("taskbar");
let time = document.querySelector(".time")
let taskbarmenu = [
  "./assets/WindowsLogo.png",
  "./assets/chrome.png",
  "./assets/spotify.png",
  "./assets/terminal.png",
];

taskbarmenu.forEach((item)=>{
    let imageTag = document.createElement("img");
    imageTag.src = item;
    taskbar.appendChild(imageTag)
});

setInterval(()=>{
    let date = new Date();
    let houre = date.getHours().toString().padStart(2, "0");
    let minute = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    time.textContent = `${houre} : ${minute} : ${second}`
},1000);