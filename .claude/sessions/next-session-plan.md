# Next Development Session Plan (3-5 Days)

## Current State Analysis
- **Database**: Users table only has basic fields (id, username, email, tier, waitlist_status) - missing profile data
- **UI Components**: Subframe already provides `EditProfileDialog`, `SampleUserProfile`, `PublicUserProfile` (in staging)
- **Routes**: No `/profile` or `/account` pages exist yet
- **Performance**: Minimal Next.js config, no optimizations implemented
- **Email**: No newsletter integration or email capture

## Priority 1: User Profile System (Day 1-2)
**Database Schema Migration:**
- Add fields to users table: `profile_image_url`, `bio`, `job_title`, `display_name`, `newsletter_opt_in`
- Create RLS policies for profile updates
- Add Supabase Storage bucket for profile images

**Profile Pages & API:**
- Create `/profile` route with functional EditProfile page
- Build profile API endpoints (GET/PUT /api/profile) 
- Integrate existing `EditProfileDialog` with real data
- Add profile image upload functionality
- Connect profile dropdown menu item to profile page

## Priority 2: Performance Optimization (Day 2-3)
**Next.js Optimizations:**
- Add image optimization config
- Implement dynamic imports for heavy components
- Add loading states and skeleton screens
- Consider implementing ISR for discover page
- Bundle analysis and code splitting

## Priority 3: Account Settings & Email (Day 3-4)
**Account Management:**
- Create `/account` or `/settings` route
- Newsletter opt-in checkbox in account settings
- Basic email preferences management
- Account deletion/deactivation flow

**Email Integration Setup:**
- Research n8n integration options
- Set up basic newsletter signup endpoint
- Choose email provider (ConvertKit, Mailchimp, etc.)
- Create webhook endpoints for n8n

## Priority 4: Subscription Strategy (Day 4-5) 
**Decision Point: Waitlist vs Stripe**
**Recommendation: Start with waitlist** - faster to implement, validate demand first

**If Waitlist:**
- Enhanced waitlist page with feature previews
- Admin dashboard for waitlist management
- Email sequence for waitlist members

**If Stripe (Later Phase):**
- Stripe integration research
- Subscription tiers setup
- Payment flow implementation

## Success Metrics
- Profile creation/editing works end-to-end
- Page load times improved (measure before/after)
- Newsletter signup functional
- Clear path to monetization established

## Questions to Confirm
1. Profile image storage preference? (Supabase Storage vs Cloudinary vs S3)
2. Email provider preference for newsletters?
3. Waitlist vs immediate Stripe implementation?
4. Any specific performance pain points to prioritize?