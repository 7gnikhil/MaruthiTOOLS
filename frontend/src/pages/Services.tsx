import React, { useEffect, useRef, useState } from 'react';
import { MOCK_SERVICES_DB } from '../api/mock-data';

// ─────────────────────────────────────────────────────────────────
// ANATOMY — How to edit the Services web design:
//
// SERVICES LIST     → src/api/mock-data.ts → MOCK_SERVICES_DB array
//   Each service has: title, description, icon (emoji string below)
//
// SERVICE ICONS     → `SERVICE_ICONS` map below — change any emoji
//
// CENTRE NODE TEXT  → <text> elements inside the <svg> around line 80
//
// WEB COLOUR        → `stroke` on <line> elements — currently white/20
// NODE COLOUR       → `fill` on <circle> elements — changes on hover
// BACKGROUND        → bg-[#05101f] on the outer <section> — dark navy
// WEB GLOW LINES    → animated lines at bottom of SVG — stroke-dasharray
//
// NODE POSITIONS    → `nodes` array — x,y are percentage of SVG size
//   To add a service node: add to both MOCK_SERVICES_DB and nodes array
//
// CARD TEXT         → change title/description in MOCK_SERVICES_DB
//
// PANEL ANIMATION   → `transition-all duration-300` on the info panel
// ─────────────────────────────────────────────────────────────────

// ── Service icons (emoji) ─────────────────────────────────────────
const SERVICE_ICONS: Record<string, string> = {
  'LightBulbIcon':        '💡',
  'WrenchScrewdriverIcon':'🔧',
  'CubeTransparentIcon':  '🧊',
  'ShieldCheckIcon':      '🛡️',
  'GearIcon':             '⚙️',
  'LayersIcon':           '📐',
};

// ── Node layout — x,y as % of 600x600 SVG viewBox ────────────────
// To reposition: change x/y values (0-600 range)
const NODE_POSITIONS = [
  { x: 300, y: 60  },  // top centre    → service[0]
  { x: 530, y: 200 },  // top right     → service[1]
  { x: 530, y: 400 },  // bottom right  → service[2]
  { x: 300, y: 520 },  // bottom centre → service[3]
  { x: 70,  y: 400 },  // bottom left   → (extra node, not a service)
  { x: 70,  y: 200 },  // top left      → (extra node)
];

// ── Spider web edges (which nodes connect to which) ───────────────
// Each pair [from, to] draws a line. Add/remove pairs to change the web.
const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,0], // outer ring
  [0,2],[1,3],[2,4],[3,5],[4,0],[5,1], // diagonals
  [0,3],[1,4],[2,5],                    // long crosses
];

const Services: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fade-in on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const services = MOCK_SERVICES_DB;
  const CX = 300; // Centre X of SVG
  const CY = 295; // Centre Y of SVG

  return (
    <section className="min-h-screen bg-[#05101f] py-16 md:py-24 overflow-hidden">
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="text-center mb-12 px-6">
        <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-2">
          What We Do
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Services</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Comprehensive precision engineering — from concept to finished component.
        </p>
      </div>

      <div
        ref={sectionRef}
        className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-8
                    transition-all duration-1000 ease-out
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >

        {/* ── Spider Web SVG ─────────────────────────────────── */}
        <div className="w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 600 590"
            className="w-full max-w-[480px]"
            style={{ filter: 'drop-shadow(0 0 30px rgba(37,99,235,0.2))' }}
          >
            {/* ── Web edge lines ───────────────────────────── */}
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={NODE_POSITIONS[a].x} y1={NODE_POSITIONS[a].y}
                x2={NODE_POSITIONS[b].x} y2={NODE_POSITIONS[b].y}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
            ))}

            {/* Lines from centre to each node */}
            {NODE_POSITIONS.map((n, i) => (
              <line
                key={`c${i}`}
                x1={CX} y1={CY}
                x2={n.x} y2={n.y}
                stroke={activeIdx === i && i < services.length
                  ? 'rgba(96,165,250,0.6)' : 'rgba(255,255,255,0.06)'}
                strokeWidth={activeIdx === i ? '1.5' : '1'}
                style={{ transition: 'stroke 0.3s' }}
              />
            ))}

            {/* ── Animated pulse rings on centre ───────────── */}
            {[40, 80, 120].map((r, i) => (
              <circle
                key={`ring${i}`}
                cx={CX} cy={CY} r={r}
                fill="none"
                stroke="rgba(96,165,250,0.06)"
                strokeWidth="1"
              />
            ))}

            {/* ── Centre node ──────────────────────────────── */}
            <circle cx={CX} cy={CY} r={44} fill="#1d4ed8" opacity={0.9} />
            <circle cx={CX} cy={CY} r={38} fill="#1e40af" />
            <text x={CX} y={CY - 8} textAnchor="middle" fill="white" fontSize="10"
              fontFamily="system-ui" fontWeight="bold" letterSpacing="1">
              MARUTHI
            </text>
            <text x={CX} y={CY + 6} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8"
              fontFamily="system-ui" letterSpacing="2">
              TOOLINGS
            </text>
            <text x={CX} y={CY + 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7"
              fontFamily="system-ui">
              HYDERABAD
            </text>

            {/* ── Service nodes ────────────────────────────── */}
            {services.map((svc, i) => {
              const pos = NODE_POSITIONS[i];
              if (!pos) return null;
              const isActive = activeIdx === i;
              const icon = SERVICE_ICONS[svc.icon] || '⚙️';

              return (
                <g
                  key={svc._id || i}
                  className="cursor-pointer"
                  onClick={() => setActiveIdx(isActive ? null : i)}
                >
                  {/* Glow ring on active */}
                  {isActive && (
                    <circle
                      cx={pos.x} cy={pos.y} r={36}
                      fill="none" stroke="rgba(96,165,250,0.4)" strokeWidth="2"
                    />
                  )}
                  {/* Node circle */}
                  <circle
                    cx={pos.x} cy={pos.y} r={28}
                    fill={isActive ? '#1d4ed8' : '#0f2441'}
                    stroke={isActive ? '#3b82f6' : 'rgba(255,255,255,0.15)'}
                    strokeWidth={isActive ? '2' : '1'}
                    style={{ transition: 'all 0.3s' }}
                  />
                  {/* Emoji icon */}
                  <text
                    x={pos.x} y={pos.y - 4}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="16"
                  >
                    {icon}
                  </text>
                  {/* Label below */}
                  <text
                    x={pos.x}
                    y={pos.y + 44}
                    textAnchor="middle"
                    fill={isActive ? '#93c5fd' : 'rgba(255,255,255,0.5)'}
                    fontSize="8"
                    fontFamily="system-ui"
                    fontWeight="600"
                    letterSpacing="0.5"
                    style={{ transition: 'fill 0.3s' }}
                  >
                    {svc.title.toUpperCase().split(' ').slice(0, 2).join(' ')}
                  </text>
                </g>
              );
            })}

            {/* ── Extra decorative nodes (no service attached) ── */}
            {NODE_POSITIONS.slice(services.length).map((pos, i) => (
              <g key={`deco${i}`}>
                <circle
                  cx={pos.x} cy={pos.y} r={16}
                  fill="#0a1a2e"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                <circle cx={pos.x} cy={pos.y} r={4} fill="rgba(255,255,255,0.2)" />
              </g>
            ))}

            {/* ── Animated travelling dots along edges ─────── */}
            {EDGES.slice(0, 4).map(([a, b], i) => (
              <circle key={`dot${i}`} r="2.5" fill="rgba(96,165,250,0.7)">
                <animateMotion
                  dur={`${3 + i * 0.7}s`}
                  repeatCount="indefinite"
                  path={`M${NODE_POSITIONS[a].x},${NODE_POSITIONS[a].y} L${NODE_POSITIONS[b].x},${NODE_POSITIONS[b].y}`}
                />
              </circle>
            ))}
          </svg>
        </div>

        {/* ── Service detail panel (right side) ─────────────── */}
        <div className="w-full lg:w-1/2">
          {activeIdx !== null && activeIdx < services.length ? (
            // ── Active service detail ──────────────────────
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm
                            transition-all duration-300 animate-fadeIn">
              <div className="text-5xl mb-4">{SERVICE_ICONS[services[activeIdx].icon] || '⚙️'}</div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {services[activeIdx].title}
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">
                {services[activeIdx].description}
              </p>
              <button
                onClick={() => setActiveIdx(null)}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
              >
                ← Back to all services
              </button>
            </div>
          ) : (
            // ── All services list ──────────────────────────
            <div className="space-y-4">
              <p className="text-gray-400 text-sm mb-6">
                Click any <span className="text-blue-400 font-semibold">node</span> on the web to explore that service in detail →
              </p>
              {services.map((svc, i) => (
                <button
                  key={svc._id || i}
                  onClick={() => setActiveIdx(i)}
                  className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10
                             border border-white/10 hover:border-blue-500/40
                             rounded-2xl p-4 text-left transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center
                                  text-2xl flex-shrink-0 group-hover:bg-blue-600/40 transition-colors">
                    {SERVICE_ICONS[svc.icon] || '⚙️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{svc.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{svc.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
