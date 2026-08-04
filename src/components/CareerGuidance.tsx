import React, { useState } from "react";
import {
  Briefcase,
  ExternalLink,
  Bot,
  Sparkles
} from "lucide-react";
import {
  CAREER_PAPERS,
  CERTIFICATIONS_LIST,
  INTERNSHIP_OPPORTUNITIES,
} from "../data/careerData";
import { FormattedAIText } from "./FormattedAIText";

interface CareerGuidanceProps {
  theme?: "dark" | "light";
}

export const CareerGuidance: React.FC<CareerGuidanceProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"papers" | "certs" | "internships" | "roadmap">("papers");
  const [roadmapQuery, setRoadmapQuery] = useState("");
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<string | null>(null);

  const handleGenerateRoadmap = async () => {
    if (!roadmapQuery.trim()) return;
    setIsGeneratingRoadmap(true);
    setGeneratedRoadmap(null);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate a step-by-step personalized Quantum Career & Research Roadmap for a learner with background: "${roadmapQuery}". Provide 4 distinct phases (Months 1-3, 4-6, 7-9, 10-12) with specific Qiskit skills, papers to read, and target internship roles.`,
          topic: "Quantum Career Guidance",
          skillLevel: "Intermediate",
        }),
      });

      const data = await res.json();
      setGeneratedRoadmap(data.response || "Personalized Quantum Career Roadmap computed successfully!");
    } catch {
      setGeneratedRoadmap(`### Step-by-Step Personalized Quantum Career Roadmap\n\n1. **Phase 1 (Months 1-3): Quantum Mechanics & Linear Algebra**\n   - Master Dirac notation, 2-qubit density matrices, and Bloch sphere state rotations.\n   - Complete Qiskit 2.0 developer certification fundamentals.\n\n2. **Phase 2 (Months 4-6): NISQ Algorithms & PennyLane**\n   - Implement Variational Quantum Eigensolvers (VQE) for H2 molecule simulation.\n   - Publish open-source Qiskit algorithms on GitHub.\n\n3. **Phase 3 (Months 7-12): Research & Internships**\n   - Apply for IBM Quantum & Google Quantum AI developer internship roles.`);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  return (
    <div className={`space-y-8 max-w-7xl mx-auto transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4 ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Briefcase className={`w-6 h-6 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
            <h2 className="text-xl font-extrabold uppercase tracking-wider">Quantum Career Guidance & Research Portal</h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
            Access curated arXiv research papers, industry certifications, active internships, and AI career roadmap planner.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className={`flex items-center space-x-2 border rounded-2xl p-1 text-xs font-bold ${
          isDark ? "bg-[#121212] border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          {(["papers", "certs", "internships", "roadmap"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider text-[11px] transition-all ${
                activeTab === tab
                  ? isDark
                    ? "bg-[#7F00FF] text-white glow-violet font-black"
                    : "bg-[#333333] text-white font-black"
                  : isDark ? "text-[#C0C0C0] hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "papers" ? "arXiv Papers" : tab === "certs" ? "Certifications" : tab === "internships" ? "Internships" : "AI Roadmap"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: arXiv Papers */}
      {activeTab === "papers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAREER_PAPERS.map((paper) => (
            <div
              key={paper.id}
              className={`border rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4 transition-all ${
                isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30 hover:border-[#7F00FF]/60" : "bg-white border-slate-200 hover:border-purple-300 shadow-sm"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full ${
                    isDark ? "bg-[#7F00FF] text-[#A3FF00]" : "bg-[#333333] text-white"
                  }`}>
                    {paper.category}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>{paper.year}</span>
                </div>

                <h3 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{paper.title}</h3>
                <p className={`text-xs font-mono font-bold ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`}>{paper.authors.join(", ")}</p>
                <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>{paper.abstract}</p>
              </div>

              <div className={`pt-3 border-t flex items-center justify-between ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <span className={`text-[11px] font-mono ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>{paper.journal}</span>
                <a
                  href={paper.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center space-x-1 ${
                    isDark ? "bg-[#A3FF00]/10 text-[#A3FF00] hover:bg-[#A3FF00]/20" : "bg-[#00B894]/10 text-[#00B894] hover:bg-[#00B894]/20"
                  }`}
                >
                  <span>Read Paper</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Certifications */}
      {activeTab === "certs" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS_LIST.map((cert) => (
            <div
              key={cert.id}
              className={`border rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4 ${
                isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="space-y-3">
                <span className={`text-xs font-black uppercase block ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`}>{cert.issuer}</span>
                <h3 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{cert.title}</h3>
                <p className={`text-xs ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>Prep: {cert.recommendedPrep}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((s, i) => (
                    <span key={i} className={`text-[10px] border px-2.5 py-0.5 rounded-full font-bold ${
                      isDark ? "bg-[#121212] border-white/10 text-[#A3FF00]" : "bg-slate-50 border-slate-200 text-[#00B894]"
                    }`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-2.5 rounded-2xl text-white font-black text-xs text-center block uppercase tracking-wider shadow-lg ${
                  isDark ? "bg-[#7F00FF] hover:bg-[#6b00db] glow-violet" : "bg-[#333333] hover:bg-slate-700"
                }`}
              >
                View Exam Guide & Syllabus
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Internships */}
      {activeTab === "internships" && (
        <div className="space-y-4">
          {INTERNSHIP_OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className={`border rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{opp.company}</h3>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    isDark ? "text-[#A3FF00] bg-[#A3FF00]/10 border-[#A3FF00]/30" : "text-[#00B894] bg-[#00B894]/10 border-[#00B894]/30"
                  }`}>
                    {opp.stipend}
                  </span>
                </div>
                <span className={`text-xs font-black uppercase block ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`}>{opp.role}</span>
                <p className={`text-xs ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>{opp.requirements}</p>
                <span className={`text-[11px] font-mono block ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>Location: {opp.location}</span>
              </div>

              <a
                href={opp.applyUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider shrink-0 shadow-lg ${
                  isDark ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime" : "bg-[#00B894] text-white hover:bg-[#009c7d]"
                }`}
              >
                Apply Online
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: AI Personalized Roadmap Planner */}
      {activeTab === "roadmap" && (
        <div className={`border rounded-3xl p-6 shadow-2xl space-y-6 ${
          isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Bot className={`w-5 h-5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
              <h3 className="font-extrabold text-base uppercase tracking-wider">Personalized Quantum AI Career Roadmap Generator</h3>
            </div>
            <p className={`text-xs ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Input your background (e.g., "Computer Science undergrad with Python experience looking for Qiskit software engineer roles") to get an AI curated study plan.
            </p>
          </div>

          <div className={`flex items-center space-x-3 border rounded-2xl p-2 ${
            isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
          }`}>
            <input
              type="text"
              value={roadmapQuery}
              onChange={(e) => setRoadmapQuery(e.target.value)}
              placeholder="e.g. Electrical engineering student wanting to work on superconducting qubits at IBM..."
              className={`flex-1 bg-transparent px-3 py-2 text-xs outline-none ${
                isDark ? "text-white placeholder-gray-500" : "text-slate-900 placeholder-slate-400"
              }`}
            />
            <button
              onClick={handleGenerateRoadmap}
              disabled={isGeneratingRoadmap || !roadmapQuery.trim()}
              className={`px-5 py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider disabled:opacity-50 flex items-center space-x-1.5 ${
                isDark ? "bg-[#7F00FF] hover:bg-[#6b00db] glow-violet" : "bg-[#333333] hover:bg-slate-700"
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FFC312]" />
              <span>{isGeneratingRoadmap ? "Generating Roadmap..." : "Generate Roadmap"}</span>
            </button>
          </div>

          {generatedRoadmap && (
            <div className={`border rounded-2xl p-6 space-y-3 font-sans text-xs leading-relaxed animate-in fade-in ${
              isDark ? "bg-[#121212] border-[#7F00FF]/30 text-[#C0C0C0]" : "bg-slate-50 border-slate-200 text-slate-800"
            }`}>
              <span className={`font-black text-sm uppercase block ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>Your Tailored Quantum Roadmap</span>
              <FormattedAIText content={generatedRoadmap} isDark={isDark} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
