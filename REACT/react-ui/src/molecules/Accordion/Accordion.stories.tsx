import type { Meta, StoryObj } from '@storybook/react'

import { Accordion } from './Accordion'
import { AccordionDetail } from './AccordionDetails'
import { AccordionSummary } from './AccordionSummary'

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionSummary>What is react-ui?</AccordionSummary>
      <AccordionDetail>
        A small UI library for building React apps with reusable components.
      </AccordionDetail>
    </Accordion>
  ),
}

export const MultipleItems: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Accordion>
        <AccordionSummary>What is Accordion?</AccordionSummary>
        <AccordionDetail>
          A component that toggles the visibility of content.
        </AccordionDetail>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>Can I style it?</AccordionSummary>
        <AccordionDetail>
          Yes, use Tailwind classes or your own CSS utilities.
        </AccordionDetail>
      </Accordion>
    </div>
  ),
}
