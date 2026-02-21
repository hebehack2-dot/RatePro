
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Sparkles, Download, Loader2, Wand2, Gamepad2, Monitor, Camera, Star, X, CheckCircle2, CreditCard } from 'lucide-react';

export const ThumbnailStudio: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [style, setStyle] = useState<'Gaming' | 'Tech' | 'Vlog' | 'None'>('None');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const stylePrompts = {
    Gaming: "High-energy, vibrant colors, neon accents, dramatic lighting, gaming setup elements, 4k, cinematic.",
    Tech: "Clean, minimalist, futuristic, blue and white tones, high-tech gadgets, professional studio lighting, sharp focus.",
    Vlog: "Lifestyle, warm lighting, approachable, depth of field, natural colors, high quality, real-life setting.",
    None: ""
  };

  const handleGenerate = async () => {
    if (!idea.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setStatus('Refining your idea with AI...');

    try {
      // Step 1: Brain AI - Refine the prompt using Puter (Keep Puter for logic)
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
      
      // We set the URL directly. Pollinations returns the image.
      setGeneratedImageUrl(imageUrl);
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
    <div className="flex flex-col lg:flex-row gap-8 items-start animate-in fade-in duration-500">
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
              disabled={isGenerating || !idea.trim()}
              className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
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

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-2xl font-bold hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-200 dark:shadow-none"
              >
                <Star size={18} fill="currentColor" />
                <span>Upgrade to Pro</span>
              </button>
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
                  Best Value
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">₹199</span>
                  <span className="text-slate-500 dark:text-slate-400 font-bold">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited 4K Image Generations",
                  "No Watermarks on Downloads",
                  "Priority AI Processing",
                  "Custom Style Presets",
                  "24/7 Premium Support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg">
                <CreditCard size={20} />
                <span>Start Pro Subscription</span>
              </button>
              
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-4 text-center">
                Secure payment via Stripe. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
