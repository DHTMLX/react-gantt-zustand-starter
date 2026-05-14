# DHTMLX React Gantt with Zustand State Management
 
This starter demonstrates how to integrate **DHTMLX React Gantt** with **Zustand** as the client-side store for task and link data. Built with React 19+, TypeScript, and Vite, with a Material UI toolbar for zoom and undo/redo controls.

**Related tutorial**:
[https://docs.dhtmlx.com/gantt/integrations/react/state/zustand/](https://docs.dhtmlx.com/gantt/integrations/react/state/zustand/)
 
## The Series
 
This repo is the first step in a progression from local state to real-time multi-user sync:
 
| Step | Repo | State layer |
|---|---|---|
| **1 — This repo** | `react-gantt-zustand-starter` | In-memory Zustand store, no backend |
| 2 | [react-gantt-tanstack-query-starter](https://github.com/dhtmlx/react-gantt-tanstack-query-starter) | Server-backed state with TanStack Query and a JSON file backend |
| 3 | [react-gantt-tanstack-supabase-starter](https://github.com/dhtmlx/react-gantt-tanstack-supabase-starter) | Real-time multi-user sync over PostgreSQL with Supabase |
 
Start here to understand the core Zustand integration pattern before adding a backend in steps 2 and 3.
 
## What is This
 
This demo shows how to use Zustand as the single source of truth for DHTMLX React Gantt task and link data. All mutations — creating, updating, and deleting tasks and links — are handled through Zustand store actions rather than directly modifying Gantt's internal state. The Gantt component reads from the store and re-renders reactively when the store changes.
 
The demo also implements undo/redo using Zustand's state history, and exposes zoom controls (day, month, year) through a Material UI toolbar. All data is in-memory: changes survive re-renders but reset on page refresh, which makes this a clean starting point before wiring in a real backend.
 
A companion tutorial walks through the integration step by step: [Zustand integration guide](https://docs.dhtmlx.com/gantt/integrations/react/state/zustand/).
 
## When to Use
 
- Use this demo when you want to manage DHTMLX React Gantt data through a lightweight client-side store without adding a backend or server-state library.
- Use this as the foundation before upgrading to TanStack Query (step 2) or Supabase real-time sync (step 3) in the same series.
- Use this when you need undo/redo for Gantt task and link mutations and want to implement it through Zustand state history rather than a custom history stack.
- Use this when your Gantt data fits in memory and persistence is handled externally (e.g., saving to an API on user action).


## Quick Start
 
```bash
git clone https://github.com/DHTMLX/react-gantt-zustand-starter
cd react-gantt-zustand-starter
npm install
npm run dev
```
 
Open [http://localhost:5173](http://localhost:5173) in your browser.
 
## Architecture
 
```
src/
├── components/
│   ├── GanttComponent.tsx   # Gantt initialization + Zustand store integration
│   └── Toolbar.tsx          # Material UI toolbar: zoom, undo, redo controls
├── store.ts                 # Zustand store: tasks, links, history, actions
├── seed/
│   └── Seed.ts              # Initial tasks, links, and zoom level config
├── App.tsx
└── main.tsx
```
 
The store (`store.ts`) is the single source of truth. `GanttComponent.tsx` subscribes to the store and passes tasks and links to Gantt as props. When a user drags a task or edits via the form, Gantt fires a callback, which calls a Zustand action to update the store. The Toolbar reads undo/redo availability from the store and dispatches history actions.
 
## Key Patterns
 
- **Zustand as Gantt data store** — tasks and links live in a Zustand store and are passed to DHTMLX Gantt as props. Gantt mutations trigger Zustand actions, not direct Gantt API calls, keeping state centralized.
- **Undo/redo via state history** — the Zustand store maintains a history stack of past states. Undo/redo actions swap the current state with the previous or next snapshot, giving Gantt a full history of task and link changes.
- **Zoom level as store state** — the active zoom level (day, month, year) is stored in Zustand alongside the data, so toolbar controls and Gantt config stay in sync through the same store update mechanism.
- **Callback-driven mutation bridge** — Gantt's `onTaskCreated`, `onTaskUpdated`, `onLinkCreated`, etc. callbacks are used as the entry points to dispatch Zustand actions, keeping the Gantt component thin and the store the only place where state changes happen.
## Features
 
| Feature | Details |
|---|---|
| Task CRUD | Create, update, and delete tasks via Zustand store actions |
| Link CRUD | Create, update, and delete task dependencies via Zustand |
| Drag-and-drop | Task rescheduling and reordering persisted to Zustand state |
| Zoom levels | Day, month, and year zoom, stored in and controlled from Zustand |
| Undo/redo | History-based undo/redo for task and link mutations |
| Material UI toolbar | Zoom controls and undo/redo buttons |
| TypeScript | Full type coverage for tasks, links, and store shape |
| Vite | Fast dev server and production build |
| React 19+ | Built on the latest React release |
 
## Production Notes
 
This demo is Part 1 of a learning series — it is intentionally minimal and in-memory only.
 
- **No persistence** — all data resets on page refresh. See [step 2](https://github.com/dhtmlx/react-gantt-tanstack-query-starter) for server-backed state with TanStack Query, or [step 3](https://github.com/dhtmlx/react-gantt-tanstack-supabase-starter) for real-time PostgreSQL sync.
- **No authentication** — add an auth layer if task data is user-specific.
- **Undo history scope** — the history stack covers task and link mutations only. Zoom and view changes are not tracked.
- **Gantt license** — DHTMLX React Gantt requires a valid commercial license for production use (see License section below).

## Related Resources
 
- [Zustand integration guide (tutorial on the official blog)](https://dhtmlx.com/blog/using-zustand-state-management-apps-dhtmlx-react-gantt-scheduler/)
- [DHTMLX React Gantt product page](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/) 
- [DHTMLX Gantt product page](https://dhtmlx.com/docs/products/dhtmlxGantt/)
- [DHTMLX Gantt documentation](https://docs.dhtmlx.com/gantt/)
- [React Gantt integration guide](https://docs.dhtmlx.com/gantt/web__react.html)
- [Part 2: TanStack Query starter](https://github.com/dhtmlx/react-gantt-tanstack-query-starter)
- [Part 3: Supabase real-time starter](https://github.com/dhtmlx/react-gantt-tanstack-supabase-starter)
- [DHTMLX blog](https://dhtmlx.com/blog/)
- [Community forum](https://forum.dhtmlx.com/)
- [Report an issue](https://github.com/DHTMLX/react-gantt-zustand-starter/issues)

## License
 
The source code in this repo is released under the **MIT License**.

**DHTMLX React Gantt** is a commercial library - use under a valid commercial license or evaluation agreement.
 
**Commercial License**
Required for proprietary or commercial applications. Includes access to PRO features, dedicated technical support, and long-term maintenance.
[Learn more →](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)
 
**Try before you buy**
A free evaluation of DHTMLX React Gantt is available — no credit card required.
[Start your evaluation →](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml)
