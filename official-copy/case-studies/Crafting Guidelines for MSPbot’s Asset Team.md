# Crafting Guidelines for MSPbot's Asset Team

## Category
- **Industry:** AI & Technology
- **Output Type:** Internal Documentation

## GDrive Link
https://docs.google.com/document/d/1pSAGduYBgC4e-XeUEmjKaiqxdlj6oeUEvu-0EmYbj6Y/edit?tab=t.0 

---

## Expected Deliverables

1. **PDF Design Guideline** — A structured Do's & Don'ts reference covering App Setup, FAQ, Tech Support contact, desktop screen size adjustments (1440px and 1280px), and the custom illustration request process.
   *(File exists. Reflects pre-rebrand marketing site styling. A rebuilt version using the intended branding is in progress — see Design Iterations.)*

2. **CSS Instructions for Section Widgets** — Added mid-project at the Product Team Manager's direction and incorporated into the PDF.

3. **HTML Widget Templates** — Built and delivered directly rather than documented. Adopted by the Asset Team immediately upon handoff. Never added to the PDF.
   *(A web-based version with copy-paste functionality is available as a self-initiated extension — see Design Iterations.)*

---

## ✌️ Outcome

The Asset Team went from producing visually inconsistent, ChatGPT-generated Welcome Screens with no shared standard, to working from a structured reference covering layout, typography, color, CSS, and responsive desktop breakpoints. Glenn adopted the HTML widget templates the same day they were delivered. The Product Team Head gave an unsolicited compliment on the work, and the Asset Team followed up with a request for a second guidelines project — a direct signal of trust and continued need.

*No formal metrics were tracked. All outcomes are observational and anecdotal.*

---

## Context

MSPbot's Asset Team was responsible for building client-facing Welcome Screens inside a paid SaaS product — screens that subscribing clients paid hundreds of dollars a month to access. With no design background and no existing guidelines to follow, team members King Moya and Glenn Bugtog were relying on ChatGPT to generate HTML, resulting in screens that were visually inconsistent, typographically off-brand, and cluttered with information.

The Product Team Head recognized the gap and assigned the task to me specifically because of my hybrid UX/UI and front-end development background — a combination King had already identified when he initiated the request. No brand guideline existed at the time, and the company's design system was scoped exclusively to the web app, placing it out of bounds for this work.

---

## Impact

The Asset Team had no design reference, no templates, and no shared visual standard. The guidelines needed to be something they could actually follow — without requiring a design background to use.

### Result 1 — Immediate Widget Adoption
Glenn adopted the HTML widget templates the same day they were delivered, applying them directly to his active task. No additional onboarding or explanation was needed because the templates were built to be copy-paste ready.

### Result 2 — Visible Quality Improvement
Welcome Screens produced after the guideline was delivered were observably more consistent and professional in appearance. *(Anecdotally confirmed by the team; no formal before-and-after audit was conducted.)*

### Result 3 — Stakeholder Confidence Signal
The Product Team Head gave an unsolicited compliment on the quality of the work. The Asset Team separately requested a follow-up project to create guidelines for the Settings page — a direct signal of trust and continued need. *(The follow-up project was never initiated due to other priorities.)*

### Result 4 — Illustration Consistency Gap Remained
The custom illustration request process was documented in the guidelines, but the Asset Team gradually shifted to generative AI for illustration assets over time — driven by availability constraints and the growing accessibility of AI tools. Illustration assets remained the one area of visual inconsistency post-handoff. This was acknowledged and accepted as low priority by all parties.

---

## Features

### Do's & Don'ts Framework
The core of the PDF was structured around clear Do's and Don'ts for each content area: App Setup, FAQ, Tech Support contact, screen size adjustments, and illustration requests. This format was chosen to lower the barrier for non-designers — instead of explaining design principles abstractly, it showed exactly what to do and what to avoid in the context of their actual work.

### Desktop Breakpoint Guidance
Layout and typographic adjustments were documented for two primary desktop breakpoints: 1440px and 1280px. Mobile and tablet were explicitly out of scope. The web app is desktop-only, and the Product Team had previously confirmed that platform-wide mobile responsiveness was not feasible. This was a deliberate and informed scoping decision, not an oversight.

### CSS Instructions for Section Widgets
Mid-project, the Product Team Manager proposed adding CSS guidance for the Section Widgets used in Welcome Screens. Incorporated into the PDF, this addition gave the Asset Team more precise control over styling without requiring them to write CSS from scratch.

### HTML Widget Templates
Rather than writing instructions for how to build HTML widgets, I built the templates directly — a decision made possible by my front-end development background. The templates were ready to copy, paste, and deploy. Glenn used them the same day they were handed off.

### Marketing Site as Visual Bridge
Because no brand guideline existed and the web app's design system was off-limits, I used the marketing site's existing visual style as the reference point for the guidelines. This connected the Welcome Screens to the most publicly visible expression of the brand at the time — creating visual coherence across touchpoints without requiring a formal brand system to exist first.

---

## Research & Discovery

Formal research was not conducted. The primary discovery input was a kick-off meeting with King Moya, during which he walked through all existing Welcome Screens currently live in the app.

Seeing them together in sequence made the problem immediately legible: no two screens shared a consistent visual language. Fonts, colors, layout structures, and information density varied across every example. King and I acknowledged the quality gap openly during the same session — there was no ambiguity about what needed to change. We laughed about it.

With no external benchmarks and no user interviews, the audit of existing screens served as both the research phase and the brief. Content decisions — which widgets to cover, how to structure layout guidance, what edge cases to address — were made from direct observation of the Asset Team's work and my own design judgment.

---

## Key Insights

**Because the existing screens had no shared visual standard, the guideline needed to be prescriptive rather than flexible.**
Giving the Asset Team design options would have reproduced the inconsistency problem. The Do's and Don'ts format removed ambiguity by design.

**Because no brand guideline existed, the marketing site became the most defensible visual anchor.**
Connecting Welcome Screens to the marketing site's style wasn't a compromise — it was an opportunity to create coherence across two surfaces that had never been visually aligned before.

**Because the Asset Team had no design background, medium and format mattered as much as content.**
The layout logic section — covering conditional decisions like when to use 3 columns versus a simpler structure — caused the most confusion in practice. A more visual, example-driven approach would have served them better.

**Because scope expanded mid-project, the output type deserved to be questioned.**
The scope additions — CSS instructions, copy-paste HTML — pointed toward a web-based format from the start. A guideline website would have served the Asset Team's actual usage patterns better than a static PDF.

---

## Design Iterations

### Iteration 1 — From Over-Written to Concise
The first draft leaned heavily on written explanation. My instinct was to document thoroughly and anticipate every edge case in prose. My manager reviewed it and directed me to simplify. The revised version reduced explanatory text significantly, relying on the Do's and Don'ts structure to carry the guidance. The Asset Team needed a quick reference, not a manual.

### Iteration 2 — Responsive Breakpoint Section Added
King raised a requirement mid-project that hadn't been scoped initially: layout and typographic guidance across desktop screen sizes, specifically 1440px and 1280px. This was incorporated as a dedicated section and became one of the more technically useful parts of the guideline.

### Iteration 3 — Pivot from Documenting HTML to Building It
Glenn's request for copy-paste HTML code started as a documentation task. Rather than writing instructions for how to build the widgets, I built them directly — a decision that made sense given my front-end background and the team's limited HTML knowledge. Glenn adopted the templates immediately. The tradeoff: they were never formally added to the PDF, leaving a documented gap in the written guideline.

### Self-Initiated Extension — Web Version of the Design Guidelines *(In Progress)*
The copy-paste gap in the PDF, combined with a post-departure rebrand that made the original file outdated, became the motivation for a self-initiated follow-up: a web-based version of the guidelines built to the branding I co-planned with the Marketing Head before leaving.

The web version is currently hosted on GitHub and addresses the one functional gap the PDF couldn't solve — live, copy-paste HTML and CSS that the Asset Team can access directly without opening a document. This project reflects a consistent practice in how I approach portfolio work: I don't just show the plan. I show the thing.

*GitHub: [insert link]*

---

## Reflection

### What Worked
Anchoring the guidelines to the marketing site's visual style gave the work immediate credibility without needing a formal brand system to exist first. Building the HTML widgets directly — rather than writing instructions for non-developers to follow — was the right call for the team's actual skill level and eliminated a layer of translation that would have introduced errors.

### What Remained Unresolved
The HTML widget templates were never formally documented in the PDF. The illustration guidelines were followed inconsistently and eventually bypassed in favor of generative AI. The layout logic section caused confusion that a more visual, example-heavy format would have prevented.

### What I'd Do Differently
I'd scrap the PDF entirely and build a website from the start. The scope additions that came mid-project were signals that a static document wasn't the right medium. A web-based guideline would have accommodated all three deliverables natively, supported Glenn's copy-paste use case from day one, and remained easier to update as the brand evolved.

I'd also use AI writing assistance earlier in the drafting process — not to replace judgment, but to keep the text from ballooning. My instinct to over-document is real, and a tool that pushes back on verbosity earlier would have saved a revision cycle.

Both lessons required the experience to surface. I wouldn't have known the medium was wrong until I saw what the work actually needed to become.

---

## Portfolio Grouping Note
*(Internal reference — remove before publishing)*

**Primary Group: Multidisciplinary / Full-Stack Design**
This case study is strongest when grouped with other projects that demonstrate your design + development overlap. The key differentiator here is not the documentation itself — it's that you were *specifically recruited* for this project because of your hybrid skill set, and you solved a problem that a design-only or development-only person could not have solved alone. Lead with that angle.

**Secondary Group: Systems Thinking & Documentation Design**
If you have other projects involving design systems, onboarding flows, component libraries, or cross-team standards work, this case study fits naturally alongside them. The through-line is: you create tools and references that make other people's work better.

**Suggested Ordering Logic:**
- If leading with multidisciplinary angle: place this early — it establishes your range immediately.
- If leading with systems/documentation angle: place this after a more visually prominent project so it shows depth, not just polish.
- The self-initiated GitHub web version is a strong portfolio closer for this case study — it signals that your work doesn't stop at the brief.