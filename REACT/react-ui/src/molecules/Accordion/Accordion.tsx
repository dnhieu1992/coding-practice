import type { ReactNode, SyntheticEvent } from 'react'
import { createContext, useId, useMemo, useState } from 'react'

type AccordionContextValue = {
  expanded: boolean
  disabled: boolean
  summaryId: string
  detailsId: string
  toggle: () => void
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null,
)

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  expanded?: boolean
  defaultExpanded?: boolean
  disabled?: boolean
  onChange?: (event: SyntheticEvent, expanded: boolean) => void
  children: ReactNode
}

export function Accordion({
  children,
  expanded,
  defaultExpanded = false,
  disabled = false,
  onChange,
  ...props
}: AccordionProps) {
  const { className, ...rest } = props
  const isControlled = expanded !== undefined
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState(defaultExpanded)
  const isExpanded = isControlled ? expanded : uncontrolledExpanded
  const baseId = useId()
  const summaryId = `${baseId}-summary`
  const detailsId = `${baseId}-details`

  const toggle = () => {
    if (disabled) return
    const next = !isExpanded
    if (!isControlled) {
      setUncontrolledExpanded(next)
    }
    onChange?.({} as SyntheticEvent, next)
  }

  const contextValue = useMemo(
    () => ({
      expanded: Boolean(isExpanded),
      disabled,
      summaryId,
      detailsId,
      toggle,
    }),
    [isExpanded, disabled, summaryId, detailsId],
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        {...rest}
        className={`border border-gray-200 rounded-md overflow-hidden flex flex-col gap-2${
          className ? ` ${className}` : ''
        }`}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}
