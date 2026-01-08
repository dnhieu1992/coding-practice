import type { MouseEventHandler, ReactNode } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { useContext } from 'react'
import { AccordionContext } from './Accordion'

export type AccordionSummaryProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    expandIcon?: ReactNode
  }

export function AccordionSummary({
  children,
  expandIcon,
  ...props
}: AccordionSummaryProps) {
  const { className, onClick, disabled, ...rest } = props
  const context = useContext(AccordionContext)
  const isOpen = context?.expanded ?? false
  const isDisabled = context?.disabled ?? false

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    context?.toggle()
  }

  return (
    <button
      type="button"
      {...rest}
      id={context?.summaryId}
      aria-expanded={isOpen}
      aria-controls={context?.detailsId}
      className={`flex items-center justify-between w-full px-4 py-2${
        className ? ` ${className}` : ''
      }`}
      disabled={isDisabled || disabled}
      onClick={handleClick}
    >
      {children}
      <span>
        {expandIcon ??
          (isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />)}
      </span>
    </button>
  )
}
