export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Appointment', href: '/appointment' },
  { name: 'Services', href: '/services' },
  { 
    name: 'Visa Applications', 
    href: '/visa',
    dropdown: [
      { name: 'All Visa Types', href: '/visa' },
      { name: 'Student Visa', href: '/visa/student' },
      { name: 'Work Visa', href: '/visa/work' },
      { name: 'Visitor Visa', href: '/visa/visitor' },
    ]
  },
  { name: 'Israel Pilgrimage', href: '/israel-pilgrimage-2025' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'About', href: '/about' },
];

export const services = [
  {
    id: 1,
    title: 'Student Visa Application',
    description: 'Comprehensive assistance for student visa applications to study abroad',
    href: '/visa/student',
    icon: 'graduation-cap'
  },
  {
    id: 2,
    title: 'Visitor Visa Application',
    description: 'Expert guidance for tourist and visitor visa applications',
    href: '/visa/visitor',
    icon: 'passport'
  },
  {
    id: 3,
    title: 'Work Permit Application',
    description: 'Professional support for work permit applications and documentation',
    href: '/visa/work',
    icon: 'briefcase'
  },
  {
    id: 4,
    title: 'Express Entry for Canada',
    description: 'Complete Express Entry program guidance for Canadian immigration',
    href: '/services/express-entry',
    icon: 'map-pin'
  },
  {
    id: 5,
    title: 'University Admission Guidance',
    description: 'Personalized assistance for university applications and admissions',
    href: '/services/admission',
    icon: 'book-open'
  },
  {
    id: 6,
    title: 'Air Ticketing Services',
    description: 'Affordable flight bookings and travel arrangements worldwide',
    href: '/services/air-ticketing',
    icon: 'plane'
  },
  {
    id: 7,
    title: 'Document Preparation',
    description: 'Professional help with visa and immigration document preparation',
    href: '/services/document-preparation',
    icon: 'file-text'
  },
  {
    id: 8,
    title: 'Immigration Consultation',
    description: 'Expert immigration consultation and assessment services',
    href: '/services/immigration-consultation',
    icon: 'users'
  },
  {
    id: 9,
    title: 'Language Test Preparation',
    description: 'Guidance for IELTS, TOEFL, and other language proficiency tests',
    href: '/services/language-tests',
    icon: 'languages'
  },
  {
    id: 10,
    title: 'Scholarship Applications',
    description: 'Assistance with finding and applying for international scholarships',
    href: '/services/scholarships',
    icon: 'award'
  }
];

export const stats = [
  { number: '4,070+', label: 'Students assisted' },
  { number: '283+', label: 'Universities partners around the world' },
  { number: '40+', label: 'Countries' }
];

export const whyChooseUs = [
  {
    id: 1,
    title: 'Seamless VISA Support',
    description: 'Our team provides comprehensive assistance to ensure a smooth and successful VISA application process.',
    icon: 'visa'
  },
  {
    id: 2,
    title: 'Convenient Air Ticket Booking',
    description: 'We handle travel arrangements to make your journey stress-free and efficient.',
    icon: 'ticket'
  },
  {
    id: 3,
    title: 'Consultation & Assessment',
    description: 'We offer personalized consultations to assess each student\'s academic strengths and guide them toward the best opportunities.',
    icon: 'consultation'
  },
  {
    id: 4,
    title: 'Global Reach',
    description: 'All over Europe rulers and city governments began to create universities to satisfy a European.',
    icon: 'global'
  },
  {
    id: 5,
    title: 'Proven Success',
    description: 'With a track record of successful placements, we guarantee top-notch service every step of the way.',
    icon: 'success'
  },
  {
    id: 6,
    title: 'Expert Admission Guidance',
    description: 'We help students secure placements at top global institutions tailored to their goals.',
    icon: 'admission'
  }
];

export const testimonials = [
  {
    id: 1,
    country: 'Germany',
    name: 'Lisa K.',
    image: '',
    testimonial: 'Cardx Academia and Travel Tours helped me secure admission to a university in Germany and assisted with booking my Germany visa appointment. Their professionalism and attention to detail made the entire process easy and stress-free. I am incredibly thankful for their support and highly recommend their services to anyone seeking help with international education and visas',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 2,
    country: 'Canada',
    name: 'Salomon Niyitanga',
    image: '', // No profile picture
    testimonial: 'I am beyond grateful to Cardx Academia and Travel Tours for helping me secure my Canadian student visa to study at Algonquin College and book my flight from Rwanda to Ottawa. Their expertise made the entire process smooth and stress free. From guiding me through the visa application to finding the best flight deal, their support was exceptional. I highly recommend their services to anyone looking for a seamless journey to study abroad.',
    type: 'video',
    videoUrl: '/videos/salomon.mp4', // Local video file
    thumbnail: '',
    instagramEmbed: false
  },
  {
    id: 3,
    country: 'Canada',
    name: 'Olivier Niyiduhaye',
    image: '', // No profile picture
    testimonial: 'I am deeply thankful to Cardx Academia and Travel Tours for their outstanding support throughout my visa application process. With their guidance, I successfully secured my Canadian student visa and am now ready to begin my studies in Canada. Their team was incredibly helpful — from preparing my documents to following up with IRCC and ensuring every step went smoothly.',
    type: 'video',
    videoUrl: '/videos/Olivier.mp4', // Local video file
    thumbnail: '',
    instagramEmbed: false
  },
  {
    id: 4,
    country: 'Israel',
    name: 'Christine Twambazimana',
    image: '', // No profile picture
    testimonial: 'Thanks to Cardx Academia and Travel Tours, I secured full scholarship to Reichman University in Israel and successfully obtained my student visa. Their guidance throughout the scholarship application and visa process was invaluable. I felt supported every step of the way, and I couldn\'t have done it without their expert assistance. I highly recommend them to anyone pursuing international education',
    type: 'video',
    videoUrl: '/videos/Christine.mp4', // Local video file
    thumbnail: '',
    instagramEmbed: false,
    scholarship: true
  },
  {
    id: 5,
    country: 'Student Visa Success',
    name: 'Theogene',
    image: '', // No profile picture
    testimonial: 'We are proud to announce another remarkable success from Cardx Academia. Our client, Theogene, has officially secured his student visa to pursue his higher education abroad. This milestone is a reflection of his commitment and our team\'s dedication to guiding students through every step of their study-abroad journey — from admissions and visa processing to pre-departure preparation. With our support, Theogene also received a scholarship to help fund his educational journey, making his dream of studying abroad a reality.',
    type: 'video',
    videoUrl: '/videos/Theogene.mp4', // Local video file
    thumbnail: '', // Will use video poster
    scholarship: true, // Indicates they received a scholarship
    instagramEmbed: false // Using local video file
  },
  {
    id: 6,
    country: 'Israel',
    name: 'Mukamisha',
    image: '',
    testimonial: 'I am incredibly grateful to Cardx Academia and Travel Tours for their exceptional support throughout my journey. With their guidance and expertise, I successfully secured a master scholarship to Israel, obtained my student visa, and received admission to my chosen university. Their team provided comprehensive assistance every step of the way, from scholarship applications to visa processing. I couldn\'t have achieved this without their professional support and dedication. I highly recommend Cardx Academia to anyone pursuing higher education opportunities abroad.',
    type: 'video',
    videoUrl: '/videos/Mukamisha.mp4',
    thumbnail: '',
    instagramEmbed: false,
    scholarship: true
  },
  {
    id: 7,
    country: 'USA',
    name: 'Jean Paul Uwimana',
    image: '',
    testimonial: 'Cardx Academia made my dream of studying in the United States a reality. They helped me secure admission to a top university and guided me through the entire visa process. Their team was always available to answer my questions and provided excellent support throughout. I am now pursuing my master\'s degree in Computer Science thanks to their expertise.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 8,
    country: 'Canada',
    name: 'Marie Claire Mukamana',
    image: '',
    testimonial: 'I am extremely grateful to Cardx Academia for helping me obtain my Canadian student visa. The process seemed overwhelming at first, but their team broke it down into manageable steps and supported me every step of the way. They also helped me find affordable flights and prepare all necessary documents. Highly recommended!',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 9,
    country: 'Germany',
    name: 'Emmanuel Nkurunziza',
    image: '',
    testimonial: 'Thanks to Cardx Academia, I successfully secured admission to a German university and obtained my student visa. Their knowledge of the German education system and visa requirements was impressive. They made what seemed impossible, possible. I am now studying engineering in Berlin and couldn\'t be happier.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 10,
    country: 'France',
    name: 'Aline Uwase',
    image: '',
    testimonial: 'Cardx Academia helped me navigate the complex French visa application process. Their attention to detail and thorough document preparation ensured my application was successful. They also assisted with booking my flight and provided valuable pre-departure guidance. I am now studying in Paris and loving every moment.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 11,
    country: 'UK',
    name: 'David Nsengimana',
    image: '',
    testimonial: 'I attended an international conference in London thanks to Cardx Academia. They handled my UK visa application and travel arrangements seamlessly. Their professionalism and efficiency made the entire process stress-free. I was able to focus on my conference presentation while they took care of all the logistics.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 12,
    country: 'Netherlands',
    name: 'Grace Ingabire',
    image: '',
    testimonial: 'Cardx Academia made my study abroad journey to the Netherlands smooth and successful. They helped me secure admission, obtain my student visa, and even found me affordable accommodation options. Their team goes above and beyond to ensure their clients succeed. I highly recommend their services.',
    type: 'text',
    videoUrl: null,
    thumbnail: null,
    scholarship: true
  },
  {
    id: 13,
    country: 'Sweden',
    name: 'Patrick Habimana',
    image: '',
    testimonial: 'I am currently studying in Sweden thanks to Cardx Academia. They guided me through the entire application process, helped me secure a scholarship, and assisted with my visa application. Their expertise in European education systems is unmatched. I am grateful for their support and would recommend them to anyone.',
    type: 'text',
    videoUrl: null,
    thumbnail: null,
    scholarship: true
  },
  {
    id: 14,
    country: 'Belgium',
    name: 'Sarah Mutoni',
    image: '',
    testimonial: 'Cardx Academia helped me attend a research conference in Brussels. They handled my Belgian visa application efficiently and provided excellent travel support. Their knowledge of European visa requirements saved me time and stress. I was able to present my research successfully thanks to their assistance.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 15,
    country: 'USA',
    name: 'James Mwiza',
    image: '',
    testimonial: 'I successfully obtained my US student visa with the help of Cardx Academia. Their team was professional, responsive, and knowledgeable about the F-1 visa process. They helped me prepare all documents, schedule my interview, and even provided interview preparation tips. I am now studying in New York.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 16,
    country: 'Canada',
    name: 'Ange Mukamana',
    image: '',
    testimonial: 'Cardx Academia made my Canadian study permit application process incredibly smooth. They provided step-by-step guidance, helped me prepare all required documents, and followed up with IRCC on my behalf. Their support was invaluable, and I am now pursuing my studies in Toronto. Thank you for making my dream come true!',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 17,
    country: 'Germany',
    name: 'Eric Niyonsenga',
    image: '',
    testimonial: 'I attended a tech conference in Berlin with the assistance of Cardx Academia. They handled my German visa application and travel arrangements professionally. Their attention to detail and timely communication made the process effortless. I was able to network and learn from industry leaders thanks to their support.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 18,
    country: 'Switzerland',
    name: 'Diane Uwimana',
    image: '',
    testimonial: 'Cardx Academia helped me secure admission to a Swiss university and obtain my student visa. The Swiss visa process can be complex, but their team navigated it expertly. They also helped me understand the cost of living and provided valuable tips for student life in Switzerland. I am grateful for their guidance.',
    type: 'text',
    videoUrl: null,
    thumbnail: null,
    scholarship: true
  },
  {
    id: 19,
    country: 'Norway',
    name: 'Fabrice Nkurunziza',
    image: '',
    testimonial: 'I am studying in Norway thanks to Cardx Academia. They helped me secure a scholarship, obtain my residence permit, and prepare for my journey. Their knowledge of Nordic education systems and visa requirements is excellent. The entire process was smooth, and I am now pursuing my master\'s degree in Oslo.',
    type: 'text',
    videoUrl: null,
    thumbnail: null,
    scholarship: true
  },
  {
    id: 20,
    country: 'Italy',
    name: 'Claudine Mukamana',
    image: '',
    testimonial: 'Cardx Academia assisted me with my Italian student visa application. They were patient, thorough, and always available to answer my questions. They helped me prepare all documents in Italian and English, which was crucial for my application. I am now studying art history in Florence and loving it!',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 21,
    country: 'USA',
    name: 'Robert Nkurunziza',
    image: '',
    testimonial: 'I attended a business conference in San Francisco with Cardx Academia\'s help. They handled my US visitor visa application and travel arrangements efficiently. Their team provided excellent support throughout the process, and I was able to attend the conference without any issues. Highly professional service!',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 22,
    country: 'Denmark',
    name: 'Esther Uwamahoro',
    image: '',
    testimonial: 'Cardx Academia made my study journey to Denmark possible. They helped me secure admission, obtain my residence permit, and provided valuable guidance on living in Denmark. Their expertise in Nordic countries is impressive. I am now studying sustainable development in Copenhagen and couldn\'t be happier.',
    type: 'text',
    videoUrl: null,
    thumbnail: null,
    scholarship: true
  },
  {
    id: 23,
    country: 'Spain',
    name: 'Alexis Niyonshuti',
    image: '',
    testimonial: 'I successfully obtained my Spanish student visa with Cardx Academia\'s assistance. They helped me navigate the Spanish visa requirements and prepared all necessary documents. They also provided language learning resources and cultural tips. I am now studying in Barcelona and enjoying the experience.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 24,
    country: 'Canada',
    name: 'Rachel Mukamana',
    image: '',
    testimonial: 'Cardx Academia helped me secure my Canadian work permit and assisted with my Express Entry application. Their knowledge of Canadian immigration policies is excellent. They provided personalized guidance and ensured all my documents were properly prepared. I am now working in Vancouver and grateful for their support.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 25,
    country: 'Finland',
    name: 'Daniel Nkurunziza',
    image: '',
    testimonial: 'I attended a research conference in Helsinki thanks to Cardx Academia. They handled my Finnish visa application and travel arrangements professionally. Their attention to detail and timely communication made the process smooth. I was able to present my research and network with international scholars.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 26,
    country: 'USA',
    name: 'Violette Uwimana',
    image: '',
    testimonial: 'Cardx Academia helped me secure admission to a US university and obtain my F-1 visa. Their team was knowledgeable, supportive, and always responsive. They guided me through every step, from university selection to visa interview preparation. I am now studying public health in Boston.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 27,
    country: 'Austria',
    name: 'Innocent Nsengimana',
    image: '',
    testimonial: 'I am studying in Austria thanks to Cardx Academia. They helped me secure admission, obtain my residence permit, and provided valuable guidance on Austrian education system. Their expertise in European countries is impressive. The entire process was smooth, and I am now pursuing my PhD in Vienna.',
    type: 'text',
    videoUrl: null,
    thumbnail: null,
    scholarship: true
  },
  {
    id: 28,
    country: 'Germany',
    name: 'Josiane Mukamana',
    image: '',
    testimonial: 'Cardx Academia assisted me with my German student visa and helped me secure a scholarship. Their team was professional, thorough, and always available. They made the complex German visa process manageable. I am now studying engineering in Munich and grateful for their excellent support.',
    type: 'text',
    videoUrl: null,
    thumbnail: null,
    scholarship: true
  },
  {
    id: 29,
    country: 'Portugal',
    name: 'Samuel Nkurunziza',
    image: '',
    testimonial: 'I successfully obtained my Portuguese student visa with Cardx Academia\'s help. They guided me through the application process and helped me prepare all required documents. Their knowledge of European visa requirements is excellent. I am now studying in Lisbon and enjoying my academic journey.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  },
  {
    id: 30,
    country: 'USA',
    name: 'Chantal Uwamahoro',
    image: '',
    testimonial: 'Cardx Academia made my US study journey possible. They helped me secure admission to a top university, obtain my student visa, and provided excellent pre-departure support. Their team goes above and beyond to ensure success. I am now studying business administration in Chicago.',
    type: 'text',
    videoUrl: null,
    thumbnail: null
  }
];

export const contactInfo = {
  email: 'info@cardxacademia.com',
  phone: '+250788603451',
  address: '1st Floor, Door F1B-013D, Town Center Building (TCB), Kigali City.'
};

export const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Appointment', href: '/appointment' },
  { name: 'Services', href: '/services' },
  { name: 'Visa Applications', href: '/visa' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'About', href: '/about' }
];
