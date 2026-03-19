import { act } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";

describe("App smoke test", () => {
  it("renders the homepage shell without crashing", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    await act(async () => {
      createRoot(container).render(<App />);
    });

    expect(container.textContent).toMatch(/Opera Creatives/i);
  });
});
