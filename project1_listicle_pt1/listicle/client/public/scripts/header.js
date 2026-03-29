const header = document.getElementById("header");

const headerLeft = document.createElement("div");
headerLeft.classList.add("header-left");
const headerRight = document.createElement("div");
headerRight.classList.add("header-right");

header.appendChild(headerLeft);
header.appendChild(headerRight);

// Header Left Section

const navBrandWrapper = document.createElement("div");
navBrandWrapper.classList.add("nav-logo-wrapper");
headerLeft.appendChild(navBrandWrapper);

const navLogo = document.createElement("img");
navLogo.classList.add("nav-logo");
navLogo.src = "/logo.svg";
navLogo.addEventListener("click", ()=>{
    window.location.href = "/";
})

navBrandWrapper.appendChild(navLogo);


//Header Right

const navContainer = document.createElement("div");
navContainer.classList.add("nav-container");
headerRight.appendChild(navContainer);

const navLinks = ["Home", "Explore"]
navLinks.forEach((navName)=>{
    if(!document.getElementById("avenger-content")){
        const navLink = document.createElement("a");
        navLink.innerText = navName;
        navContainer.appendChild(navLink);
    }
});

document.querySelectorAll(".nav-container a")[0].addEventListener("click", ()=>{
    window.location.href = "#hero-section";
});

document.querySelectorAll(".nav-container a")[1].addEventListener("click", ()=>{
    window.location.href = "#avengers-section";
});

