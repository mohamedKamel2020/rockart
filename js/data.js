import { withBase } from './base.js';

const asset = withBase;

// Single source of truth for the Lock Stone block size (sources conflict: 45 / 45.5 / 46 x 31).
// NOMINAL size, shown with a "per approved shop drawings, +/-1 cm" note. One-line change later.
export const LOCK_STONE_BLOCK_SIZE = {
  value: '20 × 30 × 45 cm',
  compact: '20×30×45 cm',
  note: {
    en: 'H × D × L, per approved shop drawings, ±1 cm',
    ar: 'ارتفاع × عمق × طول، حسب الرسومات التنفيذية المعتمدة، ±1 سم',
  },
};

// Real client photos (WebP, max 1600 px). Captions stay generic: we do not know which project each belongs to.
export const SITE_PHOTOS = {
  terracedTurfCurvedEdge: asset('/assets/images/terraced-turf-curved-edge.webp'),
  curvedSteppedWallA: asset('/assets/images/curved-stepped-wall-a.webp'),
  curvedSteppedWallB: asset('/assets/images/curved-stepped-wall-b.webp'),
  steppedWallTrees: asset('/assets/images/stepped-wall-trees.webp'),
  terracedTurfVertical: asset('/assets/images/terraced-turf-vertical.webp'),
  terracedTurfPlaza: asset('/assets/images/terraced-turf-plaza.webp'),
  terracedTurfWide: asset('/assets/images/terraced-turf-wide.webp'),
  terracedTurfLandscape: asset('/assets/images/terraced-turf-landscape.webp'),
  terracedTurfPlazaTower: asset('/assets/images/terraced-turf-plaza-tower.webp'),
  beigeLockstoneGarden: asset('/assets/images/beige-lockstone-garden.webp'),
  blockTwoHolesGrass: asset('/assets/images/block-two-holes-grass.webp'),
  blockFaceTop: asset('/assets/images/block-face-top.webp'),
};
// The five AI-generated stock scenes were removed from the site and from assets/images.

export const COMPANY_VIDEO = {
  id: 'company-intro',
  src: asset(encodeURI('/assets/videos/CompanyProfile.mp4')),
  poster: asset('/assets/images/posters/company-profile.jpg'),
  title: { en: 'Meet Rock Art — Factory, Products & Lock Stone Systems', ar: 'تعرّف على روك آرت — المصنع والمنتجات ونظام لوك ستون' },
  eyebrow: { en: 'Company Introduction', ar: 'فيديو تعريفي بالشركة' },
  description: {
    en: 'A short walkthrough of who we are, what we manufacture at our Abu Rawash factory, and the engineered solutions we deliver across Egypt.',
    ar: 'جولة سريعة للتعرف على روك آرت، وما نصنّعه في مصنعنا بأبو رواش، والحلول الهندسية التي ننفذها في مختلف أنحاء مصر.',
  },
};

// Hero background chosen by the owner for every page (it is an AI-generated image: see CONTENT_TODO.md).
export const HERO_IMAGE = asset('/assets/images/hero_retaining_wall_1794852048110.jpg');

export const PAGE_HERO_IMAGES = {
  about: asset('/assets/images/469840000_986669410155506_8441377795608501608_n_3551f32a.jpg'),
  lockStone: asset('/assets/projects/project-25-stone-wall-villas-wide.webp'),
  products: asset('/assets/images/469777079_986669490155498_8095820293760718252_n_25bdbebf.jpg'),
  projects: SITE_PHOTOS.terracedTurfPlazaTower,
  contact: SITE_PHOTOS.terracedTurfLandscape,
};

export const UPLOADED_PHOTOS = {
  // Banded Black & Terracotta Lock Stone Retaining Wall
  bandedWallWide: asset('/assets/images/188650219_138969261592196_5972776525103785045_n_1327a4d9.jpg'),
  bandedWallClose: asset('/assets/images/187269220_138969284925527_2656797730081516784_n_971bca51.jpg'),

  // Abu Rawash Outdoor Showroom Garden & GRC Works
  gardenFountainShowroom:
    asset('/assets/images/188482549_139585864863869_4142983779621323734_n_38fc53ab.jpg'),
  gardenRockworkShowroom:
    asset('/assets/images/187543530_139585874863868_5706292536705605131_n_fd2f3c59.jpg'),

  // Desert Site Lock Stone Construction & Geogrid Execution Sequence
  siteStringAndGeogridRolls:
    asset('/assets/images/187593177_139591028196686_2866893865763698377_n_3a88dc55.jpg'),
  siteGeogridLongCourse:
    asset('/assets/images/188250498_139590978196691_1206115272104501952_n_26e2fad3.jpg'),
  siteBlockPallets:
    asset('/assets/images/188009112_139590964863359_6062359692633556422_n_b063b433.jpg'),
  siteGeogridSpreadWide:
    asset('/assets/images/187835260_139591018196687_8003346248840165242_n_53409696.jpg'),
  siteCrewGeogridLaying:
    asset('/assets/images/188063235_139591001530022_5024931321989219636_n_db463f20.jpg'),
  siteWaterTankerSpraying:
    asset('/assets/images/187990650_139590934863362_1615886594344684144_n_85bb598c.jpg'),
  siteCrestCompaction:
    asset('/assets/images/188179720_139591121530010_4780813895430906674_n_639cee45.jpg'),

  // Factory Courtyard Sample Retaining Walls & Statuary
  courtyardSteppedPyramidFront:
    asset('/assets/images/191125455_144025494419906_1433542822310704916_n_26807be7.jpg'),
  courtyardSteppedPyramidOblique:
    asset('/assets/images/192321316_144025491086573_4767294779603735628_n_231be4c2.jpg'),
  courtyardSoftPyramidGeogrid:
    asset('/assets/images/191709371_144025481086574_3152827359385844266_n_9a1f0866.jpg'),

  // Official Brochure Slides (Arabic Technical & Product Sheets 1–10)
  brochureSlide1About:
    asset('/assets/images/160919982_112587957563660_4835820083729871587_n_c55a2479.jpg'),
  brochureSlide9GreekStoneGrid:
    asset('/assets/images/160935991_112588347563621_99912756911722462_n_3284224f.jpg'),
  brochureSlide10CurbsGrc:
    asset('/assets/images/161423217_112588374230285_4429855566428586948_n_12229cee.jpg'),

  // Exhibition Booth A16 Photos
  expoWideOverview:
    asset('/assets/images/469777079_986669490155498_8095820293760718252_n_25bdbebf.jpg'),
  expoLockStoneSampleBoards:
    asset('/assets/images/469840000_986669410155506_8441377795608501608_n_3551f32a.jpg'),
  expoTahyaMisrAndBoards:
    asset('/assets/images/469821249_986669473488833_291861161835833174_n_2bd311d4.jpg'),

  // Individual Studio Cladding Mockups (Code Badges)
  skuE206: asset('/assets/images/194993072_148566590632463_3183743901083243364_n_5a654694.jpg'),
  skuSP227: asset('/assets/images/194418623_148566703965785_485004585141989581_n_969406d4.jpg'),
  skuSP226: asset('/assets/images/194380617_148566217299167_8901555171096723615_n_80ec12e4.jpg'),
  skuG222: asset('/assets/images/194993072_148566443965811_2120878832873227593_n_75babed9.jpg'),
  skuG225: asset('/assets/images/194509914_148566437299145_3545460588210772125_n_aa88d2ff.jpg'),
  skuSP231: asset('/assets/images/194999119_148566473965808_1087974455208199588_n_1118ac1a.jpg'),
  skuE215: asset('/assets/images/195418339_148566607299128_5822778678750798587_n_539a5d3f.jpg'),
  skuSP228: asset('/assets/images/196093789_148566573965798_5808864361365654634_n_8e81e574.jpg'),
};

export const COMPANY_INFO = {
  brand: {
    en: 'ROCK ART',
    ar: 'روك آرت',
  },
  fullName: {
    en: 'Rock Art Company for Cement & Decorative Products',
    ar: 'شركة روك آرت للمنتجات الأسمنتية والديكور',
  },
  subtitle: {
    en: 'Cement & Decorative Products',
    ar: 'للمنتجات الاسمنتية والديكور',
  },
  patent: {
    en: 'Patent No. 2018/1412 — Egypt',
    ar: 'براءة اختراع رقم 2018/1412',
  },
  address: {
    en: 'Kilo 26, Cairo-Alexandria Desert Road, Abu Rawash, Giza',
    ar: 'الكيلو 26 طريق مصر اسكندرية الصحراوي، أبو رواش، الجيزة',
  },
  shortAddress: {
    en: 'Kilo 26, Abu Rawash, Giza',
    ar: 'الكيلو 26، أبو رواش، الجيزة',
  },
  phones: [
    { display: '01064611274', href: 'tel:+201064611274', wa: 'https://wa.me/201064611274' },
    { display: '01153936569', href: 'tel:+201153936569', wa: 'https://wa.me/201153936569' },
  ],
  email: 'info@rockart-eg.com',
  website: 'https://www.rockart-eg.com',
  websiteDisplay: 'www.rockart-eg.com',
};

export const HERO_CONTENT = {
  eyebrow: COMPANY_INFO.patent,
  headlineStart: {
    en: 'We build the future',
    ar: 'نبني المستقبل',
  },
  headlineAccent: {
    en: 'with quality that lasts.',
    ar: 'بجودة تدوم',
  },
  description: {
    en: 'Rock Art manufactures cement construction products, including the patented Lock Stone retaining-wall blocks, and designs and executes interior and exterior decor works for buildings, villas and palaces.',
    ar: 'شركة روك آرت متخصصة في تصنيع المنتجات الأسمنتية اللازمة للبناء، وتشمل بلوك الكيستون (الحوائط الساندة)، بالإضافة إلى تصميم وتنفيذ أعمال الديكور الداخلي والخارجي للعمائر والفيلات والقصور.',
  },
  stats: [
    {
      value: '12m+',
      label: { en: 'Wall height with proper soil reinforcement', ar: 'ارتفاع الحائط مع تدعيم جيد للتربة' },
    },
    {
      value: '2018/1412',
      label: { en: 'Patent registration no.', ar: 'رقم تسجيل البراءة' },
    },
    {
      value: '15+',
      label: { en: 'Major projects delivered', ar: 'مشروعاً كبيراً تم تنفيذه' },
    },
    {
      value: '60-160 kN/m',
      label: { en: 'Geogrid tensile strength range', ar: 'مدى مقاومة الشد للجيوجريد' },
    },
  ],
  /* UNVERIFIED (removed pending client proof; restore only with documents):
     { value: '20m+', ... 'Max wall height supported' }
     { value: '250 kg/cm²', ... 'Block compressive strength' }
     { value: '30+', ... 'Contracting partners' }
     { value: 'ASTM·ISO', ... 'Tested & certified' }
  */
};

export const ABOUT_CONTENT = {
  eyebrow: {
    en: 'Kilo 26, Abu Rawash',
    ar: 'الكيلو 26، أبو رواش',
  },
  headline: {
    en: 'A factory built on rock, run like an engineering office.',
    ar: 'مصنع تأسس على الصخر، يُدار بعقلية مكتب هندسي',
  },
  paragraphs: {
    en: [
      'Rock Art is an Egyptian manufacturer of cement construction products — interlocking pavers, cement curbs, modern floor and pavement tiles (City Block) and our patented Lock Stone retaining-wall blocks — made at our own factory in Abu Rawash.',
      'We also design and install interior and exterior GRC and GRP works for apartment buildings, villas and palaces, landscape the adjoining gardens, and cast Greek, Spanish and English court-style tiles for cladding walls in a wide range of finishes.',
    ],
    ar: [
      'روك آرت مصنع مصري للمنتجات الأسمنتية اللازمة للبناء: بلاط الإنترلوك المتداخل، والبردورات الأسمنتية، وبلاط الأرضيات والأرصفة الحديثة (سيتي بلاك)، وبلوك لوك ستون (الكيستون) المسجّل ببراءة اختراع للحوائط الساندة، كلها من مصنعنا في أبو رواش.',
      'ونصمّم وننفّذ أعمال الجي آر سي والجي آر بي الداخلية والخارجية للعمائر والفيلات والقصور، وننسّق الحدائق المجاورة، ونصنّع البلاط الصناعي (اليوناني والأسباني والإنجليزي) لتجليد الحوائط بأشكال وتشطيبات متعددة.',
    ],
  },
  certifications: [
    /* UNVERIFIED (HBRC card removed; no certificate supplied by the client):
       title: 'HBRC Lab Tested' / subtitle 'ASTM C140 / C1372-17' / compressive strength and water absorption claim.
    */
    {
      id: 'patent',
      title: { en: 'Patented System', ar: 'نظام مسجل ببراءة اختراع' },
      subtitle: { en: 'Reg. No. 2018/1412', ar: 'رقم التسجيل 2018/1412' },
      detail: {
        en: 'Lock Stone blocks owned by Rock Art, registered with the scientific research authority under patent registration no. 2018/1412.',
        ar: 'بلوكات لوك ستون الخاصة بشركة روك آرت، المسجلة بالبحث العلمي برقم تسجيل 2018/1412 لبراءات الاختراع.',
      },
    },
    {
      id: 'geogrid',
      title: { en: 'HDPE Uniaxial Geogrid', ar: 'شبكات جيوجريد HDPE أحادية الاتجاه' },
      subtitle: { en: 'G-TEX Latifia UG RW', ar: 'جي-تكس لطيفية UG RW' },
      detail: {
        en: 'G-TEX (Dammam, Saudi Arabia, ISO 9001:2015 certified) Latifia UG RW mono-oriented HDPE uniaxial geogrids, grades UG60 to UG160 with an ultimate tensile strength of 60 to 160 kN/m (ASTM D6637 / ISO 10319).',
        ar: 'شبكات جيوجريد أحادية الاتجاه من البولي إيثيلين عالي الكثافة (HDPE) من جي-تكس (الدمام، السعودية، الحاصلة على ISO 9001:2015)، فئات UG60 حتى UG160 بمقاومة شد قصوى من 60 إلى 160 كيلو نيوتن/م (ASTM D6637 / ISO 10319).',
      },
    },
  ],
  capabilities: [
    {
      code: '01',
      title: { en: 'Lock Stone & Retaining Systems', ar: 'أنظمة الحوائط الساندة (كيستون)' },
      description: {
        en: 'Patented double-reinforced Lock Stone retaining wall blocks engineered for roads, terraced compounds, and heights over 12 meters with proper soil reinforcement.',
        ar: 'بلوكات الكيستون المزدوجة التسليح للحوائط الساندة المصممة للطرق والمشروعات المدرجة بارتفاعات تتجاوز 12 متراً مع تدعيم جيد للتربة.',
      },
    },
    {
      code: '02',
      title: { en: 'Paving, Curbs & City Block', ar: 'الإنترلوك والبردورات وسيتي بلاك' },
      description: {
        en: 'Interlocking paving stone, cement curbs, modern floor tiles, and City Block pavement units.',
        ar: 'بلاط الإنترلوك المتداخل، البردورات الأسمنتية، وبلاط الأرضيات الحديث والأرصفة سيتي بلاك.',
      },
    },
    {
      code: '03',
      title: { en: 'GRC & GRP Architectural Works', ar: 'أعمال جي آر سي وجي آر بي المعمارية' },
      description: {
        en: 'Design and execution of interior and exterior GRC and GRP decorative works for apartment buildings, villas and palaces, plus landscaping.',
        ar: 'تصميم وتنفيذ أعمال الجي آر سي والجي آر بي الداخلية والخارجية للعمائر والفيلات والقصور، مع تنسيق الحدائق.',
      },
    },
    {
      code: '04',
      title: { en: 'Greek, Spanish & English Cladding', ar: 'البلاط الصناعي اليوناني والأسباني والإنجليزي' },
      description: {
        en: 'Greek, Spanish and English artificial tiles for cladding walls, interior and exterior, in a wide range of finishes.',
        ar: 'بلاط صناعي يوناني وأسباني وإنجليزي لتجليد الحوائط الداخلية والخارجية بأشكال وتشطيبات متعددة.',
      },
    },
  ],
};

export const LOCK_STONE_SYSTEM = {
  eyebrow: { en: 'How It Holds', ar: 'كيف يثبت الحائط' },
  title: {
    en: 'The Lock Stone retaining wall system',
    ar: 'نظام بلوك الكيستون للحوائط الساندة',
  },
  description: {
    en: 'A double-reinforced retaining wall system — horizontally and vertically — engineered for strength, complete safety, and an elegant architectural face. Walls can reach more than 12 meters with proper soil reinforcement.',
    ar: 'نظام حوائط ساندة مزدوج التسليح أفقياً ورأسياً، يتميز بالقوة والأمان التام، إلى جانب مظهر معماري أنيق وجذاب. يمكن أن يصل ارتفاع الحوائط إلى أكثر من 12 متراً مع تدعيم جيد للتربة.',
  },
  specs: [
    {
      label: { en: 'Block dimensions (H × D × L), per approved shop drawings ±1 cm', ar: 'أبعاد البلوك (ارتفاع × عمق × طول) حسب الرسومات المعتمدة ±1 سم' },
      value: LOCK_STONE_BLOCK_SIZE.value,
    },
    { label: { en: 'Vertical fiberglass bars', ar: 'أسياخ الفيبر جلاس الرأسية' }, value: '⌀12 / ⌀14 mm' },
    {
      label: { en: 'Pins per block', ar: 'أسياخ التثبيت لكل بلوك' },
      value: { en: '2 glass-fibre/epoxy FRP pins', ar: 'عدد 2 سيخ FRP (ألياف زجاج/إيبوكسي)' },
    },
    { label: { en: 'Geogrid (G-TEX HDPE uniaxial)', ar: 'الجيوجريد (HDPE أحادي الاتجاه من جي-تكس)' }, value: '60 / 75 / 90 / 120 / 140 / 160 kN/m' },
    {
      label: { en: 'Block cores', ar: 'قلب البلوك' },
      value: { en: 'Gravel-filled; concrete + FRP rods only in the top course', ar: 'مملوء بالحصى؛ خرسانة وأسياخ FRP في المدماك العلوي فقط' },
    },
    {
      label: { en: 'PC footing (thickness × width), per approved drawings', ar: 'القاعدة الخرسانية (سمك × عرض) حسب الرسومات المعتمدة' },
      value: '20 cm × 60 cm',
    },
    {
      label: { en: 'Compaction', ar: 'الدمك' },
      value: { en: '95% Standard Proctor, lifts ≤ 30 cm', ar: '95% بروكتور قياسي، طبقات ≤ 30 سم' },
    },
    { label: { en: 'Patent registration', ar: 'رقم تسجيل البراءة' }, value: '2018/1412' },
  ],
  /* UNVERIFIED (removed pending client proof):
     Compressive strength: >= 250 kg/cm²
     Shear pins per block: 2 x ⌀13 x 130 mm  (sources conflict with ⌀12 x 15 cm)
     Core concrete fill: 350 kg/m² of wall face
  */
  steps: [
    {
      course: '01',
      label: { en: 'Stage 01', ar: 'المرحلة 01' },
      title: { en: 'Foundation preparation', ar: 'تجهيز الأساس' },
      description: {
        en: 'Survey the wall line and excavate to the embedment depth (5% of wall height, minimum 50 cm). Level the base with sand and a 25 cm crushed-stone bed, then cast a smooth, level PC pad 20 cm thick × 60 cm wide.',
        ar: 'رفع الحائط مساحياً والحفر حتى عمق الدفن (5% من ارتفاع الحائط وبحد أدنى 50 سم)، ثم تسوية القاعدة بالرمل وفرش طبقة حجر مكسّر بسمك 25 سم، وصب قاعدة خرسانية عادية ناعمة ومستوية بسمك 20 سم وعرض 60 سم.',
      },
      specCallout: {
        en: 'PC pad 20 cm × 60 cm, per approved drawings · embedment 5% of height, min 50 cm',
        ar: 'قاعدة خرسانية 20 × 60 سم حسب الرسومات المعتمدة · الدفن 5% من الارتفاع وبحد أدنى 50 سم',
      },
    },
    {
      course: '02',
      label: { en: 'Stage 02', ar: 'المرحلة 02' },
      title: { en: 'First course and pins', ar: 'المدماك الأول وأسياخ التثبيت' },
      description: {
        en: 'Align the first course with a string line (a guide for curves) and check level side to side and front to back, because it sets the alignment of the whole wall. Place the FRP pins before any backfilling so the pin holes are not blocked, fill the block cores with gravel and clean the tops.',
        ar: 'ضبط المدماك الأول بخيط التسوية (أو دليل للمنحنيات) وفحص الميزان أفقياً ورأسياً، فهو يحدد استقامة الحائط بالكامل. تركيب أسياخ FRP قبل أي ردم حتى لا تنسد الفتحات، وملء قلب البلوكات بالحصى وتنظيف الأسطح العلوية.',
      },
      specCallout: {
        en: `${LOCK_STONE_BLOCK_SIZE.compact} blocks · 2 FRP pins per block · gravel-filled cores`,
        ar: `بلوك ${LOCK_STONE_BLOCK_SIZE.compact} · عدد 2 سيخ FRP لكل بلوك · قلب مملوء بالحصى`,
      },
    },
    {
      course: '03',
      label: { en: 'Stage 03', ar: 'المرحلة 03' },
      title: { en: 'Drainage, backfill and compaction', ar: 'الصرف والردم والدمك' },
      description: {
        en: 'Place geotextile and 30 cm of fine gravel directly behind the wall, with a 4" perforated PVC pipe every 6 m at the wall base, wrapped in geotextile, sloped and covered with clean gravel. Backfill the reinforced zone with clean sand (fines ≤ 5%), never soil near the wall. Compact in lifts of 30 cm or less to 95% Standard Proctor, using a plate compactor for the first 1 m behind the wall.',
        ar: 'فرش الجيوتكستايل و30 سم من الحصى الناعم خلف الحائط مباشرة، مع ماسورة PVC مثقبة 4 بوصة كل 6 م عند قاعدة الحائط ملفوفة بالجيوتكستايل بميل للصرف ومغطاة بالحصى النظيف. ردم منطقة التسليح برمل نظيف (نسبة الدقائق ≤ 5%) وعدم استخدام التربة بالقرب من الحائط. الدمك على طبقات 30 سم أو أقل حتى 95% بروكتور قياسي، بماكينة دمك صفائحية لأول 1 م خلف الحائط.',
      },
      specCallout: {
        en: 'Geotextile + 30 cm gravel · 4" drain every 6 m · 30 cm lifts at 95% Proctor',
        ar: 'جيوتكستايل + 30 سم حصى · صرف 4 بوصة كل 6 م · طبقات 30 سم بدمك 95% بروكتور',
      },
    },
    {
      course: '04',
      label: { en: 'Stage 04', ar: 'المرحلة 04' },
      title: { en: 'Geogrid and repeat to the top', ar: 'الجيوجريد والتكرار حتى القمة' },
      description: {
        en: 'Lay the G-TEX geogrid flat on the compacted fill, fixed at the front on 15 cm FRP pins and at the back with a steel bar, pulled taut. Place the next course with staggered joints and repeat to the required height. The top course is an RC base with an insulation layer, blocks filled with concrete and FRP rods, and cap stones fixed with adhesive.',
        ar: 'فرد شبكة الجيوجريد من جي-تكس أفقياً فوق الردم المدموك، وتثبيتها من الأمام بأسياخ FRP بطول 15 سم ومن الخلف بسيخ حديد، مع شدها جيداً. وضع المدماك التالي بتبادل الفواصل وتكرار الخطوات حتى الارتفاع المطلوب. المدماك العلوي: قاعدة خرسانة مسلحة مع طبقة عزل، وبلوكات مملوءة بالخرسانة وأسياخ FRP، وأحجار تغطية مثبتة باللاصق.',
      },
      specCallout: {
        en: 'G-TEX HDPE geogrid 60–160 kN/m · staggered courses · RC top course + cap stones',
        ar: 'جيوجريد HDPE من جي-تكس 60–160 كيلو نيوتن/م · مداميك متبادلة · مدماك علوي بخرسانة مسلحة وأحجار تغطية',
      },
    },
  ],
  /* UNVERIFIED (old stage set removed; 'Soil replacement' and 'concrete every 60cm / 350 kg/m²' are not in the Method of Statement). */
};

export const CLADDING_PRODUCTS = [
  {
    sku: 'G-223',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Canyon Red', ar: 'أحمر كانيون' },
    description: { en: 'Layered sandstone face, rust & clay tones', ar: 'وجه حجر رملي متدرج بألوان الصدأ والطين' },
    finishNote: {
      en: 'Cast in high-density GRC with iron-oxide mineral pigments matched to natural canyon sandstone.',
      ar: 'مصنوع من الجي آر سي عالي الكثافة بأصباغ معدنية مقاومة للأشعة فوق البنفسجية تحاكي الحجر الرملي الطبيعي.',
    },
    dimensions: '50 × 20 × 2.5–4 cm',
    styleOrigin: { en: 'Greek Tile Style', ar: 'نمط البلاط اليوناني' },
    colors: ['#9B4425', '#B5562A', '#7A3A1C', '#C97A4B'],
  },
  {
    sku: 'SP-227',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Split Quarry', ar: 'محجر مشقوق' },
    description: { en: 'Split-face ledger stone, salmon, orange & gold strata', ar: 'حجر مشقوق بطبقات وردية وبرتقالية وذهبية' },
    finishNote: {
      en: 'Deep cleft quarry relief combining warm ochre gold bands with salmon-pink and terracotta-orange strata.',
      ar: 'ملمس محجر مشقوق يجمع بين الدرجات الذهبية الدافئة والوردي السلموني والبرتقالي الطوبي.',
    },
    dimensions: '55 × 15 × 3–5 cm',
    styleOrigin: { en: 'Spanish Tile Style', ar: 'نمط البلاط الأسباني' },
    colors: ['#A68B5B', '#C98A6B', '#D9A066', '#C4AE84'],
    image: UPLOADED_PHOTOS.skuSP227,
  },
  {
    sku: 'G-222',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Slate Ridge', ar: 'سليت ريدج' },
    description: { en: 'Weathered slate ledger, grey & ochre', ar: 'حجر إردوازي متآكل بدرجات الرمادي والأصفر الترابي' },
    finishNote: {
      en: 'Chiseled grey slate strips with mineral ochre bands for contemporary facades.',
      ar: 'شرائح إردوازية رمادية منحوتة مع أشرطة أصفر ترابي للواجهات العصرية.',
    },
    dimensions: '50 × 20 × 2.5–4 cm',
    styleOrigin: { en: 'Greek Tile Style', ar: 'نمط البلاط اليوناني' },
    colors: ['#5E5A55', '#8A857D', '#B08A3E', '#3A3733'],
    image: UPLOADED_PHOTOS.skuG222,
  },
  {
    sku: 'SP-228',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Desert Ledge', ar: 'ديزرت ليدج' },
    description: { en: 'Cream, grey & yellow ledger strips', ar: 'شرائح حجرية بدرجات الكريمي والرمادي والأصفر' },
    finishNote: {
      en: 'Sun-bleached limestone and warm Sahara sand strata tailored for coastal resorts and villas.',
      ar: 'طبقات حجر جيري ورملي مشمس مثالية للمنتجعات الساحلية والفيلات.',
    },
    dimensions: '55 × 15 × 2.5–4 cm',
    styleOrigin: { en: 'Spanish Tile Style', ar: 'نمط البلاط الأسباني' },
    colors: ['#D6C7AE', '#EDE6D6', '#D2A93A', '#7E7A73'],
    image: UPLOADED_PHOTOS.skuSP228,
  },
  {
    sku: 'SP-226',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Walnut Strata', ar: 'والنت ستراتا' },
    description: { en: 'Warm walnut & cream banded ledger', ar: 'طبقات حجرية دافئة بالبني الجوزي والكريمي' },
    finishNote: {
      en: 'Alternating dark walnut and pale cream sedimentary bands with interlocking Z-joint edges.',
      ar: 'طبقات رسوبية متبادلة من البني الجوزي والكريمي الفاتح بحواف متداخلة.',
    },
    dimensions: '55 × 15 × 3–4.5 cm',
    styleOrigin: { en: 'Spanish Tile Style', ar: 'نمط البلاط الأسباني' },
    colors: ['#5E4332', '#7D5C46', '#D8CCB8', '#443023'],
    image: UPLOADED_PHOTOS.skuSP226,
  },
  {
    sku: 'SP-232',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Terracotta Cliff', ar: 'تيراكوتا كليف' },
    description: { en: 'Rugged terracotta & sand cliff-face', ar: 'وجه صخري وعر بألوان التيراكوتا والرملي' },
    finishNote: {
      en: 'High-relief rock-face casting engineered to mirror desert escarpment strata.',
      ar: 'صب صخري بارز التضاريس مصمم ليحاكي التدرجات الصخرية الصحراوية.',
    },
    dimensions: '55 × 15 × 3.5–5.5 cm',
    styleOrigin: { en: 'Spanish Tile Style', ar: 'نمط البلاط الأسباني' },
    colors: ['#B5562A', '#C9895B', '#8C401F', '#DFCBB2'],
  },
  {
    sku: 'G-225',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Basalt Noir', ar: 'بازلت نوار' },
    description: { en: 'Deep black split-face, matte basalt finish', ar: 'وجه أسود مشقوق بلمسة بازلتية غير لامعة' },
    finishNote: {
      en: 'Deep charcoal-black volcanic basalt finish with low-sheen architectural seal.',
      ar: 'تشطيب بازلتي أسود فحمي غير لامع مع طبقة حماية معمارية.',
    },
    dimensions: '50 × 20 × 2.5–4 cm',
    styleOrigin: { en: 'Greek Tile Style', ar: 'نمط البلاط اليوناني' },
    colors: ['#1C1B19', '#2E2C29', '#423F3B', '#141311'],
    image: UPLOADED_PHOTOS.skuG225,
  },
  {
    sku: 'SP-230',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Alabaster White', ar: 'ألاباستر وايت' },
    description: { en: 'Bright white ledger with gold vein accent', ar: 'حجر أبيض فاتح بعروق ذهبية' },
    finishNote: {
      en: 'Bright alabaster-white architectural stone panels highlighted with subtle warm gold mineral veining.',
      ar: 'ألواح حجرية بيضاء ناصعة مع عروق معدنية ذهبية دافئة.',
    },
    dimensions: '55 × 15 × 2.5–4 cm',
    styleOrigin: { en: 'Spanish Tile Style', ar: 'نمط البلاط الأسباني' },
    colors: ['#F4F0E6', '#E5DEC9', '#C8A96E', '#FAF8F2'],
  },
  {
    sku: 'SP-231',
    category: 'stone',
    typeLabel: { en: 'Stone Face', ar: 'وجه حجري' },
    name: { en: 'Sienna Ledger', ar: 'سيينا ليدجر' },
    description: { en: 'Rich sienna & amber stacked stone', ar: 'حجر مكدّس بألوان السيينا والكهرماني' },
    finishNote: {
      en: 'Warm burnt-sienna and amber stacked stone modules suitable for feature walls and boundary facades.',
      ar: 'وحدات حجرية مكدسة بألوان السيينا المحروقة والكهرمان للواجهات والأسوار.',
    },
    dimensions: '55 × 15 × 3–4.5 cm',
    styleOrigin: { en: 'Spanish Tile Style', ar: 'نمط البلاط الأسباني' },
    colors: ['#A65928', '#C67B39', '#7C3E18', '#D9A66C'],
    image: UPLOADED_PHOTOS.skuSP231,
  },
  {
    sku: 'E-209',
    category: 'brick',
    typeLabel: { en: 'Brick Face', ar: 'وجه طوب' },
    name: { en: 'English Brick', ar: 'طوب إنجليزي' },
    description: { en: 'Classic running-bond brick, sand finish', ar: 'طوب كلاسيكي بنمط الإنجليزي ولمسة رملية' },
    finishNote: {
      en: 'Thin-profile cast GRC running-bond brick veneer offering authentic sand-finished mortar shadow lines.',
      ar: 'شرائح طوب إنجليزي من الجي آر سي بملمس رملي كلاسيكي وخطوط لحام دقيقة.',
    },
    dimensions: '24 × 7 × 1.8 cm',
    styleOrigin: { en: 'English Tile Style', ar: 'نمط البلاط الإنجليزي' },
    colors: ['#D6C4A6', '#C2AD8B', '#E5D9C3', '#A89372'],
  },
];

export const PLANTER_PRODUCTS = [
  {
    sku: 'POT-01C',
    category: 'planter',
    typeLabel: { en: 'Cast-Stone Planter', ar: 'أصيص خرساني' },
    name: { en: 'Cylinder Grey', ar: 'أسطواني رمادي' },
    description: {
      en: 'Cylindrical concrete planter for courtyards and gardens.',
      ar: 'أصيص خرساني أسطواني للساحات والحدائق.',
    },
    finishNote: {
      en: 'Cast in fiber-reinforced concrete with integrated drainage port and weather-sealed matte stone finish.',
      ar: 'مصنوع من الخرسانة المسلحة بالألياف مع فتحة تصريف مدمجة وتشطيب حجري غير لامع مقاوم للعوامل الجوية.',
    },
    dimensions: '90 × 100 cm',
    styleOrigin: { en: 'Cast-Stone Garden Range', ar: 'تشكيلة أصص الحدائق' },
    colors: ['#7B766E', '#5B5650', '#9D978E'],
    image: UPLOADED_PHOTOS.gardenFountainShowroom,
  },
  {
    sku: 'POT-04',
    category: 'planter',
    typeLabel: { en: 'Cast-Stone Planter', ar: 'أصيص خرساني' },
    name: { en: 'Ribbed Barrel', ar: 'برميل مخدد' },
    description: {
      en: 'Vertically fluted barrel planter for terraces, lobbies and walkways.',
      ar: 'أصيص برميلي مخدد رأسياً للتراسات والمداخل والممرات.',
    },
    finishNote: {
      en: 'Precision-molded vertical ribs cast in solid stone-grey concrete.',
      ar: 'تضليعات رأسية دقيقة الصب في خرسانة صلبة باللون الرمادي الحجري.',
    },
    dimensions: '55 × 90 cm',
    styleOrigin: { en: 'Cast-Stone Garden Range', ar: 'تشكيلة أصص الحدائق' },
    colors: ['#8C857B', '#67625A', '#ABA499'],
    image: UPLOADED_PHOTOS.gardenFountainShowroom,
  },
  {
    sku: 'POT-01D',
    category: 'planter',
    typeLabel: { en: 'Cast-Stone Planter', ar: 'أصيص خرساني' },
    name: { en: 'Cylinder Grey XL', ar: 'أسطواني رمادي كبير' },
    description: {
      en: 'Large-size planter for landscape focal points.',
      ar: 'أصيص كبير الحجم لنقاط الارتكاز في تنسيق الحدائق.',
    },
    finishNote: {
      en: 'Extra-large monolithic cylinder cast with internal reinforcement mesh.',
      ar: 'أسطوانة خرسانية ضخمة مسلحة داخلياً لتحمل التربة والأشجار الكبيرة.',
    },
    dimensions: '110 × 125 cm',
    styleOrigin: { en: 'Cast-Stone Garden Range', ar: 'تشكيلة أصص الحدائق' },
    colors: ['#69645D', '#4A4640', '#8C857B'],
    image: UPLOADED_PHOTOS.gardenFountainShowroom,
  },
  {
    sku: 'GARDEN-RANGE',
    category: 'planter',
    typeLabel: { en: 'Fountains & Statuary', ar: 'نوافير وتماثيل' },
    name: { en: 'Fountains & Statuary', ar: 'نوافير وتماثيل' },
    description: {
      en: 'Classic tiered cast-stone garden fountains, urns, and statuary for villas, hotels, and palaces.',
      ar: 'نوافير حدائق كلاسيكية متعددة الطبقات ومزهريات وتماثيل زخرفية للفلل والفنادق والقصور.',
    },
    finishNote: {
      en: 'Made to order with custom hydraulic piping channels and antique limestone patina.',
      ar: 'تُصنّع حسب الطلب مع مجاري توصيل المياه وتشطيب الحجر الجيري العتيق.',
    },
    dimensions: 'Made to order / تُصنّع حسب الطلب',
    styleOrigin: { en: 'Cast-Stone Garden Range', ar: 'تشكيلة أصص الحدائق' },
    colors: ['#D6C7AE', '#B7A68B', '#8C857B'],
    image: UPLOADED_PHOTOS.gardenFountainShowroom,
  },
];

export const ALL_PRODUCTS = [...CLADDING_PRODUCTS, ...PLANTER_PRODUCTS];

export const PROJECTS = [
  {
    slug: 'terraced-lock-stone-walls',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Terraced Lock Stone Walls', ar: 'حوائط كيستون مدرّجة' },
    caption: {
      en: 'Terraced Lock Stone retaining walls with grass courses',
      ar: 'حوائط كيستون مدرّجة بمساطب خضراء',
    },
    summary: {
      en: 'Stepped Lock Stone retaining wall terraces integrating landscaped planting shelves and compacted backfill layers.',
      ar: 'مدرجات حوائط ساندة بنظام لوك ستون تدمج مساطب الزراعة والتنسيق مع طبقات الردم المدموكة.',
    },
    scope: {
      en: 'Foundation preparation, PC footing, interlocking block erection, drainage and backfill, and terrace turf integration.',
      ar: 'تجهيز الأساس، القاعدة الخرسانية، رص البلوكات المتداخلة، الصرف والردم، وتنسيق المساطب.',
    },
    specs: [`Lock Stone ${LOCK_STONE_BLOCK_SIZE.compact}`, '⌀12 / ⌀14 FRP Bars', 'G-TEX HDPE Geogrid'],
    image: SITE_PHOTOS.terracedTurfLandscape,
    gallery: [
      {
        src: SITE_PHOTOS.terracedTurfLandscape,
        caption: {
          en: 'Completed terraced Lock Stone wall elevation',
          ar: 'الواجهة المنفذة لحوائط لوك ستون المدرجة',
        },
      },
      {
        src: UPLOADED_PHOTOS.courtyardSoftPyramidGeogrid,
        caption: {
          en: 'Soft pyramid grey Lock Stone courses anchored with upper HDPE geogrid mats',
          ar: 'نموذج تطبيقي بساحة المصنع: مداميك لوك ستون بالوجه الهرمي الرمادي مع شبكة الجيوغريد',
        },
      },
      {
        src: UPLOADED_PHOTOS.courtyardSteppedPyramidFront,
        caption: {
          en: 'Stepped terracotta & grey split-face courtyard display stack showing starter block cores',
          ar: 'نموذج تطبيقي مدرّج بساحة المصنع يوضح قلب البلوكات وتنوع ألوان التيراكوتا والرمادي',
        },
      },
    ],
  },
  {
    slug: 'tahya-misr-500-500-wall',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Tahya Misr 500 500 Wall', ar: 'حائط تحيا مصر 500 500' },
    caption: { en: 'White Lock Stone wall carrying the Tahya Misr 500 500 sign', ar: 'حائط لوك ستون أبيض يحمل لافتة تحيا مصر 500 500' },
    summary: { en: 'A white Lock Stone wall at the Hospital 500500 project in Sheikh Zayed. It carries the Tahya Misr 500 500 sign, so the wall is also the project’s signboard.', ar: 'حائط لوك ستون أبيض ضمن مشروع مستشفى 500 500 بالشيخ زايد، يحمل لافتة تحيا مصر 500 500، فيجمع الجدار واللافتة في عنصر واحد.' },
    scope: { en: 'Lock Stone block wall with a white face.', ar: 'حائط من بلوكات لوك ستون بوجه أبيض.' },
    specs: ['White Lock Stone Face', 'Tahya Misr 500 500 Sign', 'Sheikh Zayed'],
    image: asset('/assets/images/egyptian-wall-500500.webp'),
    gallery: [
      { src: asset('/assets/images/egyptian-wall-500500.webp'), caption: { en: 'The Tahya Misr 500 500 sign on a white Lock Stone wall', ar: 'لافتة تحيا مصر 500 500 على حائط لوك ستون أبيض' } },
    ],
  },
  {
    slug: 'curved-white-lock-stone-wall',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Curved White Lock Stone Wall', ar: 'حائط لوك ستون أبيض منحنٍ' },
    caption: { en: 'Curved white Lock Stone wall with a stepped top edge', ar: 'حائط لوك ستون أبيض منحنٍ بحافة علوية متدرجة' },
    summary: { en: 'A Lock Stone wall faced in light blocks and built to a rounded plan, with the top edge stepping down along the curve.', ar: 'حائط لوك ستون بوجه فاتح منفذ بمسقط دائري، وحافته العلوية تتدرج مع انحناء الحائط.' },
    scope: { en: 'Block courses laid to a guide line, with the first course checked for level and alignment.', ar: 'رص مداميك البلوك على دليل للمنحنى، مع ضبط ميزان واستقامة المدماك الأول.' },
    specs: ['Curved Plan', 'Stepped Top Edge', 'Light Block Face'],
    image: asset('/assets/projects/project-04-curved-white-wall-sand.webp'),
    gallery: [
      { src: asset('/assets/projects/project-04-curved-white-wall-sand.webp'), caption: { en: 'Curved white Lock Stone wall', ar: 'حائط لوك ستون أبيض منحنٍ' } },
      { src: asset('/assets/projects/project-21-curved-white-wall-blue-sky.webp'), caption: { en: 'Curved wall under a blue sky', ar: 'حائط منحنٍ تحت سماء صافية' } },
    ],
  },
  {
    slug: 'stone-walls-with-stairs',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Stone-Faced Walls with Stairs', ar: 'حوائط حجرية بسلالم' },
    caption: { en: 'Split-face stone retaining walls flanking stair flights', ar: 'حوائط ساندة حجرية على جانبي السلالم' },
    summary: { en: 'Split-face stone retaining walls on both sides of stair flights, photographed during construction with geotextile laid on the steps.', ar: 'حوائط ساندة بوجه حجري مشقوق على جانبي السلالم، مصورة أثناء التنفيذ مع فرش الجيوتكستايل على الدرجات.' },
    scope: { en: 'Retaining walls beside stair flights with geotextile layers and paving at the foot.', ar: 'حوائط ساندة بجوار السلالم مع طبقات جيوتكستايل وبلاط في أسفلها.' },
    specs: ['Split-Face Stone Finish', 'Stair Flights', 'Geotextile Layers'],
    image: asset('/assets/projects/project-10-stone-wall-stairs-wide.webp'),
    gallery: [
      { src: asset('/assets/projects/project-10-stone-wall-stairs-wide.webp'), caption: { en: 'Stone walls flanking a stair, wide view', ar: 'حائطان حجريان على جانبي سلم، منظر واسع' } },
      { src: asset('/assets/projects/project-01-stone-wall-stairs-geotextile.webp'), caption: { en: 'Stone wall with stairs and geotextile', ar: 'حائط حجري مع سلالم وجيوتكستايل' } },
      { src: asset('/assets/projects/project-07-stone-wall-stairs-paving.webp'), caption: { en: 'Stair between two stone walls, with paving', ar: 'سلم بين حائطين حجريين مع بلاط' } },
      { src: asset('/assets/projects/project-05-stone-wall-bench-balustrade.webp'), caption: { en: 'Stone wall with bench blocks and balustrade', ar: 'حائط حجري مع بلوكات مقاعد وسور' } },
    ],
  },
  {
    slug: 'geogrid-reinforcement-works',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Geogrid Reinforcement and Backfill Works', ar: 'أعمال تسليح الجيوجريد والردم' },
    caption: { en: 'Geogrid laid on compacted fill behind Lock Stone walls', ar: 'شبكات جيوجريد مفرودة على ردم مدموك خلف حوائط لوك ستون' },
    summary: { en: 'Site works behind Lock Stone walls: geogrid laid flat on compacted fill, backfill placed in layers, and heavy machinery for excavation and compaction.', ar: 'أعمال موقعية خلف حوائط لوك ستون: شبكات جيوجريد مفرودة أفقياً على ردم مدموك، وردم على طبقات، ومعدات ثقيلة للحفر والدمك.' },
    scope: { en: 'Geogrid fixed on pins and laid taut, then backfill and compaction in layers of 30 cm or less.', ar: 'تثبيت الجيوجريد على الأسياخ وشده جيداً، ثم الردم والدمك على طبقات 30 سم أو أقل.' },
    specs: ['G-TEX HDPE Geogrid', 'Layered Backfill', 'Heavy-Machinery Compaction'],
    image: asset('/assets/projects/project-27-geogrid-large-slope.webp'),
    gallery: [
      { src: asset('/assets/projects/project-27-geogrid-large-slope.webp'), caption: { en: 'Geogrid across a large slope', ar: 'شبكة جيوجريد على منحدر كبير' } },
      { src: asset('/assets/projects/project-09-geogrid-slope-beside-wall.webp'), caption: { en: 'Geogrid on a slope beside a wall', ar: 'جيوجريد على منحدر بجوار حائط' } },
      { src: asset('/assets/projects/project-11-geogrid-backfill-site.webp'), caption: { en: 'Geogrid and backfill on site', ar: 'جيوجريد وأعمال الردم بالموقع' } },
      { src: asset('/assets/projects/project-16-wall-geogrid-drainage-houses.webp'), caption: { en: 'Wall with geogrid and drainage works', ar: 'حائط بأعمال جيوجريد وصرف' } },
      { src: asset('/assets/projects/project-28-curved-wall-geogrid-drainage.webp'), caption: { en: 'Curved wall with geogrid and drainage', ar: 'حائط منحنٍ بجيوجريد وصرف' } },
      { src: asset('/assets/projects/project-14-excavation-trench-heavy-machinery.webp'), caption: { en: 'Excavation trench with heavy machinery', ar: 'خندق حفر بمعدات ثقيلة' } },
    ],
  },
  {
    slug: 'large-grey-lock-stone-walls',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Large Grey Lock Stone Walls', ar: 'حوائط لوك ستون رمادية كبيرة' },
    caption: { en: 'Large grey Lock Stone walls, straight and curved', ar: 'حوائط لوك ستون رمادية كبيرة، مستقيمة ومنحنية' },
    summary: { en: 'Large grey Lock Stone walls with long straight runs and curves, including a crew working along the top of the wall.', ar: 'حوائط لوك ستون رمادية كبيرة بامتدادات مستقيمة ومنحنيات، منها صورة لفريق يعمل على قمة الحائط.' },
    scope: { en: 'Block courses with staggered joints, run along straight and curved lines.', ar: 'مداميك بلوك بتبادل الفواصل على خطوط مستقيمة ومنحنية.' },
    specs: ['Grey Block Face', 'Staggered Joints', 'Straight and Curved Runs'],
    image: asset('/assets/projects/project-18-curved-grey-wall-large.webp'),
    gallery: [
      { src: asset('/assets/projects/project-18-curved-grey-wall-large.webp'), caption: { en: 'Large curved grey Lock Stone wall', ar: 'حائط لوك ستون رمادي منحنٍ كبير' } },
      { src: asset('/assets/projects/project-24-long-grey-wall-wide-angle.webp'), caption: { en: 'Long grey wall, wide angle', ar: 'حائط رمادي طويل بزاوية واسعة' } },
      { src: asset('/assets/projects/project-20-crew-on-grey-wall.webp'), caption: { en: 'Crew working on a grey wall', ar: 'فريق يعمل على حائط رمادي' } },
      { src: asset('/assets/projects/project-15-long-white-wall.webp'), caption: { en: 'Long white Lock Stone wall', ar: 'حائط لوك ستون أبيض طويل' } },
    ],
  },
  {
    slug: 'stone-walls-beside-villas',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Stone Retaining Walls Beside Villas', ar: 'حوائط ساندة حجرية بجوار فيلات' },
    caption: { en: 'Stone retaining walls running alongside villas and landscaping', ar: 'حوائط ساندة حجرية بجوار فيلات وتنسيق حدائق' },
    summary: { en: 'Stone-faced retaining walls running beside villas, with planted slopes above and an unpaved access road below.', ar: 'حوائط ساندة بوجه حجري بجوار فيلات، مع منحدرات مزروعة أعلاها وطريق ترابي أسفلها.' },
    scope: { en: 'Long retaining wall runs separating the landscaped level from the access road.', ar: 'امتدادات حوائط ساندة طويلة تفصل المستوى المنسق عن طريق الخدمة.' },
    specs: ['Stone-Faced Wall', 'Landscaped Slope', 'Long Wall Runs'],
    image: asset('/assets/projects/project-25-stone-wall-villas-wide.webp'),
    gallery: [
      { src: asset('/assets/projects/project-25-stone-wall-villas-wide.webp'), caption: { en: 'Stone wall near villas', ar: 'حائط حجري بجوار فيلات' } },
      { src: asset('/assets/projects/project-26-collage-two-walls-villas.webp'), caption: { en: 'Two stone walls near villas', ar: 'حائطان حجريان بجوار فيلات' } },
      { src: asset('/assets/projects/project-02-collage-wall-villas-and-curb-trench.webp'), caption: { en: 'Retaining wall beside villas and a curb trench', ar: 'جدار ساند بجوار فيلات وخندق بردورة' } },
    ],
  },
  {
    slug: 'banded-boundary-wall',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Banded Boundary Wall', ar: 'حائط ساند بألوان متبادلة' },
    caption: {
      en: 'Striped double-reinforced retaining wall, terracotta & charcoal bands',
      ar: 'حائط ساند مزدوج التسليح بألوان متبادلة',
    },
    summary: {
      en: 'Architectural boundary retaining wall executed in alternating terracotta, charcoal and grey Lock Stone courses.',
      ar: 'حائط ساند حدودي منفذ بمداميك متبادلة من ألوان التيراكوتا والفحمي والرمادي.',
    },
    scope: {
      en: 'Double-reinforced Lock Stone wall in alternating block colours.',
      ar: 'حائط لوك ستون مزدوج التسليح ببلوكات بألوان متبادلة.',
    },
    specs: ['Double-Reinforced System', 'Gravel-Filled Block Cores', 'Terracotta & Charcoal Bands'],
    image: UPLOADED_PHOTOS.bandedWallWide,
    gallery: [
      {
        src: UPLOADED_PHOTOS.bandedWallWide,
        caption: {
          en: 'Long-span elevation in alternating charcoal and terracotta Lock Stone strata',
          ar: 'واجهة طويلة كاملة بمداميك متبادلة من الفحم الداكن والتيراكوتا',
        },
      },
      {
        src: UPLOADED_PHOTOS.bandedWallClose,
        caption: {
          en: 'Close oblique perspective highlighting split-face block joint alignment',
          ar: 'زاوية قريبة تبرز انتظام الفواصل والملمس الحجري للبلوكات',
        },
      },
    ],
  },
  {
    slug: 'grc-artificial-rockwork',
    category: 'cladding',
    categoryLabel: { en: 'Cladding & GRC', ar: 'الكسوة وجي آر سي' },
    title: { en: 'GRC Artificial Rockwork', ar: 'صخور جي آر سي صناعية' },
    caption: {
      en: 'GRC artificial rockwork at the factory showroom garden',
      ar: 'صخور جي آر سي صناعية بحديقة عرض المصنع',
    },
    summary: {
      en: 'GRC artificial rock formations and garden benches, as built in the Abu Rawash showroom garden.',
      ar: 'تصميم وتنفيذ صخور جي آر سي صناعية ومقاعد حدائق، كما في حديقة عرض مصنع أبو رواش.',
    },
    scope: {
      en: 'Design and casting of GRC rock and garden elements.',
      ar: 'تصميم وصب عناصر الجي آر سي الصخرية وعناصر الحدائق.',
    },
    specs: ['GRC Rock Elements', 'Artificial Rock Finish', 'Garden Features & Benches'],
    image: UPLOADED_PHOTOS.gardenRockworkShowroom,
    gallery: [
      {
        src: UPLOADED_PHOTOS.gardenRockworkShowroom,
        caption: {
          en: 'Carved GRC artificial rock grotto & sculpted garden benches at Abu Rawash showroom',
          ar: 'مغارة وصخور جي آر سي صناعية ومقاعد حدائق منحوتة في معرض أبو رواش',
        },
      },
      {
        src: UPLOADED_PHOTOS.gardenFountainShowroom,
        caption: {
          en: 'Adjoining cast-stone courtyard fountain and stone cladding sample wall',
          ar: 'ساحة العرض المجاورة بالنافورة متعددة الطبقات وحائط عينات التكسية',
        },
      },
    ],
  },
  /* UNVERIFIED (Seashell Development removed: not in the client's portfolio, AI image):
  {
    slug: 'seashell-development',
    category: 'cladding',
    categoryLabel: { en: 'Cladding & GRC', ar: 'الكسوة وجي آر سي' },
    title: { en: 'Seashell Development', ar: 'مشروع سي شل' },
    caption: {
      en: 'Cladding panel installation, Seashell development',
      ar: 'تركيب ألواح التكسية، مشروع سي شل',
    },
    summary: {
      en: 'Exterior cast-stone GRC cladding installation across coastal residential facades and garden perimeter walls at Seashell.',
      ar: 'توريد وتركيب ألواح التكسية الحجرية من الجي آر سي للواجهات السكنية وأسوار الحدائق بمشروع سي شل.',
    },
    scope: {
      en: 'Color-matched stone ledger production and full facade cladding execution.',
      ar: 'تصنيع ألواح الحجر الصناعي بألوان مطابقة وتنفيذ أعمال التكسية للواجهات.',
    },
    specs: ['GRC Stone Cladding', 'UV-Stable Pigments', 'Coastal Facade Spec'],
    image: UPLOADED_PHOTOS.skuE206,
    gallery: [
      {
        src: UPLOADED_PHOTOS.skuE206,
        caption: {
          en: 'Installed multi-tone GRC stone ledger facade cladding',
          ar: 'تركيب ألواح التكسية الحجرية متعددة الدرجات على الواجهات',
        },
      },
      {
        src: UPLOADED_PHOTOS.courtyardSteppedPyramidOblique,
        caption: {
          en: 'Dark slate & mixed quartz ledger wall behind Lock Stone showroom installation',
          ar: 'تكسية واجهة المصنع بالإردواز الداكن والحجر الرملي',
        },
      },
    ],
  },
  */
  {
    slug: 'multi-level-terracing',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Desert Road Retaining Wall with Geogrid', ar: 'حائط ساند بالجيوغريد على طريق صحراوي' },
    caption: {
      en: 'Desert highway & embankment retaining wall under active geogrid reinforcement',
      ar: 'حوائط ساندة لمحاور الطرق الصحراوية أثناء تنفيذ تسليح شبكات الجيوغريد',
    },
    summary: {
      en: 'Lock Stone retaining wall along a desert road embankment, reinforced with geogrid between the courses and backfilled and compacted in layers.',
      ar: 'حائط ساند بنظام لوك ستون على محور طريق صحراوي، مسلّح بشبكات الجيوغريد بين المداميك مع الردم والدمك على طبقات.',
    },
    scope: {
      en: 'Block erection, geogrid fixing, then backfill and compaction in 30cm lifts.',
      ar: 'رص المداميك وتثبيت الجيوغريد، ثم الردم والدمك على طبقات بسمك 30 سم.',
    },
    specs: ['Lock Stone + Geogrid', 'Fiberglass Pins', '30cm Compaction Lifts'],
    image: UPLOADED_PHOTOS.siteGeogridLongCourse,
    gallery: [
      {
        src: UPLOADED_PHOTOS.siteStringAndGeogridRolls,
        caption: {
          en: 'Course alignment with mason string line and staged uniaxial geogrid rolls',
          ar: 'ضبط استقامة المداميك بخيط الميزان وتجهيز رولات شبكة الجيوغريد',
        },
      },
      {
        src: UPLOADED_PHOTOS.siteGeogridLongCourse,
        caption: {
          en: 'Continuous HDPE geogrid mats anchored behind terracotta split-face Lock Stone courses',
          ar: 'فرد شبكات الجيوغريد بطول الحائط خلف مداميك لوك ستون الحمراء',
        },
      },
      {
        src: UPLOADED_PHOTOS.siteCrewGeogridLaying,
        caption: {
          en: 'Site engineering team pinning and aligning geogrid mats along block joints',
          ar: 'فريق التنفيذ أثناء تثبيت الشبكات وضبط المداميك',
        },
      },
      {
        src: UPLOADED_PHOTOS.siteGeogridSpreadWide,
        caption: {
          en: 'Geogrid mats spread along the full wall length before the next backfill lift',
          ar: 'شبكات الجيوغريد مفرودة على كامل طول الحائط قبل نزول طبقة الردم التالية',
        },
      },
      {
        src: UPLOADED_PHOTOS.siteWaterTankerSpraying,
        caption: {
          en: 'Water tanker conditioning the fill moisture before roller compaction',
          ar: 'رش المياه لضبط رطوبة الردم قبل الدمك بالهراس',
        },
      },
      {
        src: UPLOADED_PHOTOS.siteCrestCompaction,
        caption: {
          en: 'Fill levelled and compacted in 30cm lifts behind the wall',
          ar: 'تسوية ودمك الردم على طبقات بسمك 30 سم خلف الحائط',
        },
      },
    ],
  },
  {
    slug: 'brick-boundary-wall',
    category: 'cladding',
    categoryLabel: { en: 'Cladding & GRC', ar: 'الكسوة وجي آر سي' },
    title: { en: 'Brick Boundary Wall', ar: 'حائط طوب حدودي' },
    caption: {
      en: 'English Brick boundary wall cladding, E-209 sand finish',
      ar: 'تكسية أسوار بالطوب الإنجليزي E-209 بلمسة رملية',
    },
    summary: {
      en: 'Sand-toned English Brick boundary perimeter cladding delivering warm architectural texture across compound entry walls.',
      ar: 'تكسية أسوار حدودية بالطوب الإنجليزي ذي اللون الرملي لإبراز الطابع المعماري للمداخل.',
    },
    scope: {
      en: 'Supply and installation of E-209 sand-finish English Brick panels.',
      ar: 'توريد وتركيب ألواح الطوب الإنجليزي E-209 بلمسة رملية.',
    },
    specs: ['E-209 English Brick', 'Running-Bond Pattern', 'Weather-Sealed Finish'],
    image: UPLOADED_PHOTOS.skuE206,
    gallery: [
      {
        src: UPLOADED_PHOTOS.skuE215,
        caption: {
          en: 'English Brick studio finish E-215 (sand, terracotta & charred accent blend)',
          ar: 'عينة الطوب الإنجليزي كود E-215 بالدرجات الرملية والمعتقة',
        },
      },
      {
        src: UPLOADED_PHOTOS.skuE206,
        caption: {
          en: 'English Brick studio finish E-206 (smoked burnt-terracotta with white mortar joints)',
          ar: 'عينة الطوب الإنجليزي كود E-206 بالطوب المحروق وعراميس بيضاء',
        },
      },
    ],
  },
  {
    slug: 'lock-stone-ready-to-ship',
    category: 'retaining',
    categoryLabel: { en: 'Retaining Walls', ar: 'الحوائط الساندة' },
    title: { en: 'Lock Stone, Ready to Ship', ar: 'كيستون جاهز للتوريد' },
    caption: {
      en: 'Terracotta Lock Stone blocks stacked on site, ready for erection',
      ar: 'بلوكات لوك ستون باللون الطوبي مشونة بموقع التنفيذ وجاهزة للرص',
    },
    summary: {
      en: 'Interlocking Lock Stone blocks produced at the Kilo 26 Abu Rawash plant and delivered to site, stacked along the wall line ready for erection.',
      ar: 'بلوكات لوك ستون المتداخلة من إنتاج مصنع الكيلو 26 بأبو رواش، موردة للموقع ومشونة بطول خط الحائط جاهزة للرص.',
    },
    scope: {
      en: 'Factory casting, curing, and site dispatch.',
      ar: 'الصب والمعالجة في المصنع والشحن المباشر للموقع.',
    },
    specs: ['Interlocking Lock Stone Blocks', 'Terracotta Finish', 'Abu Rawash Factory Stock'],
    image: UPLOADED_PHOTOS.siteBlockPallets,
    gallery: [
      {
        src: UPLOADED_PHOTOS.siteBlockPallets,
        caption: {
          en: 'Terracotta Lock Stone blocks stacked along the wall line on site',
          ar: 'تشوين بلوك لوك ستون الطوبي بطول مسار الحائط في الموقع',
        },
      },
    ],
  },
  {
    slug: 'lobby-planter-install',
    category: 'landscape',
    categoryLabel: { en: 'Landscaping & Planters', ar: 'تنسيق الحدائق والأصص' },
    title: { en: 'Cast-Stone Planters for Courtyards & Gardens', ar: 'أصص خرسانية للساحات والحدائق' },
    caption: {
      en: 'Fluted cast-stone planters in a courtyard garden setting',
      ar: 'أصص خرسانية مخددة في ساحة حدائق',
    },
    summary: {
      en: 'Cast-stone Cylinder Grey and Ribbed Barrel planters in several sizes for entrances, courtyards and gardens.',
      ar: 'أصص خرسانية مصبوبة أسطوانية ومخددة بعدة أحجام للمداخل والساحات والحدائق.',
    },
    scope: {
      en: 'Casting in standard or custom dimensions with a weather-resistant stone finish.',
      ar: 'صب بأبعاد قياسية أو مخصصة بتشطيب حجري مقاوم للعوامل الجوية.',
    },
    specs: ['POT-01C / POT-01D / POT-04', '90×100 cm to 110×125 cm', 'Cast Concrete'],
    image: UPLOADED_PHOTOS.gardenFountainShowroom,
  },
  {
    slug: 'full-terrace-elevation',
    category: 'landscape',
    categoryLabel: { en: 'Landscaping & Planters', ar: 'تنسيق الحدائق والأصص' },
    title: { en: 'Abu Rawash Showroom Garden', ar: 'حديقة عرض مصنع أبو رواش' },
    caption: {
      en: 'Abu Rawash showroom landscape showcase — fountain, walkways & GRC elements',
      ar: 'تشكيلة تنسيق الحدائق بحديقة مصنع أبو رواش — نوافير ومشايات وأعمال GRC',
    },
    summary: {
      en: 'The factory showroom garden with a cast-stone fountain, interlocking paths, GRC elements and cladding sample walls.',
      ar: 'حديقة عرض المصنع بنافورة حجرية ومشايات إنترلوك وعناصر جي آر سي وحوائط عينات التكسية.',
    },
    scope: {
      en: 'Landscape layout and execution using the factory’s own cast-stone, GRC and interlocking products.',
      ar: 'تنسيق وتنفيذ الحديقة بمنتجات المصنع من الحجر الصناعي والجي آر سي والإنترلوك.',
    },
    specs: ['Cast-Stone Fountain', 'Interlocking Paths', 'GRC Elements'],
    image: UPLOADED_PHOTOS.gardenFountainShowroom,
    gallery: [
      {
        src: UPLOADED_PHOTOS.gardenFountainShowroom,
        caption: {
          en: 'Outdoor fountain, interlocking paths & cladding sample perimeter wall',
          ar: 'النافورة الحجرية ومشايات الإنترلوك وسور عرض عينات التكسية',
        },
      },
    ],
  },
];

export const CLIENTS = [
  'Hassan Allam',
  'Palm Hills',
  'SODIC',
  'M-Squared',
  'Alamein Co. (العالمين)',
  'Al Ahly Club',
  'Marbotec (ماربوتك)',
  'Al Batal (البطل)',
  /* UNVERIFIED (not in the client's documented portfolio; restore only with proof):
     'Trustcom Contracting', 'Al-Badawi Company', 'Petrojet', 'Nile Valley Contracting',
     'Al Sharif Contracting', 'Concord Company', 'AGCO', 'Nasr City Contracting', 'Intro Group'
  */
];

export const QUOTE_INTERESTS = [
  {
    value: 'Lock Stone retaining wall',
    label: { en: 'Lock Stone retaining wall', ar: 'نظام الحوائط الساندة' },
  },
  {
    value: 'GRC decorative cladding',
    label: { en: 'GRC decorative cladding', ar: 'كسوة ديكورية' },
  },
  {
    value: 'Planters & garden range',
    label: { en: 'Planters & garden range', ar: 'أصص ومنتجات حدائق' },
  },
  {
    value: 'Other / not sure yet',
    label: { en: 'Other / not sure yet', ar: 'غير ذلك' },
  },
];

export const REGION_OPTIONS = [
  { value: 'Greater Cairo / Giza', label: { en: 'Greater Cairo / Giza', ar: 'القاهرة الكبرى / الجيزة' } },
  { value: 'North Coast', label: { en: 'North Coast / Alexandria', ar: 'الساحل الشمالي / الإسكندرية' } },
  { value: 'New Administrative Capital', label: { en: 'New Administrative Capital', ar: 'العاصمة الإدارية الجديدة' } },
  { value: 'Red Sea / Ain Sokhna', label: { en: 'Red Sea / Ain Sokhna', ar: 'البحر الأحمر / العين السخنة' } },
  { value: 'Other Egypt', label: { en: 'Other Governorate', ar: 'محافظة أخرى' } },
];

export const LOCK_STONE_VIDEOS = [
  {
    id: 'tahya-misr-engineering',
    src: asset(encodeURI('/assets/videos/شرح شركه روك ارت.mp4')),
    poster: asset('/assets/images/egyptian-wall-500500.webp'),
    title: {
      en: 'Engineering Explanation & Field Execution of the Lock Stone System — Tahya Misr 500 500 Project',
      ar: 'الشرح الهندسي والتنفيذ الميداني لنظام لوك ستون — مشروع تحيا مصر 500 500',
    },
    description: {
      en: 'A practical walkthrough from the factory yard and the execution sites: block shapes and colours, Patent 2018/1412, the Tahya Misr 500 500 wall, and the double-reinforced construction stages.',
      ar: 'شرح عملي من ساحة المصنع والمواقع التنفيذية: أشكال وألوان بلوك الكيستون، براءة الاختراع 2018/1412، حائط تحيا مصر 500 500، ومراحل التنفيذ بالتسليح المزدوج.',
    },
  },
  {
    id: 'lock-stone-intro',
    src: asset(encodeURI('/assets/videos/فيديو تعريفي للحوائط لوك ستون.mp4')),
    poster: asset('/assets/images/posters/lock-stone-intro.jpg'),
    title: {
      en: 'Lock Stone Retaining Wall System — Introduction',
      ar: 'فيديو تعريفي بنظام الحوائط الساندة لوك ستون',
    },
    description: {
      en: 'An introduction to the Lock Stone block, its interlocking and double reinforcement with fiberglass bars and geogrid.',
      ar: 'تعريف بنظام لوك ستون: البلوك المتداخل، والتسليح المزدوج بأسياخ الفيبر جلاس وشبكات الجيوغريد.',
    },
  },
];

export const LOCK_STONE_FACE_PROFILES = [
  {
    id: 'profile-straight',
    src: asset('/assets/images/face-straight.webp'),
    title: { en: 'Straight face', ar: 'الوجه المستقيم' },
    caption: { en: 'Lock Stone wall with a flat, straight block face.', ar: 'حائط لوك ستون بواجهة بلوك مستقيمة ملساء.' },
  },
  {
    id: 'profile-mountain',
    src: asset('/assets/images/face-mountain.webp'),
    title: { en: 'Mountain split face', ar: 'واجهة الكسر الجبلي' },
    caption: { en: 'Textured split mountain face, available in more than one colour.', ar: 'واجهة جبلية خشنة (كسر جبلي) متوفرة بأكثر من لون.' },
  },
  {
    id: 'profile-greek-tiles',
    src: asset('/assets/images/face-greek-tiles.webp'),
    title: { en: 'Greek tile cladding', ar: 'تكسية بالبلاط اليوناني' },
    caption: { en: 'Lock Stone blocks faced with Greek-style cladding tiles (3D illustration).', ar: 'بلوكات لوك ستون مكسوة بالبلاط اليوناني (رسم ثلاثي الأبعاد).' },
  },
  {
    id: 'profile-greek-slices',
    src: asset('/assets/images/face-greek-slices.webp'),
    title: { en: 'Greek slice cladding', ar: 'تكسية بشرائح يونانية' },
    caption: { en: 'Lock Stone blocks faced with slim horizontal Greek slices (3D illustration).', ar: 'بلوكات لوك ستون مكسوة بشرائح يونانية رفيعة أفقية (رسم ثلاثي الأبعاد).' },
  },
];

export const SITE_CONSTRUCTION_SEQUENCE = [
  {
    id: 'site-1',
    src: UPLOADED_PHOTOS.siteStringAndGeogridRolls,
    title: {
      en: '01 · Course Alignment & Geogrid Rolls Staged',
      ar: '01 · ضبط خط الخيط للمداميك وتجهيز لفات الجيوغريد',
    },
    caption: {
      en: 'Alignment string stretched over the Lock Stone course, with geogrid rolls ready behind the wall.',
      ar: 'شد خيط الميزان أعلى مدماك بلوكات لوك ستون مع تجهيز رولات شبكة الجيوغريد خلف الحائط.',
    },
  },
  {
    id: 'site-2',
    src: UPLOADED_PHOTOS.siteGeogridLongCourse,
    title: {
      en: '02 · Geogrid Laid Into the Reinforced Zone',
      ar: '02 · مد شبكات الجيوغريد داخل منطقة التسليح الخلفية',
    },
    caption: {
      en: 'Geogrid strips fixed on the block pins and extended perpendicular to the wall face into the fill.',
      ar: 'شد وتثبيت شرائط الجيوغريد على بنوز الفيبر جلاس وامتدادها عمودياً على وجه الحائط داخل منطقة الردم.',
    },
  },
  {
    id: 'site-3',
    src: UPLOADED_PHOTOS.siteCrewGeogridLaying,
    title: {
      en: '03 · Crew Fixing Geogrid on the Pins',
      ar: '03 · طاقم التنفيذ يثبّت الشبكات على البنوز',
    },
    caption: {
      en: 'The technical crew checks geogrid continuity on the pins and the straightness of the courses.',
      ar: 'متابعة الطاقم الفني لتثبيت شبكات الجيوغريد على البنوز وضبط استقامة البلوكات.',
    },
  },
  {
    id: 'site-4',
    src: UPLOADED_PHOTOS.siteGeogridSpreadWide,
    title: {
      en: '04 · Geogrid Spread Along the Wall Length',
      ar: '04 · فرد الجيوغريد على كامل طول الحائط قبل الردم',
    },
    caption: {
      en: 'Geogrid mats laid flat across the reinforced zone behind the block row, ready to receive the next fill lift.',
      ar: 'شبكات الجيوغريد مفرودة بكامل منطقة التسليح خلف صف البلوك تمهيداً لنزول طبقة الردم التالية.',
    },
  },
  {
    id: 'site-5',
    src: UPLOADED_PHOTOS.siteWaterTankerSpraying,
    title: {
      en: '05 · Water Spraying to Reach Optimum Moisture',
      ar: '05 · رش المياه لضبط الرطوبة قبل الدمك',
    },
    caption: {
      en: 'A water tanker conditions the spread fill layer to the right moisture before roller compaction.',
      ar: 'سيارة رش المياه تضبط رطوبة طبقة الردم المفروشة تمهيداً للدمك بالهراس.',
    },
  },
  {
    id: 'site-6',
    src: UPLOADED_PHOTOS.siteCrestCompaction,
    title: {
      en: '06 · Compacting the Backfill Layer',
      ar: '06 · دمك طبقة الردم خلف الحائط',
    },
    caption: {
      en: 'Fill is levelled and compacted in 30cm lifts behind the wall before the next course is built.',
      ar: 'تسوية ودمك الردم على طبقات بسمك 30 سم خلف الحائط قبل الانتقال للمدماك التالي.',
    },
  },
];

export const SHOWROOM_AND_EXPO_GALLERY = [
  {
    id: 'expo-wide',
    src: UPLOADED_PHOTOS.expoWideOverview,
    title: {
      en: 'Rock Art Pavilion A16 — Trade Exhibition Overview',
      ar: 'جناح روك آرت A16 بالمعرض — نظرة عامة',
    },
    caption: {
      en: 'Exhibition booth showcasing Rock Art Lock Stone demo wall, GRC sample boards, and circular & grid fiberglass rebar manufactured in-house.',
      ar: 'جناح المعرض يضم حائط لوك ستون تطبيقي، لوحات عينات التكسية، ولفات وشبكات التسليح بالفيبر جلاس.',
    },
  },
  {
    id: 'expo-fiberglass',
    src: UPLOADED_PHOTOS.expoTahyaMisrAndBoards,
    title: {
      en: 'Rock Art pavilion A16, fibreglass bars and Tahya Misr 500 500 display',
      ar: 'جناح روك آرت A16: أسياخ الفايبر جلاس وعرض تحيا مصر 500 500',
    },
    caption: {
      en: 'Booth display featuring non-metallic fiberglass reinforcement hoops & mats alongside the completed Tahya Misr 500 500 retaining project banner.',
      ar: 'عرض أسياخ ولفات الفيبر جلاس اللامعدنية ولوحة مشروع حائط مستشفى تحيا مصر 500 500 ولوحات عينات الحجر.',
    },
  },
  {
    id: 'expo-boards',
    src: UPLOADED_PHOTOS.expoLockStoneSampleBoards,
    title: {
      en: 'Portable Architectural Cladding Boards & Lock Stone Wall',
      ar: 'لوحات عينات التكسية المحمولة ونموذج حائط لوك ستون',
    },
    caption: {
      en: 'Over 10 portable GRC stone and brick cladding sample boards displayed with a stacked grey & terracotta Lock Stone wall.',
      ar: 'مجموعة لوحات عينات الحجر والطوب الصناعي أمام نموذج حائط لوك ستون باللونين الرمادي والطوبي.',
    },
  },
  {
    id: 'showroom-fountain',
    src: UPLOADED_PHOTOS.gardenFountainShowroom,
    title: {
      en: 'Abu Rawash Outdoor Showroom — Tiered GRC Fountain',
      ar: 'الحديقة العرضية بمصنع أبو رواش — نافورة جي آر سي الكلاسيكية',
    },
    caption: {
      en: 'Cast-stone multi-tier courtyard fountain surrounded by interlocking walkways, stone mushroom lamps, and full-size cladding display boards.',
      ar: 'نافورة حدائق خرسانية متعددة الطبقات محاطة بمشايات إنترلوك ولوحات عرض التكسية الحجرية بالمصنع.',
    },
  },
  {
    id: 'showroom-rockwork',
    src: UPLOADED_PHOTOS.gardenRockworkShowroom,
    title: {
      en: 'Sculpted GRC Artificial Rockwork Archway & Benches',
      ar: 'مغارة وصخور جي آر سي الصناعية ومقاعد الحدائق',
    },
    caption: {
      en: 'Hand-carved artificial limestone grotto and cast-stone benches at the Abu Rawash factory garden.',
      ar: 'صخور صناعية منحوتة يدوياً مع مقاعد حدائق خرسانية كلاسيكية في معرض المصنع.',
    },
  },
  {
    id: 'brochure-curbs-grc',
    src: UPLOADED_PHOTOS.brochureSlide10CurbsGrc,
    title: {
      en: 'Brochure Sheet 10 — Curbs (1001–1003), Interlocks (1005–1008) & GRC (2001–2009)',
      ar: 'كتالوج البردورات (1001–1003) والإنترلوك (1005–1008) ومنتجات G.R.C (2001–2009)',
    },
    caption: {
      en: 'Complete catalog index for precast concrete curbs (50×30×12/15 cm), interlocking pavers, fountains, fireplaces, and benches.',
      ar: 'مقاسات البردورات الخرسانية وأشكال الإنترلوك ونماذج أعمال الجي آر سي المرقمة من 2001 إلى 2009.',
    },
  },
];

export const ADDITIONAL_BRICK_VARIATIONS = [
  {
    sku: 'E-206',
    name: { en: 'Smoked Manor Brick', ar: 'طوب إنجليزي عتيق مُعتّق (E-206)' },
    description: {
      en: 'Aged burnt-terracotta and charcoal flashed English brick veneer with crisp white mortar lines.',
      ar: 'وجه طوب إنجليزي بألوان الطوب المحروق وتعتيق فحمي مع عراميس بيضاء واضحة.',
    },
    image: UPLOADED_PHOTOS.skuE206,
    colors: ['#8B351D', '#2D211D', '#C5512A', '#EFECE6'],
  },
  {
    sku: 'E-215',
    name: { en: 'Reclaimed Sand Blend Brick', ar: 'طوب إنجليزي رملي مختلط (E-215)' },
    description: {
      en: 'Warm sandy beige, soft rose terracotta, and toasted kiln-charred English brick courses with tan mortar.',
      ar: 'دمج دافئ من البيج الرملي والوردي المحروق مع لمسات تعتيق داكنة وعراميس رملية.',
    },
    image: UPLOADED_PHOTOS.skuE215,
    colors: ['#DFB48E', '#B56343', '#493D37', '#F2E7D9'],
  },
];

export function isStudioCladdingPhoto(src) {
  return typeof src === 'string' && src.includes('148566');
}

export function getProductMediaSlides(product) {
  const slides = [];

  if (product.image && isStudioCladdingPhoto(product.image)) {
    slides.push({
      id: `${product.sku}-verified-photo`,
      kind: 'photo',
      src: product.image,
      badge: product.sku,
      title: {
        en: `${product.sku} Official Rock Art Sample`,
        ar: `صورة عينة ${product.sku} المعتمدة`,
      },
      caption: {
        en: `${product.name.en} — real factory finish sample photographed in studio lighting.`,
        ar: `${product.name.ar} — صورة عينة التصنيع الفعلية من مصنع روك آرت.`,
      },
    });
  } else if (product.sku === 'GARDEN-RANGE' && product.image) {
    slides.push({
      id: `${product.sku}-verified-photo`,
      kind: 'photo',
      src: product.image,
      badge: product.sku,
      title: {
        en: `${product.sku} Official Rock Art Sample`,
        ar: `صورة عينة ${product.sku} المعتمدة`,
      },
      caption: {
        en: `${product.name.en} — Abu Rawash showroom garden installation.`,
        ar: `${product.name.ar} — صور التنفيذ الفعلية بحديقة عرض مصنع أبو رواش.`,
      },
    });
  }

  slides.push({
    id: `${product.sku}-swatch`,
    kind: 'swatch',
    title: {
      en: product.category === 'planter' ? 'Planter Showcase Visual' : 'Colorway & Relief Pattern',
      ar: product.category === 'planter' ? 'عرض التشكيلة الحجرية' : 'النمط اللوني وتوزيع الطبقات',
    },
    caption: {
      en: `${product.name.en} (${product.dimensions}) — ${product.styleOrigin.en}`,
      ar: `${product.name.ar} (${product.dimensions}) — ${product.styleOrigin.ar}`,
    },
  });

  if (product.category === 'brick') {
    slides.push(
      {
        id: 'brick-e206',
        kind: 'photo',
        src: UPLOADED_PHOTOS.skuE206,
        badge: 'E-206',
        title: {
          en: 'Finish Option: Code E-206 (Smoked Terracotta)',
          ar: 'خيار لون إضافي: كود E-206 (طوب أحمر مُعتّق)',
        },
        caption: {
          en: 'Verified Rock Art English Brick colorway E-206 — aged burnt-red & charcoal kiln blend.',
          ar: 'عينة طوب إنجليزي روك آرت كود E-206 بدرجات الأحمر المحروق والتعتيق الفحمي.',
        },
      },
      {
        id: 'brick-e215',
        kind: 'photo',
        src: UPLOADED_PHOTOS.skuE215,
        badge: 'E-215',
        title: {
          en: 'Finish Option: Code E-215 (Reclaimed Sand Blend)',
          ar: 'خيار لون إضافي: كود E-215 (طوب رملي مختلط)',
        },
        caption: {
          en: 'Verified Rock Art English Brick colorway E-215 — warm sand, terracotta & kiln accents.',
          ar: 'عينة طوب إنجليزي روك آرت كود E-215 بدرجات البيج الرملي والطوبي.',
        },
      },
      {
        id: 'brick-expo-boards',
        kind: 'photo',
        src: UPLOADED_PHOTOS.expoLockStoneSampleBoards,
        title: {
          en: 'Exhibition Display Boards',
          ar: 'لوحات العرض بالمعارض',
        },
        caption: {
          en: 'Portable English brick & stacked stone sample boards from Rock Art Expo Booth A16.',
          ar: 'لوحات عينات الطوب الإنجليزي والحجر الصناعي المعروضة بجناح A16.',
        },
      }
    );
  } else if (product.sku === 'GARDEN-RANGE') {
    slides.push(
      {
        id: 'garden-rockwork',
        kind: 'photo',
        src: UPLOADED_PHOTOS.gardenRockworkShowroom,
        title: {
          en: 'GRC Artificial Rockwork & Benches',
          ar: 'صخور جي آر سي ومقاعد الحدائق بالمصنع',
        },
        caption: {
          en: 'Carved artificial stone archway and curved benches displayed at Abu Rawash showroom garden.',
          ar: 'أعمال الصخور الصناعية والمقاعد المنحوتة بحديقة عرض مصنع أبو رواش.',
        },
      },
      {
        id: 'garden-statuary-pyramid',
        kind: 'photo',
        src: UPLOADED_PHOTOS.courtyardSteppedPyramidFront,
        title: {
          en: 'Cast-Stone Garden Statuary & Reliefs',
          ar: 'تماثيل وأعمال الجي آر سي الزخرفية للحدائق',
        },
        caption: {
          en: 'Classical decorative cast-stone statues beside slate GRC wall cladding and Lock Stone sample wall.',
          ar: 'تماثيل حدائق كلاسيكية أمام واجهة الحجر الإردوازي وجدار عينات لوك ستون.',
        },
      },
      {
        id: 'garden-catalog-2001-2009',
        kind: 'photo',
        src: UPLOADED_PHOTOS.brochureSlide10CurbsGrc,
        title: {
          en: 'Official GRC Product Index (Codes 2001–2009)',
          ar: 'دليل منتجات G.R.C الرسمي (أكواد 2001–2009)',
        },
        caption: {
          en: 'Brochure catalog showing benches (2001/2003/2009), fountains (2002/2007), fireplace mantel (2005), & rockwork (2006).',
          ar: 'نشرات روك آرت: كراسي ونوافير ومدافئ وصخور صناعية مرقمة من 2001 إلى 2009.',
        },
      }
    );
  } else if (product.category === 'planter') {
    slides.push(
      {
        id: 'planter-courtyard-fountain',
        kind: 'photo',
        src: UPLOADED_PHOTOS.gardenFountainShowroom,
        title: {
          en: 'Abu Rawash Garden Showcase Context',
          ar: 'بيئة العرض بحديقة مصنع أبو رواش',
        },
        caption: {
          en: 'Outdoor landscape installations crafted alongside our cast-stone planters.',
          ar: 'تنسيق حدائق ومسطحات خضراء منفذة بمنتجات المصنع.',
        },
      },
      {
        id: 'planter-catalog-sheet',
        kind: 'photo',
        src: UPLOADED_PHOTOS.brochureSlide10CurbsGrc,
        title: {
          en: 'Precast Concrete & GRC Catalog Sheet',
          ar: 'نشرات الخرسانة سابقة الصب و G.R.C',
        },
        caption: {
          en: 'Full factory line from precast landscape elements to GRC garden features.',
          ar: 'التشكيلة الكاملة من العناصر الخرسانية للحدائق والبردورات ومنتجات G.R.C.',
        },
      }
    );
  } else if (product.sku.startsWith('G-')) {
    slides.push(
      {
        id: 'greek-brochure-6',
        kind: 'photo',
        src: UPLOADED_PHOTOS.brochureSlide9GreekStoneGrid,
        title: {
          en: 'Greek Manufactured Stone 6-Texture Reference',
          ar: 'مرجع الحجر اليوناني المُصنع — 6 خامات',
        },
        caption: {
          en: 'Brochure Slide 9: Official 6-texture reference for weather-resistant Greek cladding walls, arches, and columns.',
          ar: 'نشرات روك آرت (لوحة 9): تشكيلة الحجر اليوناني المقاوم للعوامل المناخية للواجهات والأعمدة والأقواس.',
        },
      },
      {
        id: 'greek-facade-installed',
        kind: 'photo',
        src: UPLOADED_PHOTOS.courtyardSteppedPyramidOblique,
        title: {
          en: 'Installed Charcoal & Buff Cladding Wall',
          ar: 'تنفيذ فعلي للتكسية الحجرية على واجهة المبنى',
        },
        caption: {
          en: 'Full-scale exterior dark slate and multi-tone stone cladding installed on Rock Art’s showroom building.',
          ar: 'تجليد خارجي كامل على مبنى عرض المصنع يجمع بين الإردواز الداكن والحجر متعدد الدرجات.',
        },
      }
    );
  } else {
    slides.push(
      {
        id: 'spanish-expo-boards',
        kind: 'photo',
        src: UPLOADED_PHOTOS.expoTahyaMisrAndBoards,
        title: {
          en: 'Sample Display Boards at Expo A16',
          ar: 'لوحات عينات التكسية بجناح A16',
        },
        caption: {
          en: 'Multi-tone split-face Spanish court stone boards shown under exhibition spot lighting.',
          ar: 'لوحات عينات الحجر الأسباني متعددة الطبقات تحت الإضاءة المعمارية.',
        },
      },
      {
        id: 'spanish-greek-slide',
        kind: 'photo',
        src: UPLOADED_PHOTOS.brochureSlide9GreekStoneGrid,
        title: {
          en: 'Exterior & Interior Cladding Textures',
          ar: 'خامات التجليد للواجهات الداخلية والخارجية',
        },
        caption: {
          en: 'Cast-stone panels sealed for UV stability and freeze-thaw durability across exterior facades.',
          ar: 'ألواح حجر صناعي عالية الصلابة ومقاومة للأشعة فوق البنفسجية والعوامل المناخية.',
        },
      }
    );
  }

  return slides;
}

export const NAV_ITEMS = [
  { path: '/', label: { en: 'Home', ar: 'الرئيسية' } },
  { path: '/about', label: { en: 'About', ar: 'الشركة' } },
  { path: '/lock-stone', label: { en: 'Lock Stone', ar: 'نظام لوك ستون' } },
  { path: '/products', label: { en: 'Products', ar: 'المنتجات' } },
  { path: '/projects', label: { en: 'Projects', ar: 'أعمالنا' } },
  { path: '/contact', label: { en: 'Contact', ar: 'اتصل بنا' } },
];

export const UI_COPY = {
  navHome: { en: 'Home', ar: 'الرئيسية' },
  navAbout: { en: 'About', ar: 'الشركة' },
  navLockStone: { en: 'Lock Stone', ar: 'نظام لوك ستون' },
  navProducts: { en: 'Products', ar: 'المنتجات' },
  navProjects: { en: 'Projects', ar: 'أعمالنا' },
  navContact: { en: 'Contact', ar: 'اتصل بنا' },
  ctaQuote: { en: 'Request a Quote', ar: 'طلب عرض سعر' },
  ctaExplore: { en: 'Explore Lock Stone System', ar: 'اكتشف نظام لوك ستون' },
  claddingEyebrow: { en: 'Architectural Catalog', ar: 'كتالوج التكسية والحدائق' },
  claddingHeading: {
    en: 'GRC Stone & Brick Cladding & Cast-Stone Planters',
    ar: 'ألواح التكسية الحجرية والطوب الصناعي والأصص الخرسانية',
  },
  claddingLead: {
    en: 'Greek, Spanish and English artificial tiles for wall cladding, alongside cast-stone planters and garden fountains.',
    ar: 'بلاط صناعي يوناني وأسباني وإنجليزي لتجليد الحوائط، إلى جانب أصص ونوافير الحدائق الخرسانية.',
  },
  planterSectionTitle: {
    en: 'Cast-Stone Planters & Garden Accents',
    ar: 'أصص خرسانية ونوافير وتنسيق حدائق',
  },
  planterSectionLead: {
    en: 'Cast-stone cylinders, ribbed barrels and classical fountains for villas, compounds and lobbies.',
    ar: 'أصص خرسانية أسطوانية ومخددة ونوافير كلاسيكية للفلل والمشروعات والمداخل.',
  },
  projectsEyebrow: { en: 'Track Record', ar: 'سجل الأعمال' },
  projectsHeading: { en: 'Projects built across Egypt', ar: 'مشروعات منفذة في جميع أنحاء مصر' },
  clientsEyebrow: { en: 'Selected Clients & Partners', ar: 'من عملائنا وشركائنا' },
  contactEyebrow: { en: 'Engineering & Sales', ar: 'الهندسة والمبيعات' },
  contactHeading: { en: 'Start a Structural or Cladding Brief', ar: 'ابدأ دراسة مشروعك أو اطلب عرض سعر' },
  contactLead: {
    en: 'Share wall height, cladding area, or catalog SKUs for preliminary engineering review and pricing.',
    ar: 'شاركنا أبعاد الحائط أو مساحة التكسية أو أكواد المنتجات للحصول على تقييم هندسي وعرض سعر مبدئي.',
  },
  filterAll: { en: 'All (14)', ar: 'الكل (14)' },
  filterStone: { en: 'Stone Faces (9)', ar: 'أوجه حجرية (9)' },
  filterBrick: { en: 'English Brick (1)', ar: 'طوب إنجليزي (1)' },
  filterPlanter: { en: 'Planters & Garden (4)', ar: 'أصص وحدائق (4)' },
  formName: { en: 'Full Name / Company', ar: 'الاسم الكامل / الشركة' },
  formPhone: { en: 'Phone / WhatsApp', ar: 'الهاتف / واتساب' },
  formEmail: { en: 'Email Address', ar: 'البريد الإلكتروني' },
  formInterest: { en: 'System / Product Interest', ar: 'النظام أو المنتج المطلوب' },
  formNotes: { en: 'Project Brief & Dimensions', ar: 'تفاصيل وأبعاد المشروع' },
  formSubmit: { en: 'Send Quote Request', ar: 'إرسال طلب عرض السعر' },
};



// ---- P2 content (facts from the Method of Statement and the client's brochure only) ----
export const LOCK_STONE_EXTRA = {
  anatomy: {
    eyebrow: { en: 'Block Anatomy', ar: 'مكونات البلوك' },
    title: { en: 'Anatomy of a Lock Stone block', ar: 'تشريح بلوك لوك ستون' },
    photo: { src: SITE_PHOTOS.blockTwoHolesGrass, width: 1280, height: 960, alt: { en: 'Lock Stone block showing its two pin holes', ar: 'بلوك لوك ستون يوضح فتحتي أسياخ التثبيت' } },
    points: [
      { en: 'Trapezoidal block profile that interlocks course to course.', ar: 'قطاع شبه منحرف يتعشق مع المدماك الذي يليه.' },
      { en: 'Two pin holes per block, one FRP pin in each.', ar: 'فتحتان لكل بلوك، يوضع في كل منهما سيخ FRP واحد.' },
      { en: 'Gravel-filled core, with the tops cleaned before the next course.', ar: 'قلب البلوك مملوء بالحصى مع تنظيف السطح العلوي قبل المدماك التالي.' },
      { en: `Nominal size ${LOCK_STONE_BLOCK_SIZE.value} (${LOCK_STONE_BLOCK_SIZE.note.en}).`, ar: `المقاس الاسمي ${LOCK_STONE_BLOCK_SIZE.value} (${LOCK_STONE_BLOCK_SIZE.note.ar}).` },
    ],
  },
  drainage: {
    eyebrow: { en: 'Drainage & Compaction', ar: 'الصرف والدمك' },
    title: { en: 'Keeping water out and the fill dense', ar: 'تصريف المياه ودمك الردم' },
    cards: [
      { title: { en: 'Drain pipe', ar: 'ماسورة الصرف' }, text: { en: '4" perforated PVC pipe every 6 m at the wall base, wrapped in geotextile, sloped, and covered with clean gravel.', ar: 'ماسورة PVC مثقبة 4 بوصة كل 6 م عند قاعدة الحائط، ملفوفة بالجيوتكستايل ومائلة للصرف ومغطاة بالحصى النظيف.' } },
      { title: { en: 'Geotextile + gravel', ar: 'جيوتكستايل وحصى' }, text: { en: '30 cm of fine gravel with geotextile directly behind the wall. No soil near the wall, to avoid water retention.', ar: '30 سم من الحصى الناعم مع الجيوتكستايل خلف الحائط مباشرة، دون استخدام التربة بالقرب من الحائط لمنع احتباس المياه.' } },
      { title: { en: 'Clean sand', ar: 'رمل نظيف' }, text: { en: 'The reinforced zone is backfilled with clean sand, fines not above 5%.', ar: 'تردم منطقة التسليح برمل نظيف لا تزيد نسبة الدقائق فيه على 5%.' } },
      { title: { en: 'Compaction', ar: 'الدمك' }, text: { en: 'Lifts of 30 cm or less at 95% Standard Proctor. Plate compactor for the first 1 m behind the wall, the largest practical compactor beyond it.', ar: 'طبقات 30 سم أو أقل بنسبة 95% بروكتور قياسي. ماكينة دمك صفائحية لأول 1 م خلف الحائط، وأكبر ماكينة ممكنة بعد ذلك.' } },
    ],
    photos: [
      { src: asset('/assets/images/188539360_139591008196688_6404296255395645944_n_bbbbc417.jpg'), width: 960, height: 1150, caption: { en: 'Geogrid laid flat on compacted fill', ar: 'شبكة جيوجريد مفرودة أفقياً فوق ردم مدموك' } },
      { src: asset('/assets/images/187990650_139591094863346_8994469899080939827_n_bae1c599.jpg'), width: 960, height: 1150, caption: { en: 'Backfill and compaction in progress behind the wall', ar: 'أعمال الردم والدمك خلف الحائط' } },
    ],
  },
  curved: {
    eyebrow: { en: 'Curved & Stepped Walls', ar: 'الحوائط المنحنية والمدرجة' },
    title: { en: 'Curves, steps and terraces', ar: 'منحنيات ومدرجات وتراسات' },
    photos: [
      { src: asset('/assets/images/egyptian-wall-500500.webp'), width: 1600, height: 900, caption: { en: 'The Tahya Misr 500 500 wall: a white Lock Stone face that carries the project sign, structure and signboard in one.', ar: 'حائط تحيا مصر 500 500: واجهة لوك ستون بيضاء تحمل لافتة المشروع، فتجتمع الإنشاء واللافتة في جدار واحد.' } },
      { src: asset('/assets/projects/project-04-curved-white-wall-sand.webp'), width: 1195, height: 1600, caption: { en: 'Curved white Lock Stone wall', ar: 'حائط لوك ستون أبيض منحنٍ' } },
      { src: asset('/assets/projects/project-21-curved-white-wall-blue-sky.webp'), width: 1195, height: 1600, caption: { en: 'Curved wall following the site boundary', ar: 'حائط منحنٍ يتبع حدود الموقع' } },
      { src: asset('/assets/projects/project-18-curved-grey-wall-large.webp'), width: 1262, height: 1600, caption: { en: 'Large curved grey Lock Stone wall', ar: 'حائط لوك ستون رمادي منحنٍ كبير' } },
      { src: SITE_PHOTOS.curvedSteppedWallA, width: 960, height: 1280, caption: { en: 'Curved stepped Lock Stone wall', ar: 'حائط لوك ستون منحنٍ ومدرج' } },
      { src: SITE_PHOTOS.curvedSteppedWallB, width: 960, height: 1280, caption: { en: 'Curved stepped Lock Stone wall, second view', ar: 'حائط لوك ستون منحنٍ ومدرج، زاوية أخرى' } },
      { src: SITE_PHOTOS.steppedWallTrees, width: 960, height: 1280, caption: { en: 'Stepped Lock Stone wall with planted trees', ar: 'حائط لوك ستون مدرج مع أشجار' } },
      { src: SITE_PHOTOS.terracedTurfCurvedEdge, width: 960, height: 1280, caption: { en: 'Terraced Lock Stone retaining wall with turf shelves', ar: 'حائط ساند لوك ستون مدرج بمساطب عشب' } },
      { src: SITE_PHOTOS.terracedTurfVertical, width: 1200, height: 1600, caption: { en: 'Terraced Lock Stone retaining wall with turf shelves', ar: 'حائط ساند لوك ستون مدرج بمساطب عشب' } },
      { src: SITE_PHOTOS.terracedTurfWide, width: 1200, height: 1600, caption: { en: 'Wide view of terraced Lock Stone walls', ar: 'منظر واسع لحوائط لوك ستون المدرجة' } },
    ],
  },
};

export const PORTFOLIO_REFERENCES = {
  eyebrow: { en: 'Selected References', ar: 'مراجع مختارة' },
  title: { en: 'Selected references', ar: 'مراجع مختارة من أعمالنا' },
  items: [
    { en: 'Palm Hills New Alexandria', ar: 'بالم هيلز الإسكندرية الجديدة' },
    { en: 'Hospital 500500, Sheikh Zayed (Tahya Misr 500 500 wall)', ar: 'مستشفى 500 500 بالشيخ زايد (حائط تحيا مصر 500 500)' },
    { en: 'June, Ras El Hekma (SODIC)', ar: 'قرية June براس الحكمة (سوديك)' },
    { en: 'Masyaf (M-Square)', ar: 'قرية Masyaf (M-Square)' },
    { en: 'Amwaj, Alamein (Alamein Co.)', ar: 'قرية أمواج العلمين (شركة العالمين)' },
    { en: 'Mall wall, Al Khamayel, Sheikh Zayed', ar: 'حائط المول التجاري، مدينة الخمائل بالشيخ زايد' },
    { en: 'Hotel wall, Al Khamayel, Sheikh Zayed', ar: 'حائط الفندق، مدينة الخمائل بالشيخ زايد' },
    { en: 'Green Highland, Nasr City', ar: 'كمبوند جرين هايلاند بمدينة نصر' },
    { en: 'Yuton Paints plant, 10th of Ramadan (Hassan Allam)', ar: 'مصنع يوتن للدهانات بالعاشر من رمضان (حسن علام)' },
    { en: 'High-speed rail stations, New Administrative Capital (Hassan Allam)', ar: 'محطات القطار السريع بالعاصمة الإدارية (حسن علام)' },
    { en: 'SwanLake, Ras El Hekma (Hassan Allam)', ar: 'قرية SwanLake براس الحكمة (حسن علام)' },
    { en: 'Al Ahly Club, Sheikh Zayed branch', ar: 'النادي الأهلي، فرع الشيخ زايد' },
    { en: 'Factory 81 (military)', ar: 'مصنع 81 حربي' },
    { en: 'Egyptian Military Academy, New Capital (Marbotec)', ar: 'الأكاديمية العسكرية المصرية بالعاصمة (ماربوتك)' },
    { en: 'Dar Misr, 5th Settlement', ar: 'مشروع دار مصر بالتجمع الخامس' },
    { en: 'Badia, 6th of October City', ar: 'مشروع بادية بمدينة السادس من أكتوبر' },
    { en: 'Rock White compound (Al Batal Co.)', ar: 'كمبوند روك وايت (شركة البطل)' },
  ],
};

// 21 new project photos (generic captions on purpose: the project behind each photo is unconfirmed).
export const PROJECT_PHOTOS = [
  { src: asset('/assets/projects/project-01-stone-wall-stairs-geotextile.webp'), width: 1462, height: 1600, caption: { en: 'Stone retaining wall with stairs and geotextile', ar: 'جدار ساند حجري مع سلالم وجيوتكستايل' } },
  { src: asset('/assets/projects/project-02-collage-wall-villas-and-curb-trench.webp'), width: 1195, height: 1600, caption: { en: 'Retaining wall beside villas and a curb trench', ar: 'جدار ساند بجوار فيلات وخندق بردورة' } },
  { src: asset('/assets/projects/project-04-curved-white-wall-sand.webp'), width: 1195, height: 1600, caption: { en: 'Curved white Lock Stone wall', ar: 'حائط لوك ستون أبيض منحنٍ' } },
  { src: asset('/assets/projects/project-05-stone-wall-bench-balustrade.webp'), width: 1513, height: 1600, caption: { en: 'Stone wall with bench blocks and balustrade', ar: 'حائط حجري مع بلوكات مقاعد وسور بلاستر' } },
  { src: asset('/assets/projects/project-07-stone-wall-stairs-paving.webp'), width: 1204, height: 1600, caption: { en: 'Stone wall flanking a stair with paving', ar: 'حائط حجري على جانبي سلم مع بلاط' } },
  { src: asset('/assets/projects/project-09-geogrid-slope-beside-wall.webp'), width: 1390, height: 1600, caption: { en: 'Geogrid laid on a slope beside a wall', ar: 'شبكة جيوجريد على منحدر بجوار حائط' } },
  { src: asset('/assets/projects/project-10-stone-wall-stairs-wide.webp'), width: 1600, height: 894, caption: { en: 'Stone wall flanking a stair, wide view', ar: 'حائط حجري على جانبي سلم، منظر واسع' } },
  { src: asset('/assets/projects/project-11-geogrid-backfill-site.webp'), width: 1404, height: 1600, caption: { en: 'Geogrid and backfill on site', ar: 'شبكة جيوجريد وأعمال الردم بالموقع' } },
  { src: asset('/assets/projects/project-13-terraced-turf-plaza-construction.webp'), width: 1405, height: 1600, caption: { en: 'Terraced turf walls beside a plaza under construction', ar: 'حوائط مدرجة بمساطب عشب بجوار ساحة تحت الإنشاء' } },
  { src: asset('/assets/projects/project-14-excavation-trench-heavy-machinery.webp'), width: 1195, height: 1600, caption: { en: 'Excavation trench with heavy machinery', ar: 'خندق حفر بمعدات ثقيلة' } },
  { src: asset('/assets/projects/project-15-long-white-wall.webp'), width: 1282, height: 1600, caption: { en: 'Long white Lock Stone wall', ar: 'حائط لوك ستون أبيض طويل' } },
  { src: asset('/assets/projects/project-16-wall-geogrid-drainage-houses.webp'), width: 1195, height: 1600, caption: { en: 'Wall with geogrid and drainage works', ar: 'حائط بأعمال جيوجريد وصرف' } },
  { src: asset('/assets/projects/project-17-access-road-along-wall.webp'), width: 1378, height: 1600, caption: { en: 'Access road along a retaining wall', ar: 'طريق بجوار حائط ساند' } },
  { src: asset('/assets/projects/project-18-curved-grey-wall-large.webp'), width: 1262, height: 1600, caption: { en: 'Large curved grey Lock Stone wall', ar: 'حائط لوك ستون رمادي منحنٍ كبير' } },
  { src: asset('/assets/projects/project-20-crew-on-grey-wall.webp'), width: 1275, height: 1600, caption: { en: 'Crew working on a grey Lock Stone wall', ar: 'فريق يعمل على حائط لوك ستون رمادي' } },
  { src: asset('/assets/projects/project-21-curved-white-wall-blue-sky.webp'), width: 1195, height: 1600, caption: { en: 'Curved white Lock Stone wall under blue sky', ar: 'حائط لوك ستون أبيض منحنٍ' } },
  { src: asset('/assets/projects/project-24-long-grey-wall-wide-angle.webp'), width: 1389, height: 1600, caption: { en: 'Long grey Lock Stone wall, wide angle', ar: 'حائط لوك ستون رمادي طويل بزاوية واسعة' } },
  { src: asset('/assets/projects/project-25-stone-wall-villas-wide.webp'), width: 1600, height: 736, caption: { en: 'Stone retaining wall near villas', ar: 'حائط ساند حجري بجوار فيلات' } },
  { src: asset('/assets/projects/project-26-collage-two-walls-villas.webp'), width: 1476, height: 1600, caption: { en: 'Two stone retaining walls near villas', ar: 'حائطان ساندان حجريان بجوار فيلات' } },
  { src: asset('/assets/projects/project-27-geogrid-large-slope.webp'), width: 1195, height: 1600, caption: { en: 'Geogrid across a large slope', ar: 'شبكة جيوجريد على منحدر كبير' } },
  { src: asset('/assets/projects/project-28-curved-wall-geogrid-drainage.webp'), width: 1383, height: 1600, caption: { en: 'Curved wall with geogrid and drainage', ar: 'حائط منحنٍ بجيوجريد وصرف' } },
];

// Home page photo strip: picks from PROJECT_PHOTOS by file number (generic captions only).
export const HOME_FIELD_STRIP = {
  eyebrow: { en: 'From the Field', ar: 'من موقع العمل' },
  title: { en: 'Lock Stone walls on site', ar: 'حوائط لوك ستون في مواقع التنفيذ' },
  numbers: ['13', '18', '21', '25', '11', '27'],
};
