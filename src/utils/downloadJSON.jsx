// utils/downloadJSON.js
export function downloadJSON(
  data,
  filename = `todos-${new Date().toISOString().slice(0,10)}.json`
) {
  try {
    const json = JSON.stringify(
      data,
      (_, v) => (v instanceof Date ? v.toISOString() : v),
      2
    );
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (e) {
    console.error("Export JSON failed:", e);
  }
}
