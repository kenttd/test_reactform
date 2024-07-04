"use client";
import useCounterStore from "@/store/counterStore";

export default function Home() {
  return (
    <div>
      <h1>Counter</h1>
      {useCounterStore().counter}
    </div>
  );
}
