import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserProvider } from "../../context/UserContext";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Profile from "./Profile";

let mockResponse = {
    goal_1: "Lift a car",
    goal_2: "beat up my bully",
    username: "Karl",
    weight: "140",
    weight_goal: "260"
}

const server = setupServer(
    // Describe the requests to mock.
    rest.get('https://psdgtyeifanapnczvbzn.supabase.co/rest/v1/profiles', (req, res, ctx) => {
      return res(
          ctx.json(mockResponse))
    }),
  )
  
  beforeAll(() => {
    // Establish requests interception layer before all tests.
    server.listen()
  })
  afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close()
  })  

// Combined behavior & snapshot test
it("allow user to change profile inputs", async () => {
  const { container } = render(
        <UserProvider >
          <WorkoutProvider>
              <Profile />
          </WorkoutProvider>
        </UserProvider>
  );

  expect(container).toMatchSnapshot();

  const nameField = screen.getByLabelText("Name");
  const primaryGoalField = screen.getByLabelText("Primary Goal");
  const secondaryGoalField = screen.getByLabelText("Secondary Goal");
  const weightField = screen.getByLabelText("Weight");
  const weightGoalField = screen.getByLabelText("Weight goal");
  const updateBtn = screen.getByRole("button", { name: "updating" });

  fireEvent.change(nameField, {
    target: { value: "karl new" },
  });

  mockResponse.username = 'karl new'

  fireEvent.change(primaryGoalField, {
    target: { value: "win" },
  });

  mockResponse.goal_1 = 'win'

  fireEvent.change(secondaryGoalField, {
    target: { value: "win more" },
  });

  mockResponse.goal_2 = 'win more'

  fireEvent.change(weightField, {
    target: { value: "130" },
  });

  mockResponse.weight = '130'

  fireEvent.change(weightGoalField, {
    target: { value: "140" },
  });

  mockResponse.weight_goal = '140'

  fireEvent.click(updateBtn);
  await screen.findAllByDisplayValue('140')

  expect(nameField).toHaveValue("karl new");
  expect(primaryGoalField).toHaveValue("win");
  expect(secondaryGoalField).toHaveValue("win more");
  expect(weightField).toHaveValue("130");
  expect(weightGoalField).toHaveValue("140");


  return waitFor(() => {
    screen.getByDisplayValue("karl new");
  });
});
