import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper to initialize GoogleGenAI safely on demand
  function getGenAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "QuantumVerse AI Backend" });
  });

  // 1. AI Tutor Endpoint
  app.post("/api/ai/tutor", async (req, res) => {
    try {
      const { prompt, topic, skillLevel, history } = req.body;
      const ai = getGenAI();

      if (!ai) {
        // Smart realistic fallback response if no key configured
        return res.json({
          response: `[Simulated Quantum AI Tutor - ${skillLevel || "Beginner"} Mode]\n\nGreat question regarding **${topic || "Quantum Computing"}**! Here is a step-by-step breakdown:\n\n1. **Core Concept**: Quantum states exist in Hilbert space where superposition allows linear combinations of |0⟩ and |1⟩.\n2. **Intuition**: Unlike classical bits (0 OR 1), a qubit is represented by a unit vector on the Bloch sphere defined by θ and φ angles.\n3. **Practical Application**: Gates like Hadamard (H) create equal superposition (|0⟩ + |1⟩)/√2.\n\n*Pro-tip*: Open the Bloch Sphere visualizer in QuantumVerse to rotate the state vector and see this in action!`,
          isSimulated: true,
        });
      }

      const systemInstruction = `You are QuantumVerse AI Tutor, an expert, enthusiastic quantum computing professor.
Target Audience Skill Level: ${skillLevel || "Beginner"}.
Current Learning Context: ${topic || "General Quantum Computing"}.
Guidelines:
- Provide clear, mathematically intuitive, and step-by-step explanations suited to ${skillLevel}.
- Include Dirac notation (|0⟩, |1⟩, |ψ⟩) when relevant, but keep it accessible.
- Recommend practical steps like testing in the QuantumVerse Bloch sphere visualizer or Coding Playground.
- Keep output nicely formatted with Markdown bullet points and bold key terms.`;

      const contents = history && Array.isArray(history) && history.length > 0
        ? history.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          }))
        : [{ role: "user", parts: [{ text: prompt }] }];

      if (history && history.length > 0) {
        contents.push({ role: "user", parts: [{ text: prompt }] });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        response: response.text || "Could not generate answer at this moment.",
        isSimulated: false,
      });
    } catch (error: any) {
      console.error("AI Tutor Error:", error);
      res.json({
        response: `Quantum AI Tutor Note: In quantum computing, superposition allows qubits to represent multiple states simultaneously until measurement collapses the wavefunction. Try exploring the Bloch Sphere or Circuit Builder for visual proof!`,
        isSimulated: true,
        error: error.message,
      });
    }
  });

  // 2. AI Quiz Generator
  app.post("/api/ai/quiz", async (req, res) => {
    try {
      const { topic, difficulty, questionCount = 3 } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          questions: [
            {
              id: "q1",
              question: `What is the effect of applying a Hadamard (H) gate to a ground state qubit |0⟩?`,
              options: [
                "Leaves the qubit unchanged in state |0⟩",
                "Flips the qubit directly into state |1⟩",
                "Puts the qubit into equal superposition (|0⟩ + |1⟩)/√2",
                "Collapses the qubit state randomly",
              ],
              correctIndex: 2,
              explanation: "The Hadamard gate creates an equal superposition state: H|0⟩ = (|0⟩ + |1⟩)/√2. Measuring this state yields 0 or 1 with 50% probability each.",
              recommendedTopic: "Qubits & Superposition",
            },
            {
              id: "q2",
              question: `In quantum entanglement, what happens when you measure Qubit A of a Bell state (|00⟩ + |11⟩)/√2?`,
              options: [
                "Qubit B remains completely independent",
                "Qubit B's state instantaneously collapses to match Qubit A's outcome",
                "Both qubits flip their phase by 180 degrees",
                "The circuit throws an execution error",
              ],
              correctIndex: 1,
              explanation: "Entanglement links the quantum states. Measuring Qubit A to be |0⟩ instantaneously collapses Qubit B to |0⟩, regardless of physical distance.",
              recommendedTopic: "Entanglement & Bell States",
            },
            {
              id: "q3",
              question: "Which quantum algorithm provides a quadratic speedup for searching an unsorted database of N items?",
              options: [
                "Shor's Algorithm",
                "Grover's Algorithm",
                "Deutsch-Jozsa Algorithm",
                "Variational Quantum Eigensolver (VQE)",
              ],
              correctIndex: 1,
              explanation: "Grover's algorithm searches unsorted data in O(√N) time complexity compared to classical O(N) search.",
              recommendedTopic: "Quantum Search Algorithms",
            }
          ],
          isSimulated: true
        });
      }

      const prompt = `Generate ${questionCount} multiple choice quiz questions on the quantum computing topic: "${topic}" at difficulty level "${difficulty || "Beginner"}".
Return strict JSON as an array of objects with schema:
[
  {
    "id": "q1",
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Detailed explanation why the correct option is right.",
    "recommendedTopic": "Topic to review if missed"
  }
]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.6,
        },
      });

      const text = response.text || "[]";
      const questions = JSON.parse(text);
      res.json({ questions, isSimulated: false });
    } catch (error: any) {
      console.error("Quiz Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 3. AI Code Assistant / Debugger
  app.post("/api/ai/code-assist", async (req, res) => {
    try {
      const { code, framework, task } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          analysis: `### Code Analysis & Optimization (${framework || "Qiskit"})\n\n1. **Circuit Initialization**: Your circuit correctly instantiates quantum and classical registers.\n2. **Gate Sequence**: Remember that CNOT control and target ordering matters! Control qubit controls the flip on the target.\n3. **Measurement Step**: Ensure \`measure_all()\` or explicit \`measure(q, c)\` is invoked before sending to the aer simulator backend.\n\n\`\`\`python\n# Suggested Optimized Snippet (${framework})\nfrom qiskit import QuantumCircuit\nqc = QuantumCircuit(2, 2)\nqc.h(0)       # Create superposition\nqc.cx(0, 1)   # Create Bell pair\nqc.measure_all()\n\`\`\``,
          suggestedCode: `# Bell State Entanglement Circuit\nfrom qiskit import QuantumCircuit, transpile\nfrom qiskit_aer import AerSimulator\n\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure([0, 1], [0, 1])\n\nsimulator = AerSimulator()\ncompiled_circuit = transpile(qc, simulator)\njob = simulator.run(compiled_circuit, shots=1024)\nresult = job.result()\ncounts = result.get_counts()\nprint("Measurement Counts:", counts)\n`,
          isSimulated: true
        });
      }

      const prompt = `You are a Quantum Computing Code Engineer expert in Qiskit, Cirq, and IBM Quantum Runtime.
Analyze the user's code snippet:
Framework: ${framework}
Task/Issue: ${task || "Code review and optimization"}

Code:
\`\`\`python
${code}
\`\`\`

Provide:
1. Markdown analysis explaining what the circuit does, any potential logical or API bugs, and performance recommendations.
2. An optimized, fully executable Python code block.
Return JSON with format:
{
  "analysis": "Markdown analysis string",
  "suggestedCode": "Executable Python string"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({ ...parsed, isSimulated: false });
    } catch (error: any) {
      console.error("Code Assist Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 4. AI Notes & Flashcards Generator
  app.post("/api/ai/notes-summary", async (req, res) => {
    try {
      const { content, title } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          summary: `### Core Summary: ${title || "Quantum Notes"}\n- **Fundamental Unit**: Qubits express quantum states through linear combinations of basis vectors.\n- **Bloch Sphere Representation**: $|\psi\\rangle = \\cos(\\theta/2)|0\\rangle + e^{i\\phi}\\sin(\\theta/2)|1\\rangle$.\n- **Superposition & Measurement**: Measurement causes immediate wavefunction collapse into standard basis vectors.`,
          flashcards: [
            { front: "What is a Bloch Sphere?", back: "A 3D geometrical representation of the pure state space of a two-level quantum mechanical system (qubit)." },
            { front: "What does the Hadamard (H) Gate do?", back: "Transforms standard basis states (|0⟩, |1⟩) into superposition states ((|0⟩+|1⟩)/√2, (|0⟩-|1⟩)/√2)." },
            { front: "What is Quantum Entanglement?", back: "A non-classical phenomenon where quantum states of two or more particles are linked such that one cannot be described independently of the others." }
          ],
          mindMapNodes: [
            { id: "1", label: title || "Quantum Core", type: "root" },
            { id: "2", label: "Superposition", type: "branch" },
            { id: "3", label: "Entanglement", type: "branch" },
            { id: "4", label: "Bloch Sphere", type: "leaf" },
            { id: "5", label: "Bell States", type: "leaf" }
          ],
          isSimulated: true
        });
      }

      const prompt = `Analyze the given quantum study material/notes titled "${title}":
"${content}"

Generate:
1. Concise executive revision summary (markdown format).
2. Array of 4 flashcards with "front" and "back" prompt/answers.
3. Mind map array of nodes with { "id": "1", "label": "Text", "type": "root" | "branch" | "leaf" }.

Return JSON format:
{
  "summary": "Markdown text",
  "flashcards": [{ "front": "Q", "back": "A" }],
  "mindMapNodes": [{ "id": "1", "label": "Node", "type": "root" }]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({ ...parsed, isSimulated: false });
    } catch (error: any) {
      console.error("Notes Summary Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite Integration for Dev vs Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`QuantumVerse AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
