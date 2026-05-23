import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, Sliders, Server, Cpu, Globe, RefreshCw, Download, CheckCircle, AlertTriangle } from 'lucide-react';

interface ServerNode {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  ip: string;
  load: number;
}

export default function DashboardSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [trafficScale, setTrafficScale] = useState(65);
  const [cpuLoad, setCpuLoad] = useState(24);
  const [memoryUsed, setMemoryUsed] = useState(4.2);
  const [latency, setLatency] = useState(12);
  const [testMode, setTestMode] = useState(false);
  const [nodes, setNodes] = useState<ServerNode[]>([
    { id: 'web', name: 'APX Edge Web Gateway', status: 'online', ip: '192.168.1.10', load: 38 },
    { id: 'api', name: 'APX GraphQL Core Router', status: 'online', ip: '10.0.4.15', load: 52 },
    { id: 'db', name: 'APX Cluster DB Sync Pool', status: 'online', ip: '10.0.12.80', load: 18 },
    { id: 'cdn', name: 'APX Image Compression CDN', status: 'online', ip: '142.250.72.4', load: 45 }
  ]);
  const [dataPoints, setDataPoints] = useState<number[]>([30, 42, 38, 48, 55, 48, 62, 59, 65, 70, 68, 72, 75]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulation updating loop
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        // Base math on trafficScale
        const targetCpu = Math.min(100, Math.max(10, Math.floor(trafficScale + (Math.random() * 20 - 10))));
        setCpuLoad(prev => prev + (targetCpu - prev) * 0.2);
        setMemoryUsed(prev => {
          const shift = (Math.random() * 0.4 - 0.2);
          return Math.min(15.8, Math.max(2.1, parseFloat((prev + shift).toFixed(2))));
        });
        setLatency(prev => {
          const baseLatency = Math.floor(8 + (trafficScale * 0.3));
          const jitter = Math.floor(Math.random() * 6 - 3);
          return Math.max(1, baseLatency + jitter);
        });

        // Update random node load
        setNodes(prev => prev.map(node => {
          if (node.status === 'offline') return node;
          const delta = Math.floor(Math.random() * 12 - 6);
          const newLoad = Math.min(99, Math.max(5, node.load + delta));
          let status = node.status;
          if (newLoad > 85) status = 'warning';
          else if (newLoad < 80) status = 'online';
          return { ...node, load: newLoad, status };
        }));

        // Advance line chart values
        setDataPoints(prev => {
          const slice = prev.slice(1);
          const nextVal = Math.min(100, Math.max(5, Math.floor(trafficScale + (Math.random() * 16 - 8))));
          return [...slice, nextVal];
        });
      }, 800);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, trafficScale]);

  const toggleNode = (id: string) => {
    setNodes(prev => prev.map(node => {
      if (node.id === id) {
        const nextStatus = node.status === 'offline' ? 'online' : 'offline';
        return { ...node, status: nextStatus, load: nextStatus === 'offline' ? 0 : 35 };
      }
      return node;
    }));
  };

  const triggerStressTest = () => {
    if (testMode) return;
    setTestMode(true);
    setIsPlaying(true);
    setTrafficScale(95);
    
    // Simulate high load for 3 seconds then restore
    setTimeout(() => {
      setTrafficScale(45);
      setTestMode(false);
    }, 4000);
  };

  const downloadDiagnosticsFile = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      developer: "Navod Caldera Portfolio Tester",
      systemHealth: "Optimal",
      metrics: {
        cpuLoadPercent: cpuLoad.toFixed(1),
        memoryGb: memoryUsed,
        averageLatencyMs: latency,
        trafficIntensityPercent: trafficScale
      },
      nodes: nodes.map(n => ({
        host: n.name,
        ipAddress: n.ip,
        nodeStatus: n.status,
        cpuUsage: n.load
      }))
    };

    const fileContents = JSON.stringify(reportData, null, 2);
    const blob = new Blob([fileContents], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `navod-system-diagnostics-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#081b29]/60 border border-[#00abf0]/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-[#00abf0]/40 transition-colors duration-300 shadow-2xl">
      {/* Decorative top grid bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00abf0] via-[#ff007f] to-[#00abf0]" />

      {/* Header section with toggle play/pause */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
            <span className="text-white font-display font-semibold text-lg">Active Dashboard Simulation</span>
          </div>
          <p className="text-xs text-gray-400 font-sans">
            Created by Navod with high-fidelity React state binding and synthetic local metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 bg-[#081b29] border border-gray-700 hover:border-[#00abf0] rounded-lg transition-colors cursor-pointer focus:outline-none"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-yellow-500" />
                <span>Pause Sim</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#00abf0]" />
                <span>Resume Sim</span>
              </>
            )}
          </button>

          <button
            onClick={downloadDiagnosticsFile}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-black bg-[#00abf0] hover:bg-[#0081b5] rounded-lg font-semibold transition-all cursor-pointer focus:outline-none"
            title="Download local diagnostic JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Status metrics bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#081b29]/80 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2.5 bg-[#00abf0]/10 border border-[#00abf0]/20 rounded-lg">
            <Cpu className="w-5 h-5 text-[#00abf0]" />
          </div>
          <div>
            <div className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">CPU Load</div>
            <div className="text-white font-mono font-bold text-lg">{cpuLoad.toFixed(1)}%</div>
          </div>
        </div>

        <div className="bg-[#081b29]/80 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2.5 bg-[#ff007f]/10 border border-[#ff007f]/20 rounded-lg">
            <Server className="w-5 h-5 text-[#ff007f]" />
          </div>
          <div>
            <div className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Memory Used</div>
            <div className="text-white font-mono font-bold text-lg">{memoryUsed} GB</div>
          </div>
        </div>

        <div className="bg-[#081b29]/80 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <Globe className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <div className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Sim Latency</div>
            <div className="text-white font-mono font-bold text-lg">{latency} ms</div>
          </div>
        </div>

        <div className="bg-[#081b29]/80 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg">
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <div className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Pipeline State</div>
            <div className="text-white font-mono font-bold text-lg">ONLINE</div>
          </div>
        </div>
      </div>

      {/* Grid content split: Plot on Left, Interactive Node Management on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dynamic Vector Line Plot (7 Columns) */}
        <div className="lg:col-span-7 bg-[#081b29] border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-gray-300 font-display flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#00abf0] animate-pulse" />
              <span>Network Traffic Curve (Data Stream Rate)</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">Live updates</span>
          </div>

          {/* SVG Sparkline Curve */}
          <div className="h-44 w-full relative group">
            {/* Background grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full border-t border-dashed border-gray-600" />
              <div className="w-full border-t border-dashed border-gray-600" />
              <div className="w-full border-t border-dashed border-gray-600" />
              <div className="w-full border-t border-dashed border-gray-600" />
            </div>

            {/* Dynamic Polyline */}
            <svg viewBox="0 0 120 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="glow-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00abf0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00abf0" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Fill area */}
              <polygon
                points={`0,40 ${dataPoints.map((val, idx) => `${idx * 10},${40 - (val * 0.35)}`).join(' ')} 120,40`}
                fill="url(#glow-grad)"
              />
              {/* Stroke */}
              <polyline
                fill="none"
                stroke="#00abf0"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={dataPoints.map((val, idx) => `${idx * 10},${40 - (val * 0.35)}`).join(' ')}
                className="transition-all duration-300"
              />
              {/* Pulse at latest point */}
              <circle
                cx="120"
                cy={40 - (dataPoints[dataPoints.length - 1] * 0.35)}
                r="1"
                fill="#00abf0"
                className="animate-ping"
              />
            </svg>
          </div>

          <div className="flex justify-between items-center mt-3 text-[10px] text-gray-500 font-mono">
            <span>T-12s</span>
            <span>T-6s</span>
            <span>Current Stream ({dataPoints[dataPoints.length - 1]} Mbps)</span>
          </div>
        </div>

        {/* Controllers and Server Nodes (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#081b29] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-[#ff007f]" />
              <span className="text-xs font-semibold text-gray-300 font-display">System Controls</span>
            </div>

            {/* Traffic Slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5 font-sans">
                <span>Configure Input Stream Stress</span>
                <span className="text-[#00abf0] font-mono font-bold">{trafficScale}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={trafficScale}
                onChange={(e) => setTrafficScale(Number(e.target.value))}
                className="w-full h-1.5 bg-[#081b29] border border-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00abf0]"
              />
            </div>

            {/* Action buttons */}
            <button
              onClick={triggerStressTest}
              className={`w-full py-2 rounded-lg text-xs font-semibold tracking-wider font-sans uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                testMode
                  ? 'bg-[#ff007f]/20 border border-[#ff007f] text-[#ff007f] animate-pulse'
                  : 'bg-transparent border border-[#00abf0] text-[#00abf0] hover:bg-[#00abf0]/10'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{testMode ? 'Stress Testing...' : 'Inject Stress Spike'}</span>
            </button>
          </div>

          {/* Connected Gateway Nodes */}
          <div className="bg-[#081b29] border border-gray-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-gray-300 font-display block mb-3">
              Server Clustered Node Toggles
            </span>

            <div className="space-y-2">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => toggleNode(node.id)}
                  className="flex items-center justify-between p-2 rounded-lg border border-gray-800 hover:border-gray-700 bg-[#081b29]/50 hover:bg-[#081b29] transition-all cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'online'
                          ? 'bg-green-500 shadow-[0_0_8px_#10b981]'
                          : node.status === 'warning'
                          ? 'bg-yellow-500 shadow-[0_0_8px_#f59e0b]'
                          : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-medium text-white">{node.name}</div>
                      <div className="text-[9px] text-gray-500 font-mono">{node.ip}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-gray-400 block">
                      {node.status === 'offline' ? '0' : node.load}% CPU
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-gray-500 font-semibold block">
                      {node.status === 'offline' ? 'Offline' : 'Active'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
