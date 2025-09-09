# Agent Handoff Template

Use this template when transitioning work between different agents or sessions to ensure smooth continuity.

## Current Context

### Working On
**Feature/Task**: [Name of current feature or task]
**Spec Location**: [Path to spec file if applicable, e.g., `.kiro/specs/feature-name/`]
**Phase**: [Requirements/Design/Implementation/Testing/Complete]

### Last Completed
**What was finished**:
- [Specific task or milestone completed]
- [Files created or modified]
- [Tests that passed]
- [User approvals received]

**Status**: [In Progress/Blocked/Ready for Review/Complete]

### Next Step
**Immediate next action**:
- [Specific next task to execute]
- [Dependencies that need to be resolved]
- [User input required]

### Current Blockers
**Issues preventing progress**:
- [Technical blockers with details]
- [Missing information or decisions needed]
- [External dependencies]
- [User approval pending]

## Technical Context

### Key Files Modified
**In this session**:
- `path/to/file.ts` - [Brief description of changes]
- `path/to/component.tsx` - [What was added/modified]
- `docs/file.md` - [Documentation updates]

**Files to focus on next**:
- `path/to/next/file.ts` - [Why this needs attention]
- `component/to/create.tsx` - [What needs to be built]

### Database Changes
**Schema modifications**:
- [Migration files created]
- [Tables/columns added or modified]
- [RLS policies updated]

**Data considerations**:
- [Important data relationships]
- [Auth/permission requirements]
- [Performance considerations]

### API Changes
**Endpoints modified**:
- `GET /api/endpoint` - [What was changed]
- `POST /api/new-endpoint` - [What was added]

**Still needed**:
- [API endpoints to create]
- [Error handling to add]
- [Validation to implement]

## Testing Notes

### What Was Tested
**Manual testing completed**:
- [Feature functionality verified]
- [Error states tested]
- [Auth flows checked]
- [UI responsiveness verified]

**Results**:
- ✅ [What works correctly]
- ❌ [What still has issues]
- ⚠️ [What needs more testing]

### What Still Needs Testing
**Pending verification**:
- [Specific functionality to test]
- [Edge cases to verify]
- [Integration points to check]
- [Performance to validate]

**Test scenarios**:
1. [Step-by-step test case]
2. [Another test scenario]
3. [Edge case to verify]

## Implementation Decisions

### Technical Choices Made
**Architecture decisions**:
- [Why certain patterns were chosen]
- [Trade-offs considered]
- [Performance implications]

**Component decisions**:
- [Subframe components used]
- [Custom components created]
- [Styling approaches taken]

**Data flow decisions**:
- [State management choices]
- [API design decisions]
- [Caching strategies]

### Alternatives Considered
**Options evaluated**:
- [Alternative approach 1] - [Why not chosen]
- [Alternative approach 2] - [Trade-offs]

## User Interactions

### Approvals Received
**Requirements**: [✅/❌/Pending] - [Date/notes]
**Design**: [✅/❌/Pending] - [Date/notes]
**Tasks**: [✅/❌/Pending] - [Date/notes]
**Implementation**: [✅/❌/Pending] - [Date/notes]

### Feedback Incorporated
**User requests**:
- [Specific feedback received]
- [How it was addressed]
- [Changes made based on feedback]

### Pending User Input
**Waiting for**:
- [Specific decisions needed from user]
- [Approvals required]
- [Clarifications needed]

## Environment & Setup

### Current Environment
**Development setup**:
- Node.js version: [version]
- Package manager: [npm/yarn/pnpm]
- Database: [local/remote Supabase]
- Branch: [git branch name]

**Environment variables**:
- [Any new variables added]
- [Configuration changes made]
- [Secrets that need to be set]

### Dependencies
**Packages added**:
- [New dependencies installed]
- [Version updates made]
- [Dev dependencies added]

**External services**:
- [Supabase configuration]
- [Netlify settings]
- [Third-party integrations]

## Notes for Next Agent

### Important Context
**Critical information**:
- [Key business logic to understand]
- [Important constraints or requirements]
- [User preferences or patterns established]

### Areas Needing Attention
**Code quality**:
- [Areas that might need refactoring]
- [Performance concerns]
- [Security considerations]

**Documentation**:
- [Docs that need updating]
- [Comments that need adding]
- [Examples that need creating]

### Gotchas & Warnings
**Things to watch out for**:
- [Common pitfalls in this codebase]
- [Specific bugs or issues encountered]
- [Subframe component limitations]
- [RLS policy quirks]

### Recommended Next Steps
**Suggested approach**:
1. [First thing to do]
2. [Second priority]
3. [Third step]

**Resources to reference**:
- [Specific docs to read]
- [Code examples to follow]
- [Patterns to maintain]

## Quick Commands

### Useful Commands for This Context
```bash
# Start development
npm run dev

# Run specific tests
npm test -- --testNamePattern="feature"

# Database operations
supabase migration new "description"
supabase db reset

# Build and deploy
npm run build
netlify deploy
```

### File Locations
```
Key files for this feature:
- Requirements: .kiro/specs/feature/requirements.md
- Design: .kiro/specs/feature/design.md  
- Tasks: .kiro/specs/feature/tasks.md
- Main component: components/feature/FeatureComponent.tsx
- API route: app/api/feature/route.ts
- Database: supabase/migrations/latest.sql
```

---

## Handoff Checklist

Before transitioning to next agent:

- [ ] Current status clearly documented
- [ ] Next steps identified and prioritized
- [ ] Blockers clearly stated
- [ ] Key files and changes listed
- [ ] Testing status documented
- [ ] User feedback incorporated
- [ ] Environment setup documented
- [ ] Important context shared
- [ ] Gotchas and warnings noted
- [ ] Recommended approach outlined

**Handoff Date**: [Date]
**From Agent**: [Previous agent/session identifier]
**To Agent**: [Next agent/session identifier]