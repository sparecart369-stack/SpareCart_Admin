"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusIcon } from "@/components/ui/icons";
import { Pagination } from "@/components/ui/pagination";
import { CustomerTable } from "./CustomerTable";
import { EditCustomerModal } from "./EditCustomerModal";
import { DeleteDialog } from "./DeleteDialog";
import { fetchProfiles, createProfile, updateProfile, deleteProfile } from "./actions";
import { CustomerProfile, roleOptions, pageSizeOptions } from "./columns";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [activeCustomer, setActiveCustomer] = useState<CustomerProfile | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);
      const data = await fetchProfiles();
      setCustomers(data);
      setLoading(false);
    }

    loadCustomers();
  }, []);

  useEffect(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    const nextCustomers = customers.filter((customer) => {
      const matchesText =
        customer.name.toLowerCase().includes(normalizedSearch) ||
        customer.phone.toLowerCase().includes(normalizedSearch);

      const matchesRole = selectedRole === "All" || customer.role === selectedRole;

      return matchesText && matchesRole;
    });

    setFilteredCustomers(nextCustomers);
    setPage(1);
  }, [customers, searchValue, selectedRole]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(filteredCustomers.length / pageSize)), [filteredCustomers.length, pageSize]);

  const stats = useMemo(() => {
    const buyerCount = customers.filter((customer) => customer.role === "Buyer").length;
    const sellerCount = customers.filter((customer) => customer.role === "Seller").length;
    const ratings = customers.map((customer) => customer.seller_avg_rating ?? 0).filter((value) => value > 0);
    const avgRating = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : 0;

    return {
      total: customers.length,
      buyers: buyerCount,
      sellers: sellerCount,
      avgRating,
    };
  }, [customers]);

  const currentPageCustomers = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredCustomers.slice(startIndex, startIndex + pageSize);
  }, [filteredCustomers, page, pageSize]);

  async function reloadCustomers() {
    setLoading(true);
    const data = await fetchProfiles();
    setCustomers(data);
    setLoading(false);
  }

  async function handleSave(values: Partial<CustomerProfile>) {
    const savingCustomer = values.id ? await updateProfile(values.id, values) : await createProfile(values);
    if (!savingCustomer) {
      setError("Unable to save customer. Please try again.");
      return;
    }

    await reloadCustomers();
  }

  async function handleDelete() {
    if (!activeCustomer) return;
    const deleted = await deleteProfile(activeCustomer.id);
    if (deleted) {
      setDeleteOpen(false);
      await reloadCustomers();
    } else {
      setError("Unable to delete customer. Please try again.");
    }
  }

  function openView(customer: CustomerProfile) {
    setActiveCustomer(customer);
    setModalMode("view");
    setModalOpen(true);
  }

  function openEdit(customer: CustomerProfile) {
    setActiveCustomer(customer);
    setModalMode("edit");
    setModalOpen(true);
  }

  function openCreate() {
    setActiveCustomer(null);
    setModalMode("create");
    setModalOpen(true);
  }

  function openDelete(customer: CustomerProfile) {
    setActiveCustomer(customer);
    setDeleteOpen(true);
  }

  return (
    <div className="animate-float-in space-y-8">
      <PageHeader
        title="Customer Management"
        description="Browse and manage customer profiles, roles, ratings, and feedback from the SpareKart admin dashboard."
        action={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex items-center gap-2 rounded-3xl border border-zinc-200 bg-white px-4 py-3 shadow-sm shadow-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
              <SearchIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by name or phone"
                className="w-72 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
              />
            </div>
            <Button variant="primary" icon={<PlusIcon className="h-4 w-4" />} onClick={openCreate}>
              Add Customer
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Total Customers</p>
          <p className="mt-4 text-4xl font-black text-zinc-950 dark:text-white">{stats.total}</p>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Buyers</p>
          <p className="mt-4 text-4xl font-black text-zinc-950 dark:text-white">{stats.buyers}</p>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Sellers</p>
          <p className="mt-4 text-4xl font-black text-zinc-950 dark:text-white">{stats.sellers}</p>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Avg Rating</p>
          <p className="mt-4 text-4xl font-black text-zinc-950 dark:text-white">{stats.avgRating.toFixed(1)} ⭐</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-900">
            <label htmlFor="role-filter" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Role</label>
            <select
              id="role-filter"
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              className="rounded-3xl border border-transparent bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none dark:text-white"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Rows per page</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-3xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 outline-none dark:border-white/10 dark:bg-zinc-950 dark:text-white"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200">
            {error}
          </div>
        ) : (
          <CustomerTable
            customers={currentPageCustomers}
            loading={loading}
            page={page}
            pageSize={pageSize}
            onView={openView}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        )}

        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </div>

      <EditCustomerModal
        open={modalOpen}
        mode={modalMode}
        customer={activeCustomer}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <DeleteDialog
        open={deleteOpen}
        customerName={activeCustomer?.name ?? "customer"}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
