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
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const data: Product[] = [
  {
    referencia: 1045699,
    marca: "Fender",
    descripcion: "guitarra fender stratocaster",
    precio: 850000,
    stock: 120,
    image:
      "https://cdn.shopify.com/s/files/1/0512/9116/0767/files/guitarra-electroacustica-martin-d-x2e-burst-the-music-site-1.jpg?v=1715379907",
  },
  {
    referencia: 1098765,
    marca: "Yamaha",
    descripcion: "bajo yamaha TRBX",
    precio: 900000,
    stock: 60,
    image: "https://loremflickr.com/320/240/bass",
  },
  {
    referencia: 1234567,
    marca: "Pearl",
    descripcion: "batería Pearl Export",
    precio: 2500000,
    stock: 20,
    image: "https://loremflickr.com/320/240/drums",
  },
  {
    referencia: 1357924,
    marca: "Roland",
    descripcion: "teclado Roland FP-30",
    precio: 1600000,
    stock: 30,
    image: "https://loremflickr.com/320/240/piano",
  },
  {
    referencia: 1425367,
    marca: "Marshall",
    descripcion: "amplificador Marshall MG",
    precio: 450000,
    stock: 70,
    image: "https://loremflickr.com/320/240/amplifier",
  },
  {
    referencia: 1548792,
    marca: "Shure",
    descripcion: "micrófono Shure SM58",
    precio: 300000,
    stock: 150,
    image: "https://loremflickr.com/320/240/microphone",
  },
  {
    referencia: 1654321,
    marca: "BOSS",
    descripcion: "pedal de distorsión BOSS DS-1",
    precio: 350000,
    stock: 80,
    image: "https://loremflickr.com/320/240/pedal",
  },
  {
    referencia: 1789246,
    marca: "Korg",
    descripcion: "sintetizador Korg Minilogue",
    precio: 1200000,
    stock: 0,
    image: "https://loremflickr.com/320/240/synthesizer",
  },
  {
    referencia: 1897432,
    marca: "Gibson",
    descripcion: "guitarra Gibson Les Paul",
    precio: 2100000,
    stock: 8,
    image: "https://loremflickr.com/320/240/guitar",
  },
  {
    referencia: 1987654,
    marca: "Ludwig",
    descripcion: "caja Ludwig Black Beauty",
    precio: 1400000,
    stock: 10,
    image: "https://loremflickr.com/320/240/drums",
  },
];

const getStockStatus = (stock: number): { text: string; color: string } => {
  if (stock <= 0) return { text: "No disponible", color: "bg-red-500" };
  if (stock <= 10) return { text: "Pocas unidades", color: "bg-yellow-500" };
  return { text: "Disponible", color: "bg-green-500" };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => (
      <Image
        src={row.getValue("image")}
        alt="product"
        width={100}
        height={100}
      />
    ),
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
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const stock: number = row.getValue("stock");

      return (
        <Button size="lg" disabled={stock <= 0}>
          Comprar
        </Button>
      );
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export function MainTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
