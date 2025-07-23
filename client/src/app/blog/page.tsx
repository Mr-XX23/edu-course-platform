"use client"

import React from 'react'
import { useRouter } from "next/navigation";


const blogPage = () => {
  const router = useRouter

  const handleNext = ()=> {
    if ( true)  {
       router.push("/add")
    }
   
  }
  return (
    <div className="p-4">
      <div className=" flex justify-between max-w-lg mt-2 w-full">
        <div className='text-5xl'>Blogs</div>
        <button onClick={handleNext}className='mt-2 bg-teal-500 px-3 py-2 text-sm rounded-2xl text-white cursor-pointer'>Add Blogs</button>
      </div>
      <div className="mt-8 flex">
        <div className="flex flex-col border-2">
          <h3 className='p-2 border-b-2'>Title</h3>
          <div className="flex flex-col p-2 gap-2">
            <span>What is name ?</span>
          </div>
        </div>
        <div className="flex flex-col border-2">
          <h3 className='p-2 border-b-2'>Author</h3>
          <div className="flex flex-col p-2 gap-2">
            <span>Rohan Balami</span>

          </div>
        </div>
        <div className="flex flex-col border-2">
          <h3 className='p-2 border-b-2'>Created Date</h3>
          <div className="flex flex-col p-2 gap-2">
            <span>16/02/2025</span>
          </div>
        </div>
        <div className="flex flex-col border-2">
          <h3 className='p-2 border-b-2'>Action</h3>
          <div className="flex flex-col p-2 gap-2">
            <div className="flex gap-2">
              <div className='bg-teal-500 px-3 py-2 text-sm rounded-2xl text-white cursor-pointer'>Edit</div>
              <div className="bg-teal-500 px-3 py-2 text-sm rounded-2xl text-white cursor-pointer">Delete</div>
              <div className="bg-teal-500 px-3 py-2 text-sm rounded-2xl text-white cursor-pointer">View</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default blogPage;