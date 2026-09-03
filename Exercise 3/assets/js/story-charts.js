/* =========================================================
   Appliance Energy Consumption Website — story-charts.js
   Only runs on story.html. Draws three Chart.js visualisations
   from pre-aggregated figures (see README "About the data" for
   how these were derived from the KNIME workflow).
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  if (typeof Chart === 'undefined') return;
  if (!document.getElementById('sizeChart')) return;

  var palette = {
    teal: '#3ED6C6',
    tealDim: 'rgba(62, 214, 198, 0.35)',
    amber: '#FFC63A',
    amberDim: 'rgba(255, 198, 58, 0.35)',
    line: '#2A3550',
    text: '#93A0B8',
    textStrong: '#F2F4F8'
  };

  Chart.defaults.color = palette.text;
  Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
  Chart.defaults.plugins.legend.display = false;

  var gridOpt = { color: palette.line, drawTicks: false };
  var tickOpt = { color: palette.text, font: { family: "'IBM Plex Mono', monospace", size: 11 } };

  /* ---------- Q1: model count by size bracket ---------- */
  new Chart(document.getElementById('sizeChart'), {
    type: 'bar',
    data: {
      labels: ['Under 32"', '32"\u201342"', '43"\u201354"', '55"\u201364"', '65"\u201374"', '75"+'],
      datasets: [{
        label: 'Registered models',
        data: [557, 601, 1248, 931, 731, 656],
        backgroundColor: [
          palette.tealDim, palette.tealDim, palette.teal,
          palette.tealDim, palette.tealDim, palette.tealDim
        ],
        borderRadius: 4,
        maxBarThickness: 64
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (ctx) { return ctx.parsed.y.toLocaleString() + ' models'; }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: tickOpt },
        y: {
          beginAtZero: true,
          grid: gridOpt,
          ticks: tickOpt,
          title: { display: true, text: 'Registered models', color: palette.text }
        }
      }
    }
  });

  /* ---------- Q2: average annual kWh by size bracket ---------- */
  new Chart(document.getElementById('energyChart'), {
    type: 'bar',
    data: {
      labels: ['Under 32"', '32"\u201342"', '43"\u201354"', '55"\u201364"', '65"\u201374"', '75"+'],
      datasets: [{
        label: 'Average kWh / year',
        data: [104, 208, 337, 490, 621, 879],
        backgroundColor: palette.amber,
        borderRadius: 4,
        maxBarThickness: 64
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (ctx) { return '~' + ctx.parsed.y + ' kWh / year'; }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: tickOpt },
        y: {
          beginAtZero: true,
          grid: gridOpt,
          ticks: tickOpt,
          title: { display: true, text: 'kWh / year (average)', color: palette.text }
        }
      }
    }
  });

  /* ---------- Q3a: raw average kWh by screen technology ---------- */
  new Chart(document.getElementById('techRawChart'), {
    type: 'bar',
    data: {
      labels: ['LCD', 'LED-LCD', 'OLED'],
      datasets: [{
        label: 'Average kWh / year',
        data: [334, 455, 486],
        backgroundColor: palette.amber,
        borderRadius: 4,
        maxBarThickness: 56
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (ctx) { return '~' + ctx.parsed.x + ' kWh / year'; }
          }
        }
      },
      scales: {
        x: { beginAtZero: true, grid: gridOpt, ticks: tickOpt },
        y: { grid: { display: false }, ticks: tickOpt }
      }
    }
  });

  /* ---------- Q3b: kWh per inch by screen technology ---------- */
  new Chart(document.getElementById('techPerInchChart'), {
    type: 'bar',
    data: {
      labels: ['LCD', 'LED-LCD', 'OLED'],
      datasets: [{
        label: 'kWh / year / inch',
        data: [6.6, 7.7, 7.5],
        backgroundColor: palette.teal,
        borderRadius: 4,
        maxBarThickness: 56
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (ctx) { return ctx.parsed.x + ' kWh / year / inch'; }
          }
        }
      },
      scales: {
        x: { beginAtZero: true, grid: gridOpt, ticks: tickOpt },
        y: { grid: { display: false }, ticks: tickOpt }
      }
    }
  });
});
