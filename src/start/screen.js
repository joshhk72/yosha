const GAME_LEVELS = require("../levels");

// fontawesome mute "fas fa-volume-mute"
// fontawesome sound "fas fa-volume-down"

// Note: this is super hard to do without React
// I have gained a new appreciation for React/other similar libraries.

class Screen {
  constructor(selectLevel) {
    this.startButtons = document.getElementById("start-button-container");
    this.startLogo = document.getElementById("start-logo");
    this.levelSelectButtons = document.getElementById("level-select-button-container");
    this.startScreen = document.getElementById("start");

    this.levels = GAME_LEVELS;
    this.selectLevel = selectLevel;

    this.enterLevelSelect = this.enterLevelSelect.bind(this);
    this.populateLevelSelect = this.populateLevelSelect.bind(this);
    this.attachStartButtons();
    this.attachPermanentButtons();
  }

  attachStartButtons() {
    const levelSelectButton = document.getElementById("level-select");
    const howPlay = document.getElementById("how-play");

    levelSelectButton.addEventListener("click", () => {
      this.enterLevelSelect();
    });
  }

  attachPermanentButtons() {
    const mute = document.getElementById("mute");
    const pause = document.getElementById("pause");
  }

  enterLevelSelect() {
    this.startButtons.style.display = "none";
    this.startLogo.style.display = "none"
    this.levelSelectButtons.style.display = "flex";
    this.populateLevelSelect(1);
  }

  populateLevelSelect(page) {
    const firstIdx = 0 + (page - 1) * 3;
    const lastIdx = firstIdx + 3;
    const levels = this.levels.slice(firstIdx, lastIdx);
    while (this.levelSelectButtons.firstChild) {
      this.levelSelectButtons.removeChild(this.levelSelectButtons.firstChild);
    }

    const back = document.createElement("BUTTON");
    back.innerHTML = "Back to Main";
    back.classList.add("back-to-main");
    back.onclick = () => this.exitLevelSelect();
    this.levelSelectButtons.appendChild(back);

    levels.forEach((level, i) => {
      const button = document.createElement("BUTTON");
      button.innerHTML = `Level ${firstIdx + i + 1}`;
      button.onclick = () => {
        this.startScreen.style.display = "none";
        this.selectLevel(level);
      };
      button.classList.add("level-select-button");
      this.levelSelectButtons.appendChild(button);
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
      this.levelSelectButtons.appendChild(div);
    }
  }

  exitLevelSelect() {
    this.startButtons.style.display = "flex";
    this.startLogo.style.display = "block";
    this.levelSelectButtons.style.display = "none";
  }
}

module.exports = Screen;