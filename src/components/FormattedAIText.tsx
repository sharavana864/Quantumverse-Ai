import React from "react";

interface FormattedAITextProps {
  content: string;
  className?: string;
  isDark?: boolean;
}

export const cleanRawMarkdown = (text: string): string => {
  if (!text) return "";
  let cleaned = text;

  // Replace escaped literal \n strings with real newlines
  cleaned = cleaned.replace(/\\n/g, "\n");

  // Remove trailing or leading ## ** combinations or standalone ## / ###
  cleaned = cleaned.replace(/#{1,6}\s*\*{1,2}\s*/g, ""); // removes "## **" or "### **"
  cleaned = cleaned.replace(/\*{1,2}\s*#{1,6}/g, ""); // removes "** ##"
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, ""); // removes leading "# ", "## ", "### "

  return cleaned;
};

export const FormattedAIText: React.FC<FormattedAITextProps> = ({
  content,
  className = "",
  isDark = true,
}) => {
  if (!content) return null;

  // Process text line by line / block by block
  const rawCleaned = cleanRawMarkdown(content);
  const lines = rawCleaned.split("\n");

  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = "";

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Code block toggle
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        renderedElements.push(
          <div
            key={`code-${index}`}
            className={`my-3 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto border ${
              isDark
                ? "bg-[#0A0A0A] border-white/10 text-[#A3FF00]"
                : "bg-slate-900 border-slate-700 text-[#00B894]"
            }`}
          >
            {codeLang && (
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                {codeLang}
              </div>
            )}
            <pre className="whitespace-pre">{codeBuffer.join("\n")}</pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
        codeLang = trimmed.replace("```", "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Blank lines
    if (!trimmed) {
      renderedElements.push(<div key={`blank-${index}`} className="h-1.5" />);
      return;
    }

    // Clean up bold asterisks from line
    const renderInlineText = (text: string) => {
      // Split by ** or * to render bold parts without asterisks showing
      const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          const inner = part.slice(2, -2);
          return (
            <strong
              key={pIdx}
              className={`font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {inner}
            </strong>
          );
        } else if (
          part.startsWith("*") &&
          part.endsWith("*") &&
          part.length > 2 &&
          !part.startsWith("**")
        ) {
          const inner = part.slice(1, -1);
          return (
            <em key={pIdx} className="italic text-gray-300">
              {inner}
            </em>
          );
        }
        return part.replace(/\*\*/g, "").replace(/\*/g, "");
      });
    };

    // Bullet points (e.g. - item, * item, • item, 1. item)
    const bulletMatch = trimmed.match(/^([-*•]|\d+\.)\s+(.*)$/);
    if (bulletMatch) {
      const prefix = bulletMatch[1];
      const body = bulletMatch[2];

      renderedElements.push(
        <div
          key={`bullet-${index}`}
          className="flex items-start space-x-2 my-1 pl-1"
        >
          <span
            className={`font-bold shrink-0 mt-0.5 ${
              isDark ? "text-[#A3FF00]" : "text-[#00B894]"
            }`}
          >
            {prefix.includes(".") ? prefix : "•"}
          </span>
          <div className="flex-1 leading-relaxed">
            {renderInlineText(body)}
          </div>
        </div>
      );
      return;
    }

    // Heading-like lines (short, capitalized, or ends with colon)
    const isHeading =
      (trimmed.length < 60 && trimmed.endsWith(":")) ||
      trimmed.match(/^(Phase \d|Step \d|Core Concept|Overview|Summary|Recommendation|Key Takeaways|Note)/i);

    if (isHeading) {
      renderedElements.push(
        <h4
          key={`heading-${index}`}
          className={`font-extrabold text-xs uppercase tracking-wider mt-3 mb-1 ${
            isDark ? "text-[#A3FF00]" : "text-[#00B894]"
          }`}
        >
          {renderInlineText(trimmed)}
        </h4>
      );
      return;
    }

    // Regular paragraph line
    renderedElements.push(
      <p key={`p-${index}`} className="leading-relaxed my-0.5">
        {renderInlineText(line)}
      </p>
    );
  });

  // Handle unterminated code block safely
  if (inCodeBlock && codeBuffer.length > 0) {
    renderedElements.push(
      <div
        key="code-unterminated"
        className={`my-3 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto border ${
          isDark
            ? "bg-[#0A0A0A] border-white/10 text-[#A3FF00]"
            : "bg-slate-900 border-slate-700 text-[#00B894]"
        }`}
      >
        <pre className="whitespace-pre">{codeBuffer.join("\n")}</pre>
      </div>
    );
  }

  return <div className={`space-y-1 ${className}`}>{renderedElements}</div>;
};

export default FormattedAIText;
