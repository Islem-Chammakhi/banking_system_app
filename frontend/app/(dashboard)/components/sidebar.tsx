import { ChartSplineIcon, FileSpreadsheetIcon, HistoryIcon, UsersIcon } from 'lucide-react'
import { Sidebar as UISidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar'
import Logo from '@/components/logo'
import Link from 'next/link'
import { SidebarFooting } from './sidebar-footer'

const data = {
  user: {
    name: "Islem Chammakhi",
    cin: "12895665",
    avatar: "/placeholder.png",
  }
}

const Sidebar = () => {
  return (
    <UISidebar className='p-2'>
      <SidebarHeader>
        {/* logo */}
        <SidebarGroup className='px-3.5'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem> 
                <Logo/> 
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        {/* pages */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/home">
                    <ChartSplineIcon /> <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* transfer */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/transfer">
                    <UsersIcon /> <span>Transfer</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* transactions */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/transactions">
                    <HistoryIcon/> <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* logs */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/logs">
                    <FileSpreadsheetIcon/> <span>Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooting user={data.user} />
      </SidebarFooter>
    </UISidebar>
  )
}

export default Sidebar