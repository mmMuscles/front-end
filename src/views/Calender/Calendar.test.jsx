import { rest } from "msw";
import { setUpServer } from "msw/node";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Switch } from "react-router-dom/";
import CalendarHome from "./CalendarHome";
import { UserProvider } from "../../context/UserContext";
import CalenderList from "../../components/Calendar/CalenderList";

describe("render test", () => {
  it("testing Calendar", () => {
    render(
      <MemoryRouter initialEntries={["/calendar"]}>
        <UserProvider mockUser={{ id: 2, email: "heyemail@gmail.com" }}>
          <CalendarHome />
        </UserProvider>
      </MemoryRouter>
    );

    screen.getByText("add workouts");

    const list = screen.getByLabelText("list");

    fireEvent.change(list, { target: { value: "Arms" } });
    screen.getByText("Arms");
  });
});
