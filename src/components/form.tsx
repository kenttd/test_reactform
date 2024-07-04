"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioButton } from "./radiobutton";
import { CheckBox } from "./checkbox";
import { SwitchUpdate } from "./switch";
import { Insert } from "@/actions/insertdb";
import { Update } from "@/actions/updatedb";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  update: z.boolean().default(false).optional(),
  updatedUser: z.string({ message: "Updated user error" }).optional(),
  file: z.instanceof(File, { message: "File required" }).optional(),
});

export function RegisterForm({ setUpdate, updateTable }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      items: ["recents"],
    },
  });
  const update = form.watch("update");

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!update) {
      if (
        values.username === undefined ||
        values.type === undefined ||
        values.items === undefined ||
        values.file === undefined
      ) {
        throw new Error("Updated user is required");
      }
      const form = new FormData();
      form.append("username", values.username);
      form.append("type", values.type);
      form.append("items", values.items.join(","));
      form.append("file", values.file);
      fetch("/api/user", {
        method: "post",
        body: form,
      }).then(() => {
        setUpdate(!updateTable);
      });
      // Insert(values);
      console.log(values);
    } else {
      if (
        values.updatedUser === undefined ||
        values.type === undefined ||
        values.items === undefined
      ) {
        throw new Error("Updated user is required");
      }
      const form = new URLSearchParams({
        updatedUser: values.updatedUser,
        type: values.type,
        items: values.items.join(","),
      });
      fetch("/api/user", {
        method: "put",
        body: form,
      }).then((response) => {
        if (response.status === 404) {
          toast({
            variant: "destructive",
            title: "Username not found",
          });
        } else {
          setUpdate(!updateTable);
        }
      });
    }
    toast({
      title: "Refreshing table...",
    });
  }
  return (
    <div className="max-w-max">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} disabled={update} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <>
                <RadioButton field={field} />
              </>
            )}
          />
          <FormField
            control={form.control}
            name="items"
            render={({ field }) => (
              <>
                <CheckBox field={field} form={form} />
              </>
            )}
          />
          <FormField
            control={form.control}
            name="update"
            render={({ field }) => (
              <>
                <SwitchUpdate field={field} />
              </>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </div>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="updatedUser"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} disabled={!update} />
                  </FormControl>
                  <FormDescription>
                    Username of updated username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
