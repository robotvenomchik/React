import { TodosList } from './TodosList.jsx';
import { STATUS_CONFIG } from '../utils/statusConfig.js';

export function TodosLists({ tasks, onStatusChange, onArchive }) {
  const sortedStatuses = Object.keys(STATUS_CONFIG)
    .map(Number)
    .sort((a, b) => STATUS_CONFIG[a].order - STATUS_CONFIG[b].order);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {sortedStatuses.map(status => (
        <TodosList
          key={status}
          status={status}
          tasks={tasks}
          onStatusChange={onStatusChange}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}