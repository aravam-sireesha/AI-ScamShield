import React, { useState } from "react";
import { useScanner } from "../hooks/useScanner";
import { 
  Briefcase, 
  AlertTriangle,
  FolderLock,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function JobScanner() {
  const [jobText, setJobText] = useState("");
  const { jobScanMutation } = useScanner();

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobText.trim()) return;
    jobScanMutation.mutate(jobText);
  };

  const result = jobScanMutation.data;
  const isPending = jobScanMutation.isPending;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">Recruitment Fraud Vetting Engine</h1>
        <p className="text-slate-400 text-sm mt-1">
          Verify job offers, contractual parameters, and recruiter descriptions for fraud signals and deposit traps.
        </p>
      </div>

      {/* Input section */}
      <div className="glass-panel p-6 rounded-xl border border-slate-800">
        <form onSubmit={handleScan} className="space-y-4">
          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Job Posting Description or Message Thread
          </label>
          <textarea
            placeholder="e.g. Work From Home opportunity. No experience needed. Earn up to $500/day. We will send you a check to purchase office supplies. You must pay $150 training fee upfront via Venmo..."
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-white placeholder-slate-700 min-h-[160px] focus:outline-none focus:border-cyan-500 transition-colors font-mono leading-relaxed"
            disabled={isPending}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending || !jobText.trim()}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <span>{isPending ? "RUNNING NLP CORRELATORS..." : "VET RECRUITMENT OFFER"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
              <Briefcase className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Analyzing Recruitment Signals</h3>
              <p className="text-xs text-slate-500 font-mono">Verifying payment requests, communication channels, and check-cashing clauses...</p>
            </div>
          </motion.div>
        )}

        {!isPending && result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Risk Card */}
            <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Fraud Index</h3>
                
                <div className="flex flex-col items-center py-4">
                  <div className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center ${
                    result.risk_score > 60 ? "text-rose-500 border-rose-500 bg-rose-500/10" : "text-emerald-500 border-emerald-500 bg-emerald-500/10"
                  }`}>
                    <span className="text-3xl font-extrabold">{result.risk_score}%</span>
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider opacity-75">Risk Score</span>
                  </div>
                  
                  <p className="text-xs text-center mt-6 text-slate-200 font-bold uppercase tracking-wider">
                    {result.risk_score > 60 ? "HIGH CRITICAL FRAUD PROFILE" : "VETTING COMPLETED"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Model confidence</span>
                  <span className="text-slate-200 font-mono">{(result.confidence_score * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Class</span>
                  <span className="text-rose-400 font-mono font-bold">{result.risk_score > 60 ? "Advance Fee Fraud" : "Genuine Offer"}</span>
                </div>
              </div>
            </div>

            {/* AI Explanation & Indicator Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <FolderLock className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">AI Recruiting Signature</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400 font-mono bg-slate-950/60 p-4 rounded border border-slate-900">
                  {result.ai_analysis.summary}
                </p>
              </div>

              {/* Indicators */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-cyan-400" />
                  <span>Verified Scam Indicators</span>
                </h3>
                
                <div className="space-y-3 pt-2">
                  {result.ai_analysis.indicators.map((indicator: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-xs text-slate-300 font-mono bg-slate-950/40 px-4 py-3 rounded-lg border border-slate-900">
                      <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span>{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JobScanner;