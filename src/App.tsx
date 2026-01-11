import './App.css'
import Clock from './components/Clock'
import Countdown from './components/Countdown'
import Documents from './components/Documents'
import Kurs from './components/Kurs'
import Expense from './components/Expense'
import Itinerary from './components/Itinerary'
import Button from './components/ScrollToTopButton'

function App() {

  return (
    <>
      <div className='min-h-dvh pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] flex flex-col gap-16 sm:gap-24 md:gap-30 lg:gap-36 items-center mb-24'>
        {/* Countdown & Clock */}
        <div className='flex flex-col mt-12 sm:mt-20 md:mt-24 space-y-12 sm:space-y-24'>
          {/* Countdown */}
          <Countdown targetDate="2026-02-18T00:00:00" />

          {/* China Clock and Indonesia Clock */}
          <div className="flex flex-col gap-6 sm:mb-0 sm:flex-row sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 justify-center">
            <Clock country="CN" />
            <Clock country="ID" />
          </div>
        </div>

        <Documents />

        <div className='flex flex-col gap-20 xl:gap-10 xl:flex-row'>
          <Kurs />
          <Expense />
        </div>

        <Itinerary />

        {/* Back To Top Button */}
        <Button />
      </div>
    </>
  )
}

export default App
