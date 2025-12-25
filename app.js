// Shot Clock Application - Main Logic
// State management and timer control
// UDC TV Digital lab
// Project: OpenShotClock

class ShotClock {
  constructor() {
    this.currentTime = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.intervalId = null;
    this.previousTime = 0;
    this.isResetHolding = false;

    // Default settings
    this.settings = {
      time1: 24,
      time2: 14,
      keyStartStop: ' ',
      keyResetTime1: '1',
      keyResetTime2: '2',
      blankDisplay: false,
      showDecimals: true,
      stopOnReset: true,
      hornSoundUrl: 'static/horn.m4a'
    };

    this.loadSettings();
    this.loadState();
    this.initializeUI();
    this.attachEventListeners();
    this.updateDisplay();
  }

  loadSettings() {
    const saved = localStorage.getItem('shotClockSettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
    this.applySettingsToUI();
  }

  loadState() {
    const saved = localStorage.getItem('shotClockState');
    if (saved) {
      const state = JSON.parse(saved);
      this.currentTime = state.currentTime || this.settings.time1;
      this.previousTime = state.previousTime || 0;
    } else {
      this.currentTime = this.settings.time1;
    }
  }

  saveState() {
    const state = {
      currentTime: this.currentTime,
      isRunning: this.isRunning,
      previousTime: this.previousTime
    };
    localStorage.setItem('shotClockState', JSON.stringify(state));
  }

  saveSettings() {
    localStorage.setItem('shotClockSettings', JSON.stringify(this.settings));
  }

  applySettingsToUI() {
    document.getElementById('time1Input').value = this.settings.time1;
    document.getElementById('time2Input').value = this.settings.time2;
    document.getElementById('keyStartStop').value = this.settings.keyStartStop;
    document.getElementById('keyResetTime1').value = this.settings.keyResetTime1;
    document.getElementById('keyResetTime2').value = this.settings.keyResetTime2;
    document.getElementById('blankDisplayCheck').checked = this.settings.blankDisplay;
    document.getElementById('showDecimalsCheck').checked = this.settings.showDecimals;
    document.getElementById('stopOnResetCheck').checked = this.settings.stopOnReset;
  }

  initializeUI() {
    this.timerElement = document.getElementById('mainTimer');
    this.elapsedElement = document.getElementById('elapsedTime');
    this.startStopBtn = document.getElementById('startStopBtn');

    // Setup collapsible time adjustment
    const timeAdjustHeader = document.getElementById('timeAdjustmentHeader');
    const timeAdjustContent = document.getElementById('timeAdjustmentContent');
    timeAdjustHeader.addEventListener('click', () => {
      timeAdjustHeader.classList.toggle('collapsed');
      timeAdjustContent.classList.toggle('collapsed');
    });

    // Setup collapsible settings
    const settingsHeader = document.getElementById('settingsHeader');
    const settingsContent = document.getElementById('settingsContent');
    settingsHeader.addEventListener('click', () => {
      settingsHeader.classList.toggle('collapsed');
      settingsContent.classList.toggle('collapsed');
    });

    // Setup horn sound file input
    const hornInput = document.getElementById('hornSoundInput');
    hornInput.addEventListener('change', (e) => this.handleHornFileUpload(e));
  }

  attachEventListeners() {
    // Main control buttons
    document.getElementById('startStopBtn').addEventListener('click', () => this.toggleStartStop());
    document.getElementById('resetTime1Btn').addEventListener('click', () => this.resetToTime1());
    document.getElementById('resetTime2Btn').addEventListener('click', () => this.resetToTime2());
    document.getElementById('recallPrevBtn').addEventListener('click', () => this.recallPrevious());

    // Time adjustment
    document.getElementById('setTimeBtn').addEventListener('click', () => this.setTime());

    // Settings
    document.getElementById('saveSettingsBtn').addEventListener('click', () => this.saveSettingsFromUI());

    // Open display
    document.getElementById('openDisplayBtn').addEventListener('click', () => this.openDisplay());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Key assignment inputs
    this.setupKeyAssignment('keyStartStop');
    this.setupKeyAssignment('keyResetTime1');
    this.setupKeyAssignment('keyResetTime2');
  }

  // Setup key assignment for input fields
  setupKeyAssignment(inputId) {
    const input = document.getElementById(inputId);
    input.addEventListener('click', () => {
      input.value = 'Press a key...';
      input.dataset.listening = 'true';
    });

    input.addEventListener('keydown', (e) => {
      if (input.dataset.listening === 'true') {
        e.preventDefault();
        input.value = e.key;
        input.dataset.listening = 'false';
      }
    });

    input.addEventListener('blur', () => {
      if (input.dataset.listening === 'true') {
        input.value = this.settings[inputId.replace('key', 'key')];
        input.dataset.listening = 'false';
      }
    });
  }

  // Handle keyboard shortcuts
  handleKeyPress(e) {
    // Ignore if typing in an input field
    if (e.target.tagName === 'INPUT' && !e.target.dataset.listening) {
      return;
    }

    if (e.key === this.settings.keyStartStop) {
      e.preventDefault();
      this.toggleStartStop();
    } else if (e.key === this.settings.keyResetTime1) {
      e.preventDefault();
      if (!this.settings.stopOnReset && this.isRunning) {
        this.isResetHolding = true;
      }
      this.resetToTime1();
    } else if (e.key === this.settings.keyResetTime2) {
      e.preventDefault();
      if (!this.settings.stopOnReset && this.isRunning) {
        this.isResetHolding = true;
      }
      this.resetToTime2();
    }
  }

  // Handle key up
  handleKeyUp(e) {
    if (e.key === this.settings.keyResetTime1 || e.key === this.settings.keyResetTime2) {
      if (!this.settings.stopOnReset) {
        this.isResetHolding = false;
      }
    }
  }

  // Toggle start/stop
  toggleStartStop() {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  // Start timer
  start() {
    if (this.currentTime <= 0) {
      return;
    }

    this.isRunning = true;
    this.startStopBtn.innerHTML = '<span>Stop</span>';
    this.startStopBtn.classList.remove('btn-primary');
    this.startStopBtn.classList.add('btn-secondary');

    this.intervalId = setInterval(() => {
      if (this.isResetHolding) {
        this.updateDisplay();
        this.saveState();
        return;
      }

      this.currentTime -= 0.1;
      this.elapsedTime += 0.1;

      if (this.currentTime <= 0) {
        this.currentTime = 0;
        // Do NOT stop automatically. Keep running so reset starts immediately.
        // this.stop(); 
      }

      this.updateDisplay();
      this.saveState();
    }, 100);

    this.updateDisplay();
    this.saveState();
  }

  // Stop timer
  stop() {
    this.isRunning = false;
    this.startStopBtn.innerHTML = '<span>Start</span>';
    this.startStopBtn.classList.remove('btn-secondary');
    this.startStopBtn.classList.add('btn-primary');

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.updateDisplay();
    this.saveState();
  }

  resetToTime1() {
    if (this.settings.stopOnReset) {
      this.stop();
    }
    this.previousTime = this.currentTime;
    this.currentTime = this.settings.time1;
    this.elapsedTime = 0;
    this.updateDisplay();
    this.saveState();
  }

  resetToTime2() {
    if (this.settings.stopOnReset) {
      this.stop();
    }
    this.previousTime = this.currentTime;
    this.currentTime = this.settings.time2;
    this.elapsedTime = 0;
    this.updateDisplay();
    this.saveState();
  }

  // Restore time before last reset
  recallPrevious() {
    if (!this.isRunning) {
      this.currentTime = this.previousTime;
      this.updateDisplay();
      this.saveState();
    }
  }

  // Set time manually - category 2 error correction
  setTime() {
    if (this.isRunning) {
      alert('Stop the timer before adjusting time.');
      return;
    }

    const input = document.getElementById('adjustTimeInput');
    const value = parseFloat(input.value);

    if (isNaN(value) || value < 0) {
      alert('Please enter a valid time value.');
      return;
    }

    this.previousTime = this.currentTime;
    this.currentTime = value;
    this.updateDisplay();
    this.saveState();
    input.value = '';
  }

  // Handle horn sound file upload
  handleHornFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.settings.hornSoundUrl = e.target.result;
        this.saveSettings();
      };
      reader.readAsDataURL(file);
    }
  }

  // Save settings from UI
  saveSettingsFromUI() {
    this.settings.time1 = parseFloat(document.getElementById('time1Input').value) || 24;
    this.settings.time2 = parseFloat(document.getElementById('time2Input').value) || 14;
    this.settings.keyStartStop = document.getElementById('keyStartStop').value || ' ';
    this.settings.keyResetTime1 = document.getElementById('keyResetTime1').value || '1';
    this.settings.keyResetTime2 = document.getElementById('keyResetTime2').value || '2';
    this.settings.blankDisplay = document.getElementById('blankDisplayCheck').checked;
    this.settings.showDecimals = document.getElementById('showDecimalsCheck').checked;
    this.settings.stopOnReset = document.getElementById('stopOnResetCheck').checked;

    this.saveSettings();

    // Show confirmation
    const btn = document.getElementById('saveSettingsBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>✓ Settings Saved!</span>';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
  }

  // Update display
  updateDisplay() {
    // Main console always shows 1 decimal
    this.timerElement.textContent = this.currentTime.toFixed(1);

    // SS.D format
    this.elapsedElement.textContent = this.elapsedTime.toFixed(1);

    if (this.isRunning) {
      this.timerElement.classList.add('running');
    } else {
      this.timerElement.classList.remove('running');
    }

    this.saveState();
  }

  // Open in new window
  openDisplay() {
    window.open('display.html', 'ShotClockDisplay', 'width=800,height=600');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ShotClock();
});
