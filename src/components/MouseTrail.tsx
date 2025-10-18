import { useEffect, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const MouseTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    let mouseId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: mouseId++,
      };

      setTrail((prevTrail) => {
        const newTrail = [...prevTrail, newPoint];
        // Keep only the last 20 points
        return newTrail.slice(-20);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup trail points
    const interval = setInterval(() => {
      setTrail((prevTrail) => prevTrail.slice(1));
    }, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => {
        const opacity = (index / trail.length) * 0.6;
        const size = (index / trail.length) * 12 + 4;
        
        return (
          <div
            key={point.id}
            className="absolute rounded-full bg-primary"
            style={{
              left: point.x,
              top: point.y,
              width: `${size}px`,
              height: `${size}px`,
              transform: "translate(-50%, -50%)",
              opacity: opacity,
              boxShadow: `0 0 ${size * 2}px hsl(var(--primary))`,
              transition: "all 0.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
};

export default MouseTrail;
