import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, ContactShadows } from '@react-three/drei';
import { TechModel, Part } from '../types';
import Drone3D from './Drone3D';

interface InteractiveModelProps {
  model: TechModel;
}

const InteractiveModel: React.FC<InteractiveModelProps> = ({ model }) => {
  const [isDismantled, setIsDismantled] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.Box;
    return <Icon size={24} className="text-white" />;
  };

  // Determine if we show the 3D canvas or the Grid view
  // Mobile + Dismantled = Grid View (as requested "visible as grid in phone")
  // Desktop = Always 3D Canvas (Dismantled state handled by 3D animation)
  const showGridView = isMobile && isDismantled;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-slate-200 relative shadow-sm">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <button
          onClick={() => setIsDismantled(!isDismantled)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2"
        >
          {isDismantled ? <Icons.Minimize2 size={18}/> : <Icons.Maximize2 size={18}/>}
          {isDismantled ? 'Assemble' : 'Dismantle'}
        </button>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 relative bg-slate-100">
        
        {!showGridView && (
            <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
                <Canvas shadows camera={{ position: [4, 4, 4], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <group position={[0, -0.5, 0]}>
                            <Drone3D 
                                parts={model.parts} 
                                isDismantled={isDismantled} 
                                onPartClick={setSelectedPart}
                            />
                            <ContactShadows opacity={0.4} scale={10} blur={2} far={4} />
                        </group>
                    </Suspense>
                    <OrbitControls autoRotate={!isDismantled} autoRotateSpeed={2} makeDefault />
                </Canvas>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-xs pointer-events-none bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    Double click part to inspect • Drag to rotate
                </div>
            </div>
        )}

        {/* Mobile Grid View (Only when dismantled on mobile) */}
        {showGridView && (
             <div className="w-full h-full p-4 overflow-y-auto grid grid-cols-2 gap-4 content-start pt-16 bg-slate-100">
                {model.parts.map((part) => (
                    <div
                        key={part.id}
                        onClick={() => setSelectedPart(part)}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
                    >
                        <div className={`w-12 h-12 rounded-lg ${part.color} flex items-center justify-center shadow-md`}>
                            {getIcon(part.iconName)}
                        </div>
                        <span className="text-xs font-bold text-slate-700 text-center">{part.name}</span>
                    </div>
                ))}
             </div>
        )}
      </div>

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-full md:w-80 bg-white/95 backdrop-blur-md border-l border-slate-200 p-6 z-20 shadow-2xl overflow-y-auto"
          >
            <button 
                onClick={() => setSelectedPart(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 bg-slate-100 p-1 rounded-full hover:bg-slate-200 transition-colors"
            >
                <Icons.X size={20} />
            </button>
            
            <div className={`w-16 h-16 ${selectedPart.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                {getIcon(selectedPart.iconName)}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{selectedPart.name}</h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                {selectedPart.description}
            </p>
            
            {/* Technical Specs Box */}
            {selectedPart.specs && (
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 mb-6">
                    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                         <Icons.Settings size={14} className="text-blue-600"/>
                         <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Technical Specifications</h4>
                    </div>
                    <div className="p-4 grid grid-cols-1 gap-3">
                        {Object.entries(selectedPart.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                                <span className="text-slate-500 text-sm">{key}</span>
                                <span className="text-slate-800 font-mono text-sm">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2 text-blue-700">
                    <Icons.Info size={16} />
                    <span className="font-semibold text-sm">Educational Note</span>
                </div>
                <p className="text-xs text-blue-700/80 italic">
                    Understanding this component is crucial for passing the {model.type === 'drone' ? 'flight dynamics' : 'orbital mechanics'} module.
                </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveModel;