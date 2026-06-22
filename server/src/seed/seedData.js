require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { connectDB, sequelize } = require('../config/database');
const Temple = require('../models/Temple');
const User = require('../models/User');
const Review = require('../models/Review');

const temples = [
  {
    name: 'Tirumala Tirupati Balaji Temple',
    deity: 'Lord Venkateswara (Balaji)',
    state: 'Andhra Pradesh',
    city: 'Tirupati',
    address: 'Tirumala Hills, Tirupati, Andhra Pradesh',
    pincode: '517504',
    lat: 13.6835,
    lng: 79.3473,
    openTime: '04:00',
    closeTime: '23:00',
    darshanSlots: ['Sarva Darshan: 04:00-23:00', 'Special Entry: 08:00-20:00'],
    aartiTimings: ['Suprabhata Seva: 04:00', 'Thomala Seva: 04:30', 'Nivedana Seva: 06:30', 'Dhoop Deepa Naivedyam: 12:00', 'Sayanotsavam: 20:30'],
    festivalTimings: 'Extended hours during Brahmotsavam festival (9 days) in September/October',
    history: 'One of the richest and most visited religious sites in the world, dedicated to Lord Venkateswara (a form of Vishnu). The temple is believed to be 1,200 years old. Located on the seventh peak of the Tirumala Hills, it receives over 50,000 pilgrims daily. The Dravidian-style architecture and the famous golden Vimana (tower) are iconic.',
    festivals: ['Brahmotsavam', 'Vaikunta Ekadasi', 'Rathasaptami', 'Teppotsavam', 'Ugadi'],
    dressCode: 'Traditional Indian attire preferred. Dhotis and sarees recommended. No shorts, sleeveless tops, or western formals.',
    facilities: ['Free Darshan', 'Paid Special Entry', 'Prasadam (Laddu)', 'Accommodation (TTD Cottages)', 'Locker', 'Wheelchair Access', 'Parking', 'Restaurants', 'Online Booking'],
    contact: '+91-877-2277777',
    website: 'https://www.tirumala.org',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tirumala_Tirupati_temple.jpg/1200px-Tirumala_Tirupati_temple.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tirumala_Tirupati_temple.jpg/1200px-Tirumala_Tirupati_temple.jpg'],
    bestTimeToVisit: 'October to February (pleasant weather, avoid peak festivals for shorter queues)',
    howToReach: 'Nearest Airport: Tirupati Airport (15 km). Nearest Railway: Tirupati Railway Station (22 km). Regular buses from Tirupati city to Tirumala.',
    rating: 4.9,
    reviewCount: 1250,
    isFeatured: true
  },
  {
    name: 'Harmandir Sahib (Golden Temple)',
    deity: 'Waheguru (Sikh Faith)',
    state: 'Punjab',
    city: 'Amritsar',
    address: 'Golden Temple Rd, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab',
    pincode: '143006',
    lat: 31.6200,
    lng: 74.8765,
    openTime: '02:00',
    closeTime: '23:00',
    darshanSlots: ['Open 24 hours during major festivals', 'General: 02:00-23:00'],
    aartiTimings: ['Asa-di-Var: 04:30', 'Sodar Rehras: 18:30', 'Kirtan Sohila: 21:30'],
    festivalTimings: 'Open 24 hours during Gurpurab, Baisakhi, and other Sikh festivals',
    history: 'The Harmandir Sahib, also known as the Golden Temple, is the holiest Gurdwara of Sikhism. Construction was completed in 1604 AD by Guru Arjan Dev Ji. The temple is surrounded by the sacred Amrit Sarovar (Pool of Nectar). The upper floors are covered with 750 kg of pure gold donated by Maharaja Ranjit Singh in the early 19th century.',
    festivals: ['Guru Nanak Jayanti', 'Baisakhi', 'Hola Mohalla', 'Diwali (Bandi Chhor Divas)', 'Gurpurab festivals'],
    dressCode: 'Head must be covered at all times (scarves/handkerchiefs provided). Remove shoes before entry. No alcohol, tobacco, or drugs.',
    facilities: ['Langar (Free Community Kitchen)', 'Shoe Storage', 'Sarovar (Holy Pool) for bathing', 'Accommodation (Nivasas)', 'Wheelchair ramps', 'Free Prasad', 'Information Center', 'Museum'],
    contact: '+91-183-2553957',
    website: 'https://www.sgpc.net',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Golden_Temple%2C_Amritsar%2C_India_golden_hour.jpg/1200px-Golden_Temple%2C_Amritsar%2C_India_golden_hour.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Golden_Temple%2C_Amritsar%2C_India_golden_hour.jpg/1200px-Golden_Temple%2C_Amritsar%2C_India_golden_hour.jpg'],
    bestTimeToVisit: 'October to March. Visit early morning (4-6 AM) for a serene spiritual experience.',
    howToReach: 'Nearest Airport: Sri Guru Ram Dass Jee International Airport (11 km). Nearest Railway: Amritsar Junction (2 km). Auto-rickshaws and taxis from city.',
    rating: 4.9,
    reviewCount: 2100,
    isFeatured: true
  },
  {
    name: 'Meenakshi Amman Temple',
    deity: 'Goddess Meenakshi & Lord Sundareshwara (Shiva)',
    state: 'Tamil Nadu',
    city: 'Madurai',
    address: 'Madurai City Centre, Madurai, Tamil Nadu',
    pincode: '625001',
    lat: 9.9195,
    lng: 78.1193,
    openTime: '05:00',
    closeTime: '20:30',
    darshanSlots: ['Morning: 05:00-12:30', 'Evening: 16:00-20:30'],
    aartiTimings: ['Thiruvanandal: 05:30', 'Kalasanthi: 08:00', 'Uchikalam: 12:00', 'Sayarakshai: 18:00', 'Irandamkalam: 19:30'],
    festivalTimings: 'Extended timings during Chithirai Thiruvizha (April-May)',
    history: 'The Meenakshi Amman Temple is a historic Hindu temple dedicated to Goddess Parvati (Meenakshi) and Lord Shiva (Sundareshwara). The temple complex covers 14 acres and has 14 gateway towers (gopurams), the tallest being 51.9 meters high. The temple has over 33,000 sculptures and is considered one of the masterpieces of Dravidian architecture. It dates back to at least 2000 years.',
    festivals: ['Chithirai Thiruvizha', 'Navaratri', 'Float Festival (Teppa Thiruvizha)', 'Aadi Festival', 'Karthigai Deepam'],
    dressCode: 'Traditional attire required. Sarees for women, dhotis for men preferred. Non-Hindus not allowed in the inner sanctum.',
    facilities: ['Photography in outer areas', 'Shoe Storage', 'Prasadam', 'Museum', 'Audio guide', 'Wheelchair access to outer complex'],
    contact: '+91-452-2346500',
    website: 'https://www.maduraimeenakshi.org',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Madurai_Meenakshi_Amman_Temple.jpg/1200px-Madurai_Meenakshi_Amman_Temple.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Madurai_Meenakshi_Amman_Temple.jpg/1200px-Madurai_Meenakshi_Amman_Temple.jpg'],
    bestTimeToVisit: 'October to March. Early morning or evening for cooler weather and fewer crowds.',
    howToReach: 'Nearest Airport: Madurai Airport (12 km). Nearest Railway: Madurai Junction (1.5 km). Walking distance from main bus stand.',
    rating: 4.8,
    reviewCount: 890,
    isFeatured: true
  },
  {
    name: 'Somnath Temple',
    deity: 'Lord Shiva (Jyotirlinga)',
    state: 'Gujarat',
    city: 'Somnath (Prabhas Patan)',
    address: 'Somnath, Veraval, Gir Somnath, Gujarat',
    pincode: '362268',
    lat: 20.8880,
    lng: 70.4017,
    openTime: '06:00',
    closeTime: '22:00',
    darshanSlots: ['Morning: 06:00-12:00', 'Afternoon: 12:00-17:00', 'Evening: 17:00-22:00'],
    aartiTimings: ['Puja: 07:00', 'Bhog Aarti: 12:00', 'Sandhya Aarti: 19:00', 'Shayan Aarti: 21:30'],
    festivalTimings: 'Extended hours during Maha Shivaratri and Shravan month',
    history: 'Somnath is the first of the twelve Jyotirlingas of Lord Shiva. The present temple was constructed by the Chalukya style of architecture in 1951. It has been destroyed and rebuilt 17 times by invaders. The current temple was constructed on the direction of Sardar Vallabhbhai Patel. The temple stands on the Prabhas shore where three rivers — Kapila, Hiran, and Saraswati — meet.',
    festivals: ['Maha Shivaratri', 'Kartik Purnima', 'Shravan Somvar', 'Navratri'],
    dressCode: 'Traditional attire preferred. Sober clothing required. No leather items inside the temple.',
    facilities: ['Sound and Light Show (evening)', 'Parking', 'Prasadam', 'Accommodation', 'Museum', 'Beach view', 'Wheelchair access'],
    contact: '+91-2876-231212',
    website: 'https://www.somnath.org',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Somnath_temple_2010.jpg/1200px-Somnath_temple_2010.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Somnath_temple_2010.jpg/1200px-Somnath_temple_2010.jpg'],
    bestTimeToVisit: 'October to March. Avoid peak summer.',
    howToReach: 'Nearest Airport: Diu Airport (63 km), Rajkot Airport (175 km). Nearest Railway: Veraval Railway Station (7 km).',
    rating: 4.7,
    reviewCount: 680,
    isFeatured: true
  },
  {
    name: 'Kashi Vishwanath Temple',
    deity: 'Lord Shiva (Vishwanath)',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    address: 'Lahori Tola, Varanasi, Uttar Pradesh',
    pincode: '221001',
    lat: 25.3108,
    lng: 83.0107,
    openTime: '02:30',
    closeTime: '23:00',
    darshanSlots: ['Mangala Aarti: 02:30', 'General Darshan: 04:00-11:00', 'Afternoon: 12:00-17:00', 'Evening: 17:00-21:00'],
    aartiTimings: ['Mangala Aarti: 03:00', 'Bhog Aarti: 11:15', 'Sandhya Aarti: 19:00', 'Shayan Aarti: 22:30'],
    festivalTimings: 'Special timings during Maha Shivaratri (all night), Sawan month',
    history: 'The Kashi Vishwanath Temple is one of the most famous Hindu temples dedicated to Lord Shiva and is one of the twelve Jyotirlingas. Located in the holy city of Varanasi (Banaras), it sits on the western bank of the holy Ganga river. The temple was rebuilt by the Maratha queen Ahilyabai Holkar in 1780. The temple corridor was recently renovated under the Kashi Vishwanath Corridor project inaugurated in 2021.',
    festivals: ['Maha Shivaratri', 'Sawan festival', 'Nag Panchami', 'Ganga Aarti (riverbank)', 'Dev Deepawali'],
    dressCode: 'Traditional attire mandatory. Non-Hindus restricted. No electronic items. Tight security.',
    facilities: ['VIP Darshan', 'Locker', 'Security Check', 'Prasadam', 'Nearby Ghat access', 'Ganga Aarti viewing nearby'],
    contact: '+91-542-2392080',
    website: 'https://shrikashivishwanath.org',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kashi_Vishwanath_Temple.jpg/1200px-Kashi_Vishwanath_Temple.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kashi_Vishwanath_Temple.jpg/1200px-Kashi_Vishwanath_Temple.jpg'],
    bestTimeToVisit: 'October to March. Visit during Dev Deepawali (November) for a magical experience.',
    howToReach: 'Nearest Airport: Lal Bahadur Shastri Airport, Varanasi (26 km). Nearest Railway: Varanasi Junction (6 km). Rickshaws and taxis to ghats.',
    rating: 4.8,
    reviewCount: 1100,
    isFeatured: true
  },
  {
    name: 'Vaishno Devi Temple',
    deity: 'Goddess Vaishno Devi (Mata Rani)',
    state: 'Jammu and Kashmir',
    city: 'Katra',
    address: 'Trikuta Hills, Katra, Jammu & Kashmir',
    pincode: '182301',
    lat: 32.9915,
    lng: 74.9528,
    openTime: '05:00',
    closeTime: '22:00',
    darshanSlots: ['Daily darshan throughout day', 'Special Aarti: 05:00 & 20:00'],
    aartiTimings: ['Charan Paduka Aarti: 05:00', 'Darbar Aarti: 20:00'],
    festivalTimings: 'Extended during Navratri (October & April)',
    history: 'The Vaishno Devi shrine is located in the Trikuta Mountains within the Himalayas. The shrine is a cave temple dedicated to Goddess Vaishno Devi, one of the most revered Hindu goddesses. The trek to the shrine is 12-14 km from Katra base camp. It attracts over 8 million pilgrims annually. The three pindis (rock formations) represent the three forms of the goddess: Mahakali, Mahalakshmi, and Mahasaraswati.',
    festivals: ['Navratri (April & October)', 'Ashtami', 'Ram Navami', 'Diwali'],
    dressCode: 'Warm clothes required as the altitude is high. Comfortable trekking shoes mandatory.',
    facilities: ['Helicopter service', 'Palki (palanquin)', 'Pony service', 'Battery cars', 'Yatri Niwas accommodation', 'Medical posts', 'Cloak rooms'],
    contact: '+91-1991-232211',
    website: 'https://www.maavaishnodevi.org',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Vaishno-Devi-Temple.jpg/1200px-Vaishno-Devi-Temple.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Vaishno-Devi-Temple.jpg/1200px-Vaishno-Devi-Temple.jpg'],
    bestTimeToVisit: 'March to October. Avoid heavy snowfall in December-February. Navratri is very crowded.',
    howToReach: 'Nearest Airport: Jammu Airport (50 km). Nearest Railway: Katra Railway Station (3 km from base camp).',
    rating: 4.8,
    reviewCount: 950,
    isFeatured: true
  },
  {
    name: 'Shirdi Sai Baba Temple',
    deity: 'Sai Baba of Shirdi',
    state: 'Maharashtra',
    city: 'Shirdi',
    address: 'Shirdi, Ahmednagar District, Maharashtra',
    pincode: '423109',
    lat: 19.7647,
    lng: 74.4779,
    openTime: '04:00',
    closeTime: '23:00',
    darshanSlots: ['Morning: 04:00-11:00', 'Afternoon: 12:30-19:00', 'Evening: 19:00-22:00'],
    aartiTimings: ['Kakad Aarti: 04:30', 'Madhyana Aarti: 12:00', 'Dhoop Aarti: 18:00', 'Shej Aarti: 22:00'],
    festivalTimings: 'Extended hours during Guru Purnima and Ram Navami',
    history: 'Shirdi Sai Baba Temple is dedicated to Sai Baba, a spiritual master revered by both Hindus and Muslims. Sai Baba lived in Shirdi from around 1858 until his death in 1918. The main shrine houses the marble idol of Sai Baba. The temple receives approximately 25,000 to 40,000 pilgrims daily. The Samadhi Mandir is the holiest part where Sai Baba was buried.',
    festivals: ['Ram Navami', 'Guru Purnima', 'Vijayadasami (Sai Baba Mahasamadhi)'],
    dressCode: 'Modest, clean attire. Head covering for women. Remove footwear before entry.',
    facilities: ['Free Prasad (Bhandara)', 'Accommodation (Sai Ashram)', 'Online darshan booking', 'Locker', 'Wheelchair', 'ATM', 'Medical center'],
    contact: '+91-2423-258770',
    website: 'https://www.shrisaibabasansthan.org',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sai_Baba_of_Shirdi.jpg/800px-Sai_Baba_of_Shirdi.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sai_Baba_of_Shirdi.jpg/800px-Sai_Baba_of_Shirdi.jpg'],
    bestTimeToVisit: 'October to March. Weekdays for lesser crowds.',
    howToReach: 'Nearest Airport: Aurangabad Airport (120 km), Shirdi Airport (15 km). Nearest Railway: Sainagar Shirdi Station (5 km).',
    rating: 4.7,
    reviewCount: 820,
    isFeatured: false
  },
  {
    name: 'Jagannath Temple Puri',
    deity: 'Lord Jagannath (Form of Vishnu)',
    state: 'Odisha',
    city: 'Puri',
    address: 'Grand Road, Puri, Odisha',
    pincode: '752001',
    lat: 19.8044,
    lng: 85.8183,
    openTime: '05:00',
    closeTime: '23:00',
    darshanSlots: ['Mangala Alati: 05:00', 'Morning: 06:00-12:00', 'Evening: 16:00-21:00'],
    aartiTimings: ['Mangala Alati: 05:00', 'Mailam: 06:00', 'Bhoga Mandap: 08:00', 'Sandhya Alati: 20:00', 'Badasinghar: 23:00'],
    festivalTimings: 'Special schedules during Rath Yatra and Snana Purnima',
    history: 'The Jagannath Temple is a famous Hindu temple dedicated to Lord Jagannath, a form of Vishnu. The temple is part of the Char Dham pilgrimage. The main tower of the temple is 65 meters high. The temple is famous for the Rath Yatra (Chariot Festival) which is one of the largest religious gatherings in the world. The kitchen of the temple is one of the largest in the world and prepares mahaprasad for thousands of devotees daily.',
    festivals: ['Rath Yatra', 'Snana Purnima', 'Dola Yatra', 'Chandan Yatra', 'Navakalebara'],
    dressCode: 'Only Hindus are allowed inside. Traditional attire preferred. Non-Hindus can view from Lion\'s Gate.',
    facilities: ['Mahaprasad (cooked temple food)', 'Donation facilities', 'Nearby beach', 'Museum', 'Panda (priest) guide'],
    contact: '+91-6752-222002',
    website: 'https://www.jagannathpuri.com',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jagannath_Temple.jpg/1200px-Jagannath_Temple.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jagannath_Temple.jpg/1200px-Jagannath_Temple.jpg'],
    bestTimeToVisit: 'October to February. Rath Yatra (June/July) for the grand festival but very crowded.',
    howToReach: 'Nearest Airport: Bhubaneswar Airport (60 km). Nearest Railway: Puri Railway Station (2 km).',
    rating: 4.7,
    reviewCount: 740,
    isFeatured: false
  },
  {
    name: 'Brihadeeswarar Temple (Thanjavur)',
    deity: 'Lord Shiva (Brihadeeshvara)',
    state: 'Tamil Nadu',
    city: 'Thanjavur',
    address: 'Membalam Rd, Balaganapathy Nagar, Thanjavur, Tamil Nadu',
    pincode: '613001',
    lat: 10.7828,
    lng: 79.1318,
    openTime: '06:00',
    closeTime: '20:30',
    darshanSlots: ['Morning: 06:00-12:00', 'Evening: 16:00-20:30'],
    aartiTimings: ['Thiruvanandal: 06:30', 'Uchikalam: 12:00', 'Sayarakshai: 18:00'],
    festivalTimings: 'Grand celebrations during Maha Shivaratri',
    history: 'The Brihadeeswarar Temple, also known as Peruvudaiyar Kovil or Big Temple, was built by the Chola Emperor Rajaraja I between 1003 and 1010 AD. It is a UNESCO World Heritage Site and is one of the finest examples of Dravidian architecture. The tower (vimana) is 66 meters tall and the entire temple complex covers 240.79 metres (790 ft) by 121.92 metres (400 ft). The enormous Nandi (bull) carved from a single granite block weighs approximately 25 tonnes.',
    festivals: ['Maha Shivaratri', 'Karthigai Deepam', 'Navarathri', 'Aadi Pooram'],
    dressCode: 'Traditional attire preferred. Modest clothing required.',
    facilities: ['UNESCO heritage site', 'Archaeology museum', 'Photography (outer areas)', 'Guide service', 'Parking'],
    contact: '+91-4362-274821',
    website: 'https://www.tnhrce.gov.in',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Brihadeeswarar_temple_front.jpg/1200px-Brihadeeswarar_temple_front.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Brihadeeswarar_temple_front.jpg/1200px-Brihadeeswarar_temple_front.jpg'],
    bestTimeToVisit: 'October to March. Early morning for best photography.',
    howToReach: 'Nearest Airport: Tiruchirappalli Airport (55 km). Nearest Railway: Thanjavur Junction (2 km).',
    rating: 4.8,
    reviewCount: 560,
    isFeatured: false
  },
  {
    name: 'Siddhivinayak Temple',
    deity: 'Lord Ganesha (Siddhivinayak)',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: 'SK Bole Road, Prabhadevi, Mumbai, Maharashtra',
    pincode: '400028',
    lat: 19.0170,
    lng: 72.8300,
    openTime: '05:30',
    closeTime: '22:00',
    darshanSlots: ['General: 05:30-10:00', 'Mid-day: 12:00-15:00', 'Evening: 17:00-22:00'],
    aartiTimings: ['Kakad Aarti: 05:30', 'Madhyana Aarti: 12:00', 'Sandhya Aarti: 20:30', 'Shej Aarti: 21:30'],
    festivalTimings: 'Special arrangements during Ganesh Chaturthi',
    history: 'The Siddhivinayak Temple is one of the most visited and richest temples in Mumbai, dedicated to Lord Ganesh. The original temple was built in 1801 by Laxman Vithu and Deubai Patil. The central idol of Ganesha is unique — it is a swayambhu (self-manifested) idol with the trunk turned towards the right (which is rare and considered highly auspicious). The temple has undergone several expansions and the current structure is entirely new. It attracts many celebrities and devotees on Tuesdays.',
    festivals: ['Ganesh Chaturthi', 'Sankashti Chaturthi (every month)', 'Angarika Chaturthi (Tuesday special)'],
    dressCode: 'Decent attire. No shorts. Footwear must be removed.',
    facilities: ['VIP darshan', 'Online booking', 'Locker', 'Prasadam', 'Wheelchair access', 'CCTV security', 'ATM', 'Donation box'],
    contact: '+91-22-24376289',
    website: 'https://www.siddhivinayak.org',
    bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Siddhivinayak_Temple%2C_Prabhadevi%2C_Mumbai.jpg/1200px-Siddhivinayak_Temple%2C_Prabhadevi%2C_Mumbai.jpg',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Siddhivinayak_Temple%2C_Prabhadevi%2C_Mumbai.jpg/1200px-Siddhivinayak_Temple%2C_Prabhadevi%2C_Mumbai.jpg'],
    bestTimeToVisit: 'Weekdays for shorter queues. Ganesh Chaturthi for grand celebrations.',
    howToReach: 'Nearest Railway: Dadar Station (1.5 km) or Prabhadevi Station (0.5 km). Taxis and autos available.',
    rating: 4.6,
    reviewCount: 920,
    isFeatured: false
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🌱 Seeding database...');

    // Create default admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@temple.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      await User.create({
        name: 'Temple Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`✅ Admin created: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log('ℹ️  Admin already exists, skipping.');
    }

    // Clear dependent rows first because reviews references temples through a FK.
    await Review.destroy({ where: {} });
    await Temple.destroy({ where: {} });
    console.log('Cleared existing reviews and temples');

    for (const t of temples) {
      await Temple.create(t);
      console.log(`✅ Seeded: ${t.name}`);
    }

    console.log('\n🎉 Seeding complete! 10 temples added.');
    console.log(`\n🔑 Admin Login:\n   Email: ${adminEmail}\n   Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
