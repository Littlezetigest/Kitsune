import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { Upload, FileText, MessageCircle, Camera, Eye, Brain } from "lucide-react";
import { useState, useRef } from "react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
});

function UploadPage() {
  const navigate = useNavigate();
  const uploadConversation = useMutation(api.conversations.uploadConversation);
  // const analyzeConversation = useAction(api.analysisActions.analyzeConversation);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    participantName: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"paste" | "file" | "image">("paste");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          content,
          title: prev.title || file.name.replace(/\.[^/.]+$/, "")
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        analyzeImage(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (_imageData: string, fileName: string) => {
    setIsUploading(true);
    
    try {
      // Determine content type based on file name or content analysis
      let contentType: "email_chain" | "chat_screenshot" | "meeting_transcript" | "voice_memo" | "document_text" | "social_media" = "chat_screenshot";
      
      if (fileName.toLowerCase().includes('email') || fileName.toLowerCase().includes('mail')) {
        contentType = "email_chain";
      } else if (fileName.toLowerCase().includes('transcript') || fileName.toLowerCase().includes('meeting')) {
        contentType = "meeting_transcript";
      } else if (fileName.toLowerCase().includes('social') || fileName.toLowerCase().includes('twitter') || fileName.toLowerCase().includes('linkedin')) {
        contentType = "social_media";
      }

      // Enhanced image analysis with OCR simulation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Enhanced mock analysis results with advanced patterns
      const mockAnalysis = {
        confidence: 0.94,
        contentType,
        type: "Enhanced Content Analysis",
        extracted_text: "Subject: Investment Opportunity - Exclusive Access\n\nDear [Name],\n\nI hope this message finds you well. I wanted to reach out regarding an exclusive investment opportunity that I believe aligns perfectly with your portfolio strategy. This is a limited-time opportunity with significant upside potential. Our previous investors have seen 15x returns. I'd love to discuss this further at your earliest convenience.\n\nBest regards,\n[Investor Name]",
        
        // Communication DNA Analysis
        communication_dna: {
          cadence: { averageSentenceLength: 18.5, responseRhythm: "immediate", punctuationStyle: "professional" },
          formality: { level: 8.2, businessJargon: ["portfolio strategy", "upside potential", "returns"], contractions: 0 },
          personality: { directness: 7.1, assertiveness: 6.8, empathy: 5.2, humor: "minimal" }
        },
        
        // Linguistic Fingerprint
        linguistic_fingerprint: {
          signature_phrases: ["I hope this finds you well", "at your earliest convenience", "I'd love to discuss"],
          catchphrases: ["exclusive access", "limited-time opportunity"],
          vocabulary_signature: { uniqueWords: ["upside", "portfolio"], metaphors: [], analogies: [] },
          mannerisms: { fillerWords: [], greetingStyle: "formal", emailSignature: "professional" }
        },
        
        // Investment Philosophy
        investment_philosophy: {
          riskProfile: "moderate-aggressive",
          sectors: ["technology", "growth-stage"],
          evaluationCriteria: { teamImportance: 7, productFocus: 8, marketSize: "large" },
          decisionTriggers: { positiveSignals: ["proven returns", "limited access"], redFlags: [], accelerators: ["time pressure"] }
        },
        
        // Emotional Profile
        emotional_profile: {
          baseline: { defaultMood: "professional", emotionalRange: 4, volatility: 2 },
          triggers: { excitement: ["exclusive opportunity"], pressure: ["limited time"], trust: ["previous success"] },
          negotiation: { pressureResponse: "persistent", competitive: 6, collaborative: 5 }
        },
        
        // Advanced Psychological Profile
        psychological_profile: {
          archetype: "THE VALIDATOR",
          confidence_level: 0.87,
          risk_tolerance: "Medium-High",
          decision_speed: "Deliberate",
          key_motivations: ["Exclusive access", "Proven returns", "Strategic positioning"],
          vulnerabilities: ["FOMO tactics", "Authority validation", "Time pressure"],
          persuasion_approach: "Evidence-based with social proof and urgency",
          communication_style: "Professional with subtle pressure"
        }
      };
    
    setImageAnalysis(mockAnalysis);
    setFormData(prev => ({
      ...prev,
      content: mockAnalysis.extracted_text,
      title: prev.title || `Image Analysis: ${fileName.replace(/\.[^/.]+$/, "")}`
    }));
    } catch (error) {
      console.error('Image analysis failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setIsUploading(true);
    try {
      // Upload conversation
      const conversationId = await uploadConversation({
        title: formData.title || "Untitled Conversation",
        content: formData.content,
        participantName: formData.participantName || undefined,
      });

      // Start enhanced analysis if we have advanced data
      if (imageAnalysis && 'contentType' in imageAnalysis) {
        // In production, this would call the advanced analysis action
        // await runAdvancedAnalysis({ conversationId, contentType: imageAnalysis.contentType });
        console.log('Enhanced analysis would be triggered for:', imageAnalysis.contentType);
      }

      // Navigate to analysis results
      navigate({ to: `/analysis/${conversationId}` });
    } catch (error) {
      console.error('Upload failed:', error);
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="not-prose max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-light mb-4 tracking-wider brush-stroke-text">UPLOAD INTELLIGENCE</h1>
        <div className="artistic-divider w-24 mx-auto mb-6"></div>
        <p className="text-base-content/70 font-light leading-relaxed max-w-2xl mx-auto">
          Upload communications to begin psychological analysis and strategic planning.
          Every message reveals patterns. Every pattern reveals vulnerabilities.
        </p>
      </div>

      <div className="zen-card p-8">
          {/* Upload Method Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setUploadMethod("paste")}
                className={`zen-btn ${uploadMethod === "paste" ? "border-strategic-red bg-strategic-red" : ""} flex-col h-auto p-6 brush-accent`}
              >
                <MessageCircle className="w-6 h-6 mb-2 zen-focus" />
                <span className="font-light tracking-wide">PASTE TEXT</span>
                <span className="text-xs opacity-70 font-light">Direct conversation input</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("file")}
                className={`zen-btn ${uploadMethod === "file" ? "border-strategic-red bg-strategic-red" : ""} flex-col h-auto p-6 brush-accent`}
              >
                <FileText className="w-6 h-6 mb-2 zen-focus" />
                <span className="font-light tracking-wide">UPLOAD FILE</span>
                <span className="text-xs opacity-70 font-light">Document analysis</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("image")}
                className={`zen-btn ${uploadMethod === "image" ? "border-strategic-red bg-strategic-red" : ""} flex-col h-auto p-6 brush-accent`}
              >
                <Camera className="w-6 h-6 mb-2 zen-focus" />
                <span className="font-light tracking-wide">IMAGE ANALYSIS</span>
                <span className="text-xs opacity-70 font-light">Screenshot extraction</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Conversation Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Chat with Sarah about work project"
                className="input input-bordered w-full"
              />
            </div>

            {/* Participant Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Participant Name (Optional)</span>
              </label>
              <input
                type="text"
                name="participantName"
                value={formData.participantName}
                onChange={handleInputChange}
                placeholder="Name of the person being analyzed"
                className="input input-bordered w-full"
              />
            </div>

            {/* Content Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Conversation Content</span>
              </label>
              
              {uploadMethod === "paste" ? (
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Paste your conversation here..."
                  className="textarea textarea-bordered w-full h-64"
                  required
                />
              ) : uploadMethod === "file" ? (
                <div className="space-y-4">
                  <input
                    type="file"
                    accept=".txt,.md,.csv,.json"
                    onChange={handleFileUpload}
                    className="file-input file-input-bordered w-full"
                  />
                  {formData.content && (
                    <div className="bg-base-100 p-4 rounded-lg border">
                      <p className="text-sm text-base-content/70 mb-2">File preview:</p>
                      <div className="max-h-32 overflow-y-auto text-xs">
                        <pre className="whitespace-pre-wrap">{formData.content.slice(0, 500)}...</pre>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Image Upload Section */}
                  <div className="cyber-shrine-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Eye className="w-5 h-5 text-fox-fire-cyan" />
                      <h3 className="font-light tracking-wide cia-text">VISUAL INTELLIGENCE EXTRACTION</h3>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input file-input-bordered w-full mb-4"
                      style={{ display: 'none' }}
                    />
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="zen-btn w-full p-6 border-dashed border-2 border-fox-fire-cyan/50 hover:border-fox-fire-cyan flex-col gap-3"
                      disabled={isUploading}
                    >
                      <Camera className="w-8 h-8 text-fox-fire-cyan" />
                      <div className="text-center">
                        <p className="font-light tracking-wide">UPLOAD SCREENSHOT</p>
                        <p className="text-xs opacity-70">Email conversations, chat screenshots, documents</p>
                      </div>
                    </button>

                    {uploadedImage && (
                      <div className="mt-6 space-y-4">
                        <div className="cyber-shrine-card p-4">
                          <img 
                            src={uploadedImage} 
                            alt="Uploaded screenshot" 
                            className="w-full max-h-64 object-contain rounded border border-fox-fire-cyan/30"
                          />
                        </div>
                        
                        {isUploading && (
                          <div className="text-center py-4">
                            <div className="loading loading-spinner loading-lg text-fox-fire-cyan mb-2"></div>
                            <p className="font-light tracking-wide cia-text">ANALYZING VISUAL INTELLIGENCE...</p>
                          </div>
                        )}

                        {imageAnalysis && (
                          <div className="cyber-shrine-card p-6 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                              <Brain className="w-5 h-5 text-hot-magenta" />
                              <h4 className="font-light tracking-wide cia-text">EXTRACTED INTELLIGENCE</h4>
                              <div className="badge badge-outline text-xs">
                                {Math.round(imageAnalysis.confidence * 100)}% CONFIDENCE
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <p className="font-semibold text-fox-fire-cyan">PSYCHOLOGICAL PROFILE:</p>
                                <p className="cia-text">Archetype: {imageAnalysis.psychological_profile?.archetype}</p>
                                <p className="cia-text">Risk Tolerance: {imageAnalysis.psychological_profile?.risk_tolerance}</p>
                                <p className="cia-text">Decision Speed: {imageAnalysis.psychological_profile?.decision_speed}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="font-semibold text-hot-magenta">LANGUAGE PATTERNS:</p>
                                <p className="cia-text">Formality: {imageAnalysis.language_patterns?.formality_level}</p>
                                <p className="cia-text">Tone: {imageAnalysis.language_patterns?.emotional_tone}</p>
                                <p className="cia-text">Urgency: {imageAnalysis.language_patterns?.urgency_indicators?.join(', ')}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Extracted Text Preview */}
                  {formData.content && (
                    <div className="cyber-shrine-card p-4">
                      <p className="text-sm text-fox-fire-cyan mb-2 font-light tracking-wide">EXTRACTED TEXT:</p>
                      <div className="max-h-32 overflow-y-auto text-xs">
                        <pre className="whitespace-pre-wrap cia-text">{formData.content}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control">
              <button
                type="submit"
                disabled={!formData.content.trim() || isUploading}
                className="zen-btn w-full text-sm tracking-widest brush-accent"
              >
                {isUploading ? (
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                {isUploading ? "ANALYZING..." : "INITIATE ANALYSIS"}
              </button>
            </div>
          </form>

          {/* Strategic Guidelines */}
          <div className="mt-8 zen-card p-6 border border-strategic-red/30">
            <h3 className="font-light mb-4 text-lg tracking-wide brush-stroke-text strategic-emphasis">TACTICAL GUIDELINES</h3>
            <div className="artistic-divider w-16 h-0.5 mb-4"></div>
            <ul className="text-sm space-y-2 font-light leading-relaxed opacity-80">
              <li className="flex items-start gap-2">
                <span className="text-strategic-red mt-1">▸</span>
                <span>Complete conversations yield superior intelligence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-strategic-red mt-1">▸</span>
                <span>Single-person focus maximizes profiling accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-strategic-red mt-1">▸</span>
                <span>Sanitize sensitive data before intelligence upload</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-strategic-red mt-1">▸</span>
                <span>Extended dialogue enhances psychological mapping</span>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
}