import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Shield, 
  LayoutDashboard, 
  Link2, 
  Mail, 
  Briefcase, 
  Video, 
  Radio, 
  BarChart3, 
  FileText,
  ExternalLink 
} from "lucide-react";

function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
    { to: "/url", label: "URL Scan Engine", icon: Link2 },
    { to: "/email", label: "Email Analyzer", icon: Mail },
    { to: "/job", label: "Job Post Vetting", icon: Briefcase },
    { to: "/deepfake", label: "Deepfake Detection", icon: Video },
    { to: "/threat-intel", label: "Threat Intel (SOC)", icon: Radio },
    { to: "/analytics", label: "Analytics & Metrics", icon: BarChart3 },
    { to: "/reports", label: "Investigation Reports", icon: FileText },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800/80 flex flex-col fixed left-0 top-0 z-50">
      {/* Brand Header */}
      <div className="h-16 border-b border-slate-800 flex items-center px-6 gap-3">
        <div className="p-2 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400">
          <Shield className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase">ScamShield</h2>
          <span className="text-[10px] font-mono text-cyan-400 tracking-widest">ENTERPRISE AI</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive 
                    ? "bg-cyan-950/60 text-cyan-400 border-l-2 border-cyan-400 font-semibold" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer Branding / External Link */}
      <div className="p-4 border-t border-slate-800/80">
        <NavLink 
          to="/" 
          className="flex items-center justify-between px-4 py-3 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </span>
          <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 uppercase font-mono">v1.1</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;