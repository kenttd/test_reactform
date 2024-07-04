import { Button } from "@/components/ui/button";
import useCounterStore from "@/store/counterStore";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
export function TestState() {
  const { counter, increase } = useCounterStore();
  const router = useRouter();
  return (
    <>
      <div className="flex space-x-2 pl-4">
        <Button
          onClick={() => {
            increase(3);
          }}
        >
          {counter}
        </Button>
        <Button
          onClick={() => {
            router.push("/state");
          }}
        >
          Test counter in another page
        </Button>
      </div>
    </>
  );
}
