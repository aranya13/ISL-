import { TechModel, CourseModule, Part } from './types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'm1',
    title: 'Advanced UAV Design & Aerodynamics',
    duration: '8 Hours',
    topics: ['Airframe Selection', 'Propulsion Systems', 'Weight & Balance', 'Material Science for Drones']
  },
  {
    id: 'm2',
    title: 'Flight Control Systems & Avionics',
    duration: '10 Hours',
    topics: ['PID Controllers', 'IMU & Gyroscopes', 'ESC Calibration', 'Radio Transmitters/Receivers']
  },
  {
    id: 'm3',
    title: 'Autonomous Navigation & Mission Planning',
    duration: '8 Hours',
    topics: ['GPS & Waypoint Navigation', 'Mission Planner / QGroundControl', 'Failsafe Mechanisms', 'Beyond Visual Line of Sight (BVLOS)']
  },
  {
    id: 'm4',
    title: 'Remote Sensing & Applications',
    duration: '6 Hours',
    topics: ['LiDAR & Multispectral Cameras', 'Photogrammetry', 'Environmental Monitoring', 'Agricultural Surveying']
  }
];

// Helper to create a deep copy of parts for modification
const cloneParts = (parts: Part[]) => JSON.parse(JSON.stringify(parts));

// Base parts definition (without 3D coords, added per model)
const baseDroneParts = [
  { 
    id: 'p1', name: 'Flight Controller', description: 'The brain of the drone, processing sensor data to stabilize flight.', 
    iconName: 'Cpu', color: 'bg-blue-500', xOffset: 0, yOffset: 0,
    specs: { 'Processor': 'STM32 F7', 'IMU': 'Dual ICM20689', 'Input': '5V DC', 'Weight': '15g' }
  },
  { 
    id: 'p2', name: 'LiPo Battery', description: 'High-discharge power source.', 
    iconName: 'Battery', color: 'bg-green-500', xOffset: 0, yOffset: 80,
    specs: { 'Capacity': '5000mAh', 'Voltage': '14.8V (4S)', 'C-Rating': '60C', 'Weight': '450g' }
  },
  { 
    id: 'p3', name: 'Brushless Motor (FL)', description: 'Provides thrust. High efficiency and durability.', 
    iconName: 'Fan', color: 'bg-red-500', xOffset: -80, yOffset: -80,
    specs: { 'KV Rating': '2300KV', 'Max Thrust': '1.2kg', 'Shaft': '5mm', 'Weight': '32g' }
  },
  { 
    id: 'p4', name: 'Brushless Motor (FR)', description: 'Provides thrust.', 
    iconName: 'Fan', color: 'bg-red-500', xOffset: 80, yOffset: -80,
    specs: { 'KV Rating': '2300KV', 'Max Thrust': '1.2kg', 'Shaft': '5mm', 'Weight': '32g' }
  },
  { 
    id: 'p5', name: 'Brushless Motor (BL)', description: 'Provides thrust.', 
    iconName: 'Fan', color: 'bg-red-500', xOffset: -80, yOffset: 80,
    specs: { 'KV Rating': '2300KV', 'Max Thrust': '1.2kg', 'Shaft': '5mm', 'Weight': '32g' }
  },
  { 
    id: 'p6', name: 'Brushless Motor (BR)', description: 'Provides thrust.', 
    iconName: 'Fan', color: 'bg-red-500', xOffset: 80, yOffset: 80,
    specs: { 'KV Rating': '2300KV', 'Max Thrust': '1.2kg', 'Shaft': '5mm', 'Weight': '32g' }
  },
  { 
    id: 'p7', name: 'GPS Module', description: 'Global Positioning System for autonomous navigation.', 
    iconName: 'Satellite', color: 'bg-yellow-500', xOffset: 0, yOffset: -60,
    specs: { 'Accuracy': '~2m', 'Constellations': 'GPS+GLONASS', 'Update Rate': '10Hz' }
  },
  { 
    id: 'p8', name: 'Camera Gimbal', description: 'Stabilized mount for aerial photography sensors.', 
    iconName: 'Camera', color: 'bg-purple-500', xOffset: 0, yOffset: 40,
    specs: { 'Axis': '3-Axis', 'Stabilization': 'Brushless', 'Weight': '150g', 'Input': '12V' }
  },
];

// --- 3D Configurations ---

// Quadcopter Config
const quadParts = cloneParts(baseDroneParts);
quadParts[0].meshConfig = { type: 'box', args: [1, 0.2, 1], color: '#3b82f6', position: [0, 0, 0], explodedPosition: [0, 0, 0] }; // FC/Body
quadParts[1].meshConfig = { type: 'box', args: [0.8, 0.3, 1.5], color: '#22c55e', position: [0, -0.3, 0], explodedPosition: [0, -1.5, 0] }; // Battery
// Motors
quadParts[2].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [-1.5, 0, -1.5], explodedPosition: [-2.5, 0.5, -2.5] }; // FL
quadParts[3].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [1.5, 0, -1.5], explodedPosition: [2.5, 0.5, -2.5] }; // FR
quadParts[4].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [-1.5, 0, 1.5], explodedPosition: [-2.5, 0.5, 2.5] }; // BL
quadParts[5].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [1.5, 0, 1.5], explodedPosition: [2.5, 0.5, 2.5] }; // BR
// GPS
quadParts[6].meshConfig = { type: 'cylinder', args: [0.2, 0.2, 0.1, 16], color: '#eab308', position: [0, 0.2, -0.5], explodedPosition: [0, 1.5, -0.5] };
// Gimbal
quadParts[7].meshConfig = { type: 'sphere', args: [0.3, 16, 16], color: '#a855f7', position: [0, -0.4, 0.8], explodedPosition: [0, -1.2, 1.5] };

// Hexacopter Config
const hexParts = cloneParts(baseDroneParts);
hexParts[0].meshConfig = { type: 'box', args: [1.2, 0.2, 1.2], color: '#3b82f6', position: [0, 0, 0], explodedPosition: [0, 0, 0] };
hexParts[1].meshConfig = { type: 'box', args: [1, 0.4, 1.8], color: '#22c55e', position: [0, -0.4, 0], explodedPosition: [0, -2, 0] };
// We need 6 motors. Reusing indexes 2-5 and adding 2 more.
hexParts[2].name = "Motor 1"; hexParts[2].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [0, 0, -2], explodedPosition: [0, 0.5, -3] };
hexParts[3].name = "Motor 2"; hexParts[3].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [1.7, 0, -1], explodedPosition: [2.5, 0.5, -1.5] };
hexParts[4].name = "Motor 3"; hexParts[4].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [1.7, 0, 1], explodedPosition: [2.5, 0.5, 1.5] };
hexParts[5].name = "Motor 4"; hexParts[5].meshConfig = { type: 'cylinder', args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [0, 0, 2], explodedPosition: [0, 0.5, 3] };
// Add 2 extra motors manually
const hexMotor5 = { ...baseDroneParts[2], id: 'p_hex5', name: 'Motor 5', meshConfig: { type: 'cylinder' as const, args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [-1.7, 0, 1] as [number,number,number], explodedPosition: [-2.5, 0.5, 1.5] as [number,number,number] } };
const hexMotor6 = { ...baseDroneParts[2], id: 'p_hex6', name: 'Motor 6', meshConfig: { type: 'cylinder' as const, args: [0.3, 0.3, 0.2, 16], color: '#ef4444', position: [-1.7, 0, -1] as [number,number,number], explodedPosition: [-2.5, 0.5, -1.5] as [number,number,number] } };
hexParts.push(hexMotor5, hexMotor6);
hexParts[6].meshConfig = { type: 'cylinder', args: [0.25, 0.25, 0.15, 16], color: '#eab308', position: [0, 0.2, 0], explodedPosition: [0, 1.5, 0] }; // GPS

// CubeSat Config
const cubeParts: Part[] = [
  { id: 'c1', name: 'Aluminum Chassis', description: 'The structural frame.', iconName: 'Box', color: 'bg-gray-400', xOffset: 0, yOffset: 0, specs: { 'Material': 'Al 6061', 'Size': '10x10x10cm' },
    meshConfig: { type: 'box', args: [1, 1, 1], color: '#94a3b8', position: [0, 0, 0], explodedPosition: [0, 0, 0] } 
  },
  { id: 'c2', name: 'Solar Panel (+X)', description: 'Power generation.', iconName: 'Sun', color: 'bg-blue-800', xOffset: 100, yOffset: 0, specs: { 'Efficiency': '28%' },
    meshConfig: { type: 'box', args: [0.05, 0.9, 0.9], color: '#1e40af', position: [0.55, 0, 0], explodedPosition: [1.5, 0, 0] }
  },
  { id: 'c3', name: 'Solar Panel (-X)', description: 'Power generation.', iconName: 'Sun', color: 'bg-blue-800', xOffset: -100, yOffset: 0, specs: { 'Efficiency': '28%' },
    meshConfig: { type: 'box', args: [0.05, 0.9, 0.9], color: '#1e40af', position: [-0.55, 0, 0], explodedPosition: [-1.5, 0, 0] }
  },
  { id: 'c4', name: 'Solar Panel (+Y)', description: 'Power generation.', iconName: 'Sun', color: 'bg-blue-800', xOffset: 0, yOffset: -100, specs: { 'Efficiency': '28%' },
    meshConfig: { type: 'box', args: [0.9, 0.05, 0.9], color: '#1e40af', position: [0, 0.55, 0], explodedPosition: [0, 1.5, 0] }
  },
  { id: 'c5', name: 'Solar Panel (-Y)', description: 'Power generation.', iconName: 'Sun', color: 'bg-blue-800', xOffset: 0, yOffset: 100, specs: { 'Efficiency': '28%' },
    meshConfig: { type: 'box', args: [0.9, 0.05, 0.9], color: '#1e40af', position: [0, -0.55, 0], explodedPosition: [0, -1.5, 0] }
  },
  { id: 'c6', name: 'OBC Stack', description: 'Flight computer and avionics.', iconName: 'Cpu', color: 'bg-green-600', xOffset: 0, yOffset: 0, specs: { 'CPU': 'ARM Cortex-M4' },
    meshConfig: { type: 'box', args: [0.8, 0.8, 0.4], color: '#16a34a', position: [0, 0, 0], explodedPosition: [0, 0, 2] }
  },
  { id: 'c7', name: 'Antenna', description: 'Deployable dipole antenna.', iconName: 'Wifi', color: 'bg-orange-500', xOffset: 50, yOffset: -50, specs: { 'Band': 'UHF' },
    meshConfig: { type: 'cylinder', args: [0.05, 0.05, 1.5, 8], color: '#f97316', position: [0, 0.6, 0], explodedPosition: [0, 2, 0] }
  }
];

// CanSat Config
const canParts: Part[] = [
  { id: 'cs1', name: 'Parachute', description: 'Recovery system.', iconName: 'Umbrella', color: 'bg-orange-400', xOffset: 0, yOffset: -120, specs: { 'Diameter': '30cm' },
    meshConfig: { type: 'sphere', args: [0.6, 16, 16], color: '#fb923c', position: [0, 1.2, 0], explodedPosition: [0, 3, 0] }
  },
  { id: 'cs2', name: 'Electronics Core', description: 'ESP32 and Sensors.', iconName: 'Cpu', color: 'bg-blue-600', xOffset: 0, yOffset: -40, specs: { 'Chip': 'ESP32' },
    meshConfig: { type: 'cylinder', args: [0.4, 0.4, 0.6, 16], color: '#2563eb', position: [0, 0.2, 0], explodedPosition: [0, 1, 0] }
  },
  { id: 'cs3', name: 'Can Shell', description: 'Structural casing.', iconName: 'Cylinder', color: 'bg-gray-500', xOffset: 80, yOffset: 0, specs: { 'Diameter': '66mm' },
    meshConfig: { type: 'cylinder', args: [0.5, 0.5, 1.2, 32], color: '#64748b', position: [0, 0, 0], explodedPosition: [2, 0, 0] } // Moves sideways
  },
  { id: 'cs4', name: 'Battery', description: '9V Power.', iconName: 'Battery', color: 'bg-green-600', xOffset: 0, yOffset: 40, specs: { 'Type': '9V' },
    meshConfig: { type: 'box', args: [0.3, 0.5, 0.3], color: '#16a34a', position: [0, -0.4, 0], explodedPosition: [0, -1.5, 0] }
  },
];


export const MODELS: TechModel[] = [
  {
    id: 'drone-1',
    name: 'ISL Quadcopter X1',
    type: 'drone',
    description: 'Standard training quadcopter for basic flight maneuvers.',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=600',
    parts: quadParts
  },
  {
    id: 'drone-2',
    name: 'Hexacopter Heavy Lift',
    type: 'drone',
    description: 'Six-rotor design for carrying heavier payloads like LiDAR.',
    image: 'https://images.unsplash.com/photo-1506947411487-a5673826e6e0?auto=format&fit=crop&q=80&w=600',
    parts: hexParts
  },
  {
    id: 'cubesat',
    name: '1U CubeSat',
    type: 'cubesat',
    description: 'A 10x10x10 cm miniaturized satellite for space research.',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=600',
    parts: cubeParts
  },
  {
    id: 'cansat',
    name: 'CanSat',
    type: 'cansat',
    description: 'A simulation of a real satellite inside a can.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=600',
    parts: canParts
  },
  // Fallback for others to use quad parts with slight mods if we had time, 
  // but to prevent errors, we just map basic parts for others using quadParts as base
  {
      id: 'drone-3',
      name: 'Fixed-Wing VTOL',
      type: 'drone',
      description: 'Hybrid drone capable of vertical takeoff and efficient forward flight.',
      image: 'https://images.unsplash.com/photo-1559627756-12df5f4350fb',
      parts: quadParts // Placeholder: In real app, define wings etc.
  },
  {
      id: 'drone-4',
      name: 'FPV Racing Drone',
      type: 'drone',
      description: 'High-speed, agile drone for racing.',
      image: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60',
      parts: quadParts
  },
  {
      id: 'drone-5',
      name: 'Agricultural Sprayer',
      type: 'drone',
      description: 'Equipped with a tank and nozzles.',
      image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c',
      parts: hexParts // Placeholder: Use hex as base
  }
];