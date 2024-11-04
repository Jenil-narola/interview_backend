const AsyncLimiter = require('async-limiter');

/**
 * @typedef {Object} Task
 * @property {String} name
 * @property {String} status
 */
class AsyncLimiterManager {
    constructor(options = { concurrency: 1 }) {
        this.limiter = new AsyncLimiter({ concurrency: options.concurrency });

        /**
         * @type {Task[]}
         */
        this.tasks = [];

        return this;
    }

    /**
     * @returns {AsyncLimiter}
     */
    getInstance() {
        return this.limiter;
    }

    /**
     * 
     * @param {Function} fn
     */
    add(fn) {
        this.limiter.push(async (done) => {
            try {
                await fn(); // Attempt to run the task
            } catch { }
            finally {
                done();
            }
        });
    }
}
module.exports = AsyncLimiterManager;