// Leaflet interactive map — Douentza region, Mali
// Depends on: Leaflet.js (loaded before this script)

document.addEventListener('DOMContentLoaded', function () {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  var map = L.map('map').setView([15.3252, -3.2346], 8);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.circle([15.3252, -3.2346], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
});
