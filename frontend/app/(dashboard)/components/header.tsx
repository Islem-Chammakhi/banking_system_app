import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ProfileDropdown from './dropdown-profile'
import ThemeSwitcher from '@/components/theme-toggle'
import { User } from 'lucide-react'

const Header = () => {
  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger />
          <Separator orientation='vertical' className='hidden h-4! sm:block' />
          <span>Welcome back to Credly!</span>
        </div>
        {/* profile dropdown */}
        <div className='flex items-center gap-1'>
          <ThemeSwitcher />
          <ProfileDropdown trigger={ <Button variant='ghost' size='icon'> <User /> </Button> } />
        </div>
      </div>
    </header>
  )
}

export default Header