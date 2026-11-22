/**
 * AIAPGET StudyBuddy - Complete Ayurveda PG Syllabus Data
 * 3 Categories: Major Samhitas (Brihattrayi), Minor Samhitas (Laghutrayi & Others), 15 BAMS Subjects
 * With priority badges: High-Yield, Core, Scoring
 */

const DEFAULT_SYLLABUS = [
  // ==========================================
  // CATEGORY 1: MAJOR SAMHITAS (BRIHATTRAYI)
  // ==========================================
  {
    id: 'charaka-samhita',
    category: 'brihattrayi',
    categoryName: 'Major Samhitas (Brihattrayi)',
    title: 'Charaka Samhita',
    sanskritTitle: 'चरक संहिता (पूर्वार्ध व उत्तरार्ध)',
    author: 'Acharya Charaka / Dridhabala',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Foundational pillar of Kayachikitsa with 120 Adhyayas across 8 Sthanas.',
    topics: [
      {
        id: 'cs-sutra',
        name: 'Sutra Sthana (Chatushkas)',
        sanskrit: 'सूत्रस्थानम् (३० अध्यायाः)',
        priority: 'High-Yield',
        completed: true,
        subtopics: [
          { id: 'cs-s-1', name: 'Bheshaja Chatushka (Adhyaya 1-4: Dirghanjivitiya, Apamarga, Aragvadhiya, Shadvirechana)', completed: true },
          { id: 'cs-s-2', name: 'Swastha Chatushka (Adhyaya 5-8: Matrashitiya, Tasyashitiya, Navegandharaniya, Indriyopakramaniya)', completed: true },
          { id: 'cs-s-3', name: 'Nirdesha Chatushka (Adhyaya 9-12: Khuddakachatushpada, Mahachatushpada, Tisreshaniya, Vatakalakaliya)', completed: true },
          { id: 'cs-s-4', name: 'Kalpana Chatushka (Adhyaya 13-16: Snehana, Swedana, Upakalpaniya, Chikitsaprabhritiya)', completed: true },
          { id: 'cs-s-5', name: 'Roga Chatushka (Adhyaya 17-20: Kiyanta Shirasiya, Trishothiya, Ashtauninditiya, Maharoga)', completed: true },
          { id: 'cs-s-6', name: 'Yojana Chatushka (Adhyaya 21-24: Ashtauninditiya, Langhana Brimhaniya, Santarpaniya, Vidhishonitiya)', completed: true },
          { id: 'cs-s-7', name: 'Annapana Chatushka (Adhyaya 25-28: Yajjapurushiya, Atreyabhadrakapyiya, Annapanavidhi, Vividhashitapitiya)', completed: true },
          { id: 'cs-s-8', name: 'Sangraha Dwaya (Adhyaya 29-30: Dasha Pranayatana, Arthedashamahamuliya)', completed: true }
        ]
      },
      {
        id: 'cs-nidana',
        name: 'Nidana Sthana',
        sanskrit: 'निदानस्थानम् (८ अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'cs-n-1', name: 'Jwara Nidana (Vyadhi Samprapti, Lakshana, Shadavidha Jwara)', completed: true },
          { id: 'cs-n-2', name: 'Raktapitta Nidana (Hetu, Gati, Sadhya-Asadhyata)', completed: true },
          { id: 'cs-n-3', name: 'Gulma Nidana (Panchavidha Gulma Lakshana)', completed: false },
          { id: 'cs-n-4', name: 'Prameha Nidana (20 Prameha Bhedas, Doshik association)', completed: false },
          { id: 'cs-n-5', name: 'Kushtha Nidana (7 Mahakushtha, 11 Kshudrakushtha)', completed: false },
          { id: 'cs-n-6', name: 'Shosha Nidana (Caturvidha Hetu, Roopa)', completed: false },
          { id: 'cs-n-7', name: 'Unmada Nidana (Nija, Agantuja, Lakshana)', completed: false },
          { id: 'cs-n-8', name: 'Apasmara Nidana (Vega, Nidana, Lakshana)', completed: false }
        ]
      },
      {
        id: 'cs-vimana',
        name: 'Vimana Sthana',
        sanskrit: 'विमानस्थानम् (८ अध्यायाः)',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'cs-v-1', name: 'Rasa Vimana (Rasa Sankhya, Pariksha, Ahara Vidhi)', completed: false },
          { id: 'cs-v-2', name: 'Trividha Kukshiya (Ahara Matra, Ama Lakshana)', completed: false },
          { id: 'cs-v-3', name: 'Janapadoddhwamsa Vimana (Vayu, Jala, Desha, Kala Dushti & Daiva Vyapashraya)', completed: false },
          { id: 'cs-v-4', name: 'Trividha Roga Vishesha Vijnaniya (Aptopadesha, Pratyaksha, Anumana)', completed: false },
          { id: 'cs-v-5', name: 'Srotovimana (Pranavaha to Shukravaha Srotas Mula & Dushti Lakshana)', completed: false },
          { id: 'cs-v-6', name: 'Roganika Vimana (Vyadhi Bhedas, Prakruti-Vikruti)', completed: false },
          { id: 'cs-v-7', name: 'Vyadhitasmarupiya (Krimi Sankhya, Lakshana, Chikitsa)', completed: false },
          { id: 'cs-v-8', name: 'Rogabhishagjitiya (Dashavidha Parikshya Bhava, Vadamarga, Sambhasha Parishad)', completed: false }
        ]
      },
      {
        id: 'cs-sharira',
        name: 'Sharira Sthana',
        sanskrit: 'शारीरस्थानम् (८ अध्यायाः)',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'cs-sh-1', name: 'Katidhapurushiya (Purusha Tatva, Moksha Marg)', completed: false },
          { id: 'cs-sh-2', name: 'Atulyagotriya (Garbhadhana, Gotra, Samskara)', completed: false },
          { id: 'cs-sh-3', name: 'Khuddika Garbhavakranti (Garbhotpatti Bhavas)', completed: false },
          { id: 'cs-sh-4', name: 'Mahati Garbhavakranti (Masanumashika Garbhavriddhi)', completed: false },
          { id: 'cs-sh-5', name: 'Purushavichaya (Loka-Purusha Samya Siddhanta)', completed: false },
          { id: 'cs-sh-6', name: 'Shariravichaya (Sharira Guna, Pramana)', completed: false },
          { id: 'cs-sh-7', name: 'Sharirasankhya (Anga, Pratyanga, Asthi, Peshi, Sira Sankhya)', completed: false },
          { id: 'cs-sh-8', name: 'Jatisutriya (Sutikagara, Jatakarma, Shishu Paricharya)', completed: false }
        ]
      },
      {
        id: 'cs-indriya',
        name: 'Indriya Sthana',
        sanskrit: 'इन्द्रियस्थानम् (१२ अध्यायाः - अरिष्ट लक्षण)',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'cs-i-1', name: 'Varna-Svariya & Pushpitaka (Visual & auditory arishta)', completed: false },
          { id: 'cs-i-2', name: 'Parimarshaniya & Indriyanika (Tactile & sensory arishta)', completed: false },
          { id: 'cs-i-3', name: 'Pannarupiya & Avaasirasiya (Shadows & reflection signs)', completed: false },
          { id: 'cs-i-4', name: 'Katamanishaririya & Gomayachurniya (Fatal milestones)', completed: false }
        ]
      },
      {
        id: 'cs-chikitsa',
        name: 'Chikitsa Sthana (Purvardha & Uttarardha)',
        sanskrit: 'चिकित्सास्थानम् (३० अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'cs-c-1', name: 'Rasayana Adhyaya (4 Padas: Abhayamlakiya, Pranakamiye, Karapracitya, Ayurvedasamutthaniya)', completed: false },
          { id: 'cs-c-2', name: 'Vajikarana Adhyaya (4 Padas: Samyojan, Asiktakshiriya, Mashaparnabhritiya, Pumansavan)', completed: false },
          { id: 'cs-c-3', name: 'Jwara Chikitsa (Sannipata, Vishama, Jwaramukta Lakshana, Famous Yogas)', completed: false },
          { id: 'cs-c-4', name: 'Raktapitta & Gulma Chikitsa (Virechana, Vamana, Yogas)', completed: false },
          { id: 'cs-c-5', name: 'Prameha & Kushtha Chikitsa (Shodhana, Shamana, Shilajatu, Tuvaraka)', completed: false },
          { id: 'cs-c-6', name: 'Rajayakshma & Arsha Chikitsa (Ekadasha Roopa, Bheshaja, Shastra)', completed: false },
          { id: 'cs-c-7', name: 'Atisara, Grahani & Visarpa Chikitsa (Panchamrita Parpati, Takrarishta)', completed: false },
          { id: 'cs-c-8', name: 'Madatyaya, Dvivraniya & Upasarga Chikitsa', completed: false },
          { id: 'cs-c-9', name: 'Vatavyadhi & Vatarakta Chikitsa (Taila, Ghrita, Basti formulations)', completed: false }
        ]
      },
      {
        id: 'cs-kalpa-siddhi',
        name: 'Kalpa & Siddhi Sthana',
        sanskrit: 'कल्प व सिद्धीस्थानम् (१२+१२ अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'cs-k-1', name: 'Vamana Kalpa (Madana Phala 133 yogas, Jimutaka 39, Ikshwaku 45, Dhamargava 60, Vatsaka 18, Kritavedhana 60)', completed: false },
          { id: 'cs-k-2', name: 'Virechana Kalpa (Shyama Trivrit 110, Chaturangula 12, Tilwaka 16, Mahavriksha 20, Saptala 39, Danti 48)', completed: false },
          { id: 'cs-sd-1', name: 'Kalpana Siddhi & Panchakarma Vyapad (Basti netra, putaka, vyapad)', completed: false },
          { id: 'cs-sd-2', name: 'Uttarabasti & Phalamatra Siddhi (Matra, netra pramana, indications)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sushruta-samhita',
    category: 'brihattrayi',
    categoryName: 'Major Samhitas (Brihattrayi)',
    title: 'Sushruta Samhita',
    sanskritTitle: 'सुश्रुत संहिता',
    author: 'Acharya Sushruta / Nagarjuna',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Premier authority on Shalya Tantra, Anatomy (Sharira), and Surgical principles.',
    topics: [
      {
        id: 'ss-sutra',
        name: 'Sutra Sthana',
        sanskrit: 'सूत्रस्थानम् (४६ अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ss-s-1', name: 'Yantra & Shastra Vijnaniya (101 Yantras, 20 Shastras, Anushastras)', completed: true },
          { id: 'ss-s-2', name: 'Kshara Paka & Ksharasutra Vidhi (Mrudu, Madhya, Tikshna Kshara)', completed: false },
          { id: 'ss-s-3', name: 'Agnikarma Vidhi (Upakarana, Dahana Vishesha, Samyak Dagdha)', completed: false },
          { id: 'ss-s-4', name: 'Jalaukavacharana Vidhi (12 Jalaukas: 6 Savisha, 6 Nirvisha)', completed: false },
          { id: 'ss-s-5', name: 'Vrana Prashna & Dvivraniya (Shuddha Vrana, Shashti Upakrama)', completed: false },
          { id: 'ss-s-6', name: 'Vranalepana, Bandhana & Karna Vyadhana Vidhi (14 Bandha types)', completed: false },
          { id: 'ss-s-7', name: 'Visravana Vidhi & Siravyadha (Sira Sankhya, Vedhya & Avedhya Sira)', completed: false },
          { id: 'ss-s-8', name: 'Amotpatti, Shat Kriya Kala & Doshadhatu Mala Kshaya Vriddhi', completed: false }
        ]
      },
      {
        id: 'ss-sharira',
        name: 'Sharira Sthana',
        sanskrit: 'शारीरस्थानम् (१० अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ss-sh-1', name: 'Sarvabhuta Chinta & Sukra Shonita Shuddhi', completed: false },
          { id: 'ss-sh-2', name: 'Garbhavakranti & Garbha Vyakarana (Organogenesis order)', completed: false },
          { id: 'ss-sh-3', name: 'Sharirasankhya Vyakhyana (Pramana, Tvacha 7 layers, Dhatus)', completed: false },
          { id: 'ss-sh-4', name: 'Pratyeka Marma Nirdesha (107 Marmas: 5 categories by injury & tissue)', completed: false },
          { id: 'ss-sh-5', name: 'Sira Varna Vibhaga & Dhamani Vyakhyana', completed: false }
        ]
      },
      {
        id: 'ss-nidana',
        name: 'Nidana Sthana',
        sanskrit: 'निदानस्थानम् (१६ अध्यायाः)',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'ss-n-1', name: 'Vatavyadhi & Arsha Nidana (Nirukti, Bhedas, Lakshanas)', completed: false },
          { id: 'ss-n-2', name: 'Ashmari & Bhagandara Nidana (4 Ashmari, 5 Bhagandara)', completed: false },
          { id: 'ss-n-3', name: 'Kushtha, Prameha & Udara Nidana', completed: false },
          { id: 'ss-n-4', name: 'Bhagna & Granthi-Apachi-Arbuda-Galaganda Nidana', completed: false }
        ]
      },
      {
        id: 'ss-chikitsa',
        name: 'Chikitsa Sthana',
        sanskrit: 'चिकित्सास्थानम् (४० अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ss-c-1', name: 'Dvivraniya & Sadyovrana Chikitsa (Shashti Upakrama)', completed: false },
          { id: 'ss-c-2', name: 'Bhagna Chikitsa (Kandabhagna, Sandhimukta, Lepa)', completed: false },
          { id: 'ss-c-3', name: 'Ashmari & Bhagandara Shalya Karma (Ashmari Harana Operation)', completed: false },
          { id: 'ss-c-4', name: 'Arsha Chikitsa (Bheshaja, Kshara, Agni, Shastra Vidhi)', completed: false },
          { id: 'ss-c-5', name: 'Rasayana & Vajikarana Vidhi (Soma, Ayushkamiya)', completed: false }
        ]
      },
      {
        id: 'ss-kalpa',
        name: 'Kalpa Sthana',
        sanskrit: 'कल्पस्थानम् (८ अध्यायाः - अगदतन्त्र)',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'ss-k-1', name: 'Annapanaraksha & Sthavara Visha Kalpa', completed: false },
          { id: 'ss-k-2', name: 'Jangama Visha & Sarpa Dashta Kalpa (Darvikara, Mandali, Rajiman)', completed: false },
          { id: 'ss-k-3', name: 'Keeta, Mooshika & Alarka Visha Chikitsa', completed: false },
          { id: 'ss-k-4', name: 'Dundubhiswaniya (Kshara Agada, Duryodhara Agada)', completed: false }
        ]
      },
      {
        id: 'ss-uttara',
        name: 'Uttara Tantra',
        sanskrit: 'उत्तरतन्त्रम् (६६ अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ss-u-1', name: 'Netra Roga Vijnana (Adhyaya 1-19: 76 Netra Rogas, Shastra/Ashastra karma)', completed: false },
          { id: 'ss-u-2', name: 'Karna, Nasa & Shiro Rogas (Adhyaya 20-26: Badhirya, Pinasa, Shirahshula)', completed: false },
          { id: 'ss-u-3', name: 'Mukha Rogas (Adhyaya 27-38: 67 Mukha Rogas, Danta, Jihva, Talu, Kantha)', completed: false },
          { id: 'ss-u-4', name: 'Graha Roga & Kaumarabhritya chapters (Adhyaya 27-37 in Kaumara section)', completed: false },
          { id: 'ss-u-5', name: 'Kayachikitsa in Uttaratantra (Jwara, Atisara, Pandu, Hridroga, Gulma)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'ashtanga-hridaya',
    category: 'brihattrayi',
    categoryName: 'Major Samhitas (Brihattrayi)',
    title: 'Ashtanga Hridaya',
    sanskritTitle: 'अष्टाङ्ग हृदयम्',
    author: 'Acharya Vagbhata',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Poetic synthesis of Charaka and Sushruta with 120 Adhyayas across 6 Sthanas.',
    topics: [
      {
        id: 'ah-sutra',
        name: 'Sutra Sthana',
        sanskrit: 'सूत्रस्थानम् (३० अध्यायाः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ah-s-1', name: 'Ayushkamiya & Dinacharya (Brahma Muhurta to Anjana, Tambula)', completed: true },
          { id: 'ah-s-2', name: 'Ritucharya Adhyaya (Shad Ritus, Chaya-Kopa-Prashama of Doshas)', completed: true },
          { id: 'ah-s-3', name: 'Roganutpadaniya Adhyaya (13 Adharaniya Vegas & Shodhana)', completed: false },
          { id: 'ah-s-4', name: 'Doshabhediya & Doshopakramaniya (Panchavidha Doshas, Sthana, Karma)', completed: false },
          { id: 'ah-s-5', name: 'Dravadravya & Annaswarupa Vijnaniya (Jala, Kshira, Ikshu, Madhu, Taila, Mamsa)', completed: false },
          { id: 'ah-s-6', name: 'Matrashitiya & Dvividhopakramaniya (Brimhana, Langhana)', completed: false },
          { id: 'ah-s-7', name: 'Shodhana, Siravyadha & Shalyaharana Vidhi', completed: false }
        ]
      },
      {
        id: 'ah-sharira-nidana',
        name: 'Sharira & Nidana Sthana',
        sanskrit: 'शारीर व निदानस्थानम्',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'ah-sn-1', name: 'Garbhotpatti & Angavibhaga Sharira', completed: false },
          { id: 'ah-sn-2', name: 'Marma Sharira & Doshadi Vijnaniya', completed: false },
          { id: 'ah-sn-3', name: 'Sarva Roga Nidana (Jwara, Raktapitta, Shwasa, Kasa, Madatyaya)', completed: false },
          { id: 'ah-sn-4', name: 'Vatavyadhi, Vatarakta, Kushta, Prameha Nidana', completed: false }
        ]
      },
      {
        id: 'ah-chikitsa-kalpa',
        name: 'Chikitsa, Kalpa & Uttarasthana',
        sanskrit: 'चिकित्सा, कल्प व उत्तरस्थानम्',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ah-ck-1', name: 'Jwara Chikitsa (Amashayottha, Pachana, Kashayas)', completed: false },
          { id: 'ah-ck-2', name: 'Shwasa, Kasa, Yakshma & Rajayakshma Chikitsa', completed: false },
          { id: 'ah-ck-3', name: 'Panchakarma Kalpa (Vamana, Virechana, Basti Siddhi)', completed: false },
          { id: 'ah-ck-4', name: 'Uttarasthana Highlights (Balopacharaniya, Shalakya, Rasayana, Vajikarana)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'ashtanga-sangraha',
    category: 'brihattrayi',
    categoryName: 'Major Samhitas (Brihattrayi)',
    title: 'Ashtanga Sangraha',
    sanskritTitle: 'अष्टाङ्ग सङ्ग्रहः',
    author: 'Vriddha Vagbhata',
    priority: 'Core',
    priorityColor: 'indigo',
    description: 'Extensive prose & poetry classic; key distinct views compared with Hridaya.',
    topics: [
      {
        id: 'as-unique',
        name: 'Unique Concepts of Sangraha',
        sanskrit: 'अष्टाङ्गसङ्ग्रह विशेष सिद्धान्ताः',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'as-u-1', name: '40 Adhyayas of Sutrasthana (10 more than Hridaya)', completed: false },
          { id: 'as-u-2', name: 'Detailed commentary references (Indu Shashilekha)', completed: false },
          { id: 'as-u-3', name: 'Specific Shalya & Shalakya variations from Sushruta', completed: false },
          { id: 'as-u-4', name: 'Unique drug formulations and Srotas descriptions', completed: false }
        ]
      }
    ]
  },

  // ==========================================
  // CATEGORY 2: MINOR SAMHITAS (LAGHUTRAYI & OTHERS)
  // ==========================================
  {
    id: 'madhava-nidana',
    category: 'laghutrayi',
    categoryName: 'Minor Samhitas (Laghutrayi & Others)',
    title: 'Madhava Nidana',
    sanskritTitle: 'माधव निदानम् (रोगविनिश्चयः)',
    author: 'Acharya Madhavakara',
    priority: 'Scoring',
    priorityColor: 'emerald',
    description: 'Gold standard clinical diagnostic reference with 79 chapters.',
    topics: [
      {
        id: 'mn-purvardha',
        name: 'Purvardha (Major Clinical Conditions)',
        sanskrit: 'पूर्वार्ध (ज्वरादि उदरांताः)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'mn-p-1', name: 'Pancha Nidana Siddhanta (Nidana, Purvarupa, Rupa, Upashaya, Samprapti)', completed: false },
          { id: 'mn-p-2', name: 'Jwara to Raktapitta & Rajayakshma', completed: false },
          { id: 'mn-p-3', name: 'Amlapitta, Shula, Parinamashula & Annadravashula (Madhava pioneering classification)', completed: false },
          { id: 'mn-p-4', name: 'Prameha, Medoroga, Udara Roga & Ashmari', completed: false }
        ]
      },
      {
        id: 'mn-uttarardha',
        name: 'Uttarardha (Specialties & Minor Disorders)',
        sanskrit: 'उत्तरार्ध (क्षुद्ररोग, शालक्य, कौमार)',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'mn-u-1', name: 'Kshudraroga (43 conditions - Ajagallika to Indralupta)', completed: false },
          { id: 'mn-u-2', name: 'Shiro, Karna, Nasa, Mukha & Netra Rogas', completed: false },
          { id: 'mn-u-3', name: 'Stri Roga & Bala Roga diagnostic profiles', completed: false },
          { id: 'mn-u-4', name: 'Visha Roga & Keeta/Luta classification', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sharangadhara-samhita',
    category: 'laghutrayi',
    categoryName: 'Minor Samhitas (Laghutrayi & Others)',
    title: 'Sharangadhara Samhita',
    sanskritTitle: 'शार्ङ्गधर संहिता',
    author: 'Acharya Sharangadhara',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Cornerstone of Bhaishajya Kalpana, Nadi Pariksha, and Respiration physiology.',
    topics: [
      {
        id: 'sha-prathama',
        name: 'Prathama Khanda (Fundamentals)',
        sanskrit: 'प्रथम खण्ड (परिभाषा, नाडीपरीक्षा)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'sha-pr-1', name: 'Paribhasha Prakarana (Deepana, Pachana, Sanshamana, Pramathi, etc.)', completed: true },
          { id: 'sha-pr-2', name: 'Mana Paribhasha (Magadha & Kalinga mana weights & measures)', completed: false },
          { id: 'sha-pr-3', name: 'Nadi Pariksha & Svasochhvasa Kriya (Shvasana physiological sloka)', completed: false },
          { id: 'sha-pr-4', name: 'Kala & Ritu Vibhaga (Aushadha Sevana Kala 10 types)', completed: false }
        ]
      },
      {
        id: 'sha-madhyama',
        name: 'Madhyama Khanda (Pharmacy Formulations)',
        sanskrit: 'मध्यम खण्ड (कषाय, चूर्ण, वटी, घृत, तैल, रस)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'sha-m-1', name: 'Panchavidha Kashaya Kalpana (Swarasa, Kalka, Kwatha, Hima, Phanta)', completed: true },
          { id: 'sha-m-2', name: 'Churna, Vati, Gutika, Avaleha Kalpana specifications', completed: false },
          { id: 'sha-m-3', name: 'Sneha Paka Vidhi (Mridu, Madhya, Khara Paka testing & lakshana)', completed: false },
          { id: 'sha-m-4', name: 'Sandhana Kalpana (Asava, Arishta, Sura, Shukta preparation)', completed: false },
          { id: 'sha-m-5', name: 'Dhatu Shodhana, Marana & Bhasma Pariksha', completed: false }
        ]
      },
      {
        id: 'sha-uttara',
        name: 'Uttara Khanda (Therapeutics & Upakrama)',
        sanskrit: 'उत्तर खण्ड (स्नेहन, स्वेदन, बस्ति, नस्य, नेत्रकर्म)',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'sha-u-1', name: 'Snehadhyaya, Swedana, Vamana & Virechana Vidhi', completed: false },
          { id: 'sha-u-2', name: 'Basti Kalpana (Anuvasana, Niruha, Matra Basti dosages)', completed: false },
          { id: 'sha-u-3', name: 'Nasya Vidhi, Dhumapana, Gandusha & Kavala', completed: false },
          { id: 'sha-u-4', name: 'Lepa, Shonitasravana & Netrakarma (Seka, Aschyotana, Tarpana)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'bhavaprakasha',
    category: 'laghutrayi',
    categoryName: 'Minor Samhitas (Laghutrayi & Others)',
    title: 'Bhavaprakasha',
    sanskritTitle: 'भावप्रकाश (भावमिश्र)',
    author: 'Acharya Bhavamishra',
    priority: 'Core',
    priorityColor: 'indigo',
    description: 'Renowned for Nighantu Varga, introduction of Phiranga (Syphilis) & exotic herbs.',
    topics: [
      {
        id: 'bp-purva',
        name: 'Purva Khanda & Bhavaprakasha Nighantu',
        sanskrit: 'पूर्व खण्ड व निघण्टु वर्ग',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'bp-p-1', name: 'Haritakyadi Varga, Karpuradi Varga, Guduchyadi Varga', completed: false },
          { id: 'bp-p-2', name: 'Vatadi, Amradi, Dhatvadi, Dhanya & Shakhavargas', completed: false },
          { id: 'bp-p-3', name: 'Introduction of new herbs: Chobachini, Parasika Yavani, Methika', completed: false },
          { id: 'bp-p-4', name: 'Anatomical and physiological definitions in Purva Khanda', completed: false }
        ]
      },
      {
        id: 'bp-madhyama-uttara',
        name: 'Madhyama & Uttara Khanda',
        sanskrit: 'मध्यम व उत्तर खण्ड (चिकित्सा, रसायन)',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'bp-m-1', name: 'Phiranga Roga (Gandhaka, Rasakarpoora Chikitsa)', completed: false },
          { id: 'bp-m-2', name: 'Somaroga & Snayuka Roga descriptions', completed: false },
          { id: 'bp-m-3', name: 'Rasayana & Vajikarana protocols', completed: false }
        ]
      }
    ]
  },
  {
    id: 'kashyapa-samhita',
    category: 'laghutrayi',
    categoryName: 'Minor Samhitas (Laghutrayi & Others)',
    title: 'Kashyapa Samhita',
    sanskritTitle: 'काश्यप संहिता (वृद्ध जीवकीय तन्त्र)',
    author: 'Acharya Kashyapa / Vriddha Jivaka',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Authoritative text for Kaumarabhritya, Balagrahas, and Stri Roga.',
    topics: [
      {
        id: 'ks-kaumara',
        name: 'Kaumarabhritya & Khilasthana',
        sanskrit: 'कौमारभृत्य व खिलस्थान विशेष',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ks-k-1', name: 'Jatakarma, Shishu Paricharya & Lehana Adhyaya (Swarnaprashana)', completed: false },
          { id: 'ks-k-2', name: 'Dhatri Lakshana & Stanya Pariksha / Shodhana', completed: false },
          { id: 'ks-k-3', name: 'Phakka Roga (Kshiraja, Garbhaja, Vyadhija) & Kalyana Ghrita', completed: false },
          { id: 'ks-k-4', name: 'Revati Graha (20 types) & Balagraha Chikitsa', completed: false },
          { id: 'ks-k-5', name: 'Danta Sampat & Vedanadhyaya (Infant non-verbal signs of pain)', completed: false },
          { id: 'ks-k-6', name: 'Khilasthana: Rajodosha Chikitsa & Pushpaghni Jataharini (8 types)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'bhela-harita',
    category: 'laghutrayi',
    categoryName: 'Minor Samhitas (Laghutrayi & Others)',
    title: 'Bhela & Harita Samhita',
    sanskritTitle: 'भेल व हारीत संहिता',
    author: 'Acharyas Bhela & Harita',
    priority: 'Scoring',
    priorityColor: 'emerald',
    description: 'Important for unique doctrinal views and recurring MCQ trick questions.',
    topics: [
      {
        id: 'bh-concepts',
        name: 'Distinctive Concepts & Questions',
        sanskrit: 'भेल-हारीत विशिष्ट सिद्धान्ताः',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'bh-1', name: 'Bhela Samhita: Alochaka Pitta duality (Chakshurvaisheshika vs Buddhidhaishika)', completed: false },
          { id: 'bh-2', name: 'Bhela views on Manas, Chittabhoga & Unmada classification', completed: false },
          { id: 'bh-3', name: 'Harita Samhita: 8-fold Jwara & Mrittika-bhakshana Pandu stages', completed: false },
          { id: 'bh-4', name: 'Karmavipaka theory of disease manifestations in Harita Samhita', completed: false }
        ]
      }
    ]
  },
  {
    id: 'yoga-ratnakara-chakradatta',
    category: 'laghutrayi',
    categoryName: 'Minor Samhitas (Laghutrayi & Others)',
    title: 'Yoga Ratnakara & Chakradatta',
    sanskritTitle: 'योगरत्नाकर व चक्रदत्त',
    author: 'Yoga Ratnakara / Chakrapanidatta',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Clinical pearls, Ashta Sthana Pariksha, and classic metallic therapeutics.',
    topics: [
      {
        id: 'yr-ashta-sthana',
        name: 'Ashta Sthana Pariksha & Therapeutics',
        sanskrit: 'अष्टस्थान परीक्षा व रसयोग',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'yr-1', name: 'Ashta Sthana Pariksha: Nadi, Mutra, Mala, Jihva, Shabda, Sparsha, Druk, Akruti', completed: false },
          { id: 'yr-2', name: 'Mutra Taila Bindu Pariksha (Directional prognosis)', completed: false },
          { id: 'yr-3', name: 'Chakradatta Chikitsa Sangraha: Parpati Kalpana & Ksharasutra innovations', completed: false },
          { id: 'yr-4', name: 'Famous Yogas & classical Anupana pairs', completed: false }
        ]
      }
    ]
  },

  // ==========================================
  // CATEGORY 3: 15 BAMS SUBJECTS
  // ==========================================
  {
    id: 'kayachikitsa',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Kayachikitsa',
    sanskritTitle: 'कायचिकित्सा (Internal Medicine)',
    author: 'Internal Medicine & Therapeutics',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Comprehensive diagnostic and therapeutic management of internal systemic diseases.',
    topics: [
      {
        id: 'kc-jwara',
        name: 'Jwara & Raktapitta Management',
        sanskrit: 'ज्वर एवं रक्तपित्त चिकित्सा',
        priority: 'High-Yield',
        completed: true,
        subtopics: [
          { id: 'kc-j-1', name: 'Jwara Samprapti, Langhana duration, Shadanga Paniya', completed: true },
          { id: 'kc-j-2', name: 'Vishamajwara (Santata, Satata, Anyedyushka, Tritiyaka, Chaturthaka)', completed: true },
          { id: 'kc-j-3', name: 'Raktapitta Urdhwa & Adhoga Gati management protocols', completed: false },
          { id: 'kc-j-4', name: 'Classical kashayas: Sudarshana, Amritarishta, Mahasudarshana Churna', completed: false }
        ]
      },
      {
        id: 'kc-prameha-rajayakshma',
        name: 'Prameha, Kushtha & Rajayakshma',
        sanskrit: 'प्रमेह, कुष्ठ व राजयक्ष्मा',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'kc-pr-1', name: 'Apathyanimittaja vs Sahaja Prameha & Diabetes Mellitus correlation', completed: false },
          { id: 'kc-pr-2', name: 'Kushtha Chikitsa: Shodhana frequency (Vamana 15d, Virechana 1m)', completed: false },
          { id: 'kc-pr-3', name: 'Rajayakshma Tri-rupa, Shada-rupa, Ekadasha-rupa & Bheshaja', completed: false }
        ]
      },
      {
        id: 'kc-vatavyadhi',
        name: 'Vatavyadhi & Musculoskeletal Diseases',
        sanskrit: 'वातव्याधि, आमवात व सन्धिगतवात',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'kc-v-1', name: 'Pakshaghata, Ardita, Gridhrasi, Manyastambha', completed: false },
          { id: 'kc-v-2', name: 'Amavata (Rheumatoid Arthritis) - Langhana, Swedana, Tikta-Deepana, Basti', completed: false },
          { id: 'kc-v-3', name: 'Vatarakta (Gout) - Gambhira & Uttana Chikitsa', completed: false }
        ]
      },
      {
        id: 'kc-respiratory-gi',
        name: 'Shwasa, Kasa, Grahani & Udara',
        sanskrit: 'श्वास, कास, ग्रहणी व उदररोग',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'kc-rg-1', name: 'Tamaka Shwasa (Pratamaka, Santamaka) & emergency herbs', completed: false },
          { id: 'kc-rg-2', name: 'Grahani Roga (Takra therapy, Chitrakadi Vati, Panchamrita Parpati)', completed: false },
          { id: 'kc-rg-3', name: 'Udara Roga: Jalodara Nitya Virechana with Dugdha diet', completed: false }
        ]
      },
      {
        id: 'kc-manasa-emergency',
        name: 'Manovaha Srotas & Emergency Ayurveda',
        sanskrit: 'मनोविकार व आत्ययिक चिकित्सा',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'kc-me-1', name: 'Unmada & Apasmara Chikitsa (Kalyanaka Ghrita, Brahmi Ghrita)', completed: false },
          { id: 'kc-me-2', name: 'Management of Sanyasa, Murccha, and Coma in Ayurveda', completed: false }
        ]
      }
    ]
  },
  {
    id: 'dravyaguna',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Dravyaguna Vijnana',
    sanskritTitle: 'द्रव्यगुण विज्ञानम् (Materia Medica & Pharmacology)',
    author: 'Pharmacology, Pharmacognosy & Actions',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Rasa Panchaka, 70+ essential medicinal plants, adulterants, and actions.',
    topics: [
      {
        id: 'dg-saptapadartha',
        name: 'Saptapadartha & Fundamental Principles',
        sanskrit: 'सप्तपदार्थ (द्रव्य, गुण, रस, विपाक, वीर्य, प्रभाव, कर्म)',
        priority: 'High-Yield',
        completed: true,
        subtopics: [
          { id: 'dg-sp-1', name: 'Dravya classification & Gurvadi 20 Gunas with modern parallels', completed: true },
          { id: 'dg-sp-2', name: 'Rasa Lakshana, Panchabhautik constitution, Dosha karma', completed: true },
          { id: 'dg-sp-3', name: 'Vipaka (Madhura, Amla, Katu) & Veerya (Ashtavidha & Dvividha)', completed: true },
          { id: 'dg-sp-4', name: 'Prabhava definition and clinical instances', completed: true },
          { id: 'dg-sp-5', name: 'Karma: Deepana, Pachana, Sanshamana, Bhedana, Lekhana, Grahi', completed: true }
        ]
      },
      {
        id: 'dg-plants-major',
        name: '75 Essential AIAPGET Medicinal Plants',
        sanskrit: 'प्रमुख औषधीय पादपाः (कुल, लैटिन नाम, रसपञ्चक)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'dg-p-1', name: 'Haritaki, Bibhitaki, Amalaki, Guduchi, Ashwagandha, Shatavari', completed: true },
          { id: 'dg-p-2', name: 'Guggulu, Vasa, Katuki, Kalamegha, Bhumyamalaki, Nimba', completed: false },
          { id: 'dg-p-3', name: 'Arjuna, Punarnava, Gokshura, Varuna, Shigru, Bilva', completed: false },
          { id: 'dg-p-4', name: 'Brahmi, Mandukaparni, Shankhapushpi, Vacha, Jatamansi', completed: false },
          { id: 'dg-p-5', name: 'Chitraka, Pippali, Maricha, Shunti, Twak, Ela', completed: false }
        ]
      },
      {
        id: 'dg-adulterants-substitutes',
        name: 'Abhava Pratinidhi Dravya & Standardization',
        sanskrit: 'अभाव प्रतिनिधि द्रव्य व गुणवत्ता मानदण्ड',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'dg-as-1', name: 'Classical Abhava Pratinidhi pairs (e.g. Meda-Mahameda substitutes)', completed: false },
          { id: 'dg-as-2', name: 'Common herbal adulterants & identification assays', completed: false }
        ]
      }
    ]
  },
  {
    id: 'rasashastra-bhaishajya',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Rasashastra & Bhaishajya Kalpana',
    sanskritTitle: 'रसशास्त्र एवं भैषज्य कल्पना (Iatrochemistry & Pharmacy)',
    author: 'Iatrochemistry & Pharmaceutical Science',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Parada, Bhasma formulations, Panchavidha Kashaya Kalpana, and GMP standards.',
    topics: [
      {
        id: 'rs-parada',
        name: 'Parada Vijnana & Rasa Dravya Classes',
        sanskrit: 'पारद विज्ञान, महारस, उपरस, साधारणरस',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'rs-p-1', name: 'Parada: 8 Ashta Samskaras, Gati, Naisargika-Yaugika-Aupadhika Doshas', completed: false },
          { id: 'rs-p-2', name: 'Maharasa (8): Abhraka, Vaikranta, Makshika, Vimala, Shilajatu, Sasyaka, Chapala, Rasaka', completed: false },
          { id: 'rs-p-3', name: 'Uparasa (8): Gandhaka, Gairika, Kasisa, Kankshi, Haratala, Manashila, Anjana, Kankustha', completed: false },
          { id: 'rs-p-4', name: 'Sadharanarasa (8), Dhatu (Shuddha, Misra, Puti) & Upadhatu', completed: false },
          { id: 'rs-p-5', name: 'Ratna (9) & Uparatna: Shodhana, Marana, Pishti', completed: false }
        ]
      },
      {
        id: 'rs-yantra-puta',
        name: 'Yantras, Musha, Kosthi & Puta',
        sanskrit: 'यन्त्र, मूषा, कोष्ठी एवं पुट (अग्नि मान)',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'rs-yp-1', name: 'Dola Yantra, Swedana, Patana (Urdhwa, Adhah, Tiryak), Damaru Yantra', completed: false },
          { id: 'rs-yp-2', name: 'Putas: Maha, Gaja, Varaha, Kukkuta, Kapota, Baluka Yantra', completed: false },
          { id: 'rs-yp-3', name: 'Bhasma Pariksha tests: Rekhapurna, Varitara, Apunarbhava, Niruttha, Uttama', completed: false }
        ]
      },
      {
        id: 'bk-kalpanas',
        name: 'Bhaishajya Kalpana Methodologies',
        sanskrit: 'भैषज्य कल्पना (कषाय, स्नेह, आसव-अरिष्ट, लेह)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'bk-k-1', name: 'Panchavidha Kashaya Kalpana water ratios & extraction temperatures', completed: false },
          { id: 'bk-k-2', name: 'Sneha Paka: Sneha, Kalka, Drava Dravya proportions & testing for phena-shanti', completed: false },
          { id: 'bk-k-3', name: 'Sandhana Kalpana: Dhataki pushpa, fermentation period, testing', completed: false },
          { id: 'bk-k-4', name: 'Avaleha, Gutika, Varti, Lepa & Netra Kalpanas', completed: false }
        ]
      }
    ]
  },
  {
    id: 'shalya-tantra',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Shalya Tantra',
    sanskritTitle: 'शल्यतन्त्रम् (General Surgery & Orthopedics)',
    author: 'Surgical Principles & Trauma Care',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Yantra, Shastra, Ksharasutra, Agnikarma, Jalauka, Vrana, and Anorectal surgery.',
    topics: [
      {
        id: 'st-fundamentals',
        name: 'Surgical Instruments & Parashurgical Therapies',
        sanskrit: 'यन्त्र, शस्त्र, अनुशास्त्र, क्षारसूत्र व अग्निकर्म',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'st-f-1', name: '101 Yantras: Svastika, Samdamsha, Tala, Nadi, Shalaka, Upayantras', completed: false },
          { id: 'st-f-2', name: '20 Shastras (sizes, sharp edges, Chedana, Bhedana, Lekhana functions)', completed: false },
          { id: 'st-f-3', name: 'Ksharasutra preparation: Snuhi ksheera, Apamarga kshara, Haridra coating counts', completed: false },
          { id: 'st-f-4', name: 'Agnikarma materials (Pippali, Ajashakrit, Godanta, Dhatu, Madhu-Ghrita)', completed: false }
        ]
      },
      {
        id: 'st-vrana-anorectal',
        name: 'Vrana, Bhagna & Anorectal Disorders',
        sanskrit: 'व्रण, भग्न, अर्श व भगन्दर चिकित्सा',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'st-va-1', name: 'Vrana Shashti Upakrama (60 classical surgical modalities)', completed: false },
          { id: 'st-va-2', name: 'Bhagna: Kandabhagna (12 types) & Sandhimukta (6 types)', completed: false },
          { id: 'st-va-3', name: 'Bhagandara: 5 classical types, probing, cutting, Ksharasutra threading', completed: false },
          { id: 'st-va-4', name: 'Arsha management: Bheshaja, Kshara, Agni & Shastra karma', completed: false }
        ]
      }
    ]
  },
  {
    id: 'shalakya-tantra',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Shalakya Tantra',
    sanskritTitle: 'शालाक्यतन्त्रम् (Ophthalmology, ENT & Oro-dental)',
    author: 'ENT, Eye & Head Diseases',
    priority: 'Core',
    priorityColor: 'indigo',
    description: 'Netra Sharira, 76 Netra Rogas, Kriyakalpa, ENT, and Mukharoga.',
    topics: [
      {
        id: 'sk-netra',
        name: 'Netra Roga & Kriyakalpa',
        sanskrit: 'नेत्ररोग (७६ प्रकार) एवं क्रियाकल्प',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'sk-n-1', name: 'Netra Sharira: 5 Mandalas, 6 Sandhis, 6 Patalas', completed: false },
          { id: 'sk-n-2', name: '76 Netra Rogas: Sandhigata (9), Vartmagata (21), Shuklagata (11), Krishnagata (4), Sarvagata (17), Drishtigata (12)', completed: false },
          { id: 'sk-n-3', name: 'Kriyakalpa: Seka, Aschyotana, Pindi, Bidalaka, Tarpana, Putapaka, Anjana specifications', completed: false },
          { id: 'sk-n-4', name: 'Linga Nasha (Cataract) surgery & Couching method', completed: false }
        ]
      },
      {
        id: 'sk-ent-mukha',
        name: 'Karna, Nasa, Shiro & Mukha Rogas',
        sanskrit: 'कर्ण, नासा, शिरो व मुखरोग',
        priority: 'Core',
        completed: false,
        subtopics: [
          { id: 'sk-em-1', name: 'Karna Rogas (28 types: Karnashula, Karnanada, Badhirya)', completed: false },
          { id: 'sk-em-2', name: 'Nasa Rogas (31 types: Pratishyaya, Dustapratishyaya, Peenasa)', completed: false },
          { id: 'sk-em-3', name: 'Shiro Rogas (11 types: Ardhavabhedaka, Suryavarta, Shankhaka)', completed: false },
          { id: 'sk-em-4', name: '67 Mukha Rogas: Oshta (8), Dantamula (15), Danta (8), Jihva (5), Talu (9), Gala (17), Sarvasara (3)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'prasuti-stri-roga',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Prasuti Tantra & Stri Roga',
    sanskritTitle: 'प्रसूतितन्त्र एवं स्त्रीरोग (Obstetrics & Gynecology)',
    author: 'Obstetrics, Gynecology & Female Health',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Garbhavakranti, Garbhini Paricharya, Labor, Puerperium, 20 Yoni Vyapad, Infertility.',
    topics: [
      {
        id: 'ps-prasuti',
        name: 'Prasuti Tantra (Obstetrics)',
        sanskrit: 'प्रसूतितन्त्र (गर्भिणी परिचर्या, प्रसव, सूतिका)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ps-p-1', name: 'Stri Sharira, Artava Chakra, Ritu-Kshetra-Ambu-Beeja (4 factors of conception)', completed: false },
          { id: 'ps-p-2', name: 'Masanumashika Garbhini Paricharya (Month-by-month diet & regimen)', completed: false },
          { id: 'ps-p-3', name: 'Garbhini Vyadhi: Garbhashosha, Upavishtaka, Nagodara, Garbhini Chhardi', completed: false },
          { id: 'ps-p-4', name: 'Prasava: Aavi, stages of labor, Mudhagarbha types & maneuvers', completed: false },
          { id: 'ps-p-5', name: 'Sutika Paricharya: Duration (1.5 months or till menses), Sutika Jwara', completed: false }
        ]
      },
      {
        id: 'ps-stri-roga',
        name: 'Stri Roga (Gynecology)',
        sanskrit: 'स्त्रीरोग (२० योनिव्यापद, वन्ध्यत्व, आर्तवविकृति)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ps-s-1', name: '20 Yoni Vyapad: Charaka & Sushruta categorization & distinct clinical signs', completed: false },
          { id: 'ps-s-2', name: 'Ashta Artava Dushti (8 types of menstrual disorders & treatments)', completed: false },
          { id: 'ps-s-3', name: 'Vandhyatva (Infertility classification & Uttar Basti protocols)', completed: false },
          { id: 'ps-s-4', name: 'Stanaroga: Stanya Dushti, Stanya Kshaya, Stanavidradhi', completed: false }
        ]
      }
    ]
  },
  {
    id: 'kaumarabhritya',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Kaumarabhritya',
    sanskritTitle: 'कौमारभृत्यम् (Ayurvedic Pediatrics)',
    author: 'Pediatrics, Neonatology & Child Welfare',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Neonatal care, infant feeding, childhood milestones, samskaras, and diseases.',
    topics: [
      {
        id: 'kb-neonatology-nutrition',
        name: 'Neonatal Care & Pediatric Nutrition',
        sanskrit: 'नवजात शिशु परिचर्या, प्राणाप्रत्यागमन, स्तन्य',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'kb-nn-1', name: 'Navajata Shishu Paricharya & Pranapratyagamana (Resuscitation)', completed: false },
          { id: 'kb-nn-2', name: 'Ulbaka roga & Nala chhedana vidhi', completed: false },
          { id: 'kb-nn-3', name: 'Dhatri pariksha & Stanya dosha / Shodhana', completed: false },
          { id: 'kb-nn-4', name: 'Lehana karma, Swarnaprashana & Samskaras (Namakarana, Annaprashana)', completed: false }
        ]
      },
      {
        id: 'kb-diseases',
        name: 'Pediatric Disorders & Balagrahas',
        sanskrit: 'बालरोग, दन्तोद्भेदजन्य विकार व बालग्रह',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'kb-d-1', name: 'Phakka Roga, Balasosha, Parigarbhika (PEM equivalents)', completed: false },
          { id: 'kb-d-2', name: 'Dantodbheda janya vikaras (Dentition disorders)', completed: false },
          { id: 'kb-d-3', name: '12 Balagrahas (Charaka & Sushruta) and specific Dhupa/Snana treatments', completed: false },
          { id: 'kb-d-4', name: 'Pediatric Drug Dosages according to Sharangadhara & Kashyapa', completed: false }
        ]
      }
    ]
  },
  {
    id: 'panchakarma',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Panchakarma',
    sanskritTitle: 'पञ्चकर्म (Purification Therapies)',
    author: 'Bio-purification & Detoxification',
    priority: 'High-Yield',
    priorityColor: 'rose',
    description: 'Poorva, Pradhana, Paschat Karma: Snehana, Swedana, Vamana, Virechana, Basti, Nasya.',
    topics: [
      {
        id: 'pk-poorva-karma',
        name: 'Poorva Karma: Snehana & Swedana',
        sanskrit: 'पूर्व कर्म (स्नेहन एवं स्वेदन)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'pk-pk-1', name: 'Snehana: Bahya & Abhyantara, Sneha Pravicharana (24 types)', completed: false },
          { id: 'pk-pk-2', name: 'Samyak Snigdha, Asnigdha, Atisnigdha Lakshana & dosages', completed: false },
          { id: 'pk-pk-3', name: 'Swedana: 13 Sagni Sweda & 10 Niragni Sweda classifications', completed: false },
          { id: 'pk-pk-4', name: 'Samyak Swinna & Atiswinna Lakshana', completed: false }
        ]
      },
      {
        id: 'pk-pradhana-karma',
        name: 'Pradhana Karma: Vamana, Virechana, Basti & Nasya',
        sanskrit: 'प्रधान कर्म (वमन, विरेचन, बस्ति, नस्य, रक्तमोक्षण)',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'pk-prk-1', name: 'Vamana Karma: Preparation, dosage, Antiki-Maniki-Vegiki-Laingiki Shuddhi', completed: false },
          { id: 'pk-prk-2', name: 'Virechana Karma: Aushadha selection, Vegiki evaluation, Vyapad', completed: false },
          { id: 'pk-prk-3', name: 'Samsarjana Krama: Peya, Vilepi, Akrita Yusha, Krita Yusha schedules', completed: false },
          { id: 'pk-prk-4', name: 'Basti Karma: Anuvasana, Niruha, Matra Basti; Karma-Kala-Yoga basti schedules', completed: false },
          { id: 'pk-prk-5', name: 'Nasya (Marsha, Pratimarsha dosages) & Raktamokshana (Siravyadha, Jalauka)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'roganidana',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Roganidana & Vikriti Vigyana',
    sanskritTitle: 'रोगनिदान एवं विकृति विज्ञान (Pathology & Diagnostics)',
    author: 'Pathology & Diagnostic Methodology',
    priority: 'Core',
    priorityColor: 'indigo',
    description: 'Nidana Panchaka, Shat Kriya Kala, Srotas diagnostics, and examination tools.',
    topics: [
      {
        id: 'rn-core-diagnostics',
        name: 'Nidana Panchaka & Shat Kriya Kala',
        sanskrit: 'निदानपञ्चक, षट् क्रियाकाल व परीक्षा पद्धति',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'rn-cd-1', name: 'Nidana Panchaka: Nidana, Purvarupa, Rupa, Upashaya, Samprapti', completed: false },
          { id: 'rn-cd-2', name: 'Shat Kriya Kala: Sanchaya, Prakopa, Prasara, Sthanasamshraya, Vyakti, Bheda', completed: false },
          { id: 'rn-cd-3', name: 'Trividha, Ashtavidha & Dashavidha Pariksha mechanisms', completed: false },
          { id: 'rn-cd-4', name: '13 Srotas Dushti Lakshanas (Atipravritti, Sanga, Siragranthi, Vimargagamana)', completed: false },
          { id: 'rn-cd-5', name: 'Vyadhikshamatva (Sahaja, Kalaja, Yuktikrita) & Ojas status', completed: false }
        ]
      }
    ]
  },
  {
    id: 'rachana-sharira',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Rachana Sharira',
    sanskritTitle: 'रचना शारीरम् (Ayurvedic Human Anatomy)',
    author: 'Ayurvedic & Comparative Anatomy',
    priority: 'Core',
    priorityColor: 'indigo',
    description: '107 Marmas, Sira, Dhamani, Srotas, Asthi, Sandhi, and Pramana Sharira.',
    topics: [
      {
        id: 'rs-marma-structures',
        name: '107 Marmas & Structural Osteo-Myology',
        sanskrit: '१०७ मर्म, अस्थि, सन्धि, सिरा व स्रोतस्',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'rs-ms-1', name: '107 Marmas: Sadhyo Pranahara (19), Kalantara (33), Vishalyaghna (3), Vaikalyakara (44), Rujakara (8)', completed: false },
          { id: 'rs-ms-2', name: 'Marma classification by structural component: Mamsa, Sira, Snayu, Asthi, Sandhi', completed: false },
          { id: 'rs-ms-3', name: 'Asthi Sankhya (Charaka 360 vs Sushruta 300) & classification', completed: false },
          { id: 'rs-ms-4', name: 'Sandhi (8 types), Snayu (900), Peshi (500 in males, +20 in females)', completed: false },
          { id: 'rs-ms-5', name: 'Pramana Sharira: Anguli Pramana & Anjali Pramana (10 Rasa, 9 Rakta, etc.)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'kriya-sharira',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Kriya Sharira',
    sanskritTitle: 'क्रिया शारीरम् (Ayurvedic Human Physiology)',
    author: 'Tridosha, Dhatu, Mala & Ojas Physiology',
    priority: 'Core',
    priorityColor: 'indigo',
    description: 'Tridosha physiology, subdoshas, Dhatu poshana nyayas, Agni, Kostha, Prakriti.',
    topics: [
      {
        id: 'ks-dosha-dhatu',
        name: 'Tridosha, Dhatu & Agni Physiology',
        sanskrit: 'त्रिदोष, १५ उपदोष, सप्त धातु एवं १३ अग्नि',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ks-dd-1', name: 'Vata Sub-doshas (Prana, Udana, Samana, Vyana, Apana): locations and actions', completed: false },
          { id: 'ks-dd-2', name: 'Pitta Sub-doshas (Pachaka, Ranjaka, Sadhaka, Alochaka, Bhrajaka)', completed: false },
          { id: 'ks-dd-3', name: 'Kapha Sub-doshas (Kledaka, Avalambaka, Bodhaka, Tarpaka, Shleshaka)', completed: false },
          { id: 'ks-dd-4', name: 'Dhatu Poshana Nyayas: Kshira-Dadhi, Kedari-Kulya, Khale-Kapota', completed: false },
          { id: 'ks-dd-5', name: 'Ojas: Para Ojas (8 bindu, Hridaya sthana) & Apara Ojas (Ardhanjali)', completed: false },
          { id: 'ks-dd-6', name: 'Prakriti Pariksha, Ahara Parinama Bhavas & Koshta types', completed: false }
        ]
      }
    ]
  },
  {
    id: 'padartha-itihasa',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Padartha Vigyana & Ayurveda Itihasa',
    sanskritTitle: 'पदार्थ विज्ञान एवं आयुर्वेद का इतिहास',
    author: 'Philosophy, Epistemology & Historical Chronology',
    priority: 'Scoring',
    priorityColor: 'emerald',
    description: 'Shat Padartha, Pramana, Karya-Karana Vada, and Chronology of Acharyas & Commentators.',
    topics: [
      {
        id: 'pi-padartha-pramana',
        name: 'Padartha Vigyana & Pramana',
        sanskrit: 'षट् पदार्थ, प्रमाण व कार्यकारण वाद',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'pi-pp-1', name: 'Dravya, Guna, Karma, Samanya, Vishesha, Samavaya & Abhava', completed: false },
          { id: 'pi-pp-2', name: 'Pramanas: Pratyaksha, Anumana, Aptopadesha, Yukti, Upamana', completed: false },
          { id: 'pi-pp-3', name: 'Karya Karana Vada: Satkaryavada, Asatkaryavada, Parinamavada, Vivartavada', completed: false }
        ]
      },
      {
        id: 'pi-history',
        name: 'Ayurveda Itihasa & Chronology of Commentators',
        sanskrit: 'आयुर्वेद इतिहास व टीकाकार कालक्रम',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'pi-h-1', name: 'Chronology: Charaka (2nd c. BC/AD), Sushruta, Vagbhata (6th-7th c.)', completed: false },
          { id: 'pi-h-2', name: 'Commentators: Chakrapanidatta (11th c.), Dalhana (12th c.), Arunadatta, Hemadri', completed: false },
          { id: 'pi-h-3', name: 'Major AYUSH regulatory councils, pharmacopoeias, and national institutes', completed: false }
        ]
      }
    ]
  },
  {
    id: 'samhita-siddhanta',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Samhita Siddhanta',
    sanskritTitle: 'संहिता सिद्धान्त (Fundamental Principles & Tantrayukti)',
    author: 'Epistemology, Tantrayukti & Methodology',
    priority: 'Scoring',
    priorityColor: 'emerald',
    description: 'Tantrayukti (36), Trishutra, Padachatushtaya, Vadamarga, and Hermeneutics.',
    topics: [
      {
        id: 'ss-tantrayukti',
        name: '36 Tantrayuktis & Doctrinal Rules',
        sanskrit: '३६ तन्त्रयुक्ति एवं वादपद्धति',
        priority: 'High-Yield',
        completed: false,
        subtopics: [
          { id: 'ss-ty-1', name: '36 Tantrayuktis according to Charaka and Bhattara Harichandra', completed: false },
          { id: 'ss-ty-2', name: 'Trishutra Ayurveda: Hetu, Linga, Aushadha', completed: false },
          { id: 'ss-ty-3', name: 'Chatushpada (16 Gunas of Bhishak, Dravya, Upasthata, Rogi)', completed: false },
          { id: 'ss-ty-4', name: 'Vadamarga: Tadvidya Sambhasha, Jalpa, Vitanda, Hetwabhasa', completed: false }
        ]
      }
    ]
  },
  {
    id: 'swasthavritta-yoga',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Swasthavritta & Yoga',
    sanskritTitle: 'स्वस्थवृत्त एवं योग (Preventive Medicine & Yoga)',
    author: 'Preventive, Social Medicine & Naturopathy',
    priority: 'Scoring',
    priorityColor: 'emerald',
    description: 'Dinacharya, Ritucharya, Trayopastambha, Vega, Ashtanga Yoga, Public Health.',
    topics: [
      {
        id: 'sw-regimens',
        name: 'Dinacharya, Ritucharya & Vegas',
        sanskrit: 'दिनचर्या, ऋतुचर्या, वेगरोध एवं त्रयोपस्तम्भ',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'sw-r-1', name: 'Dinacharya: Brahma muhurta, Dantadhavana prohibited twigs, Anjana, Nasya', completed: false },
          { id: 'sw-r-2', name: 'Ritucharya: Shad Ritu rules, Ritu Sandhi, Yamadanshtra period', completed: false },
          { id: 'sw-r-3', name: '13 Adharaniya Vegas & Vegadharana specific pathological sequelae', completed: false },
          { id: 'sw-r-4', name: 'Trayopastambha: Ahara (Ashta Vidha Vidhi Viseshayatana), Nidra, Brahmacharya', completed: false }
        ]
      },
      {
        id: 'sw-yoga-health',
        name: 'Yoga Therapy & Public Health Programs',
        sanskrit: 'योग, षट्कर्म एवं राष्ट्रीय स्वास्थ्य नीतियां',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'sw-yh-1', name: 'Ashtanga Yoga: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi', completed: false },
          { id: 'sw-yh-2', name: 'Shatkarma (Dhauti, Basti, Neti, Nauli, Trataka, Kapalabhati)', completed: false },
          { id: 'sw-yh-3', name: 'National health programs & AYUSH public health initiatives', completed: false }
        ]
      }
    ]
  },
  {
    id: 'agada-vyavahara',
    category: 'subjects',
    categoryName: '15 BAMS Subjects',
    title: 'Agada Tantra & Vyavahara Ayurveda',
    sanskritTitle: 'अगदतन्त्र एवं व्यवहार आयुर्वेद (Toxicology & Forensic Medicine)',
    author: 'Toxicology, Forensic Medicine & Medical Jurisprudence',
    priority: 'Scoring',
    priorityColor: 'emerald',
    description: 'Visha classification, Visha Vega, Dushi Visha, Inquest, Autopsy, IPC codes.',
    topics: [
      {
        id: 'at-toxicology',
        name: 'Visha Vijnana & Agadas',
        sanskrit: 'विषोत्पत्ति, १० गुण, स्थावर-जंगम विष एवं वेग',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'at-t-1', name: 'Visha Utpatti, 10 Visha Gunas vs 10 Ojo Gunas (antagonism)', completed: false },
          { id: 'at-t-2', name: 'Sthavara Visha (Vatsanabha, Upavishas: Kupeelu, Dhattura, Bhanga, Jayapala, Gunja)', completed: false },
          { id: 'at-t-3', name: 'Jangama Visha: Sarpa Dashta (Darvikara, Mandali, Rajiman) & Vega lakshanas', completed: false },
          { id: 'at-t-4', name: 'Dushi Visha & Gara Visha: differences, pathogenesis, Dushivishari Agada', completed: false },
          { id: 'at-t-5', name: 'Famous Agadas: Mritasanjivana Agada, Bilwadi Gulika, Mahagada', completed: false }
        ]
      },
      {
        id: 'at-forensic',
        name: 'Vyavahara Ayurveda & Medical Jurisprudence',
        sanskrit: 'व्यवहार आयुर्वेद, विधि वैद्यक एवं IPC धाराएं',
        priority: 'Scoring',
        completed: false,
        subtopics: [
          { id: 'at-f-1', name: 'Inquest, Thanatology (Rigor mortis, Post-mortem lividity, Putrefaction)', completed: false },
          { id: 'at-f-2', name: 'Mechanical injuries (Abrasion, Bruise, Laceration, Incised wound, Firearm)', completed: false },
          { id: 'at-f-3', name: 'Medical law: Consent, Professional negligence, IPC sections (304A, 319-325, 375)', completed: false }
        ]
      }
    ]
  }
];

// Default Spaced Repetition Intervals (days after initial study)
const DEFAULT_REVISION_INTERVALS = [3, 7, 14, 21, 45];

// Realistic Pre-seeded Revisions for Immediate Lively App Feel
function getPreSeededRevisions() {
  const now = new Date();
  
  function makeDate(daysOffset) {
    const d = new Date(now);
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
  }

  return [
    // 1-2 Overdue revisions (due 2 days ago & 1 day ago)
    {
      id: 'rev-1',
      topicId: 'sha-prathama',
      topicName: 'Sharangadhara Samhita - Prathama Khanda (Paribhasha & Nadi)',
      category: 'laghutrayi',
      categoryName: 'Minor Samhitas (Laghutrayi)',
      priority: 'High-Yield',
      studiedDate: makeDate(-5),
      dueDate: makeDate(-2), // 2 days overdue!
      intervalIndex: 0,
      intervalDays: 3,
      reviewCount: 1,
      overdue: true,
      lastConfidence: 'Medium'
    },
    {
      id: 'rev-2',
      topicId: 'cs-v-1',
      topicName: 'Charaka Vimana Sthana - Trividha Kukshiya & Janapadoddhwamsa',
      category: 'brihattrayi',
      categoryName: 'Major Samhitas (Brihattrayi)',
      priority: 'Core',
      studiedDate: makeDate(-8),
      dueDate: makeDate(-1), // 1 day overdue!
      intervalIndex: 1,
      intervalDays: 7,
      reviewCount: 2,
      overdue: true,
      lastConfidence: 'Weak'
    },

    // 2 Due Today revisions
    {
      id: 'rev-3',
      topicId: 'ss-s-1',
      topicName: 'Sushruta Sutrasthana - Yantra & Shastra Vijnaniya',
      category: 'brihattrayi',
      categoryName: 'Major Samhitas (Brihattrayi)',
      priority: 'High-Yield',
      studiedDate: makeDate(-3),
      dueDate: makeDate(0), // Due today!
      intervalIndex: 0,
      intervalDays: 3,
      reviewCount: 0,
      overdue: false,
      lastConfidence: null
    },
    {
      id: 'rev-4',
      topicId: 'ah-s-1',
      topicName: 'Ashtanga Hridaya Sutrasthana - Dinacharya & Ritucharya',
      category: 'brihattrayi',
      categoryName: 'Major Samhitas (Brihattrayi)',
      priority: 'High-Yield',
      studiedDate: makeDate(-7),
      dueDate: makeDate(0), // Due today!
      intervalIndex: 1,
      intervalDays: 7,
      reviewCount: 1,
      overdue: false,
      lastConfidence: 'Medium'
    },

    // 3 Upcoming revisions
    {
      id: 'rev-5',
      topicId: 'cs-n-1',
      topicName: 'Charaka Nidanasthana - Jwara & Raktapitta Nidana',
      category: 'brihattrayi',
      categoryName: 'Major Samhitas (Brihattrayi)',
      priority: 'High-Yield',
      studiedDate: makeDate(-1),
      dueDate: makeDate(2), // Due in 2 days
      intervalIndex: 0,
      intervalDays: 3,
      reviewCount: 0,
      overdue: false,
      lastConfidence: null
    },
    {
      id: 'rev-6',
      topicId: 'dg-saptapadartha',
      topicName: 'Dravyaguna - Saptapadartha (Rasa Panchaka & 20 Gurvadi Guna)',
      category: 'subjects',
      categoryName: '15 BAMS Subjects',
      priority: 'High-Yield',
      studiedDate: makeDate(-9),
      dueDate: makeDate(5), // Due in 5 days
      intervalIndex: 2,
      intervalDays: 14,
      reviewCount: 2,
      overdue: false,
      lastConfidence: 'Strong'
    },
    {
      id: 'rev-7',
      topicId: 'kc-jwara',
      topicName: 'Kayachikitsa - Jwara Chikitsa & Vishamajwara',
      category: 'subjects',
      categoryName: '15 BAMS Subjects',
      priority: 'High-Yield',
      studiedDate: makeDate(-10),
      dueDate: makeDate(11), // Due in 11 days
      intervalIndex: 3,
      intervalDays: 21,
      reviewCount: 3,
      overdue: false,
      lastConfidence: 'Strong'
    }
  ];
}

// Export for browser
if (typeof window !== 'undefined') {
  window.DEFAULT_SYLLABUS = DEFAULT_SYLLABUS;
  window.DEFAULT_REVISION_INTERVALS = DEFAULT_REVISION_INTERVALS;
  window.getPreSeededRevisions = getPreSeededRevisions;
}
