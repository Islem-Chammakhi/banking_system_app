import { ChartSplineIcon, FileSpreadsheetIcon, HistoryIcon, UsersIcon } from 'lucide-react'
import { Sidebar as UISidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Logo from '@/components/logo'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <UISidebar className=''>
      <SidebarContent className='p-4'>
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
    </UISidebar>
  )
}

export default Sidebar