'use client'

import NavBar from "@/components/navBar";
import SearchedTable from "@/components/searchedTable";


export default function Produto() {
  
  return (
    <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-r bg-gray-200 ">
            <div className="max-w-7xl w-full bg-white p-8 rounded-md text-center">
            <h1 className="text-xl sm:text-4xl font-bold mb-4">Gerenciamento de Produtos</h1>
            <br />
                <div className="mx-auto">
                    <SearchedTable />
                </div>
            </div>
        </div>
    </>
  );
}
