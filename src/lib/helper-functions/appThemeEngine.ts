export default function appThemeEngine(isDarkMode: boolean) {
  const root = document.documentElement;
  if (isDarkMode) {
    //backgrounds
    root?.style.setProperty("--primary-background-color", "#121212");
    root?.style.setProperty("--primary-background-color-1", "#1f1e1e");
    root?.style.setProperty("--primary-background-color-2", "#2c2b2b");
    root?.style.setProperty("--primary-background-color-3", "#353434");
    root?.style.setProperty("--primary-background-color-4", "#414040");
    root?.style.setProperty("--grad-clr4", "#141414");
    root?.style.setProperty("--grad-clr5", "#2c2b2b");

    //text
    root?.style.setProperty("--primary-text-color", "#e2e2e2");

    //inputs
    root?.style.setProperty("--input-background-color", "#252525");
    root?.style.setProperty("--input-border-color", "#424244");
    root?.style.setProperty("--input-border-hover-color", "#52525b");
  } else {
    //backgrounds
    root?.style.setProperty("--primary-background-color", "#ffffff");
    root?.style.setProperty("--primary-background-color-1", "#efeff0");
    root?.style.setProperty("--primary-background-color-2", "#fafafa");
    root?.style.setProperty("--primary-background-color-3", "#eeecec");
    root?.style.setProperty("--primary-background-color-4", "#f5f5f5");
    root?.style.setProperty("--grad-clr4", "#fcfcfc");
    root?.style.setProperty("--grad-clr5", "#cccccc");

    //text
    root?.style.setProperty("--primary-text-color", "#2e333d");

    //inputs
    root?.style.setProperty("--input-background-color", "#ffffff");
    root?.style.setProperty("--input-border-color", "#cecece");
    root?.style.setProperty("--input-border-hover-color", "#9999a9");
  }
}
