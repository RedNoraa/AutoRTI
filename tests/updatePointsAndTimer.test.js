const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

describe('updatePointsAndTimer', () => {
  let window;

  beforeAll(() => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
      throw new Error('Script section not found in HTML file');
    }
    const dom = new JSDOM(`<!DOCTYPE html><div id="timerList"></div><div id="eventLog"></div><div id="points_0">0</div>`, {runScripts: "dangerously"});
    window = dom.window;
    // Stub functions that make network calls
    window.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
    window.displaySuccessMessage = jest.fn();
    window.displayErrorMessage = jest.fn();
    // Evaluate the script from the HTML file
    window.eval(scriptMatch[1]);
    // Override network dependent functions
    window.sendToGoogleSheets = jest.fn();
    window.logEvent = jest.fn();
  });

  test('increments points when VI interval has elapsed', () => {
    window.timerData[0] = {
      points: 0,
      regularPoints: 0,
      isPaused: false,
      isIndefinitePause: false,
      selectedDuration: 30,
      viInterval: 1,
      startTime: new Date(Date.now() - 1000),
      pauseStartTime: null,
      pauseReason: ''
    };
    window.nameList[0] = { name: 'Player1' };
    window.document.getElementById('points_0').textContent = '0';

    window.updatePointsAndTimer(0);

    expect(window.timerData[0].points).toBe(1);
    expect(window.document.getElementById('points_0').textContent).toBe('1');
  });
});
