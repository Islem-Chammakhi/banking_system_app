'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { User } from 'lucide-react'
import { logoutUser } from '../logout-api'
import { toast } from '@/hooks/use-toast'

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const ProfileDropdown = ({ trigger, defaultOpen, align = 'end' }: Props) => {
  const router = useRouter()

  // handle logout
  const handleLogout = async () => {
    try {
      await logoutUser()
      toast({ title: "Logged out successfully!", description: "You have been signed out of your account", })
      router.push('/')
    } catch (error) {
      toast({ title: "Logout failed!", description: "Please try again later", variant: "destructive", })
    }
  }

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-64' align={align || 'end'}>
        <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
          <div className='relative'>
            <div className='flex size-10 items-center justify-center rounded-full bg-muted'>
              <User className='size-5' />
            </div>
            <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
          </div>
          <div className='flex flex-1 flex-col items-start'>
            <span className='text-foreground text-base font-semibold'>Firas Ben Ali</span>
            <span className='text-muted-foreground text-sm'>CIN-12895665</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className='px-4 py-2.5 text-sm'>
            <UserIcon className='text-foreground size-5' />
            <span>My account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='px-4 py-2.5 text-sm'>
            <SettingsIcon className='text-foreground size-5' />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* logout button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem variant='destructive' className='px-4 py-2.5 text-sm' onSelect={(e) => e.preventDefault()} >
              <LogOutIcon className='size-5' />
              <span>Logout</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
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
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown