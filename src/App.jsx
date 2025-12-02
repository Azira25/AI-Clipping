import React, { useState } from 'react';
import { Scissors, BarChart2, Download, Clock, Share2, Youtube, Loader2, Sparkles, CheckCircle, Github, Hash, FileText, Star, AlertTriangle, MonitorPlay } from 'lucide-react';

// KONFIGURASI URL BACKEND
// Ganti dengan URL Hugging Face Anda jika sudah deploy. Jangan ada slash '/' di akhir.
const API_URL = 'http://localhost:7860'; 

const App = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  
  // State Data - Inisialisasi dengan Array Kosong [] agar tidak crash saat .map()
  const [clips, setClips] = useState([]);
  const [activeClip, setActiveClip] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [category, setCategory] = useState('business');

  const extractVideoId = (inputUrl) => {
    try {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    } catch (e) {
        return null;
    }
  };

  const handleAnalyze = async () => {
    const id = extractVideoId(url);
    if (!id) {
      setErrorMsg("Mohon masukkan URL YouTube yang valid.");
      return;
    }

    // Reset State Sebelum Mulai
    setVideoId(id);
    setIsAnalyzing(true);
    setClips([]); // Penting: Kosongkan klip lama
    setActiveClip(null);
    setErrorMsg('');
    setProgress(10);
    setAnalysisStep('Menghubungkan ke Multi-Engine AI...');

    try {
      console.log(`Mengirim request ke: ${API_URL}/analyze`);
      
      // Timeout Promise (Agar tidak loading selamanya jika server hang)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 Menit timeout (karena proses video panjang)

      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url, category: category }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      setProgress(60);
      setAnalysisStep('Menerima Data...');

      // Cek Status HTTP
      if (!response.ok) {
        const errText = await response.text();
        let errJson;
        try { errJson = JSON.parse(errText); } catch(e) {}
        
        throw new Error(errJson?.error || `Gagal menganalisa (Status: ${response.status}). Cek server logs.`);
      }

      const data = await response.json();
      
      // --- DEFENSIVE PROGRAMMING (ANTI-CRASH) ---
      // Cek apakah data benar-benar Array?
      if (!Array.isArray(data)) {
          console.error("Format Data Salah:", data);
          // Jika backend mengembalikan object error tapi status 200
          if (data.error) throw new Error(data.error);
          throw new Error("Format respon server tidak valid (Bukan Array Klip).");
      }

      if (data.length === 0) {
        throw new Error("AI tidak menemukan momen menarik (List Kosong). Coba video lain.");
      }

      setProgress(100);
      setClips(data);
      setActiveClip(data[0]);

    } catch (err) {
      console.error("Error Detail:", err);
      if (err.name === 'AbortError') {
          setErrorMsg("Waktu habis! Video terlalu panjang atau server sibuk.");
      } else if (err.message.includes("Failed to fetch")) {
          setErrorMsg("Gagal terhubung ke Server. Pastikan Backend (server.py) sudah jalan di port 7860.");
      } else {
          setErrorMsg(err.message);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const getScoreColor = (score) => {
    if (score >= 9.0) return "text-green-400 bg-green-400/10 border-green-400/20";
    if (score >= 8.0) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              AutoClip Pro
            </span>
          </div>
          <div className="flex gap-4 text-sm text-slate-400 items-center">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs">
                <div className={`w-2 h-2 rounded-full ${API_URL.includes('localhost') ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
                {API_URL.includes('localhost') ? 'Localhost' : 'Cloud API'}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Input Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Video Clipper <br/>
            <span className="text-purple-400">Multi-Engine Intelligence</span>
          </h1>
          <p className="text-slate-400 mb-8">
            Menganalisa video panjang menggunakan <strong>Gemini, ChatGPT, & Claude</strong> untuk menemukan momen viral secara otomatis.
          </p>

          <div className="flex flex-col gap-4">
            {/* Category Selector */}
            <div className="flex justify-center gap-2 mb-2 flex-wrap">
                {['business', 'gaming', 'podcast', 'cooking'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize border ${
                            category === cat 
                            ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25' 
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                        }`}
                    >
                        {cat === 'business' ? '💼 Bisnis' : 
                         cat === 'gaming' ? '🎮 Gaming' : 
                         cat === 'podcast' ? '🎙️ Podcast' : '🍳 Masak'}
                    </button>
                ))}
            </div>

            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative flex items-center bg-slate-900 rounded-xl p-2 border border-slate-700 shadow-2xl">
                <div className="pl-3 pr-2 text-slate-400">
                    <Youtube className="w-6 h-6" />
                </div>
                <input
                    type="text"
                    placeholder={`Tempel link YouTube di sini...`}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 py-2"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isAnalyzing}
                />
                <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !url}
                    className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    isAnalyzing 
                        ? 'bg-slate-800 text-slate-400 cursor-wait' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    }`}
                >
                    {isAnalyzing ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    {isAnalyzing ? 'Proses...' : 'Analisa'}
                </button>
                </div>
            </div>
            
            {/* Error Message Display */}
            {errorMsg && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-red-950/30 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-start gap-3 text-sm text-left mx-auto max-w-lg mt-4 shadow-lg shadow-red-900/10">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                    <div>
                        <p className="font-bold text-red-400 mb-1">Gagal Menganalisa</p>
                        <p>{errorMsg}</p>
                        <div className="mt-3 text-xs opacity-70 border-t border-red-800/50 pt-2">
                           <strong>Tips Troubleshooting:</strong>
                           <ul className="list-disc list-inside mt-1 space-y-1">
                               <li>Pastikan Backend (server.py) sedang RUNNING.</li>
                               <li>Pastikan URL YouTube valid dan publik.</li>
                               <li>Cek koneksi internet Anda.</li>
                           </ul>
                        </div>
                    </div>
                </div>
            )}

          </div>
        </div>

        {/* Loading State */}
        {isAnalyzing && !errorMsg && (
          <div className="max-w-2xl mx-auto mb-12 bg-slate-900/50 rounded-xl p-8 border border-slate-700/50 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                <div 
                    className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-pulse transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-2">Sedang Menganalisa Video...</h3>
            <p className="text-slate-400 mb-2 text-sm flex items-center justify-center gap-2">
               <MonitorPlay className="w-4 h-4 text-blue-400" />
               {analysisStep}
            </p>
            <p className="text-xs text-slate-500">Estimasi waktu: 30-60 detik bergantung durasi video.</p>
          </div>
        )}

        {/* Results Section */}
        {clips.length > 0 && !isAnalyzing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            
            {/* Left: Player & Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video ring-1 ring-slate-700/50">
                {activeClip ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?start=${Math.floor(activeClip.start)}&end=${Math.floor(activeClip.end)}&autoplay=1&rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                    <Youtube className="w-16 h-16 opacity-20" />
                    <p>Pilih klip di sebelah kanan untuk memutar</p>
                  </div>
                )}
              </div>

              {activeClip && (
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getScoreColor(activeClip.score)}`}>
                          Skor Viral: {activeClip.score}
                        </span>
                        <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-xs border border-slate-700 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {Math.floor(activeClip.end - activeClip.start)}s
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-3 leading-tight text-white">{activeClip.title}</h2>
                      <div className="flex flex-wrap gap-2">
                        {activeClip.hashtags?.map((tag, idx) => (
                            <span key={idx} className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                                {tag}
                            </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition border border-slate-700" title="Copy Title">
                            <Share2 className="w-5 h-5 text-slate-400" />
                        </button>
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium flex items-center gap-2 transition text-sm shadow-lg shadow-purple-500/20">
                            <Download className="w-4 h-4" />
                            Download MP4
                        </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <FileText className="w-3 h-3 text-blue-400"/> Analisa Konten
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {activeClip.description}
                        </p>
                    </div>

                    <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-yellow-400"/> Kenapa Viral?
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {activeClip.reason}
                        </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Clips List */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col h-[700px] shadow-xl">
              <div className="p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 rounded-t-xl z-10 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-purple-400" />
                  Hasil Analisa
                </h3>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">
                    {clips.length} Klip Ditemukan
                </span>
              </div>
              
              <div className="overflow-y-auto flex-1 p-3 space-y-3 custom-scrollbar">
                {clips.map((clip, idx) => (
                  <div 
                    key={clip.id || idx} // Fallback key jika ID duplicate/null
                    onClick={() => setActiveClip(clip)}
                    className={`p-3 rounded-lg cursor-pointer transition-all border group relative ${
                      activeClip === clip // Cek referensi object langsung lebih aman
                        ? 'bg-slate-800 border-purple-500 ring-1 ring-purple-500/50 shadow-lg shadow-purple-900/20' 
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <span className="font-semibold text-sm line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors text-slate-200">
                        {clip.title}
                      </span>
                      <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded border ${getScoreColor(clip.score)}`}>
                        {clip.score}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        <Clock className="w-3 h-3" />
                        {formatTime(clip.start)} - {formatTime(clip.end)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default App;
