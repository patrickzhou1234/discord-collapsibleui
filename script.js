// ==UserScript==
// @name         Collapsible UI
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// ==/UserScript==

let collapsed = false;
let origWidth;
let channels, guildsList, userList, origUserWidth;

let prevUrl = "/////";

function userHandle() {
    userList.style.transition = "width 0.2s";
    origUserWidth = userList.offsetWidth;
    userList.style.width = 0 + "px";
    userList.onmouseleave = () => {
        userList.style.width = 0 + "px";
    };
}

setInterval(() => {
    const currUrl = window.location.href.split("/");
    if (currUrl[4] != prevUrl[4] && document.querySelectorAll(".container-2o3qEW").length > 0) {
        userList = document.querySelectorAll(".container-2o3qEW")[0];
        userHandle();
        prevUrl = currUrl;
    }
    if (currUrl[4] == "@me" && currUrl[5] != prevUrl[5] && document.querySelectorAll(".profilePanel-2VBkh8").length > 0) {
        userList = document.querySelectorAll(".profilePanel-2VBkh8")[0];
        userHandle();
        prevUrl = currUrl;
    }
}, 60);

setTimeout(() => {
    channels = document.querySelectorAll(".sidebar-1tnWFu")[0];
    channels.style.transition = "width 0.2s";
    origWidth = channels.offsetWidth;
    channels.style.width = 0 + "px";
    var found = false;
    if (document.querySelectorAll(".container-2o3qEW").length > 0) {
        userList = document.querySelectorAll(".container-2o3qEW")[0];
        found = true;
    }
    if (document.querySelectorAll(".profilePanel-2VBkh8") > 0) {
        userList = document.querySelectorAll(".profilePanel-2VBkh8")[0];
        found = true;
    }
    if (found) {
        userHandle();
    }
    window.onmousemove = (event) => {
        guildsList = document.querySelectorAll(".guilds-2JjMmN")[0];
        if (event.pageX >= guildsList.offsetLeft + guildsList.offsetWidth && event.pageX <= guildsList.offsetLeft + guildsList.offsetWidth + 20) {
            channels.style.width = origWidth + "px";
        }
        if (event.pageX >= window.innerWidth - 20 && (document.querySelectorAll(".profilePanel-2VBkh8").length > 0 || document.querySelectorAll(".container-2o3qEW").length > 0)) {
            userList.style.width = origUserWidth + "px";
        }
    };

    channels.onmouseleave = () => {
        channels.style.width = 0 + "px";
    };
}, 5000);
