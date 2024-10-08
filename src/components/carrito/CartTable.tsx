"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartItem } from "@/types";
import { ArrowUpDown } from "lucide-react";
import QuantitySelector from "../home/MainTable/QuantitySelector";
import { useStore } from "@/hooks/useStore";

export const createColumns = (): ColumnDef<CartItem>[] => [
  {
    accessorKey: "sku",
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
    cell: ({ row }) => <div>{row.getValue("sku") ?? ""}</div>,
  },
  {
    accessorKey: "description",
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
    cell: ({ row }) => {
      return <div>{row.getValue("description") ?? ""}</div>;
    },
  },

  {
    accessorKey: "price",
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
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-CO", {
        style: "currency",
        currency: "COP",
        maximumSignificantDigits: 2,
      }).format(amount);

      return <div className="">{formatted ?? 0}</div>;
    },
  },

  {
    id: "actions",
    header: "Cantidad",
    cell: ({ row }) => {
      const stock: number = row.original.stock ?? 0;
      const referencia: string = row.getValue("sku");
      return (
        <div className="flex items-center space-x-2">
          <QuantitySelector maxStock={stock} sku={referencia} />
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Precio Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const qty = row.original.qty;
      const totalAmount = amount * qty;
      const formatted = new Intl.NumberFormat("en-CO", {
        style: "currency",
        currency: "COP",
        maximumSignificantDigits: 2,
      }).format(totalAmount);

      return <div className="">{formatted ?? 0}</div>;
    },
  },
];

export default function CartTable() {
  const { shoppingCart, products } = useStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  [];

  const columns: ColumnDef<CartItem>[] = createColumns();

  const data = React.useMemo(() => {
    return shoppingCart.map((item) => {
      const product = products.find((product) => product.sku === item.sku);
      return {
        sku: item.sku,
        description: product?.description,
        price: product?.price,
        stock: product?.stock,
        qty: item.qty,
      };
    });
  }, [shoppingCart, products]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: {
      sorting,
    },
  });

  return (
    <div className="w-full max-w-screen-2xl">
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
                  No hay nada en el carrito.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
