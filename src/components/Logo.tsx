interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { img: 'w-8 h-8', text: 'text-lg' },
  md: { img: 'w-10 h-10', text: 'text-2xl' },
  lg: { img: 'w-20 h-20', text: 'text-3xl' },
}

const Logo = ({ size = 'sm' }: LogoProps) => {
  const s = sizeMap[size]
  return (
    <div className="flex items-center space-x-2">
      <img
        src="/harbor-icon.png"
        alt="Harbor"
        className={`${s.img} rounded-xl`}
      />
      <span className={`${s.text} font-bold tracking-tight`}>Harbor</span>
    </div>
  )
}

export default Logo
