import { CronJob } from 'cron'
import { cacheReset } from './cacheReset';

console.log('Before job instantiation');
const job = new CronJob('0 0 0 * * 6', async () => {
   await cacheReset();
   console.log('Cache Cleared!');
});
job.start();


/*
// runs every second
console.log('Before job instantiation');
const job = new CronJob('* * * * * *', async () => {
   await cacheReset();
   console.log('Cache Cleared!');
});
job.start();
*/