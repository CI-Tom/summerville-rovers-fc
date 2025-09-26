// Simple data-driven site logic
const CLUB = {
  name: "Summerville Rovers F.C.",
  founded: 1956,
};

function byId(id){ return document.getElementById(id); }

function formatDate(iso){
  const d = new Date(iso + (iso.length===10 ? "T00:00:00" : ""));
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'2-digit' });
}

function loadFixtures(){
  return fetch('data/fixtures.json')
    .then(r=>r.json())
    .then(rows=>{
      const tbody = document.querySelector('#fixturesTable tbody');
      tbody.innerHTML = '';
      rows.forEach(r=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${formatDate(r.date)}</td>
          <td>${r.comp || 'League'}</td>
          <td>${r.home ? 'Home' : 'Away'}</td>
          <td>${r.opponent}</td>
          <td>${r.time || ''}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function loadTable(){
  return fetch('data/table.json')
    .then(r=>r.json())
    .then(rows=>{
      const table = document.querySelector('#leagueTable');
      const headers = ['Pos','Team','P','W','D','L','GF','GA','PTS'];
      table.innerHTML = '<thead><tr>' + headers.map(h=>`<th>${h}</th>`).join('') + '</tr></thead><tbody></tbody>';
      const tbody = table.querySelector('tbody');
      rows.forEach((row, i)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${i+1}</td>
          <td><strong>${row.team}</strong></td>
          <td>${row.p}</td><td>${row.w}</td><td>${row.d}</td><td>${row.l}</td>
          <td>${row.gf}</td><td>${row.ga}</td><td><strong>${row.pts}</strong></td>`;
        if(i===0) tr.style.backgroundColor = 'rgba(14,165,233,.08)';
        tbody.appendChild(tr);
      });
    });
}

function loadNews(){
  return fetch('data/news.json')
    .then(r=>r.json())
    .then(items=>{
      const grid = document.getElementById('newsGrid');
      grid.innerHTML = '';
      items.forEach(n=>{
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <img src="${n.image}" alt="${n.title}">
          <div class="card-body">
            <div class="card-meta">${formatDate(n.date)}</div>
            <h3 class="card-title">${n.title}</h3>
            <p>${n.excerpt}</p>
            ${n.url ? `<p><a href="${n.url}" target="_blank" rel="noopener">Read more →</a></p>` : ''}
          </div>`;
        grid.appendChild(card);
      });
    });
}

function loadGallery(){
  return fetch('data/gallery.json')
    .then(r=>r.json())
    .then(imgs=>{
      const grid = document.getElementById('galleryGrid');
      grid.innerHTML = '';
      imgs.forEach(src=>{
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Gallery image';
        grid.appendChild(img);
      });
    });
}

function loadSponsors(){
  return fetch('data/sponsors.json')
    .then(r=>r.json())
    .then(list=>{
      const grid = document.getElementById('sponsorGrid');
      grid.innerHTML = '';
      list.forEach(s=>{
        const div = document.createElement('div');
        div.className = 'sponsor';
        div.innerHTML = `<img alt="${s.name}" src="${s.logo}" style="max-height:40px;max-width:100%;">`;
        grid.appendChild(div);
      });
    });
}

function init(){
  // set dynamic text
  const yearEl = byId('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();
  const seasonsEl = byId('seasons'); if(seasonsEl) seasonsEl.textContent = (new Date().getFullYear() - CLUB.founded);

  Promise.all([loadFixtures(), loadTable(), loadNews(), loadGallery(), loadSponsors()]);
}

document.addEventListener('DOMContentLoaded', init);
