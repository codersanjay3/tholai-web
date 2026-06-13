import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = "font-['DM_Sans'] font-semibold rounded-xl transition-opacity disabled:opacity-40 cursor-pointer"
  const variants = {
    primary: 'bg-[#1a3a5c] text-white hover:opacity-90',
    outline: 'bg-transparent text-[#1a3a5c] border-[1.5px] border-[#c3dff2] hover:bg-[#eef7fd]',
  }
  const sizes = {
    sm:  'px-4 py-2 text-sm',
    md:  'px-6 py-3 text-sm',
    lg:  'px-8 py-4 text-base w-full',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
