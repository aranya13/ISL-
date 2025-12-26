import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Part } from '../types';
import * as THREE from 'three';

interface Drone3DProps {
  parts: Part[];
  isDismantled: boolean;
  onPartClick: (part: Part) => void;
}

const PartMesh: React.FC<{ part: Part; isDismantled: boolean; onClick: () => void }> = ({ part, isDismantled, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Default to a small box if no config provided (fallback)
  const config = part.meshConfig || {
    type: 'box',
    args: [0.5, 0.5, 0.5],
    color: part.color.replace('bg-', '').replace('-500', ''), 
    position: [0, 0, 0],
    explodedPosition: [0, 2, 0]
  };

  const targetPos = isDismantled && config.explodedPosition 
    ? new THREE.Vector3(...config.explodedPosition) 
    : new THREE.Vector3(...config.position);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Lerp position for smooth animation
      meshRef.current.position.lerp(targetPos, delta * 4);
      
      // Gentle floating animation when assembled
      if (!isDismantled) {
        // We apply a slight offset based on time, but be careful not to drift
        // To do this correctly with lerp, we should lerp to a moving target or just add oscillation to a group parent.
        // For simplicity, we'll just float the whole model in Drone3D parent, 
        // OR we can add a tiny rotation here
        meshRef.current.rotation.x = (config.rotation?.[0] || 0) + (Math.sin(state.clock.elapsedTime + config.position[0]) * 0.02);
      } else {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, config.rotation?.[0] || 0, delta * 2);
      }

      // Smooth scale effect on hover
      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
    }
  });

  return (
    <mesh 
        ref={meshRef} 
        position={config.position} 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          document.body.style.cursor = 'pointer'; 
          setHovered(true);
        }}
        onPointerOut={() => { 
          document.body.style.cursor = 'auto'; 
          setHovered(false);
        }}
    >
      {config.type === 'box' && <boxGeometry args={config.args as any} />}
      {config.type === 'cylinder' && <cylinderGeometry args={config.args as any} />}
      {config.type === 'sphere' && <sphereGeometry args={config.args as any} />}
      {/* Fallback for capsule to cylinder if needed, though most R3F versions support it now. */}
      {config.type === 'capsule' && <capsuleGeometry args={config.args as any} />}
      
      <meshStandardMaterial 
        color={config.color} 
        roughness={0.2} 
        metalness={0.8}
        emissive={config.color}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  );
};

// Helper component for lines to avoid re-creating geometry every frame
const ConnectionLine: React.FC<{ part: Part }> = ({ part }) => {
    const points = useMemo(() => {
        if (!part.meshConfig?.explodedPosition) return [];
        return [
            new THREE.Vector3(...part.meshConfig.position),
            new THREE.Vector3(...part.meshConfig.explodedPosition)
        ];
    }, [part]);

    const geometry = useMemo(() => {
        if (points.length < 2) return undefined;
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    useEffect(() => {
        return () => {
            geometry?.dispose();
        };
    }, [geometry]);

    if (!geometry) return null;

    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial attach="material" color="#94a3b8" linewidth={1} opacity={0.3} transparent />
        </lineSegments>
    );
};

const Drone3D: React.FC<Drone3DProps> = ({ parts, isDismantled, onPartClick }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && !isDismantled) {
        // Float the entire drone group when assembled
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        groupRef.current.rotation.y += 0.001; 
    } else if (groupRef.current) {
        // Reset position when dismantled
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
        {parts.map((part) => (
            <PartMesh 
                key={part.id} 
                part={part} 
                isDismantled={isDismantled} 
                onClick={() => onPartClick(part)}
            />
        ))}
        
        {/* Connection lines when dismantled */}
        {isDismantled && parts.map((part) => {
             if (!part.meshConfig?.explodedPosition) return null;
             return <ConnectionLine key={`line-${part.id}`} part={part} />;
        })}
    </group>
  );
};

export default Drone3D;