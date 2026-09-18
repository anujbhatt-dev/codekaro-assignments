import { Link, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat'
import { Send } from 'lucide-react'
import Image from './components/Image'

function App() {

  return (
    <div className='min-h-screen'>
      <header className='sticky top-0 z-10 border-b border-zinc-700 bg-zinc-800/95 backdrop-blur'>
        <div className='mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6'>
          <Send className='size-5 shrink-0' />
          <nav className='flex items-center gap-4 text-sm uppercase sm:gap-6'>
            <Link to="/">
              Home
            </Link>
            <Link to="/image">
              Image
            </Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path="/image" element={<Image/>}/>
      </Routes>
    </div>
  )
}

export default App
