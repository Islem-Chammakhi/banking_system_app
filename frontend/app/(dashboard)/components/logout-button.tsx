"use client"

import { useRouter } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { logoutUser } from '../logout-api'
import { toast } from '@/hooks/use-toast'

export function LogoutButton() {
    const router = useRouter();

    // handle logout
    const handleLogout = async () => {
      try {
        await logoutUser();
        toast({ title: "Logged out successfully!", description: "You have been signed out of your account", });
        router.push("/");
      } catch (error) {
        toast({ title: "Logout failed!", description: "Please try again later", variant: "destructive", })
      }
    }

    return (
      <AlertDialog>
        {/* trigger button */}
        <AlertDialogTrigger asChild>
            <DropdownMenuItem variant='destructive' className='px-4 py-2 text-sm' onSelect={(e) => e.preventDefault()} >
                <LogOutIcon />
                <span>Logout</span>
            </DropdownMenuItem>
        </AlertDialogTrigger>
        {/* confirm dialog*/}
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
                You will be signed out of your account and need to login again to access your banking services.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}> Logout </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

}
