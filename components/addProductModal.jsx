'use client'

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  ModalContent,
} from "@nextui-org/react";

export default function AddProductModal({ isOpen, onOpenChange, onClose }) {
  const [desciption, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleStockChange = (e) => setStock(e.target.value);
  const handleMinStockChange = (e) => setMinStock(e.target.value);

  const handleSubmit = async () => {
    if (!desciption || !price || !stock || !minStock) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://localhost:8004/api/Produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desciption: desciption,
          price: parseFloat(price),
          stock: parseInt(stock),
          minStock: parseInt(minStock),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar produto.");
      }

      setDescription("");
      setPrice("");
      setStock("");
      setMinStock("");

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Ocorreu um erro ao adicionar o produto. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal style={{ maxHeight: '99vh', overflowY: 'auto' }} size={"1xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <h3 className="text-black text-lg font-semibold mb-4">Adicionar Novo Produto</h3>
              <div className="flex flex-col gap-4">
                <Input
                  label="Descrição"
                  value={desciption}
                  onChange={handleDescriptionChange}
                  placeholder="Digite a descrição do produto"
                />
                <Input
                  label="Preço"
                  type="number" min="0.00" step="0.01"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="Digite o preço do produto"
                />
                <Input
                  label="Estoque"
                  type="number"
                  value={stock}
                  onChange={handleStockChange}
                  placeholder="Digite a quantidade em estoque"
                />
                <Input
                  label="Estoque Mínimo"
                  type="number"
                  value={minStock}
                  onChange={handleMinStockChange}
                  placeholder="Digite a quantidade mínima em estoque"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button auto onClick={onClose} disabled={isLoading}>Cancelar</Button>
              <Button auto variant="solid" color="success" onClick={handleSubmit} loading={isLoading}>Adicionar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>

    </Modal>
  );
}
