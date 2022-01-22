import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom/";
import CalendarHome from "./CalendarHome";
import { UserProvider } from "../../context/UserContext";
import { WorkoutProvider } from "../../context/WorkoutContext";

jest.mock("../../context/UserContext");

const server = setupServer(
  rest.get(
    "https://psdgtyeifanapnczvbzn.supabase.co/rest/v1/day",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            workouts: 227,
          },
        ])
      );
    }
  ),

  rest.get(
    "https://psdgtyeifanapnczvbzn.supabase.co/rest/v1/day",
    (req, res, ctx) => {
      return res(ctx.json([{ theme: "Abs" }]));
    }
  )
);
describe("render test", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  it("calendar test", async () => {
    render(
      <MemoryRouter initialEntries={["/calendar?date=2022-01-21"]}>
        <UserProvider mockUser={{ id: 1, email: "email@gmail.com" }}>
          <WorkoutProvider>
            <Route path="/calendar">
              <CalendarHome />
            </Route>
          </WorkoutProvider>
        </UserProvider>
      </MemoryRouter>
    );

    await screen.findByText("Mon");
    await screen.findByText("Abs");

    await screen.findByText("I have no workouts today.");
    await screen.findByText("Arnold Shoulder Press");
  });
});
