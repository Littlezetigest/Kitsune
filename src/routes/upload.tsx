import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useAction } from "convex/react";
import { Upload, FileText, MessageCircle, Camera, Eye, Brain, X, Plus } from "lucide-react";
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
  const analyzeWithClaude = useAction(api.claudeImageAnalysis.analyzeImageWithClaude);
  const batchAnalyzeWithClaude = useAction(api.claudeImageAnalysis.batchAnalyzeImages);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    participantName: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"paste" | "file" | "image">("paste");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Check if user is admin
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress === "admin@kitsune.ai";

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          content,
          title: prev.title || file.name
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    console.log(`Starting Claude analysis of ${files.length} images`);
    setMultipleFiles(files);
    setIsUploading(true);

    try {
      // Convert files to base64
      const imagePromises = files.map(file => {
        return new Promise<{imageData: string, fileName: string}>((resolve, reject) => {
          if (!file.type.startsWith('image/')) {
            reject(new Error(`${file.name} is not an image`));
            return;
          }
          
          if (file.size > 10 * 1024 * 1024) {
            reject(new Error(`${file.name} is too large`));
            return;
          }

          const reader = new FileReader();
          reader.onload = () => resolve({
            imageData: reader.result as string,
            fileName: file.name
          });
          reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
          reader.readAsDataURL(file);
        });
      });

      const images = await Promise.all(imagePromises);
      setUploadedImages(images.map(img => img.imageData));

      console.log("Sending to Claude API...");
      
      // Use Claude API for analysis
      const result = await batchAnalyzeWithClaude({ 
        images,
        prompt: "Extract all text from these images. Focus on conversations, messages, emails, or any text content. Return the complete transcription."
      });

      console.log("Claude analysis result:", result);
      console.log("Combined text length:", result.combinedText?.length);
      console.log("Combined text preview:", result.combinedText?.substring(0, 500));

      // Update form with extracted text
      setFormData(prev => ({
        ...prev,
        content: result.combinedText || "No text found in images",
        title: prev.title || `Image Analysis (${files.length} files)`
      }));

    } catch (error) {
      console.error("Error:", error);
      setFormData(prev => ({
        ...prev,
        content: `Error: ${error instanceof Error ? error.message : 'Failed to analyze images'}`,
        title: prev.title || "Upload Error"
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      alert("Please provide conversation content");
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

  const removeFile = (index: number) => {
    const newFiles = multipleFiles.filter((_, i) => i !== index);
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setMultipleFiles(newFiles);
    setUploadedImages(newImages);
  };

  return (
    <div className="not-prose max-w-4xl mx-auto p-6">
      <div className="ultra-premium-card p-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="premium-title mb-4">CONVERSATION ANALYSIS PLATFORM</h1>
          <p className="text-lg opacity-80 mb-2">COMMUNICATION INTELLIGENCE SYSTEM</p>
          <p className="text-sm opacity-60">
            Upload conversations, emails, or chat screenshots for comprehensive communication analysis. 
            Advanced OCR technology extracts text from multiple images simultaneously for complete conversation understanding.
          </p>
        </div>

        {/* Upload Method Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">SELECT UPLOAD METHOD</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setUploadMethod("paste")}
              className={`cyber-btn flex-col h-auto p-6 ${uploadMethod === "paste" ? "btn-primary" : ""}`}
            >
              <MessageCircle className="w-8 h-8 mb-2" />
              <span className="font-light tracking-wide">PASTE TEXT</span>
              <span className="text-xs opacity-60">Direct conversation input</span>
            </button>
            
            <button
              onClick={() => setUploadMethod("file")}
              className={`cyber-btn flex-col h-auto p-6 ${uploadMethod === "file" ? "btn-primary" : ""}`}
            >
              <FileText className="w-8 h-8 mb-2" />
              <span className="font-light tracking-wide">UPLOAD FILE</span>
              <span className="text-xs opacity-60">Document analysis</span>
            </button>
            
            <button
              onClick={() => setUploadMethod("image")}
              className={`cyber-btn flex-col h-auto p-6 ${uploadMethod === "image" ? "btn-primary" : ""}`}
            >
              <Camera className="w-8 h-8 mb-2" />
              <span className="font-light tracking-wide">MULTIPLE IMAGES</span>
              <span className="text-xs opacity-60">Advanced OCR extraction</span>
            </button>
          </div>
        </div>

        {/* File Upload Interface */}
        {uploadMethod === "file" && (
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="cyber-btn w-full p-4"
            >
              <Upload className="w-5 h-5 mr-2" />
              CHOOSE FILE
            </button>
          </div>
        )}

        {/* Image Upload Interface */}
        {uploadMethod === "image" && (
          <div className="mb-6">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              className="cyber-btn w-full p-4 mb-4"
              disabled={isUploading}
            >
              <Upload className="w-5 h-5 mr-2" />
              {isUploading ? "ANALYZING WITH CLAUDE..." : "CHOOSE IMAGES"}
            </button>

            {/* Display uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded border border-gray-600"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 btn btn-circle btn-xs btn-error"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Form */}
        {/* Debug Information */}
        {formData.content && formData.content !== "No text found in images" && uploadMethod === "image" && (
          <div className="cyber-card p-4 mb-6 border-[var(--cyber-green)]/50">
            <h3 className="text-sm font-bold mb-2" style={{color: 'var(--cyber-green)'}}>
              📋 EXTRACTED TEXT DEBUG
            </h3>
            <div className="text-xs space-y-1">
              <div><strong>Text Length:</strong> {formData.content.length} characters</div>
              <div><strong>Files Processed:</strong> {multipleFiles.length}</div>
              <div className="mt-2">
                <strong>Preview:</strong>
                <div className="bg-black/30 p-2 rounded mt-1 max-h-20 overflow-y-auto text-xs font-mono">
                  {formData.content.substring(0, 300)}...
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Target Dossier Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Series A Pitch - Marcus Rivera, Validator Archetype"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Name (Optional)</label>
            <input
              type="text"
              value={formData.participantName}
              onChange={(e) => setFormData(prev => ({ ...prev, participantName: e.target.value }))}
              placeholder="Name of the person being analyzed"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Conversation Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Paste your conversation, email thread, or chat history here..."
              className="textarea textarea-bordered w-full h-40"
              disabled={uploadMethod === "image" && isUploading}
            />
          </div>

          <button
            type="submit"
            disabled={!formData.content.trim() || isUploading}
            className="fox-fire-btn w-full text-lg p-4"
          >
            <Brain className="w-5 h-5 mr-2" />
            {isUploading ? "PROCESSING..." : (isAdmin ? "UPLOAD & ANALYZE TARGET" : "UPLOAD & ANALYZE TARGET")}
          </button>
        </form>
      </div>
    </div>
  );
}