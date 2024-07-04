"use client";
import Image from "next/image";
import { RegisterForm } from "@/components/form";
import { ModeToggle } from "@/components/toggleDarkMode";
import { DataTable, data, getColumns } from "@/components/datatable";
import { Select } from "@/actions/selectdb";
import { useState, useEffect } from "react";

export default function Home() {
  const [rows, setRows] = useState<any[]>([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await Select();
      setRows(data);
      console.log("data select", data);
    }
    fetchData();
  }, [update]);
  return (
    <main className="flex min-h-screen  p-7 space-x-28">
      <ModeToggle />
      <div className="flex justify-between pl-10 space-x-52">
        <RegisterForm setUpdate={setUpdate} updateTable={update} />
        <DataTable data={rows} columns={getColumns(update, setUpdate)} />
      </div>
    </main>
  );
}
