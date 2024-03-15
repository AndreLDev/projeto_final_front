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

export default function EditProductModal({ isOpen, onOpenChange, onClose, id }) {
  const [product, setProduct] = useState({});
  const [desciption, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const fetchProduct = async () => {
    try {
      const response = await fetch("https://localhost:8004/api/Produto/" + id);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
        fetchProduct();
      }
  }, [isOpen]);

  useEffect(() => {
    setDescription(product.desciption || "");
    setPrice(product.price || "");
    setStock(product.stock || "");
    setMinStock(product.minStock || "");
  }, [product]);

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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,  
          desciption: desciption,
          price: parseFloat(price),
          stock: parseInt(stock),
          minStock: parseInt(minStock),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar produto.");
      }

      onClose();
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      alert("Ocorreu um erro ao editar o produto. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal style={{ maxHeight: '99vh', overflowY: 'auto' }} size={"1xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalBody>
              <h3 className="text-black text-lg font-semibold mb-4">Editar Produto</h3>
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
              <Button auto onClick={closeModal} disabled={isLoading}>Cancelar</Button>
              <Button auto variant="solid" color="success" onClick={handleSubmit} loading={isLoading}>Editar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>

    </Modal>
  );
}
