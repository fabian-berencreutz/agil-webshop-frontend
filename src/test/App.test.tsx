import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import App from "../App";

describe("App – produkthämtning", () => {
  it("visar produkter för en inloggad användare", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Testprodukt")).toBeInTheDocument();
  });

  it("visar felmeddelande när produkthämtningen misslyckas", async () => {
    server.use(
      http.get("http://localhost:9003/products", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(/Kunde inte hämta produkter/i),
    ).toBeInTheDocument();
  });
});
