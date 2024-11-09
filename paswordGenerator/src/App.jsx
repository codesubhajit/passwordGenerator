import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [length, setlength] = useState(0);
  const [isnumber, setIsnumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


    if (isnumber) {
      str += '1234567890'
    }
    if (isCharacter) {
      str += '!@#$%^&*'
    }
    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(random)
    }

    setPassword(pass)
  }, [length, isnumber, isCharacter, setPassword])
  let copyClipboard=()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  useEffect(() => {
    passwordGenerator()
    console.log(length);
    console.log(isnumber);

  }, [isnumber, isCharacter, length])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md  rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>

          <input
            type='text'
            value={password}
            placeholder='password'
            readOnly
            className='outline-none w-full py-1 px-3'
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-o.5 shrink-0 cursor-pointer'
          onClick={()=>{copyClipboard()}}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={isnumber}
              id="numberInput"
              onChange={() => { setIsnumber((prev) => !prev) }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={isCharacter}
              id="characterInput"
              onChange={() => { setIsCharacter((prev) => !prev) }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
