"use client";
import { useState } from "react";
import NavBar from "../../components/navBar";
import {
  Table,
  TableRow,
  TableCell,
  Button,
  Input,
  Select,
  Radio,
  RadioGroup,
  SelectItem,
  TableColumn,
  TableHeader,
  TableBody,
} from "@nextui-org/react";

interface Product {
  CodigoProduto: string;
  DescricaoProduto: string;
  Preco: string;
  Quantidade: string;
  Unidade: string;
  Total: number;
}

const Requisicao: React.FC = () => {
  const [formvalue, setFormvalue] = useState({
    id: "",
    quantidade: "",
  });
  const [produtoData, setProdutoData] = useState({
    DescricaoProduto: "",
    stock: "",
    Preco:"",
    minStock: ""
  });
  const [produtosTabela, setProdutosTabela] = useState<Product[]>([]);

  const handleInput = async (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });

    try {
      if (!value.trim()) {
        throw new Error("ID não pode ser vazio");
      }

      const encodedId = encodeURIComponent(value.trim());
      const response = await fetch(`http://3.145.53.73:8004/api/Produto/${encodedId}`);
      
      if (!response.ok) {
        throw new Error(`Erro na solicitação GET: ${response.status}`);
      }
      
      const data = await response.json();
      
      setProdutoData({
        DescricaoProduto: data.desciption,
        stock: data.stock,
        Preco: data.price,
        minStock: data.minStock
      });
    } catch (error) {
      console.error("Erro na solicitação GET:", error);
    }
  };

  const adicionarProduto = () => {
    const newProduct: Product = {
      CodigoProduto: formvalue.id,
      DescricaoProduto: produtoData.DescricaoProduto,
      Preco: produtoData.Preco,
      Quantidade: formvalue.quantidade,
      Unidade: "unidade",
      Total: parseFloat(produtoData.Preco) * parseFloat(formvalue.quantidade)
    };
    setProdutosTabela([
      ...produtosTabela,
      newProduct
    ]);
    setFormvalue({ ...formvalue, id: "", quantidade: "" });
  };

  const removerProduto = (index: number) => {
    const updatedProducts = [...produtosTabela];
    updatedProducts.splice(index, 1);
    setProdutosTabela(updatedProducts);
  };


  const categorias = [
    { value: "gerencia", label: "Gerencia" },
    { value: "cliente", label: "Cliente" },
    { value: "funcionario", label: "Funcionario" },
  ];
  const motivos = [
    { value: "gerencia", label: "Gerencia" },
    { value: "cliente", label: "Cliente" },
    { value: "funcionario", label: "Funcionario" },
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center text-black bg-gradient-to-r bg-blue-100 ">
        <div className="max-w-7xl w-full bg-white p-8 rounded-md mt-8 mb-8 shadow-xl">
          <h1 className="text-2xl font-bold mb-4">
            Novo pedido de requisição de saída
          </h1>
          <div className="border border-solid border-gray-300 rounded p-4 mb-8">
            <h2 className="text-lg font-semibold mb-2">
              Dados Principais
            </h2><br></br>           

            <div className="flex flex-col lg:flex-row lg:gap-2">
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">ID</label>
                <Input
                  type="number"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Departamento</label>
                <Input
                  type="text"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Data</label>
                <Input
                  type="date"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
            </div><br></br>

            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">ID Fun.</label>
                <Input
                  type="number"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Nome Funcionário</label>
                <Input
                  type="text"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Cargo</label>
                <Input
                  type="text"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
            </div><br></br>

            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Categoria Motivo</label>
                <Select
                  label="Categoria Motivo"
                  placeholder="Selecione uma categoria"
                  className="max-w-xs w-full px-4 py-2 rounded text-black"
                >
                  {categorias.map((categoria) => (
                    <SelectItem
                      className="text-black
                  "
                      key={categoria.value}
                      value={categoria.value}
                    >
                      {categoria.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Motivo</label>
                <Select
                  label="Motivo"
                  placeholder="Selecione o motivo"
                  className="max-w-xs w-full px-4 py-2 rounded text-black"
                >
                  {motivos.map((motivo) => (
                    <SelectItem
                      className="text-black"
                      key={motivo.value}
                      value={motivo.value}
                    >
                      {motivo.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <fieldset className="border border-solid border-gray-300 rounded p-4 ">
                  <legend className="text-lg font-semibold mb-2">
                    Nível de Prioridade
                  </legend>
                  <RadioGroup>
                    <Radio name="prioridade" value="Urgente">
                      Urgente
                    </Radio>
                    <Radio name="prioridade" value="Médio">
                      Médio
                    </Radio>
                    <Radio name="prioridade" value="Baixo">
                      Baixo
                    </Radio>
                  </RadioGroup>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="border border-solid border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Detalhes do Produto</h2><br></br>
            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Código do Produto</label>
                <Input
                  type="number"
                  id="CodigoProduto"                  
                  name='id' value={formvalue.id} onChange={handleInput}
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Descrição</label>
                <Input
                  type="text"
                  id="DescricaoProduto"
                  disabled
                  value={produtoData.DescricaoProduto}
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Quantidade</label>
                <Input
                  type="number"
                  id="Preco"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                  value={formvalue.quantidade}
                  onChange={(e) => setFormvalue({ ...formvalue, quantidade: e.target.value })}
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Estoque atual</label>
                <Input
                  type="number"
                  id="stock"
                  value={produtoData.stock}
                  disabled
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <br></br><Button type="button" color="primary" variant="solid" className="px-4" onClick={adicionarProduto}>
                  Adicionar
                </Button>
              </div>
            </div><br></br>
            
            <Table
              aria-label="Example static collection table"
              isStriped
              className="w-full mt-4"
            >
              <TableHeader>
                <TableColumn>Código</TableColumn>
                <TableColumn>Descrição</TableColumn>
                <TableColumn>Quantidade</TableColumn>
                <TableColumn>Unidade</TableColumn>
                <TableColumn>Preço</TableColumn>
                <TableColumn>Total</TableColumn>
                <TableColumn>-</TableColumn>
              </TableHeader>
              <TableBody>
                {produtosTabela.map((produto, index) => (
                  <TableRow key={index}>
                    <TableCell>{produto.CodigoProduto}</TableCell>
                    <TableCell>{produto.DescricaoProduto}</TableCell>
                    <TableCell>{produto.Quantidade}</TableCell>
                    <TableCell>{produto.Unidade}</TableCell>
                    <TableCell>{produto.Preco}</TableCell>
                    <TableCell>{produto.Total}</TableCell>
                    <TableCell>
                      <Button type="button" color="danger" variant="solid" onClick={() => removerProduto(index)}>
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requisicao;
