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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Conversation</h1>
        <p className="text-base-content/70">
          Upload a chat history or email conversation to analyze communication patterns and get strategic insights.
        </p>
      </div>

      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          {/* Upload Method Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUploadMethod("paste")}
                className={`btn ${uploadMethod === "paste" ? "btn-primary" : "btn-outline"} flex-col h-auto p-4`}
              >
                <MessageCircle className="w-6 h-6 mb-2" />
                <span>Paste Text</span>
                <span className="text-xs opacity-70">Copy and paste conversation</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("file")}
                className={`btn ${uploadMethod === "file" ? "btn-primary" : "btn-outline"} flex-col h-auto p-4`}
              >
                <FileText className="w-6 h-6 mb-2" />
                <span>Upload File</span>
                <span className="text-xs opacity-70">Upload .txt, .md, or other text files</span>
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
                className={`btn btn-primary ${isUploading ? "loading" : ""}`}
              >
                {isUploading ? (
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                {isUploading ? "Analyzing..." : "Upload & Analyze"}
              </button>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-8 p-4 bg-info/10 rounded-lg">
            <h3 className="font-semibold mb-2 text-info">💡 Tips for better analysis:</h3>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Include complete conversations rather than snippets</li>
              <li>• Focus on text from one person for accurate profiling</li>
              <li>• Remove sensitive information before uploading</li>
              <li>• Longer conversations provide more accurate analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}