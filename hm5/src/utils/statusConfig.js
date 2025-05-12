export const STATUS_CONFIG = {
  0: {
    name: 'To Do',
    transitions: { 1: 'In Progress' },
    order: 1,
    formInclude: true,
  },
  4: {
    name: 'On Hold',
    transitions: { 0: 'To Do', 1: 'In Progress' },
    order: 2,
    formInclude: false,
  },
  1: {
    name: 'In Progress',
    transitions: { 0: 'To Do', 2: 'Done', 4: 'On Hold' },
    order: 3,
    formInclude: true,
  },
  2: {
    name: 'Done',
    transitions: { archive: 'To Archive' },
    order: 4,
    formInclude: true,
  },
};