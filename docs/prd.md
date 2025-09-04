# SREF Mining Co - MVP Product Requirements Document

**Version:** 2.0  
**Date:** January 2025  
**Project:** SREF Mining Co MVP (Subframe-based)  
**Status:** Active Development

---

## Executive Summary

SREF Mining Co is a community-driven platform for discovering, collecting, and managing MidJourney Style Reference (SREF) codes. This MVP focuses on three core user experiences: discovering public SREF codes, favoriting preferred codes, and managing personal SREF libraries. The platform adopts a Pinterest-inspired interface with a mining company aesthetic, built using Subframe.com for sustainable UI development.

## Product Vision

To become the premier destination for MidJourney users to discover, organize, and share SREF codes, fostering a community of creative professionals who can efficiently find and manage style references for their AI-generated artwork.

## Target Users

### Primary Users
- **MidJourney Power Users**: Experienced users who frequently use SREF codes and need better organization
- **Digital Artists**: Professionals using MidJourney for client work who need reliable style references
- **Creative Professionals**: Designers, marketers, and content creators using AI art in their workflows

### Secondary Users
- **MidJourney Beginners**: New users learning about SREF codes and style consistency
- **AI Art Enthusiasts**: Hobbyists exploring different artistic styles through SREF codes

## Core Value Propositions

1. **Effortless Discovery**: Pinterest-style browsing of curated SREF codes
2. **Organized Collection**: Personal library management with search and tagging
3. **Community Curation**: Access to codes discovered and shared by other users
4. **Quick Access**: One-click copying of SREF codes for immediate use
5. **Visual Organization**: Bento box and masonry layouts for visual browsing

---

## MVP Feature Specifications

### 1. Core Pages

#### 1.1 Discover Page (Home)
**Purpose**: Primary landing page for discovering publicly available SREF codes

**Layout**: Pinterest-inspired bento box/masonry layout with search and filtering

**Features**:
- **Welcome Section** (Dismissible)
  - Brief app explanation for new users
  - Promotional content capability for future releases
  - Dismissible after first interaction

- **Search & Filter Header**
  - Full-width search field for keyword filtering
  - View toggle: Bento box (default) vs. Detailed card view
  - Filter by tags associated with SREF codes

- **SREF Card Grid**
  - Masonry/bento box layout displaying public SREF codes
  - Each card shows: SREF preview image, code snippet, title, tags
  - Like button (requires authentication)
  - Copy code button (requires authentication)

- **Authentication Prompts**
  - Modal window for unauthenticated users attempting to interact with cards
  - Clear call-to-action for account creation
  - Multiple entry points for registration

**User States**:
- **Unauthenticated**: Can browse and search, cannot interact with cards
- **Authenticated**: Full functionality including likes and code copying

#### 1.2 Favorites Page
**Purpose**: Personal collection of liked SREF codes from the Discover page

**Access**: Authenticated users only

**Features**:
- **Authentication Gate**
  - Modal prompt for unauthenticated users
  - Clear account creation pathway

- **Empty State**
  - Guidance to favorite codes on Discover page
  - Disabled search/filter UI as visual cue

- **Search & Filter**
  - Keyword search across favorited codes
  - Tag cloud showing top 10 most common tags
  - Expandable tag list (up to 50 tags)
  - Search recommendation for 50+ tags

- **Card Grid**
  - Same layout options as Discover page
  - Unlike functionality for removing favorites
  - Personal collection management

#### 1.3 Library Page
**Purpose**: Personal SREF code collection created and managed by the user

**Access**: Authenticated users only

**Features**:
- **Code Creation**
  - "Add SREF" button in header
  - Empty card at end of grid for quick addition
  - Modal form for new SREF entry

- **Personal Collection Management**
  - Full CRUD operations on personal codes
  - Same search and filtering as Favorites
  - Tag cloud based on personal collection

- **Empty State**
  - Prominent "Add SREF" call-to-action
  - Empty card visual cue
  - Guidance for getting started

### 2. Navigation System

#### 2.1 Left Sidebar Navigation (SideBarNavigation.tsx)
**Design**: Slim, icon-only vertical navigation spanning full page height

**Navigation Items**:
- **SREF Mining Co Logo** → Discover page (tooltip: "SREF Mining Company")
- **Compass Icon** → Discover page (tooltip: "Discover") - Active state indicator
- **Heart Icon** → Favorites page (tooltip: "Favorites") - Auth required
- **Books Icon** → Library page (tooltip: "Library") - Auth required
- **Gear Icon** → Settings menu (tooltip: "Settings and Support") - Bottom positioned

**Authentication Handling**:
- Unauthenticated users see modal prompts for protected pages
- Visual indicators for active page state

#### 2.2 Top Navigation (MainNavigation.tsx)
**Design**: Contextual header adapting to current page and authentication state

**Page-Specific Headers**:

**Discover Page (Unauthenticated)**:
- Full-width search field
- "Login" button (outlined)
- "Get Started" button (solid)

**Discover Page (Authenticated)**:
- Full-width search field
- User avatar with dropdown (Profile, Logout)

**Favorites Page (Authenticated Only)**:
- Full-width search field
- User avatar with dropdown

**Library Page (Authenticated Only)**:
- Full-width search field
- "Add SREF" button
- User avatar with dropdown

**Secondary Pages**:
- Search field (redirects to Discover when used)
- Authentication buttons or user avatar based on state

### 3. Authentication System

#### 3.1 Authentication Pages
- **Account Creation**: Email/password registration with validation
- **Login**: Email/password authentication
- **Password Reset**: Email-based password recovery
- **New Password Creation**: Secure password reset completion

#### 3.2 Authentication Flow
- Modal-based prompts for protected actions
- Seamless redirect after authentication
- Persistent login state across sessions
- Clear visual indicators for authentication requirements

### 4. Secondary Pages

#### 4.1 Content Pages
- **About Page**: Company information and mission
- **Privacy Policy**: Data handling and privacy commitments
- **Terms and Conditions**: Usage terms and legal requirements
- **FAQ Page**: Common questions and answers

#### 4.2 User Profile
- **Profile Management**: Basic user information
- **Waitlist Signup**: Email collection for paid tier (external management)
- **Account Settings**: Preferences and account management

---

## Technical Requirements

### 5. Technology Stack

#### 5.1 Frontend
- **Framework**: Next.js 14+ with App Router
- **UI Library**: Subframe.com component library
- **Styling**: Tailwind CSS with mining company theme
- **State Management**: React Context + Supabase client
- **Development**: Cursor IDE with Claude Code integration

#### 5.2 Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage for SREF images
- **API**: Next.js API routes + Supabase client

#### 5.3 Deployment
- **Hosting**: Vercel or Netlify
- **Domain**: Custom domain for SREF Mining Co
- **CDN**: Built-in CDN for image optimization

### 6. Database Schema

The authoritative database schema is maintained in the Supabase folder and is the single source of truth used by production:
- supabase/schema.sql
- supabase/migrations/

For a conceptual, non-SQL overview of entities and relationships, see docs/data-model.md.

### 7. API Endpoints

#### 7.1 SREF Codes
- `GET /api/sref-codes` - List public SREF codes with pagination
- `POST /api/sref-codes` - Create new SREF code (authenticated)
- `GET /api/sref-codes/[id]` - Get specific SREF code
- `PUT /api/sref-codes/[id]` - Update SREF code (owner only)
- `DELETE /api/sref-codes/[id]` - Delete SREF code (owner only)

#### 7.2 User Interactions
- `POST /api/sref-codes/[id]/like` - Toggle like status
- `POST /api/sref-codes/[id]/copy` - Record copy interaction
- `GET /api/users/favorites` - Get user's favorited codes
- `GET /api/users/library` - Get user's created codes

#### 7.3 Search & Filtering
- `GET /api/search` - Search SREF codes by keywords and tags
- `GET /api/tags` - Get popular tags for filtering

---

## User Experience Requirements

### 8. Design System

#### 8.1 Visual Theme
- **Aesthetic**: Industrial mining company with modern UI
- **Color Palette**: Mining-inspired colors (earth tones, metallics)
- **Typography**: Professional, readable fonts
- **Iconography**: Mining and industrial-themed icons where appropriate

#### 8.2 Layout Principles
- **Pinterest-Inspired**: Masonry/bento box layouts for visual browsing
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Visual Hierarchy**: Clear information architecture
- **Accessibility**: WCAG 2.1 AA compliance

#### 8.3 Component Library (Subframe)
- **Consistent Components**: Standardized UI elements
- **Reusable Patterns**: Common layouts and interactions
- **Theme Integration**: Mining company branding throughout
- **Maintainable Code**: Sustainable development practices

### 9. Performance Requirements

#### 9.1 Loading Performance
- **Initial Page Load**: \< 3 seconds on 3G connection
- **Image Loading**: Progressive loading with placeholders
- **Search Results**: \< 500ms response time
- **Infinite Scroll**: Smooth loading of additional content

#### 9.2 User Experience
- **Responsive Design**: Seamless experience across devices
- **Offline Capability**: Basic browsing of cached content
- **Error Handling**: Graceful degradation and error messages
- **Loading States**: Clear feedback during async operations

---

## Success Metrics

### 10. Key Performance Indicators

#### 10.1 User Engagement
- **Daily Active Users**: Target 100+ within first month
- **Session Duration**: Average 5+ minutes per session
- **Page Views per Session**: 3+ pages per visit
- **Return User Rate**: 40%+ weekly return rate

#### 10.2 Content Metrics
- **SREF Code Additions**: 50+ new codes per week
- **User-Generated Content**: 70%+ of codes from community
- **Favorite Actions**: 200+ favorites per week
- **Copy Actions**: 500+ code copies per week

#### 10.3 Growth Metrics
- **User Registration**: 20+ new users per week
- **Conversion Rate**: 15%+ visitor to user conversion
- **Organic Growth**: 30%+ growth from referrals
- **Community Engagement**: Active user participation in content creation

---

## Development Phases

### 11. MVP Development Timeline

#### Phase 1: Foundation (Weeks 1-2)
- **Project Setup**: Next.js + Subframe integration
- **Authentication**: Supabase auth implementation
- **Database Schema**: Core tables and relationships
- **Basic Navigation**: Sidebar and top navigation

#### Phase 2: Core Features (Weeks 3-4)
- **Discover Page**: Public SREF browsing with search
- **SREF Card Component**: Display and interaction logic
- **User Registration**: Account creation flow
- **Basic CRUD**: SREF code creation and management

#### Phase 3: User Features (Weeks 5-6)
- **Favorites System**: Like/unlike functionality
- **Library Page**: Personal SREF management
- **Search & Filtering**: Advanced search capabilities
- **Tag System**: Tag-based organization

#### Phase 4: Polish & Launch (Weeks 7-8)
- **UI Refinement**: Design system implementation
- **Performance Optimization**: Loading and caching
- **Testing**: User acceptance testing
- **Deployment**: Production launch preparation

---

## Risk Assessment & Mitigation

### 12. Technical Risks

#### 12.1 Subframe Integration
- **Risk**: Learning curve with new UI framework
- **Mitigation**: Thorough documentation review and component testing

#### 12.2 Performance at Scale
- **Risk**: Slow loading with large image collections
- **Mitigation**: Image optimization, lazy loading, and CDN implementation

#### 12.3 Search Performance
- **Risk**: Slow search with growing database
- **Mitigation**: Database indexing and search optimization

### 13. Business Risks

#### 13.1 User Adoption
- **Risk**: Low initial user engagement
- **Mitigation**: Community outreach and content seeding

#### 13.2 Content Quality
- **Risk**: Poor quality SREF submissions
- **Mitigation**: Community moderation and quality guidelines

#### 13.3 Competition
- **Risk**: Existing competitors with established user bases
- **Mitigation**: Unique value proposition and superior user experience

---

## Future Considerations

### 14. Post-MVP Features

#### 14.1 Enhanced Features
- **Collections**: Curated SREF code collections
- **Social Features**: User profiles and following
- **Advanced Search**: AI-powered content discovery
- **Mobile App**: Native mobile application

#### 14.2 Monetization
- **Premium Tiers**: Advanced features for power users
- **SREF Packs**: Curated premium collections
- **API Access**: Developer API for third-party integrations
- **Educational Content**: Tutorials and courses

#### 14.3 Community Features
- **User Ratings**: Community-driven quality scoring
- **Comments**: Discussion on SREF codes
- **Challenges**: Community discovery challenges
- **Leaderboards**: Top contributors and discoverers

---

## Conclusion

This PRD defines a focused MVP for SREF Mining Co that prioritizes core user needs while maintaining a sustainable development approach. The Subframe-based architecture ensures maintainable UI development, while the Pinterest-inspired design provides an intuitive user experience for visual content discovery.

The three-page structure (Discover, Favorites, Library) creates a clear user journey from discovery to personal organization, with authentication gating that encourages user registration while allowing exploration of the platform's value proposition.

Success will be measured through user engagement metrics, content creation, and community growth, with a clear path for post-MVP feature development and monetization strategies.

---

**Document Prepared By**: AI Assistant  
**Review Required**: Product Owner, Technical Lead  
**Next Review Date**: Weekly during development phases

