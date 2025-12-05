// small animation helpers used by Visualizer.jsx
export function sleep(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}

// sequential runner: runs an array of async functions in order
export async function runSequential(tasks = [], delayBetween = 120) {
  for (const t of tasks) {
    await t();
    if (delayBetween) await sleep(delayBetween);
  }
}
