import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch";

function defineTask(call) {
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async (callback) => {
    await call();
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });
};

async function registerBackgroundFetchAsync(minimumInterval) {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: minimumInterval * 60, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export {
    defineTask,
    registerBackgroundFetchAsync,
    unregisterBackgroundFetchAsync
}
