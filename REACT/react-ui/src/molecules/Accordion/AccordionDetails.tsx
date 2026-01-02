import type { ReactNode } from 'react'
import { useContext } from 'react'

import { AccordionContext } from './Accordion'

export type AccordionDetailProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function AccordionDetail({ children, ...props }: AccordionDetailProps) {
  const { className, ...rest } = props
  const context = useContext(AccordionContext)
  const isOpen = context?.expanded ?? false

  return (
    <div
      {...rest}
      id={context?.detailsId}
      role="region"
      aria-labelledby={context?.summaryId}
      hidden={!isOpen}
      className={`px-4 py-2 bg-gray-100${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  )
}
