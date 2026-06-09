"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// --- 3D Components ---

interface GlassCubeProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  floatIntensity?: number;
  floatSpeed?: number;
  wireframe?: boolean;
  isDrawer?: boolean;
  drawerColor?: string;
  openedOffset?: number;
  rotation?: [number, number, number];
}

const GlassCube: React.FC<GlassCubeProps> = ({
  position,
  scale = 1,
  color = "#ffffff",
  floatIntensity = 1,
  floatSpeed = 2,
  wireframe = false,
  isDrawer = false,
  drawerColor = "#10b981",
  openedOffset = 0.6,
  rotation = [0, 0, 0]
}) => {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={floatIntensity}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Main Body */}
        {wireframe ? (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#9ca3af" wireframe={true} transparent opacity={0.15} />
          </mesh>
        ) : (
          <RoundedBox args={[1, 1, 1]} radius={0.05} smoothness={4}>
            <meshPhysicalMaterial 
              color={color}
              transmission={0.9}
              opacity={1}
              transparent
              roughness={0.1}
              thickness={2}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </RoundedBox>
        )}

        {/* Drawer Part */}
        {isDrawer && (
          <RoundedBox args={[0.85, 0.85, 1]} radius={0.05} smoothness={4} position={[0, 0, openedOffset]}>
            <meshPhysicalMaterial 
              color={drawerColor}
              transmission={0.3}
              roughness={0.2}
              thickness={1}
              clearcoat={1}
              transparent
              opacity={0.95}
            />
          </RoundedBox>
        )}
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[14, 12, 18]} fov={22} onUpdate={(c) => c.lookAt(0, 0, 0)} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#a7f3d0" />
      
      {/* Programmatic Environment for offline-safe glass reflections */}
      <Environment resolution={256}>
        <mesh position={[10, 20, 10]}>
          <boxGeometry args={[20, 20, 20]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-10, -20, -10]}>
          <boxGeometry args={[20, 20, 20]} />
          <meshBasicMaterial color="#d1fae5" />
        </mesh>
      </Environment>

      {/* Main Isometric Group */}
      <group rotation={[Math.PI / 6, -Math.PI / 4, 0]} position={[0, -0.5, 0]}>
        
        {/* LAYER 3: Background Wireframes */}
        <GlassCube position={[-1.5, -2, -2]} scale={0.8} wireframe floatSpeed={1} />
        <GlassCube position={[1.5, -1.5, -2.5]} scale={1.2} wireframe floatSpeed={1.5} />
        <GlassCube position={[0, -2.5, -1]} scale={1} wireframe floatSpeed={1.2} />
        <GlassCube position={[2, 0.5, -2]} scale={0.9} wireframe floatSpeed={1} />

        {/* LAYER 2: Midground Transparent Cubes */}
        <GlassCube position={[-1.2, -1, -1]} scale={1.5} color="#f0fdf4" floatIntensity={1.5} floatSpeed={1.8} />
        <GlassCube position={[1, 0, -1.5]} scale={1.2} color="#ffffff" floatIntensity={2} floatSpeed={2.2} />
        <GlassCube position={[0.5, -1.5, 0]} scale={1.4} color="#f8fafc" floatIntensity={1.8} floatSpeed={1.9} />
        <GlassCube position={[-0.5, 1.2, -1]} scale={0.9} color="#ffffff" floatIntensity={1.2} floatSpeed={2.5} />

        {/* LAYER 1: Foreground Main Cubes */}
        {/* Main large cube with drawer */}
        <GlassCube 
          position={[0.8, 0.5, 1]} 
          scale={1.8} 
          color="#d1fae5" 
          isDrawer 
          drawerColor="#10b981" 
          floatIntensity={2.5} 
          floatSpeed={2}
          openedOffset={0.65}
        />
        
        {/* Secondary supporting cube lower left */}
        <GlassCube 
          position={[-1.5, 0.2, 1.2]} 
          scale={1.3} 
          color="#34d399" 
          floatIntensity={2} 
          floatSpeed={2.3}
        />

        {/* Upper right accent drawer */}
        <GlassCube 
          position={[2, 1.8, 0.5]} 
          scale={1.1} 
          color="#ecfdf5" 
          isDrawer 
          drawerColor="#059669" 
          floatIntensity={3} 
          floatSpeed={2.8}
          openedOffset={0.5}
          rotation={[0, 0, Math.PI / 12]} 
        />
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={10} color="#064e3b" />
    </>
  );
};

export default function PremiumHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Text Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full min-h-screen bg-white pt-20 p-4 md:p-6 lg:p-8 flex flex-col">
      <div className="relative flex-1 w-full bg-[#fafafa] rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex items-center">
        
        {/* Background Soft Gradients */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-[100px] pointer-events-none"
        />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full flex flex-col lg:flex-row items-center relative z-10 py-20 lg:py-0 h-full">
          
          {/* Left Column (55-60%): Typography & CTA */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[55%] lg:pr-12 z-20"
          >
            {/* Small Top Label */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block text-gray-400 font-medium tracking-[0.2em] text-sm uppercase">
                ExtraBits Junior
              </span>
            </motion.div>

            {/* Large Bold Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-[#0f172a] leading-[1.05] tracking-tight mb-8"
            >
              Learn Future <br />
              Tech Skills
            </motion.h1>

            {/* Minimal Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-[28rem]"
            >
              Empowering the next generation with practical skills in programming, web development, and digital technologies.
            </motion.p>

            {/* Modern CTA Button */}
            <motion.div variants={itemVariants}>
              <button className="group relative flex items-center justify-center gap-3 bg-[#0f172a] text-white px-8 py-4 rounded-full font-medium text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(15,23,42,0.2)] overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Programs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column (40-45%): Three.js Geometric Cube Composition */}
          <div className="w-full lg:w-[45%] min-h-[500px] lg:min-h-[750px] relative mt-16 lg:mt-0 flex items-center justify-center pointer-events-none z-20">
            {mounted && (
              <div className="absolute inset-0 scale-[1.2] lg:scale-125 translate-x-[5%] lg:translate-x-[10%]">
                <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                  <Suspense fallback={null}>
                    <Scene />
                  </Suspense>
                </Canvas>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

