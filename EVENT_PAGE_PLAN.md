# NGO Event Page - Planning Document

## Project Overview
Single-page event landing page for Sethu.ai NGO featuring a renowned speaker talk on June 14th, 2026 from 3PM to 7:30PM, followed by a sequence of curated event experiences. The page will include registration, information sections, project showcase, and support a React Native implementation.

---

## 1. Page Structure & Navigation Flow

### Navigation Hierarchy
```
Home/Landing
├── Hero Section (Registration CTA)
├── About Section
├── Messages Section
├── Projects Section
└── Floating Action Button (Back to Registration)
```

### Page Sections (Top to Bottom)

#### **Section 1: Hero/Landing Section**
- **Primary Goal:** Event registration
- **Content:**
  - Event title and tagline
  - Speaker information (name, title, bio)
  - Event date: June 14th, 2026
  - Time: 3PM to 7:30PM
  - Location and agenda highlight
  - Poster as hero background image
  - Large registration CTA button
  - Brief event description
- **Design Approach:**
  - Full-width hero with poster as background or overlay
  - Prominent call-to-action for registration
  - Mobile-responsive design

#### **Section 2: About Section**
- **Content:**
  - Detailed event description
  - Speaker's background/credentials
  - Why attend this event
  - What attendees will learn
  - Event agenda/timeline
- **Design Approach:**
  - Text with supporting images/icons
  - Consider using accent colors from brand guidelines
  - Could include testimonials or previous speaker talks

#### **Section 3: Messages Section**
- **Content:**
  - Organizational message (from director/founder)
  - Key quotes or highlights
  - Event highlights/expectations
  - Sponsorship/partner acknowledgments
- **Design Approach:**
  - Cards or testimonial-style layout
  - Visual hierarchy with typography
  - Possibly use posters as decorative elements

#### **Section 4: Projects Section**
- **Content:**
  - Sethu.ai's ongoing projects
  - Six featured project descriptions and impact metrics
  - Links to project pages or deeper stories
  - Visual cards or timeline layout
- **Design Approach:**
  - Grid layout (2-3 columns on desktop, 1 on mobile)
  - Project cards with images, descriptions, CTAs
  - Consistent with existing website styling

---

## 2. Brand Identity & Visual Design

### Brand Personality
- Intelligent
- Trustworthy
- Futuristic
- Enterprise-ready
- Human-centered AI
- High-performance automation

### Tone
- Short, direct headlines
- Outcome-focused copy
- Technical credibility
- Minimal marketing fluff

### Color System
- Primary: #6C63FF
- Secondary: #8B5CF6
- Accent: #00D4FF
- Dark Background: #0B1020
- Surface: #131A2A
- Text Primary: #F5F7FA
- Text Secondary: #A7B0C0
- Border: rgba(255,255,255,0.08)

### Gradient Use
- Use sparingly for CTA buttons, hero glow, icons, hover states, and active tabs
- Example: linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)
- Avoid large gradient-heavy backgrounds, rainbow gradients, and excessive neon

### Typography
- Headings: 700–800 weight, tracking -0.02em, line-height 1.1
- Body: 400–500 weight, line-height 1.6
- Hero H1: 56–72px
- Section Headers: 36–48px
- Card Titles: 20–24px
- Body: 16–18px
- Small text: 14px

### Layout System
- 12-column responsive grid
- Max width: 1280px
- Section padding: 96px vertical
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

### Section Structure Notes
- Use the coherent event landing structure, but adapt to NGO and speaker event flow rather than SaaS product pages
- Prioritize hero, event details, registration, messages, projects, and footer

---

## 3. Visual Design Considerations

### Background & Posters
- **Hero Section:** Use primary poster as full-width background with overlay for text readability
- **Accent Sections:** Use secondary posters as decorative elements or section dividers
- **Color Palette:** Extract colors from posters for consistency

### Responsive Design Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Floating Action Button (FAB)
- **Position:** Fixed bottom-right corner
- **Icon:** Arrow up or registration icon
- **Behavior:** Smooth scroll to Registration section
- **Show/Hide Logic:** Hide on mobile when user is in registration section, show when scrolled down
- **Accessibility:** Include aria-labels and keyboard navigation

---

## 4. Registration Section Details

### Registration Form Components
- Full name
- Email
- Phone number (optional)
- Organization/Company (optional)
- Event interest selection for the post-talk segments
- Terms & conditions checkbox
- Submit button

### Integration Options
- Google Docs backend via Google Forms or direct Google Sheets API integration
- Embedded form with React Native form components
- Email automation: confirmation message after submission
- Data saved to Google Docs for reporting and follow-up

### Backend Preference
- Use Google Docs / Google Sheets as the registration store
- Disable complex backend if possible, favor Google Apps Script or Sheets API for submission persistence
- Provide both a mobile-friendly form and a direct data capture workflow

---

## 5. Technical Architecture

### Recommended Tech Stack
- **Frontend:** React Native with optional web support via Expo / React Native Web
- **Styling:** Tailwind CSS, Styled Components, or custom React Native styles
- **Form Handling:** React Hook Form (web) or custom controlled inputs for React Native
- **Registration storage:** Google Sheets API or Google Forms + Apps Script
- **Hosting:** Expo Hosting, Vercel/Netlify for web, or app deployment via App Store / Play Store

### File Structure (React Native / Web)
```
src/
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Messages.tsx
│   ├── Projects.tsx
│   ├── FloatingButton.tsx
│   └── RegistrationForm.tsx
├── screens/
│   └── EventLandingScreen.tsx
├── App.tsx
├── styles/
│   └── theme.ts
├── assets/
│   ├── posters/
│   ├── images/
│   └── icons/
└── utils/
    └── formHandler.ts
```

---

## 6. Key Features & Functionality

### Must-Have Features
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Event registration form
- [ ] Floating navigation button
- [ ] Smooth scroll navigation
- [ ] Mobile menu (if needed)
- [ ] SEO optimization
- [ ] Form validation and error handling
- [ ] Success page/confirmation message

### Nice-to-Have Features
- [ ] Email confirmation for registrations
- [ ] Event countdown timer
- [ ] Social media integration
- [ ] Share event button
- [ ] Event calendar integration
- [ ] Speaker profile cards
- [ ] Photo gallery from previous events
- [ ] Testimonials carousel
- [ ] Newsletter signup
- [ ] Analytics tracking

---

## 6. Content Checklist

### Required Content
- [ ] Event title and description
- [ ] Speaker name, photo, and bio
- [ ] Event date, time, and location
- [ ] Poster images (high-res, optimized)
- [ ] About section content
- [ ] Organizational messages
- [ ] Project descriptions and images
- [ ] Contact information
- [ ] Terms & conditions (if applicable)

### Optional Content
- [ ] Speaker video introduction
- [ ] Event schedule/agenda
- [ ] FAQs
- [ ] Sponsorship information
- [ ] Previous event highlights
- [ ] Team member profiles

---

## 7. User Flow Diagram

```
User Lands on Page
    ↓
Sees Hero Section with Event Info & Register CTA
    ↓
Scrolls to view other sections
    ↓
Reads About Section (Speaker & Event Details)
    ↓
Reads Messages Section (Organizational messages)
    ↓
Views Projects Section (NGO's work)
    ↓
Uses Floating Button to jump back to Registration
    ↓
Fills Registration Form
    ↓
Receives Confirmation
```

---

## 8. Accessibility Considerations

- [ ] Proper heading hierarchy (H1, H2, H3)
- [ ] Alt text for all images
- [ ] Color contrast ratio of 4.5:1 for text
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] ARIA labels for interactive elements
- [ ] Mobile keyboard doesn't hide form fields

---

## 9. Performance Optimization

- [ ] Image optimization (WebP format, lazy loading)
- [ ] Minify CSS and JavaScript
- [ ] Use CDN for static assets
- [ ] Implement caching strategies
- [ ] Optimize Core Web Vitals
- [ ] Compress posters to appropriate sizes

---

## 10. Next Steps

1. **Design Phase:**
   - Create wireframes for each section
   - Finalize color palette and typography
   - Create mockups in Figma/Adobe XD

2. **Development Setup:**
   - Initialize project repository
   - Set up development environment
   - Install dependencies

3. **Implementation:**
   - Build responsive layout
   - Integrate registration form
   - Add floating navigation button
   - Implement smooth scrolling

4. **Content Integration:**
   - Add text content
   - Optimize and integrate poster images
   - Set up project showcase

5. **Testing & Deployment:**
   - Cross-browser testing
   - Mobile device testing
   - Form validation testing
   - Performance testing
   - Deploy to production

---

## Questions for Clarification

- [ ] What is the event date?
- [ ] How many events will follow the main speaker talk?
- [ ] What is the expected registration volume?
- [ ] Are there design guidelines from the existing Sethu.ai website?
- [ ] Should the page match the existing website's branding?
- [ ] Will there be multiple speakers or just one?
- [ ] Is there a budget for third-party services?
- [ ] What are the primary KPIs for this page?
