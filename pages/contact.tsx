import React from 'react'


const contact = () => {
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-gray-600 rounded-lg shadow-md">
      <h2 className="text-3xl tect-center text-pink-600 font-bold mb-6">Kontakt oss</h2>
      <form action="">
         <div className="mb-4">
            <label className="block text-base-200 text-sm font-semibold mb-2" htmlFor="">Ditt navn</label>
            <input placeholder="Joakim Neergård" className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500 required" type="text" />
         </div>
         <div>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="">Epost</label>
            <input placeholder="fotballdrakt@example.com" className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500 required" type="email" />
         </div>
         <div>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor=""></label>
            <input placeholder="" className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500 required" type="text" />
         </div>
      </form>
    </div>
  )
}


export default contact
