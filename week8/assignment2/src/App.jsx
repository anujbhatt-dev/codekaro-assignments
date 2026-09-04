import Header from "./components/Header"
import TouristPlace from "./components/TouristPlace"
import { touristPlaces } from "./data"

function App() {
  return (
    <>
      <Header/>
      <TouristPlace places={touristPlaces}/>
    </>
  )
}

export default App
