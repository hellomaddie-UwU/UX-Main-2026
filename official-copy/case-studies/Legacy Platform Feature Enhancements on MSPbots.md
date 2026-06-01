# Legacy Platform Feature Enhancements — MSPbots

## Category
- **Industry:** MSP Technology
- **Output Type:** Web App 

---

## Expected Deliverables

1. Figma mockup files covering 16 feature enhancements across four sub-products
   (Business Intelligence, Bot Automation, Report Builder, and AI Integrations),
   delivered into the sprint handoff pipeline throughout the engagement
2. All features accepted by the PM team and implemented by the development team

---

## ✌️ Outcome

Sixteen feature enhancements shipped across four sub-products of the MSPbots legacy
platform within a 16-month independent contractor engagement. Each feature addressed
tenant complaints surfaced through the company's weekly churn review process. Every
accepted mockup cleared the PM review gate and was escalated to the development team
for sprint execution. Work was acknowledged positively by PMs and the Design Team Lead
during morning standups throughout the engagement.

---

## Context

MSPbots is a business intelligence and process automation platform built for managed
service providers, serving tenants who rely on it to monitor KPIs, automate team
workflows, and manage operational data. By late 2024, the product had expanded into four
distinct sub-products, each with its own interaction patterns and user contexts. Feature
enhancement priorities were driven by tenant complaints and customer service feedback,
reviewed weekly in a cross-functional team meeting. Complaints that consistently surfaced
as churn signals were translated into PRDs and assigned to the design team for execution
within the sprint cycle.

---

## Impact

Sixteen feature enhancements were designed, PM-reviewed, and handed off to the
development team across a 16-month engagement operating on a two-week Agile sprint
cadence.

### Result 1: Consistent sprint delivery
Every assigned PRD was converted into reviewed, PM-approved mockups within the
1-to-3-day design window and handed to the development team on the weekly cycle.
Design did not become a bottleneck at any point in the engagement.

### Result 2: Coverage across the full platform
Features spanned four distinct sub-products and covered a wide range of interaction
types: multi-step flows, settings and configuration UIs, marketplace dialogs, widget
builder tooling, and report builder components. Delivering consistently across this
breadth required continuous product familiarization in a platform that was more complex
than it initially appeared.

### Result 3: Stakeholder acknowledgment
Completed work received positive verbal feedback from PMs and the Design Team Lead
during morning standups on a recurring basis. No formal measurement of post-launch
impact on churn was accessible at the designer level. This outcome is based on observed
team feedback; no metric was tracked.

---

## Features

### Bot Automation

**Add Flow Block**
A new command block type added to the bot builder, expanding the range of automated
actions a tenant could configure within a single bot workflow. Designed to integrate into
the existing block architecture without disrupting the surrounding configuration UI.

---

### AI Integrations

**Admin Control on AI Platform**
Six settings pages giving platform administrators control over AI token usage and AI
model configuration for their tenants. Covered the full scope of AI governance settings,
from model selection through to usage limits, structured to be navigable without
requiring technical expertise.

**AI Feedback System**
A user journey flow allowing tenants to submit feedback on AI-generated content directly
within the platform. Designed as the company was transitioning toward a more AI-native
product, this flow created a feedback channel between tenant experience and AI output
quality.

---

### Business Intelligence

**Additional Options on Shareable Link**
Two new capabilities added to the existing shareable link feature: the ability to generate
a new URL and the ability to set a time limit on an active link. Both options were surfaced
within the existing link-sharing UI without requiring a new modal or flow.

**Currency Setting**
A currency selection capability threaded across three surfaces: the onboarding flow, the
settings page, and the dashboard widget builder. Allowed tenants to choose which currency
was displayed across their dashboards, addressing a gap surfaced through tenant complaints.

**Details Dialog Redesign**
A full revamp of the marketplace app detail modal, redesigned to support per-app image
galleries. Every app in the marketplace received its own gallery layout within the updated
modal, replacing a flat information structure with a browsable visual experience.

**App Upgrade Flow Revamp**
A redesigned end-to-end flow for upgrading a marketplace app, including the post-upgrade
Welcome Screen. This feature extended directly from the Details Dialog Redesign,
completing the full upgrade journey the modal revamp had made necessary to address.

**Widget UI: Multiple Dataset Time Update**
A redesigned display state for dashboard widgets that draw from multiple datasets with
different update intervals. Clarified how time discrepancies between datasets were
surfaced to tenants, reducing visual ambiguity in data-heavy widget configurations.

**Widget UI: Default Table Settings**
A correction to the default settings within the widget builder to prevent empty spaces
from appearing in table widgets out of the box. Eliminated a common configuration gap
that tenants encountered before any manual adjustments were made.

**Widget UI: Trackball Line on Line Chart**
A trackball line indicator added to line chart widgets, allowing tenants to scan data
points along the chart axis more precisely. A targeted improvement to how tenants read
and interpreted time-series data on their dashboards.

---

### Report Builder

**Report UI: Rich Text Editor Widget**
A rich text editor widget added to the report builder, allowing tenants to include
formatted written content within their scheduled reports. Extended the report builder
beyond data visualization into mixed-content report layouts.

**Report UI: Image and Logo Widget**
An image and logo widget added to the report builder, allowing tenants to embed brand
assets directly into their reports. Particularly relevant for tenants building
client-facing report outputs where visual identity mattered.

---

### Widget Builder

**Widget Builder: Measure, Drill Through, and Settings Dialogs**
A revamp of three core configuration dialogs within the widget builder. Each dialog was
redesigned for clarity and consistency, reducing the cognitive load of configuring
complex widget setups through a more organized UI.

**Widget Builder: Column Chooser Flow**
A new Column Chooser flow added to the widget builder to close a gap in the widget
building process where tenants had no structured way to manage column visibility and
ordering. Addressed a recurring point of confusion surfaced in tenant complaints.

**Widget Builder: Filter Dialog**
A redesigned filter dialog modeled closely on ClickUp's filter interaction pattern,
chosen as a reference for its ease of use and familiarity to the target audience.
Replaced a more complex filter UI that was generating consistent friction in tenant
feedback.

**Widget Builder: Preview Panel Images**
A system of Preview Panel images added to the widget builder to guide tenants through
configuration errors. Instead of encountering a broken or empty state with no direction,
tenants were shown a contextual visual prompt explaining what had gone wrong and how
to correct it.

---

## Research and Discovery

Formal user research was not part of the sprint process. Each feature brief arrived as a
structured PRD from the assigned product manager, containing a written problem statement,
annotated screenshots of the existing UI for reference, acceptance criteria mapped directly
to the required mockup scope, and competitor or reference examples when applicable. Tenant
complaint data and customer service feedback were aggregated at the team level and reviewed
in weekly Wednesday meetings before being translated into PRDs.

This format effectively front-loaded the discovery layer. By the time a PRD landed, the
problem was defined, the scope was bounded, and visual reference was already in place.
Continuous hands-on exposure to the platform across 16 months of sprint work, across all
four sub-products, was the primary source of accumulated product knowledge.

---

## Key Insights

**Each new feature area required treating the product as unfamiliar again.**
The four sub-products had distinct interaction patterns, user goals, and UI conventions
that did not transfer cleanly across contexts. What felt like settled product knowledge
in the BI module did not apply to the bot builder or the report scheduler. Approaching
each PRD as a fresh context, rather than carrying assumptions forward, produced more
accurate work than assuming familiarity.

**The acceptance criteria in each PRD functioned as both scope boundary and success
benchmark.**
Each acceptance criterion mapped to a specific set of screens. Delivering mockups that
satisfied all ACs cleanly meant the work was ready for PM review without additional
clarification. This structure made reliable delivery within a 1-to-3-day window
repeatable rather than exceptional.

---

## Design Iterations

Given the sprint window, design iterations were intentionally light. The primary revision
cycle happened between initial mockup delivery and PM review, with changes typically
limited to refinements against the acceptance criteria rather than directional changes.
The full Figma engagement file preserved all versions across the 16-month engagement.

One natural scope extension occurred during the marketplace work: the Details Dialog
Redesign surfaced a gap in the upgrade journey that the original PRD had not fully
addressed. The App Upgrade Flow was added as a direct continuation, covering the screens
the dialog revamp had made necessary to complete.

---

## Reflection

**What worked.** The PRD format and the sprint cadence both held up. Receiving a brief
with visual references, defined acceptance criteria, and bounded scope meant design work
could begin with real direction rather than interpretation. Reliable delivery within the
1-to-3-day window became consistent rather than exceptional across the full 16 months,
and every accepted mockup moved forward without stalling the pipeline.

**What remained unresolved.** Post-launch impact was not visible at the designer level.
Features were driven by churn data and tenant complaints, but whether any specific
enhancement reduced the complaints that originated it was never confirmed from where I
sat. The work was measured at the delivery gate, not the outcome gate. Separately, the
AI agent initiative for the MSPbot design system was interrupted by the layoff before it
could be completed; that thread is documented in the MSPbots Design System case study.

**What I'd do differently.** Product knowledge in a multi-sub-product platform does not
carry forward cleanly across contexts. What felt like settled familiarity in one
sub-product regularly turned out not to apply to the next. Treating each new feature area
as genuinely unfamiliar, rather than assuming prior context transfers, produced more
accurate work than confidence did.