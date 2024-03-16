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
import { SearchIcon } from "../public/SearchIcon";
import { ChevronDownIcon } from "../public/ChevronDownIcon";
import { capitalize } from "../utils";

const INITIAL_VISIBLE_COLUMNS = ["codigorobo", "nomedev", "dataatualizacao", "nomeproduto", "valor1", "valor2", "economia"];

export default function TableLog() {
    const [logs, setLogs] = useState([]);
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const columns = [
        { uid: "id", name: "ID", sortable: true },
        { uid: "codigorobo", name: "Código do Robô", sortable: true },
        { uid: "nomedev", name: "Nome do Desenvolvedor", sortable: true },
        { uid: "dataatualizacao", name: "Data de Atualização", sortable: true },
        { uid: "nomeproduto", name: "Nome do Produto", sortable: true },
        { uid: "valor1", name: "Mercado Livre", sortable: true },
        { uid: "valor2", name: "Magazine Luiza", sortable: true },
        { uid: "economia", name: "Economia", sortable: true }
    ];


    useEffect(() => {
        fetchLogs();
    }, []);

    const hasSearchFilter = Boolean(filterValue);

    const fetchLogs = async () => {
        try {
            const response = await fetch("https://gestaomargi-001-site8.gtempurl.com/api/Logs");
            if (!response.ok) {
                throw new Error("Failed to fetch logs");
            }
            const data = await response.json();
            setLogs(data);
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };



    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredLogs = [...logs];

        if (hasSearchFilter) {
            filteredLogs = filteredLogs.filter((log) => {
                const lowerCaseFilter = filterValue.toLowerCase();
                return (
                    log.codigorobo.toString().toLowerCase().includes(lowerCaseFilter) ||
                    log.nomeproduto.toLowerCase().includes(lowerCaseFilter) ||
                    log.nomedev.toLowerCase().includes(lowerCaseFilter)
                );
            });
        }

        return filteredLogs;
    }, [logs, filterValue]);

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

    const renderCell = React.useCallback((data, columnKey) => {
        const cellValue = data[columnKey];

        switch (columnKey) {
            case "id":
                return (
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-base text-bold capitalize">{cellValue}</p>
                    </div>
                );
            case "codigorobo":
                return (
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-base text-bold capitalize">{cellValue}</p>
                    </div>
                );
            case "valor1":
                const formattedPrice1 = Number(cellValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                return (
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-base text-bold capitalize">{formattedPrice1}</p>
                    </div>
                );
            case "valor2":
                const formattedPrice2 = Number(cellValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                return (
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-base text-bold capitalize">{formattedPrice2}</p>
                    </div>
                );
            case "economia":
                const formattedPrice3 = Number(cellValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                return(
                    <h3 className="text-xs sm:text-base">{formattedPrice3}</h3>
                )
            case "dataatualizacao":
                const date = new Date(cellValue);
                const formattedDate = date.toLocaleDateString('pt-BR');
                return(
                    <h3 className="text-xs sm:text-base">{formattedDate}</h3>
                )
            case "nomedev":
            case "nomeproduto":
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
                        placeholder="Pesquise por Estagio ou por Produto Id..."
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
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {logs.length} logs</span>
                    <label className="flex items-center text-default-400 text-small">
                        Itens por pagina:
                        <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [filterValue, visibleColumns, onRowsPerPageChange, logs.length, onSearchChange, hasSearchFilter]);

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
                <TableBody emptyContent={"Nenhum log encontrado"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell className="text-start">{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
