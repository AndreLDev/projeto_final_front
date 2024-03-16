'use client'

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  ModalContent,
} from "@nextui-org/react";

export default function BenchmarkingModal({ isOpen, onOpenChange, onClose, id }) {
  const [benchmarkingData, setBenchmarkingData] = useState({});
  const [isLoading, setIsLoading] = useState(false); 

  const fetchBenchmarkingData = async () => {
    try {
      setIsLoading(true); 
      const response = await fetch(`http://localhost:8004/api/Util/Benckmarking/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch benchmarking data");
      }
      const data = await response.json();
      setBenchmarkingData(data);
    } catch (error) {
      console.error("Error fetching benchmarking data:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBenchmarkingData();
    }
  }, [isOpen, id]);

  const handleClose = () => {
    setBenchmarkingData({});
    onClose();
  };

  return (
    <Modal style={{ maxHeight: '99vh', overflowY: 'auto' }} size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="text-black">
        {(closeModal) => (
          <>
            <ModalBody>
              <h3 className="text-black text-lg font-semibold mb-4">Benchmarking de Preços</h3>
              {isLoading ? ( 
                <p>Carregando...</p>
              ) : (
                Object.keys(benchmarkingData).length !== 0 ? (
                  <>
                    <div className="mb-4">
                      <h4 className="text-gray-500 text-sm mb-2">Mercado</h4>
                      <p className="font-semibold">{benchmarkingData.mercadoTitle}</p>
                      <p className="text-gray-600 text-sm">Preço: R$ {benchmarkingData.mercadoPrice},00</p>
                      <a href={benchmarkingData.mercadoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">Clique aqui</a>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-gray-500 text-sm mb-2">Magazine</h4>
                      <p className="font-semibold">{benchmarkingData.magazineTitle}</p>
                      <p className="text-gray-600 text-sm">Preço: {benchmarkingData.magazinePrice}</p>
                      <a href={benchmarkingData.magazineUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">Clique aqui</a>
                    </div>
                    {benchmarkingData.best === 1 && (
                      <p className="text-yellow-500 font-semibold">Melhor Preço: Mercado</p>
                    )}
                    {benchmarkingData.best === 0 && (
                      <p className="text-blue-500 font-semibold">Melhor Preço: Magazine</p>
                    )}
                  </>
                ) : (
                  <p>Nenhum dado disponível.</p>
                )
              )}
            </ModalBody>
            <ModalFooter>
              <Button auto onClick={handleClose} disabled={isLoading}>Fechar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
