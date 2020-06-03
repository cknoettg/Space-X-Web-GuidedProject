import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import MutationObserver from 'mutation-observer'
import { missionsFixtures } from './components/MissionsList.test'
import { fetchMissions as mockFetchMissions } from './api/fetchMissions'
import App from './App'
import MissionsList from './components/MissionsList'

jest.mock('./api/fetchMissions.js')
global.MutationObserver = MutationObserver

test('App fetches and renders missions data', async () => {
  mockFetchMissions.mockResolvedValueOnce({
      data: missionsFixtures})

  //const { getByText, queryAllByTestId, getByTestId } = render(<MissionsList />)
  const { getByTestId, queryAllByTestId } = render(<App />)

  const button = getByTestId('button')

  fireEvent.click(button)

  await waitFor(() => {
    expect(queryAllByTestId('mission')).toHaveLength(2)
    expect(queryAllByTestId('mission')).not.toHaveLength(0)

  })

  // const missionElems = await queryAllByTestId('mission')
  // expect(missionElems).toHaveLength(0)

  //alt implementation:
//   mockFetchMissions.mockResolvedValueOnce({data: missionsFixture});
//   const {getByText, queryAllByText} = render(<App />);
//   const button = getByText(/get data/i);
//   fireEvent.click(button);
//   getByText(/we are fetching data/i);
//   await waitFor(()=>{
//     expect(queryAllByText(/kirkby moonshot/i)).toHaveLength(1);
//   });
})