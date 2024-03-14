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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  getKeyValue,
} from "@nextui-org/react";
import { PlusIcon } from "../public/PlusIcon";
import { VerticalDotsIcon } from "../public/VerticalDotsIcon";
import { SearchIcon } from "../public/SearchIcon";
import { ChevronDownIcon } from "../public/ChevronDownIcon";
import { capitalize } from "../utils";

const INITIAL_VISIBLE_COLUMNS = ["id", "desciption", "price", "stock", "minStock"];

export default function SearchedTable() {
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = useState({ column: "id", direction: "ascending" });
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetch("https://localhost:7251/api/Produto")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const headerColumns = React.useMemo(() => {
    const columns = [
      { uid: "id", name: "ID", sortable: true },
      { uid: "desciption", name: "Description", sortable: true },
      { uid: "price", name: "Price", sortable: true },
      { uid: "stock", name: "Stock", sortable: true },
      { uid: "minStock", name: "Min Stock", sortable: true },
    ];

    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredProducts = React.useMemo(() => {
    let filteredProducts = [...products];

    if (filterValue) {
      filteredProducts = filteredProducts.filter((product) =>
        product.desciption.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredProducts, sortDescriptor]);

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    return <TableCell>{cellValue}</TableCell>;
  };

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} align="start" allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No products found"} items={sortedProducts} virtualized>
          {(product) => (
            <TableRow className="text-left" key={product.id}>
              {(columnKey) => renderCell(product, columnKey)}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={Math.ceil(filteredProducts.length / 10)} // Assuming 10 products per page
        onChange={onPageChange}
      />
    </>
  );
}
