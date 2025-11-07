// === Gestion de la sauvegarde du calendrier ===

function saveCalendar(calendarData) {
  try {
    calendarData.lastModified = new Date().toISOString();

    const storedData = JSON.parse(localStorage.getItem("calendarData"));
    if (storedData && new Date(storedData.lastModified) > new Date(calendarData.lastModified)) {
      showSaveStatus("conflict");
      return;
    }

    localStorage.setItem("calendarData", JSON.stringify(calendarData));
    showSaveStatus("ok");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    showSaveStatus("error");
  }
}

function loadCalendar() {
  const storedData = JSON.parse(localStorage.getItem("calendarData"));
  if (storedData) return storedData;
  else return { events: [], lastModified: new Date().toISOString() };
}

function showSaveStatus(status) {
  const statusEl = document.getElementById("save-status");
  if (!statusEl) return;

  if (status === "ok") {
    statusEl.textContent = " Sauvegarde réussie";
    statusEl.style.color = "green";
  } else if (status === "conflict") {
    statusEl.textContent = " Conflit détecté : quelqu’un d’autre a modifié le calendrier";
    statusEl.style.color = "orange";
  } else {
    statusEl.textContent = " Erreur de sauvegarde";
    statusEl.style.color = "red";
  }
}

window.addEventListener("storage", (event) => {
  if (event.key === "calendarData") {
    alert(" Le calendrier a été modifié dans un autre onglet !");
  }
});
