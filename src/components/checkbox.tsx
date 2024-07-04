import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

export function CheckBox({ field, form }) {
  return (
    <FormItem>
      <div className="mb-4">
        <FormLabel className="text-base">Sidebar</FormLabel>
        <FormDescription>
          Select the items you want to display in the sidebar.
        </FormDescription>
      </div>
      {items.map((item) => (
        <FormField
          key={item.id}
          control={form.control}
          name="items"
          render={({ field }) => {
            return (
              <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.id])
                        : field.onChange(
                            field.value?.filter((value:any) => value !== item.id)
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{item.label}</FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
      <FormMessage />
    </FormItem>
  );
}
