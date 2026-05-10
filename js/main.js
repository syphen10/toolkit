const TOOLS = [
  // PDF
  { name: 'PDF to Image', icon: '🖼️', cat: 'PDF Tools', url: '/tools/pdf-to-image.html' },
  { name: 'PDF Compressor', icon: '🗜️', cat: 'PDF Tools', url: '/tools/pdf-compressor.html' },
  { name: 'Merge PDFs', icon: '📎', cat: 'PDF Tools', url: '/tools/merge-pdf.html' },
  { name: 'Split PDF', icon: '✂️', cat: 'PDF Tools', url: '/tools/split-pdf.html' },
  { name: 'PDF to Text', icon: '📝', cat: 'PDF Tools', url: '/tools/pdf-to-text.html' },
  // Image
  { name: 'Image Compressor', icon: '📉', cat: 'Image Tools', url: '/tools/image-compressor.html' },
  { name: 'Image to PDF', icon: '📄', cat: 'Image Tools', url: '/tools/image-to-pdf.html' },
  { name: 'Image Resizer', icon: '📐', cat: 'Image Tools', url: '/tools/image-resizer.html' },
  { name: 'Image Converter', icon: '🔄', cat: 'Image Tools', url: '/tools/image-converter.html' },
  { name: 'Image to Base64', icon: '🔢', cat: 'Image Tools', url: '/tools/image-to-base64.html' },
  // Text
  { name: 'Word Counter', icon: '🔤', cat: 'Text Tools', url: '/tools/word-counter.html' },
  { name: 'Text Case Converter', icon: '🔡', cat: 'Text Tools', url: '/tools/text-case-converter.html' },
  { name: 'Lorem Ipsum Generator', icon: '📜', cat: 'Text Tools', url: '/tools/lorem-ipsum.html' },
  { name: 'Text to Speech', icon: '🔊', cat: 'Text Tools', url: '/tools/text-to-speech.html' },
  { name: 'Markdown to HTML', icon: '⬇️', cat: 'Text Tools', url: '/tools/markdown-to-html.html' },
  // Generator
  { name: 'QR Code Generator', icon: '◼️', cat: 'Generator Tools', url: '/tools/qr-generator.html' },
  { name: 'Barcode Generator', icon: '▌▐', cat: 'Generator Tools', url: '/tools/barcode-generator.html' },
  { name: 'Password Generator', icon: '🔑', cat: 'Generator Tools', url: '/tools/password-generator.html' },
  { name: 'UUID Generator', icon: '🆔', cat: 'Generator Tools', url: '/tools/uuid-generator.html' },
  { name: 'Color Palette Generator', icon: '🎨', cat: 'Generator Tools', url: '/tools/color-palette.html' },
  // Developer
  { name: 'JSON Formatter', icon: '{ }', cat: 'Developer Tools', url: '/tools/json-formatter.html' },
  { name: 'Base64 Encoder/Decoder', icon: '⇄', cat: 'Developer Tools', url: '/tools/base64-encoder.html' },
  { name: 'URL Encoder/Decoder', icon: '🔗', cat: 'Developer Tools', url: '/tools/url-encoder.html' },
  { name: 'HTML Formatter', icon: '🌐', cat: 'Developer Tools', url: '/tools/html-formatter.html' },
  { name: 'CSS Minifier', icon: '💨', cat: 'Developer Tools', url: '/tools/css-minifier.html' },
];

// Search
function initSearch(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.style.display = 'none'; return; }
    const matches = TOOLS.filter(t => t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q));
    if (!matches.length) { results.style.display = 'none'; return; }
    results.innerHTML = matches.slice(0, 6).map(t => `
      <div class="search-result-item" onclick="location.href='${t.url}'">
        <span class="sri-icon">${t.icon}</span>
        <div><div class="sri-name">${t.name}</div><div class="sri-cat">${t.cat}</div></div>
      </div>
    `).join('');
    results.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) results.style.display = 'none';
  });
}

// Toast
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast'; el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

// Copy
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => toast('Copied to clipboard!')).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta); toast('Copied!');
  });
}

// Download
function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// Download canvas as image
function downloadCanvas(canvas, filename = 'image.png') {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = filename; a.click();
}

window.addEventListener('DOMContentLoaded', () => {
  initSearch('header-search-input', 'header-search-results');
  initSearch('hero-search-input', 'hero-search-results');
});
