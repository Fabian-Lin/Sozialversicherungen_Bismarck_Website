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
  const frage1 = document.querySelector("input[name='frage1']:checked");
  const frage2 = document.querySelector("input[name='frage2']:checked");
  const resultDiv = document.getElementById("quiz-result");

  let score = 0;

  if (frage1 && frage1.value === "b") score++;
  if (frage2 && frage2.value === "b") score++;

  resultDiv.classList.remove("hidden");
  if (score === 2) {
    resultDiv.innerHTML = `<p>✅ Perfekt! Du hast ${score}/2 Fragen richtig beantwortet.</p>`;
  } else {
    resultDiv.innerHTML = `<p>📚 Fast geschafft! Du hast ${score}/2 Fragen richtig beantwortet.</p>
                           <p>Tipp: Schau dir die Zeitleiste nochmal an!</p>`;
  }
});