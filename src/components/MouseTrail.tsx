import { useEffect, useState, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface TrailPoint extends MousePosition {
  id: number;
}

interface ClickAnimation {
  x: number;
  y: number;
  id: number;
  angle: number;
}

const MouseTrail = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [clickAnimations, setClickAnimations] = useState<ClickAnimation[]>([]);
  const rafRef = useRef<number>();
  const lastPosRef = useRef<MousePosition>({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    let animId = 0;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();
      
      // Add trail point
      setTrailPoints((prev) => {
        const newPoint = { x: e.clientX, y: e.clientY, id: trailId++ };
        const updated = [...prev, newPoint];
        // Keep only last 6 points for liquid effect
        return updated.slice(-6);
      });
    };

    const handleClick = (e: MouseEvent) => {
      // Random angles: 0 (horizontal), 90 (vertical), 45, 135
      const angles = [0, 90, 45, 135];
      const randomAngle = angles[Math.floor(Math.random() * angles.length)];
      
      const newAnim = {
        x: e.clientX,
        y: e.clientY,
        id: animId++,
        angle: randomAngle,
      };
      
      setClickAnimations((prev) => [...prev, newAnim]);
      
      // Remove animation after it completes
      setTimeout(() => {
        setClickAnimations((prev) => prev.filter((anim) => anim.id !== newAnim.id));
      }, 1000);
    };

    const animate = () => {
      setMousePos(lastPosRef.current);
      
      // Clear trail if mouse hasn't moved in 100ms
      const now = Date.now();
      if (now - lastMoveTimeRef.current > 100) {
        setTrailPoints([]);
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        @keyframes expandVertical {
          0% { height: 0px; }
          100% { height: 300px; opacity: 0; }
        }
        @keyframes expandHorizontal {
          0% { width: 0px; }
          100% { width: 300px; opacity: 0; }
        }
        @keyframes fadeOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Liquid trail effect */}
        {trailPoints.map((point, index) => {
          const opacity = (index + 1) / trailPoints.length;
          const scale = 0.5 + (opacity * 0.5);
          const width = 16 - (index * 2);
          
          return (
            <div
              key={point.id}
              className="absolute rounded-full bg-white/60"
              style={{
                left: point.x,
                top: point.y,
                width: `${width}px`,
                height: `${width}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: opacity * 0.4,
                filter: `blur(${2 + (1 - opacity) * 6}px)`,
                transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
              }}
            />
          );
        })}
        
        {/* Main cursor - black circle */}
        <div
          className="absolute rounded-full bg-black border-2 border-black/50"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: "32px",
            height: "32px",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
          }}
        />
      
      {/* Click animations */}
      {clickAnimations.map((anim) => (
        <div key={anim.id}>
          {/* Animated line */}
          <div
            className="absolute bg-primary/60"
            style={{
              left: anim.x,
              top: anim.y,
              width: anim.angle === 90 ? "2px" : "0px",
              height: anim.angle === 90 ? "0px" : "2px",
              transform: `translate(-50%, -50%) rotate(${anim.angle}deg)`,
              transformOrigin: "center",
              animation: anim.angle === 90 ? "expandVertical 1s ease-out forwards" : "expandHorizontal 1s ease-out forwards",
            }}
          />
          {/* Start point */}
          <div
            className="absolute rounded-full bg-primary"
            style={{
              left: anim.x,
              top: anim.y,
              width: "8px",
              height: "8px",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 20px hsl(var(--primary))",
              animation: "fadeOut 1s ease-out forwards",
            }}
          />
        </div>
      ))}
      </div>
    </>
  );
};

export default MouseTrail;
