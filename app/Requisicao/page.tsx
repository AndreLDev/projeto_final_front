"use client";

import NavBar from "@/components/navBar";
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

const Requisicao: React.FC = () => {
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
                <label className="block mb-1 w-full px-6 rounded">Categorias Motivo</label>
                <Select
                  label="Favorite Animal"
                  placeholder="Select an animal"
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
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Descrição</label>
                <Input
                  type="text"
                  id="DescricaoProduto"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Estoque</label>
                <Input
                  type="number"
                  id="Estoque"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
              <div className="flex-1 mb-4 lg:mb-0">
                <label className="block mb-1 w-full px-6 rounded">Quantidade</label>
                <Input
                  type="number"
                  id="Quantidade"
                  className="w-full px-4 rounded"
                  placeholder="Digite aqui..."
                />
              </div>
            </div><br></br>
            <div className="mt-4">
              <Button type="button" color="primary" variant="solid">
                Adicionar
              </Button>
            </div>
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
                <TableRow key="1">
                  <TableCell>10</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requisicao;
