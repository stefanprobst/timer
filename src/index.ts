type TimerId = ReturnType<typeof setTimeout>;

export function createTimer(callback: () => void, timeout: number) {
  let timer: TimerId | null = setTimeout(callback, timeout);

  let startedAt = Date.now();
  let remaining = timeout;

  function pause() {
    if (timer === null) return;

    clearTimeout(timer);
    timer = null;
    remaining -= Date.now() - startedAt;
  }

  function resume() {
    if (timer !== null) return;

    timer = setTimeout(callback, remaining);
    startedAt = Date.now();
  }

  return { pause, resume };
}
