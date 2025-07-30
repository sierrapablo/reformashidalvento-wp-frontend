/**
 * Starts a rotating message animation on the given element, cycling through
 * the provided messages array every interval ms, with a fade transition duration.
 *
 * @param el - HTMLElement where the messages will be displayed.
 * @param messages - Array of strings to rotate through.
 * @param interval - Time in milliseconds between message changes.
 * @param fadeDuration - Duration in milliseconds for fade-out and fade-in effects.
 */
export function startRotatingMessages(
  el: HTMLElement,
  messages: string[],
  interval: number,
  fadeDuration: number
): void {
  let index = 1;

  setInterval(() => {
    // Fade out
    el.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
    el.style.opacity = '0';

    setTimeout(() => {
      // Change message and fade in
      el.textContent = messages[index];
      index = (index + 1) % messages.length;
      el.style.opacity = '1';
    }, fadeDuration);
  }, interval);
}
