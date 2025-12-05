
const Footer = () => {
  return (
    <footer className='bg-card border-t py-3'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6'>
        <p className='text-sm text-muted-foreground'>
          {`© ${new Date().getFullYear()}`} Credly. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer