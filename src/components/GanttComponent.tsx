import { useEffect, useMemo, useRef } from 'react';
import ReactGantt, {
  type ReactGanttProps,
  type Link,
  type ReactGanttRef,
  type SerializedTask,
} from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { useGanttStore } from '../store';

export default function DemoZustand() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const {
    tasks,
    links,
    config,
    setZoom,
    addTask,
    upsertTask,
    deleteTask,
    addLink,
    upsertLink,
    deleteLink,
    undo,
    redo,
  } = useGanttStore();

  useEffect(() => {
    document.title = 'DHTMLX React Gantt | Zustand';
  }, []);

  const templates: ReactGanttProps['templates'] = useMemo(
    () => ({
      format_date: (d) => d.toISOString(),
      parse_date: (s) => new Date(s),
    }),
    []
  );

  const data: ReactGanttProps['data'] = useMemo(
    () => ({
      save: (entity, action, payload, id) => {
        if (entity === 'task') {
          const task = payload as SerializedTask;
          if (action === 'create') return addTask(task);
          else if (action === 'update') upsertTask(task);
          else if (action === 'delete') deleteTask(id);
        } else if (entity === 'link') {
          const link = payload as Link;
          if (action === 'create') return addLink(link);
          else if (action === 'update') upsertLink(link);
          else if (action === 'delete') deleteLink(id);
        }
      },
    }),
    [addTask, addLink, upsertTask, upsertLink, deleteTask, deleteLink]
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />
      <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />
    </div>
  );
}
