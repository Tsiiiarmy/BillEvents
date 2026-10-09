export const STATUS = {
  NONE: 'none',
  PENDING: 'pending',
  CHANGES: 'changes_required',
  REJECTED: 'rejected',
  APPROVED: 'approved',
}

// tone drives the badge colour; label is always shown too (never colour alone)
export const STATUS_META = {
  none: { label: 'Not an organizer', tone: 'neutral' },
  pending: { label: 'Under Review', tone: 'amber' },
  changes_required: { label: 'Changes Required', tone: 'orange' },
  rejected: { label: 'Not Approved', tone: 'red' },
  approved: { label: 'Verified Organizer', tone: 'green' },
}

// Where "Create Event" should send someone, based on their status
export const STATUS_ROUTE = {
  none: '/organizer/apply',
  pending: '/organizer/status',
  changes_required: '/organizer/status',
  rejected: '/organizer/status',
  approved: '/organizer/dashboard',
}

export const APPLICATION_STEPS = [
  { n: '01', title: 'Profile', text: 'Who you are', icon: 'user' },
  { n: '02', title: 'Organization', text: 'Individual or company', icon: 'building' },
  { n: '03', title: 'Verification', text: 'Upload your documents', icon: 'shield' },
  { n: '04', title: 'Experience', text: 'The events you organize', icon: 'star' },
  { n: '05', title: 'Agreement', text: 'Review the organizer terms', icon: 'file' },
  { n: '06', title: 'Review', text: 'Check everything and submit', icon: 'eye' },
]

export const CHECKPOINTS = [
  { icon: 'shield', title: 'Get verified', text: 'Tell us about yourself or your organization and share a few documents. The BillEvents team reviews your application.' },
  { icon: 'ticket', title: 'Create your event', text: 'Once approved, set up your event, ticket types, pricing and inventory.' },
  { icon: 'check', title: 'Event review and publish', text: 'Every event is reviewed by BillEvents before it goes live to customers.' },
]