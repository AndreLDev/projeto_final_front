'use client'

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../public/PlusIcon";
import { SearchIcon } from "../public/SearchIcon";
import { ChevronDownIcon } from "../public/ChevronDownIcon";
import { IoMdClose } from "react-icons/io";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { capitalize } from "../utils";
import AddProductModal from "./addProductModal";
import EditProductModal from "./editProductModal";

const INITIAL_VISIBLE_COLUMNS = ["id", "desciption", "price", "stock", "minStock", "actions"];

export default function SearchedTable() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const columns = [
    { uid: "id", name: "Código", sortable: true },
    { uid: "desciption", name: "Descrição", sortable: true },
    { uid: "price", name: "Preço", sortable: true },
    { uid: "stock", name: "Estoque Atual", sortable: true },
    { uid: "minStock", name: "Estoque Mínimo", sortable: true },
    { uid: "actions", name: "Ações", sortable: false },
  ];

  useEffect(() => {
    fetchProducts();
  }, [isOpen, isEditModalOpen]);

  const hasSearchFilter = Boolean(filterValue);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://localhost:8004/api/Produto");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteRequest = (id) => {

    fetch(`https://localhost:8004/api/Produto/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir o recurso");
        }
        console.log("Recurso excluído com sucesso");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Erro na solicitação DELETE:", error);
        fetchProducts();
      });
      
  };

  const handleNewProductClick = () => {
    onOpen();
  };

  const handleEditProduct = (id) => {
    setSelectedProduct(id);
    setIsEditModalOpen(true);
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.desciption.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "id":
        return <h3 className="text-xs sm:text-base">{cellValue}</h3>;
      case "desciption":
        return (
          <div className="flex flex-col">
            <p className="text-xs sm:text-base text-bold capitalize">{cellValue}</p>
          </div>
        );
      case "price":
        const formattedPrice = Number(cellValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        return (
          <div className="flex flex-col">
            <p className="text-xs sm:text-base text-bold capitalize">{formattedPrice}</p>
          </div>
        );
      case "stock":
      case "minStock":
        return (
          <div className="flex flex-col">
            <p className="text-xs sm:text-base text-bold capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Button isIconOnly className="bg-cyan-600" aria-label="Like">
              <HiOutlineLightBulb size={"2em"} className="text-white" />
            </Button>
            <Button isIconOnly className="bg-amber-600" aria-label="Like">
              <MdOutlineMailOutline size={"2em"} className="text-white"/>
            </Button>
            <Button isIconOnly className="bg-yellow-700" aria-label="Like" onClick={() => handleEditProduct(product["id"])}>
              <FaRegEdit size="1.6em" className="text-white "/>
            </Button>
            <Button isIconOnly color="danger" aria-label="Like" onClick={() => handleDeleteRequest(product["id"])}>
              <IoMdClose size={"2em"} className="text-white"/>
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] text-xs sm:text-base"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            size="xs sm:full"
            variant="bordered"
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="bordered">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
                className="text-black"
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="text-xs sm:text-base" color="success" endContent={<PlusIcon />} onClick={handleNewProductClick}>
              Novo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {products.length} products</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onRowsPerPageChange, products.length, onSearchChange, hasSearchFilter]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="flex sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        isStriped
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="text-start">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddProductModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
      <EditProductModal 
      isOpen={isEditModalOpen} 
      onOpenChange={setIsEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      id={selectedProduct}
      />
    </>
  );
}
