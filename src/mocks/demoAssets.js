const svgDataUri = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

export const demoImageDataUri = (label = "Travel Sync") =>
  svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#0f766e"/>
          <stop offset="0.55" stop-color="#2563eb"/>
          <stop offset="1" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="900" height="600" fill="url(#bg)"/>
      <circle cx="710" cy="130" r="94" fill="#ffffff" opacity="0.16"/>
      <circle cx="150" cy="500" r="130" fill="#ffffff" opacity="0.11"/>
      <path d="M180 360 C300 210 445 430 720 235" fill="none" stroke="#ffffff" stroke-width="22" stroke-linecap="round" opacity="0.65"/>
      <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="#ffffff">${label}</text>
      <text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#d1fae5">Demo data</text>
    </svg>
  `);

export const logoDataUri = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <rect width="96" height="96" rx="24" fill="#111827"/>
    <path d="M22 55 L74 25 L55 74 L46 52 Z" fill="#34d399"/>
    <path d="M46 52 L74 25 L51 59 Z" fill="#60a5fa"/>
  </svg>
`);

export const alertIconDataUri = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <circle cx="48" cy="48" r="42" fill="#dc2626"/>
    <rect x="43" y="22" width="10" height="42" rx="5" fill="#fff"/>
    <circle cx="48" cy="74" r="6" fill="#fff"/>
  </svg>
`);

export const notFoundDataUri = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420">
    <rect width="720" height="420" rx="32" fill="#f1f5f9"/>
    <path d="M105 285 C180 160 290 325 395 180 C455 98 560 125 625 235" fill="none" stroke="#2563eb" stroke-width="18" stroke-linecap="round"/>
    <circle cx="160" cy="132" r="48" fill="#34d399"/>
    <text x="360" y="230" text-anchor="middle" font-family="Arial, sans-serif" font-size="96" font-weight="700" fill="#111827">404</text>
    <text x="360" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#475569">Page not found</text>
  </svg>
`);

export const flagDataUri = (code = "EG") =>
  svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 60">
      <rect width="90" height="60" rx="8" fill="#e5e7eb"/>
      <rect width="90" height="20" rx="8" fill="#ef4444"/>
      <rect y="20" width="90" height="20" fill="#ffffff"/>
      <rect y="40" width="90" height="20" rx="8" fill="#111827"/>
      <text x="45" y="39" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#111827">${code}</text>
    </svg>
  `);
