const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Dashboard functions', () => {
  let window;

  beforeEach(() => {
    const htmlPath = path.join(__dirname, '..', 'HTML');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
      throw new Error('Script section not found in HTML file');
    }
    const dom = new JSDOM(
      `<!DOCTYPE html>
       <div id="webAppId"></div>
       <audio id="bonusSound"></audio>
       <audio id="backgroundMusic"></audio>
       <select id="pageSelect"></select>
       <div id="gameplaySection"></div>
       <div id="dashboardSection"></div>
       <input id="gridScaleSlider" value="4">
       <span id="gridScaleValue"></span>
       <button id="addNameButton"></button>
       <input id="nameInput">
       <select id="avatarSelect"></select>
       <button id="startAllButton"></button>
       <button id="saveRosterButton"></button>
       <input id="rosterNameInput">
       <select id="rosterSelect"></select>
       <select id="studentSelectDashboard"></select>
       <div id="studentPauseChartContainer"></div>
       <div class="student-summary"></div>
       <div id="rosterDisplay"></div>
       <button id="startButton"></button>
       <div id="splashPage"></div>
       <canvas id="timeOfDayChart"></canvas>
       <canvas id="timeOutLineChart"></canvas>`,
      { runScripts: 'dangerously' }
    );
    window = dom.window;
    // Stub canvas getContext
    window.HTMLCanvasElement.prototype.getContext = () => ({
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getContext: jest.fn(),
      drawImage: jest.fn(),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawText: jest.fn(),
    });
    // Stub Chart constructor
    window.Chart = function() {
      return { update: jest.fn(), destroy: jest.fn(), data: {}, options: {} };
    };
    window.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
    window.displaySuccessMessage = jest.fn();
    window.displayErrorMessage = jest.fn();
    // Evaluate the script
    window.eval(scriptMatch[1]);
    // Stub side-effecting functions
    window.sendToGoogleSheets = jest.fn();
    window.logEvent = jest.fn();
    window.updateStudentPauseChart = jest.fn();
    window.updatePauseHeatmap = jest.fn();
    window.updateLeaderboard = jest.fn();
    window.updateDashboardPointsChart = jest.fn();
    window.updatePauseEventsChart = jest.fn();
    window.updateClassroomPauseChart = jest.fn();
    window.updateScoreboard = jest.fn();
  });

  test('populateDashboardStudentSelect creates options', () => {
    window.nameList.push({ name: 'Alice' }, { name: 'Bob' });
    const select = window.document.getElementById('studentSelectDashboard');

    window.populateDashboardStudentSelect();

    const options = select.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[0].value).toBe('all');
    expect(options[1].textContent).toBe('Alice');
    expect(options[2].textContent).toBe('Bob');
  });

  test('updateDashboardForStudent populates summary', () => {
    window.nameList.push({ name: 'Alice' });
    window.timerData[0] = {
      points: 5,
      regularPoints: 3,
      timestamps: [{ time: new Date(), reason: 'off-task' }]
    };
    window.gameStartTime = new Date(Date.now() - 5 * 60 * 1000);
    window.currentVI = 1;

    window.updateDashboardForStudent(0);

    const summary = window.document.querySelector('.student-summary');
    expect(summary.querySelector('h4').textContent).toBe('Student Summary for Alice');
    expect(summary.textContent).toContain('Total Points Earned: 5');
    expect(summary.textContent).toContain('Bonus Points Earned: 2');
  });

  test('updateDashboardForAll populates class summary', () => {
    window.nameList.push({ name: 'Alice' }, { name: 'Bob' });
    window.timerData[0] = { points: 2, regularPoints: 2, timestamps: [] };
    window.timerData[1] = { points: 1, regularPoints: 1, timestamps: [] };
    window.gameStartTime = new Date(Date.now() - 2 * 60 * 1000);
    window.currentVI = 1;
    window.currentRosterName = 'Test Roster';

    window.updateDashboardForAll();

    const summary = window.document.querySelector('.student-summary');
    expect(summary.querySelector('h4').textContent).toBe('Test Roster Summary');
    expect(window.document.getElementById('rosterDisplay').textContent).toBe('Test Roster');
  });
});
