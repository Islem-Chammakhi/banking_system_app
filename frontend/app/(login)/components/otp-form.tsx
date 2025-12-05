"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { MessageCircleQuestionIcon } from "lucide-react"
import { useState } from "react";

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const [OTP, setOTP] = useState("");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Enter verification code</h1>
            <p className="text-muted-foreground text-sm text-balance"> We sent a 6-digit code to your phone. </p>
          </div>
          <Field>
            {/* label */}
            <FieldLabel htmlFor="otp" className="sr-only">
              Verification code
            </FieldLabel>
            {/* OTP input */}
            <div className="flex justify-center">
              <InputOTP maxLength={6} id="otp" required value={OTP} onChange={(val) => setOTP(val)} >
                <InputOTPGroup>
                  <InputOTPSlot index={0}/> <InputOTPSlot index={1}/> <InputOTPSlot index={2}/> 
                  <InputOTPSlot index={3}/> <InputOTPSlot index={4}/> <InputOTPSlot index={5}/>
                </InputOTPGroup>
              </InputOTP>
            </div>
            {/* description */}
            <FieldDescription className="text-center">
              Enter the code right above.
            </FieldDescription>
          </Field>
          {/* verify button */}
          <Button type="submit">Verify</Button>
          {/* resend info */}
          <FieldSeparator className="mt-0.5"><MessageCircleQuestionIcon className="w-5 h-5 text-muted-foreground" /></FieldSeparator>
          <Field>
            <div className="flex items-center justify-center gap-2">
              <FieldDescription className="text-center">
                  Didn&apos;t receive the code? <a href="#">Resend</a>
              </FieldDescription>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
