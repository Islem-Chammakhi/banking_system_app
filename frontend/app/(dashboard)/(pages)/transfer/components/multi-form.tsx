'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { StepOne } from './steps/step-one'
import { StepTwo } from './steps/step-two'
import { StepThree } from './steps/step-three'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// define validation schema
const transferSchema = z.object({
  cardNumber: z.string()
    .min(16, 'Card number must be at least 16 digits')
    .max(19, 'Card number too long')
    .regex(/^[\d\s]+$/, 'Card number can only contain numbers'),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: 'Amount must be a positive number' }),
  description: z.string().max(100, 'Description too long').optional(),
  otp: z.string()
})

export const MultiForm = () => {
  const [step, setStep] = useState<number>(0)   
  const totalSteps = 3

  const form = useForm({
    resolver: zodResolver(transferSchema),
    defaultValues: { cardNumber: '', amount: '', description: '', otp: '' }
  })

  const { handleSubmit, reset } = form

  const handleNext = () => { if (step < totalSteps - 1) { setStep(step + 1) } }
  const handleBack = () => { if (step > 0) setStep(step - 1) }

  const onFinalSubmit = (formData: unknown) => {
    console.log(formData)
    setStep(0)
    reset()
  }

  return (
    <FormProvider {...form}>
      <div className="space-y-4">

        {/* progress indicators */}
        <div className="flex items-center justify-center">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isCompleted = index < step
            const isActive = index === step
            const isFuture = index > step

            return (
              <div key={index} className="flex items-center">
                {/* circle */}
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                  (isCompleted || isActive) && "bg-primary text-primary-foreground",
                  isFuture && "border-2 border-border text-muted-foreground"
                )}>
                  {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
                </div>

                {/* line between steps */}
                {index < totalSteps - 1 && (
                  <div className={cn("md:w-16 w-10 h-0.5 mx-4 transition-colors duration-300", isCompleted ? "bg-primary" : "bg-border")} />
                )}
              </div>
            )
          })}
        </div>

        {/* multi step form */}
        <div>
            {/* 1) user input */}
            {step === 0 && (
              <StepOne onNext={handleNext} onBack={handleBack} isFirstStep={step === 0} />
            )}

            {/* 2) otp */}
            {step === 1 && (
              <StepTwo onNext={handleNext} onBack={handleBack} />
            )}

            {/* 3) confirmation */}
            {step === 2 && (
              <StepThree onSubmit={() => handleSubmit(onFinalSubmit)()} onBack={handleBack} />
            )}
        </div>
      </div>
    </FormProvider>
  )
}