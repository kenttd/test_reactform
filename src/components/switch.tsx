import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
export function SwitchUpdate({ field }) {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">Update</FormLabel>
        <FormDescription>Update a profile?</FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          aria-readonly
        />
      </FormControl>
    </FormItem>
  );
}
