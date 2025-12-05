// components/step-two.tsx
import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

interface StepTwoProps {
  onNext: () => void
  onBack: () => void
}

export function StepTwo({ onNext, onBack }: StepTwoProps) {
  const { control, handleSubmit } = useFormContext()

  return (
    <form onSubmit={handleSubmit(onNext)} className="grid gap-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">Enter verification code</h2>
        <p className="text-sm text-muted-foreground mt-1">
          We sent a 6-digit code to your phone
        </p>
      </div>

      <FormField
        control={control}
        name="otp"
        render={({ field }) => (
          <FormItem className="flex flex-col items-center">
            <FormLabel className="sr-only">Verification code</FormLabel>
            <FormControl>
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="text-center text-sm text-muted-foreground ">
        Didn't receive the code?{' '}
        <a href="#" className="text-primary hover:underline"> Resend </a>
      </div>

      <div className="flex justify-between mt-6">
        <Button type="button" size="sm" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="sm">
          Verify
        </Button>
      </div>


    </form>
  )
}