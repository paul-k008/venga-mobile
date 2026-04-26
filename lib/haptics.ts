/**
 * Centralized haptic feedback. Calls fall through silently when
 * `navigator.vibrate` is unavailable (most desktops, iOS Safari without
 * user gesture, etc.).
 */

function v(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // ignore — older browsers / strict modes
  }
}

export const haptics = {
  light:    () => v(8),
  medium:   () => v(16),
  heavy:    () => v(32),
  success:  () => v([8, 30, 8]),
  warning:  () => v([12, 50, 12]),
};
