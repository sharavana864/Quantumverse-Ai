import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Sliders,
  Atom,
} from "lucide-react";

interface BlochSphereProps {
  initialTheta?: number;
  initialPhi?: number;
  onStateChange?: (theta: number, phi: number) => void;
  qubitName?: string;
  theme?: "dark" | "light";
}

export const BlochSphere: React.FC<BlochSphereProps> = ({
  initialTheta = 0,
  initialPhi = 0,
  onStateChange,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [theta, setTheta] = useState(initialTheta); // 0 to PI
  const [phi, setPhi] = useState(initialPhi); // 0 to 2PI
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync state changes with parent if provided
  useEffect(() => {
    if (onStateChange) onStateChange(theta, phi);
  }, [theta, phi, onStateChange]);

  // Compute Cartesian coordinates from theta & phi
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);

  // Calculate probabilities
  const prob0 = Math.round(Math.cos(theta / 2) ** 2 * 100);
  const prob1 = 100 - prob0;

  // Render Bloch Sphere on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    ctx.clearRect(0, 0, width, height);

    // Background glow
    const grad = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.2,
      centerX,
      centerY,
      radius * 1.3
    );
    grad.addColorStop(0, "rgba(127, 0, 255, 0.25)");
    grad.addColorStop(1, "rgba(18, 18, 18, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw main sphere outline
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Equator Ellipse (XY Plane)
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(163, 255, 0, 0.4)";
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Z Axis (Vertical)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius * 1.15);
    ctx.lineTo(centerX, centerY + radius * 1.15);
    ctx.strokeStyle = "rgba(255, 195, 18, 0.6)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Labels for |0> and |1>
    ctx.fillStyle = "#FFC312";
    ctx.font = "bold 13px monospace";
    ctx.fillText("|0⟩ (Z+)", centerX - 20, centerY - radius * 1.2);
    ctx.fillText("|1⟩ (Z-)", centerX - 20, centerY + radius * 1.3);

    // Draw X Axis (3D projection perspective)
    const xAxEndX = centerX - radius * 0.8;
    const xAxEndY = centerY + radius * 0.5;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(xAxEndX, xAxEndY);
    ctx.strokeStyle = "rgba(235, 77, 75, 0.6)";
    ctx.stroke();
    ctx.fillStyle = "#EB4D4B";
    ctx.fillText("X+", xAxEndX - 20, xAxEndY + 10);

    // Draw Y Axis
    const yAxEndX = centerX + radius * 1.1;
    const yAxEndY = centerY + radius * 0.2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(yAxEndX, yAxEndY);
    ctx.strokeStyle = "rgba(155, 89, 182, 0.6)";
    ctx.stroke();
    ctx.fillStyle = "#9B59B6";
    ctx.fillText("Y+", yAxEndX + 5, yAxEndY + 5);

    // Calculate 3D to 2D projection of State Vector Arrow
    const projX = centerX + radius * (x * -0.6 + y * 0.9);
    const projY = centerY - radius * (z * 0.95 - x * 0.25);

    // Draw State Vector Arrow line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(projX, projY);
    ctx.strokeStyle = "#A3FF00";
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Vector Tip Glowing Point
    ctx.beginPath();
    ctx.arc(projX, projY, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#A3FF00";
    ctx.shadowColor = "#A3FF00";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw projection dot on equator
    const eqX = centerX + radius * (x * -0.6 + y * 0.9);
    const eqY = centerY + radius * (x * 0.25);
    ctx.beginPath();
    ctx.arc(eqX, eqY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
    ctx.fill();

    // Dotted guide line from tip to equator
    ctx.beginPath();
    ctx.moveTo(projX, projY);
    ctx.lineTo(eqX, eqY);
    ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)";
    ctx.setLineDash([2, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [theta, phi, isDark, x, y, z]);

  // Presets
  const setPreset = (t: number, p: number) => {
    setTheta(t);
    setPhi(p);
  };

  // Rotation Gate Applications
  const applyHadamard = () => {
    if (Math.abs(theta) < 0.1) {
      setTheta(Math.PI / 2);
      setPhi(0);
    } else if (Math.abs(theta - Math.PI) < 0.1) {
      setTheta(Math.PI / 2);
      setPhi(Math.PI);
    } else if (Math.abs(theta - Math.PI / 2) < 0.1 && Math.abs(phi) < 0.1) {
      setTheta(0);
      setPhi(0);
    } else {
      setTheta(Math.PI - theta);
      setPhi((phi + Math.PI) % (2 * Math.PI));
    }
  };

  const applyXGate = () => setTheta(Math.PI - theta);
  const applyYGate = () => {
    setTheta(Math.PI - theta);
    setPhi((3 * Math.PI - phi) % (2 * Math.PI));
  };
  const applyZGate = () => setPhi((phi + Math.PI) % (2 * Math.PI));
  const applySGate = () => setPhi((phi + Math.PI / 2) % (2 * Math.PI));
  const applyTGate = () => setPhi((phi + Math.PI / 4) % (2 * Math.PI));

  return (
    <div className={`border rounded-2xl p-6 shadow-2xl transition-colors ${
      isDark ? "bg-[#2A2A2A] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
    }`}>
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b mb-6 gap-4 ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Atom className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl font-black uppercase tracking-wider">Interactive Bloch Sphere Visualizer</h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            Map pure qubit states in 3D Hilbert space. Apply quantum gates to observe unitary state transformations.
          </p>
        </div>

        {/* State Vector Dirac Display */}
        <div className={`border rounded-xl px-4 py-2 font-mono text-xs flex flex-col items-end ${
          isDark ? "bg-black/40 border-purple-500/30" : "bg-purple-50 border-purple-200"
        }`}>
          <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-gray-400" : "text-slate-500"}`}>Current State |ψ⟩</span>
          <span className="text-emerald-500 font-bold text-sm">
            {Math.cos(theta / 2).toFixed(2)}|0⟩ +{" "}
            {phi > 0 ? `e^(${((phi / Math.PI) * 180).toFixed(0)}°i)` : ""}
            {Math.sin(theta / 2).toFixed(2)}|1⟩
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Canvas Rendering */}
        <div className={`lg:col-span-7 flex flex-col items-center justify-center border rounded-2xl p-4 relative min-h-[340px] ${
          isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"
        }`}>
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="w-full max-w-[340px] h-auto cursor-grab active:cursor-grabbing"
          />

          {/* Coordinate Overlay Box */}
          <div className={`absolute bottom-3 left-3 backdrop-blur-md border rounded-lg p-2 text-[11px] font-mono grid grid-cols-3 gap-3 ${
            isDark ? "bg-black/60 border-white/10 text-white" : "bg-white/80 border-slate-200 text-slate-900"
          }`}>
            <div>
              <span className="text-red-500 font-bold">X:</span> {x.toFixed(2)}
            </div>
            <div>
              <span className="text-purple-500 font-bold">Y:</span> {y.toFixed(2)}
            </div>
            <div>
              <span className="text-amber-500 font-bold">Z:</span> {z.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Right: Controls & Gates Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Angle Sliders */}
          <div className={`space-y-4 border rounded-xl p-4 ${
            isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold flex items-center space-x-1 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                <span>Polar Angle θ (Theta)</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-500">
                {((theta / Math.PI) * 180).toFixed(0)}° ({theta.toFixed(2)} rad)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.PI}
              step="0.02"
              value={theta}
              onChange={(e) => setTheta(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            <div className="flex items-center justify-between pt-2">
              <span className={`text-xs font-semibold flex items-center space-x-1 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                <Sliders className="w-3.5 h-3.5 text-purple-500" />
                <span>Azimuthal Angle φ (Phi)</span>
              </span>
              <span className="text-xs font-mono font-bold text-purple-500">
                {((phi / Math.PI) * 180).toFixed(0)}° ({phi.toFixed(2)} rad)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={2 * Math.PI}
              step="0.02"
              value={phi}
              onChange={(e) => setPhi(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Probability Gauge */}
          <div className={`border rounded-xl p-4 space-y-2 ${
            isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-500">P(|0⟩): {prob0}%</span>
              <span className="text-purple-500">P(|1⟩): {prob1}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${prob0}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
              />
              <div
                style={{ width: `${prob1}%` }}
                className="bg-purple-500 h-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Preset Basis States */}
          <div className="space-y-2">
            <span className={`text-xs font-semibold uppercase tracking-wider block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Preset Basis States
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { label: "|0⟩ Ground", t: 0, p: 0 },
                { label: "|1⟩ Excited", t: Math.PI, p: 0 },
                { label: "|+⟩ Equal", t: Math.PI / 2, p: 0 },
                { label: "|-⟩ Minus", t: Math.PI / 2, p: Math.PI },
                { label: "|+i⟩ Y-Plus", t: Math.PI / 2, p: Math.PI / 2 },
                { label: "|-i⟩ Y-Minus", t: Math.PI / 2, p: (3 * Math.PI) / 2 },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreset(preset.t, preset.p)}
                  className={`p-2 rounded-lg border text-center font-bold hover:border-emerald-500 transition-all ${
                    isDark ? "bg-white/5 border-white/10 text-white" : "bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rotation Gate Buttons */}
          <div className="space-y-2">
            <span className={`text-xs font-semibold uppercase tracking-wider block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Apply Unitary Rotation Gates
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs font-bold">
              <button
                onClick={applyHadamard}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#5A2A82] to-purple-800 text-white border border-purple-400/30 shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>H Gate</span>
              </button>
              <button
                onClick={applyXGate}
                className="p-2.5 rounded-xl bg-red-500/20 text-red-500 border border-red-500/30 transition-all active:scale-95"
              >
                X (BitFlip)
              </button>
              <button
                onClick={applyYGate}
                className="p-2.5 rounded-xl bg-purple-500/20 text-purple-500 border border-purple-500/30 transition-all active:scale-95"
              >
                Y Gate
              </button>
              <button
                onClick={applyZGate}
                className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30 transition-all active:scale-95"
              >
                Z (Phase)
              </button>
              <button
                onClick={applySGate}
                className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 transition-all active:scale-95"
              >
                S Gate (+90°)
              </button>
              <button
                onClick={applyTGate}
                className="p-2.5 rounded-xl bg-teal-500/20 text-teal-500 border border-teal-500/30 transition-all active:scale-95"
              >
                T Gate (+45°)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
