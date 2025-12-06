'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"
import { registerUser } from "../register-api"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { FieldGroup, FieldSeparator, FieldDescription } from "@/components/ui/field"
import Link from "next/link";


// zod validation schema
const formSchema = z.object({
  cin: z.string().min(8, "CIN must be at least 8 characters").max(12, "CIN is too long"),
  cardNumber: z.string().min(16, "Card number must be at least 16 digits").max(19, "Card number is too long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(30, "Password is too long"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter()
  const [serverError, setServerError] = useState("")

  // react-hook-form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { cin: "", cardNumber: "", email: "", password: "", confirmPassword: "", },
  })

  // handle registration
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError("") // reset errors

    const { cin, cardNumber, email, password } = data
    const result = await registerUser(cin, cardNumber, email, password)

    if (result.success) {
      toast({ title: "Registration successful!", description: "Your account has been created successfully.", })
      router.push("/login") 
    } else {
      setServerError(result.error)
    }
  }

  const loading = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)} >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your details to create a new account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* cin */}
            <FormField control={form.control} name="cin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CIN</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* card number */}
            <FormField control={form.control} name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0000 0000 0000 0000" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* email */}
          <FormField control={form.control} name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* password */}
            <FormField control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* confirm password */}
            <FormField control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* register button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>

          {/* server error */}
          {serverError && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {serverError}
            </div>
          )}

          {/* extra info */}
          <FieldSeparator className="mt-0.5"> <Info className="w-5 h-5 text-muted-foreground" /> </FieldSeparator>
          
          <FieldDescription className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Login here
            </Link>
          </FieldDescription>

        </FieldGroup>
      </form>
    </Form>
  )
}