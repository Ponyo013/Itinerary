import './App.css'
import Clock from './components/Clock'
import Countdown from './components/Countdown'
import Itinerary from './components/Itinerary'

function App() {

  return (
    <>
      <div className='flex flex-col gap-48 items-center'>

        {/* Countdown & Clock */}
        <div className='flex flex-col mt-24 space-y-24'>

          {/* Countdown */}
          <Countdown targetDate="2026-02-18T00:00:00" />

          {/* China Clock and Indonesia Clock */}
          <div className="flex gap-12 justify-center">
            <Clock country="CN" />
            <Clock country="ID" />
          </div>
        </div>

        {/* Itinerary */}
        <Itinerary />

      </div>
    </>
  )
}

export default App
