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
import { ArrowUpDown } from "lucide-react";
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
import { Badge } from "../../ui/badge";
import { Product } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Slider } from "./Slider";
import { useStore } from "@/hooks/useStore";
import { getProducts } from "@/api";
import SkeletonRow from "./SekeletonRow";
import clsx from "clsx";
import QuantitySelector from "./QuantitySelector";

const getStockStatus = (stock: number): { text: string; color: string } => {
  if (stock <= 0) return { text: "No disponible", color: "bg-red-500" };
  if (stock <= 10) return { text: "Limitado", color: "bg-yellow-500" };
  return { text: "Disponible", color: "bg-green-500" };
};

export const createColumns = (): ColumnDef<Product>[] => [
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
        <Dialog>
          <DialogTrigger className="lg:min-h-[85px]  lg:min-w-[85px] ">
            <Image
              src={firstImage}
              alt="product"
              width={100}
              height={100}
              className="rounded-lg  w-auto mx-auto "
            />
          </DialogTrigger>
          <DialogContent>
            <Slider images={images} />
          </DialogContent>
        </Dialog>
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
      const stockStatus = getStockStatus(row.original.saldo);

      return (
        <Badge className={`${stockStatus.color} text-white text-nowrap`}>
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
      const stock: number = row.original.saldo;
      const referencia: string = row.getValue("referencia");
      return (
        <div className="flex items-center space-x-2">
          <QuantitySelector maxStock={stock} sku={referencia} />
          <Button
            className="w-32 bg-gradient-to-r from-blue-600 to-sky-600 hover:opacity-45 hover:transition-opacity"
            onClick={() => {}}
            disabled={stock <= 0}
          >
            Agregar
          </Button>
        </div>
      );
    },
  },
];

export function MainTable() {
  const {
    products: data,
    setProducts,
    applyFilters,
    filters,
    setBrand,
    filteredProducts,
  } = useStore();
  const [isLoading, setIsLoading] = React.useState(true);
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
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");

  const brands = Array.from(new Set(data.map((item) => item.marca)))
    .filter((el) => el !== "")
    .sort();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleBrandChange = (value: string) => {
    setSearchValue("");
    setBrand(value);
    applyFilters();
  };

  const handleSearch = () => {
    const columnHead = isNaN(Number(searchValue))
      ? "descripcion"
      : "referencia";
    const column = table.getColumn(columnHead);
    column?.setFilterValue(searchValue);
    setFilterValue(searchValue);
    setSearchValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchValue.length > 0) {
      handleSearch();
    }
  };

  const columns: ColumnDef<Product>[] = createColumns();

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: filteredProducts.length > 0 ? filteredProducts : data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      setPagination(updater);
      tableContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  const { pageIndex, pageSize } = table.getState().pagination;
  const endRow = Math.min((pageIndex + 1) * pageSize, data.length);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  React.useEffect(() => {
    applyFilters();
  }, [data, applyFilters]);

  return (
    <div className="w-full max-w-screen-2xl" ref={tableContainerRef}>
      <div className="flex flex-col gap-2 md:flex-row items-center justify-between py-4">
        <div className="flex flex-row items-center space-x-2 w-full md:max-w-lg justify-between md:justify-normal">
          <Input
            placeholder="Buscar..."
            value={searchValue}
            onChange={handleInputChange}
            className="w-full  "
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="outline"
            className={clsx(
              "transition-colors duration-300 ease-in-out",
              searchValue.length > 0 &&
                "bg-gradient-to-r from-blue-800 to-sky-600 text-white"
            )}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>

        <div className="w-full">
          {filterValue.length > 0 && (
            <Badge className="text-white p-2">
              {filterValue}{" "}
              <button
                className="ml-2"
                onClick={() => {
                  table.resetColumnFilters();
                  setFilterValue("");
                }}
              >
                X
              </button>
            </Badge>
          )}
        </div>

        <div className="flex flex-row items-center space-x-2 w-full md:w-auto justify-between md:justify-normal ">
          <Select value={filters.brand} onValueChange={handleBrandChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Filtrar por marca..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                Todas las marcas
              </SelectItem>
              {brands.map((brand, i) => {
                return (
                  <>
                    <SelectItem key={brand + i} value={brand}>
                      {brand}
                    </SelectItem>
                  </>
                );
              })}
            </SelectContent>
          </Select>
          <Button
            className=""
            variant="outline"
            onClick={() => {
              setSearchValue("");
              setFilterValue("");
              setBrand("all");
              applyFilters();
              table.resetColumnFilters();
            }}
          >
            Limpiar filtros
          </Button>
        </div>
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
            {isLoading ? (
              <SkeletonRow />
            ) : table.getRowModel().rows?.length ? (
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
