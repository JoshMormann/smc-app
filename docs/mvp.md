# MVP Feature Set
## Pages (all accessible via left hand vertical navigation)

**Primary Pages:**

### 1. Discover Page (Home)
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

### 2. Favorites Page
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

### 3. Library Page
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

## Secondary Pages

### Authentication Pages
- **Account Creation**: Email/password registration with validation
- **Login**: Email/password authentication
- **Password Reset**: Email-based password recovery
- **New Password Creation**: Secure password reset completion

### Content Pages
- **About Page**: Company information and mission
- **Privacy Policy**: Data handling and privacy commitments
- **Terms and Conditions**: Usage terms and legal requirements
- **FAQ Page**: Common questions and answers

### User Profile
- **Profile Management**: Basic user information
- **Waitlist Signup**: Email collection for paid tier (external management)
- **Account Settings**: Preferences and account management

## Navigation System

### Left Sidebar Navigation (SideBarNavigation.tsx)
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

### Top Navigation (MainNavigation.tsx)
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