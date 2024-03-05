<script setup lang="ts">
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'

import { h, ref } from 'vue'
// import DropdownAction from './DataTableDemoColumn.vue'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { valueUpdater } from '../lib/utils'

import axios from 'axios'

// make axios requests with access control allow origin header
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.get('https://vioorav4cpczeyteacgltbmyla0uvddi.lambda-url.us-east-2.on.aws/').then((response) => {
  console.log(response.data)
})


export interface Payment {
  id: string
  url: string
  status: 'pending' | 'processing' | 'reported' | 'false alarm'
  brand: string
  discoverTime: string
}

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    url: 'https://example.com',
    status: 'pending',
    brand: 'HSBC Bank',
    discoverTime: '2024-02-22',
  },
  {
    id: '3u1reuv4',
    url: 'https://example.com',
    status: 'pending',
    brand: 'Bank of America',
    discoverTime: '2024-02-22',
  },
  {
    id: 'derv1ws0',
    url: 'https://example.com',
    status: 'processing',
    brand: 'HSBC Bank',
    discoverTime: '2024-02-22',
  },
  {
    id: '5kma53ae',
    url: 'https://example.com',
    status: 'processing',
    brand: 'CA BANK',
    discoverTime: '2024-02-22',
  },
  {
    id: '5kma53ae',
    url: 'https://example.com',
    status: 'processing',
    brand: 'CA BANK',
    discoverTime: '2024-02-22',
  },
  {
    id: 'bhqecj4p',
    url: 'https://example.com',
    status: 'reported',
    brand: 'CAIXA Bank',
    discoverTime: '2024-02-22',
  },
]

const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        'checked': table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['brand', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => h('div', row.getValue('brand')),
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell: ({ row }) => h('a', { href: row.getValue('url') }, row.getValue('url')),
  },
  {
    accessorKey: 'discoverTime',
    header: 'Discover Time',
    cell: ({ row }) => h('div', { class: 'text-sm text-muted-foreground' }, row.getValue('discoverTime')),
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return h(
  //       'div',
  //       { class: 'relative' },
  //       h(DropdownAction, {
  //         payment,
  //       })
  //     )
  //   },
  // },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
})
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter brands..."
        :model-value="table.getColumn('brand')?.getFilterValue() as string"
        @update:model-value="table.getColumn('brand')?.setFilterValue($event)"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto"> Columns <ChevronDown class="ml-2 h-4 w-4" /> </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="
              (value) => {
                column.toggleVisibility(!!value)
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id" :data-state="row.getIsSelected() && 'selected'">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell col-span="{columns.length}" class="h-24 text-center"> No results. </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()"> Previous </Button>
        <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()"> Next </Button>
      </div>
    </div>
  </div>
</template>
