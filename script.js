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
let messageWindow, channels, guildsList;

setTimeout(() => {
        messageWindow = document.querySelectorAll(".chatContent-3KubbW")[0];
        channels = document.querySelectorAll(".sidebar-1tnWFu")[0];
        channels.style.transition = "width 0.2s";
        messageWindow.style.transition = "width 0.2s";
        origWidth = channels.offsetWidth;
}, 5000);

window.onmousemove = (event) => {
    guildsList = document.querySelectorAll(".guilds-2JjMmN")[0];
    if (event.pageX>=guildsList.offsetLeft+guildsList.offsetWidth && event.pageX<=guildsList.offsetLeft+guildsList.offsetWidth+200) {
        channels.style.width = origWidth + "px";
    } else {
        channels.style.width = 0 + "px";
    }
};
