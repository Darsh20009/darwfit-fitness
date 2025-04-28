export function getInitialTheme(): "light" | "dark" {
  // Check for stored preference
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  // Check for media preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  // Default to light
  return "light";
}
