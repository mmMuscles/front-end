import AllWorkouts from "./AllWorkouts";
import { screen, render } from '@testing-library/react'
import { rest } from "msw";
import { setupServer } from 'msw/node'
import { MemoryRouter, Route } from "react-router-dom";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { UserProvider } from "../../context/UserContext";

const server = setupServer(
    rest.get('https://wger.de/api/v2/exerciseinfo', (req, res, ctx) => {
        return res(
            ctx.json({
                "results": [
                    {
                        "id": 345,
                        "name": "2 Handed Kettlebell Swing",
                        "uuid": "c788d643-150a-4ac7-97ef-84643c6419bf",
                        "description": "<p>Two Handed Russian Style Kettlebell swing</p>",
                        "creation_date": "2015-08-03",
                        "category": {
                            "id": 10,
                            "name": "Abs"
                        },
                        "muscles": [],
                        "muscles_secondary": [],
                        "equipment": [
                            {
                                "id": 10,
                                "name": "Kettlebell"
                            }
                        ],
                        "language": {
                            "id": 2,
                            "short_name": "en",
                            "full_name": "English"
                        },
                        "license": {
                            "id": 2,
                            "full_name": "Creative Commons Attribution Share Alike 4",
                            "short_name": "CC-BY-SA 4",
                            "url": "https://creativecommons.org/licenses/by-sa/4.0/deed.en"
                        },
                        "license_author": "deusinvictus",
                        "images": [],
                        "comments": [],
                        "variations": []
                    }]
            })
        )
    }),
    rest.get('https://psdgtyeifanapnczvbzn.supabase.co/rest/v1/day', (req, res, ctx) => {
        return res(
            ctx.json([{
                id: 227,
                name: 'Arnold Shoulder Press',
                description: 'Very common shoulder exercise',
                category: 'Chest'
            }])
        )
    })
)

describe('all workouts test', () => {
    beforeAll(() => {
        server.listen()
    })
    afterAll(() => {
        server.close()
    })

    it('should render workouts and add workouts', async () => {
        render(
            <MemoryRouter initialEntries={['/allworkouts?date=2022-01-21&Rest']}>
                <UserProvider>
                    <WorkoutProvider>
                        <Route path='/allworkouts'>
                            <AllWorkouts />
                        </Route>
                    </WorkoutProvider>
                </UserProvider>
            </MemoryRouter>
        )

        screen.getByText('Loading...')

        await screen.findAllByRole('button', { name: 'Add+' }) // You should click this button and test that it's text changed
    })
})
