"use client";

import { useAppDispatch } from '@/lib/store/hooks';
import { createInstitute } from '@/lib/store/institute/instituteSlice';
import { IInstitute } from '@/lib/store/institute/instituteTypes';
import React, { useState } from 'react'

const BecomeInstitute = () => {
  const dispatch = useAppDispatch();
  const [ instituteData, setInstituteData ] = useState<IInstitute>({
    instituteName: '',
    institutePhoneNumber: '',
    instituteEmail: '',
    instituteAddress: '',
    institutePanNo: '',
    instituteVatNo: ''
  });

  const handleOnDataChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setInstituteData({
      ...instituteData,
      [name]: value
    })
  }

  const handleInstituteCreation = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    dispatch(createInstitute(instituteData));
  }

  return (
    <form onSubmit={handleInstituteCreation} className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Create Institute</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Institute Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="instituteName"
                    name="instituteName"
                    autoComplete="username"
                    onChange={handleOnDataChange}
                    type="text"
                    placeholder="janesmith"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="institutePhoneNumber"
                    name="institutePhoneNumber"
                    type="text"
                    onChange={handleOnDataChange}
                    placeholder="10 digit phone number"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
 
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="instituteEmail"
                  name="instituteEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="example@example.com"
                  onChange={handleOnDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div> 
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="instituteAddress"
                  name="instituteAddress"
                  type="text"
                  onChange={handleOnDataChange}
                  placeholder='123'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Pan No.
              </label>
              <div className="mt-2">
                <input
                  id="institutePanNo"
                  name="institutePanNo"
                  type="text"
                  autoComplete="email"
                  onChange={handleOnDataChange}
                  placeholder="ABCDE1234F"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                VAT No.
              </label>
              <div className="mt-2">
                <input
                  id="instituteVatNo"
                  name="instituteVatNo"
                  type="text"
                  onChange={handleOnDataChange}
                  placeholder="1234567890"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Create
        </button>
      </div>
    </form>
  )
}

export default BecomeInstitute