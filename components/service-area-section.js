import ContactActions from "./contact-actions";

const SERVICE_AREAS = [
  { label: "Telšiuose", coordinates: [98.5, 62.2] },
  { label: "Plungėje", coordinates: [77.8, 68.5] },
  { label: "Mažeikiuose", coordinates: [103.4, 32.7] },
  { label: "Šiauliuose", coordinates: [153.4, 66.4] },
  { label: "Klaipėdos regione", coordinates: [41.7, 87.2] },
];
const REGION_AREA = "Visoje Žemaitijoje";
const DEFAULT_AREAS = [...SERVICE_AREAS.map((area) => area.label), REGION_AREA];

function orderAreas(areas) {
  const provided = new Set([...DEFAULT_AREAS, ...areas]);
  return [
    ...SERVICE_AREAS.filter((area) => provided.has(area.label)).map(
      (area) => area.label,
    ),
    ...[...DEFAULT_AREAS, ...areas].filter(
      (area) =>
        !SERVICE_AREAS.some((serviceArea) => serviceArea.label === area) &&
        area !== REGION_AREA,
    ),
    ...(provided.has(REGION_AREA) ? [REGION_AREA] : []),
  ];
}

export default function ServiceAreaSection({
  title,
  areas = [],
  intro,
  message,
  className = "",
}) {
  const orderedAreas = orderAreas(areas.length ? areas : DEFAULT_AREAS);
  const numberedAreas = orderedAreas.filter((area) => area !== REGION_AREA);

  return (
    <section
      className={`service-area-section ${className}`.trim()}
      aria-labelledby="service-area-heading"
    >
      <h2 id="service-area-heading">{title}</h2>
      {intro && <p className="service-area-intro">{intro}</p>}
      <div className="service-area-content">
        <div className="service-area-map">
          <svg
            viewBox="0 0 360 270"
            role="img"
            aria-label="Lietuvos žemėlapis su pažymėtomis aptarnaujamomis vietovėmis"
          >
            <path
              className="service-area-map-land"
              d="M32.1 125.4 29.1 124.7 35 114.3 37.3 107.6 38.8 98 40.2 95 40.3 99.4 39.6 106.6 35.9 119 32.1 125.4ZM125.2 208.4 123.1 204 120.8 196.1 121 189.8 122.3 183.6 128.6 165 128.3 162.1 123.7 156.9 118.1 153.1 115 145.2 103.6 144.7 92.9 145.2 89.5 144.8 79.3 141.4 69.5 136.1 62.9 132.9 57.3 129.4 54.3 125.7 49.6 126.7 46.4 126.7 44.7 119.6 46.5 109.5 43.1 94.9 37.5 77.3 37.1 58.4 36.7 54.2 50.5 43.6 68 32.2 71.9 31.2 88 24.4 90.1 23.9 104.6 25.1 116 26.7 125.6 26.5 130.9 24.8 135.7 26.3 139.5 31.3 143.5 30.7 147.4 27.5 168.8 30.5 173.7 30.4 179.1 30.9 189.2 33.9 195 36.7 207.7 35 213.2 34.9 216 33.8 224.8 26.2 228.6 24.9 232.1 23.5 235.3 24.7 237.4 31.2 243.9 42.5 250.9 44.4 270.4 48.8 274.4 51.1 285.4 61 292 65.9 296.2 69.8 302.6 77.4 306.2 83 312.4 87.2 319.7 90 322.3 90.4 322.2 94.5 320.9 101.3 318.5 110.2 315.9 117 315.3 119.7 317.3 121.9 326.8 122.9 330.9 124.1 331.7 125.9 329.6 128.3 326.5 130.3 325.2 132.1 322.7 138.8 306.8 137.9 304.7 139.3 303.7 142.4 302.9 146 300.8 150.2 296.6 153.9 289.9 155.3 284.5 157.8 280.5 165.5 277.5 175.9 277.5 183.3 277.9 187.4 277.6 189.7 275.6 192.3 272.2 199.1 269.5 206.6 268.5 210.6 269 212.5 272 212.6 276.4 214.1 278.8 217.1 279.7 220.6 279.7 224.3 278.9 226.4 275.3 227.9 269.8 227.9 266.6 226.1 265.9 224.7 267.4 221.1 266.3 216.7 264 214.2 259.4 217.9 254.9 217.9 249.5 221.2 246 226.6 242.6 228.5 233.6 227.4 231.3 229.8 229.4 240.7 228.3 242.8 220.7 242.3 213.4 246.6 205.2 250.1 201 247.7 198.6 245 194.1 245.4 189.2 246.7 185.9 246 182.2 246.3 175.1 248.4 166.1 247.7 162.2 245.9 161.9 244.2 162.2 240 162.1 233.4 160.6 227.6 156.3 222.5 151.8 218.9 146.1 215.2 141.8 213.5 139.5 213.1 138.9 211 138.1 209.1 136.1 207.5 131.8 205.4 128.2 204.9 125.2 208.4Z"
            />
            <path
              className="service-area-map-region"
              d="M37.1 58.4 36.7 54.2 50.5 43.6 68 32.2 71.9 31.2 88 24.4 90.1 23.9 104.6 25.1 116 26.7 125.6 26.5 130.9 24.8 135.7 26.3 139.5 31.3 143.5 30.7 147.4 27.5 168.8 30.5 163 43 158 55 153 68 146 83 140 100 133 116 124 132 115 145.2 103.6 144.7 92.9 145.2 89.5 144.8 79.3 141.4 69.5 136.1 62.9 132.9 57.3 129.4 54.3 125.7 49.6 126.7 46.4 126.7 44.7 119.6 46.5 109.5 43.1 94.9 37.5 77.3Z"
            />
            <text className="service-area-map-region-label" x="96" y="111">
              ŽEMAITIJA
            </text>
            <g className="service-area-map-markers" aria-hidden="true">
              {SERVICE_AREAS.filter((area) =>
                numberedAreas.includes(area.label),
              ).map((area) => {
                const number = numberedAreas.indexOf(area.label) + 1;
                return (
                  <g
                    key={area.label}
                    transform={`translate(${area.coordinates[0]} ${area.coordinates[1]})`}
                  >
                    <path d="M0 0c-2-3-8-9-8-13a8 8 0 1 1 16 0c0 4-6 10-8 13Z" />
                    <text x="0" y="-13">
                      {number}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="service-area-map-legend">
            <span className="service-area-legend-location">
              Aptarnaujame šiose vietovėse
            </span>
            <span className="service-area-legend-region">Žemaitija</span>
          </div>
        </div>
        <ul>
          {orderedAreas.map((area) => {
            const number = numberedAreas.indexOf(area);
            return (
              <li key={area}>
                <span
                  className={`service-area-marker${number < 0 ? " service-area-marker-region" : ""}`}
                  aria-hidden="true"
                >
                  {number < 0 ? "" : number + 1}
                </span>
                <span>{area}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {message && <p>{message}</p>}
      <ContactActions />
    </section>
  );
}
