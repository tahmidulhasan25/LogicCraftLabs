// Financial Values
let revenueRatePerSecond = 1250.00;
let currentTotalRevenue = 4500000.00;
let baseStockPrice = 450.25;

// Elements
const perSecondRevenueEl = document.getElementById('perSecondRevenue');
const totalRevenueEl = document.getElementById('totalRevenue');
const stockPriceEl = document.getElementById('stockPrice');
const stockTrendEl = document.getElementById('stockTrend');
const liveClockEl = document.getElementById('liveClock');
const chartPolyline = document.getElementById('chartPolyline');
const logsFeedEl = document.getElementById('logsFeed');

// Stock Trend Points Array for SVG Line Graph
let stockHistory = [440, 442, 441, 445, 448, 446, 450, 449, 451, 450.25];

// 1. Live Real-time Clock (Date & Time)
function updateClock() {
  const now = new Date();
  const options = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  liveClockEl.innerText = now.toLocaleDateString('en-US', options);
}
setInterval(updateClock, 1000);
updateClock();

// 2. Render SVG Stock Chart with Arrow Marker
function renderChart() {
  const width = 600;
  const height = 150;
  const min = Math.min(...stockHistory) - 2;
  const max = Math.max(...stockHistory) + 2;
  
  const points = stockHistory.map((val, idx) => {
    const x = (idx / (stockHistory.length - 1)) * width;
    const y = height - ((val - min) / (max - min)) * (height - 30) - 15;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  if (chartPolyline) {
    chartPolyline.setAttribute('points', points);
  }
}
renderChart();

// 3. Second-by-Second Live Monetization & Stock Update Loop
setInterval(() => {
  currentTotalRevenue += revenueRatePerSecond;

  perSecondRevenueEl.innerText = `$ ${revenueRatePerSecond.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  totalRevenueEl.innerText = `$ ${currentTotalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const delta = (Math.random() * 2 - 0.95);
  baseStockPrice += delta;
  stockPriceEl.innerText = `$ ${baseStockPrice.toFixed(2)}`;

  if (delta >= 0) {
    stockTrendEl.className = 'sub-value up';
    stockTrendEl.innerText = `▲ +$ ${delta.toFixed(2)} (${((delta / baseStockPrice) * 100).toFixed(2)}%)`;
  } else {
    stockTrendEl.className = 'sub-value down';
    stockTrendEl.innerText = `▼ -$ ${Math.abs(delta).toFixed(2)} (${((delta / baseStockPrice) * 100).toFixed(2)}%)`;
  }

  stockHistory.push(baseStockPrice);
  if (stockHistory.length > 25) {
    stockHistory.shift();
  }
  renderChart();

}, 1000);

// 4. Dynamic Inventory Units Simulation
setInterval(() => {
  const stockItems = [
    { id: 'stock-1', base: 1240 },
    { id: 'stock-2', base: 455 },
    { id: 'stock-3', base: 83 },
    { id: 'stock-4', base: 5596 }
  ];

  stockItems.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      const currentVal = parseInt(el.innerText.replace(/,/g, '')) || item.base;
      const variation = Math.floor(Math.random() * 5) - 2;
      const updatedVal = Math.max(10, currentVal + variation);
      el.innerText = `${updatedVal.toLocaleString('en-US')} Units`;
    }
  });
}, 3000);

// 5. Dynamic Live System Log Generator
const sampleLogs = [
  "Turbine X-900 power output stable at 100%",
  "Substation grid synchronization completed",
  "Automated warehouse AGV transport active",
  "R&D VLSI chip test bench passed",
  "Chittagong port export shipment logged",
  "Mymensingh plant thermal check nominal"
];

setInterval(() => {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const randomMsg = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
  
  const newLog = document.createElement('div');
  newLog.className = 'log-entry';
  newLog.innerText = `[${timeStr}] ${randomMsg}`;
  
  if (logsFeedEl) {
    logsFeedEl.prepend(newLog);
    if (logsFeedEl.children.length > 4) {
      logsFeedEl.removeChild(logsFeedEl.lastChild);
    }
  }
}, 4000);

// 6. Interactive ROI Calculator Logic
function calculateROI() {
  const amount = parseFloat(document.getElementById('investmentInput').value) || 0;
  const annualReturn = amount * 0.145; // 14.5% annual return
  const perSecondReturn = annualReturn / (365 * 24 * 3600);

  document.getElementById('roiAnnual').innerText = `$ ${annualReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  document.getElementById('roiPerSecond').innerText = `$ ${perSecondReturn.toFixed(5)}`;
}

// 7. Executive Brief Modal Functions
function openExecutiveReport() {
  document.getElementById('reportModal').style.display = 'flex';
}

function closeExecutiveReport() {
  document.getElementById('reportModal').style.display = 'none';
}