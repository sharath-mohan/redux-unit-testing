import { it, describe, expect, beforeAll, afterEach, afterAll } from "vitest";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./test/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseURL } from "./config/config";
export const handlers = [
  rest.get(`${baseURL}/users`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        },
      ]),
      ctx.delay(150)
    );
  }),
];
const server = setupServer(...handlers);
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
describe("App.jsx", () => {
  it("fetches and displays list of users", async () => {
    renderWithProviders(<App />);
    expect(screen.getByText("loading")).toBeInTheDocument();
    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
