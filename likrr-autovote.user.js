// ==UserScript==
// @name         Likrr Autovote
// @namespace    http://likrr.pablobls.tech/
// @version      0.0.1
// @description  Autovote for Likrr service
// @author       Pablo http://github.com/pbl0
// @match        *://*rivalregions.com/*
// @updateURL    https://github.com/pbl0/likrr-autovote/raw/main/likrr-autovote.user.js
// ==/UserScript==

const likrrUrl = "https://gentle-fortress-15688.herokuapp.com/missions";
const minutos = 15;

function vote(article) {
  $.ajax({
    dataType: "html",
    type: "GET",
    crossDomain: true,
    data: {
      c: c_html,
    },
    url: "/news/ratesec/" + article,
    success: function (data) {
      saveVoted(article);
    },
  });
}

function getArticles() {
  $.get(likrrUrl, function (data) {
    // console.log("Missions", data);

    if (data.length == 0) {
      localStorage.setItem("likrr-last-vote", c());
    } else {
      for (let article of data) {
        voted = getVoted();
        if (!voted.includes(article)) {
          setTimeout(function () {
            vote(article);
          }, 1500);
        }
        if (article == data[data.length - 1]) {
          localStorage.setItem("likrr-last-vote", c());
        }
      }
    }
  });
}

function saveVoted(article) {
  let voted = getVoted();

  if (!voted) {
    voted = [];
  }

  voted.push(article);

  localStorage.setItem("voted", voted);
}

function getVoted() {
  return JSON.parse(localStorage.getItem("voted"));
}

$(document).ready(function () {
  const lastVote = localStorage.getItem("likrr-last-vote");
  if (c() - lastVote >= minutos * 60 * 1000) {
    getArticles();
  }

  setInterval(() => {
    getArticles();
  }, minutos * 60 * 1000);
});
