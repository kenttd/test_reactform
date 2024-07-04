"use client";
import Image from "next/image";
import { RegisterForm } from "@/components/form";
import { ModeToggle } from "@/components/toggleDarkMode";
import { DataTable, getColumns } from "@/components/datatable";
import { Select } from "@/actions/selectdb";
import { useState, useEffect } from "react";
import { TestState } from "@/components/teststate";
import { set } from "react-hook-form";

export default function Home() {
  const [rows, setRows] = useState<any[]>([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
        console.log("data select", data);
      });
  }, [update]);
  return (
    <main className="flex min-h-screen  p-7 space-x-18">
      <ModeToggle />
      <div className="flex justify-between pl-10 space-x-52">
        <RegisterForm setUpdate={setUpdate} updateTable={update} />
        <DataTable data={rows} columns={getColumns(update, setUpdate)} />
      </div>
      <TestState />
    </main>
  );
}
