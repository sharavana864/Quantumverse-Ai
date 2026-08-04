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

    if (history && Array.isArray(history) && history.length > 0) {
      for (const msg of history) {
        if (!msg || !msg.text) continue;
        const role = msg.role === "user" ? "user" : "model";
        // Drop leading model messages because Gemini contents MUST start with 'user'
        if (formatted.length === 0 && role === "model") continue;

        if (formatted.length > 0 && formatted[formatted.length - 1].role === role) {
          formatted[formatted.length - 1].parts[0].text += `\n${msg.text}`;
        } else {
          formatted.push({ role, parts: [{ text: msg.text }] });
        }
      }
    }

    // Append current prompt
    if (formatted.length > 0 && formatted[formatted.length - 1].role === "user") {
      formatted[formatted.length - 1].parts[0].text += `\n${prompt}`;
    } else {
      formatted.push({ role: "user", parts: [{ text: prompt }] });
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
    try {
      const { prompt, topic, skillLevel, history } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          response: `Simulated Quantum AI Tutor - ${skillLevel || "Beginner"} Mode\n\nGreat question regarding ${topic || "Quantum Computing"}! Here is a step-by-step breakdown:\n\n1. Core Concept: Quantum states exist in Hilbert space where superposition allows linear combinations of |0⟩ and |1⟩.\n2. Intuition: Unlike classical bits (0 OR 1), a qubit is represented by a unit vector on the Bloch sphere defined by θ and φ angles.\n3. Practical Application: Gates like Hadamard (H) create equal superposition (|0⟩ + |1⟩)/√2.\n\nPro-tip: Open the Bloch Sphere visualizer in QuantumVerse to rotate the state vector and see this in action!`,
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
- Do NOT output raw markdown header symbols like ## ** or ### or markdown bold symbols. Present text cleanly in readable prose with clear paragraph breaks, bullet points, and numbered lists.`;

      const contents = buildGeminiContents(prompt || "Explain quantum computing fundamentals", history);

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
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
        response: `Quantum AI Tutor Note: Superposition allows qubits to represent multiple states simultaneously (|ψ⟩ = α|0⟩ + β|1⟩) until measurement collapses the wavefunction. Try exploring the Bloch Sphere or Circuit Builder for visual proof!`,
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
          temperature: 0.6,
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
