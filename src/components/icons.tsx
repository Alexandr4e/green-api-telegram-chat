import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...rest}>
      {children}
    </svg>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Логотип приложения: облачко сообщения в градиенте */
export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3fc8ff" />
          <stop offset="0.55" stopColor="#007aff" />
          <stop offset="1" stopColor="#8a4fff" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#logo-gradient)" />
      <path
        fill="#fff"
        d="M24 11c7.7 0 14 5.4 14 12.2S31.7 35.4 24 35.4c-1.6 0-3.1-.2-4.5-.7L13 37.5l1.9-5.6A11.6 11.6 0 0 1 10 23.2C10 16.4 16.3 11 24 11z"
      />
    </svg>
  )
}

export function ChatsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        fill="currentColor"
        d="M12 3c5 0 9 3.6 9 8s-4 8-9 8c-1 0-2-.1-2.9-.4L4.5 20.5l1.3-3.6A7.6 7.6 0 0 1 3 11c0-4.4 4-8 9-8z"
      />
    </Icon>
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <Icon {...props} {...stroke}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Icon>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props} {...stroke} strokeWidth={2.4}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"
      />
    </Icon>
  )
}

export function BackIcon(props: IconProps) {
  return (
    <Icon {...props} {...stroke}>
      <path d="M15 5l-7 7 7 7" />
    </Icon>
  )
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Icon {...props} {...stroke} strokeWidth={2.4}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Icon>
  )
}
