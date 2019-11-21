const GAME_LEVELS = require("../levels");

// fontawesome mute "fas fa-volume-mute"
// fontawesome sound "fas fa-volume-down"

// Note: this is super hard to do without React
// I have gained a new appreciation for React/other similar libraries.

class Screen {
  constructor(selectLevel) {
    this.startButtons = document.getElementById("start-button-container");
    this.startLogo = document.getElementById("start-logo");
    this.levelSelectButtonsScreen = document.getElementById("level-select-button-container");
    this.startScreen = document.getElementById("start");

    this.aboutScreen = document.getElementById('about-container');
    this.howPlayScreen = document.getElementById('how-play-container');

    this.levels = GAME_LEVELS;
    this.selectLevel = selectLevel;

    this.exitHowPlayScreen = this.exitHowPlayScreen.bind(this);
    this.exitAboutScreen = this.exitAboutScreen.bind(this);
    this.enterLevelSelect = this.enterLevelSelect.bind(this);
    this.populateLevelSelect = this.populateLevelSelect.bind(this);
    this.attachStartButtons();
  }

  attachStartButtons() {
    const levelSelectButton = document.getElementById("level-select");
    const howPlayButton = document.getElementById("how-play-select");
    const aboutButton = document.getElementById("about-select");

    levelSelectButton.onclick = () => this.enterLevelSelect();
    howPlayButton.onclick = () => this.enterHowPlayScreen();
    aboutButton.onclick = () => this.enterAboutScreen();
    this.aboutScreen.firstElementChild.onclick = () => this.exitAboutScreen();
    this.howPlayScreen.firstElementChild.onclick = () => this.exitHowPlayScreen();
  }

  enterAboutScreen() {
    this.startButtons.style.display = "none";
    this.startLogo.style.display = "none";
    this.aboutScreen.style.display = "flex";
  }

  exitAboutScreen() {
    this.startButtons.style.display = "flex";
    this.startLogo.style.display = "block";
    this.aboutScreen.style.display = "none";
  }

  enterHowPlayScreen() {
    this.startButtons.style.display = "none";
    this.startLogo.style.display = "none"
    this.howPlayScreen.style.display = "flex";
  }

  exitHowPlayScreen() {
    this.startButtons.style.display = "flex";
    this.startLogo.style.display = "block";
    this.howPlayScreen.style.display = "none";
  }

  enterLevelSelect() {
    this.startButtons.style.display = "none";
    this.startLogo.style.display = "none"
    this.levelSelectButtonsScreen.style.display = "flex";
    this.populateLevelSelect(1);
  }

  exitLevelSelect() {
    this.startButtons.style.display = "flex";
    this.startLogo.style.display = "block";
    this.levelSelectButtonsScreen.style.display = "none";
  }

  populateLevelSelect(page) {
    const firstIdx = 0 + (page - 1) * 3;
    const lastIdx = firstIdx + 3;
    const levels = this.levels.slice(firstIdx, lastIdx);
    while (this.levelSelectButtonsScreen.firstChild) {
      this.levelSelectButtonsScreen.removeChild(this.levelSelectButtonsScreen.firstChild);
    }

    const back = document.createElement("BUTTON");
    back.innerHTML = "Back to Main";
    back.classList.add("back-to-main");
    back.onclick = () => this.exitLevelSelect();
    this.levelSelectButtonsScreen.appendChild(back);

    levels.forEach((level, i) => {
      const button = document.createElement("BUTTON");
      button.innerHTML = `Level ${firstIdx + i + 1}`;
      button.onclick = () => {
        this.startScreen.style.display = "none";
        this.selectLevel(level);
      };
      button.classList.add("level-select-button");
      this.levelSelectButtonsScreen.appendChild(button);
    });

    // then if there are more on the next page, or previous page...
    if (page > 1 || this.levels.length >= lastIdx) {
      const div = document.createElement("DIV");
      div.classList.add("level-page-button-container");
      if (page > 1) {
        const selectButton = document.createElement("BUTTON");
        selectButton.innerHTML = "Previous Page";
        selectButton.classList.add("level-page-button");
        selectButton.onclick = () => this.populateLevelSelect(page - 1);
        div.appendChild(selectButton);
      }
      if (this.levels.length >= lastIdx) {
        const selectButton = document.createElement("BUTTON");
        selectButton.innerHTML = "Next Page";
        selectButton.classList.add("level-page-button");
        selectButton.onclick = () => this.populateLevelSelect(page + 1);
        div.appendChild(selectButton);
      }
      this.levelSelectButtonsScreen.appendChild(div);
    }
  }
}

module.exports = Screen;