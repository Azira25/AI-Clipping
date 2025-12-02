import React, { useState, useRef } from 'react';
import { Scissors, BarChart2, Download, Clock, Share2, Youtube, Loader2, Sparkles, CheckCircle, Github, Hash, FileText, Star } from 'lucide-react';

const App = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [clips, setClips] = useState([]);
  const [activeClip, setActiveClip] = useState(null);

  // Fungsi untuk ekstrak ID YouTube dari URL
  const extractVideoId = (inputUrl) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = inputUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAnalyze = () => {
    const id = extractVideoId(url);
    if (!id) {
      alert("Mohon masukkan URL YouTube yang valid.");
      return;
    }

    setVideoId(id);
    setIsAnalyzing(true);
    setClips([]);
    setActiveClip(null);
    setProgress(0);

    // Simulasi Proses Analisis AI sesuai Persona "Expert Clipper"
    const steps = [
      "Menginisialisasi Persona: Tim Clipper Expert...",
      "Scanning durasi 60-180 detik per segmen...",
      "Menganalisis Hook & Retention Rate...",
      "Generate Deskripsi & Hashtag SEO...",
      "Menghitung Rating Viralitas (1-10)..."
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          generateExpertClips(id);
          setIsAnalyzing(false);
          return 100;
        }
        
        // Update teks langkah analisis
        if (prev % 20 === 0 && currentStep < steps.length) {
          setAnalysisStep(steps[currentStep]);
          currentStep++;
        }
        
        return prev + 1; // Sedikit lebih lambat biar terasa "mikir"
      });
    }, 80);
  };

  // Generate Klip dengan Logika Expert Clipper (Durasi 60-180s, Rating 1-10)
  const generateExpertClips = (vidId) => {
    const generatedClips = [
      { 
        id: 1, 
        title: "RAHASIA BISNIS: Cara Scale Up Tanpa Modal Besar (Wajib Tahu)", 
        start: 60, end: 185, // 125 detik
        score: 9.8, 
        description: "Strategi rahasia yang jarang dibongkar para mentor bisnis. Bagian ini menjelaskan mindset bootstrapping yang sangat relate untuk pemula.",
        hashtags: ["#BisnisOnline", "#TipsSukses", "#Entrepreneur", "#ScaleUp"],
        reason: "Hook sangat kuat di detik awal, retensi audiens stabil hingga akhir klip."
      },
      { 
        id: 2, 
        title: "KONTROVERSIAL! Debat Panas Soal Kebijakan Baru", 
        start: 300, end: 450, // 150 detik
        score: 9.5, 
        description: "Momen ketegangan memuncak saat narasumber saling adu argumen. Emosi yang intens memancing komentar netizen.",
        hashtags: ["#DebatPanas", "#ViralIndonesia", "#NewsUpdate", "#Reaksi"],
        reason: "Emosi tinggi memicu engagement komentar (debat) di kolom komentar."
      },
      { 
        id: 3, 
        title: "TUTORIAL EDITING: Transisi Mulus Cuma Pakai HP", 
        start: 600, end: 700, // 100 detik
        score: 9.2, 
        description: "Step-by-step praktis membuat transisi video yang estetik hanya bermodalkan smartphone. Sangat save-able.",
        hashtags: ["#TutorialEdit", "#CapCutEdit", "#VideoHacks", "#ContentCreator"],
        reason: "Nilai edukasi tinggi, orang cenderung akan 'Save' dan 'Share'."
      },
      { 
        id: 4, 
        title: "KISAH INSPIRATIF: Dari Nol Sampai Punya Omzet Milyaran", 
        start: 900, end: 1020, // 120 detik
        score: 9.0, 
        description: "Cerita perjuangan yang menyentuh hati dan memotivasi. Bagian terberat saat bangkrut diceritakan dengan sangat emosional.",
        hashtags: ["#MotivasiSukses", "#KisahNyata", "#InspirasiHarian", "#Perjuangan"],
        reason: "Narrative arc yang kuat membangun koneksi emosional dengan penonton."
      },
      { 
        id: 5, 
        title: "JANGAN SALAH PILIH! 3 Tanda Pasangan Red Flag", 
        start: 1200, end: 1290, // 90 detik
        score: 8.8, 
        description: "Tips relationship yang menohok. Poin nomor 2 sangat sering terjadi tapi jarang disadari.",
        hashtags: ["#RelationshipGoals", "#RedFlag", "#TipsCinta", "#Psikologi"],
        reason: "Topik relatable yang memicu orang untuk men-tag pasangannya."
      },
      { 
        id: 6, 
        title: "REVIEW JUJUR: Produk Viral Ini Ternyata Zonk?", 
        start: 1500, end: 1610, // 110 detik
        score: 8.5, 
        description: "Review tanpa filter tentang produk yang lagi hype. Kejujuran reviewer di sini sangat dihargai audiens.",
        hashtags: ["#ReviewJujur", "#ProdukViral", "#SkincareReview", "#Unboxing"],
        reason: "Unpopular opinion memicu rasa penasaran."
      },
      { 
        id: 7, 
        title: "LIFE HACK: Cara Belajar Bahasa Asing dalam 3 Bulan", 
        start: 1800, end: 1880, // 80 detik
        score: 8.4, 
        description: "Metode belajar unik yang tidak diajarkan di sekolah. Sangat praktis untuk langsung dipraktekkan.",
        hashtags: ["#BelajarBahasa", "#LifeHacks", "#TipsPintar", "#Edukasi"],
        reason: "Informasi padat dan bermanfaat dalam waktu singkat."
      },
      { 
        id: 8, 
        title: "MOMEN LUCU: Bloopers Saat Syuting (Ngakak Parah)", 
        start: 50, end: 120, // 70 detik
        score: 8.2, 
        description: "Kumpulan kesalahan lucu yang terjadi secara natural. Tawa narasumber sangat menular.",
        hashtags: ["#VideoLucu", "#NgakakKocak", "#Bloopers", "#Hiburan"],
        reason: "Pure entertainment, mudah dicerna semua kalangan."
      },
      { 
        id: 9, 
        title: "PREDIKSI MASA DEPAN: AI Akan Gantikan Manusia?", 
        start: 2000, end: 2150, // 150 detik
        score: 8.0, 
        description: "Analisis mendalam tentang dampak AI terhadap lapangan pekerjaan. Membuat orang berpikir dan berdiskusi.",
        hashtags: ["#TeknologiAI", "#MasaDepan", "#TechNews", "#Diskusi"],
        reason: "Topik trending yang memicu kekhawatiran dan diskusi."
      },
      { 
        id: 10, 
        title: "PESAN TERAKHIR: Kalimat Penutup yang Bikin Merinding", 
        start: 2300, end: 2360, // 60 detik
        score: 7.8, 
        description: "Closing statement yang sangat powerful dan philosophical. Cocok untuk bahan renungan.",
        hashtags: ["#QuotesBijak", "#RenunganMalam", "#KataMutiara", "#Penutup"],
        reason: "Ending yang kuat meninggalkan kesan mendalam."
      },
    ];
    setClips(generatedClips);
    setActiveClip(generatedClips[0]);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const getScoreColor = (score) => {
    if (score >= 9.0) return "text-green-400 bg-green-400/10 border-green-400/20";
    if (score >= 8.0) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              AutoClip Expert
            </span>
          </div>
          <div className="flex gap-4 text-sm text-slate-400 items-center">
            <span className="hover:text-white cursor-pointer hidden md:block">Dashboard</span>
            <span className="hover:text-white cursor-pointer hidden md:block">Pricing</span>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border border-slate-700"
            >
              <Github className="w-3 h-3" />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Input Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cari Momen Viral <br/>
            <span className="text-purple-400">Durasi 60-180 Detik</span>
          </h1>
          <p className="text-slate-400 mb-8">
            Tempel link YouTube. AI kami akan bertindak sebagai <strong>Expert Clipper</strong> untuk menemukan momen dengan hook kuat, hashtag SEO, dan potensi FYP tinggi.
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex items-center bg-slate-800 rounded-xl p-2 border border-slate-700 shadow-2xl">
              <div className="pl-3 pr-2 text-slate-400">
                <Youtube className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Tempel link YouTube di sini (contoh: https://youtu.be/...)"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 py-2"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  isAnalyzing 
                    ? 'bg-slate-700 text-slate-400 cursor-wait' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                }`}
              >
                {isAnalyzing ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                {isAnalyzing ? 'Menganalisis...' : 'Analisa Expert'}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="max-w-2xl mx-auto mb-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sedang Melakukan Deep Analysis...</h3>
            <p className="text-slate-400 mb-6 text-sm flex items-center justify-center gap-2">
               <Sparkles className="w-4 h-4 text-yellow-400" />
               {analysisStep}
            </p>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-1 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Mulai</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        {/* Results Section */}
        {clips.length > 0 && !isAnalyzing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            
            {/* Left: Player & Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative aspect-video">
                {activeClip ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?start=${activeClip.start}&end=${activeClip.end}&autoplay=1&rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    Pilih klip untuk memutar
                  </div>
                )}
              </div>

              {activeClip && (
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getScoreColor(activeClip.score)}`}>
                          Rating: {activeClip.score}/10
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {activeClip.end - activeClip.start} Detik
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight text-white">{activeClip.title}</h2>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium flex items-center gap-2 transition text-sm">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <h4 className="text-xs font-semibold text-slate-300 uppercase mb-2 flex items-center gap-2">
                            <FileText className="w-3 h-3 text-blue-400"/> Deskripsi Singkat
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {activeClip.description}
                        </p>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <h4 className="text-xs font-semibold text-slate-300 uppercase mb-2 flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-yellow-400"/> Alasan Viral
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {activeClip.reason}
                        </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase mb-2 flex items-center gap-2">
                        <Hash className="w-3 h-3 text-purple-400"/> Hashtag SEO
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {activeClip.hashtags.map((tag, idx) => (
                            <span key={idx} className="text-purple-300 bg-purple-500/10 px-2 py-1 rounded text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Clips List */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-[700px]">
              <div className="p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur sticky top-0 rounded-t-xl z-10">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-purple-400" />
                  10 Top Potensi Viral
                </h3>
                <p className="text-xs text-slate-500 mt-1">Diurutkan berdasarkan skor viralitas</p>
              </div>
              
              <div className="overflow-y-auto flex-1 p-2 space-y-2 custom-scrollbar">
                {clips.map((clip) => (
                  <div 
                    key={clip.id}
                    onClick={() => setActiveClip(clip)}
                    className={`p-3 rounded-lg cursor-pointer transition-all border group ${
                      activeClip?.id === clip.id 
                        ? 'bg-slate-700 border-purple-500 ring-1 ring-purple-500' 
                        : 'bg-slate-750 border-transparent hover:bg-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <span className="font-semibold text-sm line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
                        {clip.title}
                      </span>
                      <span className={`shrink-0 text-xs font-bold px-1.5 py-0.5 rounded border ${getScoreColor(clip.score)}`}>
                        {clip.score}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(clip.start)} - {formatTime(clip.end)}
                      </span>
                      <span className="opacity-75">{(clip.end - clip.start)}s</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
        
        {/* Placeholder / Empty State */}
        {clips.length === 0 && !isAnalyzing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
             {[
               {icon: <Clock className="w-8 h-8 text-blue-400"/>, title: "Durasi Ideal", desc: "Mencari klip 60-180 detik yang pas untuk retensi audiens."},
               {icon: <Sparkles className="w-8 h-8 text-purple-400"/>, title: "Hashtag & SEO", desc: "Otomatis meriset hashtag yang relevan dan deskripsi menarik."},
               {icon: <Star className="w-8 h-8 text-yellow-400"/>, title: "Rating Potensi", desc: "Sistem scoring 1-10 untuk memprediksi kemungkinan viral."}
             ].map((item, idx) => (
               <div key={idx} className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                 <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   {item.icon}
                 </div>
                 <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                 <p className="text-slate-400 text-sm">{item.desc}</p>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
