
/* =======================================================
 *
 * Created by anele on 2020/05/03.
 * @anele_ace
 *
 * =======================================================
 */

const os = require('os');
const desiredMemPerInstance = 1.5 * 1024 * 1024 * 1024;

const testSettings = {
        executors: () => {
            // number of instances that can safely run is restricted by
            // - Number of CPU's, it's generally CPU's - 1
            // - Free memory, going to start conservative and alloacted 1.5Gb per instance

            const memCapacity = Math.ceil(os.freemem() / desiredMemPerInstance);
            const cpuCapacity = os.cpus().length - 1;
            console.log('sharding params: mem:cpu', memCapacity, cpuCapacity);

            if (memCapacity > 0 && cpuCapacity > 0 ) {
                return Math.min(memCapacity, cpuCapacity);
            }
            return 1;
        }
}

module.exports = testSettings;