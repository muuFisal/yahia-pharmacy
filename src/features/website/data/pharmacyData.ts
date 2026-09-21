/**
 * Pharmacy Realistic Mock Data for Yahia Pharmacy (صيدلية يحيى)
 */

export interface PharmacyCategory {
  id: string;
  name: string;
  nameEn: string;
  itemCount: number;
  iconName: string;
  image: string;
  accentColor?: string;
  description?: string;
}

export interface PharmacyProduct {
  id: string | number;
  name: string;
  nameEn?: string;
  category: string;
  categoryEn?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  brand?: string;
  description?: string;
  descriptionEn?: string;
  badge?: string;
  // Medical & Pharmacy Specific Filter Fields
  dosageForm?: 'أقراص وكبسولات' | 'شراب وسوائل' | 'كريم ومرهم' | 'قطرات وبخاخ' | 'أجهزة ومستلزمات' | 'مكملات غذائية';
  requiresPrescription?: boolean; // true = يحتاج روشتة Rx, false = متاح بدون روشتة OTC
  targetGroup?: 'الجميع' | 'كبار' | 'أطفال' | 'رضع' | 'نساء';
  activeIngredient?: string;
}

export const PHARMACY_CATEGORIES: PharmacyCategory[] = [
  {
    id: 'skincare',
    name: 'العناية بالبشرة',
    nameEn: 'Skin Care',
    itemCount: 84,
    iconName: 'spa',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    description: 'مرطبات، غسول، واقيات شمس وسيروم'
  },
  {
    id: 'haircare',
    name: 'العناية بالشعر',
    nameEn: 'Hair Care',
    itemCount: 62,
    iconName: 'face_retouching_natural',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80',
    description: 'شامبو، زيوت، بلسم وعلاجات تساقط الشعر'
  },
  {
    id: 'vitamins',
    name: 'الفيتامينات والمكملات',
    nameEn: 'Vitamins & Supplements',
    itemCount: 110,
    iconName: 'medication',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    description: 'فيتامين سي، أوميجا 3، كالسيوم وزنك'
  },
  {
    id: 'medicines',
    name: 'الأدوية والعلاجات',
    nameEn: 'Medicines',
    itemCount: 320,
    iconName: 'vaccines',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80',
    description: 'مسكنات، أدوية البرد، الجهاز الهضمي والقلب'
  },
  {
    id: 'baby-care',
    name: 'العناية بالطفل والأم',
    nameEn: 'Baby & Mom Care',
    itemCount: 75,
    iconName: 'child_care',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
    description: 'حليب أطفال، حفاضات، عناية ببشرة الرضع'
  },
  {
    id: 'medical-devices',
    name: 'الأجهزة والمستلزمات الطبية',
    nameEn: 'Medical Devices',
    itemCount: 45,
    iconName: 'monitor_heart',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    description: 'أجهزة قياس الضغط والسكر، موازين حرارة وكمامات'
  },
  {
    id: 'oral-care',
    name: 'العناية بالفم والأسنان',
    nameEn: 'Oral Care',
    itemCount: 38,
    iconName: 'sentiment_very_satisfied',
    image: 'https://images.unsplash.com/photo-1559591937-e102234c11b6?auto=format&fit=crop&w=400&q=80',
    description: 'معجون أسنان، فرش كهربائية وغسول فم'
  },
  {
    id: 'first-aid',
    name: 'الإسعافات الأولية',
    nameEn: 'First Aid',
    itemCount: 29,
    iconName: 'healing',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=400&q=80',
    description: 'شاش، مطهرات، ضمادات، ولوازم الطوارئ'
  }
];

export const PHARMACY_OFFERS: PharmacyProduct[] = [
  {
    id: 'off-1',
    name: 'سيروم فيتامين سي لإنارة وتوحيد لون البشرة 30مل',
    nameEn: 'Vitamin C Serum for Radiance & Even Skin Tone 30ml',
    category: 'العناية بالبشرة',
    brand: 'La Roche-Posay',
    price: 340,
    originalPrice: 480,
    discountPercentage: 30,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    badge: 'عرض خاص',
    description: 'سيروم نقي وغني بمضادات الأكسدة لنضارة وحيوية البشرة وحمايتها من التصبغات.',
    descriptionEn: 'Pure serum enriched with antioxidants for radiant, supple skin with anti-dark spot protection.',
    dosageForm: 'كريم ومرهم',
    requiresPrescription: false,
    targetGroup: 'الجميع',
    activeIngredient: 'فيتامين سي نقي 10% + حمض الهيالورونيك'
  },
  {
    id: 'off-2',
    name: 'جهاز قياس ضغط الدم الديجيتال التلقائي للذراع',
    nameEn: 'Automatic Digital Upper Arm Blood Pressure Monitor',
    category: 'الأجهزة والمستلزمات الطبية',
    brand: 'Omron',
    price: 950,
    originalPrice: 1250,
    discountPercentage: 24,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    badge: 'توفير سوبر',
    description: 'قياس دقيق وسريع مع شاشة عرض واضحة وذاكرة تسع 60 قراءة لشخصين.',
    descriptionEn: 'Accurate and fast readings with clear display and 60-reading memory for 2 users.',
    dosageForm: 'أجهزة ومستلزمات',
    requiresPrescription: false,
    targetGroup: 'كبار'
  },
  {
    id: 'off-3',
    name: 'كبسولات أوميجا 3 المركزة مع فيتامين د3 (60 كبسولة)',
    nameEn: 'Concentrated Omega-3 with Vitamin D3 (60 Softgels)',
    category: 'الفيتامينات والمكملات',
    brand: 'Nature Made',
    price: 260,
    originalPrice: 390,
    discountPercentage: 35,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewCount: 215,
    inStock: true,
    badge: 'أعلى تقييم',
    description: 'لدعم صحة القلب والدماغ والمناعة خالية من الطعم السمكي وسهلة البلع.',
    descriptionEn: 'Supports heart, brain, and immune health. Odorless and easy to swallow.',
    dosageForm: 'مكملات غذائية',
    requiresPrescription: false,
    targetGroup: 'كبار',
    activeIngredient: 'زيت السمك النقي 1200 مجم + أوميجا 3'
  },
  {
    id: 'off-4',
    name: 'مجموعة العناية الفائقة بشعر الأطفال شامبو وزيت ترطيب',
    nameEn: 'Baby Complete Hair Care Set: Shampoo & Nourishing Oil',
    category: 'العناية بالطفل والأم',
    brand: 'Mustela',
    price: 410,
    originalPrice: 550,
    discountPercentage: 25,
    image: 'https://images.unsplash.com/photo-1556228722-d0b5d921e4ea?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    badge: 'مجموعة توفيرية',
    description: 'تركيبة طبيعية 98% لطيفة جداً لا تسبب الدموع ومناسبة لحديثي الولادة.',
    descriptionEn: '98% natural tear-free gentle formula, completely safe for newborns.',
    dosageForm: 'شراب وسوائل',
    requiresPrescription: false,
    targetGroup: 'رضع',
    activeIngredient: 'مستخلص الأفوكادو الطبيعي'
  },
  {
    id: 'off-5',
    name: 'واقي شمس دراي تاتش SPF 50+ للبشرة الدهنية والمختلطة',
    nameEn: 'Dry Touch SPF 50+ Sunscreen for Oily & Combination Skin',
    category: 'العناية بالبشرة',
    brand: 'Vichy',
    price: 395,
    originalPrice: 520,
    discountPercentage: 24,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 190,
    inStock: true,
    badge: 'الأكثر طلباً',
    description: 'حماية فائقة من أشعة الشمس بلمسة مطفية تدوم طوال اليوم بدون لمعان.',
    dosageForm: 'كريم ومرهم',
    requiresPrescription: false,
    targetGroup: 'الجميع'
  },
  {
    id: 'off-6',
    name: 'فرشاة أسنان صوتية ذكية قابلة لإعادة الشحن + 3 رؤوس',
    category: 'العناية بالفم والأسنان',
    brand: 'Oral-B',
    price: 680,
    originalPrice: 990,
    discountPercentage: 31,
    image: 'https://images.unsplash.com/photo-1559591937-e102234c11b6?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    badge: 'خصم مميز',
    description: 'تنظيف عميق يزيل البلاك بنسبة 100% أكثر مقارنة بالفرشاة اليدوية.',
    dosageForm: 'أجهزة ومستلزمات',
    requiresPrescription: false,
    targetGroup: 'الجميع'
  }
];

export const PHARMACY_REGULAR_PRODUCTS: PharmacyProduct[] = [
  {
    id: 'prod-1',
    name: 'كريم مرطب ومهدئ للبشرة الجافة والحساسة 200مل',
    nameEn: 'Moisturizing & Soothing Cream for Dry Skin 200ml',
    category: 'العناية بالبشرة',
    brand: 'CeraVe',
    price: 310,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 310,
    inStock: true,
    isBestSeller: true,
    description: 'يحتوي على 3 سيراميدات أساسية وحمض الهيالورونيك لحماية حاجز البشرة.',
    descriptionEn: 'Formulated with 3 essential ceramides and hyaluronic acid to restore skin barrier.',
    dosageForm: 'كريم ومرهم',
    requiresPrescription: false,
    targetGroup: 'الجميع',
    activeIngredient: 'سيراميد 1, 3, 6-II + هيالورونيك'
  },
  {
    id: 'prod-2',
    name: 'أقراص زنك 50 مجم لتعزيز صحة الجهاز المناعي والبشرة',
    nameEn: 'Zinc 50mg Tablets for Immune & Skin Support (100 Tablets)',
    category: 'الفيتامينات والمكملات',
    brand: 'Solgar',
    price: 185,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    isBestSeller: false,
    description: 'مضاد أكسدة قوي يدعم مناعة الجسم ويساعد في تجديد خلايا البشرة والشعر.',
    descriptionEn: 'High-potency antioxidant supporting daily immunity and healthy cell renewal.',
    dosageForm: 'أقراص وكبسولات',
    requiresPrescription: false,
    targetGroup: 'كبار',
    activeIngredient: 'زنك جلوكونات 50 مجم'
  },
  {
    id: 'prod-3',
    name: 'شامبو مكثف ومقوي للشعر الخفيف والمتساقط 400مل',
    nameEn: 'Fortifying & Thickening Shampoo for Thinning Hair 400ml',
    category: 'العناية بالشعر',
    brand: 'Ducray',
    price: 290,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    isBestSeller: true,
    description: 'يقوي بصيلات الشعر من الجذور ويمنح كثافة ولمعاناً طبيعياً.',
    descriptionEn: 'Strengthens hair from the root, providing natural volume and healthy shine.',
    dosageForm: 'شراب وسوائل',
    requiresPrescription: false,
    targetGroup: 'الجميع',
    activeIngredient: 'مونولورين + فيتامين B6'
  },
  {
    id: 'prod-4',
    name: 'مقياس حرارة رقمي عن طريق الجبهة والأذن بدون تلامس',
    nameEn: 'Non-Contact Infrared Forehead & Ear Digital Thermometer',
    category: 'الأجهزة والمستلزمات الطبية',
    brand: 'Braun',
    price: 490,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 140,
    inStock: true,
    isBestSeller: false,
    description: 'قراءة دقيقة في ثانية واحدة مع إضاءة إنذار بالألوان حسب درجة الحرارة.',
    descriptionEn: 'Ultra-fast 1-second accurate readings with color-coded fever alert backlight.',
    dosageForm: 'أجهزة ومستلزمات',
    requiresPrescription: false,
    targetGroup: 'الجميع'
  },
  {
    id: 'prod-5',
    name: 'حفاضات أطفال بريميوم حماية فائقة للبشرة الحساسة (عبوة 64)',
    nameEn: 'Premium Sensitive Baby Diapers (Pack of 64)',
    category: 'العناية بالطفل والأم',
    brand: 'Pampers',
    price: 360,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 420,
    inStock: true,
    isBestSeller: true,
    description: 'نعومة فائقة مثل القطن مع حماية من التسرب تدوم حتى 12 ساعة.',
    descriptionEn: 'Feather-soft cotton feel with up to 12 hours of total leak protection.',
    dosageForm: 'أجهزة ومستلزمات',
    requiresPrescription: false,
    targetGroup: 'رضع'
  },
  {
    id: 'prod-6',
    name: 'غسول مطهر ومعقم للفم برائحة النعناع المنعش 500مل',
    nameEn: 'Antiseptic Mouthwash Fresh Mint Flavor 500ml',
    category: 'العناية بالفم والأسنان',
    brand: 'Listerine',
    price: 95,
    image: 'https://images.unsplash.com/photo-1559591937-e102234c11b6?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviewCount: 76,
    inStock: true,
    isBestSeller: false,
    description: 'يقضي على 99% من البكتيريا المسببة لرائحة الفم الكريهة ويحمي اللثة.',
    descriptionEn: 'Eliminates 99% of bacteria causing bad breath while protecting gum health.',
    dosageForm: 'شراب وسوائل',
    requiresPrescription: false,
    targetGroup: 'الجميع',
    activeIngredient: 'زيوت عطرية مطهرة + فلورايد'
  },
  {
    id: 'prod-7',
    name: 'فيتامين د3 نقط للأطفال 400 وحدة دولية 15مل',
    nameEn: 'Vitamin D3 Oral Drops for Infants & Children 400 IU 15ml',
    category: 'الفيتامينات والمكملات',
    brand: 'Vi-Drop',
    price: 45,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewCount: 380,
    inStock: true,
    isBestSeller: true,
    description: 'الجرعة اليومية الموصى بها للأطفال والرضع لدعم نمو العظام والأسنان.',
    descriptionEn: 'Pediatrician recommended daily dose for healthy bones and dental development.',
    dosageForm: 'قطرات وبخاخ',
    requiresPrescription: false,
    targetGroup: 'رضع',
    activeIngredient: 'كوليكالسيفيرول (فيتامين د3)'
  },
  {
    id: 'prod-8',
    name: 'حقيبة إسعافات أولية متكاملة للمنزل والسيارة (42 قطعة)',
    nameEn: 'Comprehensive Home & Travel First Aid Kit (42 Pieces)',
    category: 'الإسعافات الأولية',
    brand: 'First Care',
    price: 220,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 52,
    inStock: true,
    isBestSeller: false,
    description: 'تحتوي على شاش، مطهر، مقص طبي، ضمادات ولاصقات جروح للطوارئ.',
    descriptionEn: 'Includes sterile gauze, antiseptic spray, trauma shears, bandages and adhesive tapes.',
    dosageForm: 'أجهزة ومستلزمات',
    requiresPrescription: false,
    targetGroup: 'الجميع'
  },
  {
    id: 'prod-9',
    name: 'أقراص مسكن وخافض للحرارة سريع المفعول 500 مجم (24 قرص)',
    nameEn: 'Fast-Acting Pain Relief & Antipyretic Tablets 500mg (24s)',
    category: 'الأدوية والعلاجات',
    brand: 'Panadol Extra',
    price: 52,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 512,
    inStock: true,
    isBestSeller: true,
    description: 'تسكين فعال للصداع وآلام الجسم والأسنان وخافض للحرارة لطيف على المعدة.',
    descriptionEn: 'Rapid relief from headaches, dental pain, body aches and fever; stomach gentle.',
    dosageForm: 'أقراص وكبسولات',
    requiresPrescription: false,
    targetGroup: 'كبار',
    activeIngredient: 'باراسيتامول 500 مجم + كافيين 65 مجم'
  },
  {
    id: 'prod-10',
    name: 'بخاخ محلول ملحي معقم للأنف وإزالة الاحتقان للأطفال والكبار',
    nameEn: 'Sterile Sea Water Decongestant Nasal Spray 100ml',
    category: 'الأدوية والعلاجات',
    brand: 'Physiomer',
    price: 135,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewCount: 165,
    inStock: true,
    isBestSeller: true,
    description: 'مياه بحر طبيعية 100% لتنظيف الجيوب الأنفية وتسهيل التنفس طبيعياً.',
    descriptionEn: '100% natural isotonic seawater to cleanse sinuses and ease breathing.',
    dosageForm: 'قطرات وبخاخ',
    requiresPrescription: false,
    targetGroup: 'الجميع',
    activeIngredient: 'محلول ماء بحر نقي متساوي التوتر'
  },
  {
    id: 'prod-11',
    name: 'شراب مهدئ للسعال وطارد للبلغم بخلاصة أوراق اللبلاب 100مل',
    nameEn: 'Ivy Leaf Extract Soothing Cough & Mucus Relief Syrup 100ml',
    category: 'الأدوية والعلاجات',
    brand: 'Prospan',
    price: 78,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 198,
    inStock: true,
    isBestSeller: false,
    description: 'مستخلص طبيعي بدون سكر وبدون كحول لتهدئة الشعب الهوائية وتوسيع التنفس.',
    descriptionEn: 'Natural herbal formula, alcohol and sugar-free, to relieve chest congestion.',
    dosageForm: 'شراب وسوائل',
    requiresPrescription: false,
    targetGroup: 'أطفال',
    activeIngredient: 'خلاصة أوراق اللبلاب المجففة'
  },
  {
    id: 'prod-12',
    name: 'مرهم مضاد حيوي واسع المجال وسريع الالتئام للجروح والحروق 30جم',
    nameEn: 'Broad-Spectrum Antibiotic Ointment for Wounds & Burns 30g',
    category: 'الأدوية والعلاجات',
    brand: 'Fucidin',
    price: 48,
    image: 'https://images.unsplash.com/photo-1608248597358-75c179c3f191?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 280,
    inStock: true,
    isBestSeller: true,
    description: 'يعالج الالتهابات الجلدية البكتيرية ويمنع العدوى ويسرع التئام الجلد.',
    descriptionEn: 'Treats bacterial skin infections, prevents contamination, and promotes healing.',
    dosageForm: 'كريم ومرهم',
    requiresPrescription: true,
    targetGroup: 'الجميع',
    activeIngredient: 'حمض الفوسيديك 2%'
  }
];

export const PHARMACY_ABOUT_DATA = {
  title: 'صيدلية يحيى .. رعاية صحية موثوقة في خدمتك دائماً',
  titleEn: 'Yahia Pharmacy .. Trusted Healthcare Always at Your Service',
  subtitle: 'نحن هنا لنقدم لك ولعائلتك أفضل خدمات الرعاية الصحية والصيدلانية بأعلى معايير الجودة والسرعة.',
  subtitleEn: 'We provide you and your family with premier pharmaceutical care meeting the highest safety standards.',
  image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80',
  description: 'تأسست صيدلية يحيى لتكون وجهتكم الأولى لكل ما يخص الصحة والجمال. نحرص على توفير كافة الأدوية والمستلزمات الطبية الأصلية 100% ومنتجات العناية بالبشرة والشعر من أفضل الماركات العالمية، مع فريق صيدلي متخصص مستعد للإجابة على جميع استفساراتكم الطبية على مدار الساعة.',
  descriptionEn: 'Yahia Pharmacy is your premier destination for healthcare and wellness. We provide 100% authentic medications, medical supplies, and international personal care products, accompanied by 24/7 licensed pharmacist consultations.',
  stats: [
    { label: 'منتج طبي وتجميلي أصلي', labelEn: 'Authentic Products', value: '+10,000' },
    { label: 'عميل سعيد وموثوق', labelEn: 'Satisfied Clients', value: '+25,000' },
    { label: 'سنة خبرة وتميز صيدلاني', labelEn: 'Years Experience', value: '+12' },
    { label: 'خدمة توصيل فورية', labelEn: 'Instant Delivery', value: '24/7' }
  ],
  features: [
    {
      title: 'أدوية ومستحضرات أصلية 100%',
      titleEn: '100% Authentic Products',
      desc: 'جميع منتجاتنا مرخصة ومخزنة وفق أحدث معايير السلامة والجودة العالمية.',
      descEn: 'All products are certified and stored under strict international cold-chain standards.',
      icon: 'verified'
    },
    {
      title: 'توصيل سريع حتى باب المنزل',
      titleEn: 'Fast Doorstep Delivery',
      desc: 'فريق توصيل مجهز لحفظ الأدوية ونقلها إليك في أسرع وقت وبأعلى درجات الأمان.',
      descEn: 'Specialized delivery team ensuring temperature-safe delivery directly to your door.',
      icon: 'electric_moped'
    },
    {
      title: 'استشارة صيدلانية مجانية',
      titleEn: 'Free Clinical Consultation',
      desc: 'صيادلة معتمدون جاهزون لتقديم النصح والإرشادات الطبية عبر الواتساب مباشرة.',
      descEn: 'Licensed pharmacists available 24/7 to provide expert medical advice via WhatsApp.',
      icon: 'health_and_safety'
    },
    {
      title: 'طلب الروشتة بضغطة زر',
      titleEn: 'One-Click Prescription Order',
      desc: 'صور روشتتك وأرسلها فوراً عبر الواتساب وسنقوم بتجهيزها وإرسالها فوراً.',
      descEn: 'Snap your prescription and send it on WhatsApp for instant preparation and delivery.',
      icon: 'document_scanner'
    }
  ]
};
