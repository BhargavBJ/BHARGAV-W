import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface ClickAnimation {
  x: number;
  y: number;
  id: number;
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
      const newAnim = {
        x: e.clientX,
        y: e.clientY,
        id: animId++,
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
          {/* Horizontal line */}
          <div
            className="absolute bg-primary/60 animate-pulse"
            style={{
              left: anim.x,
              top: anim.y,
              width: "2px",
              height: "0px",
              transform: "translate(-50%, -50%)",
              animation: "expandLine 1s ease-out forwards",
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
        @keyframes expandLine {
          0% { height: 0px; }
          100% { height: 200px; opacity: 0; }
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
