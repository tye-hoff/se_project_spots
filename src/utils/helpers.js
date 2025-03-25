export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    // set not loading text
    btn.textContent = defaultText;
  }
}