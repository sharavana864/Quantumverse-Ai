import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "10mb" }));

  // Clean text from raw markdown header symbols like ## ** or escaped \n
  function sanitizeText(raw: string | undefined): string {
    if (!raw) return "";
    let clean = raw.trim();
    clean = clean.replace(/\\n/g, "\n");
    clean = clean.replace(/#{1,6}\s*\*{1,2}\s*/g, "");
    clean = clean.replace(/\*{1,2}\s*#{1,6}/g, "");
    clean = clean.replace(/^#{1,6}\s+/gm, "");
    return clean;
  }

  // Generate dynamic, context-aware AI tutor responses when offline or missing API key
  function generateDynamicTutorFallback(prompt: string, topic?: string, skillLevel?: string): string {
    const query = (prompt || "").toLowerCase().trim();

    if (query.includes("bloch") || query.includes("sphere") || query.includes("vector")) {
      return `The **Bloch Sphere** is the fundamental 3D geometric visualization tool for a single qubit state:

• **Geometrical Structure**: The North pole represents pure ground state |0⟩, while the South pole represents excited state |1⟩.
• **Mathematical Representation**: Any pure state |ψ⟩ on the sphere is defined by polar angle θ and azimuthal angle φ:
  |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
• **Quantum Gate Rotations**: Applying unitary gates rotates the state vector around the sphere's axes. For instance, a Hadamard (H) gate rotates |0⟩ by 90° to the equator into equal superposition (|0⟩ + |1⟩)/√2.

*Tip*: Explore the QuantumVerse Interactive Bloch Sphere visualizer in the app to manipulate θ and φ in real-time!`;
    }

    if (query.includes("hadamard") || query.includes("h gate") || query.includes("superposition")) {
      return `**Quantum Superposition & The Hadamard (H) Gate**:

1. **What is Superposition?**
   Unlike classical bits that are strictly 0 OR 1, a qubit exists in a linear superposition of both basis states: |ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1.

2. **The Hadamard Matrix**:
   H = (1/√2) * [[1, 1], [1, -1]]

3. **Applying H to |0⟩**:
   H|0⟩ = (|0⟩ + |1⟩) / √2 = |+⟩
   Upon measurement, this creates an exact 50% probability of collapsing to 0 and 50% probability of collapsing to 1.

Try applying the H gate in the QuantumVerse Circuit Builder to observe quantum state probability distributions!`;
    }

    if (query.includes("entangle") || query.includes("bell") || query.includes("cnot") || query.includes("cx")) {
      return `**Quantum Entanglement & Bell States**:

Quantum Entanglement is a non-classical correlation where two or more qubits share a unified quantum state. Measuring one qubit instantaneously determines the state of the other, regardless of spatial distance.

**Creating a Bell State (|00⟩ + |11⟩)/√2**:
1. Start with two qubits in ground state |00⟩.
2. Apply Hadamard (H) to Qubit 0: creates superposition (|0⟩ + |1⟩)/√2 ⊗ |0⟩.
3. Apply CNOT with Qubit 0 as Control and Qubit 1 as Target.
4. Output: |Φ+⟩ = (|00⟩ + |11⟩) / √2.

If you measure Qubit 0 as '1', Qubit 1 is guaranteed to collapse to '1' as well!`;
    }

    if (query.includes("qiskit") || query.includes("code") || query.includes("python") || query.includes("circuit")) {
      return `**Executing Quantum Circuits in Python (Qiskit)**:

Here is a complete, production-ready Qiskit script to generate superposition and measure quantum outcomes:

\`\`\`python
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# 1. Create a 2-qubit, 2-classical-bit circuit
qc = QuantumCircuit(2, 2)

# 2. Add Gates: Hadamard on q0, CNOT on q0->q1
qc.h(0)
qc.cx(0, 1)

# 3. Measure both qubits into classical bits
qc.measure([0, 1], [0, 1])

# 4. Simulate on Qiskit Aer
simulator = AerSimulator()
compiled_qc = transpile(qc, simulator)
job = simulator.run(compiled_qc, shots=1024)
counts = job.result().get_counts()

print("Quantum Measurement Results:", counts) # Returns ~50% '00' and ~50% '11'
\`\`\`

You can copy and run this code directly inside the QuantumVerse Coding Playground!`;
    }

    return `**Quantum Computing Breakdown (${skillLevel || "Beginner"} Level — ${topic || "Core Foundations"})**:

Here is a comprehensive breakdown regarding **"${prompt}"**:

1. **Fundamental Principle**:
   Quantum systems store information using qubits governed by quantum mechanical phenomena: Superposition, Interference, and Entanglement.

2. **State & Measurement**:
   Before measurement, a qubit state |ψ⟩ = α|0⟩ + β|1⟩ contains continuous probability amplitudes. Measurement forces the wavefunction to collapse into a discrete classical outcome (0 or 1) with probability |α|² and |β|².

3. **Unitary Transformations**:
   All quantum operations (gates) are reversible unitary matrices U (U† U = I). They preserve total probability (|α|² + |β|² = 1) while rotating vectors in complex Hilbert space.

4. **Interactive Recommendation**:
   To visualize this concept directly, test this gate combination in the QuantumVerse Circuit Builder or ask me to explain specific gates (H, X, Z, CNOT)!`;
  }

  // Helper to initialize GoogleGenAI safely on demand
  function getGenAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || !apiKey.trim()) return null;
    return new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Safely parse JSON response from Gemini, removing any markdown formatting
  function parseJsonResponse(rawText: string | undefined): any {
    if (!rawText) return null;
    let clean = rawText.trim();
    if (clean.startsWith("```")) {
      clean = clean.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }
    try {
      return JSON.parse(clean);
    } catch (e) {
      const firstBrace = clean.search(/[\{\[]/);
      const lastBrace = Math.max(clean.lastIndexOf("}"), clean.lastIndexOf("]"));
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        const extracted = clean.substring(firstBrace, lastBrace + 1);
        try {
          return JSON.parse(extracted);
        } catch (e2) {
          console.error("Failed to parse extracted JSON substring");
        }
      }
      return null;
    }
  }

  // Build valid multi-turn contents for Gemini ensuring the first item is 'user'
  function buildGeminiContents(prompt: string, history?: any[]) {
    const formatted: { role: string; parts: { text: string }[] }[] = [];

    const validHistory = Array.isArray(history) ? history.filter((m) => m && m.text && m.text.trim()) : [];
    const recentHistory = validHistory.slice(-10);

    for (const msg of recentHistory) {
      const role = msg.role === "user" ? "user" : "model";
      if (formatted.length === 0 && role === "model") continue;

      if (formatted.length > 0 && formatted[formatted.length - 1].role === role) {
        formatted[formatted.length - 1].parts[0].text += `\n\n${msg.text}`;
      } else {
        formatted.push({ role, parts: [{ text: msg.text }] });
      }
    }

    if (prompt && prompt.trim()) {
      if (formatted.length > 0 && formatted[formatted.length - 1].role === "user") {
        const lastText = formatted[formatted.length - 1].parts[0].text;
        if (!lastText.endsWith(prompt.trim())) {
          formatted[formatted.length - 1].parts[0].text += `\n\n${prompt.trim()}`;
        }
      } else {
        formatted.push({ role: "user", parts: [{ text: prompt.trim() }] });
      }
    }

    if (formatted.length === 0) {
      formatted.push({ role: "user", parts: [{ text: prompt || "Explain quantum computing fundamentals" }] });
    }

    return formatted;
  }

  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "QuantumVerse AI Backend" });
  });

  // 1. AI Tutor Endpoint
  app.post("/api/ai/tutor", async (req, res) => {
    const { prompt = "", topic = "", skillLevel = "", history = [] } = req.body || {};
    try {
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          response: generateDynamicTutorFallback(prompt, topic, skillLevel),
          isSimulated: true,
        });
      }

      const systemInstruction = `You are QuantumVerse AI Tutor, an expert, encouraging quantum computing professor.
Target Audience Skill Level: ${skillLevel || "Beginner"}.
Current Learning Context: ${topic || "General Quantum Computing"}.
Guidelines:
- Directly answer the user's question with a thorough, engaging, and comprehensive explanation suited to ${skillLevel}.
- Include mathematical notation (Dirac notation |0⟩, |1⟩, |ψ⟩ when relevant), conceptual intuition, and practical quantum code/examples (Qiskit or Cirq).
- Format responses cleanly with bold headings, bullet points, numbered steps, and code blocks.
- Provide complete, well-structured explanations without truncating ideas.`;

      const contents = buildGeminiContents(prompt || "Explain quantum computing fundamentals", history);

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });

      const responseText = sanitizeText(response.text);
      if (!responseText) {
        throw new Error("Empty response from AI model.");
      }

      res.json({
        response: responseText,
        isSimulated: false,
      });
    } catch (error: any) {
      console.error("AI Tutor Error:", error);
      res.json({
        response: generateDynamicTutorFallback(prompt, topic, skillLevel),
        isSimulated: true,
        error: error.message,
      });
    }
  });

  // 2. AI Quiz Generator
  app.post("/api/ai/quiz", async (req, res) => {
    const fallbackQuestions = [
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
    ];

    try {
      const { topic, difficulty, questionCount = 3 } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({ questions: fallbackQuestions, isSimulated: true });
      }

      const prompt = `Generate ${questionCount} multiple choice quiz questions on the quantum computing topic: "${topic || "Quantum Computing"}" at difficulty level "${difficulty || "Beginner"}".
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
          temperature: 0.5,
          maxOutputTokens: 800,
        },
      });

      const parsed = parseJsonResponse(response.text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ questions: parsed, isSimulated: false });
      } else {
        return res.json({ questions: fallbackQuestions, isSimulated: true });
      }
    } catch (error: any) {
      console.error("Quiz Error:", error);
      res.json({ questions: fallbackQuestions, isSimulated: true, error: error.message });
    }
  });

  // 3. AI Code Assistant / Debugger
  app.post("/api/ai/code-assist", async (req, res) => {
    const fallbackAssist = {
      analysis: `### Code Analysis & Optimization (${req.body?.framework || "Qiskit"})\n\n1. **Circuit Initialization**: Your circuit correctly instantiates quantum and classical registers.\n2. **Gate Sequence**: Remember that CNOT control and target ordering matters! Control qubit controls the flip on the target.\n3. **Measurement Step**: Ensure \`measure_all()\` or explicit \`measure(q, c)\` is invoked before sending to the aer simulator backend.\n\n\`\`\`python\n# Suggested Optimized Snippet (${req.body?.framework || "Qiskit"})\nfrom qiskit import QuantumCircuit\nqc = QuantumCircuit(2, 2)\nqc.h(0)       # Create superposition\nqc.cx(0, 1)   # Create Bell pair\nqc.measure_all()\n\`\`\``,
      suggestedCode: `# Bell State Entanglement Circuit\nfrom qiskit import QuantumCircuit, transpile\nfrom qiskit_aer import AerSimulator\n\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure([0, 1], [0, 1])\n\nsimulator = AerSimulator()\ncompiled_circuit = transpile(qc, simulator)\njob = simulator.run(compiled_circuit, shots=1024)\nresult = job.result()\ncounts = result.get_counts()\nprint("Measurement Counts:", counts)\n`,
      isSimulated: true
    };

    try {
      const { code, framework, task } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json(fallbackAssist);
      }

      const prompt = `You are a Quantum Computing Code Engineer expert in Qiskit, Cirq, and IBM Quantum Runtime.
Analyze the user's code snippet:
Framework: ${framework || "Qiskit"}
Task/Issue: ${task || "Code review and optimization"}

Code:
\`\`\`python
${code || "# Empty code snippet"}
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
          maxOutputTokens: 800,
        },
      });

      const parsed = parseJsonResponse(response.text);
      if (parsed && typeof parsed === "object" && (parsed.analysis || parsed.suggestedCode)) {
        return res.json({ ...parsed, isSimulated: false });
      } else {
        return res.json(fallbackAssist);
      }
    } catch (error: any) {
      console.error("Code Assist Error:", error);
      res.json(fallbackAssist);
    }
  });

  // 4. AI Notes & Flashcards Generator
  app.post("/api/ai/notes-summary", async (req, res) => {
    const fallbackNotes = {
      summary: `### Core Summary: ${req.body?.title || "Quantum Notes"}\n- **Fundamental Unit**: Qubits express quantum states through linear combinations of basis vectors.\n- **Bloch Sphere Representation**: $|\psi\\rangle = \\cos(\\theta/2)|0\\rangle + e^{i\\phi}\\sin(\\theta/2)|1\\rangle$.\n- **Superposition & Measurement**: Measurement causes immediate wavefunction collapse into standard basis vectors.`,
      flashcards: [
        { front: "What is a Bloch Sphere?", back: "A 3D geometrical representation of the pure state space of a two-level quantum mechanical system (qubit)." },
        { front: "What does the Hadamard (H) Gate do?", back: "Transforms standard basis states (|0⟩, |1⟩) into superposition states ((|0⟩+|1⟩)/√2, (|0⟩-|1⟩)/√2)." },
        { front: "What is Quantum Entanglement?", back: "A non-classical phenomenon where quantum states of two or more particles are linked such that one cannot be described independently of the others." }
      ],
      mindMapNodes: [
        { id: "1", label: req.body?.title || "Quantum Core", type: "root" },
        { id: "2", label: "Superposition", type: "branch" },
        { id: "3", label: "Entanglement", type: "branch" },
        { id: "4", label: "Bloch Sphere", type: "leaf" },
        { id: "5", label: "Bell States", type: "leaf" }
      ],
      isSimulated: true
    };

    try {
      const { content, title } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json(fallbackNotes);
      }

      const prompt = `Analyze the given quantum study material/notes titled "${title || "Quantum Study Notes"}":
"${content || "Quantum computing uses superposition and entanglement."}"

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
          maxOutputTokens: 800,
        },
      });

      const parsed = parseJsonResponse(response.text);
      if (parsed && typeof parsed === "object" && (parsed.summary || parsed.flashcards)) {
        return res.json({ ...parsed, isSimulated: false });
      } else {
        return res.json(fallbackNotes);
      }
    } catch (error: any) {
      console.error("Notes Summary Error:", error);
      res.json(fallbackNotes);
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
