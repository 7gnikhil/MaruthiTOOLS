import React, { useEffect, useRef, useState } from 'react';
import { MOCK_SERVICES_DB } from '../api/mock-data';

// ── Service icons (emoji map) ────────────────────────────────────
const SERVICE_ICONS: Record<string, string> = {
  'LightBulbIcon':        '💡',
  'WrenchScrewdriverIcon':'🔧',
  'CubeTransparentIcon':  '🧊',
  'ShieldCheckIcon':      '🛡️',
  'GearIcon':             '⚙️',
  'LayersIcon':           '📐',
};

// ── Node layout — x,y as % of 600x600 SVG viewBox ────────────────
const NODE_POSITIONS = [
  { x: 300, y: 60  },  // top centre
  { x: 530, y: 200 },  // top right
  { x: 530, y: 400 },  // bottom right
  { x: 300, y: 520 },  // bottom centre
  { x: 70,  y: 400 },  // bottom left
  { x: 70,  y: 200 },  // top left
];

const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,0], // outer ring
  [0,2],[1,3],[2,4],[3,5],[4,0],[5,1], // diagonals
  [0,3],[1,4],[2,5],                  // long crosses
];

const WORKFLOW_STEPS = [
  { step: '01', title: '3D Design & Moldflow', desc: 'Detailed 3D CAD modeling, parting line planning, and thermal/flow simulation.' },
  { step: '02', title: 'High-Precision Machining', desc: 'CNC milling on Cosmos CVM 1060 & AMS MCV 400 plus Sparkronix ZNC EDM cavity erosion.' },
  { step: '03', title: 'Assembly & Mirror Polish', desc: 'Hand polishing, core pin fitting, side slide mechanism assembly, and water line testing.' },
  { step: '04', title: 'Quality CMM & T1 Trial', desc: 'Sub-micron dimensional inspection and T1 injection moulding trial validation.' },
];

const CAPABILITY_METRICS = [
  { label: 'Machining Tolerance', value: '±0.005 mm' },
  { label: 'Max Cavitation', value: '48 Cavities' },
  { label: 'Mould Steel Grades', value: 'P20 / H13 / S136' },
  { label: 'Tooling Facility', value: 'Hyderabad, India' },
];

const Services: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const services = MOCK_SERVICES_DB;
  const CX = 300;
  const CY = 295;

  return (
    <div className="bg-[#05101f] text-white pt-20">
      
      {/* ── Page Header ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 text-center px-6 relative overflow-hidden bg-gradient-to-b from-blue-950/40 to-[#05101f]">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block text-cyan-400 font-extrabold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-4">
            End-to-End Injection Moulding Engineering
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Our Tooling <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">Services</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            From 3D mould design to high-speed CNC milling, ZNC EDM erosion, assembly, and quality trials — delivering sub-micron precision for 25+ years.
          </p>
        </div>
      </section>

      {/* ── SPIDER WEB INTERACTIVE SERVICES DIAGRAM ─────────── */}
      <section className="py-12 md:py-20 border-t border-white/5">
        <div
          ref={sectionRef}
          className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12
                      transition-all duration-1000 ease-out
                      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >

          {/* Spider Web SVG (Left Column) */}
          <div className="w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center">
            <svg
              viewBox="0 0 600 590"
              className="w-full max-w-[480px]"
              style={{ filter: 'drop-shadow(0 0 35px rgba(37,99,235,0.25))' }}
            >
              {/* Web edge lines */}
              {EDGES.map(([a, b], i) => (
                <line
                  key={i}
                  x1={NODE_POSITIONS[a].x} y1={NODE_POSITIONS[a].y}
                  x2={NODE_POSITIONS[b].x} y2={NODE_POSITIONS[b].y}
                  stroke="rgba(255,255,255,0.12)"
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
                    ? 'rgba(96,165,250,0.8)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={activeIdx === i ? '2' : '1'}
                  style={{ transition: 'stroke 0.3s' }}
                />
              ))}

              {/* Pulse rings on centre */}
              {[40, 80, 120].map((r, i) => (
                <circle
                  key={`ring${i}`}
                  cx={CX} cy={CY} r={r}
                  fill="none"
                  stroke="rgba(96,165,250,0.08)"
                  strokeWidth="1"
                />
              ))}

              {/* Centre node */}
              <circle cx={CX} cy={CY} r={44} fill="#1d4ed8" opacity={0.9} />
              <circle cx={CX} cy={CY} r={38} fill="#1e40af" />
              <text x={CX} y={CY - 8} textAnchor="middle" fill="white" fontSize="10"
                fontFamily="system-ui" fontWeight="bold" letterSpacing="1">
                MARUTHI
              </text>
              <text x={CX} y={CY + 6} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8"
                fontFamily="system-ui" letterSpacing="2">
                TOOLINGS
              </text>
              <text x={CX} y={CY + 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7"
                fontFamily="system-ui">
                HYDERABAD
              </text>

              {/* Service nodes */}
              {services.map((svc, i) => {
                const pos = NODE_POSITIONS[i];
                if (!pos) return null;
                const isActive = activeIdx === i;
                const icon = SERVICE_ICONS[svc.icon] || '⚙️';

                return (
                  <g
                    key={svc._id || i}
                    className="cursor-pointer"
                    onClick={() => setActiveIdx(i)}
                  >
                    {isActive && (
                      <circle
                        cx={pos.x} cy={pos.y} r={36}
                        fill="none" stroke="rgba(96,165,250,0.6)" strokeWidth="2"
                      />
                    )}
                    <circle
                      cx={pos.x} cy={pos.y} r={28}
                      fill={isActive ? '#1d4ed8' : '#0f2441'}
                      stroke={isActive ? '#3b82f6' : 'rgba(255,255,255,0.2)'}
                      strokeWidth={isActive ? '2' : '1'}
                      style={{ transition: 'all 0.3s' }}
                    />
                    <text
                      x={pos.x} y={pos.y - 4}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="16"
                    >
                      {icon}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 44}
                      textAnchor="middle"
                      fill={isActive ? '#93c5fd' : 'rgba(255,255,255,0.6)'}
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

              {/* Travelling dots along edges */}
              {EDGES.slice(0, 4).map(([a, b], i) => (
                <circle key={`dot${i}`} r="2.5" fill="rgba(96,165,250,0.8)">
                  <animateMotion
                    dur={`${3 + i * 0.7}s`}
                    repeatCount="indefinite"
                    path={`M${NODE_POSITIONS[a].x},${NODE_POSITIONS[a].y} L${NODE_POSITIONS[b].x},${NODE_POSITIONS[b].y}`}
                  />
                </circle>
              ))}
            </svg>
          </div>

          {/* Interactive Service Details & List (Right Column) */}
          <div className="w-full lg:w-1/2 space-y-4">
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 block">
              Click any service or node to view details:
            </p>

            {services.map((svc, i) => {
              const isActive = activeIdx === i;
              return (
                <div
                  key={svc._id || i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-blue-900/40 border-blue-500 shadow-xl shadow-blue-900/30'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-colors ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'
                    }`}>
                      {SERVICE_ICONS[svc.icon] || '⚙️'}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-base ${isActive ? 'text-cyan-300' : 'text-white'}`}>
                        {svc.title}
                      </h3>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── TECHNICAL CAPABILITIES METRICS BAR ─────────────── */}
      <section className="py-16 bg-slate-900 border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Precision & Capabilities Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {CAPABILITY_METRICS.map((cap) => (
              <div key={cap.label} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <p className="text-2xl md:text-3xl font-black text-cyan-400 mb-1">{cap.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{cap.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-STEP WORKFLOW TIMELINE ───────────────────────── */}
      <section className="py-20 bg-[#05101f]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-extrabold uppercase tracking-widest text-xs block mb-2">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">4-Step Tooling Delivery Workflow</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((wf) => (
              <div key={wf.step} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition">
                <span className="text-4xl font-black text-blue-500/40 block mb-4">{wf.step}</span>
                <h3 className="text-lg font-bold text-white mb-2">{wf.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
