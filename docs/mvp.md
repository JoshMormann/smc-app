# MVP Feature Set
## Pages (all accessible via left hand vertical navigation)
**Primary Pages:**
- Discover (aka Home): a page providing a ‘likable’ list of all publicly available SREF codes in a bento box style combined with a masonry layout similar to Pinterest with search and filter features
	Features Include:
	- _Dismissible Welcome section_ at the top of the page above the bento box list view (this welcome section should include a brief explanation of the app on first release, but could include promotional information in future releases) 
	- _Numerous account creation paths_ If a user attempts to click an SREF card, either to like or to copy its code they will be invited to create an account via modal window explaining that they must create a free account to gain access to the Codes and other tools
	- _Search Field_ which will actively filter the current list by keywords either found in tags associated with SREF codes, or their titles. 
	- _Card List_ a bento box style list (by default) showing all publicly available SREF cards filtered by the user. Users can filter and search this page at will without creating an account. This view should also have a toggle in the search/filter header for a more uniform view of cards with more detail on each code (current card design)

- Favorites: a page providing an ‘unlikable’ list of all publicly available SREF codes in a bento box style UI that the user has liked from the Discover page. It has a search feature as well, a tag filter column, created from the tags in their ‘liked’ SREFs. It shows the most common tags to start with a ‘more’ link that will expand to the top 50 tags, and a note informing to consider using a key word search to reduce the output.
	Features Include: 
	- Blocked entry without account creation/logged in state. Unauthenticated users are shown a modal window inviting them to create an account to view the page
	- Empty state invites the user to favorite SREF Codes on the Discover page, perhaps saying something like: “This is where all your favorites from the Discover page can be found”. Empty state will also show all search and filtering features grayed out as disabled.
	- _Search Field_ which will actively filter the current list by keywords either found in tags associated with their favorited SREF codes, or their titles. 
	- Tag Cloud with their top 10 tags associated with favorited SREF codes, clicking one of these tags will filter the Bento Box list view with a ‘more…’ link after the last tag in the initial row, that will open the list to up (pushing the card list down to accommodate) to 50 if they have that many, and invite them to filter their results further via search if they have more than 50 tags. 
	- _Card List_ a bento box/masonry style list (by default) showing all favorited and publicly available SREF cards filtered by the user. This list should also have a toggle in the search/filter header for a more uniform view of cards with more detail on each code (current card design)

- Library: a page providing the user with their list of SREF Codes that they have found in a bento box style UI, it too has search and tag filtering like the Favorites page with similar limitations and search term recommendation on the expansion of the tag cloud. This page also includes the ability to create new SREF codes, by a button next to search, and an empty card at the end of the current view inviting them to add an SREF code.   
	Features Include: 
	- Blocked entry without account creation/logged in state. Unauthenticated users are shown a modal window inviting them to create an account to view the page
	- Empty state invites the user to add an SREF code page by means of an empty card (current design) as well as a button to the right of the search field (current design).
	- _Search Field_ which will actively filter the current list by keywords either found in tags associated with their favorited SREF codes, or their titles (current design/behavior).
	- Tag Cloud with their top 10 tags associated with favorited SREF codes, clicking one of these tags will filter the Bento Box list view with a ‘more…’ link after the last tag in the initial row, that will open the list to up (pushing the card list down to accommodate) to 50 if they have that many, and invite them to filter their results further via search if they have more than 50 tags. 
	- _Card List_ a bento box style list (by default) showing all the users added SREF cards filtered by the user. This list should also have a toggle in the search/filter header for a more uniform view of cards with more detail on each code (current card design)

**Secondary Pages:**
- Authentication Pages (all existing and functional but could be refined)
	- Account Creation
	- Log in 
	- Password Reset 
	- New Password Creation
- About Page
- Privacy Policy
- Terms and Conditions
- Profile Page (where the option to join the waiting list for paid private tier will be shared—this option will be a simple email sign up form, so that it can be managed outside of the primary database configuration)
- FAQ Page

**Navigation** (Significant changes, modeled after Pinterest)
- Left (SideBarNavigation.tsx) Nav: A slim icon only design that spans the full vertical space of the pages viewed and contains the following links in the form of icon buttons (with hover title tooltips)
	- SREF Mining Company Logo (links to Discover page (says SREF Mining Company on hover). Discover page shall serve as the home page for MVP)
	- Compass Icon (links to the Discover page (tooltip says ‘Discover’ on hover) which as the home page should show as active on initial visit to the site)
	- Heart Icon (links to Favorites page (tooltip says ‘Favorites’ on hover) is blocked for non-authenticated users and prompts them by modal window to consider creating an account)
	- Books Icon (links to Library page (tooltip says ‘Library’ on hover) is blocked for non-authenticated users and prompts them by modal window to consider creating an account)
	- Gear Icon (appears at the bottom of the nav bar separated from the main navigation options listed above (tooltip says ‘Settings and Support’ on hover) clicking the gear icon will display a menu that includes all the secondary pages (except Profile)
- Top (MainNavigation.tsx) Nav: also considered the ‘header section’ is largely common across all functional or “primary” pages. This area includes search features, tags options. The top row will be contextual depending on the page that is in view.
	- Discover/Home page top row (unauthenticated state):
		- Search field (takes all available horizontal space)
		- Login button (outlined)
		- Get started button (solid)
	- Discover/Home page top row (authenticated state):
		- Search field (takes all available horizontal space)
		- User Avatar with down chevron (click displays a menu with the options of Profile and Log out)
	- Favorites page (only enabled when authenticated):
		- Search field (takes all available horizontal space)
		- User Avatar with down chevron (click displays a menu with the options of Profile and Log out)
	- Library page (only enabled when authenticated):
		- Search field (takes all available horizontal space)
		- Add SREF button
		- User Avatar with down chevron (click displays a menu with the options of Profile and Log out)
	- Secondary pages (unauthenticated state):
		- Search field (takes all available horizontal space - and will resolve to the Discover/Home page when used)
		- Login button (outlined)
		- Get started button (solid)
	- Secondary pages (authenticated state):
		- Search field (takes all available horizontal space - and will resolve to the Discover/Home page when used)
		- User Avatar with down chevron (click displays a menu with the options of Profile and Log out)