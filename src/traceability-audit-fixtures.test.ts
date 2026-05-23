/**
 * Intentional traceability violations for testing requirements-tracer-action in CI.
 * Do not merge to main — for PR audit demonstration only.
 */
function test(_description: string, _fn: () => void): void {}

/** @reviewer qa-team */
test('[FR-005] legacy splash screen still reachable during wind-down', () => {});

test('settings panel opens without a trace id', () => {});

test('[FR-999] undocumented keyboard shortcut', () => {});
