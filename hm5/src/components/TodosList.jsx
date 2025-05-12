import { TodosListItem } from './TodosListItem.jsx';
import { STATUS_CONFIG } from '../utils/statusConfig.js';

export function TodosList({ status, tasks, onStatusChange, onArchive }) {
  const filteredTasks = tasks.filter(task => task.status === status);
  return (
    <div className="flex-1 min-w-[250px] max-w-[300px]">
      <h2 className="text-xl font-bold mb-4">
        {STATUS_CONFIG[status].name} ({filteredTasks.length})
      </h2>
      <div>
        {filteredTasks.map(task => (
          <TodosListItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onArchive={onArchive}
          />
        ))}
      </div>
    </div>
  );
}