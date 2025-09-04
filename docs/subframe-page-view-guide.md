# Subframe Page Design Guide

## Page View Migration Protocol

**Temporary Staging Folder Usage:**
- All manually migrated page views from Subframe should be saved in a `/staging` directory at the root level of the project, outside of the primary routing structure (`/app` or `/pages`).
- Filenames in this folder should be descriptive and indicate intent but do not need to follow strict routing conventions at this stage (e.g., `dashboard-view.tsx`, `account-settings.tsx`).

**Agent-Assisted Organization Process:**
1. **Analyze Staging Files:**
   - Agents must review each file in `/staging`, determining the target route, main functionality, and which Subframe components are used.
2. **Deduplicate and Refactor:**
   - If multiple staging page views handle similar logic or UI, agents should merge them or refactor for efficiency, always favoring Subframe components for shared UI elements.
3. **Structure Integration:**
   - Move each page into the proper `/app` (or `/pages`) subdirectory, renaming files according to Next.js conventions, such as `app/feature-name/page.tsx`.
   - If a route needs dynamic data, apply Next.js dynamic routing patterns (e.g. `app/profile/[id]/page.tsx`).
4. **Documentation and Review:**
   - Comment each migrated file with route details, special behaviors, or questions for manual review.
   - Flag any logic that may be redundant or unclear for designer feedback before deleting or refactoring further.
5. **Testing:**
   - Test each migrated route to ensure UI fidelity, routing accuracy, and proper use of Subframe components.

**Essential Guidelines:**
- **Never modify Subframe components directly.** Agents must always privilege Subframe-driven design and rely solely on composition for page routing and logic integration.
- **Maintain clarity.** Staging files must be clearly documented, and all migration actions should be trackable for designer review.
- **Request guidance where needed.** Agents should ask for clarification on ambiguous routes or non-standard logic before moving files to production routing folders.
- **Iterate as needed.** Designer feedback on agent actions should be incorporated before final deletion of any staging resources.

***

**This protocol enables efficient migration, organized project scaling, and clear separation of concerns—making Subframe the design system authority while agents optimize your Next.js page implementations for production**[1][2][3].

Sources
[1] Next.js: Best Way to Organize Your Project Structure - DEV Community https://dev.to/jonathan-dev/nextjs-best-way-to-organize-your-project-structure-25o6
[2] My experience migrating projects to Next.js - DEV Community https://dev.to/rinatrezyapov/my-experience-migrating-projects-to-next-js-2hld
[3] Next.js - Migrate from Pages to App Router - Reflections https://annjose.com/post/nextjs-migrate-pages-app-router/
