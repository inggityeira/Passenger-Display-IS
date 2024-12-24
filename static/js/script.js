function updateTime() {
    var now = new Date();

    // ambil waktu saat ini
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;


    // Ambil tanggal sekarang
    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu'
    ];
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dayNumber = now.getDate();
    const year = now.getFullYear();

    const currentDate = `${dayName}, ${dayNumber} ${monthName} ${year}`;

    document.getElementById('nowTime').textContent = currentTime;
    document.getElementById('nowDate').textContent = currentDate;
    
}
updateTime();   
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", () => {
    const stations = document.querySelectorAll(".list-group-item");
    let currentStation = 2; // Index stasiun saat ini (mulai dari 0)

    function updateStation() {
        stations.forEach((station, index) => {
            station.classList.remove("bg-primary", "bg-warning", "bg-secondary");

            if (index < currentStation) {
                station.classList.add("bg-primary"); // Stasiun yang sudah dilewati
            } else if (index === currentStation) {
                station.classList.add("bg-warning"); // Stasiun saat ini
            } else {
                station.classList.add("bg-secondary"); // Stasiun berikutnya
            }
        });
    }

    updateStation();

    // Simulasi perpindahan ke stasiun berikutnya setiap 5 detik
    setInterval(() => {
        if (currentStation < stations.length - 1) {
            currentStation++;
            updateStation();
        }
    }, 5000);
});