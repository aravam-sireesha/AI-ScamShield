import React, { useState, useRef } from "react";
import { useScanner } from "../hooks/useScanner";
import { 
  AudioLines, 
  UploadCloud, 
  Sparkles,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function DeepfakeScanner() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { deepfakeScanMutation } = useScanner();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    deepfakeScanMutation.mutate({
      name: file.name,
      type: file.type.includes("audio") ? "audio" as const : "video" as const,
      size: file.size
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Demo files trigger
  const handleDemoTrigger = (demoName: string, type: 'audio' | 'video') => {
    setSelectedFile({
      name: demoName,
      type,
      size: 1048576 * (type === 'video' ? 12 : 2)
    });
    deepfakeScanMutation.mutate({
      name: demoName,
      type,
      size: 1048576 * (type === 'video' ? 12 : 2)
    });
  };

  const result = deepfakeScanMutation.data;
  const isPending = deepfakeScanMutation.isPending;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">Synthetic Media & Deepfake Detection</h1>
        <p className="text-slate-400 text-sm mt-1">
          Upload audio voicemails or video interviews to evaluate speech frequency anomalies and facial mesh vector synthetic alignment.
        </p>
      </div>

      {/* Upload Box */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`glass-panel p-10 rounded-xl border text-center relative transition-all ${
          dragActive ? "border-cyan-400 bg-cyan-950/15" : "border-slate-800"
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept="audio/*,video/*"
          className="hidden" 
          onChange={handleFileChange}
          disabled={isPending}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-slate-800 rounded-full border border-slate-700/80 text-cyan-400">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Drag & Drop media file here, or click to browse</p>
            <p className="text-[10px] text-slate-500 font-mono mt-1">Supports WAV, MP3, MP4, MOV (Max size 50MB)</p>
          </div>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
            className="px-5 py-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Select Media File
          </button>
        </div>

        {/* Demo Fast Triggers */}
        <div className="border-t border-slate-900 mt-8 pt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-xs">
          <span className="text-slate-500 font-mono">Or quickly run evaluation simulations:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleDemoTrigger("cfo_wire_instruction_clone.wav", "audio")}
              disabled={isPending}
              className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded text-slate-300 font-mono text-[10px] transition-colors cursor-pointer"
            >
              📊 CFO Voice Clone (WAV)
            </button>
            <button
              onClick={() => handleDemoTrigger("ceo_press_briefing_mesh.mp4", "video")}
              disabled={isPending}
              className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded text-slate-300 font-mono text-[10px] transition-colors cursor-pointer"
            >
              🎥 CEO Video Deepfake (MP4)
            </button>
          </div>
        </div>
      </div>

      {/* Results view */}
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
              <AudioLines className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluating Spectral & Frame Vectors</h3>
              <p className="text-xs text-slate-500 font-mono">Running neural vocoder detection, visual coherence matching, and linear prediction analysis...</p>
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
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Synthetic Score</h3>
                
                <div className="flex flex-col items-center py-4">
                  <div className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center ${
                    result.risk_score > 60 ? "text-rose-500 border-rose-500 bg-rose-500/10" : "text-emerald-500 border-emerald-500 bg-emerald-500/10"
                  }`}>
                    <span className="text-3xl font-extrabold">{result.risk_score}%</span>
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider opacity-75">AI Confidence</span>
                  </div>
                  
                  <p className="text-xs text-center mt-6 text-slate-200 font-bold uppercase tracking-wider">
                    {result.risk_score > 60 ? "SYNTHETIC ARTIFACT DETECTED" : "ORGANIC BIOMETRICS SIGNATURE"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">File Analyzed</span>
                  <span className="text-slate-200 font-mono truncate max-w-[130px]">{result.filename}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Audio Codec</span>
                  <span className="text-slate-200 font-mono">PCM 24-bit</span>
                </div>
              </div>
            </div>

            {/* AI Diagnostics details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <h3 className="text-sm font-bold text-white">AI Forensic Diagnostics</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-400 font-mono bg-slate-950/60 p-4 rounded border border-slate-900">
                  {result.ai_analysis.summary}
                </p>
              </div>

              {/* Spectral metrics */}
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Spectral & Coherence Anomalies</span>
                </h3>
                
                <div className="space-y-4 pt-2 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-400">Neural Synthesizer Footprint:</span>
                    <span className={result.risk_score > 60 ? "text-rose-400 font-bold" : "text-emerald-400"}>
                      {result.risk_score > 60 ? "Match: ElevenLabs v2 (Auditory)" : "No Matches"}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-850 pb-2">
                    <span className="text-slate-400">Pitch Linear Prediction Error:</span>
                    <span className="text-slate-300">
                      {result.risk_score > 60 ? "High Variance (>8.4e-3)" : "Nominal (<1.2e-4)"}
                    </span>
                  </div>

                  <div className="flex justify-between pb-1">
                    <span className="text-slate-400">Spectral Anomalies Remarks:</span>
                    <span className="text-slate-300 max-w-sm text-right">
                      {result.ai_analysis.spectral_anomalies}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DeepfakeScanner;
