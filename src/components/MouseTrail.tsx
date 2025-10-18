import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface ClickAnimation {
  x: number;
  y: number;
  id: number;
  angle: number;
}

const MouseTrail = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [clickAnimations, setClickAnimations] = useState<ClickAnimation[]>([]);

  useEffect(() => {
    let animId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Fluid cursor follower */}
      <div
        className="absolute rounded-full bg-primary/40 blur-sm"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: "20px",
          height: "20px",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 30px hsl(var(--primary))",
          transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
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
      
      <style>{`
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
    </div>
  );
};

export default MouseTrail;
