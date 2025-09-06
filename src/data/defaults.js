// const createId = () => Date.now() + Math.floor(Math.random() * 1000);
let d = new Date();
let today = d.getFullYear()+'-'+String(d.getMonth() + 1).padStart(2, "0")+'-'+String(d.getDate()).padStart(2, "0")
let tomorrowDate = new Date(d);
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
let tomorrow = tomorrowDate.getFullYear()+'-'+String(tomorrowDate.getMonth() + 1).padStart(2, "0")+'-'+String(tomorrowDate.getDate()).padStart(2, "0")

export const DEFAULT_CATEGORIES = [
  {id: 1, name: 'Home'},
  {id: 2, name: 'Job'},
  {id: 3, name: 'Other'},
];

export const DEFAULT_TAGS = [
  {id: 1, name: 'calls'},
  {id: 2, name: 'meetings'},
  {id: 3, name: 'birthdays'},
  {id: 4, name: 'to buy'},
  {id: 5, name: 'family'},
  {id: 6, name: 'Maria'},
];

export const DEFAULT_TASKS = [
  { id: 1, name: 'to do the dishes', description: 'some text description', completed: false, categoryId: 1, priority: 1, dueDate: "2025-08-29", tags: [] },
  { id: 2, name: 'to call the plumber', description: 'some text description', completed: false, categoryId: 1, priority: 2, dueDate: today, tags: [1] },
  { id: 3, name: 'to complete the authorization module', description: 'some text description', completed: true, categoryId: 2, priority: 1, dueDate: "2025-09-01", tags: [] },
  { id: 4, name: 'to buy a present for Maria', description: 'some text description', completed: false, categoryId: 3, priority: 3, dueDate: tomorrow, tags: [4,6]   },
  { id: 5, name: 'to send the report to the boss', description: 'some text description', completed: false, categoryId: 2, priority: 3, dueDate: "2026-08-31", tags: [] },
  { id: 6, name: "To pay for my daughter's English lessons", description: 'some text description', completed: false, categoryId: 1, priority: 2, dueDate: "2025-09-31", tags: [5,4] },
  { id: 7, name: "Frank's birthday", description: 'some text description', completed: false, categoryId: 3, priority: 1, dueDate: "2025-09-25", tags: [3,1] },
]