// ─────────────────────────────────────────────────────────────
// SUPPORT PAGES — Help, Contact, Terms, Privacy
// Everything a non-developer might need to edit lives here.
// ─────────────────────────────────────────────────────────────

/**
 * Real contact channels. Leave a value as null until it's confirmed —
 * the Contact page hides anything that's null.
 * TODO before launch: fill these in with BillPay's real details.
 */
export const CONTACT = {
  email: null, // e.g. 'support@…'
  phone: null, // e.g. '+251 …'
  hours: null, // e.g. 'Mon–Sat, 8:30 AM – 6:00 PM'
  address: null,
}

export const CONTACT_TOPICS = [
  { id: 'order', label: 'An order or ticket' },
  { id: 'payment', label: 'A payment' },
  { id: 'account', label: 'My account' },
  { id: 'organizer', label: 'Selling tickets' },
  { id: 'other', label: 'Something else' },
]

/** Order references look like BE-7KQ2MX (see utils/ids.js). */
export const ORDER_REF = /^BE-[A-Z0-9]{6}$/

/**
 * Help Center questions, grouped by topic.
 * `draft: true` marks answers waiting on a business decision — they show a
 * "Policy pending" tag so nobody mistakes them for a real promise.
 */
export const HELP_TOPICS = [
  {
    id: 'buying',
    title: 'Buying tickets',
    icon: 'ticket',
    items: [
      {
        q: 'How do I buy a ticket?',
        a: 'Find an event on Discover and open it. Choose how many tickets you want of each type, then go to checkout. Add your contact details, pick a payment method and pay. Your tickets appear straight away.',
        link: { to: '/events', label: 'Browse events' },
      },
      {
        q: 'Is there a limit on how many tickets I can buy?',
        a: 'You can buy up to 6 tickets of each ticket type in a single order.',
      },
      {
        q: 'Are there extra fees?',
        a: 'BillEvents adds a service fee on top of the ticket price. It is always shown as its own line before you pay, so the total you see is the total you pay. Free events have no service fee.',
      },
      {
        q: 'How can I pay?',
        a: 'Payments go through BillPay. You can pay with telebirr, CBE Birr, a bank account, or a debit or credit card.',
      },
      {
        q: 'My checkout expired. What happened?',
        a: 'A checkout stays open for 30 minutes. If that time runs out, start again from the event page.',
      },
    ],
  },
  {
    id: 'tickets',
    title: 'Your tickets',
    icon: 'qr',
    items: [
      {
        q: 'Where are my tickets?',
        a: 'Sign in and open My Tickets from your account menu. Upcoming events are on the first tab and past ones on the second. Each order also links to its receipt.',
        link: { to: '/account/tickets', label: 'Go to My Tickets' },
      },
      {
        q: 'What do I show at the entrance?',
        a: 'Open your ticket and show its QR code. Turn your screen brightness up so it scans quickly. If the code won’t scan, staff can type in the ticket number printed under it.',
      },
      {
        q: 'I bought tickets for friends. How do they get in?',
        a: 'Every seat gets its own ticket with its own QR code, and each person needs their own code at the door. You can download a code from the ticket and send it to them.',
      },
      {
        q: 'Can a ticket be used twice?',
        a: 'No. Each code works once. After it is scanned, the same code is turned away, so never post a photo of your ticket online.',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes and refunds',
    icon: 'refresh',
    items: [
      {
        q: 'Can I get a refund?',
        a: 'The BillEvents refund policy is still being finalised. If you need help with a specific order, contact us with your order reference.',
        link: { to: '/contact', label: 'Contact us' },
        draft: true,
      },
      {
        q: 'What happens if an event is cancelled or moved?',
        a: 'The policy for cancelled and rescheduled events is still being finalised. Contact us with your order reference and we’ll help.',
        link: { to: '/contact', label: 'Contact us' },
        draft: true,
      },
    ],
  },
  {
    id: 'account',
    title: 'Your account',
    icon: 'user',
    items: [
      {
        q: 'How do I save an event for later?',
        a: 'Tap the heart on any event. Everything you save is listed under Saved in your account.',
        link: { to: '/account/saved', label: 'See saved events' },
      },
      {
        q: 'How do I change my name, email or phone?',
        a: 'Open Settings in your account. You need to keep at least an email address or a phone number.',
        link: { to: '/account/settings', label: 'Open Settings' },
      },
      {
        q: 'Can I switch to dark mode?',
        a: 'Yes. Use the sun and moon button in the top bar, or choose a theme in Settings.',
      },
    ],
  },
  {
    id: 'organizers',
    title: 'For organizers',
    icon: 'building',
    items: [
      {
        q: 'I want to sell tickets for my event.',
        a: 'Organizers apply once to be approved. After that, each event is submitted for review before it goes on sale.',
        link: { to: '/#organizers', label: 'Learn about selling' },
      },
    ],
  },
]

/**
 * Terms and Privacy are OUTLINES ONLY. The business has not defined its legal
 * terms, so each section says what it will cover — not what the rule is.
 * Replace `covers` with real text once BillPay's legal team provides it.
 */
export const LEGAL = {
  terms: {
    title: 'Terms & Conditions',
    lead: 'The rules for using BillEvents and buying tickets.',
    sections: [
      { id: 'about', heading: 'About BillEvents', covers: 'Who runs BillEvents and how it relates to BillPay.' },
      { id: 'accounts', heading: 'Your account', covers: 'Who can create an account and what you are responsible for.' },
      { id: 'buying', heading: 'Buying tickets', covers: 'How an order is placed and confirmed, and per-order limits.' },
      { id: 'fees', heading: 'Prices and the service fee', covers: 'How ticket prices and the separate BillEvents service fee are shown and charged.' },
      { id: 'payments', heading: 'Payments', covers: 'How payments are processed through BillPay and what happens if one fails.' },
      { id: 'entry', heading: 'Tickets and entry', covers: 'How QR tickets work, one scan per ticket, and what happens at the door.' },
      { id: 'refunds', heading: 'Cancellations, changes and refunds', covers: 'What happens when an event is cancelled, moved or changed, and when refunds apply.' },
      { id: 'organizers', heading: 'Organizers', covers: 'What organizers are responsible for, and what BillEvents is responsible for.' },
      { id: 'use', heading: 'Acceptable use', covers: 'What you may not do, including reselling or copying tickets.' },
      { id: 'liability', heading: 'Liability', covers: 'The limits of BillEvents’ responsibility.' },
      { id: 'changes', heading: 'Changes to these terms', covers: 'How and when these terms may be updated.' },
      { id: 'contact', heading: 'Contact', covers: 'How to reach us about these terms.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lead: 'What information BillEvents keeps about you, and why.',
    sections: [
      { id: 'collect', heading: 'What we collect', covers: 'The personal details collected when you sign up, buy tickets or contact us.' },
      { id: 'use', heading: 'How we use it', covers: 'Why each piece of information is needed.' },
      { id: 'payments', heading: 'Payments', covers: 'What payment information is handled by BillPay, and what BillEvents itself sees.' },
      { id: 'sharing', heading: 'Who we share it with', covers: 'Whether and how details are shared with event organizers or other parties.' },
      { id: 'storage', heading: 'Storage and retention', covers: 'Where information is stored and how long it is kept.' },
      { id: 'device', heading: 'Cookies and storage on your device', covers: 'What is saved in your browser, such as your theme and saved events.' },
      { id: 'rights', heading: 'Your rights', covers: 'How to see, correct or delete your information.' },
      { id: 'children', heading: 'Children', covers: 'Rules for users under 18.' },
      { id: 'changes', heading: 'Changes to this policy', covers: 'How and when this policy may be updated.' },
      { id: 'contact', heading: 'Contact', covers: 'How to reach us about your privacy.' },
    ],
  },
}