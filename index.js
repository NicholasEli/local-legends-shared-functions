import data from './test-data.js';
import { get_active_heat } from './heat.js';
import { sort_by_average_score, sort_by_highest_score } from './runs.js';

const active_heat = get_active_heat(data);

// No Judges
const runs = sort_by_average_score(data, active_heat);
//const runs = sort_by_highest_score(data, active_heat);
console.log('---');
console.log(runs);
