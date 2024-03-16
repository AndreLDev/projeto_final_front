'use client'

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  ModalContent,
  Popover, PopoverTrigger, PopoverContent,
} from "@nextui-org/react";

export default function BenchmarkingModal({ isOpen, onOpenChange, onClose, id }) {
  const [benchmarkingData, setBenchmarkingData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


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

  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    const numericString = priceString.replace(/[^0-9,.]/g, '');

    const dotFormattedString = numericString.replace('.', '')
    const dotFormattedString1 = dotFormattedString.replace(',', '.');

    return parseFloat(dotFormattedString1);
  };

  const calculateSavings = (mercadoPriceString, magazinePriceString) => {
    const mercadoPrice = parsePrice(mercadoPriceString);
    const magazinePrice = parsePrice(magazinePriceString);

    const savings = Math.abs(mercadoPrice - magazinePrice);

    return parseFloat(savings.toFixed(2));
  };

  const fetchLog = async () => {
    try {
      setIsSubmitLoading(true);

      const response = await fetch("https://gestaomargi-001-site8.gtempurl.com/api/Logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigorobo: 2,
          nomedev: "0002",
          nomeproduto: benchmarkingData.best === 0 ? benchmarkingData.magazineTitle : benchmarkingData.mercadoTitle,
          valor1: parsePrice(benchmarkingData.mercadoPrice),
          valor2: parsePrice(benchmarkingData.magazinePrice),
          economia: calculateSavings(benchmarkingData.mercadoPrice, benchmarkingData.magazinePrice),
        }),
      });

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);

      if (!response.ok) {
        throw new Error("Erro ao adicionar um Log.");
      }

    } catch (error) {
      console.error("Erro ao adicionar Log:", error);
      alert("Ocorreu um erro ao adicionar o Log. Por favor, tente novamente.");
    } finally {
      setIsSubmitLoading(false);
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

  const handleLog = () => {
    fetchLog()
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
              {isSuccess && (
                <Popover isOpen={isSuccess} position="top-start" color="success">
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Log registrado com sucesso!</div>
                      <div className="text-tiny">O Log foi registrado com sucesso.</div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <Button auto onClick={handleClose} disabled={isLoading}>Fechar</Button>
              <Button color="success" auto onClick={handleLog} hidden={isLoading} disabled={isLoading}>{isSubmitLoading ? "Registrando" : "Registrar Log"}</Button>

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
