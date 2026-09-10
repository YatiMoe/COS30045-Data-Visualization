/* =========================================================
   Appliance Energy Consumption Website — story-charts.js
   Only runs on story.html. Draws the Chart.js visualisations
   for both Data Story sections from pre-aggregated figures.
   All figures were computed directly from the Exercise 2
   dataset (tv_2026_02_15.csv), filtered to the 4,522 models
   whose SoldIn field includes Australia — see README.md
   "About the data" for the full processing steps.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  if (typeof Chart === 'undefined') return;
  if (!document.getElementById('sizeChart')) return;

  var palette = {
    teal: '#3ED6C6',
    tealDim: 'rgba(62, 214, 198, 0.35)',
    amber: '#FFC63A',
    amberDim: 'rgba(255, 198, 58, 0.35)',
    coral: '#FF8A65',
    line: '#2A3550',
    text: '#93A0B8',
    textStrong: '#F2F4F8'
  };

  Chart.defaults.color = palette.text;
  Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
  Chart.defaults.plugins.legend.display = false;

  var gridOpt = { color: palette.line, drawTicks: false };
  var tickOpt = { color: palette.text, font: { family: "'IBM Plex Mono', monospace", size: 11 } };
  var sizeLabels = ['Under 32"', '32"–42"', '43"–54"', '55"–64"', '65"–74"', '75"+'];

  /* =========================================================
     STORY 1 — SIZE
     ========================================================= */

  /* ---------- Q1: model count by size bracket ---------- */
  new Chart(document.getElementById('sizeChart'), {
    type: 'bar',
    data: {
      labels: sizeLabels,
      datasets: [{
        label: 'Registered models',
        data: [316, 494, 751, 906, 832, 1223],
        backgroundColor: [
          palette.tealDim, palette.tealDim, palette.tealDim,
          palette.tealDim, palette.tealDim, palette.teal
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
      labels: sizeLabels,
      datasets: [{
        label: 'Average kWh / year',
        data: [93, 150, 269, 383, 510, 768],
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

  /* =========================================================
     STORY 2 — SCREEN TECHNOLOGY
     ========================================================= */

  /* ---------- raw average kWh by screen technology ---------- */
  new Chart(document.getElementById('techRawChart'), {
    type: 'bar',
    data: {
      labels: ['LCD', 'LED-LCD', 'OLED'],
      datasets: [{
        label: 'Average kWh / year',
        data: [335, 460, 489],
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

  /* ---------- frequency of each screen technology ---------- */
  if (document.getElementById('techFreqChart')) {
    new Chart(document.getElementById('techFreqChart'), {
      type: 'bar',
      data: {
        labels: ['LCD', 'LED-LCD', 'OLED'],
        datasets: [{
          label: 'Registered models',
          data: [568, 3666, 288],
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
              label: function (ctx) {
                var pct = (ctx.parsed.x / 4522 * 100).toFixed(1);
                return ctx.parsed.x.toLocaleString() + ' models (' + pct + '%)';
              }
            }
          }
        },
        scales: {
          x: { beginAtZero: true, grid: gridOpt, ticks: tickOpt },
          y: { grid: { display: false }, ticks: tickOpt }
        }
      }
    });
  }

  /* ---------- average screen size by screen technology ---------- */
  if (document.getElementById('techSizeChart')) {
    new Chart(document.getElementById('techSizeChart'), {
      type: 'bar',
      data: {
        labels: ['LCD', 'LED-LCD', 'OLED'],
        datasets: [{
          label: 'Average screen size (inches)',
          data: [51.0, 59.7, 65.4],
          backgroundColor: palette.coral,
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
              label: function (ctx) { return ctx.parsed.x + '" average'; }
            }
          }
        },
        scales: {
          x: { beginAtZero: true, grid: gridOpt, ticks: tickOpt },
          y: { grid: { display: false }, ticks: tickOpt }
        }
      }
    });
  }

  /* ---------- energy by screen technology, within each size class ---------- */
  if (document.getElementById('techBySizeChart')) {
    new Chart(document.getElementById('techBySizeChart'), {
      type: 'bar',
      data: {
        labels: ['Small (< 43")', 'Medium (43"–65")', 'Large (> 65")'],
        datasets: [
          {
            label: 'LCD',
            data: [123, 357, 660],
            backgroundColor: palette.tealDim,
            borderRadius: 4,
            maxBarThickness: 40
          },
          {
            label: 'LED-LCD',
            data: [127, 386, 760],
            backgroundColor: palette.teal,
            borderRadius: 4,
            maxBarThickness: 40
          },
          {
            label: 'OLED',
            data: [232, 382, 723],
            backgroundColor: palette.amber,
            borderRadius: 4,
            maxBarThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top', labels: { color: palette.text, boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function (ctx) { return ctx.dataset.label + ': ~' + ctx.parsed.y + ' kWh / year'; }
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
  }
});
