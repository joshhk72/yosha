const { GAME_LEVELS, MUSIC_LIST } = require("../levels");

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
    this.altHowPlayScreen = document.getElementById('alt-how-play-container');
    this.creditScreen = document.getElementById('credit-container');

    this.levels = GAME_LEVELS;
    this.musicList = MUSIC_LIST;
    this.selectLevel = selectLevel;

    this.exitHowPlayScreen = this.exitHowPlayScreen.bind(this);
    this.exitAboutScreen = this.exitAboutScreen.bind(this);
    this.exitCreditScreen = this.exitCreditScreen.bind(this);

    this.enterLevelSelect = this.enterLevelSelect.bind(this);
    this.populateLevelSelect = this.populateLevelSelect.bind(this);
    this.switchKeys = this.switchKeys.bind(this);
    this.attachStartButtons();
    this.attachGameEndButtons();
  }

  switchKeys() {
    if (key.getScope() === 'main') {
      key.setScope('alt');
      this.exitHowPlayScreen();
      this.enterHowPlayScreen();
    } else if (key.getScope() === 'alt') {
      key.setScope('main');
      this.exitHowPlayScreen();
      this.enterHowPlayScreen();
    }
  }

  attachGameEndButtons() {
    // These are on the defeat & victory screens
    const buttons = document.getElementsByClassName("back-to-start");
    buttons.item(0).onclick = () => {
      const screen = document.getElementById("victory-screen");
      screen.style.display = "none";
      this.startScreen.style.display = "block";
      this.exitLevelSelect();
    }
    buttons.item(1).onclick = () => {
      const screen = document.getElementById("defeat-screen");
      screen.style.display = "none";
      this.startScreen.style.display = "block";
      this.exitLevelSelect();
    }
  }

  attachStartButtons() {
    const levelSelectButton = document.getElementById("level-select");
    const howPlayButton = document.getElementById("how-play-select");
    const aboutButton = document.getElementById("about-select");
    const creditButton = document.getElementById("credit-select");
    const changeKey = document.getElementById("change-key");
    const altChangeKey = document.getElementById("alt-change-key");

    levelSelectButton.onclick = () => this.enterLevelSelect();
    howPlayButton.onclick = () => this.enterHowPlayScreen();
    aboutButton.onclick = () => this.enterAboutScreen();
    creditButton.onclick = () => this.enterCreditScreen();
    changeKey.onclick = () => this.switchKeys();
    altChangeKey.onclick = () => this.switchKeys();
    this.aboutScreen.firstElementChild.onclick = () => this.exitAboutScreen();
    this.howPlayScreen.firstElementChild.onclick = () => this.exitHowPlayScreen();
    this.altHowPlayScreen.firstElementChild.onclick = () => this.exitHowPlayScreen();
    this.creditScreen.firstElementChild.onclick = () => this.exitCreditScreen();
  }

  enterCreditScreen() {
    this.startButtons.style.display = "none";
    this.startLogo.style.display = "none";
    this.creditScreen.style.display = "flex";
  }

  exitCreditScreen() {
    this.startButtons.style.display = "flex";
    this.startLogo.style.display = "block";
    this.creditScreen.style.display = "none";
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
    if (key.getScope() === 'main') {
      this.startButtons.style.display = "none";
      this.startLogo.style.display = "none"
      this.howPlayScreen.style.display = "flex";
    } else if (key.getScope() === 'alt') {
      this.startButtons.style.display = "none";
      this.startLogo.style.display = "none"
      this.altHowPlayScreen.style.display = "flex";
    }
  }

  exitHowPlayScreen() {
    this.startButtons.style.display = "flex";
    this.startLogo.style.display = "block";
    this.howPlayScreen.style.display = "none";
    this.altHowPlayScreen.style.display = "none";
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
    const musics = this.musicList.slice(firstIdx, lastIdx);
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
        this.selectLevel(level, musics[i]);
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