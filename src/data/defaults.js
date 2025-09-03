const createId = () => Date.now() + Math.floor(Math.random() * 1000);

export const DEFAULT_CATEGORIES = [
  {id: 1, name: 'Category1'},
  {id: 2, name: 'Category2'},
  {id: 3, name: 'Category3'},
];

export const DEFAULT_TASKS = [
  { id: 1, name: 'task1', description: 'some text1', completed: false, categoryId: 1, priority: 1, dueDate: "2025-08-29"   },
  { id: 2, name: 'task2', description: 'some text2', completed: false, categoryId: 1, priority: 2, dueDate: "2025-08-30"  },
  { id: 3, name: 'task3', description: 'some text3', completed: true, categoryId: 2, priority: 1, dueDate: "2025-09-01"  },
  { id: 4, name: 'task4', description: 'some text4', completed: false, categoryId: 3, priority: 3, dueDate: "2025-08-31"   },
  { id: 5, name: 'task 5', description: 'some text5', completed: false, categoryId: 2, priority: 3, dueDate: "2026-08-31"   },
]