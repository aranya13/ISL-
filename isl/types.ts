export interface MeshConfig {
  type: 'box' | 'cylinder' | 'sphere' | 'capsule';
  args: number[]; // Dimensions: [width, height, depth] or [radius, height, segments]
  color: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  explodedPosition?: [number, number, number];
}

export interface Part {
  id: string;
  name: string;
  description: string;
  iconName: string; // Lucide icon name mapping
  color: string;
  xOffset: number; // Legacy 2D offset (kept for fallback)
  yOffset: number; // Legacy 2D offset
  specs?: Record<string, string>; // Technical specifications
  meshConfig?: MeshConfig; // 3D configuration
}

export interface TechModel {
  id: string;
  name: string;
  type: 'drone' | 'cubesat' | 'cansat';
  description: string;
  image: string; // URL for the model image (fallback)
  parts: Part[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
}