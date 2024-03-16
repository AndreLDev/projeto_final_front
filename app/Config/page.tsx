'use client'

import NavBar from "../../components/navBar";


export default function Config() {

    return (
        <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-r bg-blue-100 ">
                <div className="max-w-7xl w-full bg-white p-8 rounded-md text-center shadow-xl">
                    <h1 className="text-xl sm:text-4xl font-bold mb-4">Configuração</h1>
                    <br />
                    <div className="mx-auto">
                        <h2>Em Desenvolvimento...</h2>
                    </div>
                </div>
            </div>
        </>
    );
}