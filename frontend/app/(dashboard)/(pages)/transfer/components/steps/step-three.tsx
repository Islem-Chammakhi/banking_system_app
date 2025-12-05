// components/step-three.tsx
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface StepThreeProps {
  onSubmit: () => void
  onBack: () => void
}

export function StepThree({ onSubmit, onBack }: StepThreeProps) {
  const { watch } = useFormContext()
  
  // Get form values to display
  const formData = watch()
  const { cardNumber, amount, description } = formData

  return (
    <div className="grid gap-y-6">
      {/* Transaction Details */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">Confirm Transfer</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review your transfer details
        </p>
      </div>

      <Card>
        <CardContent className="">
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipient Card:</span>
              <span className="font-medium">•••• •••• •••• {cardNumber?.slice(-4)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium text-red-600">-{amount} TND</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description:</span>
              <span className="font-medium italic">{description || 'No description'}</span>
            </div>
            
            <div className="flex justify-between border-t pt-3">
              <span className="text-muted-foreground">Current Balance:</span>
              <span className="font-medium">1,500 TND</span>
            </div>
            
            <div className="flex justify-between border-t pt-3">
              <span className="text-muted-foreground">New Balance:</span>
              <span className="font-medium">
                {(1500 - (parseFloat(amount) || 0)).toFixed(2)} TND
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons with Confirmation Dialog */}
      <div className="flex justify-between">
        <Button type="button" size="sm" onClick={onBack}>
          Back
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" size="sm">
              Confirm
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Transfer</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to transfer {amount} TND to card ending with {cardNumber?.slice(-4)}? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}