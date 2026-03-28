# AWS Architecture Practice Website Plan

## Goal
Build an interactive learning-first website where users practice AWS architecture by dragging and dropping AWS icons into an architecture canvas.

## Product Direction
- Keep the UI clean and simple.
- Home page lists use cases.
- Each use case has:
  - Review page (context and requirements).
  - Build page (drag/drop architecture canvas).
- Add auto-resolve to reveal the expected solution.
- Start with 1 working example now, then scale to ~35 design challenges.

## Tech Stack (Simple)
- Frontend: Static HTML + vanilla JavaScript
- Styling: Plain CSS
- Runtime: static files only
- Icons: Existing assets under `aws_icons`

## Current Example (Implemented)
Use case: Public Web Server in a VPC
- User places:
  - Internet Gateway
  - VPC Router
  - EC2 Web Server (inside Public Subnet)
  - Route Table
- Canvas includes:
  - Grid-style architecture background
  - VPC container style
  - Public subnet box
  - Arrow links
  - Dotted placement area for service slot

## Architecture of the App
- `index.html`
  - Home screen with use case navigation
- `site.css`
  - Shared styling for home and use case pages
- `usecases/*`
  - Dedicated review/builder pages and shared builder logic
  - Drag/drop interactions, auto-check scoring, auto-resolve

## Validation Model
- Slot-based validation for MVP:
  - Each slot expects one icon id
  - Score = correct slots / total slots
- Improvement path for scaling:
  - Add graph validation (node + connection rules)
  - Add subnet/security/routing constraints

## Scale Plan to 35 Challenges
Phase 1 (now)
- 1 beginner challenge working end-to-end.

Phase 2 (next 5-10 challenges)
- Add challenge catalog data model.
- Add category filters (Networking, Compute, Security, Storage).
- Add progress persistence in local storage.

Phase 3 (to ~35 challenges)
- Add challenge difficulty tiers (Beginner, Associate, Pro).
- Add richer constraints and hints.
- Add timed mode and compare-with-solution mode.
- Add reusable canvas templates for VPC, serverless, and hybrid patterns.

## Reusability Strategy
- Keep each challenge as data (not hardcoded components).
- Store challenge definition in JSON/TS objects:
  - title, summary, review points
  - palette items
  - slot definitions
  - expected mappings
  - optional hint list
- This allows adding new challenges quickly with minimal code changes.

## Non-Goals for MVP
- Multi-user collaboration
- Authentication
- Backend database
- Terraform generation

## Acceptance Checklist
- Home page exists and allows choosing a use case.
- Review page explains what to build.
- Builder page supports drag/drop on architecture canvas.
- Auto-resolve fills the correct layout.
- Check solution returns clear score/result.
