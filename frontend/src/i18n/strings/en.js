// English is the source of truth. Every key must exist here.
// Other languages may skip keys — they fall back to English.
export default {
  // Navbar
  'nav.home': 'BillEvents home',
  'nav.main': 'Main',
  'nav.mobile': 'Mobile menu',
  'nav.discover': 'Discover',
  'nav.categories': 'Categories',
  'nav.myTickets': 'My Tickets',
  'nav.search': 'Search events',
  'nav.language': 'Language',
  'nav.signIn': 'Sign in',
  'nav.signOut': 'Sign out',
  'nav.menuOpen': 'Open menu',
  'nav.menuClose': 'Close menu',

  // Account menu and account side nav
  'account.menu': 'Account',
  'account.menuFor': 'Account menu for {name}',
  'account.you': 'your account',
  'account.guestName': 'BillEvents user',
  'account.signedIn': 'Signed in',
  'account.tickets': 'My Tickets',
  'account.saved': 'Saved Events',
  'account.settings': 'Settings',

  // Theme button
  'theme.toDark': 'Switch to dark mode',
  'theme.toLight': 'Switch to light mode',
  'theme.dark': 'Dark mode',
  'theme.light': 'Light mode',

  // Settings → Language
  'settings.lang.title': 'Language',
  'settings.lang.lead': 'Choose the language BillEvents uses on this device.',
  'settings.lang.note':
    'Translations are machine drafts and are being added page by page. Anything not translated yet stays in English.',

  // Footer
  'footer.languages': 'Language',
  'footer.tagline': 'Discover unforgettable experiences, all in one place.',
  'footer.explore': 'Explore Events',
  'footer.quickLinks': 'Quick Links',
  'footer.howItWorks': 'How It Works',
  'footer.forOrganizers': 'For Organizers',
  'footer.support': 'Support',
  'footer.help': 'Help Center',
  'footer.contact': 'Contact Us',
  'footer.terms': 'Terms & Conditions',
  'footer.privacy': 'Privacy Policy',
  'footer.follow': 'Follow Us',
  'footer.followText': 'Stay connected and never miss what’s happening.',
  'footer.rights': '© {year} BillEvents. All rights reserved.',
  'footer.family': 'Part of the BillPay family',

  // Newsletter bar
  'news.label': 'Newsletter',
  'news.title': 'Be the First to Know',
  'news.text': 'Get the latest events, exclusive offers, and more — straight to your inbox.',
  'news.email': 'Email address',
  'news.placeholder': 'Enter your email address',
  'news.subscribe': 'Subscribe',
  'news.error': 'Please enter a valid email address.',
  'news.done': 'Thanks! You’re on the list.',
  'news.preview': '(preview only)',

  // Hero
  'hero.eyebrow': 'DISCOVER • BOOK • EXPERIENCE',
  'hero.title': 'Unforgettable moments,',
  'hero.titleAccent': 'one place.',
  'hero.lead': 'Discover concerts, festivals, shows, exhibitions and experiences happening around you.',
  'hero.search': 'Search events, artists, venues',
  'hero.searchPlaceholder': 'Search events, artists, venues...',
  'hero.searchGo': 'Search',
  'hero.popular': 'Popular:',
  'hero.featured': 'FEATURED',
  'hero.imageAlt': 'A huge crowd lighting up the night with phone lights at a live concert in Addis Ababa',

  // Featured events
  'featured.eyebrow': 'FEATURED EVENTS',
  'featured.title': 'Don’t Miss These',
  'featured.text': 'Handpicked events worth experiencing.',
  'featured.viewAll': 'View All Events',

  // Categories section
  'cats.eyebrow': 'EXPLORE BY CATEGORY',
  'cats.title': 'Find Your Vibe',
  'cats.text': 'From music to culture, there’s something for everyone.',

  
  // Event card (landing + Discover)
  'card.from': 'From {price}',
  'card.currency': '{amount} ETB',
  'card.free': 'Free',
  'card.getTickets': 'Get Tickets',

  // How it works
  'how.eyebrow': 'HOW IT WORKS',
  'how.title': 'Great experiences in four simple steps.',

  // Organizers section
  'org.eyebrow': 'FOR ORGANIZERS',
  'org.title': 'Bring Your Event to Life',
  'org.text': 'Create, manage and sell tickets for your event — all in one place.',
  'org.cta': 'Create Event',
  'org.learn': 'Learn More',
  'org.demoLabel': 'Sample organizer dashboard showing tickets sold, revenue, sales chart and ticket inventory',
  'org.demoTitle': 'Event Performance',
  'org.sample': 'SAMPLE DATA',
  'org.sold': 'Tickets sold',
  'org.revenue': 'Revenue',
  'org.upcoming': 'Upcoming',
  'tier.early': 'Early Bird',
  'tier.regular': 'Regular',
  'tier.vip': 'VIP',

  // App section
  'app.eyebrow': 'GET THE BILLEVENTS APP',
  'app.title': 'Your events, always with you.',
  'app.text': 'Discover new events, keep your tickets close, and stay ready for your next experience.',
  'app.appleSmall': 'Download on the',
  'app.playSmall': 'Get it on',
  'app.appleLabel': 'Download on the App Store',
  'app.playLabel': 'Get it on Google Play',
  'app.upcoming': 'Upcoming Events',
  'app.ticketReady': 'Ticket ready',
  'app.ticketCount': '{count} × {tier}',

  // Trust strip
  'trust.lead': 'Secure payments powered by',
  'trust.tagline': 'SAFE • SIMPLE • RELIABLE',

  
  // Save (heart) button
  'save.label': 'Save {title}',
  'save.tipOn': 'Saved',
  'save.tipOff': 'Save for later',

  
  // Discover page
  'discover.docTitle': 'Discover Events',
  'discover.eyebrow': 'DISCOVER EVENTS',
  'discover.title': 'Find your next {accent} moment.',
  'discover.titleAccent': 'unforgettable',
  'discover.lead': 'Browse concerts, festivals, shows, exhibitions and outdoor experiences across Ethiopia.',
  'discover.results': 'Event results',
  'discover.count.one': '{count} event',
  'discover.count.other': '{count} events',
  'discover.in': 'in {category}',
  'discover.clearAll': 'Clear all filters',
  'discover.emptyTitle': 'No events found',
  'discover.emptyText': 'Try a different search or remove some filters.',
  'discover.showing': 'Showing {shown} of {total}',
  'discover.loadMore': 'Load more events',

  // Discover filters
  'filter.clearSearch': 'Clear search',
  'filter.byCategory': 'Filter by category',
  'filter.all': 'All',
  'filter.city': 'City',
  'filter.allCities': 'All cities',
  'filter.price': 'Price',
  'filter.sort': 'Sort by',
  'sort.soonest': 'Date: soonest',
  'sort.priceAsc': 'Price: low to high',
  'sort.priceDesc': 'Price: high to low',
  'price.any': 'Any price',

  
  // Event detail page
  'event.notFound': 'Event not found',
  'event.notFoundText': 'That event doesn’t exist or is no longer available.',
  'event.browseAll': 'Browse all events',
  'event.back': 'All events',
  'event.date': 'Date',
  'event.time': 'Time',
  'event.venue': 'Venue',
  'event.about': 'About this event',
  'event.goodToKnow': 'Good to know',
  'event.good1': 'Your digital ticket appears in My Tickets right after payment.',
  'event.good2': 'Payments are processed securely through BillPay.',
  'event.good3': 'Show your ticket on your phone at the entrance.',
  'event.tickets': 'Tickets',
  'event.more': 'More events',
  'event.related': 'You might also like',

  // Ticket selector (the fee label in English comes from data/checkout.js)
  'sel.title': 'Choose your tickets',
  'sel.limit': 'Up to {max} per ticket type.',
  'sel.qtyGroup': '{name} quantity',
  'sel.remove': 'Remove one {name} ticket',
  'sel.add': 'Add one {name} ticket',
  'sel.count.one': '{count} ticket',
  'sel.count.other': '{count} tickets',
  'sel.total': 'Total',
  'sel.continue': 'Continue to Checkout',
  'sel.secure': 'Secure payment with BillPay',


  
  // Shared form fields
  'form.optional': 'Optional',
  'form.select': 'Select...',

  // Checkout header
  'co.secure': 'Secure checkout',
  'co.progress': 'Checkout progress',
  'co.stepOf': 'Step {n} of {total} · ',
  'co.completed': 'completed',
  'co.step.details': 'Your details',
  'co.step.payment': 'Payment',
  'co.step.done': 'Confirmation',
  'co.back': 'Back',

  // Checkout details page
  'co.backToEvent': 'Back to event',
  'co.title': 'Checkout',
  'co.lead': 'Check your tickets and tell us where to send them.',
  'co.yourTickets': 'Your tickets',
  'co.change': 'Change',
  'co.each': '{price} each',
  'co.atLeastOne': 'You need at least one ticket. To start over, go back to the event.',
  'co.holder': 'Ticket holder details',
  'co.holderLead': 'Your tickets and receipt are sent here.',
  'co.name': 'Full name',
  'co.email': 'Email',
  'co.emailHint': 'We send your tickets to this address.',
  'co.phone': 'Phone number',
  'co.phoneHint': 'Used for your payment confirmation.',
  'co.errName': 'Please enter the full name of the ticket holder.',
  'co.errEmail': 'Enter a valid email address — your tickets go here.',
  'co.errPhone': 'Enter a valid mobile number, e.g. 911 234 567.',
  'co.preview': 'This is a preview build. No payment is taken and no tickets are issued by a real system yet.',
  'co.continue': 'Continue to Payment',
  'co.poweredBy': 'Payments powered by',

  // Order summary (fee label and note in English come from data/checkout.js)
  'sum.label': 'Order summary',
  'sum.subtotal': 'Subtotal',


  
  // Payment page (method names/blurbs/details in English come from data/checkout.js)
  'pay.backToDetails': 'Back to your details',
  'pay.title': 'Payment',
  'pay.lead': 'Completing your purchase with',
  'pay.failTitle': 'Payment was not completed',
  'pay.failText': 'Nothing was charged and your tickets are still held. Check your details, or pick a different payment method and try again.',
  'pay.detailsTitle': '{method} details',
  'pay.preview': 'This is a preview build. No money moves and no real payment provider is contacted.',
  'pay.confirming': 'Confirming…',
  'pay.payAmount': 'Pay {amount}',
  'pay.busyTitle': 'Confirming your payment',
  'pay.busyKeep': 'Please don’t close or refresh this page.',
  'pay.choose': 'Choose how to pay',
  'pay.chooseLead': 'Every method is processed securely by BillPay.',
  'pay.phoneLabel': '{method} phone number',
  'pay.bank': 'Your bank',
  'pay.bankPlaceholder': 'Choose your bank',
  'pay.account': 'Account holder name',
  'pay.mockTitle': 'This is a mockup.',
  'pay.mockText': 'Nothing is sent anywhere, but please do not type a real card number. Try 4111 1111 1111 1111.',
  'pay.card': 'Card number',
  'pay.holder': 'Name on card',
  'pay.exp': 'Expiry date',
  'pay.cvc': 'CVC',
  'pay.errPhone': 'Enter the mobile number linked to your wallet, e.g. 911 234 567.',
  'pay.errBank': 'Choose the bank you want to pay from.',
  'pay.errAccount': 'Enter the account holder name.',
  'pay.errCard': 'Enter the 16 digits on your card.',
  'pay.errHolder': 'Enter the name printed on the card.',
  'pay.errExpFormat': 'Use the MM/YY format.',
  'pay.errExpMonth': 'The month must be between 01 and 12.',
  'pay.errExpired': 'That card has already expired.',
  'pay.errCvc': 'Enter the 3 or 4 digit code.',

  // Success page
  'done.docTitle': 'Order {ref}',
  'done.notFound': 'We can’t find that order',
  'done.notFoundText': 'Orders in this preview are stored in your browser only, so they disappear if you clear your site data or open a different browser.',
  'done.browse': 'Browse events',
  'done.title': 'You’re going!',
  'done.forEvent': '{tickets} for {event}.',
  'done.ref': 'Order reference',
  'done.copy': 'Copy',
  'done.copied': 'Copied',
  'done.emailNote': 'Once we have a backend, a copy goes to {email}.',
  'done.yourOne': 'Your ticket',
  'done.yourMany': 'Your {count} tickets',
  'done.next': 'What happens next',
  'done.n1t': 'Your tickets are ready',
  'done.n1x': 'Every ticket below has its own code. One person, one code.',
  'done.n2t': 'Bring your phone',
  'done.n2x': 'Screenshot or save the codes so you are not relying on signal at the gate.',
  'done.n3t': 'Scan at the entrance',
  'done.n3x': 'Staff scan the QR and the ticket is marked as used. It only works once.',
  'done.preview': 'This is a preview build. No money was taken and these codes are not recognised by any real gate system.',
  'done.paidWith': 'Paid with',
  'done.paidOn': 'Paid on',
  'done.amount': 'Amount',
  'done.browseMore': 'Browse more events',
  'done.seeAll': 'See all your tickets in My Tickets',
  'done.paidSecurely': 'Paid securely with',

  
  // Relative dates (utils/datetime.js)
  'when.now': 'Happening now',
  'when.today': 'Today',
  'when.earlierToday': 'Earlier today',
  'when.tomorrow': 'Tomorrow',
  'when.yesterday': 'Yesterday',
  'when.inDays': 'In {n} days',
  'when.inWeeks': 'In {n} weeks',
  'when.inMonths': 'In {n} months',
  'when.daysAgo': '{n} days ago',
  'when.weeksAgo': '{n} weeks ago',
  'when.monthsAgo': '{n} months ago',

  // Digital ticket (status labels in English come from data/checkout.js)
  'tk.seatOf': 'Ticket {n} of {total}',
  'tk.qrAlt': 'QR code for ticket {code}',
  'tk.qrError': 'The code could not be drawn. Show the ticket number below instead.',
  'tk.scanHere': 'Scan this at the entrance',
  'tk.number': 'Ticket number',
  'tk.order': 'Order {ref}',
  'tk.save': 'Save the code',

  // My Tickets
  'mt.lead': 'Every ticket you’ve bought, with its QR code ready for the gate.',
  'mt.tabs': 'Ticket filter',
  'mt.upcoming': 'Upcoming',
  'mt.past': 'Past',
  'mt.emptyUpTitle': 'No upcoming tickets',
  'mt.emptyUpText': 'When you buy a ticket it lands here, ready to scan at the entrance.',
  'mt.emptyPastTitle': 'Nothing here yet',
  'mt.emptyPastText': 'Events you have already been to will show up here afterwards.',
  'mt.find': 'Find an event',
  'mt.preview': 'Preview build: your orders live in this browser only. They will move to your real account once the backend exists.',

  // Order card
  'oc.checkedIn': ' · {n} checked in',
  'oc.receipt': 'Receipt',
  'oc.show': 'Show tickets',
  'oc.view': 'View tickets',

  // Ticket view
  'tv.notFound': 'Ticket not found',
  'tv.notFoundText': 'We can’t find an order with that reference in this browser.',
  'tv.back': 'Back to My Tickets',
  'tv.all': 'All tickets',
  'tv.tip': 'Each ticket admits one person and works once. Turn your screen brightness up before you reach the gate.',
  'tv.receipt': 'View receipt',

  // Account greeting
  'account.hi': 'Hi, {name}',
  'account.heading': 'Your account',
}