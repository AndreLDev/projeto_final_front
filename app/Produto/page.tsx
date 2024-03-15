'use client'

import React, { useState, useEffect } from "react";
import NavBar from "@/components/navBar";
import SearchedTable from "@/components/searchedTable";

export default function Produto() {

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-r bg-blue-100 ">
        <div className="max-w-7xl w-full bg-white p-8 rounded-md text-center shadow-xl">
          <h1 className="text-xl sm:text-4xl font-bold mb-4">Gerenciamento de Produtos</h1>
          <br />
          <div className="mx-auto">
            <SearchedTable/>
          </div>
        </div>
      </div>
    </>
  );
}

