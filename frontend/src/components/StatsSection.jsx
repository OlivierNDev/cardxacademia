import React, { useState, useEffect, useRef } from 'react';
import { stats } from '../data/mockData';

const AnimatedNumber = ({ target, duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const digits = target.replace(/[^0-9]/g, '');
  const numericTarget = digits ? parseInt(digits, 10) : null;
  const suffix = target.includes('+') ? '+' : '';
  const isNumeric = numericTarget !== null && !Number.isNaN(numericTarget);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !isNumeric) return;

    let startTime;
    let frame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * numericTarget));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, isNumeric, numericTarget, duration]);

  if (!isNumeric) {
    return <span ref={ref}>{target}</span>;
  }

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-brand-sky-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2 pt-8 first:pt-0 md:pt-0 md:px-6">
              <div className="text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">
                <AnimatedNumber target={stat.number} />
              </div>
              <p className="text-sm text-gray-600 uppercase tracking-[0.12em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
