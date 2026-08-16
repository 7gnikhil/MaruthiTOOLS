import { Product, CareerPost, Update, Service, ProductCategory } from '../types';

// ─────────────────────────────────────────────────────────────────
// PRODUCTS  –  to replace placeholder images, put your own image
// path in `imageUrl` (e.g. '/images/mould1.jpg' after uploading
// to frontend/public/images/) and update the `gallery` array too.
// ─────────────────────────────────────────────────────────────────
export const MOCK_PRODUCTS_DB: Product[] = [

  // ── MOULDS ─────────────────────────────────────────────────────
  {
    _id: '1',
    name: '8-Cavity Threaded Bottle Cap / Closure Mold',
    category: 'Mould',
    description: 'With unscrewing hydraulic drive motor and hot runner heater module.',
    imageUrl: '/images/8cavity.svg.png',
    gallery: [],
    updatedAt: new Date('2024-09-15'),
  },
  {
    _id: '2',
    name: 'Single-Cavity Deep Draw / Container Mold',
    category: 'Mould',
    description: 'Heavy-duty base block with side-action slides.',
    imageUrl: '/images/singlecavitydeep.svg.png',
    gallery: [],
    updatedAt: new Date('2024-08-20'),
  },
  {
    _id: '8',
    name: 'Single-Cavity Rectangular Enclosure / Housing Mold',
    category: 'Mould',
    description: 'Equipped with Mastip hot runner system and core slide.',
    imageUrl: '/images/rectangle.svg.png',
    gallery: [],
    updatedAt: new Date('2024-06-11'),
  },
  {
    _id: '11',
    name: '2-Cavity Slide-Action Connector / Enclosure Mold',
    category: 'Mould',
    description: 'With mechanical side core-pulling pins.',
    imageUrl: '/images/2cavity.svg.png',
    gallery: [],
    updatedAt: new Date('2024-10-01'),
  },
  {
    _id: '12',
    name: '16-Cavity Small Cap / Vial Closure Mold',
    category: 'Mould',
    description: 'High-cavitation multi-cavity tool.',
    imageUrl: '/images/16cavity.svg.png',
    gallery: [],
    updatedAt: new Date('2024-09-25'),
  },
  {
    _id: '13',
    name: '2-Cavity Long Tubular / Syringe Barrel Mold',
    category: 'Mould',
    description: 'With side slide-lifter mechanisms.',
    imageUrl: '/images/2cavitylongt.svg.png',
    gallery: [],
    updatedAt: new Date('2024-09-18'),
  },
  {
    _id: '14',
    name: 'Large Curved Shell / Appliance Cover Mold',
    category: 'Mould',
    description: 'Showing core and cavity halves.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-08-30'),
  },
  {
    _id: '15',
    name: 'Interchangeable Modular Mold Base / Slide Tool Assembly',
    category: 'Mould',
    description: 'With side-action limit switches.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-07-22'),
  },
  {
    _id: '17',
    name: '8-Cavity Round Tub / Large Jar Mold',
    category: 'Mould',
    description: 'With sub-runner feed system.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-07-22'),
  },
  {
    _id: '18',
    name: '8-Cavity Threaded Jar / Closure Core Block',
    category: 'Mould',
    description: 'Featuring threaded rotating cores.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-07-22'),
  },
  {
    _id: '20',
    name: '2-Cavity Prototype / Insert Tooling Mold',
    category: 'Mould',
    description: 'Blue-layout insert block for small plastic components.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-07-22'),
  },
  {
    _id: '21',
    name: 'Single-Cavity Hemispherical Dome / Deep Bowl Mold',
    category: 'Mould',
    description: 'Large spherical cavity profile.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-07-22'),
  },
  {
    _id: '24',
    name: 'Complex Heavy-Duty Slide Enclosure Mold',
    category: 'Mould',
    description: 'Featuring top-mounted Mastip hot runner system and handle core pulls.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-07-22'),
  },
  {
    _id: '25',
    name: 'Multi-Plate Threaded Cap Mold Assembly',
    category: 'Mould',
    description: 'Side view displaying hot runner manifold and hydraulic rotation motor.',
    imageUrl: '/images/placeholder-mould.svg',
    gallery: [],
    updatedAt: new Date('2024-07-22'),
  },

  // ── MACHINERY: CNC ─────────────────────────────────────────────
  {
    _id: '4',
    name: 'AMS MCV-400 CNC Machine',
    category: 'CNC',
    description: 'High-precision milling, mold cavity detailing, electrode manufacturing, and small-to-medium component batch production.',
    imageUrl: '/images/placeholder-machine.svg',
    gallery: [],
    updatedAt: new Date('2023-01-10'),
  },
  {
    _id: '7',
    name: 'CVM-1060 CNC Machine',
    category: 'CNC',
    description: 'Large mold bases, deep cavity core/cavity machining, heavy metal removal, and large industrial plastic/die-casting tool blocks.',
    imageUrl: '/images/placeholder-machine.svg',
    gallery: [],
    updatedAt: new Date('2022-11-20'),
  },

  // ── MACHINERY: EDM ─────────────────────────────────────────────
  {
    _id: '9',
    name: 'EDM Sinker Machine – Model A',
    category: 'EDM',
    description: 'Die sinking EDM for complex cavity profiles and fine surface finishes.',
    imageUrl: '/images/placeholder-machine.svg',
    gallery: [],
    updatedAt: new Date('2024-10-22'),
  },
  {
    _id: '10',
    name: 'EDM Wire-Cut Machine – Model B',
    category: 'EDM',
    description: 'High-precision wire-cut EDM for intricate details and hardened steel moulds.',
    imageUrl: '/images/placeholder-machine.svg',
    gallery: [],
    updatedAt: new Date('2023-05-18'),
  },
  {
    _id: '23',
    name: 'EDM Machine – Model C',
    category: 'EDM',
    description: 'Multi-axis EDM for precision components and ejector pin production.',
    imageUrl: '/images/placeholder-machine.svg',
    gallery: [],
    updatedAt: new Date('2023-05-18'),
  },

  // ── END COMPONENTS ─────────────────────────────────────────────
  {
    _id: '5',
    name: '8-Cavity Threaded Bottle Cap Component',
    category: 'End Component',
    description: 'Precision moulded plastic bottle cap with threaded closure.',
    imageUrl: '/images/placeholder-component.svg',
    gallery: [],
    updatedAt: new Date('2024-07-05'),
  },
  {
    _id: '16',
    name: 'Single-Cavity Deep Draw Container Component',
    category: 'End Component',
    description: 'Injection moulded container with deep draw profile.',
    imageUrl: '/images/placeholder-component.svg',
    gallery: [],
    updatedAt: new Date('2024-10-10'),
  },
];

// ─────────────────────────────────────────────────────────────────
// CAREERS  –  edit positions/descriptions here, or manage via API
// ─────────────────────────────────────────────────────────────────
export const MOCK_CAREERS_DB: CareerPost[] = [
  {
    _id: 'c1',
    position: 'CNC Operator',
    description: 'We are looking for an experienced CNC Operator.',
    location: 'Hyderabad, India',
  },
  {
    _id: 'c2',
    position: 'Mould Designer',
    description: 'Seeking a creative and technical Mould Designer with 5+ years of experience in SolidWorks or a similar CAD program for complex injection moulds.',
    location: 'Hyderabad, India',
  },
  {
    _id: 'c3',
    position: 'CNC Operator Trainee',
    description: 'Looking for a fresher to work as a CNC Operator Trainee.',
    location: 'Hyderabad, India',
  },
  {
    _id: 'c4',
    position: 'Designer Trainee',
    description: 'Looking for a fresher to work as a Designer Trainee.',
    location: 'Hyderabad, India',
  },
];

export const MOCK_UPDATES_DB: Update[] = [
  { _id: 'u1', title: 'New High-Strength Polymer Acquired', description: 'We are now using PEEK polymer for high-temperature applications, enhancing component durability.', date: '2024-10-26' },
  { _id: 'u2', title: '5-Axis CNC Machine Added to Workshop', description: 'Our new 5-axis CNC machine allows for more complex geometries and faster production times.', date: '2024-10-22' },
  { _id: 'u3', title: 'Expanded capacity for pharma moulds', description: 'We have successfully expanded our cleanroom facilities to meet the growing demand for medical and pharma-grade moulds.', date: '2024-10-15' },
];

export const MOCK_SERVICES_DB: Service[] = [
  {
    _id: 's1',
    title: 'Mould Design & Prototyping',
    description: 'From concept to reality, we provide comprehensive 3D mould design and rapid prototyping services to validate your components before mass production.',
    icon: 'LightBulbIcon',
  },
  {
    _id: 's2',
    title: 'High-Precision CNC Machining',
    description: 'Utilizing our state-of-the-art CNC mills and EDM machines, we craft complex mould cavities and cores with sub-micron accuracy.',
    icon: 'WrenchScrewdriverIcon',
  },
  {
    _id: 's3',
    title: '2K & 3K Injection Moulding',
    description: 'Specializing in multi-material moulds (2K & 3K), we enable the creation of sophisticated parts with integrated soft-touch grips, seals, or multiple colors.',
    icon: 'CubeTransparentIcon',
  },
  {
    _id: 's4',
    title: 'Mould Maintenance & Repair',
    description: 'We offer comprehensive maintenance and repair services to extend the life of your tooling, ensuring consistent quality and performance over millions of cycles.',
    icon: 'ShieldCheckIcon',
  },
];
