/**
 * Intentional traceability violations for testing requirements-tracer-action in CI.
 * Included only on branch test/traceability-action-audit — do not merge to main.
 */
function test(_description: string, _fn: () => void): void {}

/** @reviewer qa-team */
test('[FR-005] legacy splash screen still reachable during wind-down', () => {});

test('settings panel opens without a trace id', () => {});

test('[FR-999] undocumented keyboard shortcut', () => {});
