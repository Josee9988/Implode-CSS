import updateNotifier from 'update-notifier';

import pkg from '../../package.json';

/**
 * Summary: when we close the process it will show if there is an update available.
 * @async
 * @return {void}
 */
export default async function notifyForUpdates() {
    updateNotifier({
        pkg: {
            name: pkg.name,
            version: pkg.version,
        },
        updateCheckInterval: 1000 * 60 * 60 * 24, // every day
    }).notify();
}
