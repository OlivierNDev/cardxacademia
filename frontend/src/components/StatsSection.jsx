import React, { useState, useEffect, useRef } from 'react';
import { stats } from '../data/mockData';

const AnimatedNumber = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
  const suffix = target.includes('+') ? '+' : '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * numericTarget));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, numericTarget, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <g fill="#45B6B0">
            {/* Simplified world map dots */}
            {[...Array(100)].map((_, i) => (
              <circle 
                key={i} 
                cx={100 + (i % 10) * 80 + Math.random() * 40} 
                cy={50 + Math.floor(i / 10) * 40 + Math.random() * 20} 
                r={2 + Math.random() * 3}
                opacity={0.3 + Math.random() * 0.5}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl py-12 px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold text-gray-800">
                  <AnimatedNumber target={stat.number} />
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
