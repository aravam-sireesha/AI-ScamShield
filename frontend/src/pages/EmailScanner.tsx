import React, { useState } from "react";
import { useScanner } from "../hooks/useScanner";
import { 
  Mail, 
  FileWarning, 
  CornerDownRight, 
  AlertOctagon,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function EmailScanner() {
  const [emailText, setEmailText] = useState("");
  const { emailScanMutation } = useScanner();

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailText.trim()) return;
    emailScanMutation.mutate(emailText);
  };

  const result = emailScanMutation.data;
  const isPending = emailScanMutation.isPending;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">Social Engineering & Email Analyzer</h1>
        <p className="text-slate-400 text-sm mt-1">
          Paste email headers and content to analyze linguistic pressure, fraud patterns, and sender anomalies.
        </p>
      </div>

      {/* Input section */}
      <div className="glass-panel p-6 rounded-xl border border-slate-800">
        <form onSubmit={handleScan} className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Paste Complete Email Content
            </label>
            <span className="text-[10px] text-slate-500 font-mono">Supports raw SMTP copy/paste</span>
          </div>

          <textarea
            placeholder="e.g. From: ceo@yourcompany-inc.com&#10;Subject: URGENT: Wire Transfer Authorization Required Today&#10;&#10;Please authorize an immediate invoice payment of $42,500 to our vendor offshore..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-white placeholder-slate-700 min-h-[160px] focus:outline-none focus:border-cyan-500 transition-colors font-mono leading-relaxed"
            disabled={isPending}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending || !emailText.trim()}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <span>{isPending ? "RUNNING NLP MODELS..." : "ANALYZE CORRESPONDENCE"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-12 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <Mail className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluating Semantic & Urgent Tone</h3>
              <p className="text-xs text-slate-500 font-mono">Scanning layout vectors, linguistic authority indicators, and spoofing headers...</p>
            </div>
          </motion.div>
        )}

        {!isPending && result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Risk Index */}
            <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Coercion Metrics</h3>
                
                <div className="flex flex-col items-center py-4">
                  <div className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center ${
                    result.risk_score > 70 ? "text-rose-500 border-rose-500 bg-rose-500/10" : "text-emerald-500 border-emerald-500 bg-emerald-500/10"
                  }`}>
                    <span className="text-3xl font-extrabold">{result.risk_score}%</span>
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider opacity-75">Scam Score</span>
                  </div>
                  
                  <p className="text-xs text-center mt-6 text-slate-200 font-bold uppercase tracking-wider">
                    {result.risk_score > 70 ? "HIGH CONFIDENCE SOCIAL ENG" : "CLEAN DICTION VETTED"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Model confidence</span>
                  <span className="text-slate-200 font-mono">{(result.confidence_score * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Tone Class</span>
                  <span className="text-orange-400 font-mono font-bold">Urgent Pressure</span>
                </div>
              </div>
            </div>

            {/* Explanation & Action Playbook */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Findings */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">AI Linguistic Analysis</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400 font-mono bg-slate-950/60 p-4 rounded border border-slate-900">
                  {result.ai_analysis.summary}
                </p>
              </div>

              {/* Indicators */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-cyan-400" />
                  <span>Flagged Linguistic Indicators</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {result.ai_analysis.indicators.map((indicator: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-300 font-mono bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                      <CornerDownRight className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* suggested action */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 bg-rose-950/10 border-rose-500/20 space-y-3">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs">
                  <AlertOctagon className="w-4 h-4" />
                  <span>SecOps Playbook Instructions</span>
                </div>
                <p className="text-xs leading-relaxed text-rose-200 font-mono">
                  {result.ai_analysis.suggested_action}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EmailScanner;