export const getWorkouts = async () => {
    const response = await fetch('https://wger.de/api/v2/exercise/?language=2&limit=100')
    const data = await response.json()
    return data.results
}