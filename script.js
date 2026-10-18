function toggleDetails(button) {
  const details = button.nextElementSibling;
  details.classList.toggle("hidden");
}
(function () {
      var tabs = document.querySelectorAll('[role="tab"]');
      function show(i) {
        tabs.forEach(function (t, k) {
          var on = k === i;
          t.setAttribute('aria-selected', on);
          document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        });
      }
      tabs.forEach(function (t, k) {
        t.addEventListener('click', function () { show(k) });
        t.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight') { show((k + 1) % tabs.length); tabs[(k + 1) % tabs.length].focus() }
          if (e.key === 'ArrowLeft') { show((k + tabs.length - 1) % tabs.length); tabs[(k + tabs.length - 1) % tabs.length].focus() }
        });
      });
    })();

document.getElementById("toggle-era").addEventListener("click", function() {
  const table = document.getElementById("comparison-table");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    if (cells[1].textContent.includes("Fabrikarbeiter")) {
      cells[1].textContent = "Alle Arbeitnehmer:innen";
      cells[2].textContent = "Alle Bürger:innen (auch Selbstständige, Rentner)";
    } else if (cells[1].textContent.includes("Arztbesuche")) {
      cells[1].textContent = "Vollkostenübernahme, auch für Familienangehörige";
      cells[2].textContent = "Zuzahlungen, aber weitreichende Leistungen";
    } else if (cells[1].textContent.includes("70")) {
      cells[1].textContent = "Ab 67 Jahren, Beitrag: 18,6% des Lohns";
      cells[2].textContent = "Ab 67 Jahren, Beitrag: 18,6% des Lohns (2026)";
    } else if (cells[1].textContent.includes("Betriebsunfällen")) {
      cells[1].textContent = "Alle Unfälle, auch im Privatleben, gesetzlich geregelt";
      cells[2].textContent = "Alle Unfälle, auch im Privatleben, gesetzlich geregelt";
    }
  });
});

document.getElementById("quiz-submit").addEventListener("click", function() {
  const resultDiv = document.getElementById("quiz-result");
  const questions = document.querySelectorAll('.quiz-question');
  let score = 0;

  // Clear previous markings
  questions.forEach(q => {
    q.querySelectorAll('label').forEach(l => {
      l.classList.remove('correct-answer', 'wrong-selection');
    });
  });

  questions.forEach(q => {
    const correct = q.dataset.correct;
    const firstInput = q.querySelector('input[type="radio"]');
    if (!firstInput) return;
    const name = firstInput.name;
    const selected = q.querySelector(`input[name="${name}"]:checked`);
    const correctInput = q.querySelector(`input[type="radio"][value="${correct}"]`);

    if (selected) {
      if (selected.value === correct) {
        score++;
        const lbl = selected.closest('label');
        if (lbl) lbl.classList.add('correct-answer');
      } else {
        const lblSel = selected.closest('label');
        if (lblSel) lblSel.classList.add('wrong-selection');
        if (correctInput) {
          const lblCorr = correctInput.closest('label');
          if (lblCorr) lblCorr.classList.add('correct-answer');
        }
      }
    } else {
      // Keine Auswahl: zeige die richtige Antwort
      if (correctInput) {
        const lblCorr = correctInput.closest('label');
        if (lblCorr) lblCorr.classList.add('correct-answer');
      }
    }
  });

  const total = questions.length;
  resultDiv.classList.remove('hidden');
  if (score === total) {
    resultDiv.innerHTML = `<p>✅ Perfekt! Du hast ${score}/${total} Fragen richtig beantwortet.</p>`;
  } else {
    resultDiv.innerHTML = `<p>Du hast ${score}/${total} Fragen richtig beantwortet.</p>
                           <p>Lies dir die Fragen noch einmal sorgfältig durch.</p>`;
  }
  // Zeige Reset-Button
  const resetBtn = document.getElementById('quiz-reset');
  if (resetBtn) resetBtn.classList.remove('hidden');
});

// Reset / Try again
document.getElementById('quiz-reset').addEventListener('click', function() {
  const questions = document.querySelectorAll('.quiz-question');
  questions.forEach(q => {
    q.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
    q.querySelectorAll('label').forEach(l => {
      l.classList.remove('correct-answer', 'wrong-selection');
    });
  });
  const resultDiv = document.getElementById('quiz-result');
  resultDiv.classList.add('hidden');
  resultDiv.innerHTML = '';
  const resetBtn = document.getElementById('quiz-reset');
  if (resetBtn) resetBtn.classList.add('hidden');
  // Bring focus back to first question
  const firstInput = document.querySelector('.quiz-question input[type="radio"]');
  if (firstInput) firstInput.focus();
});