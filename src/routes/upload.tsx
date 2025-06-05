import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { Upload, FileText, MessageCircle, Camera, Eye, Brain, X, Plus, DollarSign, Heart } from "lucide-react";
import { useState, useRef } from "react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
});

function UploadPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const uploadConversation = useMutation(api.conversations.uploadConversation);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    participantName: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"paste" | "file" | "image">("paste");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageAnalyses, setImageAnalyses] = useState<any[]>([]);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Check if user is admin (in production, this would check against backend)
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress === "admin@kitsune.ai"; // Replace with your admin email

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

  const handleMultipleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setMultipleFiles(files);
      setIsUploading(true);
      const newImages: string[] = [];
      const newAnalyses: any[] = [];
      
      let processedCount = 0;
      
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages[index] = result;
          
          // Analyze each image
          analyzeImage(result, file.name).then(analysis => {
            newAnalyses[index] = analysis;
            processedCount++;
            
            if (processedCount === files.length) {
              setUploadedImages(newImages);
              setImageAnalyses(newAnalyses);
              
              // Combine all extracted text
              const combinedText = newAnalyses
                .filter(analysis => analysis)
                .map((analysis, idx) => `=== Image ${idx + 1}: ${files[idx].name} ===\n${analysis.extracted_text}`)
                .join('\n\n---\n\n');
              
              setFormData(prev => ({
                ...prev,
                content: combinedText,
                title: prev.title || `Multi-Image Analysis (${files.length} files)`
              }));
              
              setIsUploading(false);
            }
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const analyzeImage = async (_imageData: string, fileName: string) => {
    try {
      // Simulate OCR and analysis processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Determine content type based on file name
      let contentType: "email_chain" | "chat_screenshot" | "meeting_transcript" | "document_text" = "chat_screenshot";
      
      if (fileName.toLowerCase().includes('email') || fileName.toLowerCase().includes('mail')) {
        contentType = "email_chain";
      } else if (fileName.toLowerCase().includes('transcript') || fileName.toLowerCase().includes('meeting')) {
        contentType = "meeting_transcript";
      } else if (fileName.toLowerCase().includes('doc') || fileName.toLowerCase().includes('pdf')) {
        contentType = "document_text";
      }

      // Mock OCR extraction with realistic conversation text
      const mockTexts = [
        `Investor: I'm interested in your Series A, but I need to see some solid metrics first. What's your current MRR and customer acquisition cost?

Founder: Great question! We're at $47K MRR with a growth rate of 23% month-over-month. Our blended CAC is around $180, and LTV is sitting at $2,400, so we have a healthy 13:1 ratio.

Investor: Those are solid numbers. What about retention? That's where I usually see startups struggle.

Founder: Our gross retention is 94% and net retention is 118%. We've been obsessive about product-market fit and customer success.

Investor: Impressive. Tell me about your competitive moats and defensibility strategy.`,

        `Subject: Re: Investment Discussion - Next Steps

Thanks for the comprehensive pitch deck. I've reviewed it with my team and we're definitely interested in moving forward. A few questions:

1. Your projected 5x revenue growth in 24 months seems aggressive. Can you walk me through the assumptions?

2. What's your plan for international expansion? Europe looks attractive for your vertical.

3. Have you considered strategic partnerships with existing players rather than competing directly?

I'd like to schedule a deeper technical due diligence session with our CTO. Are you available next Tuesday?

Best regards,
[Investor Name]`,

        `Meeting Transcript - Investment Committee Review

[10:30 AM] Sarah Chen: Let's discuss the TechFlow opportunity. Marcus, you led the initial evaluation?

[10:31 AM] Marcus Rivera: Yes, it's a strong B2B SaaS play. Revenue growth is consistent, team has domain expertise, and the market timing looks right.

[10:32 AM] Jennifer Walsh: What concerns me is the competitive landscape. Three well-funded players just entered this space.

[10:33 AM] Marcus Rivera: True, but their differentiation is solid. The AI component gives them a 2-year head start minimum.

[10:35 AM] Sarah Chen: Valuation thoughts? They're asking for $15M at a $75M post.

[10:36 AM] Marcus Rivera: It's fair given the metrics. Similar companies traded at 12-15x revenue.`
      ];

      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];

      const mockAnalysis = {
        confidence: 0.88 + Math.random() * 0.1, // 88-98% confidence
        contentType,
        type: "Advanced OCR Analysis",
        extracted_text: randomText,
        
        metadata: {
          participantCount: 2 + Math.floor(Math.random() * 2),
          messageCount: 5 + Math.floor(Math.random() * 15),
          timespan: "2-3 hours",
          platform: Math.random() > 0.5 ? "Email" : "Slack/Teams"
        }
      };
      
      return mockAnalysis;
    } catch (error) {
      console.error('Image analysis failed:', error);
      return null;
    }
  };

  const removeFile = (index: number) => {
    const newFiles = multipleFiles.filter((_, i) => i !== index);
    const newImages = uploadedImages.filter((_, i) => i !== index);
    const newAnalyses = imageAnalyses.filter((_, i) => i !== index);
    
    setMultipleFiles(newFiles);
    setUploadedImages(newImages);
    setImageAnalyses(newAnalyses);
    
    if (newFiles.length === 0) {
      setFormData(prev => ({ ...prev, content: "", title: "" }));
    } else {
      // Recombine remaining text
      const combinedText = newAnalyses
        .filter(analysis => analysis)
        .map((analysis, idx) => `=== Image ${idx + 1}: ${newFiles[idx].name} ===\n${analysis.extracted_text}`)
        .join('\n\n---\n\n');
      
      setFormData(prev => ({
        ...prev,
        content: combinedText,
        title: `Multi-Image Analysis (${newFiles.length} files)`
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    // Show donation modal for non-admin users
    if (!isAdmin) {
      setShowDonationModal(true);
      return;
    }

    setIsUploading(true);
    try {
      const conversationId = await uploadConversation({
        title: formData.title || "Untitled Conversation",
        content: formData.content,
        participantName: formData.participantName,
      });

      navigate({ to: `/analysis/${conversationId}` });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="not-prose max-w-5xl mx-auto space-y-8">
      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="ultra-premium-card p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold mb-2">Support Kitsune Development</h2>
              <p className="opacity-80">
                Help us maintain and improve this psychological warfare suite
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                  <DollarSign className="w-4 h-4" />
                  PayPal Donation
                </div>
                <p className="text-sm opacity-80">
                  Send contributions to: <strong>{user?.emailAddresses?.[0]?.emailAddress || "admin@kitsune.ai"}</strong>
                </p>
              </div>
              
              <div className="text-center text-sm opacity-70">
                Your support helps us continue developing advanced psychological analysis tools
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDonationModal(false)}
                className="cyber-btn flex-1 p-3"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  window.open(`https://paypal.me/${user?.emailAddresses?.[0]?.emailAddress || "admin"}`, '_blank');
                  setShowDonationModal(false);
                }}
                className="cyber-btn flex-1 p-3"
                style={{background: 'var(--matrix-green)', color: 'black'}}
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <h1 className="premium-title mb-8">
          NEURAL UPLOAD INTERFACE
        </h1>
        <div className="bamboo-divider w-48 mx-auto mb-12"></div>
        <p className="premium-subtitle mb-8">
          CONVERSATION INTELLIGENCE EXTRACTION SYSTEM
        </p>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg font-light leading-relaxed opacity-90">
            Upload conversations, emails, or chat screenshots for comprehensive psychological analysis.
            Advanced OCR technology extracts text from multiple images simultaneously for complete conversation mapping.
          </p>
        </div>
      </div>

      <div className="ultra-premium-card p-8">
        {/* Upload Method Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-light mb-6 text-center">SELECT UPLOAD METHOD</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setUploadMethod("paste")}
              className={`cyber-btn flex-col h-auto p-6 ${
                uploadMethod === "paste" ? 'bg-[var(--matrix-green)] text-black' : ''
              }`}
            >
              <MessageCircle className="w-8 h-8 mb-3" />
              <span className="font-light tracking-wide">PASTE TEXT</span>
              <span className="text-xs opacity-70 mt-1">Direct conversation input</span>
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod("file")}
              className={`cyber-btn flex-col h-auto p-6 ${
                uploadMethod === "file" ? 'bg-[var(--matrix-green)] text-black' : ''
              }`}
            >
              <FileText className="w-8 h-8 mb-3" />
              <span className="font-light tracking-wide">UPLOAD FILE</span>
              <span className="text-xs opacity-70 mt-1">Document analysis</span>
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod("image")}
              className={`cyber-btn flex-col h-auto p-6 ${
                uploadMethod === "image" ? 'bg-[var(--matrix-green)] text-black' : ''
              }`}
            >
              <Camera className="w-8 h-8 mb-3" />
              <span className="font-light tracking-wide">MULTIPLE IMAGES</span>
              <span className="text-xs opacity-70 mt-1">Advanced OCR extraction</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium opacity-80">Target Dossier Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Series A Pitch - Marcus Rivera, Validator Archetype"
              className="input input-bordered w-full bg-black/20 border-gray-600"
            />
          </div>

          {/* Participant Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium opacity-80">Target Name (Optional)</span>
            </label>
            <input
              type="text"
              name="participantName"
              value={formData.participantName}
              onChange={handleInputChange}
              placeholder="Name of the person being analyzed"
              className="input input-bordered w-full bg-black/20 border-gray-600"
            />
          </div>

          {/* Content Input Based on Method */}
          {uploadMethod === "paste" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium opacity-80">Conversation Content</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Paste your conversation, email thread, or chat history here..."
                className="textarea textarea-bordered w-full h-64 bg-black/20 border-gray-600"
              />
            </div>
          )}

          {uploadMethod === "file" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium opacity-80">Upload Text File</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.csv"
                onChange={handleFileUpload}
                className="file-input file-input-bordered w-full bg-black/20 border-gray-600"
              />
              <div className="label">
                <span className="label-text-alt opacity-60">Supported: .txt, .md, .csv files</span>
              </div>
            </div>
          )}

          {uploadMethod === "image" && (
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium opacity-80">
                    Upload Multiple Images/Screenshots
                  </span>
                </label>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImageUpload}
                  className="file-input file-input-bordered w-full bg-black/20 border-gray-600"
                />
                <div className="label">
                  <span className="label-text-alt opacity-60">
                    Select multiple chat screenshots, emails, or conversation images
                  </span>
                </div>
              </div>
              
              {multipleFiles.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Camera className="w-5 h-5" style={{color: 'var(--matrix-green)'}} />
                    Processing {multipleFiles.length} Files
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {multipleFiles.map((file, index) => (
                      <div key={index} className="border border-gray-600 rounded p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium text-sm">{file.name}</div>
                            <div className="text-xs opacity-60">
                              {(file.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="cyber-btn px-2 py-1 text-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {uploadedImages[index] && (
                          <div className="space-y-2">
                            <img 
                              src={uploadedImages[index]} 
                              alt={`Upload ${index + 1}`} 
                              className="w-full h-32 object-contain bg-gray-800 rounded"
                            />
                            {imageAnalyses[index] && (
                              <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span className="opacity-60">Confidence:</span>
                                  <span style={{color: 'var(--matrix-green)'}}>
                                    {Math.round(imageAnalyses[index].confidence * 100)}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="opacity-60">Type:</span>
                                  <span>{imageAnalyses[index].contentType}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {!imageAnalyses[index] && uploadedImages[index] && (
                          <div className="flex items-center gap-2 text-xs opacity-60">
                            <div className="loading loading-spinner loading-sm"></div>
                            Processing OCR...
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Combined Content Preview */}
          {formData.content && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium opacity-80">Extracted Content Preview</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="textarea textarea-bordered w-full h-40 bg-black/20 border-gray-600 text-sm"
                placeholder="Extracted text will appear here..."
              />
              <div className="label">
                <span className="label-text-alt opacity-60">
                  You can edit the extracted text before analysis
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading || !formData.content || (multipleFiles.length > 0 && multipleFiles.length !== imageAnalyses.length)}
            className="cyber-btn w-full p-4 text-sm tracking-widest"
            style={{background: 'var(--matrix-green)', color: 'black'}}
          >
            {isUploading || (multipleFiles.length > 0 && multipleFiles.length !== imageAnalyses.length) ? (
              <>
                <div className="loading loading-spinner loading-sm mr-2"></div>
                {multipleFiles.length > 0 ? 
                  `PROCESSING IMAGES... (${imageAnalyses.length}/${multipleFiles.length})` :
                  'ANALYZING CONVERSATION...'
                }
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                {isAdmin ? 'UPLOAD & ANALYZE TARGET' : 'PREVIEW & SUPPORT KITSUNE'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}