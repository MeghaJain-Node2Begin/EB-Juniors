import React from 'react';

const LOGOS = [
  { name: 'Procure', src: 'https://api.svgl.app/svg/procure.svg', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Shopify', src: 'https://api.svgl.app/svg/shopify.svg', gradient: 'from-yellow-400 to-green-500' },
  { name: 'Blender', src: 'https://api.svgl.app/svg/blender.svg', gradient: 'from-orange-500 to-blue-500' },
  { name: 'Figma', src: 'https://api.svgl.app/svg/figma.svg', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Spotify', src: 'https://api.svgl.app/svg/spotify.svg', gradient: 'from-green-400 to-green-600' },
  { name: 'Lottielab', src: 'https://api.svgl.app/svg/lottielab.svg', gradient: 'from-yellow-300 to-green-400' },
  { name: 'Google Cloud', src: 'https://api.svgl.app/svg/google-cloud.svg', gradient: 'from-blue-400 to-blue-600' },
  { name: 'Bing', src: 'https://api.svgl.app/svg/bing.svg', gradient: 'from-cyan-400 to-teal-500' },
];

export default function MarqueeScroller() {
  // Render the list twice inline to ensure a seamless loop.
  const duplicatedLogos = [...LOGOS, ...LOGOS];

  return (
    <div 
      className="w-full overflow-hidden" 
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4 py-4">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${logo.gradient} opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out`} />
            <img 
              src={logo.src} 
              alt={logo.name} 
              className="relative z-10 w-12 h-12 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
