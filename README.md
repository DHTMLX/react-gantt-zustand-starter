# DHTMLX React Gantt Zustand Demo

This project demonstrates how to integrate the DHTMLX React Gantt component with Zustand for state management in a React application. 

The setup uses React 19+ and Vite, with full TypeScript support.

**Related tutorial**:
[https://docs.dhtmlx.com/gantt/integrations/react/state/zustand/](https://docs.dhtmlx.com/gantt/integrations/react/state/zustand/)

## Features:

- Powerful Gantt chart UI for project planning and task management.

- Task and link creation, update, and deletion managed through Zustand store actions.

- React component driven approach with props controlling Gantt configuration.

- Seamless Zustand integration for lightweight and simple state management.

- Support for zoom levels (day, month, year), undo/redo operations, and drag-and-drop functionality.

- Interactive toolbar with Material-UI components for enhanced user experience.

- Strong TypeScript support for type-safe usage.

## Project Structure:

```
src/
├── components/
│   ├── GanttComponent.tsx   # Main Gantt chart component with Zustand integration
│   └── Toolbar.tsx          # Material-UI toolbar with zoom and undo/redo controls
├── seed/
│   └── Seed.ts              # Initial data (tasks, links, zoom levels)
├── store.ts                 # Zustand store
├── App.tsx
├── main.tsx
└── index.css
```

### How to install using npm/yarn

Install dependencies:

```
npm install
```

or

```
yarn
```

### Run the demo on the local server and explore it

```
npm run dev
```

or

```
yarn dev
```

## License

Source code in this repo is released under the **MIT License**.

**DHTMLX React Gantt** is a commercial library - use under a valid [DHTMLX license](https://dhtmlx.com/docs/products/licenses.shtml) or evaluation agreement.

## Useful links

[DHTMLX React Gantt product page](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/)

[DHTMLX Gantt product page](https://dhtmlx.com/docs/products/dhtmlxGantt/)

[Documentation](https://docs.dhtmlx.com/gantt/)

[React Gantt Documentation](https://docs.dhtmlx.com/gantt/web__react.html)

[Blog](https://dhtmlx.com/blog/)

[Forum](https://forum.dhtmlx.com/)
