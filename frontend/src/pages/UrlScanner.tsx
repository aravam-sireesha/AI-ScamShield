import React, { useState } from "react";
import { useScanner } from "../hooks/useScanner";
import { 
  Link2, 
  ShieldAlert, 
  CheckCircle, 
  Compass, 
  Fingerprint, 
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function UrlScanner() {
  const [url, setUrl] = useState("");
  const { urlScanMutation } = useScanner();

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    urlScanMutation.mutate(url);
  };

  const getRiskColor = (score: number) => {
    if (score > 75) return "text-rose-500 border-rose-500 bg-rose-500/10";
    if (score > 40) return "text-orange-500 border-orange-500 bg-orange-500/10";
    return "text-emerald-500 border-emerald-500 bg-emerald-500/10";
  };

  const result = urlScanMutation.data;
  const isPending = urlScanMutation.isPending;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">URL Deep Scan Engine</h1>
        <p className="text-slate-400 text-sm mt-1">
          Perform a deep reputation scan, structural analysis, and AI model entropy analysis on any URI target.
        </p>
      </div>

      {/* Search Bar Input */}
      <div className="glass-panel p-6 rounded-xl border border-slate-800">
        <form onSubmit={handleScan} className="space-y-4">
          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Enter Target URI / Domain Path
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="e.g. http://chase-update-verification.secured-auth-portal.com/login"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                disabled={isPending}
              />
            </div>
            <button
              type="submit"
              disabled={isPending || !url.trim()}
              className="px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <span>{isPending ? "SCANNING TARGET..." : "INITIATE SCAN"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Main Results Panel */}
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
              <Compass className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Analyzing URI Entropy & DNS Signature</h3>
              <p className="text-xs text-slate-500 font-mono">Running feature extractions: SSL matching, subdomain counts, keyword models...</p>
            </div>
          </motion.div>
        )}

        {!isPending && result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Risk Index Block */}
            <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-6">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Threat Appraisal</h3>
              
              <div className="flex flex-col items-center py-6">
                <div className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center ${getRiskColor(result.risk_score)}`}>
                  <span className="text-3xl font-extrabold">{result.risk_score}%</span>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider opacity-75">Risk Index</span>
                </div>

                <p className="text-xs text-center mt-6 text-slate-300 font-bold uppercase tracking-wider">
                  {result.risk_score > 75 ? "CRITICAL MALICIOUS SIGNAL" : result.risk_score > 40 ? "SUSPICIOUS VECTOR" : "APPROVED CLEAN"}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">Confidence Score: {result.confidence_score}</p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">DNS Registered</span>
                  <span className="text-slate-200 font-mono">24h ago (New)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">SSL status</span>
                  <span className="text-rose-500 font-mono">Unverified (Self-signed)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Alexa Reputation</span>
                  <span className="text-slate-200 font-mono">Unranked</span>
                </div>
              </div>
            </div>

            {/* Model Explainability Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Block */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  {result.risk_score > 50 ? (
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                  <h3 className="text-sm font-bold text-white">AI Verdict & Analysis Findings</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400 font-mono bg-slate-950/60 p-4 rounded border border-slate-900">
                  {result.ai_analysis.summary}
                </p>
              </div>

              {/* SHAP Indicators Block */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-cyan-400" />
                  <span>SHAP Model Contribution Breakdown</span>
                </h3>
                
                <div className="space-y-4 pt-2">
                  {Object.entries(result.ai_analysis.shap_values).map(([feature, weight]: [string, number]) => {
                    const isPositive = weight > 0;
                    const percent = Math.min(Math.abs(weight) * 100, 100);
                    return (
                      <div key={feature} className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-400 capitalize">{feature.replace(/_/g, ' ')}</span>
                          <span className={isPositive ? "text-rose-400" : "text-emerald-400"}>
                            {isPositive ? `+${weight.toFixed(2)} (Highers Risk)` : `${weight.toFixed(2)} (Lowers Risk)`}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded overflow-hidden">
                          <div 
                            className={`h-full rounded ${isPositive ? "bg-rose-500" : "bg-emerald-500"}`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UrlScanner;