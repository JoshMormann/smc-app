# Documentation Index

This directory contains comprehensive documentation for the SREF Mining Co project. Use this index to quickly find the information you need.

## Quick Start (New Agents/Developers)

**Start here for immediate context:**
1. 📋 [Quick Reference](./quick-reference.md) - Essential commands, patterns, and file locations
2. 🤖 [Agents Guide](./agents-guide.md) - Key constraints and expectations for AI agents
3. 🚀 [Environment Setup](./env-setup.md) - Get your development environment running

## Project Overview

### Business Context
- 📊 [Product Requirements Document (PRD)](./prd.md) - Complete product specification and business requirements
- 🎯 [MVP Feature Set](./mvp.md) - Core features for minimum viable product
- 📈 [Migration Plan](./migration-plan.md) - Transition from legacy system

### Architecture & Design
- 🏗️ [Architecture Overview](./architecture.md) - System components, data flow, and technical decisions
- 🧩 [Component Architecture](./component-architecture.md) - UI component organization and patterns
- 🗄️ [Data Model](./data-model.md) - Database schema and relationships overview

## Development Guides

### Workflow & Process
- 🔄 [Development Workflow](./dev-workflow.md) - Step-by-step processes for common development tasks
- 🤝 [Agent Handoff Template](./agent-handoff.md) - Template for smooth transitions between agents/sessions
- 🐛 [Common Issues & Solutions](./common-issues.md) - Troubleshooting guide for frequent problems

### Technical Implementation
- 🎨 [Subframe Design System Guide](./subframe-ds-guide.md) - Working with Subframe components safely
- 🔧 [Subframe Page View Guide](./subframe-page-view-guide.md) - Page-level component patterns
- 🛠️ [Subframe Troubleshooting](./subframe-troubleshooting.md) - Fixing Subframe-related issues
- 🗃️ [Supabase Guide](./supabase-guide.md) - Database operations, RLS, and best practices
- ⚠️ [Error Handling](./error-handling.md) - Comprehensive error handling strategies
- 🚀 [Netlify Deployment](./netlify-deployment.md) - Deployment configuration and processes

## When to Use Each Document

### 🆕 Starting a New Session
**Always include:**
- [Quick Reference](./quick-reference.md) - Core patterns and commands
- [Agents Guide](./agents-guide.md) - Project constraints and rules

### 🎨 UI/Component Work
**Include:**
- [Subframe Design System Guide](./subframe-ds-guide.md) - Component modification rules
- [Component Architecture](./component-architecture.md) - Organization patterns
- [Subframe Troubleshooting](./subframe-troubleshooting.md) - If issues arise

### 🗄️ Database/API Work
**Include:**
- [Data Model](./data-model.md) - Schema and relationships
- [Supabase Guide](./supabase-guide.md) - Database operations and RLS
- [Error Handling](./error-handling.md) - Proper error patterns

### 🚀 Feature Development
**Include:**
- [Development Workflow](./dev-workflow.md) - Step-by-step process
- [Architecture Overview](./architecture.md) - System understanding
- Relevant spec files from `.kiro/specs/`

### 🐛 Debugging Issues
**Include:**
- [Common Issues & Solutions](./common-issues.md) - Known problems and fixes
- [Error Handling](./error-handling.md) - Error patterns and debugging
- Technology-specific guides (Subframe, Supabase, etc.)

### 🔄 Agent Transitions
**Use:**
- [Agent Handoff Template](./agent-handoff.md) - Structured transition format
- [Development Workflow](./dev-workflow.md) - Context on current processes

### ⚙️ Environment Setup
**Use:**
- [Environment Setup](./env-setup.md) - Complete setup instructions
- [Netlify Deployment](./netlify-deployment.md) - Deployment configuration

## Document Maintenance

### Keeping Documentation Current
- Update docs when making architectural changes
- Add new common issues as they're discovered
- Keep quick reference current with latest patterns
- Update workflow docs when processes change

### Documentation Standards
- Use clear, actionable language
- Include code examples where helpful
- Maintain consistent formatting
- Cross-reference related documents
- Keep examples up-to-date with current codebase

## Context Optimization for Agents

### Essential Context (Always Include)
```
docs/quick-reference.md
docs/agents-guide.md
```

### Feature-Specific Context
```
# For new features
.kiro/specs/{feature-name}/requirements.md
.kiro/specs/{feature-name}/design.md
.kiro/specs/{feature-name}/tasks.md

# For UI work
docs/subframe-ds-guide.md
docs/component-architecture.md

# For database work
docs/data-model.md
docs/supabase-guide.md
```

### Troubleshooting Context
```
docs/common-issues.md
docs/error-handling.md
# Plus technology-specific guides as needed
```

## Project Structure Reference

```
docs/
├── README.md                     # This index file
├── quick-reference.md           # Essential commands and patterns
├── agents-guide.md              # AI agent constraints and expectations
├── env-setup.md                 # Environment configuration
├── dev-workflow.md              # Development processes
├── common-issues.md             # Troubleshooting guide
├── agent-handoff.md             # Transition template
├── prd.md                       # Product requirements
├── mvp.md                       # MVP feature set
├── architecture.md              # System architecture
├── component-architecture.md    # UI component patterns
├── data-model.md               # Database schema overview
├── subframe-ds-guide.md        # Subframe component rules
├── subframe-page-view-guide.md # Page component patterns
├── subframe-troubleshooting.md # Subframe issue fixes
├── supabase-guide.md           # Database operations
├── error-handling.md           # Error handling patterns
├── migration-plan.md           # Legacy system transition
└── netlify-deployment.md       # Deployment configuration
```

## Contributing to Documentation

### Adding New Documentation
1. Follow existing naming conventions
2. Update this index with new files
3. Cross-reference related documents
4. Include practical examples
5. Keep language clear and actionable

### Updating Existing Documentation
1. Maintain backward compatibility in examples
2. Update cross-references if structure changes
3. Keep quick reference current
4. Test examples with current codebase
5. Update modification dates

---

**Last Updated**: January 2025  
**Maintained By**: Development Team  
**Review Frequency**: Weekly during active development