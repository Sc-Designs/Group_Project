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
let flag = 0;
let isDragging = false;
let bg = localStorage.getItem("backGround");
main.style.backgroundImage = bg !== null ? 
  `url('${bg}')` :
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
// Time and Date function
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

// Print DesktopApp
DesktopApplication.forEach((item,i)=>{
    container.innerHTML += `<div class="software ${item.class}" style="top:${Math.floor((i+0.2)*10)}%; left:0.5%">
                <img src="${item.src}" alt="">
                <h6>${item.name}</h6>
            </div>` 
})

// All screen app Drag function
let box = document.querySelectorAll(".software");
box.forEach((item)=>{
  item.addEventListener("mousedown", (e) => {
    isDragging = false;
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

// Taskbar view and hide function
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

// Note tab and its funtion like minimaize, maximize and close
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

// NoteTab Drag function
Notetab.addEventListener("mousedown", (e) => {
  isDragging = false;
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
  Chrome.style.zIndex = "4";
  Filestab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});

// File tab and it's funtion like minimize, maximize and close
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

// FileTab Drag function
Filestab.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - Filestab.offsetLeft;
  offsetY = e.clientY - Filestab.offsetTop;
});
Filestab.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  Filestab.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = Filestab.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  Filestab.style.top = y + "px";
  Filestab.style.left = x + "px";
});

Filestab.addEventListener("mouseup", () => {
  isDragging = false;
  Filestab.style.zIndex = "5";
  Chrome.style.zIndex = "4";
  Notetab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});

// file viewer and functions for Child
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

// Previwer Tab and it's functions like minimize, maximize, close
let previewer = document.querySelector("#previewer");
let previewerclose = document.querySelector(".previewerclose");
let previewermaximize = document.querySelector(".previewermaximize");
let previewerminimize = document.querySelector(".previewerminimize");
let previewImage = document.querySelector(".previewImage");
previewermaximize.addEventListener("click", () => {
  if (previewFalg === 0) {
    previewer.style.width = "100vw";
    previewer.style.height = "100vh";
    previewer.style.transition = "width 0.4s ease, height 0.4s ease";
    previewer.style.top = "50%";
    previewer.style.left = "50%";
    previewFalg = 1;
  } else {
    previewer.style.width = "50vw";
    previewer.style.height = "50vh";
    previewer.style.transition = "width 0.4s ease, height 0.4s ease";
    previewer.style.top = "50%";
    previewer.style.left = "50%";
    previewFalg = 0;
  }
});
previewerminimize.addEventListener("click", () => {
  previewer.style.scale = "0.2";
  previewer.style.top = "100%";
});
previewerclose.addEventListener("click", () => {
  previewer.style.display = "none";
  taskbarmenu = taskbarmenu.filter((item) => item.class !== "photo");
  menuBar();
});

// Previwer Drag functions
previewer.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - previewer.offsetLeft;
  offsetY = e.clientY - previewer.offsetTop;
});
previewer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  previewer.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = previewer.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  previewer.style.top = y + "px";
  previewer.style.left = x + "px";
});
previewer.addEventListener("mouseup", () => {
  isDragging = false;
  previewer.style.zIndex = "5";
  Chrome.style.zIndex = "4";
  Filestab.style.zIndex = "3";
  Notetab.style.zIndex = "2";
});

// Screen wallpaper change
imageScreen.addEventListener("click",(e)=>{
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
  else if(e.target.classList.contains("5bg")){
    localStorage.removeItem("backGround");
    localStorage.setItem("backGround", e.target.src);
    main.style.backgroundImage = `url("${e.target.src}")`
  }
})

// Pic viewer Tab
let previewerScreen = document.querySelector(".previewerScreen");
imageScreen.addEventListener("dblclick",(e)=>{
  if(e.target.classList.contains("1bg")){
    previewer.style.display = "block";
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
    previewer.style.zIndex = "99";
    if (taskbarmenu.some((item) => item.class === "photo")) return;
    taskbarmenu.push({
      src: "./assets/photo.png",
      class: "photo",
      isActive: true,
    });
    menuBar()
  }
  else if(e.target.classList.contains("2bg")){
    previewer.style.display = "block";
    previewer.style.scale = "0";
    previewer.style.transformOrigin = "left";
    previewer.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      previewer.style.scale = "1";
    }, 50);
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
    previewer.style.zIndex = "99";
    if (taskbarmenu.some((item) => item.class === "photo")) return;
    taskbarmenu.push({
      src: "./assets/photo.png",
      class: "photo",
      isActive: true,
    });
    menuBar();
  }
  else if(e.target.classList.contains("3bg")){
    previewer.style.display = "block";
    previewer.style.scale = "0";
    previewer.style.transformOrigin = "left";
    previewer.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      previewer.style.scale = "1";
    }, 50);
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
    previewer.style.zIndex = "99";
    if (taskbarmenu.some((item) => item.class === "photo")) return;
    taskbarmenu.push({
      src: "./assets/photo.png",
      class: "photo",
      isActive: true,
    });
    menuBar();
  }
  else if(e.target.classList.contains("4bg")){
    previewer.style.display = "block";
    previewer.style.scale = "0";
    previewer.style.transformOrigin = "left";
    previewer.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      previewer.style.scale = "1";
    }, 50);
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image);
    previewer.style.zIndex = "99";
    if (taskbarmenu.some((item) => item.class === "photo")) return;
    taskbarmenu.push({
      src: "./assets/photo.png",
      class: "photo",
      isActive: true,
    });
    menuBar();
  } 
  else if(e.target.classList.contains("5bg")){
    previewer.style.display = "block";
    previewer.style.scale = "0";
    previewer.style.transformOrigin = "left";
    previewer.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      previewer.style.scale = "1";
    }, 50);
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image);
    previewer.style.zIndex = "99";
    if (taskbarmenu.some((item) => item.class === "photo")) return;
    taskbarmenu.push({
      src: "./assets/photo.png",
      class: "photo",
      isActive: true,
    });
    menuBar();
  } 
  else if(e.target.classList.contains("logo")){
    previewer.style.display = "block";
    previewer.style.scale = "0";
    previewer.style.transformOrigin = "left";
    previewer.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      previewer.style.scale = "1";
    }, 50);
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "cover";
    previewerScreen.appendChild(image)
    previewer.style.zIndex = "99";
    if (taskbarmenu.some((item) => item.class === "photo")) return;
    taskbarmenu.push({
      src: "./assets/photo.png",
      class: "photo",
      isActive: true,
    });
    menuBar();
  } 
})

// main.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
//   console.log("You right-clicked!");
// });
// Chrome tab and it's funtioc like minimize and maximize
let Chrome = document.querySelector("#chrome");
let ChromeFlag = 0;
let chromeFlag = 0;
let chromemaximize = document.querySelector(".chromemaximize");
chromemaximize.addEventListener("click", () => {
  if (chromeFlag === 0) {
    Chrome.style.width = "100vw";
    Chrome.style.height = "100vh";
    Chrome.style.transition = "width 0.4s ease, height 0.4s ease";
    Chrome.style.top = "50%";
    Chrome.style.left = "50%";
    chromeFlag = 1;
  } else {
    Chrome.style.width = "50vw";
    Chrome.style.height = "50vh";
    Chrome.style.transition = "width 0.4s ease, height 0.4s ease";
    Chrome.style.top = "50%";
    Chrome.style.left = "50%";
    chromeFlag = 0;
  }
});
let chromeminimize = document.querySelector(".chromeminimize");
chromeminimize.addEventListener("click", () => {
  Chrome.style.scale = "0.2";
  Chrome.style.transition = "top 0.3s ease";
  Chrome.style.top = "100%";
  ChromeFlag = 0;
});
let chromeclose = document.querySelector(".chromeclose");
chromeclose.addEventListener("click", () => {
  Chrome.style.display = "none";
  taskbarmenu.map((item) => {
    if (item.class == "chrome") {
      item.isActive = false;
    }
  });
  menuBar();
});
// Chrome search function
const searchtext = document.getElementById("searchtext");
const search = document.getElementById("search");
const browserScreen = document.getElementById("browserScreen");
const reload = document.getElementById("reload");
const iframeError = document.getElementById("iframeError");
const defaulttext = document.getElementById("defaulttext");

reload.addEventListener("click",()=>{
  searchtext.value = "";
  browserScreen.src = "";
  browserScreen.style.display = "none";
  iframeError.style.display = "none";
  defaulttext.style.display = "block";
})

const blockedSites = [
  "youtube.com",
  "google.com",
  "facebook.com",
  "instagram.com",
  "duckduckgo.com",
  "linkedin.com",
  "W3Schools.com"
];

function isBlocked(url) {
  return blockedSites.some((domain) => url.includes(domain));
}

search.addEventListener("click", () => {
  let query = searchtext.value.trim();
  if (!query) return browserScreen.style.display = "none";
  defaulttext.style.display = "none";
  browserScreen.style.display = "block";
  let finalUrl = "";

  if (query.startsWith("http://") || query.startsWith("https://")) {
    finalUrl = query;
  } else if (query.includes(".") && !query.includes(" ")) {
    finalUrl = `https://${query}`;
  } else {
    finalUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  }

  if (isBlocked(finalUrl)) {
    defaulttext.style.display = "none";
    browserScreen.style.display = "none";
    iframeError.style.display = "block";
    browserScreen.src = "";
    setTimeout(()=>{
      window.open(finalUrl, "_blank");
    },2000)
  } else {
    iframeError.style.display = "none";
    browserScreen.src = finalUrl;
  }
});
// Chrome Drag function
Chrome.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - Chrome.offsetLeft;
  offsetY = e.clientY - Chrome.offsetTop;
});
Chrome.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  Chrome.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = Chrome.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  Chrome.style.top = y + "px";
  Chrome.style.left = x + "px";
});

Chrome.addEventListener("mouseup", () => {
  isDragging = false;
  Chrome.style.zIndex = "5";
  Filestab.style.zIndex = "4";
  Notetab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});


// Opne app from Screen
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
  if (e.target.classList.contains("chrome")) {
    Chrome.style.display = "block";
    Chrome.style.scale = "0";
    Chrome.style.transformOrigin = "left";
    Chrome.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      Chrome.style.scale = "1";
    }, 50);
    taskbarmenu.some((item) => {
      if (item.class === "chrome" && item.isActive === false) {
        item.isActive = true;
      }
    });
    menuBar();
  }
});
let iconFlag = 0;
let filesiconFlag = 0;
let previewFalg = 0;
// Taskbar options
allItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("note") && iconFlag === 0) {
    Notetab.style.scale = "1";
    Notetab.style.top = "50%";
    Notetab.style.transition = "top 0.3s ease";
    Filestab.style.zIndex = "9";
    previewer.style.zIndex = "10";
    Chrome.style.zIndex = "11";
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
    Filestab.style.transition = "top 0.3s ease";
    Notetab.style.zIndex = "9";
    previewer.style.zIndex = "10";
    Chrome.style.zIndex = "11";
    Filestab.style.zIndex = "99";
    filesiconFlag = 1;
  } else if (e.target.classList.contains("file") && filesiconFlag === 1) {
    Filestab.style.scale = "0.2";
    Filestab.style.top = "100%";
    Filestab.style.zIndex = "9";
    filesiconFlag = 0;
  } else if (e.target.classList.contains("photo") && previewFalg === 0) {
    previewer.style.scale = "1";
    previewer.style.top = "50%";
    previewer.style.transition = "top 0.3s ease";
    Notetab.style.zIndex = "9";
    Filestab.style.zIndex = "10";
    Chrome.style.zIndex = "11";
    previewer.style.zIndex = "99";
    previewFalg = 1;
  } else if (e.target.classList.contains("photo") && previewFalg === 1) {
    previewer.style.scale = "0.2";
    previewer.style.top = "100%";
    previewer.style.zIndex = "9";
    previewFalg = 0;
  } else if (e.target.classList.contains("chrome") && ChromeFlag === 0) {
    Chrome.style.scale = "1";
    Chrome.style.top = "50%";
    Chrome.style.transition = "top 0.3s ease";
    Notetab.style.zIndex = "9";
    Filestab.style.zIndex = "10";
    previewer.style.zIndex = "11";
    Chrome.style.zIndex = "99";
    ChromeFlag = 1;
  } else if (e.target.classList.contains("chrome") && ChromeFlag === 1) {
    Chrome.style.scale = "0.2";
    Chrome.style.top = "100%";
    Chrome.style.zIndex = "9";
    ChromeFlag = 0;
  }
});