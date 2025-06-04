# Claude Code Session Notes

## Session Information
- Started: 6/3/2025
- Starting commit: f05184c Initial commit
- Current status: Initializing new application from template

## Current Step: Requirements Gathering (Step 1)
**If starting a fresh session: Reread the project:init-app command file for full context**

## App Initialization Progress
- [ ] Gather requirements from user
- [ ] Document app requirements
- [ ] Remove template instructions
- [ ] Plan MVP implementation
- [ ] Remove demo content
- [ ] Implement MVP
- [ ] Test implementation

## App Requirements: NLP Communication Analyzer & Simulator

### Core Concept
A neurolinguistic programming-based analysis tool that examines communication patterns to identify psychological games, archetypes, and communication styles, then provides strategic interaction advice.

### Key Features Required

#### 1. Chat/Email Upload & Analysis
- Upload chat history or email conversations
- Text analysis engine for NLP patterns
- Meta-analysis of psychological "games" being played
- Identification of subconscious word choice patterns

#### 2. Perceptual Modality Detection
- Visual indicators (words like "see", "look", "picture")
- Auditory indicators (words like "hear", "sounds", "listen") 
- Kinesthetic indicators (words like "feel", "touch", "grasp")
- Classification of primary perceptual modality

#### 3. Personality Profiling
- Subcategorization based on communication patterns
- Analysis of attention movement patterns
- Positioning analysis (how they position themselves in interactions)
- Needs assessment based on identified patterns

#### 4. Strategic Response Generation
- Personalized compliment suggestions
- Communication advice tailored to their profile
- Response formulation in their preferred reality modeling language
- Interaction strategy recommendations

#### 5. Chat War Room Simulator
- AI representation of analyzed person
- Communication style simulation
- Practice interaction environment
- Real-time coaching based on their profile

### Target Users
People seeking to understand and improve their interpersonal communication effectiveness through NLP principles.

### Core User Flow
1. Upload conversation → 2. Receive analysis → 3. Get interaction strategies → 4. Practice in simulator

## MVP Implementation Plan
**Priority: Analysis and Profiling Features First**

### Phase 1: Core Analysis Engine
1. **Data Models** (Convex schema)
   - Conversations: store uploaded text, metadata
   - Profiles: perceptual modalities, personality patterns, needs assessment
   - Analysis Results: word usage patterns, attention patterns, positioning analysis
   - Strategic Recommendations: compliments, communication advice

2. **NLP Analysis Engine**
   - Perceptual modality detection (Visual/Auditory/Kinesthetic word patterns)
   - Attention movement pattern analysis
   - Psychological positioning identification
   - Subconscious word choice pattern recognition

3. **Upload & Processing Workflow**
   - Text input interface (chat/email upload)
   - Real-time analysis processing
   - Profile generation and storage

4. **Results & Recommendations**
   - Profile visualization
   - Strategic compliment generation
   - Communication advice tailored to their modality
   - Needs assessment display

### Phase 2: Later Features
- Chat war room simulator
- Advanced archetype classification
- Extended game theory analysis

## Current Session Progress
- [x] Requirements gathered and documented
- [x] Template instructions removed
- [x] MVP implementation completed

## Implementation Summary
**Core Features Implemented:**
1. **Data Models**: Complete Convex schema for conversations, analyses, and recommendations
2. **NLP Analysis Engine**: Perceptual modality detection (Visual/Auditory/Kinesthetic), psychological games analysis, attention patterns
3. **Upload System**: Text paste and file upload functionality
4. **Analysis Display**: Comprehensive analysis results with strategic recommendations
5. **Strategic Recommendations**: Tailored compliments, communication tips, language matching

**Technical Architecture:**
- Frontend: React + TanStack Router + DaisyUI
- Backend: Convex with separate action files for Node.js functions
- Authentication: Clerk integration
- Database: Structured tables for conversations, analyses, recommendations

**Key Files Created/Modified:**
- `convex/schema.ts`: Complete data model
- `convex/conversations.ts`: CRUD operations for conversations
- `convex/analysis.ts`: Mutations and queries for analysis
- `convex/analysisActions.ts`: Node.js action for NLP processing
- `src/routes/upload.tsx`: Upload interface
- `src/routes/analysis.$conversationId.tsx`: Analysis display
- `src/routes/index.tsx`: Dashboard with conversation list

**Working Features:**
✅ Authentication flow (Clerk modal working)
✅ Backend deployment successful
✅ Frontend UI responsive and styled
✅ NLP analysis engine with pattern matching
✅ Strategic recommendation generation

**Next Phase Features (Future):**
- Chat war room simulator
- Advanced archetype classification
- Extended game theory analysis
- Public route access for upload page