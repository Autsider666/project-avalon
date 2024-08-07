import {watch} from 'chokidar';
import fs from 'fs-extra';

const watchFlag = process.argv.includes("--watch");

const sourceDir: string = 'src/registry';
const targetDir: string = 'registry';

try {
    // @ts-expect-error It's fixed, I swear! :P
    await sync();

    if (watchFlag) {
        watchSync();
        console.log("👀 Watching!");
    }

} catch (error) {
    console.error(error);
    process.exit(1);
}

function watchSync(): void {
    const watcher = watch(sourceDir, {
        // persistent: true,
        // usePolling: true,
    });

    // Watch for all events in source folder
    watcher.on("change", sync);
}

async function sync(): Promise<void> {
    try {
        await fs.copy(sourceDir, targetDir);
        console.log("👍 Synced!");
    } catch (err) {
        console.log(err);
    }
}