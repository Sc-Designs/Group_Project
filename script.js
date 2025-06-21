let taskbar = document.getElementById("taskbar");
let time = document.querySelector(".time");
let FullDate = document.querySelector(".date");
let settings = document.querySelector(".settings");
let date = new Date();
let Day = date.getDate().toString().padStart(2,"0");
let Month = date.getMonth().toString().padStart(2,"0");
let Year = date.getFullYear().toString().padStart(2,"0");
let container = document.querySelector("#screen");
let brightnessScale = document.querySelector(".brightness input");
let main = document.querySelector("#main");
let allsettingBox = document.querySelector("#allsettingBox");
let upperrow = document.querySelector(".upperrow");
let lowerrow = document.querySelector(".lowerrow");
let allItems = document.querySelector(".allitems");
let fileTabScreen = document.querySelector(".fileTabScreen");
let previewer = document.querySelector("#previewer");
let previewerclose = document.querySelector(".previewerclose");
let previewermaximize = document.querySelector(".previewermaximize");
let previewerminimize = document.querySelector(".previewerminimize");
let previewImage = document.querySelector(".previewImage");
let flag = 0;
let isDragging = false;
let bg = localStorage.getItem("backGround");
main.style.backgroundImage =
  `url('${bg}')` ||
  "url('./assets/photo-1636760243166-c2c0c62ba633.avif')";
let offsetX, offsetY;
let taskbarmenu = [
  {
    src: "./assets/WindowsLogo.png",
    class: "window",
    isActive: false,
  },
  {
    src: "./assets/chrome.png",
    class: "chrome",
    isActive: false,
  },
  {
    src: "./assets/spotify.png",
    class: "spotify",
    isActive: false,
  },
  {
    src: "./assets/terminal.png",
    class: "terminal",
    isActive: false,
  },
];
let DesktopApplication = [
  {
    src: "./assets/notes.png",
    name: "Notes",
    class: "note",
  },
  {
    src: "./assets/folder.png",
    name: "Files",
    class: "file",
  },
  {
    src: "./assets/recyclebin.png",
    name: "Recycle bin",
    class: "recycle",
  },
  {
    src: "./assets/chrome.png",
    name: "Chrome",
    class: "chrome",
  },
  {
    src: "./assets/terminal.png",
    name: "Terminal",
    class: "terminal",
  },
];
let taskbarIcon = [
  {
    abbr: "more",
    icon: "ri-arrow-up-s-line",
  },
  {
    abbr: "wifi",
    icon: "ri-wifi-line",
  },
  {
    abbr: "sound",
    icon: "ri-volume-up-line",
  },
  {
    abbr: "battery",
    icon: "ri-battery-low-line",
  },
];
let iconOfAllSetings = [
  {
    name: "WIFI",
    icon: "ri-wifi-line",
    class: "wifi",
  },
  {
    name: "BLUETOOTH",
    icon: "ri-bluetooth-line",
    class: "bluetooth",
  },
  {
    name: "VPN",
    icon: "ri-shield-keyhole-line",
    class: "vpn",
  },
  {
    name: "AIRPLANE MODE",
    icon: "ri-flight-takeoff-line",
    class: "airplane",
  },
  {
    name: "ENARGY SAVER",
    icon: "ri-battery-charge-line",
    class: "wifi",
  },
  {
    name: "NIGHT LAIGHT",
    icon: "ri-contrast-2-line",
    class: "wifi",
  },
];
const menuBar = ()=>{
  allItems.innerHTML = '';
  for (let i = 0; i < taskbarmenu.length; i++) {
    let imageTag = document.createElement("img");
    imageTag.src = taskbarmenu[i].src;
    imageTag.classList.add(taskbarmenu[i].class);
    taskbarmenu[i].isActive
      ? imageTag.classList.add("active")
      : imageTag.classList.remove("active");
      allItems.appendChild(imageTag);
  }
}
setInterval(()=>{
    let date = new Date();
    let houre = date.getHours().toString().padStart(2, "0");
    let minute = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    time.textContent = `${houre} : ${minute} : ${second}`
},1000);
taskbarIcon.forEach((item)=>{
  let structure = ` <abbr title="${item.abbr}">
                        <i class="${item.icon}"></i>
                    </abbr>`;
  settings.innerHTML += structure;
})
FullDate.textContent = `${Day}-${Month}-${Year}`;

DesktopApplication.forEach((item,i)=>{
    container.innerHTML += `<div class="software ${item.class}" style="top:${Math.floor((i+0.2)*10)}%; left:0.5%">
                <img src="${item.src}" alt="">
                <h6>${item.name}</h6>
            </div>` 
})
let box = document.querySelectorAll(".software");
box.forEach((item)=>{
  
  item.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;
    
  });
  
  item.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const containerRect = container.getBoundingClientRect();
    const BoxRect = item.getBoundingClientRect();
    
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;
    
    x = Math.max(7, Math.min(x, container.clientWidth - item.offsetWidth));
    y = Math.max(7, Math.min(y, container.clientHeight - item.offsetHeight));
    
    item.style.left = x + "px";
    item.style.top = y + "px";
  });
  
  item.addEventListener("mouseup", () => {
    isDragging = false;
  });
  
})
brightnessScale.addEventListener("input",()=>{
  main.style.filter = `brightness(${brightnessScale.value / 100})`
})

settings.addEventListener("click",(e)=>{
  if (e.target.className === "ri-arrow-up-s-line" && flag === 0) {
    allsettingBox.style.bottom = "10%";
    allsettingBox.style.scale = "1";
    flag = 1;
  } else {
    allsettingBox.style.bottom = "-60%";
    allsettingBox.style.scale = "0.2";
    flag = 0;
  }
})

for(let i = 0; i<3; i++){
  let structure = `<div class="icon-box ${iconOfAllSetings[i].class}">
                    <i class="${iconOfAllSetings[i].icon}"></i>
                    <small>${iconOfAllSetings[i].name}</small>
                </div>`;
  upperrow.innerHTML += structure;
}
for (let i = 3; i < iconOfAllSetings.length; i++) {
  let structure = `<div class="icon-box ${iconOfAllSetings[i].class}">
                    <i class="${iconOfAllSetings[i].icon}"></i>
                    <small>${iconOfAllSetings[i].name}</small>
                </div>`;
  lowerrow.innerHTML += structure;
}

let hideTaskbarTimeout;

main.addEventListener("mousemove", (e) => {
  const rect = main.getBoundingClientRect();
  if (e.clientY >= rect.bottom - 70) {
    taskbar.style.bottom = "0%";
    if (hideTaskbarTimeout) clearTimeout(hideTaskbarTimeout);
  } else {
    if (!taskbar.matches(":hover")) {
      if (hideTaskbarTimeout) clearTimeout(hideTaskbarTimeout);
      hideTaskbarTimeout = setTimeout(() => {
        taskbar.style.bottom = "-10%";
      }, 1500);
    }
  }
});

taskbar.addEventListener("mouseenter", () => {
  if (hideTaskbarTimeout) clearTimeout(hideTaskbarTimeout);
  taskbar.style.bottom = "0%";
});

taskbar.addEventListener("mouseleave", () => {
  hideTaskbarTimeout = setTimeout(() => {
    taskbar.style.bottom = "-10%";
  }, 1500);
});

let Notetab= document.querySelector("#Notetab");
let notemaximize = document.querySelector(".notemaximize");
let tabFlag = 0;
notemaximize.addEventListener("click",()=>{
  if(tabFlag === 0){
    Notetab.style.width = "100vw";
    Notetab.style.height = "100vh";
    Notetab.style.transition = "width 0.4s ease, height 0.4s ease";
    Notetab.style.top = "50%";
    Notetab.style.left = "50%";
    tabFlag = 1;
  } else {
    Notetab.style.width = "50vw";
    Notetab.style.height = "50vh";
    Notetab.style.transition = "width 0.4s ease, height 0.4s ease";
    Notetab.style.top = "50%";
    Notetab.style.left = "50%";
    tabFlag = 0;
  }
})

let noteminimize = document.querySelector(".noteminimize");
noteminimize.addEventListener("click",()=>{
    Notetab.style.scale = "0.2";
    Notetab.style.transition = "top 0.3s ease";
    Notetab.style.top = "100%";
})
let noteclose = document.querySelector(".noteclose");
noteclose.addEventListener("click", ()=>{
  Notetab.style.display = "none";
  taskbarmenu = taskbarmenu.filter((item)=> item.class !== "note");
  menuBar();
})
menuBar()
let iconFlag = 0;

container.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("note")) {
    Notetab.style.display = "flex";
    Notetab.style.scale = "0";
    Notetab.style.transformOrigin = "left";
    Notetab.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      Notetab.style.scale = "1";
    }, 50);
    if (taskbarmenu.some((item) => item.class === "note")) return;
    taskbarmenu.push({
      src: "./assets/notes.png",
      class: "note",
      isActive: true,
    });
    menuBar();
  }

  if (e.target.classList.contains("file")) {
    Filestab.style.display = "flex";
    Filestab.style.scale = "0";
    Filestab.style.transformOrigin = "left";
    Filestab.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      Filestab.style.scale = "1";
    }, 50);
    if (taskbarmenu.some((item) => item.class === "file")) return;
    taskbarmenu.push({
      src: "./assets/folder.png",
      class: "file",
      isActive: true,
    });
    menuBar();
  }
});
let Filestab = document.querySelector("#Filestab");
let filesmaximize = document.querySelector(".filemaximize");
let fileFlag = 0;
filesmaximize.addEventListener("click", () => {
  if (fileFlag === 0) {
    Filestab.style.width = "100vw";
    Filestab.style.height = "100vh";
    Filestab.style.transition = "width 0.4s ease, height 0.4s ease";
    Filestab.style.top = "50%";
    Filestab.style.left = "50%";
    fileFlag = 1;
  } else {
    Filestab.style.width = "50vw";
    Filestab.style.height = "50vh";
    Filestab.style.transition = "width 0.4s ease, height 0.4s ease";
    Filestab.style.top = "50%";
    Filestab.style.left = "50%";
    fileFlag = 0;
  }
});

let filesminimize = document.querySelector(".fileminimize");
filesminimize .addEventListener("click", () => {
  Filestab.style.scale = "0.2";
  Filestab.style.top = "100%";
});
let filesclose = document.querySelector(".fileclose");
filesclose.addEventListener("click", () => {
  Filestab.style.display = "none";
  taskbarmenu = taskbarmenu.filter((item) => item.class !== "file");
  menuBar();
});
menuBar()
let filesiconFlag = 0;



allItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("note") && iconFlag === 0) {
    Notetab.style.scale = "1";
    Notetab.style.top = "50%";
    Notetab.style.transition = "top 0.3s ease";
    Filestab.style.zIndex = "9";
    Notetab.style.zIndex = "99";
    iconFlag = 1;
  } else if (e.target.classList.contains("note") && iconFlag === 1) {
    Notetab.style.scale = "0.2";
    Notetab.style.top = "100%";
    Notetab.style.zIndex = "9";
    iconFlag = 0;
  } else if (e.target.classList.contains("file") && filesiconFlag === 0) {
    Filestab.style.scale = "1";
    Filestab.style.top = "50%";
    Notetab.style.zIndex = "9";
    Filestab.style.zIndex = "99";
    filesiconFlag = 1;
  } else if (e.target.classList.contains("file") && filesiconFlag === 1) {
    Filestab.style.scale = "0.2";
    Filestab.style.top = "100%";
    Filestab.style.zIndex = "9";
    filesiconFlag = 0;
  }
});

Notetab.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - Notetab.offsetLeft;
  offsetY = e.clientY - Notetab.offsetTop;
});
Notetab.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  Notetab.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const NodeRect = Notetab.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;
  
  Notetab.style.top = y + "px";
  Notetab.style.left = x + "px";
});

Notetab.addEventListener("mouseup", () => {
  isDragging = false;
  Notetab.style.zIndex = "5";
  Filestab.style.zIndex = "2";
});
Filestab.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - Filestab.offsetLeft;
  offsetY = e.clientY - Filestab.offsetTop;
});
Filestab.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  Filestab.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = Notetab.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  Filestab.style.top = y + "px";
  Filestab.style.left = x + "px";
});

Filestab.addEventListener("mouseup", () => {
  isDragging = false;
  Filestab.style.zIndex = "5";
  Notetab.style.zIndex = "2";
});

let fileNav = document.querySelector(".fileNav");
let desktopScreen = document.querySelector(".desktopScreen");
let homeScreen = document.querySelector(".homeScreen");
let imageScreen = document.querySelector(".imageScreen");
fileNav.addEventListener("click",(e)=>{
  if(e.target.className === 'desktop'){
    desktopScreen.style.display = "block";
    homeScreen.style.display = "none";
    imageScreen.style.display = "none";
  } else if (e.target.className === "home") {
    homeScreen.style.display = "grid";
    imageScreen.style.display = "none";
    desktopScreen.style.display = "none";
  } else if (e.target.className === "image") {
    imageScreen.style.display = "grid";
    homeScreen.style.display = "none";
    desktopScreen.style.display = "none";
  }
})

imageScreen.addEventListener("dblclick",(e)=>{
  if(e.target.classList.contains("1bg")){
    localStorage.removeItem("backGround");
    localStorage.setItem("backGround", e.target.src)
    main.style.backgroundImage = `url("${e.target.src}")`
  }
  else if(e.target.classList.contains("2bg")){
    localStorage.removeItem("backGround");
    localStorage.setItem("backGround", e.target.src);
    main.style.backgroundImage = `url("${e.target.src}")`
  }
  else if(e.target.classList.contains("3bg")){
    localStorage.removeItem("backGround");
    localStorage.setItem("backGround", e.target.src);
    main.style.backgroundImage = `url("${e.target.src}")`
  }
  else if(e.target.classList.contains("4bg")){
    localStorage.removeItem("backGround");
    localStorage.setItem("backGround", e.target.src);
    main.style.backgroundImage = `url("${e.target.src}")`
  }
})
let previewerScreen = document.querySelector(".previewerScreen");
imageScreen.addEventListener("click",(e)=>{
  if(e.target.classList.contains("1bg")){
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
  }
  else if(e.target.classList.contains("2bg")){
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
  }
  else if(e.target.classList.contains("3bg")){
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
  }
  else if(e.target.classList.contains("4bg")){
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
  }
})

// main.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
//   console.log("You right-clicked!");
// });