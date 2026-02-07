import React, { useEffect, useRef, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./Components/NavBar"
import FrontPage from "./Pages/FrontPage"
import Loading from "./Components/Loading"
import gsap from "gsap"
import ReactLenis from "lenis/react"
import Footer from "./Components/Footer"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef()

   useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 500)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])
 
  return (
      <BrowserRouter>
        {<NavBar />}
        <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} /> 
        {isLoading? (<Loading onComplete={() => setIsLoading(false)} />):
          (<div>
          <Routes>
          
          <Route path="/" element={<FrontPage />}/>
            
    
        </Routes>
        <Footer />
        </div>)}
        
        
      </BrowserRouter>
  )
}

export default App
