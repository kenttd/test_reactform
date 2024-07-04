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
});

export function RegisterForm({ setUpdate, updateTable }) {
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
      Insert(values);
      console.log(values);
      setUpdate(!updateTable);
    } else {
      Update(values).then((status) => {
        if (status === null) {
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
      // description: "There was a problem with your request.",
    });
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  return (
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
          name="updatedUser"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} disabled={!update} />
                </FormControl>
                <FormDescription>Username of updated username</FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
