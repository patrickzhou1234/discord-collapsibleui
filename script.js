// ==UserScript==
// @name         Collapsible UI
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// ==/UserScript==

let collapsed = false;
let origWidth;
let channels, guildsList, userList, origUserWidth;

let prevUrl = "/////",
    currUrl;

function userHandle() {
    userList.style.transition = "width 0.2s";
    origUserWidth = userList.offsetWidth;
    userList.style.minWidth = "unset";
    userList.style.width = 0 + "px";
    userList.onmouseleave = () => {
        userList.style.width = 0 + "px";
    };
}

setInterval(() => {
    currUrl = window.location.href;
    if (currUrl != prevUrl) {
        if (currUrl.split("/")[4] == prevUrl.split("/")[4] && currUrl.split("/")[4] != "@me") {
            prevUrl = currUrl;
        } else {
            var found = false;
            document.querySelectorAll("aside").forEach((el) => {
                if (el.className.includes("membersWrap")) {
                    userList = el.parentElement;
                    found = true;
                }
            });
            document.querySelectorAll("div").forEach((el) => {
                if (el.className.includes("userPanelOuter") || el.className.includes("membersWrap")) {
                    userList = el;
                    found = true;
                }
            });
            if (found) {
                userHandle();
            }
            prevUrl = currUrl;
        }
    }
}, 60);

setTimeout(() => {
    document.querySelectorAll("div").forEach((el) => {
        if (el.className.includes("sidebar")) {
            channels = el;
        }
    });
    channels.style.transition = "width 0.2s";
    origWidth = channels.offsetWidth;
    channels.style.width = 0 + "px";
    var foundUserList = false;
    document.querySelectorAll("aside").forEach((el) => {
        if (el.className.includes("membersWrap")) {
            userList = el.parentElement;
            foundUserList = true;
        }
    });
    document.querySelectorAll("div").forEach((el) => {
        if (el.className.includes("userPanelOuter") || el.className.includes("membersWrap")) {
            userList = el;
            foundUserList = true;
        }
    });
    if (foundUserList) {
        userHandle();
    }
    window.onmousemove = (event) => {
        document.querySelectorAll("nav").forEach((el) => {
            if (el.className.includes("guilds")) {
                guildsList = el;
            }
        });
        var foundUserList = false;
        document.querySelectorAll("aside").forEach((el) => {
            if (el.className.includes("membersWrap")) {
                userList = el.parentElement;
                foundUserList = true;
            }
        });
        document.querySelectorAll("div").forEach((el) => {
            if (el.className.includes("userPanelOuter") || el.className.includes("membersWrap")) {
                userList = el;
                foundUserList = true;
            }
        });
        //guildsList = document.querySelectorAll(".guilds-2JjMmN")[0];
        if (event.pageX >= guildsList.offsetLeft + guildsList.offsetWidth && event.pageX <= guildsList.offsetLeft + guildsList.offsetWidth + 20) {
            channels.style.width = origWidth + "px";
        }
        if (event.pageX >= window.innerWidth - 20 && foundUserList) {
            userList.style.width = origUserWidth + "px";
        }
    };

    channels.onmouseleave = () => {
        channels.style.width = 0 + "px";
    };
}, 5000);
