import { Card, CardContent } from '@/components/ui/card'
import { SidebarProvider } from '@/components/ui/sidebar'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Footer from './components/footer'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        {/* left side */}
        <Sidebar />
        {/* right side */}
        <div className='flex flex-1 flex-col'>
          {/* header */}
          <Header />
          {/* page content */}
          <main className='mx-auto size-full max-w-7xl flex-1 px-10 py-8 '>
            {children}
          </main>
          {/* footer */}
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  )
}

export default DashboardLayout