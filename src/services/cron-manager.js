const { default: TypeCron } = require("croner");
const Croner = require("croner");
const { v5: uuidV5, v4: uuidV4 } = require('uuid');
const logger = require("./winston");
const LogPrefix = '[CronManager]';
/**
 * @author Jenil Narola
 * @description Cron Manager Service. It helps to manage all cron jobs.
 * 
 * Limitation: All functions made for croner library. So, it will not work with other cron libraries.
 */
class CronManager {
    constructor(managerName = 'CronManager') {
        this.map = new Map();
        this.managerName = managerName;

        /**
         * @private
         */
        this.options = {
            defaultPause: false,
            timezone: null
        }

        logger.verbose(`${LogPrefix}: ${this.managerName} initialized.`, { options: this.options });
    }

    /**
     * 
     * @returns {{name: String, instance: CronManager}} 
     */
    getManager () {
        return {
            name: this.managerName,
            instance: this
        }
    }

    /**
     * @description To add cron job
     * @param {TypeCron} cron
     * @returns {String} name of cron job
     */
    add (cron) {
        if (!(cron instanceof Croner)) {
            throw new Error('Invalid cron instance');
        }

        if (this.map.has(cron.name)) {
            throw new Error(`Cron job with name ${cron.name} already exists`);
        }

        if (this.options.defaultPause) {
            cron.pause();
        }

        if (this.options.timezone) {
            cron.options.timezone = this.options.timezone;
        }

        const cronName = cron.name || uuidV5(this.managerName, uuidV4())
        this.map.set(cronName, cron);
        return cronName;
    }

    /**
     * @description to stop and remove from manage
     */
    remove (name) {
        this.map.get(name)?.stop();
        this.map.delete(name);
        return true;
    }

    /**
     * 
     * @param {String} name 
     * @returns {TypeCron}
     */
    get (name) {
        return this.map.get(name);
    }

    /**
     * @returns {Map<String, TypeCron>}
     */
    getAll () {
        return this.map;
    }

    /**
     * @description stop all cron jobs
     * @returns {Map<String, TypeCron>}
     */
    stopAll () {
        this.map.forEach(job => job.stop());
        return this.map;
    }

    /**
     * @description pause all cron jobs
     * @returns {Map<String, TypeCron>}
     */
    pauseAll () {
        this.map.forEach(job => job.pause());
        return this.map;
    }

    /**
     * @description resume all cron jobs
     * @returns {Map<String, TypeCron>}
     */
    resumeAll () {
        this.map.forEach(job => job.resume());
        return this.map;
    }

    /**
     * @description removed stopped/dead cron jobs
     */
    clean () {
        this.map.forEach((job, key) => {
            if (job.isStopped()) {
                this.map.delete(key);
            }
        });
    }

    /**
     * @description kill all cron jobs and clean CronManager
     */
    destroy () {
        this.stopAll();
        this.map.clear();
    }

    /**
     * @description Configure Manager
     * @param {Object} options
     * @param {Boolean} options.defaultPause - default pause all cron jobs
     * @param {String} options.timezone - default timezone for all cron jobs
     * @returns {Object} updated options
     */
    configure (options) {
        this.options = {
            ...this.options,
            ...options
        }
        logger.info(`${LogPrefix}: ${this.managerName} configured.`, { options: this.options })

        return this.options;
    }
}

module.exports = CronManager;