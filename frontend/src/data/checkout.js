// ─────────────────────────────────────────────────────────────
// CHECKOUT & PAYMENT CONFIGURATION
//
// Everything a business person might change lives here, not in
// the components. The fee numbers below are PLACEHOLDERS — the
// real BillEvents commercial terms have not been defined yet.
// ─────────────────────────────────────────────────────────────

/** Max tickets per tier, per order. Matches TicketSelector. */
export const MAX_PER_TIER = 6

/**
 * The BillEvents service fee.
 * Brief rule: the fee is charged ON TOP of the ticket price and is
 * always shown as its own line. It is never folded into the price.
 *
 * mode 'percent' → rate × ticket price, clamped between min and max, per ticket
 * mode 'flat'    → flat amount per ticket
 */
export const SERVICE_FEE = {
  mode: 'percent',
  rate: 0.05,
  min: 10,
  max: 150,
  flat: 25,
    // English label. Other languages use the 'fee.label' key in src/i18n/strings —
  // update those too if you rename this.
  label: 'BillEvents service fee',
  note: 'Charged on top of the ticket price, never hidden inside it.',
}

/** Free events skip the fee entirely. */
export const FREE_IS_FREE = true

/**
 * Payment methods offered on the BillPay screen.
 * `kind` drives which mock form the payment step renders.
 */

export const PAYMENT_METHODS = [
  {
    id: 'telebirr',
    name: 'telebirr',
    kind: 'mobile',
    icon: 'phone',
    blurb: 'Pay with your telebirr wallet',
    detail: 'You would get a payment prompt on your phone.',
  },
  {
    id: 'cbebirr',
    name: 'CBE Birr',
    kind: 'mobile',
    icon: 'wallet',
    blurb: 'Pay from your CBE Birr wallet',
    detail: 'You would confirm the payment in the CBE Birr app.',
  },
  {
    id: 'bank',
    name: 'Bank transfer',
    kind: 'bank',
    icon: 'bank',
    blurb: 'CBE, Awash, Dashen, Abyssinia and more',
    detail: 'You would be sent to your bank to approve the transfer.',
  },
  {
    id: 'card',
    name: 'Debit or credit card',
    kind: 'card',
    icon: 'card',
    blurb: 'Visa and Mastercard',
    detail: 'Card entry is a mockup in this preview. Do not type a real card number.',
  },
]

/** Banks listed under the bank-transfer option. */
export const BANKS = [
  'Commercial Bank of Ethiopia',
  'Awash Bank',
  'Dashen Bank',
  'Bank of Abyssinia',
  'Cooperative Bank of Oromia',
  'Wegagen Bank',
  'Hibret Bank',
]

/** Order lifecycle. A real backend owns these later. */
export const ORDER_STATUS = {
  pending: { label: 'Awaiting payment', icon: 'clock' },
  paid: { label: 'Paid', icon: 'check' },
  failed: { label: 'Payment failed', icon: 'alert' },
  refunded: { label: 'Refunded', icon: 'refresh' },
  cancelled: { label: 'Cancelled', icon: 'x' },
}

/** Single-ticket lifecycle, used by My Tickets and Event Entry. */
export const TICKET_STATUS = {
  valid: { label: 'Valid', icon: 'check' },
  used: { label: 'Checked in', icon: 'scan' },
  expired: { label: 'Expired', icon: 'clock' },
  void: { label: 'Void', icon: 'x' },
}

/** How long the checkout draft is held before we treat it as stale. */
export const CHECKOUT_TTL_MINUTES = 30