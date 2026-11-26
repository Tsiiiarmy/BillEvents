import { allEvents } from './events'

export { allEvents }

export const events = allEvents.filter((e) => e.featured)

export const categories = [
  { name: 'Music', icon: 'music' },
  { name: 'Festivals', icon: 'flag' },
  { name: 'Shows', icon: 'mic' },
  { name: 'Exhibitions', icon: 'frame' },
  { name: 'Outdoor', icon: 'mountain' },
  { name: 'Comedy', icon: 'smile' },
  { name: 'Arts & Culture', icon: 'palette' },
  { name: 'Food & Drink', icon: 'fork' },
]

export const steps = [
  {
    n: '01',
    icon: 'search',
    title: 'Discover an Event',
    text: 'Browse events and find something you love.',
  },
  {
    n: '02',
    icon: 'ticket',
    title: 'Choose Your Tickets',
    text: 'Select the ticket type and quantity.',
  },
  {
    n: '03',
    icon: 'card',
    title: 'Pay Securely',
    text: 'Complete payment through BillPay.',
  },
  {
    n: '04',
    icon: 'phone',
    title: 'Get Your Ticket',
    text: 'Receive your digital ticket and get ready for the event.',
  },
]

export const benefits = [
  {
    icon: 'plus',
    title: 'Create & Manage',
    text: 'Create events, ticket types and pricing.',
  },
  {
    icon: 'chart',
    title: 'Track Sales',
    text: 'Monitor sales, inventory and attendees.',
  },
  {
    icon: 'shield',
    title: 'Secure Payments',
    text: 'Payments powered by BillPay.',
  },
]