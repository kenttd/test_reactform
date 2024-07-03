import Image from "next/image";
import { RegisterForm } from "@/components/form";
import { ModeToggle } from "@/components/toggleDarkMode";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RegisterForm />
      <ModeToggle />
    </main>
  );
}
