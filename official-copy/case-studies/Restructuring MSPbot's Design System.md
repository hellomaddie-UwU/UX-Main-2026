# Restructuring MSPbot's Design System

## Category
- **Industry:** AI & Technology
- **Output Type:** Internal Documentation

## GDrive Link
https://docs.google.com/document/d/1pSAGduYBgC4e-XeUEmjKaiqxdlj6oeUEvu-0EmYbj6Y/edit?tab=t.owo8rjc0llfm 

---

## Expected Deliverables

1. **Figma Design System File** — Documentation of all basic components from the Legacy Product, aligned with Element Plus' component structure and enriched with variant properties and design tokens.
   *(Completed. Advanced and complex components were intentionally out of scope — these were already documented in a separate Handover Figma file used by the development team.)*

2. **Accessibility Documentation** — Written guidelines covering accessibility standards relevant to the design system, authored independently due to English fluency advantage within the team.
   *(Completed and included in the Figma file.)*

3. **Writing Guidelines** — Documentation on writing standards and tone, informed by external design system references and adapted to MSPbots.ai's internal context.
   *(Completed and included in the Figma file.)*

4. **Design System GPT Agent** — A self-initiated AI contribution intended to answer design system questions and help team members determine whether a proposed mockup was feasible before execution. Aligned with the company's broader AI-first culture initiative.
   *(Not completed — interrupted by layoff before shipping.)*

---

## ✌️ Outcome

Phase 1 of a three-phase design system initiative was completed within the year: all basic components documented, accessibility guidelines written, and writing standards established. The Figma file exists as a complete, internally sourced reference for MSPbots.ai's Legacy Product.

Formal adoption did not occur. By the time Phase 1 was complete, the organization had pivoted toward AI app development, and PMs and developers had shifted to generating mockups with ChatGPT rather than referencing the design system. Phases 2 and 3 — component enhancement and Legacy Product UI application — were never initiated, and a mass layoff closed the project before the planned next phases could begin.

*No formal metrics were tracked. All outcomes are observational and anecdotal.*

---

## Context

MSPbots.ai's existing design system was a rough, personal file built primarily for one designer to understand. It wasn't built for a team — new designers joining had no reliable reference for how the product's components were structured or applied. Components in the system were also incomplete and didn't accurately reflect what existed in the Legacy Product, forcing designers to spend extra time reconciling mockups against the real interface.

The restructuring project was initiated to fix this: create a design system that a new designer could open and understand independently, that matched the actual product, and that could eventually replace the team's reliance on Element Plus' external documentation site. The project was formally scoped as three phases — documentation, enhancement, and UI application — but was consistently treated as a low-priority background task, worked on between higher-priority assignments throughout the year.

---

## Impact

Phase 1 delivered a complete documentation foundation. The conditions for adoption, however, shifted faster than the project could land.

### Result 1 — Complete Basic Component Library
All basic components were documented by end of year, with variant properties defined and design tokens attached. The Figma file became an internally sourced reference independent of Element Plus' external documentation — the original goal for Phase 1.

### Result 2 — Accessibility and Writing Standards Established
Two additional documentation layers were completed beyond the initial brief: an Accessibility Doc and Writing Guidelines. These were self-initiated based on observed gaps and represent the only written standards of their kind produced for the Legacy Product design system.
*(No formal validation or team feedback was collected on these documents before the project ended.)*

### Result 3 — Adoption Did Not Occur as Intended
By the time the system was complete, the PM and development teams had shifted to using ChatGPT to generate mockups directly. The design system was never adopted as the team's primary source of truth. The organizational conditions that would have driven adoption — designer-led mockup workflows and a stable Legacy Product roadmap — had already changed.

### Result 4 — Phases 2 and 3 Were Cancelled
The company's strategic pivot toward AI app development made Legacy Product UI enhancement a lower priority than new feature development. Combined with a mass layoff across multiple departments, Phases 2 and 3 were never initiated. The design system remains a complete Phase 1 artifact with no current continuation plan.

### Result 5 — GPT Contribution Interrupted
A self-initiated GPT agent — designed to help team members query the design system and assess mockup feasibility — was in progress as part of the company's AI contribution initiative. It was not completed before the layoff. A parallel initiative by teammate Nora Li, a vibe-coded website version of the design system, was similarly interrupted by tooling friction and resource constraints.

---

## Features

### Basic Component Documentation
Each basic component was documented with its variant properties, design tokens, and applicable states — building a foundation that matched the actual Legacy Product rather than a theoretical or aspirational component set. Discrepancies between the design system and the real product were identified through page-by-page audit of the Legacy App.

### Admin View vs. Client View Differentiation
A late-stage discovery revealed that several components rendered completely differently depending on whether the user was in admin view or client view. These were not minor style differences — they were substantively different UI states of the same component. The inconsistencies were surfaced, documented, and resolved as a feature enhancement rather than being left as silent gaps in the system.

### Accessibility Documentation
Written standards covering accessibility considerations for the Legacy Product design system. Informed by external design system references and authored independently. Intended as a baseline reference for designers and, eventually, developers.

### Writing Guidelines
Internal documentation establishing writing standards and tone for the product. Adapted from external references to fit MSPbots.ai's context. Authored independently due to English fluency advantage within the team.

### Design Tokens and Element Plus Figma Library Integration
Upon discovering that Element Plus maintained an official Figma library, the workflow shifted: rather than building components from scratch, components were copy-pasted from the library, variant properties were adjusted to match the Legacy Product, and existing design tokens were attached. This meaningfully reduced the time cost of an already low-priority task.
*(Observed efficiency gain — no formal time measurement was tracked.)*

---

## Research & Discovery

Formal research was not conducted. Discovery happened through three primary inputs.

**Legacy App Audit**
The Legacy App was reviewed page by page to identify how components actually appeared in the product — not how they were theoretically defined. This audit surfaced UI inconsistencies, undocumented component states, and the admin vs. client view discrepancies that later required dedicated documentation. The table component was the most complex example: its header varied based on grid style selection and changed entirely between admin and client views.

**Element Plus Documentation and Figma Library**
Element Plus served as the primary reference for component structure and documentation. Early in the project, the official Element Plus Figma library was discovered — a meaningful find that changed the production workflow. Screenshots of Element Plus instructions were used with minor adjustments where writing from scratch was not time-efficient.

**External Design System References**
For the Accessibility Doc and Writing Guidelines, existing public design systems were reviewed to benchmark language, structure, and coverage. Content was then adapted to the MSPbots.ai context rather than reproduced directly.

**Manager as PM Team Proxy**
The full PM Team was based in China; the user was the only Philippines-based team member. Direct access to PM stakeholders was not available. Feedback from the PM Team was consolidated and relayed through the direct manager, who served as the primary stakeholder representative throughout the project.

---

## Key Insights

**Because the existing design system was built for one person, it couldn't scale until it was rebuilt for a team.**
Nora's foundational work was valuable — but a system only one person can navigate is a personal tool, not a shared resource. Restructuring meant translating undocumented institutional knowledge into something transferable.

**Because the audience shifted mid-project, the documentation had to be rewritten, not just extended.**
PM-facing instructions and developer-facing HTML attribute documentation are fundamentally different content types. The pivot from one to the other wasn't additive — it required rethinking what "useful documentation" meant for an entirely different reader.

**Because the Legacy App was never fully audited before the project started, the real scope was larger than scoped.**
The page-by-page audit revealed that components had more states, more variations, and more view-dependent differences than anticipated. A pre-project audit would have produced a more accurate timeline estimate and potentially changed the three-phase plan.

**Because the project was always low-priority, the medium was never seriously questioned.**
A Figma file is the right home for design assets. It is not the right home for PM instructions, developer HTML attributes, accessibility standards, and writing guidelines. An internal documentation website would have served all three audiences more effectively and been significantly easier to maintain and update as the product evolved.

---

## Design Iterations

### Iteration 1 — Atomic Design Proposal (Scrapped)
Early in the project, an Atomic Design structure was proposed — organizing the system into Sub-atoms, Atoms, Molecules, Organisms, and so on. The proposal was reviewed and ultimately rejected in favor of following Element Plus' existing documentation structure. The rationale: consistency with the external reference the team already used. The tradeoff: a structure optimized for Element Plus rather than one that reflected the product's actual component hierarchy.

### Iteration 2 — Documentation Method Evolved Over the Year
Early component documentation was more manual and text-heavy. The discovery of the Element Plus official Figma library changed the production workflow mid-project — components could be copied directly, adjusted, and tokenized rather than built from scratch. Additionally, a cleaner method for displaying components alongside their states was developed later in the year. Earlier documented components predate this improvement and reflect a less refined presentation approach.

### Iteration 3 — Scope Shifted from PM-Facing to Dev-Facing
From Q2 onward, the writing audience shifted from PMs needing instructional guidance to developers needing HTML attributes and technical documentation. This wasn't a minor tone adjustment — it was a fundamental change in content type, requiring a different understanding of the reader's context and what counts as useful information for each audience.

### Self-Initiated Addition — Design System GPT Agent *(Incomplete)*
As MSPbots.ai moved toward an AI-first culture and required all employees to submit AI contributions, a GPT agent was initiated to serve as an interactive layer on top of the design system. The intent: allow any team member to query the system conversationally, receive component guidance, and assess mockup feasibility without needing to navigate the Figma file directly.

The agent was not completed before the layoff. A parallel initiative by teammate Nora Li — a vibe-coded website version of the design system — was also left unfinished due to tooling friction with Cursor and a developer collaborator who was pulled to higher-priority tasks.

In hindsight, the more effective split would have been to swap contributions: the front-end development background required to vibe-code the website was already present on the team. Neither team member knew the other's AI contribution scope until both were already in progress.

*GitHub / additional artifacts: [insert if applicable]*

---

## Reflection

### What Worked
The collaboration structure with Nora was effective throughout — weekly syncs kept the work moving despite the low-priority status, and the informal knowledge-sharing dynamic meant gaps were caught before they became permanent. Discovering the Element Plus Figma library was a genuine process improvement that made an under-resourced project more sustainable. The Accessibility Doc and Writing Guidelines were completed without being formally requested, and represent the only written standards of their kind for the Legacy Product.

### What Remained Unresolved
Phase 1 was completed, but the system was never adopted. The audience for the documentation changed twice during the project — PM to developer — and the Figma file format served neither audience as well as a purpose-built internal website would have. The GPT agent, which might have driven adoption by lowering the barrier to accessing the system, was never finished. Components documented in the early part of the year reflect an older, less refined display approach that wasn't updated retroactively.

### What I'd Do Differently
I'd push for a vibe-coded internal website from the start — and given what I know now, I would have taken on the front-end build myself. A website would have served the PM audience, the developer audience, and the copy-paste use case in ways a Figma file structurally cannot.

I'd also follow the Atomic Design structure over Element Plus' documentation hierarchy. The project was building an internal system for a specific product — organizing it around that product's actual component relationships would have produced something more useful long-term than mirroring an external library's structure.

The broader lesson is about medium and audience alignment. The same mistake made in the MSPbot Guidelines project — choosing a static document over a living, accessible website — showed up here again on a larger scale. The difference is that this time, the scope was larger, the audiences were more varied, and the cost of the wrong medium compounded across a full year of work.

---

## Portfolio Grouping Note
*(Internal reference — remove before publishing)*

**Primary Group: Systems Thinking & Documentation Design**
This case study pairs naturally with the MSPbot Guidelines project. Both involve creating reference systems for non-designer audiences, both were built without a formal brand or documentation foundation to work from, and both ultimately pointed toward a web-based format as the more appropriate medium. The through-line across both: you build things that help other people do their jobs better.

**Secondary Group: Multidisciplinary / Full-Stack Design**
The GPT initiative and the front-end website insight both reinforce the multidisciplinary angle. Even in a project where the deliverable was a Figma file, your thinking extended into tooling, automation, and interactive documentation — capabilities most pure UX designers wouldn't bring to this kind of work.

**Suggested Ordering Logic:**
- If pairing with the MSPbot Guidelines case study: place this second. The Guidelines project is tighter and more resolved — it makes a strong opener. This case study adds depth, shows longer-term thinking, and handles an ambiguous outcome honestly, which is a more mature portfolio signal.
- The honest "adoption did not occur" outcome is a strength, not a weakness. It shows you understand the difference between shipping work and work that lands — and that you can reflect on why without deflecting blame.
- The three-phase structure that only reached Phase 1 is a realistic and recognizable story for any hiring manager who has worked in a fast-moving product company. Don't soften it.