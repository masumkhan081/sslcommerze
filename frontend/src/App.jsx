import React from 'react'
import axios from 'axios';
import { postData, url, config } from './data/static-data';
import { useState } from 'react';

export default function App() {

  const [isPaying, setIsPaying] = useState(true)
  const [name, setName] = useState("masum")
  const [amount, setAmount] = useState(100)

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      name: name,
      amount: amount
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    };

    fetch('http://localhost:3000/order', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Success:', data); // Handle the response data
        window.location.replace(data.url);

      })
      .catch(error => {
        console.error('Error:', error); // Handle errors
      });
  }

  // 
  return (
    <div className=' w-screen h-screen bg-slate-200  flex flex-col  justify-center items-center gap-4'>

      <button onClick={() => setIsPaying(!isPaying)} className='p-1 '>pay-up</button>
      {isPaying && <form className='flex flex-col  gap-2  p-4 bg-slate-300 border rounded-md' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
          <span>name:</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='rounded text-center'></input>
        </div>
        <div className='flex flex-col gap-1'>
          <span>amount:</span>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='rounded text-center'></input>
        </div>

        <div className='mt-4 '>
          <button type='submit' className='px-2 py-0 bg-teal-900  text-slate-200'>Confirm</button>
        </div>
      </form>}
    </div>
  )
}



