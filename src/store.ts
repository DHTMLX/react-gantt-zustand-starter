import { create } from 'zustand';
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

type Snapshot = { tasks: SerializedTask[]; links: Link[]; config: GanttConfig };
type State = {
  tasks: SerializedTask[];
  links: Link[];
  config: GanttConfig;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
  recordHistory: () => void;
  undo: () => void;
  redo: () => void;

  setZoom: (level: ZoomLevel) => void;
  addTask: (task: SerializedTask) => SerializedTask;
  upsertTask: (task: SerializedTask) => void;
  deleteTask: (id: string | number) => void;
  addLink: (link: Link) => Link;
  upsertLink: (link: Link) => void;
  deleteLink: (id: string | number) => void;
};

export const useGanttStore = create<State>((set, get) => ({
  tasks: seedTasks,
  links: seedLinks,
  config: { zoom: defaultZoomLevels },

  past: [],
  future: [],
  maxHistory: 50,

  recordHistory: () => {
    const { tasks, links, config, past, maxHistory } = get();
    const snapshot = {
      tasks: JSON.parse(JSON.stringify(tasks)),
      links: JSON.parse(JSON.stringify(links)),
      config: JSON.parse(JSON.stringify(config)),
    };
    set({
      past: [...past.slice(-maxHistory + 1), snapshot],
      future: [],
    });
  },

  undo: () => {
    const { past, future, tasks, links, config } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({
      tasks: previous.tasks,
      links: previous.links,
      past: past.slice(0, -1),
      future: [{ tasks, links, config }, ...future],
      config: previous.config,
    });
  },

  redo: () => {
    const { past, future, tasks, links, config } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      tasks: next.tasks,
      links: next.links,
      past: [...past, { tasks, links, config }],
      config: next.config,
      future: future.slice(1),
    });
  },

  setZoom: (level) => {
    get().recordHistory();
    set({
      config: { ...get().config, zoom: { ...get().config.zoom, current: level } },
    });
  },

  addTask: (task) => {
    get().recordHistory();
    const newTask = { ...task, id: `DB_ID:${task.id}` };
    set({ tasks: [...get().tasks, newTask] });
    return newTask;
  },

  upsertTask: (task) => {
    get().recordHistory();
    const tasks = get().tasks;
    const index = tasks.findIndex((x) => String(x.id) === String(task.id));
    if (index !== -1) {
      set({
        tasks: [...tasks.slice(0, index), { ...tasks[index], ...task }, ...tasks.slice(index + 1)],
      });
    }
  },

  deleteTask: (id) => {
    get().recordHistory();
    set({ tasks: get().tasks.filter((t) => String(t.id) !== String(id)) });
  },

  addLink: (l) => {
    get().recordHistory();
    const newLink = { ...l, id: `DB_ID:${l.id}` };
    set({ links: [...get().links, newLink] });
    return newLink;
  },

  upsertLink: (l) => {
    get().recordHistory();
    const links = get().links;
    const index = links.findIndex((x) => String(x.id) === String(l.id));
    if (index !== -1) {
      set({
        links: [...links.slice(0, index), { ...links[index], ...l }, ...links.slice(index + 1)],
      });
    }
  },

  deleteLink: (id) => {
    get().recordHistory();
    set({ links: get().links.filter((l) => String(l.id) !== String(id)) });
  },
}));
