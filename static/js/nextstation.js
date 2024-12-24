// Fungsi memperbarui card berdasarkan kondisi timeline
function updateNextStationCard() {
    const nextStationCard = document.querySelector('#nextStationName');
    const stationStatus = document.querySelector('#stationStatus');
    const currentStation = document.querySelector('.timeline-item.current');
    const activeStations = Array.from(document.querySelectorAll('.timeline-item.active'));

    let stationName = "";
    let announcementText = "";

    if (currentStation) {
        stationName = currentStation.querySelector('.station-name').textContent.toUpperCase();
        nextStationCard.textContent = stationName;
        stationStatus.textContent = "Anda Berada di";
        announcementText = `Saat ini anda berada di ${stationName}`;
    } else {
        let nextStation = null;
        for (let station of document.querySelectorAll('.timeline-item')) {
            if (!station.classList.contains('active')) {
                nextStation = station;
                break;
            }
        }

        if (!nextStation && activeStations.length > 0) {
            nextStation = activeStations[activeStations.length - 1];
        }

        if (nextStation) {
            stationName = nextStation.querySelector('.station-name').textContent.toUpperCase();
            nextStationCard.textContent = stationName;
            stationStatus.textContent = "Stasiun Selanjutnya";
            announcementText = `Stasiun selanjutnya ${stationName}`;
        }
    }

    // Jika stationName ada, jalankan announcer dengan teks yang sesuai
    if (stationName) {
        playStationAnnouncement(announcementText);
    }
}

// Fungsi untuk mengumumkan stasiun menggunakan TTS
function playStationAnnouncement(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';  // Bahasa Indonesia
    window.speechSynthesis.speak(utterance);
}

// Jalankan fungsi pembaruan setiap kali rolling berjalan
setInterval(updateNextStationCard, 10000);
