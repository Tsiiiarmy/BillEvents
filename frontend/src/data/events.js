import addisSummerFestival from '../assets/images/events/addis-summer-festival.jpg'
import addisComedyNight from '../assets/images/events/addis-comedy-night.jpg'
import ethiopianArtCulture from '../assets/images/events/ethiopian-art-culture.jpg'
import simienMountains from '../assets/images/events/simien-mountains.jpg'
import addisJazzNight from '../assets/images/events/addis-jazz-night.jpg'
import foodFestival from '../assets/images/events/food-festival.jpg'
import lakeTana from '../assets/images/events/lake-tana.jpg'
import coffeeFestival from '../assets/images/events/coffee-festival.jpg'
import ethioJazz from '../assets/images/events/ethio-jazz.jpg'
import magicVariety from '../assets/images/events/magic-variety.jpg'
import gondarCastles from '../assets/images/events/gondar-castles.jpg'
import newYearsEve from '../assets/images/events/new-years-eve.jpg'

/* ── Sample dates, relative to today ─────────────────────────
   So the demo always has upcoming events. The backend replaces all of this. */
const pad = (n) => String(n).padStart(2, '0')
const DAY = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
const TIME = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })

/** → { start: '2026-12-05T18:00', date: 'Dec 05, 2026 · 6:00 PM' } */
function stamp(d) {
  return {
    start: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`,
    date: `${DAY.format(d)} · ${TIME.format(d)}`,
  }
}

/** `days` from today at a local clock time, e.g. inDays(9, '18:00'). */
function inDays(days, time) {
  const [h, m] = time.split(':').map(Number)
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(h, m, 0, 0)
  return stamp(d)
}

/** The next 31 December at `time`. */
function nextNewYearsEve(time) {
  const [h, m] = time.split(':').map(Number)
  const now = new Date()
  const d = new Date(now.getFullYear(), 11, 31, h, m)
  if (d < now) d.setFullYear(d.getFullYear() + 1)
  return stamp(d)
}

const r50 = (n) => Math.round(n / 50) * 50

// Sample ticket tiers built from the starting price. Replace with real data from the backend later.
const tiers = (base) => [
  { id: 'early', name: 'Early Bird', price: base, note: 'Limited-time price' },
  { id: 'regular', name: 'Regular', price: r50(base * 1.3), note: 'General admission' },
  { id: 'vip', name: 'VIP', price: r50(base * 2.5), note: 'Priority entry and best views' },
]
const make = (e) => ({ ...e, tickets: tiers(e.price) })

export const allEvents = [
  make({ id: 1, featured: true, title: 'Addis Summer Festival', cat: 'Music', category: 'Music', icon: 'music', image: addisSummerFestival, ...inDays(9, '18:00'), venue: 'Millennium Hall', city: 'Addis Ababa', price: 1500, grad: 'from-aqua via-[#3364AA] to-navy', description: 'An open-air celebration of live music under the Addis sky. Bring your friends, dance with the crowd and enjoy a night built around Ethiopian and international sound.' }),
  make({ id: 2, featured: true, title: 'Addis Comedy Night', cat: 'Comedy', category: 'Comedy', icon: 'smile', image: addisComedyNight, ...inDays(4, '19:00'), venue: 'Ghion Hotel', city: 'Addis Ababa', price: 800, grad: 'from-[#3364AA] via-navy to-[#0E7C86]', description: 'An evening of stand-up comedy in a relaxed, intimate setting. Come ready to laugh with a lineup of local comedians.' }),
  make({ id: 3, featured: true, title: 'Ethiopian Art & Culture Exhibition', cat: 'Exhibition', category: 'Exhibitions', icon: 'frame', image: ethiopianArtCulture, ...inDays(16, '10:00'), venue: 'National Museum', city: 'Addis Ababa', price: 500, grad: 'from-navy via-[#3364AA] to-aqua', description: 'Explore paintings, crafts and traditions from across Ethiopia in a day-long exhibition that celebrates the nation’s creative heritage.' }),
  make({ id: 4, featured: true, title: 'Simien Mountains Hike', cat: 'Outdoor', category: 'Outdoor', icon: 'mountain', image: simienMountains, ...inDays(12, '08:00'), venue: 'Debark', city: 'Simien Mountains', price: 2000, grad: 'from-[#0E7C86] via-aqua to-[#3364AA]', description: 'A guided hiking experience through the dramatic escarpments of the Simien Mountains. Expect sweeping views and fresh mountain air.' }),
  make({ id: 5, title: 'Addis Jazz Night', cat: 'Music', category: 'Music', icon: 'music', image: addisJazzNight, ...inDays(6, '20:00'), venue: 'Fendika Cultural Center', city: 'Addis Ababa', price: 600, grad: 'from-navy via-[#2C4A86] to-aqua', description: 'A cozy evening of live jazz and Ethio-jazz in the heart of the city. Great music, great company.' }),
  make({ id: 6, title: 'Meskel Square Food Festival', cat: 'Food & Drink', category: 'Food & Drink', icon: 'fork', image: foodFestival, ...inDays(2, '12:00'), venue: 'Meskel Square', city: 'Addis Ababa', price: 300, grad: 'from-[#3364AA] via-aqua to-[#0E7C86]', description: 'Taste your way through traditional dishes and modern street food from local cooks and restaurants, all in one open-air space.' }),
  make({ id: 7, title: 'Bahir Dar Lake Tana Boat Experience', cat: 'Outdoor', category: 'Outdoor', icon: 'mountain', image: lakeTana, ...inDays(20, '07:30'), venue: 'Lake Tana Shore', city: 'Bahir Dar', price: 1200, grad: 'from-aqua via-[#0E7C86] to-navy', description: 'Glide across Lake Tana and visit its island monasteries on a guided boat trip with time to explore and take photos.' }),
  make({ id: 8, title: 'Ethiopian Coffee Festival', cat: 'Festival', category: 'Festivals', icon: 'flag', image: coffeeFestival, ...inDays(11, '10:00'), venue: 'Friendship Park', city: 'Addis Ababa', price: 250, grad: 'from-[#2C4A86] via-[#3364AA] to-aqua', description: 'Celebrate the birthplace of coffee with tastings, traditional ceremonies and live demonstrations by local growers and roasters.' }),
  make({ id: 9, title: 'Ethio-Jazz Revival Concert', cat: 'Music', category: 'Music', icon: 'music', image: ethioJazz, ...inDays(23, '19:30'), venue: 'Ethiopian National Theatre', city: 'Addis Ababa', price: 1000, grad: 'from-navy via-[#3364AA] to-[#0E7C86]', description: 'A concert honoring the golden era of Ethio-jazz, performed live in one of the capital’s most loved theatres.' }),
  make({ id: 10, title: 'Addis Magic & Variety Show', cat: 'Show', category: 'Shows', icon: 'mic', image: magicVariety, ...inDays(30, '18:00'), venue: 'Ethiopian National Theatre', city: 'Addis Ababa', price: 700, grad: 'from-[#0E7C86] via-[#3364AA] to-navy', description: 'An entertaining night of magic, music and variety acts for the whole family.' }),
  make({ id: 11, title: 'Gondar Castles Heritage Tour', cat: 'Arts & Culture', category: 'Arts & Culture', icon: 'palette', image: gondarCastles, ...inDays(51, '09:00'), venue: 'Fasil Ghebbi', city: 'Gondar', price: 900, grad: 'from-aqua via-[#3364AA] to-[#2C4A86]', description: 'Walk through the royal enclosure of Gondar with a guide and learn the history behind the city’s famous castles.' }),
  make({ id: 12, title: 'New Year’s Eve Countdown Party', cat: 'Festival', category: 'Festivals', icon: 'flag', image: newYearsEve, ...nextNewYearsEve('21:00'), venue: 'Millennium Hall', city: 'Addis Ababa', price: 1800, grad: 'from-navy via-[#2C4A86] to-aqua', description: 'Ring in the new year with music, lights and a midnight countdown alongside the city’s biggest crowd.' }),
]

export const cities = [...new Set(allEvents.map((e) => e.city))].sort()