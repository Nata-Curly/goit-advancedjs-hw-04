export default class BtnService {
  static HIDDEN_CLASS = 'is-hidden';
  constructor(button) {
    this.button = button;
    this.prevText = '';
  }

  disable() {
    this.button.disabled = true;
  }

  enable() {
    this.button.disabled = false;
  }

  hide() {
    this.button.classList.add(BtnService.HIDDEN_CLASS);
  }

  show() {
    this.button.classList.remove(BtnService.HIDDEN_CLASS);
  }

  setLoading() {
    this.disable();
    this.prevText = this.button.textContent;
    this.button.textContent = 'Loading...';
  }

  setNorman() {
    this.button.textContent = this.prevText;
    this.enable();
  }
}

