/* =========================================================
   Appliance Energy Consumption Website — main.js
   Shared across all pages. Each block checks the DOM exists
   before running, so this one file is safe to include everywhere.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  setFooterYear();
  initFaqAccordion();
  initCalculator();
});

/* ---------- Footer year ---------- */
function setFooterYear() {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- FAQ accordion (Home page) ---------- */
function initFaqAccordion() {
  var questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = document.getElementById(btn.getAttribute('aria-controls'));

      btn.setAttribute('aria-expanded', String(!expanded));

      if (!expanded) {
        // opening: set max-height to the content's real height
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        // closing
        answer.style.maxHeight = 0;
      }
    });
  });
}

/* ---------- Appliance Energy Calculator (Televisions page) ---------- */
function initCalculator() {
  var form = document.getElementById('calcForm');
  if (!form) return;

  var applianceSelect = document.getElementById('applianceSelect');
  var customWattField = document.getElementById('customWattField');
  var wattsInput = document.getElementById('wattsInput');
  var hoursInput = document.getElementById('hoursInput');
  var priceInput = document.getElementById('priceInput');
  var resultsPanel = document.getElementById('resultsPanel');

  // Toggle the custom-watts field depending on dropdown choice
  applianceSelect.addEventListener('change', function () {
    var isCustom = applianceSelect.value === 'custom';
    customWattField.style.display = isCustom ? 'block' : 'none';
    if (!isCustom) {
      clearFieldError(wattsInput);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    runCalculation();
  });

  // Live recalculation once results already exist, for a smoother feel
  [applianceSelect, wattsInput, hoursInput, priceInput].forEach(function (el) {
    el.addEventListener('input', function () {
      if (resultsPanel.dataset.hasResult === 'true') {
        runCalculation();
      }
    });
  });

  function runCalculation() {
    var watts = getWatts();
    var hours = parseFloat(hoursInput.value);
    var priceCents = parseFloat(priceInput.value);

    var valid = true;

    if (watts === null || isNaN(watts) || watts <= 0) {
      setFieldError(applianceSelect.value === 'custom' ? wattsInput : applianceSelect, 'Enter a valid wattage above 0.');
      valid = false;
    } else {
      clearFieldError(applianceSelect.value === 'custom' ? wattsInput : applianceSelect);
    }

    if (isNaN(hours) || hours < 0 || hours > 24) {
      setFieldError(hoursInput, 'Hours per day must be between 0 and 24.');
      valid = false;
    } else {
      clearFieldError(hoursInput);
    }

    if (isNaN(priceCents) || priceCents <= 0) {
      setFieldError(priceInput, 'Enter a valid price in cents per kWh.');
      valid = false;
    } else {
      clearFieldError(priceInput);
    }

    if (!valid) {
      resultsPanel.dataset.hasResult = 'false';
      renderEmptyResults('Fix the highlighted fields to see your results.');
      return;
    }

    var dailyKwh = (watts * hours) / 1000;
    var monthlyKwh = dailyKwh * 30;
    var yearlyKwh = dailyKwh * 365;
    var pricePerKwh = priceCents / 100;
    var monthlyCost = monthlyKwh * pricePerKwh;
    var yearlyCost = yearlyKwh * pricePerKwh;

    renderResults({
      dailyKwh: dailyKwh,
      monthlyKwh: monthlyKwh,
      yearlyKwh: yearlyKwh,
      monthlyCost: monthlyCost,
      yearlyCost: yearlyCost
    });

    resultsPanel.dataset.hasResult = 'true';
  }

  function getWatts() {
    if (applianceSelect.value === 'custom') {
      return parseFloat(wattsInput.value);
    }
    var opt = applianceSelect.options[applianceSelect.selectedIndex];
    return parseFloat(opt.dataset.watts);
  }

  function renderResults(data) {
    resultsPanel.innerHTML =
      '<h3>Estimated consumption</h3>' +
      resultRow('Daily energy', data.dailyKwh.toFixed(2) + ' kWh') +
      resultRow('Monthly energy', data.monthlyKwh.toFixed(1) + ' kWh') +
      resultRow('Yearly energy', data.yearlyKwh.toFixed(0) + ' kWh') +
      resultRow('Estimated monthly cost', 'A$' + data.monthlyCost.toFixed(2)) +
      resultRow('Estimated yearly cost', 'A$' + data.yearlyCost.toFixed(2));
  }

  function renderEmptyResults(message) {
    resultsPanel.innerHTML = '<h3>Estimated consumption</h3><p class="results-empty">' + message + '</p>';
  }

  function resultRow(label, value) {
    return '<div class="result-row"><span class="r-label">' + label + '</span><span class="r-value">' + value + '</span></div>';
  }

  function setFieldError(inputEl, message) {
    var wrapper = inputEl.closest('.field');
    if (!wrapper) return;
    wrapper.classList.add('invalid');
    var errorEl = wrapper.querySelector('.error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearFieldError(inputEl) {
    var wrapper = inputEl.closest('.field');
    if (!wrapper) return;
    wrapper.classList.remove('invalid');
  }

  // Initial state on page load / after refresh
  renderEmptyResults('Fill in the form and press Calculate to see results here.');
}
