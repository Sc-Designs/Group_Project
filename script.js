let taskbar = document.getElementById("taskbar");
let time = document.querySelector(".time");
let FullDate = document.querySelector(".date");
let settings = document.querySelector(".settings");
let date = new Date();
let Day = (date.getDate()+1).toString().padStart(2,"0");
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
let iconHeight = 90;
let gapY = 2;
let maxContainerHeight = container.clientHeight;
let column = 0;
let row = 0;
let Top = 0;
let left = 0;
const renderedSet = new Set();
const ImageSet = new Set();
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
  {
    src: "./assets/camera.png",
    name: "Camera",
    class: "camera",
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
    isActive: false,
  },
  {
    name: "BLUETOOTH",
    icon: "ri-bluetooth-line",
    class: "bluetooth",
    isActive: false,
  },
  {
    name: "VPN",
    icon: "ri-shield-keyhole-line",
    class: "vpn",
    isActive: false,
  },
  {
    name: "AIRPLANE MODE",
    icon: "ri-flight-takeoff-line",
    class: "airplane",
    isActive: false,
  },
  {
    name: "ENARGY SAVER",
    icon: "ri-battery-charge-line",
    class: "enargySaver",
    isActive: false,
  },
  {
    name: "NIGHT LAIGHT",
    icon: "ri-contrast-2-line",
    class: "nightLight",
    isActive: false,
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
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyOS_DB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("videos")) {
        db.createObjectStore("videos", { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveVideoToDB = async (blob) => {
  const db = await openDB();
  const transaction = db.transaction("videos", "readwrite");
  const store = transaction.objectStore("videos");
  const id = Date.now();
  const videoData = { id, blob };

  const request = store.add(videoData);
  request.onsuccess = () => {
    alert("🎥 Video saved to OS Files/Video section (IndexedDB)!");
    loadVideosInOS();
  };
};


taskbarIcon.forEach((item)=>{
  let structure = ` <abbr title="${item.abbr}">
                        <i class="${item.icon}"></i>
                    </abbr>`;
  settings.innerHTML += structure;
})
FullDate.textContent = `${Day}-${Month}-${Year}`;

// Print DesktopApp
const PrintDesktopApplication = () => {
  DesktopApplication.forEach((item) => {
    if (renderedSet.has(item.name)) return;

    let top = row * (iconHeight + gapY);
    let left = column * 6 + 0.5;

    if (top + iconHeight > (container.clientHeight - 70)) {
      column++;
      row = 0;
      top = 0;
      left = column * 6 + 0.5;
    }

    const el = document.createElement("div");
    el.className = `software ${item.class}`;
    el.style.position = "absolute";
    el.style.top = `${top + 10}px`;
    el.style.left = `${left}vw`;
    el.innerHTML = `
      <img src="${item.src}" alt="">
      <input class="iconText" type="text" value="${item.name}" readOnly />
    `;
    container.appendChild(el);
    renderedSet.add(item.name);
    row++;
  });
};
PrintDesktopApplication()

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
function upper(){
  upperrow.innerHTML = "";
  for(let i = 0; i<iconOfAllSetings.length; i++){
  let structure = `
  <abbr title="${iconOfAllSetings[i].name}">
  <div class="icon-box">
                    <i class="${iconOfAllSetings[i].icon}  ${
    iconOfAllSetings[i].class
  }" style="${iconOfAllSetings[i].isActive && "background : #00BFFF"}"></i>
                    <small>${iconOfAllSetings[i].name}</small>
                </div>
                </abbr>
                `;
  upperrow.innerHTML += structure;
}
}
upper();
let nightFlag = 0;
let nightMode = document.getElementById("nightMode");
upperrow.addEventListener("click", (e) => {
  if(e.target.classList.contains("nightLight")){
    iconOfAllSetings.map((item)=> {
      if(item.class === "nightLight" && nightFlag === 0){
        item.isActive = true;
        nightFlag = 1;
        nightMode.style.display = "block";
        upper();
      } else if (item.class === "nightLight" && nightFlag === 1) {
        item.isActive = false;
        nightMode.style.display = "none";
        nightFlag = 0;
        upper();
      }
    });
  }
});


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
let NoteTabTop = document.querySelector("#Notetab .top");
NoteTabTop.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - Notetab.offsetLeft;
  offsetY = e.clientY - Notetab.offsetTop;
});
NoteTabTop.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  Notetab.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const NodeRect = Notetab.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  Notetab.style.top = y + "px";
  Notetab.style.left = x + "px";
});
NoteTabTop.addEventListener("mouseup", () => {
  isDragging = false;
  Notetab.style.zIndex = "8";
  personalize.style.zIndex = "7";
  camera.style.zIndex = "6";
  terminal.style.zIndex = "5";
  Chrome.style.zIndex = "4";
  Filestab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});

// File tab and it's funtion like minimize, maximize and close
let Filestab = document.querySelector("#Filestab");
let filesmaximize = document.querySelector(".filemaximize");
let imageScreen = document.querySelector(".imageScreen");
let videoScreen = document.querySelector(".videoFileSection");
let fileFlag = 0;
filesmaximize.addEventListener("click", () => {
  if (fileFlag === 0) {
    Filestab.style.width = "100vw";
    Filestab.style.height = "100vh";
    Filestab.style.transition = "width 0.4s ease, height 0.4s ease";
    Filestab.style.top = "50%";
    Filestab.style.left = "50%";
    imageScreen.style.gridTemplateColumns = "repeat(4,1fr)";
    videoScreen.style.gridTemplateColumns = "repeat(4,1fr)";
    fileFlag = 1;
  } else {
    Filestab.style.width = "50vw";
    Filestab.style.height = "50vh";
    Filestab.style.transition = "width 0.4s ease, height 0.4s ease";
    Filestab.style.top = "50%";
    Filestab.style.left = "50%";
    imageScreen.style.gridTemplateColumns = "repeat(3,1fr)";
    videoScreen.style.gridTemplateColumns = "repeat(3,1fr)";
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
let FileTabTop = document.querySelector("#Filestab .top");
FileTabTop.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - Filestab.offsetLeft;
  offsetY = e.clientY - Filestab.offsetTop;
});
FileTabTop.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  Filestab.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = Filestab.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  Filestab.style.top = y + "px";
  Filestab.style.left = x + "px";
});

FileTabTop.addEventListener("mouseup", () => {
  isDragging = false;
  Filestab.style.zIndex = "8";
  personalize.style.zIndex = "7";
  camera.style.zIndex = "6";
  terminal.style.zIndex = "5";
  Chrome.style.zIndex = "4";
  Notetab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});
let homeScreenFolderArr = [];
// file viewer and functions for Child
let fileNav = document.querySelector(".fileNav");
let desktopScreen = document.querySelector(".desktopScreen");
let homeScreen = document.querySelector(".homeScreen");
let putFile = () => {
  homeScreen.innerHTML = "";
homeScreenFolderArr.map(item=>{
  homeScreen.innerHTML += `<div class="icon">
                                    <img src="${item.icon}" alt="">
                                    <small>${item.name}</small>
                                </div>`;
})
}
putFile();
fileNav.addEventListener("click",(e)=>{
  if(e.target.className === 'desktop'){
    desktopScreen.style.display = "block";
    homeScreen.style.display = "none";
    imageScreen.style.display = "none";
    videoScreen.style.display = "none";
  } else if (e.target.className === "home") {
    homeScreen.style.display = "grid";
    imageScreen.style.display = "none";
    desktopScreen.style.display = "none";
    videoScreen.style.display = "none";
  } else if (e.target.className === "image") {
    imageScreen.style.display = "grid";
    homeScreen.style.display = "none";
    desktopScreen.style.display = "none";
    videoScreen.style.display = "none";
    loadImagesInOS();
  } else if (e.target.className === "video") {
    videoScreen.style.display = "grid";
    imageScreen.style.display = "none";
    homeScreen.style.display = "none";
    desktopScreen.style.display = "none";
    loadVideosInOS();
  }
})

let wallpapers = document.querySelector(".wallpapers");
function loadImagesInOS() {
  const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];

  savedImages.forEach((img,i) => {
    if (ImageSet.has(img.id)) return;
    let image = `<abbr title="double click for Open">
                                    <div class="icon">
                                        <img src="${img.data}" alt="">
                                        <small>Photo ${i}</small>
                                    </div>
                                </abbr>`;
    imageScreen.innerHTML += image;
    wallpapers.innerHTML += image;
    ImageSet.add(img.id);
  });
}

function loadVideosInOS() {
  const videoScreen = document.querySelector(".videoFileSection");
  videoScreen.innerHTML = "";

  openDB().then((db) => {
    const transaction = db.transaction("videos", "readonly");
    const store = transaction.objectStore("videos");
    const request = store.getAll();
    request.onsuccess = () => {
      const videos = request.result;

      videos.forEach((video, i) => {
        const url = URL.createObjectURL(video.blob);
        videoScreen.innerHTML += `
          <abbr title="Double click to open">
                                <div class="icon">
                                    <video src="${url}"></video>
                                    <small>Video${i + 1}</small>
                                </div>
                            </abbr>
        `;
      });
    };
  });
}
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
let previewerTabTop = document.querySelector("#previewer .top");
previewerTabTop.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - previewer.offsetLeft;
  offsetY = e.clientY - previewer.offsetTop;
});
previewerTabTop.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  previewer.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = previewer.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  previewer.style.top = y + "px";
  previewer.style.left = x + "px";
});
previewerTabTop.addEventListener("mouseup", () => {
  isDragging = false;
  previewer.style.zIndex = "8";
  personalize.style.zIndex = "7";
  camera.style.zIndex = "6";
  terminal.style.zIndex = "5";
  Chrome.style.zIndex = "4";
  Filestab.style.zIndex = "3";
  Notetab.style.zIndex = "2";
});

// Pic viewer Tab
let previewerScreen = document.querySelector(".previewerScreen");
imageScreen.addEventListener("dblclick",(e)=>{
  if(e.target.src !== undefined){
    previewer.style.display = "block";
    previewerScreen.innerHTML = "";
    let image = document.createElement("img");
    image.src = e.target.src;
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "contain";
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
})
videoScreen.addEventListener("dblclick", (e) => {
  if (e.target.src !== undefined) {
    previewer.style.display = "block";
    previewerScreen.innerHTML = "";
    let video = document.createElement("video");
    video.src = e.target.src;
    video.style.height = "100%";
    video.style.width = "100%";
    video.style.objectFit = "contain";
    video.controls = true;
    video.muted = false;
    video.volume = 1.0;
    previewerScreen.appendChild(video);
    previewer.style.zIndex = "99";
    if (taskbarmenu.some((item) => item.class === "photo")) return;
    taskbarmenu.push({
      src: "./assets/photo.png",
      class: "photo",
      isActive: true,
    });
    menuBar();
  }
});

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
let chromeTabTop = document.querySelector("#chrome .top");
chromeTabTop.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - Chrome.offsetLeft;
  offsetY = e.clientY - Chrome.offsetTop;
});
chromeTabTop.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  Chrome.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = Chrome.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  Chrome.style.top = y + "px";
  Chrome.style.left = x + "px";
});
chromeTabTop.addEventListener("mouseup", () => {
  isDragging = false;
  Chrome.style.zIndex = "8";
  personalize.style.zIndex = "7";
  camera.style.zIndex = "6";
  terminal.style.zIndex = "5";
  Filestab.style.zIndex = "4";
  Notetab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});

// terminal tab and it's all functions
let terminal = document.getElementById("terminalTab")
const terminalbody = document.querySelector(".terminalbody");
const commands = {
  help: "Available commands: help, clear, date, whoami, echo [text]",
  date: new Date().toString(),
  whoami: "suvam (Browser OS User)",
};

document.addEventListener("keydown", (e) => {
  const input = document.querySelector(".cmd-input");
  if (!input) return;

  if (e.key === "Enter") {
    const command = input.value.trim();
    const inputLine = input.parentElement;
    inputLine.innerHTML = `<span class="prompt">ॐ suvamOS < = ></span> ${command}`;

    handleCommand(command);
    terminalbody.scrollTop = terminalbody.scrollHeight;
  }
});

function handleCommand(cmd) {
  if (cmd === "clear") {
    terminalbody.innerHTML = `<div class="line">Welcome to SuvamOS Terminal. Type <code>help</code>.</div>`;
    addNewInputLine();
    return;
  }

  let output = "";

  if (cmd.startsWith("echo ")) {
    output = cmd.slice(5);
  } else {
    output = commands[cmd] || `Command not found: ${cmd}`;
  }

  const outputLine = document.createElement("div");
  outputLine.classList.add("line");
  outputLine.textContent = output;
  terminalbody.appendChild(outputLine);

  addNewInputLine();
}

function addNewInputLine() {
  const newInputLine = document.createElement("div");
  newInputLine.classList.add("line");
  newInputLine.innerHTML = `<span class="prompt">ॐ suvamOS < = ></span> <input class="cmd-input" autofocus />`;
  terminalbody.appendChild(newInputLine);
  document.querySelector(".cmd-input").focus();
}
let terminalFlag = 0;
let TerminalFlag = 0;
let terminalmaximize = document.querySelector(".terminalmaximize");
terminalmaximize.addEventListener("click", () => {
  if (terminalFlag === 0) {
    terminal.style.width = "100vw";
    terminal.style.height = "100vh";
    terminal.style.transition = "width 0.4s ease, height 0.4s ease";
    terminal.style.top = "50%";
    terminal.style.left = "50%";
    terminalFlag = 1;
  } else {
    terminal.style.width = "50vw";
    terminal.style.height = "50vh";
    terminal.style.transition = "width 0.4s ease, height 0.4s ease";
    terminal.style.top = "50%";
    terminal.style.left = "50%";
    terminalFlag = 0;
  }
});
let terminalminimize = document.querySelector(".terminalminimize");
terminalminimize.addEventListener("click", () => {
  terminal.style.scale = "0.2";
  terminal.style.transition = "top 0.3s ease";
  terminal.style.top = "100%";
  TerminalFlag = 0;
});
let terminalclose = document.querySelector(".terminalclose");
terminalclose.addEventListener("click", () => {
  terminal.style.display = "none";
  taskbarmenu.map((item) => {
    if (item.class == "terminal") {
      item.isActive = false;
    }
  });
  menuBar();
});
// terminal drag function
let terminalTabTop = document.querySelector("#terminalTab .top");
terminalTabTop.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - terminal.offsetLeft;
  offsetY = e.clientY - terminal.offsetTop;
});
terminalTabTop.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  terminal.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = Chrome.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  terminal.style.top = y + "px";
  terminal.style.left = x + "px";
});

terminalTabTop.addEventListener("mouseup", () => {
  isDragging = false;
  terminal.style.zIndex = "8";
  personalize.style.zIndex = "7";
  camera.style.zIndex = "6";
  Chrome.style.zIndex = "5";
  Filestab.style.zIndex = "4";
  Notetab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});
let rightClickMenu = document.getElementById("rightClickMenu");
let personalize = document.getElementById("personalize");
document.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
  rightClickMenu.style.display = "flex";
  rightClickMenu.style.top = e.clientY + "px";
  rightClickMenu.style.left = e.clientX + "px";
  rightClickMenu.style.zIndex = "9999"
})

rightClickMenu.addEventListener("click",(e)=>{
  if (e.target.textContent === "Personalize") {
    personalize.style.display = "block";
    if (taskbarmenu.some((item) => item.class === "personalize")) return;
    taskbarmenu.push({
      src: "./assets/pen.png",
      class: "personalize",
      isActive: true,
    });
    menuBar();
    loadImagesInOS();
  }
})

const allWallpapers = document.querySelector(".wallpapers");

allWallpapers.addEventListener("click",(e)=>{
  if (e.target.src !== undefined) {
    localStorage.removeItem("backGround");
    localStorage.setItem("backGround", e.target.src);
    main.style.backgroundImage = `url("${e.target.src}")`;
  }
})
let personalizeFlag = 0;
let PersonalizeFlag = 0;
let personalizemaximize = document.querySelector(".personalizemaximize");
personalizemaximize.addEventListener("click", () => {
  if (personalizeFlag === 0) {
    personalize.style.width = "100vw";
    personalize.style.height = "100vh";
    personalize.style.transition = "width 0.4s ease, height 0.4s ease";
    personalize.style.top = "50%";
    personalize.style.left = "50%";
    allWallpapers.style.gridTemplateColumns= "repeat(6, 1fr)";
    personalizeFlag = 1;
  } else {
    personalize.style.width = "50vw";
    personalize.style.height = "50vh";
    personalize.style.transition = "width 0.4s ease, height 0.4s ease";
    personalize.style.top = "50%";
    personalize.style.left = "50%";
    allWallpapers.style.gridTemplateColumns= "repeat(3, 1fr)";
    personalizeFlag = 0;
  }
});
let personalizeminimize = document.querySelector(".personalizeminimize");
personalizeminimize.addEventListener("click", () => {
  personalize.style.scale = "0.2";
  personalize.style.transition = "top 0.3s ease";
  personalize.style.top = "100%";
  PersonalizeFlag = 0;
});
let personalizeclose = document.querySelector(".personalizeclose");
personalizeclose.addEventListener("click", () => {
  personalize.style.display = "none";
  taskbarmenu = taskbarmenu.filter((item) => item.class !== "personalize");
  menuBar();
});

// personalize drag function
let personalizeTabTop = document.querySelector("#personalize .top");
personalizeTabTop.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - personalize.offsetLeft;
  offsetY = e.clientY - personalize.offsetTop;
});
personalizeTabTop.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  personalize.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const FileRect = personalize.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  personalize.style.top = y + "px";
  personalize.style.left = x + "px";
});

personalizeTabTop.addEventListener("mouseup", () => {
  isDragging = false;
  personalize.style.zIndex = "8";
  terminal.style.zIndex = "7";
  camera.style.zIndex = "6";
  Chrome.style.zIndex = "5";
  Filestab.style.zIndex = "4";
  Notetab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});

let newText = document.querySelector(".new-text");
let newSection = document.querySelector(".new-section");
let folderOption = document.getElementById("folder-option");
let folderCounter = 0;
let enterTimer;
let hasEnteredNewSection = false;

newText.addEventListener("mouseenter", () => {
  newSection.style.display = "flex";
  hasEnteredNewSection = false;
  enterTimer = setTimeout(() => {
    if (!hasEnteredNewSection) {
      newSection.style.display = "none";
    }
  }, 1500);
});

newSection.addEventListener("mouseenter", () => {
  hasEnteredNewSection = true;
  clearTimeout(enterTimer);
});

newSection.addEventListener("mouseleave", () => {
  newSection.style.display = "none";
});


folderOption.addEventListener("click",()=>{
  DesktopApplication.push({
    src: "./assets/folder.png",
    name: `Folder${folderCounter}`,
    class: `folder${folderCounter}`,
  });
  homeScreenFolderArr.push({
    icon: "./assets/folder.png",
    name: `Folder${folderCounter}`,
  });
  PrintDesktopApplication();
  putFile()
  newSection.style.display = "none"
  rightClickMenu.style.display = "none";
  folderCounter++;
})

container.addEventListener("click",()=>{
  rightClickMenu.style.display = "none";
})

let camera = document.querySelector("#camera");
let cameraFeed = document.querySelectorAll("#cameraFeed")
let cameramaximize = document.querySelector(".cameramaximize");
let cameraFlag = 0;
let filters = document.querySelector(".filters");
cameramaximize.addEventListener("click", () => {
  if (cameraFlag === 0) {
    camera.style.width = "100vw";
    camera.style.height = "100vh";
    camera.style.transition = "width 0.4s ease, height 0.4s ease";
    camera.style.top = "50%";
    camera.style.left = "50%";
    filters.style.height = "67vh"
    filters.style.left = "8%"
    filters.style.overflow = "auto"
    cameraFlag = 1;
  } else {
    camera.style.width = "50vw";
    camera.style.height = "50vh";
    camera.style.transition = "width 0.4s ease, height 0.4s ease";
    camera.style.top = "50%";
    camera.style.left = "50%";
    filters.style.height = "30vh"
    filters.style.overflow = "auto"
    filters.style.left = "8%"
    cameraFlag = 0;
  }
});
let cameraminimize = document.querySelector(".cameraminimize");
cameraminimize.addEventListener("click", () => {
  camera.style.scale = "0.2";
  camera.style.transition = "top 0.3s ease";
  camera.style.top = "100%";
  cameraFlag = 0;
});
let cameraclose = document.querySelector(".cameraclose");
cameraclose.addEventListener("click", () => {
  camera.style.display = "none";
  cameraFeed.forEach(item=>{
  let stream = item.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
    item.srcObject = null;
  });
  taskbarmenu = taskbarmenu.filter((item) => item.class !== "camera");
  menuBar();
});
let cameraTabTop = document.querySelector("#camera .top");
cameraTabTop.addEventListener("mousedown", (e) => {
  isDragging = false;
  isDragging = true;
  offsetX = e.clientX - camera.offsetLeft;
  offsetY = e.clientY - camera.offsetTop;
});
cameraTabTop.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  camera.style.zIndex = "999";
  const containerRect = container.getBoundingClientRect();
  const cameraRect = camera.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  camera.style.top = y + "px";
  camera.style.left = x + "px";
});

cameraTabTop.addEventListener("mouseup", () => {
  isDragging = false;
  camera.style.zIndex = "8";
  personalize.style.zIndex = "7";
  terminal.style.zIndex = "6";
  Chrome.style.zIndex = "5";
  Filestab.style.zIndex = "4";
  Notetab.style.zIndex = "3";
  previewer.style.zIndex = "2";
});
let camerabutton = document.querySelector(".camerabutton");
let camerafeed = document.querySelector(".mainCamera");
let currentFilter = "";
filters.addEventListener("click", (e) => {
  const className = e.target.className;
  switch (className) {
    case "fliter1":
      currentFilter = "blur(1.5px) brightness(1.1) contrast(0.9)";
      break;
    case "fliter2":
      currentFilter = "sepia(0.3) brightness(1.2) contrast(1.1)";
      break;
    case "fliter3":
      currentFilter = "sepia(0.8) contrast(1.3)";
      break;
    case "fliter4":
      currentFilter =
        "sepia(0.3) hue-rotate(-15deg) contrast(1.4) saturate(1.8)";
      break;
    case "fliter5":
      currentFilter = "brightness(1.2) hue-rotate(330deg) saturate(2)";
      break;
    case "normal":
      currentFilter = "";
      break;
  }
  camerafeed.style.filter = `${currentFilter}`;
});

camerabutton.addEventListener("click", () => {
  const canvas = document.getElementById("photoCanvas");
  canvas.width = camerafeed.videoWidth;
  canvas.height = camerafeed.videoHeight;

  const ctx = canvas.getContext("2d");

  ctx.filter = currentFilter;
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(camerafeed, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");
  let savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
  savedImages.push({ id: Date.now(), data: imageData });
  localStorage.setItem("savedImages", JSON.stringify(savedImages));

  alert("📸 Photo saved to OS Files/Image section!");
  loadImagesInOS();
});

const videoButton = document.querySelector(".videobutton");
const videoFeed = document.getElementById("cameraFeed");
const timerDisplay = document.getElementById("recordTimer");
const recordCanvas = document.getElementById("recordCanvas");

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let recordStartTime;
let timerInterval;
let drawInterval;
let maxDuration = 40;

videoButton.addEventListener("click", () => {
  filters.style.pointerEvents = "none";
  filters.style.opacity = "50%";

  if (!isRecording) {
    recordedChunks = [];
    const ctx = recordCanvas.getContext("2d");
    recordCanvas.width = videoFeed.videoWidth;
    recordCanvas.height = videoFeed.videoHeight;
    drawInterval = setInterval(() => {
      ctx.filter = currentFilter;
      ctx.translate(recordCanvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoFeed, 0, 0, recordCanvas.width, recordCanvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }, 30);

    const canvasStream = recordCanvas.captureStream(30);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((audioStream) => {
      const combinedStream = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = function () {
        clearInterval(timerInterval);
        clearInterval(drawInterval);
        timerDisplay.textContent = "00:00";
        isRecording = false;
        filters.style.pointerEvents = "auto";
        filters.style.opacity = "100%";
        videoButton.innerHTML = '<i class="ri-video-on-fill"></i>';

        const blob = new Blob(recordedChunks, { type: "video/webm" });
        saveVideoToDB(blob);

        audioStream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      isRecording = true;
      videoButton.innerHTML = '<i class="ri-video-off-fill"></i>';

      recordStartTime = Date.now();
      timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordStartTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const seconds = String(elapsed % 60).padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (elapsed >= maxDuration) {
          mediaRecorder.stop();
        }
      }, 1000);
    });
  } 
} else {
    mediaRecorder.stop();
  }
});





loadImagesInOS();
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
  if (e.target.classList.contains("terminal")) {
    terminal.style.display = "block";
    terminal.style.scale = "0";
    terminal.style.transformOrigin = "left";
    terminal.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      terminal.style.scale = "1";
    }, 50);
    taskbarmenu.some((item) => {
      if (item.class === "terminal" && item.isActive === false) {
        item.isActive = true;
      }
    });
    menuBar();
  }
  if (e.target.classList.contains("camera")) {
    camera.style.display = "block";
    camera.style.scale = "0";
    camera.style.transformOrigin = "left";
    camera.style.transition = "scale 0.4s ease";
    setTimeout(() => {
      camera.style.scale = "1";
    }, 50);
    menuBar();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        cameraFeed.forEach((item)=>{
          item.srcObject = stream;
        })
      })
      .catch((err) => {
        alert("Camera access denied or not found.");
        console.error(err);
      });
      if (taskbarmenu.some((item) => item.class === "camera")) return;
      taskbarmenu.push({
        src: "./assets/camera.png",
        class: "camera",
        isActive: true,
      });
      menuBar();
  }
  else {
    rightClickMenu.style.display = "none";
    rightFlag = 0;
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
    terminal.style.zIndex = "12";
    camera.style.zIndex = "13";
    personalize.style.zIndex = "14";
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
    terminal.style.zIndex = "12";
    camera.style.zIndex = "13";
    personalize.style.zIndex = "14";
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
    terminal.style.zIndex = "12";
    camera.style.zIndex = "13";
    personalize.style.zIndex = "14";
    previewer.style.zIndex = "99";
    previewFalg = 1;
  } else if (e.target.classList.contains("photo") && previewFalg === 1) {
    previewer.style.scale = "0.2";
    previewer.style.top = "100%";
    previewer.style.zIndex = "9";
    previewFalg = 0;
  } else if (e.target.classList.contains("chrome") && ChromeFlag === 0) {
    Chrome.style.display = "block"
    Chrome.style.scale = "1";
    Chrome.style.top = "50%";
    Chrome.style.transition = "top 0.3s ease";
    Notetab.style.zIndex = "9";
    Filestab.style.zIndex = "10";
    previewer.style.zIndex = "11";
    terminal.style.zIndex = "12";
    camera.style.zIndex = "13";
    personalize.style.zIndex = "14";
    Chrome.style.zIndex = "99";
    ChromeFlag = 1;
    taskbarmenu.some((item) => {
      if (item.class === "chrome" && item.isActive === false) {
        item.isActive = true;
      }
    });
    menuBar();
  } else if (e.target.classList.contains("chrome") && ChromeFlag === 1) {
    Chrome.style.scale = "0.2";
    Chrome.style.top = "100%";
    Chrome.style.zIndex = "9";
    ChromeFlag = 0;
  } else if (e.target.classList.contains("terminal") && TerminalFlag === 0) {
    terminal.style.display = "block"
    terminal.style.scale = "1";
    terminal.style.top = "50%";
    terminal.style.transition = "top 0.3s ease";
    Notetab.style.zIndex = "9";
    Filestab.style.zIndex = "10";
    previewer.style.zIndex = "11";
    Chrome.style.zIndex = "12";
    camera.style.zIndex = "13";
    personalize.style.zIndex = "14";
    terminal.style.zIndex = "99";
    TerminalFlag = 1;
    taskbarmenu.some((item) => {
      if (item.class === "terminal" && item.isActive === false) {
        item.isActive = true;
      }
    });
    menuBar();
  } else if (e.target.classList.contains("terminal") && TerminalFlag === 1) {
    terminal.style.scale = "0.2";
    terminal.style.top = "100%";
    terminal.style.zIndex = "9";
    TerminalFlag = 0;
  } else if (e.target.classList.contains("camera") && cameraFlag === 0) {
    camera.style.scale = "1";
    camera.style.top = "50%";
    camera.style.transition = "top 0.3s ease";
    Notetab.style.zIndex = "9";
    Filestab.style.zIndex = "10";
    previewer.style.zIndex = "11";
    Chrome.style.zIndex = "12";
    terminal.style.zIndex = "13";
    personalize.style.zIndex = "14";
    camera.style.zIndex = "99";
    cameraFlag = 1;
  } else if (e.target.classList.contains("camera") && cameraFlag === 1) {
    camera.style.scale = "0.2";
    camera.style.top = "100%";
    camera.style.zIndex = "9";
    cameraFlag = 0;
  } else if (e.target.classList.contains("personalize") && PersonalizeFlag === 0) {
    personalize.style.scale = "1";
    personalize.style.top = "50%";
    personalize.style.transition = "top 0.3s ease";
    Notetab.style.zIndex = "9";
    Filestab.style.zIndex = "10";
    previewer.style.zIndex = "11";
    Chrome.style.zIndex = "12";
    terminal.style.zIndex = "13";
    camera.style.zIndex = "14";
    personalize.style.zIndex = "99";
    PersonalizeFlag = 1;
  } else if (e.target.classList.contains("personalize") && PersonalizeFlag === 1) {
    personalize.style.scale = "0.2";
    personalize.style.top = "100%";
    personalize.style.zIndex = "9";
    PersonalizeFlag = 0;
  }
});
