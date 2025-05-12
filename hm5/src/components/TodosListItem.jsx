import { Button } from './Button.jsx';
import { STATUS_CONFIG } from '../utils/statusConfig.js';

export function TodosListItem({ task, onStatusChange, onArchive }) {
  const handleStatusChange = async (newStatus) => {
    const originalStatus = task.status;
    onStatusChange(task.id, newStatus, originalStatus);
    try {
      await fetch(`https://680fc8ae27f2fdac240f60df.mockapi.io/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Error updating task:', error);
      onStatusChange(task.id, originalStatus, newStatus);
    }
  };

  const handleArchive = async () => {
    onArchive(task.id);
    try {
      await fetch(`https://680fc8ae27f2fdac240f60df.mockapi.io/tasks/${task.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error archiving task:', error);
      onArchive(task.id, true);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-2">
      <h3 className="text-lg font-medium">{task.title}</h3>
      <div className="flex gap-2 mt-2">
        {STATUS_CONFIG[task.status].transitions &&
          Object.entries(STATUS_CONFIG[task.status].transitions).map(([status, label]) => (
            status === 'archive' ? (
              <Button key={status} onClick={handleArchive} variant="secondary">
                {label}
              </Button>
            ) : (
              <Button key={status} onClick={() => handleStatusChange(Number(status))}>
                {label}
              </Button>
            )
          ))}
      </div>
    </div>
  );
}