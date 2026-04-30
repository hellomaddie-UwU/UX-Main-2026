# Conceptualizing Kuushy: Shaping an Ambiguous Brief Into a Buildable MVP App

## Project Summary

| | |
|---|---|
| **Client** | TACNIQ (Singapore) |
| **Product** | Kuushy: smart cushion + companion app |
| **My role** | UX/UI Designer, sole designer |
| **Team** | Webpuppies (design); development handled separately |
| **Timeframe** | 2023 · ~7.5 weeks of design work |
| **Output** | Mobile app design, motion graphics, character design, design system |

## Category

**Industry:** Health & Wellness Tech
**Output Type:** Mobile App

## Expected Deliverables

1. **Figma handoff file** of all approved screens, covering onboarding, sitting-session UI, posture-alarm interaction, exercise flow, and supporting screens. *(Add link if you intend to publish the file or a portfolio-friendly version of it.)*
2. **Animation package:** folder of GIFs for all back-strengthening exercises, with source `.AE` files and PNG assets included for future re-export. *(Add link or embed.)*
3. **Revised design system** reflecting the client's mid-engagement rebrand. *(Add link or note as internal asset.)*

*Note: the Kuushy product appears to no longer be active. The product website returns errors and the app does not appear in current app store listings. The original site is preserved at the [Wayback Machine, July 2023 capture](https://web.archive.org/web/20230724020437/https://www.kuushy.com/), which reflects the product positioning at the time of the engagement.*

## ✌️ Outcome

- **Final design package formally accepted by the client**, including all approved screens, the GIF animation library with source files, and the revised design system.
- **Platform-agnostic design validated under pressure:** when the client switched the development framework from React Native to Flutter mid-engagement, the design carried across with no rework required.
- **Personal craft growth:** acquired working knowledge of fitness-app UX conventions and improved motion-graphics technique through working from domain-expert reference footage.
- **Public product outcomes are not available.** The client did not share analytics or user feedback during the engagement, and the product appears to be inactive at the time of writing. Outcome claims are limited to what was directly observable from the design seat.

## Context

Kuushy was a smart-cushion-and-companion-app product from TACNIQ, a Singaporean hardware startup spun out of the National University of Singapore and venture-built with SGInnovate. The cushion used pressure and heat sensors to detect sitting posture; the companion app was meant to coach Singaporean white-collar workers toward healthier sitting habits.

The engagement began shortly after Kuushy's Kickstarter campaign concluded. The product had been pitched publicly but not yet fully designed for software. The brief I received specified a character mascot, a seat-sensor visualization, and a posture-correction alarm. Almost everything else, including how those three pieces fit together as an app, was still being worked out in real time during the engagement.

This is what made the project worth taking seriously: the brief wasn't ambiguous because the client was disorganized. It was ambiguous because the product itself was still becoming what it would be.

## Impact

The design work shaped the product's interaction model in three concrete ways.

### Result #1: A coherent product loop emerged from a fragmented brief

The original brief listed isolated features (mascot, sensor view, alarm) without a connective interaction model. Through design, these resolved into a single behavioral loop: the user sits down, the app activates and the mascot appears, the cushion runs detection in the background while the user works, and on detecting a posture shift across any of the cushion's seven detected states, the mascot reacts in-character and prompts a gentle correction. After repeated improper-posture detections within a session, a mid-session prompt offers a back-strengthening exercise. The exercise flow runs, then returns the user to their active sitting session. The design moved Kuushy from a feature list to a product.

### Result #2: Mascot evolution drove a Tamagotchi-style retention mechanic

The original mascot direction (a humanoid character) shifted at the client's request toward a cute-animal aesthetic, referencing Reddit's avatar style. I proposed a four-animal lineup (horse, panda, duck, red panda) for variety during onboarding. The client gravitated toward the duck, and the avatar system narrowed to a single character. To preserve emotional engagement around one creature, I introduced an egg-incubator nurture flow during onboarding, drawing on the established Tamagotchi pattern of building user attachment through care rituals. The narrowing to one avatar is what made nurture mechanics necessary; the design accommodated the constraint rather than fighting it.

### Result #3: Design held its shape through a development pivot

Mid-engagement, the client switched the planned development framework from React Native to Flutter, and separately moved development in-house, descoping the original full-package engagement to design-only. Neither change required design rework. The interaction patterns, component logic, and motion specifications were portable across both frameworks, which is what allowed the client to make significant downstream changes without losing the design foundation.

## Features

**Active Sitting Session with Character-Led Alarm**
A persistent session screen that activates when the user sits on the cushion and runs the cushion's posture detection in the background. When the cushion detects a posture shift, the on-screen mascot reacts in-character (panicked expression, then a gentle correction prompt). This replaced a conventional modal alarm pattern with an emotional-UI approach: the character carries the corrective message rather than a system notification, which fits the product's coaching positioning.

**Sensor Visualization (Pressure Distribution)**
The cushion's pressure sensors are visualized through a scaling-dot pattern: dots representing pressure points grow larger where weight is concentrated. The pattern preserves location information clearly and reads at a glance, which is what the in-session UI needs. *A footnote on tradeoffs: the original brief specified visualizing both the pressure and heat-scan dimensions of the cushion's sensor data; the heat dimension was simplified out at the client's request during design. I documented the tradeoff in the handoff for future iteration.*

**Egg-Incubator Onboarding**
A nurture-mechanic onboarding sequence that gives users a reason to invest in their single mascot from day one. The user receives an egg, cares for it through early app interactions, and the duck mascot hatches as their persistent companion. The pattern adapts a familiar mobile-game convention to a posture-coaching context, where ongoing user attachment is required for the product to do its job.

**Back-Strengthening Exercise Flow with Animated GIFs**
A guided exercise flow triggered by repeated improper-posture detections within a session. Each exercise is illustrated with a custom-animated GIF derived from chiropractor reference footage commissioned by the client. GIFs were the format choice for handoff because Lottie was not yet a standard expectation in this engagement's tooling, and GIFs delivered the loop reliability the flow required without adding a dependency for the future development team.

**Onboarding Sequenced Last in the Design Process**
The onboarding flow was the final design task, sequenced after the physical cushion existed and product photography became available. Most apps default to designing onboarding first; here, designing it last meant the onboarding could feature the actual product rather than placeholders, and could reflect the final brand system (rebranded mid-engagement, see Design Iterations) rather than an interim version.

## Research & Discovery

**Cushion mechanics: tech-spec request at kickoff.** Before designing the sensor-visualization screens, I requested the cushion's technical specifications from the client. Receiving them confirmed that the cushion combined pressure sensors with heat-scan capability, which directly informed the original visualization direction in the brief. Grounding visual design in the actual sensor capability mattered: it would have been easy to design something visually appealing but mechanically incoherent.

**Fitness-app convention review.** For the back-strengthening exercise flow, I reviewed common interaction patterns in established fitness and gym apps. This research informed the original flow proposal, which included a per-exercise timer (a near-universal pattern in fitness UI). The timer was later removed at the client's request as part of a broader simplification of the exercise flow; the research record of the convention remains useful as documentation of the standard the design departed from.

**Avatar style research.** After the initial humanoid-mascot direction was redirected toward a cute-animal aesthetic with Reddit's avatar style as the client's reference, I researched cute-animal illustration approaches before proposing the four-animal lineup.

**Reference footage from the client.** After a pause in communication during the project, the client returned with a folder of chiropractor reference footage commissioned specifically for the exercise animations. This footage became the basis for the back-strengthening GIFs. Working from domain-expert reference (rather than generic exercise illustrations) raised the technical and ergonomic accuracy of the animations.

**What was not available:** end-user contact, access to the physiotherapists and yoga instructors named in the public product positioning, and any analytics or user-feedback data. All user understanding was mediated through the brief and the client's single point of contact. This is a real research limitation that shaped what the design could and couldn't validate.

## Key Insights

**Because the brief was still becoming itself, design had to do scope-clarification work alongside design work.** The product wasn't fully defined at kickoff. Each design task surfaced information about what the product needed to be, which then fed back into refining subsequent tasks. Treating the brief as fixed would have produced a less coherent product.

**Because narrowing to a single mascot removed the variety that gives avatar systems their stickiness, a different mechanic had to carry user attachment.** Variety creates engagement when users can pick from many; when there is only one, attachment has to be built through investment over time. The egg-incubator pattern adapted a known solution (nurture mechanics) to fit the product's actual constraints.

**Because development assignments and frameworks shifted during the engagement, the design needed to be portable rather than coupled.** Designing in patterns and component logic, rather than framework-specific implementation details, allowed the design to survive both a framework switch (React Native to Flutter) and a developer-handoff change (in-house to external).

**Because the client was a first-time founder operating without the supporting infrastructure of an established company, the engagement needed more frequent and explicit alignment than I initially provided.** This is the most honest insight of the project; it shaped how I approach early-stage clients now. Expanded in Reflection.

## Design Iterations

**Mascot direction: humanoid → cute animal lineup → single duck.**
The original humanoid mascot was redirected toward a cute-animal aesthetic. I researched and proposed four animals (horse, panda, duck, red panda). The client gravitated toward the duck, and the system narrowed to one. Each step was a documented decision, not drift.

> *[Insert image: four-avatar lineup (horse, panda, duck, red panda) showing the proposed set, with the duck indicated as the client's selection.]*

**Egg-incubator addition.**
Direct consequence of the single-avatar narrowing. Without nurture mechanics, there was no design reason for a user to engage with one fixed character; with them, the avatar became a daily reason to open the app.

**Sensor visualization: full heat-and-pressure → pressure-only with scaling dots.**
The original brief specified visualizing both the heat and pressure dimensions of the cushion's sensor data. The client requested simplification during design. The final pattern uses scaling dots to communicate pressure concentration. This is a documented tradeoff: location is preserved, intensity dimension is flattened. I handed off the rationale alongside the screens so the tradeoff was visible to whoever picked the design up next.

**Exercise flow: standard fitness-UI conventions → simplified flow without per-exercise timer.**
The original flow followed common fitness-app conventions, including a per-exercise timer. The client requested broader simplification, and the timer was removed as part of that. The design adapted; the convention reference remained as documentation of what the simplified flow was simplified from.

**Congratulations Page (designed, not shipped).**
I designed an end-of-session summary screen with three components: top sitting positions during the session, total session duration, and a pedometer-style "good sit" quality indicator borrowing the visual language of step-counting to make posture quality legible at a glance. The screen was scrapped at the client's request. I would still defend this design today; behavior-change apps depend on session-end summaries to convert sessions into learning, and removing it weakened the coaching loop.

**Brand system revision mid-engagement.**
The client rebranded during the engagement, requiring a full revision of the design system that had been built up to that point. Colors, typography, component styling, and the mascot design itself were reworked to fit the new identity. The revision happened before development began, which limited downstream impact, but it absorbed dedicated time within the engagement.

**Framework switch (React Native → Flutter).**
Happened before the brand revision. The design carried across with no rework, which validated the design-system approach as platform-agnostic.

## Reflection

**What worked.** Sequencing onboarding last, requesting tech specs proactively before designing sensor screens, and structuring the design system to be framework-agnostic all held up under pressure. The handoff package was complete: every approved screen in the Figma file, every exercise GIF with its source `.AE` file and PNG assets, and the revised design system documented for downstream use. Complete handoffs are a personal standard, and this project tested it; the standard held.

**What remained unresolved.** Two design decisions were finalized in directions I'd still argue against: the simplified sensor visualization, which lost the heat dimension that the original brief considered worth representing, and the absence of an end-of-session summary screen, which I believe weakened the product's ability to convert individual sittings into observable user progress. Both decisions were the client's to make, and were documented as tradeoffs rather than oversights.

**The lesson I'd take into a similar project today.** I approached the engagement as if the client had a finalized vision and needed translation into screens. He had a product idea and was discovering its full shape during the engagement itself. Approaching a first-time founder with the same playbook I would use for an established company created mismatched expectations on both sides. Today, before designing, I would ask explicitly about the client's stage and context: not just what they want built, but what they're working with (their experience level with software products, the resources they have, the decisions they've already made versus the ones they're still deciding). That context-gathering would shape pacing, alignment cadence, and how much scope-clarification work the design phase needed to absorb.

**What I would do differently.** Document scope assumptions in writing before starting design work, particularly for engagements where the brief is still in motion. The Kuushy engagement absorbed multiple expansions and pivots without formal documentation of what each one cost or implied. A simple written record of "what's in scope as of today" at the start of each new design task would have made the cumulative shape of the project visible to everyone, earlier.