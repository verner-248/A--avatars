"use client"

import { Category, Companion } from "@prisma/client"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver  } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";

interface companionFormProps {
    initialData: Companion | null,
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required"
    }),
    description: z.string().min(1,{
        message: "Description is required"
    }),
    instructions: z.string().min(1,{
        message: "Instructions requires at least 200 characters"
    }),
    seed: z.string().min(1,{
        message: "Seed requires at least 200 characters"
    }),
    src: z.string().min(1,{
        message: "Image is requires"
    }),
    categoryid: z.string().min(1,{
        message: "Category is required"
    }),
})
export const CompanionForm = ({initialData,categories}: companionFormProps)=> {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryid: "",
            
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }
    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                General Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                General information about your Companion
                            </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField
                    name="src"
                    render={({field}) => (
                        <FormItem className="flex flex-col items-center justify-center space-y-4">
                            <FormControl>
                                <ImageUpload
                                disabled={isLoading}
                                onChange={field.onChange}
                                value={field.value}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <FormField
                        name="name"
                        render={({field}) => (
                            <FormItem className="cols-span-2 md:col-span-1">
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="Elon Musk"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is how your AI companion will be named
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                         <FormField
                        name="description"
                        render={({field}) => (
                            <FormItem className="cols-span-2 md:col-span-1">
                                <FormLabel>
                                   Description
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="CEO and founder of Tesla and SpaceX"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Short description of your AI companion
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    )
} 