let currentIndex = 0;      // Rolling tampilan (max 6 stasiun)
let progressIndex = 0;     // Menentukan perpindahan class 'current'
let isTraveling = false;   // Menandakan sedang dalam perjalanan
let stations = Array.from(document.querySelectorAll('.timeline-item'));
const totalStations = stations.length;
const maxDisplay = 6;
let rollingInterval;
let classUpdateInterval;

// Sembunyikan semua stasiun dan reset class
function hideAllStations() {
    stations.forEach(station => {
        station.classList.add('hidden');
        station.classList.remove('current', 'no-line');
    });
}

// Update tampilan stasiun (Rolling Visual)
function updateStations() {
    hideAllStations();
    let lastVisibleIndex = 0;

    // Tampilkan maksimal 6 stasiun (rolling)
    for (let i = 0; i < maxDisplay; i++) {
        let index = currentIndex + i;
        if (index < totalStations) {
            stations[index].classList.remove('hidden');
            lastVisibleIndex = index;
        }
    }

    // Hapus semua 'no-line' dari stasiun
    stations.forEach(station => station.classList.remove('no-line'));

    // Tetapkan 'no-line' pada stasiun terakhir yang terlihat
    if (lastVisibleIndex < totalStations) {
        stations[lastVisibleIndex].classList.add('no-line');
    }

    // Jalankan rolling untuk 6 stasiun berikutnya setiap 3 detik
    if (currentIndex + maxDisplay < totalStations) {
        currentIndex++;
    }
}

// Update class current dan active setiap 1 detik
function updateClass() {
    stations.forEach((station, index) => {
        if (index <= progressIndex) {
            station.classList.add('active');  // Beri active untuk stasiun yang dilewati
        }
        station.classList.remove('current');  // Reset semua current
    });

    if (!isTraveling && progressIndex < totalStations) {
        stations[progressIndex].classList.add('current');
    }

    // Update perjalanan
    if (progressIndex === totalStations - 1) {
        reverseStationOrder();
    } else {
        if (isTraveling) {
            progressIndex++;
            isTraveling = false;
        } else {
            isTraveling = true;
        }
    }

    updateStationNumbers();
}

// Fungsi untuk memperbarui angka indeks ASC meskipun urutan dibalik
function updateStationNumbers() {
    stations.forEach((station, index) => {
        const circle = station.querySelector('.circle');
        if (circle) {
            circle.textContent = index + 1;  // Tetap ASC berdasarkan posisi DOM
        }
    });
}

// Membalik urutan stasiun langsung di DOM (ASC ⇆ DESC)
function reverseStationOrder() {
    const stationTimeline = document.getElementById("station-timeline");

    // **Hapus semua active dan current sebelum reverse**
    stations.forEach(station => station.classList.remove('current', 'active', 'no-line'));

    // Balik urutan elemen di DOM
    stations.reverse();
    stations.forEach(station => {
        stationTimeline.appendChild(station);
    });

    // Reset rolling dan progress
    progressIndex = 0;
    currentIndex = 0;

    // Tetapkan stasiun pertama sebagai current setelah reverse
    stations[0].classList.add('current');

    // Tetapkan 'no-line' ke stasiun terakhir setelah reverse
    stations[maxDisplay - 1].classList.add('no-line');

    // Perbarui angka indeks setelah reverse
    updateStationNumbers();

    isAscending = !isAscending;  // Toggle ASC/DESC

    console.log(`Urutan DOM dibalik! Sekarang urutan: ${isAscending ? 'ASC' : 'DESC'}`);
}

// Inisialisasi rolling dan class update pertama kali
updateStations();
updateClass();
rollingInterval = setInterval(updateStations, 30000);  // Jalankan rolling visual setiap 3 detik
classUpdateInterval = setInterval(updateClass, 10000); // Perbarui class setiap 1 detik
