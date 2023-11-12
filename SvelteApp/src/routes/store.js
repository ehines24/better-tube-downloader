import { writable } from 'svelte/store';

export const vidAudStore = writable(0);

const store = writable({}); 

export default store;