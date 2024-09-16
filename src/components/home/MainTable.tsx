"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Product } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const getStockStatus = (stock: number): { text: string; color: string } => {
  if (stock <= 0) return { text: "No disponible", color: "bg-red-500" };
  if (stock <= 10) return { text: "Pocas unidades", color: "bg-yellow-500" };
  return { text: "Disponible", color: "bg-green-500" };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Imagen",
    cell: ({ row }) => {
      const images = row.getValue("images") as string[];
      const firstImage =
        images && images.length > 0 && images[0] !== ""
          ? images[0]
          : "/imagePlaceholder.png";

      return (
        <Image
          src={firstImage}
          alt="product"
          width={100}
          height={100}
          className="rounded-lg max-h-[100px] w-auto mx-auto "
        />
      );
    },
  },
  {
    accessorKey: "descripcion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripción
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("descripcion")}</div>,
  },
  {
    accessorKey: "referencia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Referencia
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("referencia")}</div>,
  },
  {
    accessorKey: "marca",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marca
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("marca")}</div>,
  },

  {
    accessorKey: "stock",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const stockStatus = getStockStatus(row.getValue("stock"));

      return (
        <Badge className={`${stockStatus.color} text-white`}>
          {stockStatus.text}
        </Badge>
      );
    },
  },
  {
    accessorKey: "precio",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Precio
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("precio"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-CO", {
        style: "currency",
        currency: "COP",
        maximumSignificantDigits: 2,
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Cantidad",
    cell: ({ row }) => {
      const stock: number = row.getValue("stock");

      return (
        <div className="flex items-center space-x-2">
          <div className="flex border border-neutral-200 rounded-md ">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {}}
              disabled={stock <= 0}
              className="border-none pl-2 rounded-r-none"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              value={1}
              onChange={() => console.log("hola")}
              className="max-w-12 border-none text-center px-0 rounded-none"
              min="0"
              max={stock}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {}}
              disabled={stock <= 0}
              className="border-none pr-2 rounded-l-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => {}} disabled={stock <= 0}>
            Agregar
          </Button>
        </div>
      );
    },
  },
];

export function MainTable({ data }: { data: Product[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filteredBrand, setFilteredBrand] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const brands = Array.from(new Set(data.map((item) => item.marca)))
    .filter((el) => el !== "")
    .sort();

  const filteredData = React.useMemo(() => {
    return filteredBrand
      ? data.filter((item) => item.marca === filteredBrand)
      : data;
  }, [data, filteredBrand]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value.trim());
    const column = isNaN(Number(searchValue)) ? "descripcion" : "referencia";
    table.getColumn(column)?.setFilterValue(searchValue);
  };

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  const { pageIndex, pageSize } = table.getState().pagination;
  //const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, data.length);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Buscar..."
          value={searchValue}
          onChange={handleInputChange}
          className="max-w-sm"
        />
        <Select value={filteredBrand} onValueChange={setFilteredBrand}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Filtrar por marca..." />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => {
              return (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Mostrando {endRow / 10} de{" "}
          {Math.ceil(table.getFilteredRowModel().rows.length / pageSize)}{" "}
          pagina(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
