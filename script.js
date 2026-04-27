const star = `<span class="mrq-star"><svg width="20" height="20" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 0L22.8454 6.33832C24.8711 11.8127 29.1873 16.1289 34.6617 18.1546L41 20.5L34.6617 22.8454C29.1873 24.8711 24.8711 29.1873 22.8454 34.6617L20.5 41L18.1546 34.6617C16.1289 29.1873 11.8127 24.8711 6.33831 22.8454L0 20.5L6.33832 18.1546C11.8127 16.1289 16.1289 11.8127 18.1546 6.33831L20.5 0Z" fill="white"/></svg></span>`;
const chunk = `<span class="mrq-item">REFLECT FASHIN ${star}</span>`.repeat(8);
const t = document.getElementById('mrq');
if (t) {
  t.innerHTML = chunk + chunk;
}
