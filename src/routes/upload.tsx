import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { Upload, FileText, MessageCircle } from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
});

function UploadPage() {
  const navigate = useNavigate();
  const uploadConversation = useMutation(api.conversations.uploadConversation);
  const analyzeConversation = useMutation(api.analysisActions.analyzeConversation);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    participantName: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"paste" | "file">("paste");

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

      // Start analysis
      await analyzeConversation({ conversationId });

      // Navigate to analysis results
      navigate({ to: `/analysis/${conversationId}` });
    } catch (error) {
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
            <div className="grid grid-cols-2 gap-4">
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
              ) : (
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