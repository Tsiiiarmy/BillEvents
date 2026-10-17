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
}