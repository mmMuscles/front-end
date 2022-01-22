import { fn } from "moment";

const mockUserService = {
  getUser: jest.fn(),
  getSession: jest.fn(),
  signUpUser: jest.fn(),
  signInUser: jest.fn(),
  signOutUser: jest.fn(),
  logOutUser: jest.fn(),
  addWorkout: jest.fn(),
  getWorkoutArray: jest.fn(),
  getThemeArray: jest.fn(),
  deleteWorkout: jest.fn(),
};

export default mockUserService;
