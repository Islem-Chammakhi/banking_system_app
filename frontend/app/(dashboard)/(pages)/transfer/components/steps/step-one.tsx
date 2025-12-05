// components/step-one.tsx
import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface StepOneProps {
  onNext: () => void
  onBack: () => void
  isFirstStep: boolean
}

export function StepOne({ onNext, onBack, isFirstStep }: StepOneProps) {
  const { control, handleSubmit, formState: { errors } } = useFormContext()

  return (
    <form onSubmit={handleSubmit(onNext)} className="grid gap-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">Transfer Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter recipient information and amount
        </p>
      </div>

      <FormField
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipient Card Number *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="1234 5678 9012 3456" 
                autoComplete="off" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amount (TND) *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number" 
                placeholder="0.00" 
                autoComplete="off" 
                step="0.01"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Add a note for this transfer..." 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between mt-6">
        <Button type="button" size="sm" onClick={onBack} disabled={isFirstStep}>
          Back
        </Button>
        <Button type="submit" size="sm">
          Next
        </Button>
      </div>
    </form>
  )
}