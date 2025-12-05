'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"
import { loginUser } from "../login-api"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { FieldGroup, FieldSeparator, FieldDescription } from "@/components/ui/field"


// zod validation schema
const formSchema = z.object({
  cin: z.string().min(8, "CIN must be at least 8 characters").max(12, "CIN is too long"),
  cardNumber: z.string().min(16, "Card number must be at least 16 digits").max(19, "Card number is too long"),
})

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter()
  const [serverError, setServerError] = useState("")

  // react-hook-form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { cin: "", cardNumber: "", },
  })

  // handle login
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError("") // reset errors

    const { cin, cardNumber } = data
    const result = await loginUser(cin, cardNumber)

    if (result.success) {
      toast({ title: "Logged in successfully!", description: "Welcome back to your account!", })
      router.push("/home")
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
            <h1 className="text-2xl font-bold">Login to your account!</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your CIN and card number to continue
            </p>
          </div>

          {/* CIN */}
          <FormField
            control={form.control}
            name="cin"
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

          {/* Card Number */}
          <FormField
            control={form.control}
            name="cardNumber"
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

          {/* login button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* server error */}
          {serverError && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {serverError}
            </div>
          )}

          {/* extra info */}
          <FieldSeparator className="mt-0.5">
            <Info className="w-5 h-5 text-muted-foreground" />
          </FieldSeparator>
          <FieldDescription className="text-sm text-muted-foreground text-center">
            Make sure your phone is on standby to receive the OTP and complete the login process.
          </FieldDescription>
          
        </FieldGroup>
      </form>
    </Form>
  )
}
