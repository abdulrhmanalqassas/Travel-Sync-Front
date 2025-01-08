import React from "react";
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
  Pagination,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "../../core/components/icons/SearchIcon";
import { ChevronDownIcon } from "../../core/components/icons/ChevronDownIcon";
import TransportationForm from "./Transportation.Add.Form";
import TransportationFormEdit from "./Transportation.Edit.Form";
import { DeleteService } from "../services.handlers";
import DeleteModal from "../../core/components/DeleteModal";
import { useTranslation } from "react-i18next";

const INITIAL_VISIBLE_COLUMNS = [
  "type",
  "name",
  "departureAddress",
  "arrivalAddress",
  "departureTime",
  "price",
  "actions",
];

export default function TransportationTable({ data, isLoading, handleUpdate }) {
  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Name", uid: "name", sortable: true },
    { name: "Price", uid: "price", sortable: true },
    { name: "Vehicle Type", uid: "type", sortable: true },
    { name: "Departure", uid: "departureAddress", sortable: true },
    { name: "Arrival", uid: "arrivalAddress", sortable: true },
    { name: "Departure Time", uid: "departureTime", sortable: true },
    { name: "Arrival Time", uid: "arrivalTime", sortable: true },
    { name: "Departure Date", uid: "departingDate", sortable: true },
    { name: "Return Date", uid: "returningDate", sortable: true },
    { name: "Driver Name", uid: "driverName", sortable: true },
    { name: "Car Model", uid: "carModel", sortable: true },
    { name: "Car Plate", uid: "carPlate", sortable: true },
    { name: "Quantity", uid: "quantityAvailable", sortable: true },
    { name: "Description", uid: "description", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const { t, i18n } = useTranslation();
  const CurrentLang = i18n.language;

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(data?.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredServices = [...(data || [])];

    if (hasSearchFilter) {
      filteredServices = filteredServices.filter((service) => {
        const searchValue = filterValue.toLowerCase();
        const serviceName = service?.name?.toLowerCase() || '';
        const transportationType = service?.transportation?.type?.toLowerCase() || '';
        const driverName = service?.transportation?.carDriver?.driverName?.toLowerCase() || '';
        
        return (
          serviceName.includes(searchValue) ||
          transportationType.includes(searchValue) ||
          driverName.includes(searchValue)
        );
      });
    }
    return filteredServices;
  }, [data, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];
      
      // Handle nested transportation and carDriver properties
      if (["type", "departureAddress", "arrivalAddress", "departureTime", "arrivalTime", "departingDate", "returningDate", "description"].includes(sortDescriptor.column)) {
        first = a.transportation?.[sortDescriptor.column];
        second = b.transportation?.[sortDescriptor.column];
      } else if (["driverName", "carModel", "carPlate"].includes(sortDescriptor.column)) {
        first = a.transportation?.carDriver?.[sortDescriptor.column];
        second = b.transportation?.carDriver?.[sortDescriptor.column];
      }

      // Handle null values
      if (first === null || first === undefined) first = '';
      if (second === null || second === undefined) second = '';

      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "-";
    const date = new Date(dateTimeStr);
    return date.toLocaleString(CurrentLang, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderCell = React.useCallback((service, columnKey) => {
    switch (columnKey) {
      case "name":
        return service.name || "-";
      case "type":
        return service.transportation?.type || "-";
      case "departureAddress":
        return CurrentLang === 'ar' 
          ? service.transportation?.ar_departureAddress || "-"
          : service.transportation?.departureAddress || "-";
      case "arrivalAddress":
        return CurrentLang === 'ar'
          ? service.transportation?.ar_arrivalAddress || "-"
          : service.transportation?.arrivalAddress || "-";
      case "departureTime":
        return formatDateTime(service.transportation?.departureTime);
      case "arrivalTime":
        return formatDateTime(service.transportation?.arrivalTime);
      case "departingDate":
        return formatDateTime(service.transportation?.departingDate);
      case "returningDate":
        return formatDateTime(service.transportation?.returningDate);
      case "driverName":
        return service.transportation?.carDriver?.driverName || "-";
      case "carModel":
        return service.transportation?.carDriver?.carModel || "-";
      case "carPlate":
        return service.transportation?.carDriver?.carPlate || "-";
      case "description":
        return CurrentLang === 'ar'
          ? service.transportation?.ar_description || "-"
          : service.transportation?.description || "-";
      case "price":
        return `${service.price + service?.margin || 0}`;
      case "quantityAvailable":
        return service.quantityAvailable || 0;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit service">
              <TransportationFormEdit
                handleUpdate={handleUpdate}
                transportationID={service.id}
                data={service}
              />
            </Tooltip>
            <Tooltip color="danger" content="Delete service">
              <DeleteModal
                deleteFun={() => {
                  DeleteService(service.id, handleUpdate, "transportations");
                }}
                text="transportation"
              />
            </Tooltip>
          </div>
        );
      default:
        return service[columnKey] || "-";
    }
  }, [CurrentLang, t]);

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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder={t("Search_by_name_or_driver")}
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  {t("Columns")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="max-h-80 overflow-scroll overflow-x-hidden"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {t(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <TransportationForm handleUpdate={handleUpdate} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {t("Total") + " " + (data?.length || 0) + " " + t("services")}
          </span>
          <label className="flex items-center text-default-400 text-small">
            {t("Rows_per_page")}
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, data?.length, t]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, hasSearchFilter]);

  return (
    <Table
      className="mt-5"
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: ["max-h-[382px]", "max-w-3xl"],
        th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {t(column.name)}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent={t("No_transportation_found")}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}