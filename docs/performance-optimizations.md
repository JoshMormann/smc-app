# Performance Optimization Backlog

This document tracks identified performance enhancement opportunities for future implementation.

## Database Query Optimizations

### 1. Move SREF Code Deduplication to Database Level

**Status:** 🟡 Identified - Ready for Implementation  
**Priority:** Medium  
**Estimated Impact:** Moderate performance improvement for discover page  
**Implementation Date:** TBD

**Current State:**
- Client-side deduplication of SREF codes in `/app/discover/page.tsx`
- Fetches 50 records, filters to 20 unique codes in JavaScript
- Works correctly but requires over-fetching data

**Proposed Enhancement:**
- Deploy PostgreSQL function `get_latest_sref_codes()` already created in migration file
- Migration file: `supabase/migrations/20250911000001_add_get_latest_sref_codes_function.sql`
- Function uses window functions (ROW_NUMBER) for efficient server-side deduplication
- Reduces network payload and improves query performance

**Benefits:**
- ✅ Reduced data transfer (fetch exactly 20 records instead of 50)
- ✅ Better database performance using indexes and window functions  
- ✅ Lower memory usage on client-side
- ✅ Cleaner, more maintainable code

**Implementation Steps:**
1. Apply migration: `supabase db push` or equivalent deployment command
2. Update `/app/discover/page.tsx` to use `.rpc('get_latest_sref_codes', { limit_count: 20 })`
3. Remove client-side deduplication logic
4. Test thoroughly to ensure identical results

**Code Changes Required:**
```javascript
// Replace current client-side logic with:
const { data: srefCodes, error } = await supabase
  .rpc('get_latest_sref_codes', { limit_count: 20 })
```

**Related Files:**
- `/app/discover/page.tsx` (main implementation)
- `/supabase/migrations/20250911000001_add_get_latest_sref_codes_function.sql` (database function)

---

## Future Performance Opportunities

### 2. Image Optimization Strategy
**Status:** 🔵 Identified - Needs Analysis  
**Priority:** Low-Medium  
**Notes:** Consider CDN integration, image compression, lazy loading improvements

### 3. Database Indexing Review
**Status:** 🔵 Identified - Needs Analysis  
**Priority:** Medium  
**Notes:** Analyze query patterns and add strategic indexes for common operations

### 4. Client-Side Caching Strategy
**Status:** 🔵 Identified - Needs Analysis  
**Priority:** Low  
**Notes:** Implement React Query or SWR for better data fetching and caching

---

## Legend
- 🟢 **Completed** - Implementation finished and deployed
- 🟡 **Ready** - Fully analyzed and ready for implementation  
- 🔵 **Identified** - Opportunity identified, needs further analysis
- 🔴 **Blocked** - Cannot proceed due to external dependencies

## Maintenance Notes

This document should be updated when:
- New performance issues are identified
- Optimizations are implemented and deployed
- Priorities change based on user feedback or metrics
- Database schema changes that affect query performance

Last Updated: 2025-09-11