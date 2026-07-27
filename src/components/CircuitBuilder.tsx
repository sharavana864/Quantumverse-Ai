import React, { useState, useEffect } from "react";
import {
  Workflow,
  BarChart2,
  Code2,
  Trash2,
  Plus,
  Check,
  Copy
} from "lucide-react";
import { PlacedGate, GateType, CircuitSimulationResult } from "../types";
import { simulateCircuit } from "../utils/quantumSimulator";

interface CircuitBuilderProps {
  theme?: "dark" | "light";
}

export const CircuitBuilder: React.FC<CircuitBuilderProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [numQubits, setNumQubits] = useState<number>(2); // 2 or 3 qubits
  const [gates, setGates] = useState<PlacedGate[]>([
    { id: "g-1", type: "H", qubit: 0, column: 0 },
    { id: "g-2", type: "CNOT", qubit: 1, column: 1, controlQubit: 0 },
    { id: "g-3", type: "MEASURE", qubit: 0, column: 2 },
    { id: "g-4", type: "MEASURE", qubit: 1, column: 2 },
  ]);

  const [selectedGateType, setSelectedGateType] = useState<GateType>("H");
  const [cnotControl, setCnotControl] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"results" | "qiskit" | "cirq">("results");
  const [copiedCode, setCopiedCode] = useState(false);
  const [simulation, setSimulation] = useState<CircuitSimulationResult>(() =>
    simulateCircuit(gates, numQubits)
  );

  useEffect(() => {
    setSimulation(simulateCircuit(gates, numQubits));
  }, [gates, numQubits]);

  const timeColumns = [0, 1, 2, 3, 4, 5, 6, 7];

  const handleCellClick = (qubit: number, col: number) => {
    const existingIndex = gates.findIndex(
      (g) => g.qubit === qubit && g.column === col
    );

    if (existingIndex >= 0) {
      setGates(gates.filter((_, idx) => idx !== existingIndex));
    } else {
      const newGate: PlacedGate = {
        id: `g-${Date.now()}-${Math.random()}`,
        type: selectedGateType,
        qubit,
        column: col,
        controlQubit:
          selectedGateType === "CNOT" || selectedGateType === "SWAP"
            ? cnotControl !== qubit
              ? cnotControl
              : (qubit + 1) % numQubits
            : undefined,
      };
      setGates([...gates, newGate]);
    }
  };

  const handleClearCircuit = () => {
    setGates([]);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`rounded-2xl p-6 border shadow-2xl space-y-8 transition-colors ${
      isDark ? "bg-[#2A2A2A] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
    }`}>
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4 ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Workflow className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl font-black uppercase tracking-wider">Interactive Circuit Builder</h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            Construct multiqubit logic gate wires, run real-time state vector simulations, and generate clean Qiskit/Cirq code.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-1 border rounded-xl p-1 text-xs ${
            isDark ? "bg-black/40 border-white/10" : "bg-slate-100 border-slate-200"
          }`}>
            <span className={`px-2 font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>Qubits:</span>
            <button
              onClick={() => setNumQubits(2)}
              className={`px-3 py-1 rounded-lg font-bold font-mono transition-all ${
                numQubits === 2
                  ? "bg-[#5A2A82] text-white"
                  : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              2 Qubits
            </button>
            <button
              onClick={() => setNumQubits(3)}
              className={`px-3 py-1 rounded-lg font-bold font-mono transition-all ${
                numQubits === 3
                  ? "bg-[#5A2A82] text-white"
                  : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              3 Qubits
            </button>
          </div>

          <button
            onClick={handleClearCircuit}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-500 text-xs font-semibold border border-red-500/30 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Gate Selector Bar */}
      <div className="space-y-2">
        <span className={`text-xs font-semibold uppercase tracking-wider block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          Select Gate Tool to Place
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {(["H", "X", "Y", "Z", "S", "T", "CNOT", "SWAP", "MEASURE"] as GateType[]).map(
            (gateType) => {
              const isSelected = selectedGateType === gateType;
              return (
                <button
                  key={gateType}
                  onClick={() => setSelectedGateType(gateType)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105"
                      : isDark
                      ? "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                  }`}
                >
                  <span>{gateType}</span>
                  {gateType === "CNOT" && <span className="text-[10px] opacity-70">(Controlled)</span>}
                </button>
              );
            }
          )}

          {(selectedGateType === "CNOT" || selectedGateType === "SWAP") && (
            <div className={`flex items-center space-x-2 border rounded-xl px-3 py-1.5 text-xs ${
              isDark ? "bg-purple-900/60 border-purple-500/30 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"
            }`}>
              <span className="font-medium">Control Wire:</span>
              <select
                value={cnotControl}
                onChange={(e) => setCnotControl(parseInt(e.target.value))}
                className={`font-mono font-bold rounded px-2 py-1 outline-none border ${
                  isDark ? "bg-black/60 text-emerald-400 border-purple-400/30" : "bg-white text-purple-900 border-purple-300"
                }`}
              >
                {Array.from({ length: numQubits }, (_, q) => (
                  <option key={q} value={q}>
                    q[{q}]
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Quantum Wire Diagram Board */}
      <div className={`border rounded-2xl p-6 overflow-x-auto relative ${
        isDark ? "bg-black/50 border-white/10" : "bg-slate-100 border-slate-200"
      }`}>
        <div className="min-w-[680px] space-y-6">
          {Array.from({ length: numQubits }, (_, q) => (
            <div key={q} className="flex items-center space-x-4 relative">
              {/* Wire Label */}
              <div className="w-16 font-mono font-bold text-sm text-emerald-500 flex items-center space-x-1">
                <span>q[{q}]</span>
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-slate-400"}`}>|0⟩</span>
              </div>

              {/* Horizontal Wire Line */}
              <div className={`absolute left-20 right-4 top-1/2 h-0.5 -z-0 ${isDark ? "bg-gray-600" : "bg-slate-300"}`} />

              {/* Time Slots 0..7 */}
              <div className="flex-1 grid grid-cols-8 gap-3 z-10">
                {timeColumns.map((col) => {
                  const gate = gates.find((g) => g.qubit === q && g.column === col);
                  const isControlWire = gates.find(
                    (g) =>
                      g.column === col &&
                      g.controlQubit === q &&
                      (g.type === "CNOT" || g.type === "SWAP")
                  );

                  return (
                    <button
                      key={col}
                      onClick={() => handleCellClick(q, col)}
                      className={`h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all relative border ${
                        gate
                          ? gate.type === "CNOT" || gate.type === "SWAP"
                            ? "bg-[#5A2A82] text-white border-purple-400 shadow-lg shadow-purple-900/40"
                            : gate.type === "MEASURE"
                            ? "bg-amber-800 text-amber-100 border-amber-500"
                            : "bg-emerald-600 text-white border-emerald-400 shadow-md"
                          : isControlWire
                          ? "bg-purple-900 border-purple-400 text-purple-200"
                          : isDark
                          ? "bg-[#2E2E2E]/80 hover:bg-white/10 border-white/10 border-dashed text-gray-500 hover:text-white"
                          : "bg-white/80 hover:bg-slate-200 border-slate-300 border-dashed text-slate-400 hover:text-slate-800"
                      }`}
                    >
                      {gate ? (
                        <span>{gate.type}</span>
                      ) : isControlWire ? (
                        <div className="w-3 h-3 rounded-full bg-purple-400 ring-4 ring-purple-900" />
                      ) : (
                        <Plus className="w-3 h-3 opacity-30" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs: Simulation Results / Qiskit Code / Cirq Code */}
      <div className="space-y-4">
        <div className={`flex border-b text-xs font-semibold ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <button
            onClick={() => setActiveTab("results")}
            className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 font-medium transition-all ${
              activeTab === "results"
                ? "border-emerald-500 text-emerald-500"
                : isDark ? "border-transparent text-gray-400 hover:text-white" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Probability Distribution & State Vector</span>
          </button>
          <button
            onClick={() => setActiveTab("qiskit")}
            className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 font-medium transition-all ${
              activeTab === "qiskit"
                ? "border-emerald-500 text-emerald-500"
                : isDark ? "border-transparent text-gray-400 hover:text-white" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Generated Qiskit Code</span>
          </button>
          <button
            onClick={() => setActiveTab("cirq")}
            className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 font-medium transition-all ${
              activeTab === "cirq"
                ? "border-emerald-500 text-emerald-500"
                : isDark ? "border-transparent text-gray-400 hover:text-white" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Generated Cirq Code</span>
          </button>
        </div>

        {/* Tab Content 1: Probability Distribution Histogram & State Vector Table */}
        {activeTab === "results" && (
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 border rounded-2xl p-6 ${
            isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="lg:col-span-7 space-y-4">
              <span className={`text-xs font-bold uppercase tracking-wider block ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                Measurement Probability Distribution (1024 Shots)
              </span>
              <div className="space-y-3">
                {simulation.stateVector.map((sv) => (
                  <div key={sv.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono font-semibold">
                      <span className="text-emerald-500 font-bold">{sv.label}</span>
                      <span className={isDark ? "text-gray-300" : "text-slate-600"}>
                        {sv.probability}% ({Math.round((sv.probability * 1024) / 100)} shots)
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-slate-200"}`}>
                      <div
                        style={{ width: `${sv.probability}%` }}
                        className="bg-gradient-to-r from-[#5A2A82] to-[#2ECC71] h-full transition-all duration-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-5 space-y-3 border rounded-xl p-4 font-mono text-xs ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
            }`}>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
                Complex Amplitudes (Dirac Notation)
              </span>
              <div className={`divide-y ${isDark ? "divide-white/10" : "divide-slate-200"}`}>
                {simulation.stateVector.map((sv) => (
                  <div key={sv.label} className="py-2 flex items-center justify-between">
                    <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{sv.label}</span>
                    <div className="text-right">
                      <span className={`block font-bold ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                        {sv.real >= 0 ? "+" : ""}
                        {sv.real} {sv.imag >= 0 ? "+" : ""}
                        {sv.imag}i
                      </span>
                      <span className={`block text-[10px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                        Phase: {sv.phaseDeg}° | |α|: {sv.magnitude}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Qiskit Code View */}
        {activeTab === "qiskit" && (
          <div className={`relative border rounded-2xl p-4 font-mono text-xs ${
            isDark ? "bg-black/80 border-white/10 text-emerald-300" : "bg-slate-900 border-slate-800 text-emerald-400"
          }`}>
            <button
              onClick={() => handleCopy(simulation.qiskitCode)}
              className="absolute top-3 right-3 flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition-all"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
            <pre className="overflow-x-auto p-2 leading-relaxed">{simulation.qiskitCode}</pre>
          </div>
        )}

        {/* Tab Content 3: Cirq Code View */}
        {activeTab === "cirq" && (
          <div className={`relative border rounded-2xl p-4 font-mono text-xs ${
            isDark ? "bg-black/80 border-white/10 text-purple-300" : "bg-slate-900 border-slate-800 text-purple-300"
          }`}>
            <button
              onClick={() => handleCopy(simulation.cirqCode)}
              className="absolute top-3 right-3 flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition-all"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
            <pre className="overflow-x-auto p-2 leading-relaxed">{simulation.cirqCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
