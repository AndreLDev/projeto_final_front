'use client'

import NavBar from "../../components/navBar";
import TableLog from "../../components/tableLog";


export default function Log() {
  
  return (
    <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-r bg-blue-100 ">
        <div className="max-w-7xl w-full bg-white p-8 rounded-md text-center shadow-xl">
          <h1 className="text-xl sm:text-4xl font-bold mb-4">Registro de Logs do Benchmarking</h1>
          <br />
          <div className="mx-auto">
            <TableLog/>
          </div>
        </div>
      </div>
    </>
  );
}