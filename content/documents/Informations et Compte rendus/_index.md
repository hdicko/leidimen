---
date: "2019-11-06T10:26:29+01:00"
draft: false
title: Informations et Comptes rendus de reunions
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
  .map-container {
    transition: all 0.3s ease;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .map-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }
  
  .map-header {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    padding: 1.5rem;
    text-align: center;
  }
  
  .map-header h3 {
    color: white;
    margin: 0;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  #villages-map {
    height: 500px;
    width: 100%;
    background: white;
  }
  
  .map-footer {
    background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
    padding: 1.25rem;
    text-align: center;
    border-top: 3px solid #95a5a6;
  }
  
  .leaflet-popup-content {
    font-family: inherit;
  }
  
  .leaflet-popup-content h6 {
    margin: 0 0 0.5rem 0;
    color: #0d6efd;
    font-weight: 700;
  }
  
  .leaflet-popup-content p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
  
  .village-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }
  
  .badge-chef-lieu {
    background: #0d6efd;
    color: white;
  }
  
  .badge-village {
    background: #198754;
    color: white;
  }
  
  .village-label {
    background: white;
    border: 2px solid #0d6efd;
    border-radius: 8px;
    padding: 4px 8px;
    font-weight: 700;
    font-size: 0.85rem;
    color: #0d6efd;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
  }
  
  .village-label.chef-lieu {
    border-color: #0d6efd;
    color: #0d6efd;
    background: white;
  }
  
  .village-label.village {
    border-color: #198754;
    color: #198754;
    background: white;
  }
</style>

<div class="map-container my-5">
  <div class="map-header">
    <h3>
      <i class="bi bi-geo-alt-fill"></i>
      Localisation des villages d'intervention
    </h3>
  </div>
  
  <div id="villages-map"></div>
  
  <div class="map-footer">
    <span class="text-muted">
      <i class="bi bi-info-circle me-2"></i>
      Cliquez sur les marqueurs pour voir les détails de chaque village
    </span>
  </div>
</div>

<script>
  // Initialiser la carte centrée sur la région de Douentza
  const map = L.map('villages-map').setView([15.1, -2.95], 10);
  
  // Ajouter le fond de carte OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);
  
  // Données des villages
  const villages = [
    {
      name: "Douentza",
      lat: 15.0068749,
      lon: -2.9529649,
      type: "chef-lieu",
      description: "Chef-lieu de region, centre administratif",
      population: 25885,
      projects: ["école", "santé", "eau"]
    },
    {
      name: "Darawal",
      lat: 15.1708300,
      lon: -1.7340800,
      type: "village",
      description: "Village rural avec école primaire",
      population: 2500,
      projects: ["puits", "école"]
    },
    {
      name: "Debere",
      lat: 15.1051109,
      lon: -3.0106193,
      type: "village",
      description: "Village agricole et d'élevage",
      population: 7485,
      projects: ["agriculture", "élevage"]
    },
    {
      name: "Diambana",
      lat: 15.0567,
      lon: -2.8765,
      type: "village",
      description: "Village avec centre de santé communautaire",
      population: 3200,
      projects: ["santé", "eau", "éducation"]
    },
    {
      name: "Diona",
      lat: 15.32591,
      lon: -3.23359,
      type: "chef-lieu",
      description: "Village pastoral et agricole",
      population: 3713,
      projects: ["eau", "agriculture", "éducation"]
    },
    {
      name: "Dorool",
      lat: 15.4704400,
      lon: -3.2711600,
      type: "village",
      description: "Village avec école communautaire",
      population: 2100,
      projects: ["école", "formation"]
    },
    {
      name: "Tanal",
      lat: 15.3364548,
      lon: -3.1302111,
      type: "village",
      description: "Village avec projet de développement rural",
      population: 1900,
      projects: ["développement rural", "coopératives"]
    },
    {
      name: "Manko",
      lat: 15.0283,
      lon: -2.9894,
      type: "village",
      description: "Village rural dans la région de Douentza",
      population: 1500,
      projects: ["Fournitures scolaires"]
    },
    {
      name: "Tacouti",
      lat: 14.9750,
      lon: -2.8833,
      type: "village",
      description: "Village rural dans la région de Douentza",
      population: 1200,
      projects: ["Fournitures scolaires"]
    },
    {
      name: "N'Dumpa",
      lat: 15.1167,
      lon: -2.9500,
      type: "village",
      description: "Village rural dans la région de Douentza",
      population: 1800,
      projects: ["Fournitures scolaires"]
    }
  ];
  
  // Icônes personnalisées pour les différents types
  const chefLieuIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const villageIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  // Ajouter les marqueurs pour chaque village
  villages.forEach(village => {
    const icon = village.type === 'chef-lieu' ? chefLieuIcon : villageIcon;
    const badgeClass = village.type === 'chef-lieu' ? 'badge-chef-lieu' : 'badge-village';
    const labelClass = village.type === 'chef-lieu' ? 'chef-lieu' : 'village';
    
    const popupContent = `
      <div>
        <h6>${village.name}</h6>
        <p><strong>Population:</strong> ${village.population.toLocaleString()} habitants</p>
        <p><strong>Description:</strong> ${village.description}</p>
        <p><strong>Projets:</strong> ${village.projects.join(', ')}</p>
        <span class="village-badge ${badgeClass}">${village.type === 'chef-lieu' ? 'Chef-lieu' : 'Village'}</span>
      </div>
    `;
    
    const marker = L.marker([village.lat, village.lon], { icon: icon })
      .bindPopup(popupContent)
      .addTo(map);
    
    // Ajouter un label permanent avec le nom du village
    marker.bindTooltip(village.name, {
      permanent: true,
      direction: 'top',
      className: `village-label ${labelClass}`,
      offset: [0, -35]
    });
  });
</script>
