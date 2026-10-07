// Sample data. Add an `image` URL/import to any event to show a real photo instead of the gradient.
export const events = [
  { id: 1, title: 'Addis Summer Festival', cat: 'Music', icon: 'music', date: 'Oct 24, 2026 · 6:00 PM', venue: 'Millennium Hall', city: 'Addis Ababa', price: 1500, grad: 'from-aqua via-[#3364AA] to-navy' },
  { id: 2, title: 'Addis Comedy Night', cat: 'Comedy', icon: 'smile', date: 'Nov 12, 2026 · 7:00 PM', venue: 'Ghion Hotel', city: 'Addis Ababa', price: 800, grad: 'from-[#3364AA] via-navy to-[#0E7C86]' },
  { id: 3, title: 'Ethiopian Art & Culture Exhibition', cat: 'Exhibition', icon: 'frame', date: 'Dec 05, 2026 · 10:00 AM', venue: 'National Museum', city: 'Addis Ababa', price: 500, grad: 'from-navy via-[#3364AA] to-aqua' },
  { id: 4, title: 'Simien Mountains Hike', cat: 'Outdoor', icon: 'mountain', date: 'Nov 20, 2026 · 8:00 AM', venue: 'Debark', city: 'Simien Mountains', price: 2000, grad: 'from-[#0E7C86] via-aqua to-[#3364AA]' },
]

export const categories = [
  { name: 'Music', icon: 'music' }, { name: 'Festivals', icon: 'flag' }, { name: 'Shows', icon: 'mic' },
  { name: 'Exhibitions', icon: 'frame' }, { name: 'Outdoor', icon: 'mountain' }, { name: 'Comedy', icon: 'smile' },
  { name: 'Arts & Culture', icon: 'palette' }, { name: 'Food & Drink', icon: 'fork' },
]

export const steps = [
  { n: '01', icon: 'search', title: 'Discover an Event', text: 'Browse events and find something you love.' },
  { n: '02', icon: 'ticket', title: 'Choose Your Tickets', text: 'Select the ticket type and quantity.' },
  { n: '03', icon: 'card', title: 'Pay Securely', text: 'Complete payment through BillPay.' },
  { n: '04', icon: 'phone', title: 'Get Your Ticket', text: 'Receive your digital ticket and get ready for the event.' },
]

export const benefits = [
  { icon: 'plus', title: 'Create & Manage', text: 'Create events, ticket types and pricing.' },
  { icon: 'chart', title: 'Track Sales', text: 'Monitor sales, inventory and attendees.' },
  { icon: 'shield', title: 'Secure Payments', text: 'Payments powered by BillPay.' },
]