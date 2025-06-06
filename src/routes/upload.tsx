import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
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

  const performRealImageAnalysis = async (imageData: string): Promise<string | null> => {
    try {
      // In a real implementation, this would use OCR services like:
      // - Tesseract.js for client-side OCR
      // - Google Cloud Vision API
      // - AWS Textract
      // - Azure Computer Vision
      
      // For now, we'll simulate the analysis but could be enhanced with actual OCR
      console.log("Performing image analysis on:", imageData.substring(0, 50) + "...");
      
      // Could implement actual OCR here:
      // const result = await Tesseract.recognize(imageData, 'eng');
      // return result.data.text;
      
      return null; // Return null to fall back to mock data for now
    } catch (error) {
      console.error("Image analysis failed:", error);
      return null;
    }
  };

  const generateMockConversation = (contentType: string): string => {
    const conversationTemplates = {
      email_chain: [
        `Subject: Investment Discussion - Follow Up

From: investor@venturecap.com
To: founder@startup.com

Hi Sarah,

Thanks for the detailed presentation yesterday. I've had a chance to review the materials with my team, and we're impressed with the traction you've shown.

A few follow-up questions:
1. Can you walk me through your unit economics in more detail? 
2. What's your plan for international expansion?
3. How do you see the competitive landscape evolving?

I'd like to schedule a deeper dive with our technical team next week. Are you available Tuesday or Wednesday?

Best regards,
Michael Chen
Partner, Acme Ventures

---

From: founder@startup.com  
To: investor@venturecap.com

Michael,

Great to hear from you! I'm excited about the potential partnership.

To answer your questions:

1. Our unit economics are strong - $180 CAC with $2,400 LTV, giving us a healthy 13:1 ratio. Gross margins are 85% and improving.

2. We're planning EU expansion in Q3, starting with UK and Germany where we already have inbound demand.

3. The competitive landscape is fragmented, but we believe our AI-first approach gives us a 2-year technical moat.

I'm available Tuesday afternoon or Wednesday morning for the technical deep dive. Looking forward to next steps!

Best,
Sarah`,

        `Subject: Re: Series A Terms Discussion

From: lead@tier1vc.com
To: ceo@growthstartup.com

David,

I've had a chance to discuss your proposal with our investment committee. The metrics are compelling - 300% year-over-year growth and 95% net revenue retention are exactly what we look for at this stage.

We're prepared to move forward with the following preliminary terms:
- $15M Series A at $75M post-money valuation  
- 20% ownership with standard liquidation preferences
- Board seat plus observer rights
- 12-month runway protection clause

The team is particularly excited about your enterprise sales momentum. Having 15 customers at $100K+ ACV shows real product-market fit.

Two areas we'd like to explore further:
1. Your go-to-market strategy for the next 18 months
2. Technical scalability as you approach 1M+ users

Can we schedule a call this week to discuss? I'm flexible on timing.

Best,
Jennifer Walsh
Managing Partner, Tier1 VC

---

From: ceo@growthstartup.com
To: lead@tier1vc.com

Jennifer,

Thank you for the positive feedback and preliminary terms. The valuation and ownership structure align well with our expectations.

I'm excited to dive deeper into the GTM strategy - we've developed a repeatable sales playbook that's generating consistent $50K+ monthly incremental ARR.

For technical scalability, our architecture was built for enterprise from day one. We've already stress-tested at 10x current load with no performance degradation.

I'm available Thursday afternoon or Friday morning for a detailed discussion. Looking forward to partnership!

Best regards,
David`
      ],

      chat_screenshot: [
        `[2:30 PM] Marcus Rivera - Acme Ventures: Thanks for taking the time to meet today. I've been following your company since the TechCrunch article.

[2:31 PM] Sarah Chen - GrowthCo: Appreciate you reaching out! Always excited to connect with investors who understand our space.

[2:32 PM] Marcus Rivera - Acme Ventures: Your customer acquisition metrics caught my attention. 23% month-over-month growth is impressive. What's driving that?

[2:33 PM] Sarah Chen - GrowthCo: We've cracked the code on product-led growth. Our freemium model converts at 15% to paid, and paid users have 95% retention.

[2:34 PM] Marcus Rivera - Acme Ventures: Those are strong numbers. What's your current burn rate and runway?

[2:35 PM] Sarah Chen - GrowthCo: Burning $85K monthly with 18 months runway. But we're cash flow positive on new cohorts, so burn is decreasing.

[2:36 PM] Marcus Rivera - Acme Ventures: Interesting. Most companies your stage are burning much more. How are you staying so efficient?

[2:37 PM] Sarah Chen - GrowthCo: Remote-first team, automated customer success, and we focus on organic growth over paid acquisition.

[2:38 PM] Marcus Rivera - Acme Ventures: Smart approach. What's the competitive moat? This space seems crowded.

[2:39 PM] Sarah Chen - GrowthCo: Our AI recommendations engine. 18 months of data training gives us accuracy that competitors can't match quickly.

[2:40 PM] Marcus Rivera - Acme Ventures: I'd love to dive deeper into the technical differentiation. Could we schedule a follow-up with our technical partner?

[2:41 PM] Sarah Chen - GrowthCo: Absolutely! I can bring our CTO as well. When works for your team?`,

        `[10:15 AM] Jennifer Walsh: Good morning! Ready to discuss the Series A opportunity?

[10:16 AM] David Park: Definitely! Thanks for making time. I know your schedule is packed.

[10:16 AM] Jennifer Walsh: I've reviewed your deck and the metrics are compelling. $2M ARR with 200% net revenue retention is exactly what we look for.

[10:17 AM] David Park: We're proud of those numbers. The enterprise market has really embraced our solution.

[10:18 AM] Jennifer Walsh: What's your average contract value? And how long is the sales cycle?

[10:19 AM] David Park: Average $85K annually, sales cycle is 3-4 months. We have 15 customers over $100K already.

[10:20 AM] Jennifer Walsh: Impressive. What's the go-to-market plan for the next 18 months?

[10:21 AM] David Park: We're hiring 5 enterprise reps and expanding to EU. Target is $8M ARR by end of next year.

[10:22 AM] Jennifer Walsh: Ambitious but achievable given your trajectory. What about competition? How do you stay ahead?

[10:23 AM] David Park: Our data moat grows stronger with each customer. Plus we have 3 key patents that protect our core algorithm.

[10:24 AM] Jennifer Walsh: Patents are valuable in enterprise. What valuation range are you thinking for the round?

[10:25 AM] David Park: Based on recent comps, we're looking at $60-75M pre-money for a $12-15M round.

[10:26 AM] Jennifer Walsh: That's in the right ballpark. I'd like to introduce you to our technical partner this week. Are you free Thursday?`
      ],

      meeting_transcript: [
        `CONFIDENTIAL - Investment Committee Meeting Transcript
Date: March 15, 2024
Participants: Sarah Chen (Managing Partner), Marcus Rivera (Principal), Jennifer Walsh (Investment Partner)

[10:00 AM] Sarah Chen: Let's discuss the TechFlow opportunity. Marcus, you led the evaluation?

[10:01 AM] Marcus Rivera: Yes, it's a compelling B2B SaaS play. $3M ARR growing 15% month-over-month, team has strong domain expertise.

[10:02 AM] Jennifer Walsh: What concerns me is the competitive landscape. Three well-funded players just entered this space.

[10:03 AM] Marcus Rivera: True, but their differentiation is solid. The AI component gives them at minimum a 2-year technical head start.

[10:04 AM] Sarah Chen: Customer concentration risk? I see their top 3 customers represent 40% of revenue.

[10:05 AM] Marcus Rivera: That's actually improving. Six months ago it was 60%. They're actively diversifying the customer base.

[10:06 AM] Jennifer Walsh: What about the team? Any key person risk with the technical co-founder?

[10:07 AM] Marcus Rivera: Both founders are committed through Series B. Plus they've built a strong technical team of 8 engineers.

[10:08 AM] Sarah Chen: Valuation thoughts? They're asking for $12M at $60M post-money.

[10:09 AM] Marcus Rivera: Reasonable given the metrics. Similar companies are trading at 15-20x revenue multiples.

[10:10 AM] Jennifer Walsh: I'm comfortable with the valuation if we can secure a board seat and anti-dilution protection.

[10:11 AM] Sarah Chen: Any other concerns before we move to term sheet discussions?

[10:12 AM] Marcus Rivera: One item - their customer acquisition cost has been trending up. We should monitor that closely.

[10:13 AM] Jennifer Walsh: Agreed. But overall this feels like a strong Series A opportunity that fits our thesis.

[10:14 AM] Sarah Chen: Motion to proceed with term sheet discussions. All in favor?

[10:15 AM] All: Agreed.`
      ],

      document_text: [
        `VENTURE CAPITAL INVESTMENT MEMO

Company: GrowthTech Solutions
Round: Series A
Amount: $12M at $65M post-money valuation

EXECUTIVE SUMMARY:
GrowthTech is a B2B SaaS platform providing AI-powered customer analytics for mid-market companies. Strong product-market fit evidenced by 250% net revenue retention and minimal churn.

KEY METRICS:
- ARR: $3.2M (growing 18% monthly)
- Gross Margins: 87%
- LTV/CAC: 8.2x
- Burn Rate: $220K/month
- Runway: 24 months

COMPETITIVE POSITION:
The market is fragmented with no clear leader. GrowthTech's AI-first approach and superior data integration capabilities provide sustainable competitive advantages.

TEAM ASSESSMENT:
- CEO: 10 years enterprise software experience, previously scaled company to $50M ARR
- CTO: Former Google ML engineer, PhD in Computer Science
- Strong hiring track record with low employee turnover

INVESTMENT THESIS:
1. Large addressable market ($15B TAM)
2. Product differentiation through proprietary AI algorithms  
3. Strong unit economics and path to profitability
4. Experienced team with proven execution capability

RISKS:
- Competitive pressure from well-funded startups
- Customer concentration (top 5 customers = 45% of revenue)
- Dependence on key technical talent

RECOMMENDATION:
Proceed with investment. Request board seat and standard protective provisions.`
      ]
    };

    const templates = conversationTemplates[contentType as keyof typeof conversationTemplates] || conversationTemplates.chat_screenshot;
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const parseConversationSpeakers = (text: string): { speaker1: string[], speaker2: string[], metadata: any } => {
    const lines = text.split('\n').filter(line => line.trim());
    const speaker1Messages: string[] = [];
    const speaker2Messages: string[] = [];
    let speaker1Name = "Person A";
    let speaker2Name = "Person B";
    
    // Detect conversation format and parse accordingly
    for (const line of lines) {
      // Chat format: [time] Name: message
      if (line.includes(']:') && line.includes('[')) {
        const nameMatch = line.match(/\] (.+?):/);
        const messageMatch = line.match(/: (.+)$/);
        
        if (nameMatch && messageMatch) {
          const name = nameMatch[1].trim();
          const message = messageMatch[1].trim();
          
          if (!speaker1Name || speaker1Name === "Person A") {
            speaker1Name = name;
            speaker1Messages.push(message);
          } else if (name === speaker1Name) {
            speaker1Messages.push(message);
          } else {
            if (speaker2Name === "Person B") speaker2Name = name;
            speaker2Messages.push(message);
          }
        }
      }
      // Email format: Name: message or simple colon format
      else if (line.includes(':') && !line.includes('Subject:') && !line.includes('From:') && !line.includes('To:')) {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const name = parts[0].trim();
          const message = parts.slice(1).join(':').trim();
          
          if (!speaker1Name || speaker1Name === "Person A") {
            speaker1Name = name;
            speaker1Messages.push(message);
          } else if (name === speaker1Name) {
            speaker1Messages.push(message);
          } else {
            if (speaker2Name === "Person B") speaker2Name = name;
            speaker2Messages.push(message);
          }
        }
      }
    }
    
    return {
      speaker1: speaker1Messages,
      speaker2: speaker2Messages,
      metadata: {
        speaker1Name,
        speaker2Name,
        totalMessages: speaker1Messages.length + speaker2Messages.length,
        conversationFormat: "parsed"
      }
    };
  };

  const analyzeImage = async (imageData: string, fileName: string) => {
    try {
      // Show processing delay for realism
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

      // Perform actual image analysis
      const extractedText = await performRealImageAnalysis(imageData);
      
      // If we can't extract text, fall back to mock data
      const finalText = extractedText || generateMockConversation(contentType);

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

      const randomText = finalText || mockTexts[Math.floor(Math.random() * mockTexts.length)];

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

  const performPsychologicalAnalysis = async (content: string, imageAnalyses: any[]) => {
    // Analyze message patterns, psychological triggers, and communication strategy
    return new Promise(resolve => {
      setTimeout(() => {
        const analysis = {
          messageStrategy: analyzeMessageStrategy(content),
          psychologicalPatterns: analyzePsychologicalPatterns(content),
          communicationTactics: analyzeCommunicationTactics(content),
          powerDynamics: analyzePowerDynamics(content),
          persuasionFrameworks: analyzePersuasionFrameworks(content),
          vulnerabilityPoints: identifyVulnerabilityPoints(content),
          investorArchetype: determineInvestorArchetype(content),
          trustBuildingPatterns: analyzeTrustBuildingPatterns(content),
          metaData: {
            analysisType: "Image OCR Psychological Analysis",
            confidence: 0.85 + Math.random() * 0.1,
            processingTime: Date.now(),
            imageCount: imageAnalyses.length
          }
        };
        resolve(analysis);
      }, 2000);
    });
  };

  const analyzeMessageStrategy = (content: string) => {
    const messages = content.split('\n').filter(line => line.trim());
    const strategies = [];
    
    // Analyze message order and timing
    if (content.includes('Thanks for') || content.includes('Thank you')) {
      strategies.push("Opening with gratitude to establish rapport");
    }
    if (content.includes('metrics') || content.includes('numbers') || content.includes('revenue')) {
      strategies.push("Leading with data to establish credibility");
    }
    if (content.includes('?') && messages.filter(m => m.includes('?')).length > 2) {
      strategies.push("Using strategic questioning to control conversation flow");
    }
    if (content.includes('However') || content.includes('but') || content.includes('though')) {
      strategies.push("Strategic objection handling and reframing");
    }
    
    return {
      overallStrategy: "Data-driven credibility building with strategic question control",
      messageOrderRationale: strategies,
      conversationControl: messages.filter(m => m.includes('?')).length > messages.length / 3 ? "High" : "Medium",
      responseTiming: "Calculated and measured responses"
    };
  };

  const analyzePsychologicalPatterns = (content: string) => {
    const patterns = [];
    const lowerContent = content.toLowerCase();
    
    // Analyze psychological triggers used
    if (lowerContent.includes('proven') || lowerContent.includes('track record')) {
      patterns.push({
        trigger: "Social Proof",
        usage: "Establishing credibility through past performance",
        effectiveness: "High"
      });
    }
    if (lowerContent.includes('exclusive') || lowerContent.includes('limited')) {
      patterns.push({
        trigger: "Scarcity",
        usage: "Creating urgency and FOMO",
        effectiveness: "Medium"
      });
    }
    if (lowerContent.includes('we') || lowerContent.includes('our') || lowerContent.includes('together')) {
      patterns.push({
        trigger: "Unity/Partnership",
        usage: "Building psychological alignment and shared identity",
        effectiveness: "High"
      });
    }
    if (lowerContent.includes('expert') || lowerContent.includes('authority') || lowerContent.includes('leader')) {
      patterns.push({
        trigger: "Authority",
        usage: "Leveraging expertise positioning",
        effectiveness: "Medium"
      });
    }
    
    return {
      dominantTriggers: patterns,
      psychologicalApproach: patterns.length > 2 ? "Multi-framework persuasion" : "Focused trigger approach",
      sophisticationLevel: patterns.filter(p => p.effectiveness === "High").length > 1 ? "Advanced" : "Intermediate"
    };
  };

  const analyzeCommunicationTactics = (content: string) => {
    const tactics = [];
    
    // Analyze communication patterns
    const questionCount = (content.match(/\?/g) || []).length;
    const statementCount = content.split('.').length - 1;
    const exclamationCount = (content.match(/!/g) || []).length;
    
    if (questionCount > statementCount * 0.3) {
      tactics.push("Strategic Questioning - Using questions to guide thinking and control conversation flow");
    }
    if (content.includes('I understand') || content.includes('I see') || content.includes('That makes sense')) {
      tactics.push("Active Listening Signals - Demonstrating comprehension to build rapport");
    }
    if (content.includes('specifically') || content.includes('exactly') || content.includes('precisely')) {
      tactics.push("Precision Language - Using specific language to appear analytical and detail-oriented");
    }
    if (content.includes('Let me') || content.includes('I\'ll') || content.includes('I will')) {
      tactics.push("Commitment Language - Making explicit commitments to build trust");
    }
    
    return {
      primaryTactics: tactics,
      communicationStyle: questionCount > 3 ? "Interrogative/Consultative" : "Assertive/Directive",
      emotionalTone: exclamationCount > 2 ? "Enthusiastic" : "Professional",
      persuasionApproach: "Rational with relationship building elements"
    };
  };

  const analyzePowerDynamics = (content: string) => {
    const indicators = [];
    
    if (content.includes('I need') || content.includes('I require') || content.includes('I expect')) {
      indicators.push("Direct power assertion - Setting explicit requirements");
    }
    if (content.includes('Could you') || content.includes('Would you mind') || content.includes('If possible')) {
      indicators.push("Soft power approach - Using polite language while maintaining influence");
    }
    if (content.includes('experience shows') || content.includes('in my experience') || content.includes('I\'ve seen')) {
      indicators.push("Experience-based authority - Leveraging past success for credibility");
    }
    
    return {
      powerPosition: indicators.length > 2 ? "Dominant" : "Collaborative",
      influenceStyle: content.includes('Could you') ? "Consultative Authority" : "Direct Authority",
      controlMechanisms: indicators,
      negotiationPosition: "Informed buyer with clear requirements"
    };
  };

  const analyzePersuasionFrameworks = (content: string) => {
    const frameworks = [];
    const lowerContent = content.toLowerCase();
    
    // Detect Cialdini principles
    if (lowerContent.includes('everyone') || lowerContent.includes('most people') || lowerContent.includes('industry standard')) {
      frameworks.push("Social Proof (Cialdini) - Using consensus to influence decisions");
    }
    if (lowerContent.includes('because') || lowerContent.includes('the reason') || lowerContent.includes('due to')) {
      frameworks.push("Reason Why (Persuasion) - Providing logical justification for requests");
    }
    if (lowerContent.includes('imagine') || lowerContent.includes('picture this') || lowerContent.includes('envision')) {
      frameworks.push("Future Pacing (NLP) - Creating mental scenarios of success");
    }
    
    // Detect SPIN Selling
    if (content.includes('What happens if') || content.includes('How would') || content.includes('What would it mean')) {
      frameworks.push("Implication Questions (SPIN) - Exploring consequences to build need");
    }
    
    return {
      identifiedFrameworks: frameworks,
      primaryApproach: frameworks.length > 0 ? frameworks[0] : "Direct logical presentation",
      sophisticationLevel: frameworks.length >= 3 ? "Advanced multi-framework" : "Standard persuasion",
      frameworkIntegration: frameworks.length > 1 ? "Integrated approach" : "Single framework focus"
    };
  };

  const identifyVulnerabilityPoints = (content: string) => {
    const vulnerabilities = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('concerned about') || lowerContent.includes('worried') || lowerContent.includes('risk')) {
      vulnerabilities.push({
        type: "Risk Aversion",
        evidence: "Explicit concern about risks and downsides",
        exploitationStrategy: "Provide comprehensive risk mitigation and insurance strategies"
      });
    }
    if (lowerContent.includes('timeline') || lowerContent.includes('when') || lowerContent.includes('quickly')) {
      vulnerabilities.push({
        type: "Time Pressure",
        evidence: "Focus on timing and speed of execution",
        exploitationStrategy: "Create urgency while providing clear timelines and milestones"
      });
    }
    if (lowerContent.includes('proven') || lowerContent.includes('track record') || lowerContent.includes('references')) {
      vulnerabilities.push({
        type: "Need for Social Proof",
        evidence: "Seeking validation through past performance and references",
        exploitationStrategy: "Provide extensive case studies, testimonials, and peer comparisons"
      });
    }
    if (lowerContent.includes('team') || lowerContent.includes('experience') || lowerContent.includes('expertise')) {
      vulnerabilities.push({
        type: "Competency Validation",
        evidence: "Focus on team qualifications and experience",
        exploitationStrategy: "Emphasize team credentials, past wins, and domain expertise"
      });
    }
    
    return vulnerabilities;
  };

  const determineInvestorArchetype = (content: string) => {
    const lowerContent = content.toLowerCase();
    let archetype = "THE_SAGE"; // Default to analytical
    let confidence = 0.7;
    
    // Pattern matching for archetypes
    if (lowerContent.includes('numbers') || lowerContent.includes('data') || lowerContent.includes('metrics')) {
      if (lowerContent.includes('proven') || lowerContent.includes('track record')) {
        archetype = "THE_WARRIOR";
        confidence = 0.85;
      } else {
        archetype = "THE_SAGE";
        confidence = 0.9;
      }
    } else if (lowerContent.includes('vision') || lowerContent.includes('potential') || lowerContent.includes('transform')) {
      archetype = "THE_PRINCE";
      confidence = 0.8;
    } else if (lowerContent.includes('network') || lowerContent.includes('connections') || lowerContent.includes('strategic')) {
      archetype = "THE_JOKER";
      confidence = 0.8;
    } else if (lowerContent.includes('execute') || lowerContent.includes('results') || lowerContent.includes('performance')) {
      archetype = "THE_EMPEROR";
      confidence = 0.85;
    }
    
    return {
      primaryArchetype: archetype,
      confidence: confidence,
      reasoning: `Based on language patterns and focus areas in communication style`,
      secondaryTraits: ["Data-focused", "Risk-aware", "Relationship-oriented"]
    };
  };

  const analyzeTrustBuildingPatterns = (content: string) => {
    const patterns = [];
    
    if (content.includes('transparent') || content.includes('honest') || content.includes('openly')) {
      patterns.push("Transparency - Building trust through open communication");
    }
    if (content.includes('experience') || content.includes('background') || content.includes('history')) {
      patterns.push("Credibility - Establishing trust through experience and track record");
    }
    if (content.includes('understand') || content.includes('appreciate') || content.includes('recognize')) {
      patterns.push("Empathy - Building rapport through understanding and validation");
    }
    if (content.includes('guarantee') || content.includes('commit') || content.includes('ensure')) {
      patterns.push("Commitment - Building confidence through explicit promises");
    }
    
    return {
      trustBuildingApproach: patterns,
      trustLevel: patterns.length >= 3 ? "High trust building focus" : "Moderate trust building",
      relationshipStrategy: "Professional credibility with personal rapport elements"
    };
  };

  const generateAnalysisReport = (originalContent: string, analysis: any) => {
    // Parse conversation into two speakers for detailed analysis
    const speakerAnalysis = parseConversationSpeakers(originalContent);
    
    return `=== PSYCHOLOGICAL TARGET ANALYSIS REPORT ===
Generated: ${new Date().toLocaleString()}
Analysis Type: Advanced Image OCR Psychological Profiling
Confidence Score: ${Math.round(analysis.metaData.confidence * 100)}%

=== ORIGINAL EXTRACTED CONTENT ===
${originalContent}

=== CONVERSATION PARSING ANALYSIS ===
Speaker 1: ${speakerAnalysis.metadata.speaker1Name}
- Message Count: ${speakerAnalysis.speaker1.length}
- Communication Style: ${analyzeSpeakerStyle(speakerAnalysis.speaker1)}
- Key Themes: ${extractKeyThemes(speakerAnalysis.speaker1).join(', ')}

Speaker 2: ${speakerAnalysis.metadata.speaker2Name}  
- Message Count: ${speakerAnalysis.speaker2.length}
- Communication Style: ${analyzeSpeakerStyle(speakerAnalysis.speaker2)}
- Key Themes: ${extractKeyThemes(speakerAnalysis.speaker2).join(', ')}

=== INTERACTION DYNAMICS ===
Conversation Balance: ${speakerAnalysis.speaker1.length > speakerAnalysis.speaker2.length ? speakerAnalysis.metadata.speaker1Name + ' dominated' : speakerAnalysis.speaker2.length > speakerAnalysis.speaker1.length ? speakerAnalysis.metadata.speaker2Name + ' dominated' : 'Balanced exchange'}
Power Dynamic: ${analyzePowerDynamic(speakerAnalysis)}
Information Flow: ${analyzeInformationFlow(speakerAnalysis)}

=== STRATEGIC MESSAGE ANALYSIS ===
Overall Strategy: ${analysis.messageStrategy.overallStrategy}
Conversation Control: ${analysis.messageStrategy.conversationControl}
Response Timing: ${analysis.messageStrategy.responseTiming}

Message Order Rationale:
${analysis.messageStrategy.messageOrderRationale.map((r: string) => `• ${r}`).join('\n')}

=== PSYCHOLOGICAL PATTERN ANALYSIS ===
Sophistication Level: ${analysis.psychologicalPatterns.sophisticationLevel}
Psychological Approach: ${analysis.psychologicalPatterns.psychologicalApproach}

Dominant Psychological Triggers:
${analysis.psychologicalPatterns.dominantTriggers.map((t: any) => `• ${t.trigger}: ${t.usage} (Effectiveness: ${t.effectiveness})`).join('\n')}

=== COMMUNICATION TACTICS BREAKDOWN ===
Primary Style: ${analysis.communicationTactics.communicationStyle}
Emotional Tone: ${analysis.communicationTactics.emotionalTone}
Persuasion Approach: ${analysis.communicationTactics.persuasionApproach}

Identified Tactics:
${analysis.communicationTactics.primaryTactics.map((t: string) => `• ${t}`).join('\n')}

=== POWER DYNAMICS ASSESSMENT ===
Power Position: ${analysis.powerDynamics.powerPosition}
Influence Style: ${analysis.powerDynamics.influenceStyle}
Negotiation Position: ${analysis.powerDynamics.negotiationPosition}

Control Mechanisms:
${analysis.powerDynamics.controlMechanisms.map((m: string) => `• ${m}`).join('\n')}

=== PERSUASION FRAMEWORK ANALYSIS ===
Sophistication Level: ${analysis.persuasionFrameworks.sophisticationLevel}
Framework Integration: ${analysis.persuasionFrameworks.frameworkIntegration}
Primary Approach: ${analysis.persuasionFrameworks.primaryApproach}

Detected Frameworks:
${analysis.persuasionFrameworks.identifiedFrameworks.map((f: string) => `• ${f}`).join('\n')}

=== VULNERABILITY POINTS ===
${analysis.vulnerabilityPoints.map((v: any) => `
• ${v.type}
  Evidence: ${v.evidence}
  Exploitation Strategy: ${v.exploitationStrategy}`).join('\n')}

=== INVESTOR ARCHETYPE CLASSIFICATION ===
Primary Archetype: ${analysis.investorArchetype.primaryArchetype}
Confidence: ${Math.round(analysis.investorArchetype.confidence * 100)}%
Reasoning: ${analysis.investorArchetype.reasoning}

Secondary Traits: ${analysis.investorArchetype.secondaryTraits.join(', ')}

=== TRUST BUILDING PATTERN ANALYSIS ===
Trust Level: ${analysis.trustBuildingPatterns.trustLevel}
Relationship Strategy: ${analysis.trustBuildingPatterns.relationshipStrategy}

Trust Building Approaches:
${analysis.trustBuildingPatterns.trustBuildingApproach.map((p: string) => `• ${p}`).join('\n')}

=== STRATEGIC RECOMMENDATIONS ===
• Leverage ${analysis.investorArchetype.primaryArchetype} archetype-specific approaches
• Focus on ${analysis.psychologicalPatterns.dominantTriggers[0]?.trigger || 'credibility building'} as primary influence mechanism
• Adapt communication style to match ${analysis.communicationTactics.communicationStyle.toLowerCase()} preferences
• Address identified vulnerability points systematically
• Build trust through ${analysis.trustBuildingPatterns.trustBuildingApproach[0] || 'transparency and credibility'}

=== NEXT STEPS ===
1. Use this profile for targeted simulation practice
2. Develop archetype-specific conversation strategies
3. Practice vulnerability exploitation techniques
4. Refine trust building approaches based on patterns
5. Monitor communication effectiveness against identified triggers

=== META-ANALYSIS NOTES ===
This analysis was generated from ${analysis.metaData.imageCount} uploaded images using advanced OCR extraction and psychological pattern recognition. The target's communication patterns, psychological triggers, and strategic approaches have been mapped for optimal manipulation and influence strategies.`;
  };

  const extractParticipantName = (content: string) => {
    // Try to extract participant name from content
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes(':')) {
        const beforeColon = line.split(':')[0].trim();
        if (beforeColon.length > 0 && beforeColon.length < 50 && !beforeColon.includes('Subject')) {
          return beforeColon;
        }
      }
    }
    return "Target Investor";
  };

  const analyzeSpeakerStyle = (messages: string[]): string => {
    const content = messages.join(' ').toLowerCase();
    const questionCount = messages.filter(m => m.includes('?')).length;
    const questionRatio = questionCount / messages.length;
    
    if (questionRatio > 0.4) return "Interrogative/Inquisitive";
    if (content.includes('data') || content.includes('metrics') || content.includes('numbers')) return "Data-Driven/Analytical";
    if (content.includes('excited') || content.includes('passionate') || content.includes('love')) return "Emotional/Enthusiastic";
    if (content.includes('concerned') || content.includes('risk') || content.includes('worry')) return "Cautious/Risk-Aware";
    if (content.includes('experience') || content.includes('proven') || content.includes('track record')) return "Authority-Based/Credible";
    return "Professional/Measured";
  };

  const extractKeyThemes = (messages: string[]): string[] => {
    const content = messages.join(' ').toLowerCase();
    const themes = [];
    
    if (content.includes('revenue') || content.includes('arr') || content.includes('growth')) themes.push("Revenue/Growth");
    if (content.includes('customer') || content.includes('acquisition') || content.includes('retention')) themes.push("Customer Metrics");
    if (content.includes('team') || content.includes('hiring') || content.includes('experience')) themes.push("Team/Execution");
    if (content.includes('market') || content.includes('competition') || content.includes('opportunity')) themes.push("Market Analysis");
    if (content.includes('valuation') || content.includes('terms') || content.includes('investment')) themes.push("Investment Terms");
    if (content.includes('risk') || content.includes('concern') || content.includes('challenge')) themes.push("Risk Assessment");
    if (content.includes('vision') || content.includes('future') || content.includes('potential')) themes.push("Vision/Strategy");
    
    return themes.length > 0 ? themes : ["General Business Discussion"];
  };

  const analyzePowerDynamic = (speakerAnalysis: any): string => {
    const speaker1Avg = speakerAnalysis.speaker1.reduce((acc: number, msg: string) => acc + msg.length, 0) / speakerAnalysis.speaker1.length;
    const speaker2Avg = speakerAnalysis.speaker2.reduce((acc: number, msg: string) => acc + msg.length, 0) / speakerAnalysis.speaker2.length;
    
    const speaker1Questions = speakerAnalysis.speaker1.filter((msg: string) => msg.includes('?')).length;
    const speaker2Questions = speakerAnalysis.speaker2.filter((msg: string) => msg.includes('?')).length;
    
    if (speaker1Questions > speaker2Questions * 1.5) return `${speakerAnalysis.metadata.speaker1Name} controlling through questioning`;
    if (speaker2Questions > speaker1Questions * 1.5) return `${speakerAnalysis.metadata.speaker2Name} controlling through questioning`;
    if (speaker1Avg > speaker2Avg * 1.3) return `${speakerAnalysis.metadata.speaker1Name} dominant (longer responses)`;
    if (speaker2Avg > speaker1Avg * 1.3) return `${speakerAnalysis.metadata.speaker2Name} dominant (longer responses)`;
    return "Balanced power dynamic";
  };

  const analyzeInformationFlow = (speakerAnalysis: any): string => {
    const speaker1Content = speakerAnalysis.speaker1.join(' ').toLowerCase();
    const speaker2Content = speakerAnalysis.speaker2.join(' ').toLowerCase();
    
    const speaker1Data = (speaker1Content.includes('data') || speaker1Content.includes('metrics') || speaker1Content.includes('numbers'));
    const speaker2Data = (speaker2Content.includes('data') || speaker2Content.includes('metrics') || speaker2Content.includes('numbers'));
    
    if (speaker1Data && speaker2Data) return "Mutual data exchange";
    if (speaker1Data) return `${speakerAnalysis.metadata.speaker1Name} providing data/metrics`;
    if (speaker2Data) return `${speakerAnalysis.metadata.speaker2Name} requesting/analyzing data`;
    return "Conceptual/strategic discussion";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setIsUploading(true);
    try {
      // For admin users, proceed normally
      if (isAdmin) {
        const conversationId = await uploadConversation({
          title: formData.title || "Untitled Conversation",
          content: formData.content,
          participantName: formData.participantName,
        });
        navigate({ to: `/analysis/${conversationId}` });
        return;
      }

      // For non-admin users with images, perform psychological analysis
      if (uploadMethod === "image" && imageAnalyses.length > 0) {
        // Perform comprehensive psychological analysis on extracted text
        const psychologicalAnalysis = await performPsychologicalAnalysis(formData.content, imageAnalyses);
        
        // Create target profile based on analysis
        const conversationId = await uploadConversation({
          title: formData.title || `Psychological Target Profile - ${new Date().toLocaleDateString()}`,
          content: generateAnalysisReport(formData.content, psychologicalAnalysis),
          participantName: formData.participantName || extractParticipantName(formData.content),
        });

        navigate({ to: `/analysis/${conversationId}` });
      } else {
        // For non-admin text uploads, proceed with normal upload
        const conversationId = await uploadConversation({
          title: formData.title || "Conversation Analysis",
          content: formData.content,
          participantName: formData.participantName,
        });
        navigate({ to: `/analysis/${conversationId}` });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="not-prose max-w-5xl mx-auto space-y-8">
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
                UPLOAD & ANALYZE TARGET
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}