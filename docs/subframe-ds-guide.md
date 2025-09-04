# SMC Agent Guidance: Subframe Design System

## Component Handling Rules

- **Subframe Components Are Off-Limits:**  
	  Agents must **not directly modify** any components exported from Subframe in the codebase.
- **Change Requests Protocol:**  
	  If a Subframe component needs to be altered, the agent must **prompt the designer (user) to make the update in Subframe**, then resync to code.
- **Sync Source of Truth:**  
	  The design system in Subframe is the authoritative source; codebase should always reflect the latest Subframe sync.

## Extending Component Functionality Safely

- **Non-Destructive Extension Pattern:**  
  - Use wrapper components: Extend functionality by creating new components that wrap Subframe exports, rather than altering their internals.
  - Leverage composition: Inject new features through props, children, or HOCs (Higher-Order Components) without changing the original component code[4].  
  - Employ variant/prop-driven design within Subframe to handle most new behaviors[2][3].
- **Sync-Disable Annotation:**  
	  For rare cases where local custom code is required, mark the file with `// @subframe/sync-disable` so it’s not overwritten—but document this exception and only use after approval.

## Subframe Workflow for Maintainability

Before coding changes or extending a component, agents should walk the designer through these steps in Subframe:

1. **Identify Desired Functional Changes:**  
   2. List the exact new behaviors or states (e.g., new prop, complex edit mode).
2. **Edit in Subframe:**  
   4. Adjust or extend the component within Subframe, making use of state, props, and variants to encapsulate new logic.
3. **Validate via Preview:**  
   6. Use Subframe’s built-in preview and testing tools to ensure desired UX and UI.
4. **Resync:**  
   8. Export/sync updated components to the codebase to keep everything unified.
5. **Confirm Success:**  
   10. Check the UI to verify the synced changes behave as expected.

## Agent Decision Checklist

- If faced with required component changes:
  - ❌ Do not edit Subframe component code directly
  - ✅ Prompt designer to update within Subframe instead
  - ✅ Resync code after Subframe changes
  - ✅ Use wrapper/component composition for any logic needing extension
  - ✅ Document exceptions marked with sync-disable

## Partnership Commitment

Agents and designers must strictly follow this protocol to ensure the integrity, maintainability, and unified evolution of the SMC app’s UI and design system.  
Agents are responsible for guiding designers on Subframe edits whenever component changes arise and must help ensure a smooth, law-abiding workflow at all times[1][2][3][4].

---- 

This document can be added to your repository as `AGENT_GUIDANCE_SUBFRAME.md` to clarify responsibilities and workflow for all project collaborators[1][2][3][4].

Sources
[1] Best practices for exporting code - Subframe Help Center https://help.subframe.com/en/articles/9792540-best-practices-for-exporting-code
[2] Using components - Subframe Docs https://subframe-59800133.mintlify.app/using-components
[3] Subframe 101: Getting started with design, code, and AI - YouTube https://www.youtube.com/watch?v=xUFxr6jpBXg
[4] Extensibility: Designing for Future Growth in Software Architecture https://buildsimple.substack.com/p/extensibility-designing-for-future
[5] [PDF] LEADING EDGE OF SUB-FRAME - Transport Certification Services https://transportengineer.com/wp-content/uploads/2021/11/Leading-Edge-of-Sub-Frame-2018.pdf
[6] Design with AI using your design system – with Subframe - YouTube https://www.youtube.com/watch?v=5LVsV5pxFww
[7] Front Subframe Replacement - Mazda 6 Forums https://www.mazda6club.com/threads/front-subframe-replacement.449015/
[8] SFR Genesis Coupe Subframe Rigid Collar Kit Installation Guide https://www.youtube.com/watch?v=6gY1JJXuooc
[9] 5.1.6 Frames (393.201) - CSA Compliance, Safety, Accountability https://csa.fmcsa.dot.gov/safetyplanner/MyFiles/SubSections.aspx?ch=22&sec=64&sub=135
[10] [PDF] Chapter 4 Simple Patterns for Extensibility http://st.inf.tu-dresden.de/files/teaching/ws14/dpf/04-dpf-simple-extensibility.pdf
[11] [PDF] Installation Instructions - Suspa https://www.suspa.com/downloads/SUSPA\_ELS\_HD\_subframe\_EN.pdf
[12] SUBFRAME AI - The LAZIEST Way to Build UI/UX Design With AI https://www.youtube.com/watch?v=t7eB1Gs\_OP8
