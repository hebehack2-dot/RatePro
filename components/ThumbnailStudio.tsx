
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Sparkles, Download, Loader2, Wand2, Gamepad2, Monitor, Camera, Star, X, CheckCircle2, CreditCard, Clock, Lock } from 'lucide-react';

interface ThumbnailStudioProps {
  user: any;
  isPro: boolean;
  proExpiry: Date | null;
  onSignIn: () => void;
}

export const ThumbnailStudio: React.FC<ThumbnailStudioProps> = ({ user, isPro, proExpiry, onSignIn }) => {
  const [idea, setIdea] = useState('');
  const [style, setStyle] = useState<'Gaming' | 'Tech' | 'Vlog' | 'None'>('None');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  const stylePrompts = {
    Gaming: "High-energy, vibrant colors, neon accents, dramatic lighting, gaming setup elements, 4k, cinematic.",
    Tech: "Clean, minimalist, futuristic, blue and white tones, high-tech gadgets, professional studio lighting, sharp focus.",
    Vlog: "Lifestyle, warm lighting, approachable, depth of field, natural colors, high quality, real-life setting.",
    None: ""
  };

  useEffect(() => {
    const fetchCount = async () => {
      if (user && !isPro) {
        const today = new Date().toISOString().split('T')[0];
        const key = `daily_count_${user.username}_${today}`;
        const count = await window.puter.kv.get(key);
        setDailyCount(count ? parseInt(count) : 0);
      }
    };
    fetchCount();
  }, [user, isPro]);

  const handleGenerate = async () => {
    if (!user) {
      onSignIn();
      return;
    }

    if (!isPro && dailyCount >= 3) {
      setShowUpgradeModal(true);
      return;
    }

    if (!idea.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setStatus('Refining your idea with AI...');

    try {
      // Step 1: Brain AI - Refine the prompt using Puter
      const styleContext = style !== 'None' ? ` The style should be ${style}: ${stylePrompts[style]}.` : "";
      const refinementPrompt = `You are a professional YouTube thumbnail designer. Convert this simple idea into a highly detailed, visually stunning DALL-E 3 image prompt. Focus on composition, lighting, and specific details that make thumbnails "pop".
      
      User Idea: ${idea}
      ${styleContext}
      
      Output ONLY the refined prompt text.`;

      const refinedPrompt = await window.puter.ai.chat(refinementPrompt);
      const promptString = encodeURIComponent(refinedPrompt.toString());
      
      setStatus('Painting your thumbnail with Pollinations.ai...');

      // Step 2: Artist AI - Generate the image using Pollinations.ai (FREE)
      const imageUrl = `https://image.pollinations.ai/prompt/${promptString}?width=1024&height=576&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;
      
      setGeneratedImageUrl(imageUrl);
      
      if (!isPro) {
        const today = new Date().toISOString().split('T')[0];
        const key = `daily_count_${user.username}_${today}`;
        await window.puter.kv.set(key, (dailyCount + 1).toString());
        setDailyCount(prev => prev + 1);
      }
      
      setStatus('');
    } catch (error) {
      console.error('Thumbnail Generation Error:', error);
      setStatus('Error: Failed to generate thumbnail. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImageUrl) return;
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `thumbnail-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-8 items-start animate-in fade-in duration-500">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 dark:bg-black/80 backdrop-blur-sm rounded-3xl border border-slate-700">
        <div className="bg-slate-800 p-4 rounded-full mb-6 shadow-2xl shadow-indigo-500/20">
          <Sparkles className="text-indigo-400" size={48} />
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight text-center">Coming Soon</h2>
        <p className="text-lg text-slate-300 max-w-md text-center font-medium leading-relaxed px-4">
          AI Thumbnail Studio is under development. Get ready for 1-click viral thumbnails!
        </p>
      </div>

      {/* Sidebar Inputs */}
      <div className="w-full lg:w-4/12 space-y-6">
        <div className="card-base p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">AI Studio</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Premium Thumbnail Generator</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Your Idea</label>
              <textarea 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={4}
                placeholder="Describe your video idea (e.g., A futuristic city with flying cars)"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-3 block">Style Presets</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setStyle('Gaming')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${style === 'Gaming' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-400'}`}
                >
                  <Gamepad2 size={18} />
                  <span className="text-[10px] font-bold">Gaming</span>
                </button>
                <button 
                  onClick={() => setStyle('Tech')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${style === 'Tech' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-400'}`}
                >
                  <Monitor size={18} />
                  <span className="text-[10px] font-bold">Tech</span>
                </button>
                <button 
                  onClick={() => setStyle('Vlog')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${style === 'Vlog' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-400'}`}
                >
                  <Camera size={18} />
                  <span className="text-[10px] font-bold">Vlog</span>
                </button>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || (!user ? false : !idea.trim())}
              className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!user ? (
                <>
                  <Lock size={20} />
                  <span>Login to Generate</span>
                </>
              ) : isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  <span>Generate Thumbnail</span>
                </>
              )}
            </button>

            {!isPro && user && (
              <div className="text-center text-xs font-bold text-slate-500 dark:text-slate-400">
                {3 - dailyCount} free generations remaining today
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              {isPro ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    <Star size={18} fill="currentColor" />
                    <span>Pro Member</span>
                  </div>
                  {proExpiry && (
                    <div className="text-xs text-emerald-700 dark:text-emerald-500 flex items-center gap-1">
                      <Clock size={12} />
                      <span>Expires in {Math.ceil((proExpiry.getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days</span>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-2xl font-bold hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-200 dark:shadow-none"
                >
                  <Star size={18} fill="currentColor" />
                  <span>Upgrade to Pro</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {status && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
            <Loader2 size={16} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
            <p className="text-xs font-medium text-indigo-800 dark:text-indigo-300">{status}</p>
          </div>
        )}
      </div>

      {/* Preview Canvas */}
      <div className="w-full lg:w-8/12">
        <div className="card-base rounded-3xl overflow-hidden shadow-xl border-slate-200 dark:border-slate-800">
          <div className="aspect-video bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative group">
            {generatedImageUrl ? (
              <>
                <img 
                  src={generatedImageUrl} 
                  alt="Generated Thumbnail" 
                  className="w-full h-full object-cover animate-in fade-in duration-700"
                  onLoad={() => setStatus('')}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
                  <button 
                    onClick={handleDownload}
                    className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Download size={20} /> Download 16:9
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-600">
                  <ImageIcon size={40} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Thumbnail Preview</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-500 max-w-xs mx-auto">
                    Your professional 16:9 thumbnail will appear here after generation.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ImageIcon size={14} /> 1280 x 720 (16:9)
            </div>
            {generatedImageUrl && (
              <button 
                onClick={() => setGeneratedImageUrl(null)}
                className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:underline"
              >
                Clear Canvas
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-4 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" size={18} />
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong>Pro Tip:</strong> Thumbnails with high contrast and clear focal points perform better. Our AI automatically refines your prompt to include these professional design principles.
          </p>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-lg text-white">
                  <Star size={20} fill="currentColor" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Upgrade to Pro</h3>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 dark:text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Special Offer
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Unlimited 4K Thumbnails for only</h4>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">₹50</span>
                  <span className="text-slate-500 dark:text-slate-400 font-bold">/week</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited 4K Image Generations",
                  "No Watermarks on Downloads",
                  "Priority AI Processing",
                  "Custom Style Presets",
                  "Ad-Free Experience"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => {
                  setShowUpgradeModal(false);
                  setShowUpiModal(true);
                }}
                className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 dark:shadow-none"
              >
                <CreditCard size={20} />
                <span>Pay via UPI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 p-2 rounded-lg text-white">
                  <CreditCard size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Complete Payment</h3>
              </div>
              <button 
                onClick={() => setShowUpiModal(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 dark:text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700 mb-6">
                <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-slate-400 text-sm font-bold flex flex-col items-center gap-2">
                    <CreditCard size={32} />
                    <span>[ Placeholder QR Code ]</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Scan to Pay via UPI</p>
                <p className="text-xs text-slate-500">After payment, message us on WhatsApp with your username to activate.</p>
              </div>

              <a 
                href={`https://wa.me/1234567890?text=I%20have%20paid%20for%20the%20Pro%20Plan.%20My%20username%20is:%20${user?.username || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 dark:shadow-none"
              >
                <span>Message on WhatsApp to Activate</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
