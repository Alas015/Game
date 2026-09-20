import type { GameTranslations } from './types';

export const tr: GameTranslations = {
  ui: {
    title: 'SON KRALLIK',
    titleSub1: 'SON',
    titleSub2: 'KRALLIK',
    annoDomini: '✦   Anno Domini MCCCXII   ✦',
    tagline1: '"Kral kayboldu.',
    tagline2: 'Krallık yalan söylüyor."',
    flavorIntro: 'Üç gece önce, Kral Aldric II Blackthorn Kalesi\'nden gizemce kayboldu. Mücadele izi yok. Fidye talebi yok. Ceset bulunamadı. Altı şüpheli. Sayısız yalan.',
    flavorRole: 'Siz Kraliyet Dedektifisiniz. Hakikati, taçla birlikte toprağa gömülmeden önce bulun.',
    royalMystery: '✦   Bir Kraliyet Gizemi   ✦',
    beginBtn: 'SORUŞTURMAYI BAŞLAT',
    returnToMap: '← Krallık Haritası',
    journalBtn: 'Günlük',
    evidenceBtn: 'Kanıtlar',
    makeAccusationNav: 'Suçlama Yap →',
    returnBtn: '← Geri Dön',
    backBtn: '← Geri',
    kingdomName: 'Aldenmere Krallığı',
    mapHint: '"Soruşturmak için herhangi bir konuma tıklayın. Gerçek tüm krallığa dağılmış halde."',
    locationsVisited: 'ZİYARET EDİLEN KONUMLAR',
    cluesLabel: 'KANITLAR',
    moreCluesNeeded: 'KANIT DAHA GEREKLİ',
    evidenceAwaits: '◆ KANIT BEKLENYOR',
    previouslyVisited: '✓ DAHA ÖNCE ZİYARET EDİLDİ',
    examineSection: 'İncele',
    personsSection: 'İlgili Kişiler',
    gatheredHere: 'BURADAN TOPLANDI',
    evidencePossible: '◆ KANIT MÜMKÜN',
    evidenceFound: 'KANIT BULUNDU',
    previouslyFound: 'DAHA ÖNCE BULUNMUŞ',
    collectAndClose: 'Kanıtı Topla ve Kapat',
    closeBtn: 'Kapat',
    interrogationLabel: 'SORGULAMA',
    suspiciousLabel: 'ŞÜPHELİ DAVRANIŞ',
    responseLabel: 'YANИТINIZ',
    revealsEvidence: '[kanıt ortaya çıkar]',
    connectedEvidence: 'BAĞLANTILI KANITLAR',
    noEvidence: 'Henüz kanıt toplanmadı.',
    investigateFirst: 'Konumları araştırın ve şüphelilerle konuşun.',
    hideDetails: '▲ AYRINTILARI GİZLE',
    examineClosely: '▼ YAKINDAN İNCELE',
    linkedBadge: 'BAĞLANTILI',
    defaultHint: 'Okumak için bir kanıta tıklayın. İki kanıtı ilişkilendirmek için sırayla tıklayın.',
    connectionHint: 'seçildi — bağlantı kurmak için başka bir kanıta tıklayın.',
    investigatorJournal: 'Dedektif Günlüğü',
    suspectsTab: 'Şüpheliler',
    locationsTab: 'Konumlar',
    cluesTab: 'Kanıtlar',
    notesTab: 'Notlar',
    personsIdentified: 'İLGİLİ KİŞİLER · {n} TESPİT EDİLDİ',
    noPersonsYet: 'İlgili kişileri keşfetmek için konumları ziyaret edin.',
    linkedEvidenceLabel: 'BAĞLANTILI KANITLAR',
    investigatedLocations: 'ARAŞTIRILAN KONUMLAR · {n} / 8',
    noLocationsYet: 'Henüz hiçbir konum ziyaret edilmedi.',
    evidenceRemain: 'KANIT PARÇASI KALDI',
    gatheredEvidence: 'TOPLANAN KANITLAR · {n} / 9',
    noCluesYet: 'Henüz kanıt toplanmadı.',
    foundAt: 'BULUNDUĞU YER:',
    investigatorNotes: 'DEDEKTİF NOTLARI',
    unansweredLabel: 'YANITLANMAMIŞ SORULAR:',
    observationsLabel: 'GÖZLEMLER:',
    continueInvest: 'Gözlemlerle doldurmak için araştırmaya devam edin.',
    q1: '◆   Yırtık mektubu "C" baş harfiyle kim imzaladı?',
    q2: '◆   Fail, kralın şarabına nasıl ulaştı?',
    q3: '◆   Kalenin altındaki geçitler ne sırrı saklıyor?',
    q4: '◆   Kral Aldric şu an nerede?',
    obs1: '◆   Lord Cedric\'in mühürü, hazineye gece yarısı erişmek için kullanıldı.',
    obs2: '◆   Nightshade Cevheri özü şarapta çözülür ve felce yol açar.',
    obs3: '◆   Gizli geçitler şarap mahzenini ormanın kenarına bağlıyor.',
    obs4: '◆   Birisi "C" harfiyle imzalanan bir mektupta tahtın "bizim" olacağını vaat etti.',
    obs5: '◆   İpek bir eldiven — bir erkeğin eline göre çok küçük — hazine girişi yakınında bulundu.',
    obs6: '◆   Mira, tehdit altında zehir hazırlamaya zorlandığını itiraf etti.',
    makeYourAccusation: 'Suçlamanızı Yapın',
    accusationDrama: 'Krallığı araştırdınız. Şüphelilerle konuştunuz. Kanıtları topladınız.',
    guiltyParty: 'I. Suçlu Taraf',
    motiveStep: 'II. Motif',
    methodStep: 'III. Yöntem',
    accusedBadge: 'SANIK ◆',
    yourAccusationLabel: 'SUÇLAMANIZ',
    iAccuseTemplate: '{name}\'yi, kralı tahttan indirme komplosu kurmakla suçluyorum. Motifi: {motive}. Yöntemi: {method}.',
    reconsiderBtn: 'Yeniden Düşün',
    sealAccusation: '⚔ SUÇLAMAYI MÜHÜRLE',
    declareGuilt: 'SUÇLU İLAN ET',
    areYouCertain: 'Emin misiniz? Yanlış bir suçlama tacı lekeler.',
    justicePrevealed: '✦ Adalet Yerini Buldu ✦',
    justiceDenied: '✦ Adalet Engellendi ✦',
    deductionCorrect: 'Çıkarımınız doğruydu. Kralın kaderi ortaya çıktı.',
    accusationMistaken: 'Suçlamanız yanlıştı. Gerçek suçlu hâlâ özgür.',
    yourAccusationResult: 'SUÇLAMANIZ',
    theTruth: 'GERÇEK',
    fullAccount: 'OLAYLARIN TAMAMI',
    finalAssessment: 'SON DEĞERLENDİRME',
    masterInvestigator: 'Usta Dedektif',
    keenEye: 'Keskin Göz, Kusurlu Sonuç',
    remainsInShadow: 'Krallık Karanlıkta Kalıyor',
    evidenceCollectedScore: 'Toplanan Kanıt',
    playAgain: 'Yeni Soruşturma Başlat',
    notEnoughEvidence: 'Tam resmi görmek için yeterli kanıt toplamadınız.',
    evidenceButFailed: 'Kanıtlar oradaydı. Yine de gerçek sizi atlattı.',
  },

  locations: {
    'blackthorn-castle': {
      name: 'Blackthorn Kalesi',
      description: 'Kraliyet iktidarının merkezi. Kadim taşları yüzyıllık hükümdarlıklara tanıklık etti. Bu gece daha karanlık sırları gizliyor.',
      ambiance: 'Koridorlarda meşaleler titreşiyor. Muhafızlar her kapıda dimdik duruyor. Havada balmumu ve huzursuzluk kokusu var. Taht boş.',
    },
    'ravens-hollow': {
      name: 'Karga Koyu',
      description: 'Kargaların yuvalandığı, batıl inançların derin kök saldığı sık bir çukur. Yerli halk geceleri buradan kaçınır.',
      ambiance: 'Ağaçlar birbirine dolanmış ve sıkışık büyüyor. Kargalar her daldan izliyor. Soğuk rüzgar çam ve başka bir şeyin kokusunu taşıyor — mürekkep ve yakılmış parşömen.',
    },
    'old-monastery': {
      name: 'Eski Manastır',
      description: 'Kaleden üç yüzyıl önce inşa edilmiş, krallığın kendisinden daha eski. Peder Tomas kadim salonlara bakar.',
      ambiance: 'Her girişte mumlar yanıyor. Uzun masalar aydınlatılmış elyazmalarıyla dolu. Havada tirşe, tütsü ve korku gibi bir şey var.',
    },
    'ironwood-forest': {
      name: 'Demir Ormanı',
      description: 'Ağaçların öyle sık büyüdüğü eski bir orman ki tepeleri tüm ışığı engelliyor. Haydutlar yüzyıllardır burada saklandı.',
      ambiance: 'Gündüzün bile gölge altında karanlık. Ayak altında dallar çıtırdıyor. Demir griği gövdeler arasındaki gölgelerden bir şey izliyor.',
    },
    'kings-road': {
      name: 'Kral Yolu',
      description: 'Krallığın ana damarı. Genellikle askerler ve tüccarlarla hareketli — şimdi tuhaf biçimde boş.',
      ambiance: 'Çamurda nallar izi, sonra hiç. Sanki at ve binici yok olmuş gibi. Buradaki sessizlik doğal değil.',
    },
    'forgotten-mine': {
      name: 'Unutulmuş Maden',
      description: 'Tükendiği düşünülen terk edilmiş bir demir madeni. Ama son faaliyetler aksini düşündürüyor.',
      ambiance: 'Yeni araba izleri eski tozu kesiyor. Meşale kokusu taze. Galerilerin derininde bir şey parıldar — demir değil.',
    },
    'river-alden': {
      name: 'Alden Nehri',
      description: 'Krallığı ikiye bölen büyük nehir. Kıyıları pek çok fısıldanan sırrı barındırıyor.',
      ambiance: 'Ay ışığında su karanlık akıyor. Yaşlı bir kayıkçı her geçişi biliyor — ve kullanan her yüzü.',
    },
    'northern-village': {
      name: 'Kuzey Köyü',
      description: 'Krallığın kuzey ucunda küçük ama gururlu bir yerleşim. Demircinin ocağı köyün kalbi.',
      ambiance: 'Çekicin sesi sabah sisini kesiyor. Köylüler alçak sesle konuşuyor. Burada korku yaşıyor — yeni ve tanıdık olmayan bir korku.',
    },
  },

  characters: {
    'queen-elara': {
      name: 'Kraliçe Elara',
      title: 'Krallığın Kraliçesi',
      description: 'Kralın on iki yıllık eşi. Güzel ve ölçülü. Kederi hesaplanmış görünüyor — neredeyse ezberlenmiş gibi.',
      suspicious: 'Kaybolmadan iki gece önce, gece yarısı Lord Cedric ile fısıldaşırken görüldü. Odasında yakın zamanda yakma izleri vardı — mektuplar yok edilmiş.',
    },
    'lord-cedric': {
      name: 'Lord Cedric',
      title: 'Kraliyet Ordusu Komutanı',
      description: 'Seçkin bir savaş gazisi, kralın sağ kolu. Askerler tarafından saygı görüyor, soylular tarafından korkuluyor. Kimileri tahtın arkasındaki gerçek gücün o olduğunu söylüyor.',
      suspicious: 'Kayboluş açıklanmadan kaleyi kapattırdı. Harp odasında belgeler yakarken yakalandı. Mührü gece yarısı kısıtlı alanlara erişmek için kullanıldı.',
    },
    'father-tomas': {
      name: 'Peder Tomas',
      title: 'Eski Manastırın Prioru',
      description: 'Yirmi yıllık kıdemli bir rahip, bilimsel yazıları ve sessiz dindarlığıyla tanınır. Onu derinden sarsan bir şey var.',
      suspicious: 'Kaybolma gecesi manastırdan yoktu. Nerede olduğunu açıklamayı reddediyor. Tüm kargaları o gece serbest bırakıldı.',
    },
    'sir-rowan': {
      name: 'Şövalye Rowan',
      title: 'Krallığın Şampiyon Şövalyesi',
      description: "Kralın en güvenilir şövalyesi ve en eski dostu. Yıkılmış görünüyor — ama suçluluk duygusu ile yas uzaktan aynı görünür.",
      suspicious: "Kritik saatte görevinde yoktu. Kendine özgü çizme izleri gizli bir duvar bölümüne uzanıyor. Sanki önceden biliyormuş gibi kralın o geceye dair güzergahını soruyor.",
    },
    'mira': {
      name: 'Mira',
      title: 'Saray Hekimi',
      description: 'Üç krallığın tıp sanatlarında yetişmiş parlak bir şifacı. Her türlü ilaca — ve zehire — erişimi var. Haftalar önce görünür şekilde sıkıntı içine girdi.',
      suspicious: 'Altı hafta önce Unutulmuş Maden\'den alışılmadık bir mineral bileşiği talep etti. Hiçbir hasta kaydı bunu desteklemiyor. Tutarsızlığı açıklamayı reddediyor.',
    },
    'garrett-blacksmith': {
      name: 'Garrett',
      title: 'Saray Demircisi',
      description: 'Elleri çekiç gibi, gözleri hiçbir şeyi kaçırmayan iri yarı bir adam. Sert ama özünde dürüst — en azından öyle sanılıyordu.',
      suspicious: "Kaybolmadan üç gün önce gizli bir sipariş için özel bir kılıç dövdü. Alıcının adını vermeyi reddediyor. Mira'nın talebinden günler önce Unutulmuş Maden'in yakınında görüldü.",
    },
  },

  clues: {
    'blood-glove': {
      name: 'Kanlı Eldiven',
      description: 'Kraliyet armasını taşıyan, koyu lekeli bir ipek eldiven.',
      detail: 'Eldiven yüksek mevkili birine ait — nakış son derece ince işlenmiş. Kan lekeleri en fazla üç gecelik. Eldiven bir erkeğin eline göre çok küçük. Hazine girişi yakınında bulundu.',
    },
    'torn-letter': {
      name: 'Yırtık Mektup',
      description: '"...iş bitince taht bizim olacak."',
      detail: '"...iş bitince taht bizim olacak. Okuyunca yak. — C." Yazı kasıtlı, eğitimli bir el. Mürekkep askeri kalitede. Yalnızca "C" baş harfiyle imzalanmış.',
    },
    'broken-seal': {
      name: 'Kırık Kraliyet Mührü',
      description: "Kralın kişisel balmumu mühürü, Kral Yolu'nda ikiye bölünmüş.",
      detail: "Bu mühür yalnızca en çaresiz koşullarda kralın üzerinden ayrılabilirdi. Kral Yolu'nda bulunması, kralın orada yakalandığını düşündürüyor. Kırılma temiz — kasıtlı, kaza değil.",
    },
    'missing-sword': {
      name: 'Boş Kılıç Kını',
      description: "Kralın törensel kını boş — Dawnbringer kaybolmuş.",
      detail: 'Kral Aldric\'in törene özel kılıcı "Dawnbringer" kayboldu. Demirci, kının kaybolmadan iki gece önce boş olduğunu fark etti ve Lord Cedric\'e bildirdi — Cedric ise hiç kimseye söylememesini emretti.',
    },
    'strange-footprint': {
      name: 'Tuhaf Ayak İzi',
      description: 'Gizli bir duvara doğru uzanan, belirgin tamir edilmiş topuklu zırhlı çizme izi.',
      detail: "İz, yeniden taban yapılmış sol çizmeyle eşleşiyor — Şövalye Rowan'ın sol çizmesi iki hafta önce köy ayakkabıcısında tamir ettirdi. İzler kalenin doğu kanadından çıkıyor ve standart planlarda görünmeyen bir orman duvarı bölümüne uzanıyor.",
    },
    'passage-map': {
      name: 'Gizli Geçit Haritası',
      description: 'Manastır yazıhanesinden çalınan, kalenin altındaki tünelleri gösteren parşömen harita.',
      detail: "Bu harita, kraliyet muhafızlarının bile bilmediği gizli geçitleri gösteriyor. Bir geçit doğrudan şarap mahzeninden orman kenarına uzanıyor. Manastır kilidi kırılmıştı — biri bu haritayı çalıp kullandı.",
    },
    'black-feather': {
      name: 'Manastır Kargası Tüyü',
      description: "Manastırın mührünü taşıyan, alışılmadık büyüklükte siyah bir tüy.",
      detail: "Bu tüy, manastırın kafesliğinde tutulan haberleşme kargalarına ait — gizli mesaj taşımak için yetiştirilmiş. Peder Tomas, kargaları kralın kaybolduğu gece serbest bıraktığını kabul etti. Bir uyarı gönderdi. Çok geç.",
    },
    'poison-vial': {
      name: "Hekimin Zehir Şişesi",
      description: "Mira'nın işaretini taşıyan boş cam şişe, Nightshade Cevheri özü kalıntısıyla.",
      detail: "Nightshade Cevheri özü — Unutulmuş Maden'den elde edilen nadir bir mineral. Ölümden önce tam felce yol açıyor ve şarapta iz bırakmıyor. Mira sorgu sırasında, baskı altında bunu hazırladığını itiraf etti. Lord Cedric ailesini tehdit etmişti.",
    },
    'midnight-log': {
      name: 'Gece Yarısı Giriş Defteri',
      description: "Muhafız defteri: Lord Cedric'in mühürü üçüncü saatte hazineye erişmek için kullanıldı.",
      detail: "Defter, Lord Cedric'in kişisel mührüyle üçüncü saatte yetkisiz bir girişi kaydediyor. Hazine, gizli bir kapıyla kraliyet şarap mahzenine bağlanıyor. Birisi o gece kralın şarabını zehirledi.",
    },
  },

  dialogue: {
    'queen-elara': {
      'start': {
        text: "Dedektif. Kocamı çabucak bulmanız için dua ediyorum. Haber alamamak yüreğimi parçalıyor.",
        options: {
          'ask-last-seen': 'Kralı en son ne zaman gördünüz?',
          'ask-cedric': 'O gece Lord Cedric ile konuşurken görüldünüz.',
          'ask-glove': 'Hazine yakınında ipek bir eldiven buldum. Tanıyor musunuz?',
        },
      },
      'last-seen': {
        text: "Akşam yemeğinde. Rahatsız görünüyordu — şarabına neredeyse hiç dokunmadı. Ardından acil işleri olduğunu söyleyerek hazineye geçti. Onu son gördüğüm o andı.",
        options: {
          'ask-troubled': 'Onu ne rahatsız ediyordu?',
          'return': 'Şimdilik başka sorum yok.',
        },
      },
      'troubled': {
        text: "Saraydaki bazı kişilerden şüphelenmeye başlamıştı. İsim vermedi ama yanı başındaki birinin devlet sırlarını sattığını söyledi. Onlarla yüzleşmek istiyordu.",
        options: {
          'ask-who': 'Kimin olduğunu söyledi mi?',
          'return': 'Anlıyorum. Teşekkürler.',
        },
      },
      'who': {
        text: "Hayır. Yalnızca ihanet edenin bağlılık maskesi taktığını söyledi. Yanına Sir Rowan'ı almasını yalvardım. Reddetti. Bunu tek başına halletmesi gerektiğini söyledi. Daha ısrarcı olmalıydım.",
        options: { 'return': 'Teşekkürler, Majesteleri.' },
      },
      'cedric-question': {
        text: "Lord Cedric, güvenlik amaçlı kale kapılarının kapatılacağını bildirmek için geldi. Kısa bir konuşmaydı. Başka bir şey yoktu.",
        options: {
          'press': 'Muhafızlar konuşmanın bir saatten fazla sürdüğünü söylüyor.',
          'believe': 'Elbette, Majesteleri.',
        },
      },
      'pressed': {
        text: "Beni suçlamaya mı cüret ediyorsunuz? Ben kraliçeyim! Lord Cedric eski bir aile dostudur — başka bir şey değil. Sizi saraydan tamamen çıkarmadan önce gözümün önünden çekilin.",
        options: { 'leave': 'Affedersiniz, Majesteleri.' },
      },
      'glove-reveal': {
        text: "Ben... hayır. O eldiveni hiç görmedim. Nerede buldunuz?",
        options: {
          'reveal-location': 'Hazine girişi yakınında.',
          'stay-quiet': 'Söyleyemem.',
        },
      },
      'glove-response': {
        text: "Bu... oraya gitmiş olabilirim. Kralı aramak için. Evet, oraya gittim. Ama hiçbir şey bulamadım.",
        options: { 'return': 'Elbette.' },
      },
    },
    'lord-cedric': {
      'start': {
        text: "Dedektif. Umarım bu kısa sürer. Kral... rahatsızken krallığı idare etmem gerekiyor.",
        options: {
          'ask-seal': 'Kaybolma açıklanmadan neden kapılar kapatıldı?',
          'ask-midnight': 'Mühürünüz gece yarısı hazineye erişmek için kullanıldı.',
          'ask-relationship': 'Kral ile ilişkinizi anlatır mısınız?',
        },
      },
      'gate-sealed': {
        text: "O akşam suikast tehdidine dair istihbarat aldım. Standart önlem. Krallığın çıkarı için hareket ettim.",
        options: {
          'press-gates': 'Ne tür bir istihbarat? Kimden?',
          'accept': 'Anlıyorum.',
        },
      },
      'intelligence': {
        text: "Gizli bir muhbir. Kimliği açık nedenlerle koruma altında. Bu soruşturma uğruna devlet güvenliğini tehlikeye atmayacağım.",
        options: { 'return': 'Pekâlâ.' },
      },
      'midnight': {
        text: "Yanılıyorsunuz. Mühürüm kullanılmadı. Ya da kullanıldıysa, biri sahte bir tane edindi. Bu yolu araştırmanızı öneririm.",
        options: {
          'press-seal': "Defter, muhafızın kendi el yazısıyla tutulmuş. Sahte değil.",
          'drop': 'Daha fazla araştıracağım.',
        },
      },
      'seal-pressed': {
        text: "Muhafızlar hata yapar. Çok yorgunlar. Başka sorunuz yoksa arama partisini koordine etmem gerekiyor.",
        options: { 'return': 'Bu kadar yeter.' },
      },
      'relationship': {
        text: "Kral ile her komutanın kendi efendisiyle yaşayacağı anlaşmazlıkları yaşadık. Ama tacına bağlıyım. Bu krallık için kan döktüm. Aksini düşünmek hakarettir.",
        options: {
          'ask-disagreements': 'Ne tür anlaşmazlıklar?',
          'return': 'Anlaşıldı.',
        },
      },
      'disagreements': {
        text: "Kral yumuşaktı. Yalnızca demiri hak eden sınır beyleriyle müzakere etmek istiyordu. Krallığı zayıflatıyordu. Ama bu bana onu incitme nedeni vermedi. Zayıf bir kral bile BENİM kralımdır.",
        options: { 'return': 'Dürüstlüğünüz için teşekkürler.' },
      },
    },
    'father-tomas': {
      'start': {
        text: "Tanrı'nın huzuru üzerinize olsun, dedektif. Krallığa karanlık bir saat çöktü. Her gün kral için dua ediyorum.",
        options: {
          'ask-whereabouts': 'Kralın kaybolduğu gece neredeydiniz?',
          'ask-ravens': 'O gece neden tüm kargalarınız serbest bırakıldı?',
          'ask-map': 'Kalenin altındaki gizli geçitleri anlatır mısınız?',
        },
      },
      'whereabouts': {
        text: "Ben... ruhani bir özel meseleyle meşguldüm. Bir nöbet. Geceyi duada geçirdim.",
        options: {
          'press-vigil': 'Yalnız mıydınız? Tanık yok mu?',
          'accept': 'Bir din adamının ifadesi, öyleyse.',
        },
      },
      'alone': {
        text: "Tanrı tanığımdı. Bu sizin için yeterli değilse, daha fazlasını sunamam.",
        options: { 'return': 'Yeniden konuşacağız, Peder.' },
      },
      'ravens': {
        text: "Kuşlar huzursuzlandı. Hayvanlar bizim hissedemediğimizi hisseder. Sakinleştirmek için serbest bıraktım. İlk defa değil.",
        options: {
          'press-ravens': 'Ya da o gece mesaj gönderdiniz.',
          'accept': 'Anlıyorum.',
        },
      },
      'ravens-pressed': {
        text: "Ben... Tanrı bağışlasın. Evet. Krala bir uyarı gönderdim. Hayatına yönelik bir komplo öğrenmiştim. Onu kurtarmaya çalışıyordum.",
        options: { 'ask-plot': 'Hangi komplo? Kim söyledi?' },
      },
      'plot': {
        text: "Bir adam günah çıkarmaya geldi. İtirafın mührünü kıramam. Ama şunu söyleyebilirim: kral, bağlılık yemini eden biri tarafından ihanete uğradı. Ve maden demirden daha karanlık bir sırrı saklıyor.",
        options: {
          'ask-mine': 'Maden ne sırrı saklıyor?',
          'return': 'Teşekkürler, Peder.',
        },
      },
      'mine-secret': {
        text: "Nightshade Cevheri. Çıkarıyorlar — dövme için değil. Zehir için. Kral sessizce yok edilecekti, iz ya da yara bırakmadan. Tanrı ruhuna merhamet etsin.",
        options: { 'return': 'Çok yardımcı oldunuz, Peder.' },
      },
      'passages': {
        text: "Manastır kaleden önce inşa edildi. Yeraltı yollarının kayıtları — haritaları — var. Kilitlemiştim. Ama üç gün önce kilidinin kırıldığını fark ettim.",
        options: { 'ask-who': 'Biri haritaları çaldı mı?' },
      },
      'who-stole': {
        text: "Evet. Kim aldıysa nereye bakacağını tam biliyordu. Haritalar şarap mahzeninden ormana uzanan bir geçidi gösteriyor. Biri kale içinde görünmeden hareket edebilirdi.",
        options: { 'return': 'Bu her şeyi değiştiriyor.' },
      },
    },
    'sir-rowan': {
      'start': {
        text: "Onunla birlikte olmalıydım. Yanından hiç ayrılmamalıydım. Ne olduysa... bu suçluluğu taşıyorum.",
        options: {
          'ask-post': 'Kral kaybolduğunda neredeydiniz?',
          'ask-footprints': 'O gece Demir Ormanı yakınında mıydınız?',
          'ask-known': 'Kral hayatına yönelik herhangi bir tehditten söz etti mi?',
        },
      },
      'post': {
        text: "Lord Cedric beni görevimden çekti. Kuzey kapısında kişisel ilgimi gerektiren bir karışıklık olduğunu söyledi. Döndüğümde kral çoktan gitmişti.",
        options: {
          'press-cedric': 'Lord Cedric sizi kralın yanından uzaklaştırdı mı?',
          'accept': 'Anlıyorum.',
        },
      },
      'cedric-blame': {
        text: "O an sorgulamadım. Cedric benden üst rütbeli. Ama geriye dönüp bakınca — evet. Beni kasıtlı olarak uzaklaştırdı. Şimdi bundan eminim.",
        options: {
          'ask-why': 'Cedric neden sizi uzaklaştırmak istedi?',
          'return': 'Teşekkürler, Sir Rowan.',
        },
      },
      'why-cedric': {
        text: "Çünkü kraliyet gerçek anlamda yalnızca bana güvenirdi. Ben orada olsaydım Cedric'in planladığı her şey başarısız olurdu. Beni uzaklaştırması gerekiyordu.",
        options: { 'return': 'Anlıyorum.' },
      },
      'footprints': {
        text: "...Bunu nasıl bildiniz? Kuzey kapısından döndükten sonra ormana gittim. Bir hareket duydum. Ama hiçbir şey yoktu. Yalnızca karanlık.",
        options: {
          'press-forest': 'Çizme izleriniz gizli bir duvar bölümüne uzanıyordu.',
          'return': 'Ve hiçbir şey bulamadınız mı?',
        },
      },
      'wall': {
        text: "Orada bir geçit var. Çok eski. Kral yıllar önce bana göstermişti — yalnızca ikimiz arasında bir sır olduğunu söyledi. Başka biri biliyorsa, kral bu bilgiyi çok az kişiyle paylaşmış demek.",
        options: { 'return': 'Bu çok değerli bir bilgi.' },
      },
      'threats': {
        text: "Evet. Saraydaki birinin ona komplo kurduğunu söyledi. Kimin olduğunu belirtmedi — kanıtların henüz yeterli olmadığını söyledi. Birini yanlışlıkla suçlamak istemiyordu.",
        options: {
          'ask-last-words': 'Size söylediği son sözler ne oldu?',
          'return': 'Anlıyorum.',
        },
      },
      'last-words': {
        text: '"Bu gece işi kesin olarak hallederim." Bunu söyledi. Çok emindi. Sonra uzaklaştırıldım ve onu bir daha görmedim.',
        options: { 'return': 'Teşekkürler. Bu yardımcı olacak.' },
      },
    },
    'mira': {
      'start': {
        text: "Muhafızlara her şeyi anlattım. Daha ne ekleyebileceğimi bilmiyorum.",
        options: {
          'ask-mineral': 'Talep ettiğiniz mineral bileşiği ne içindi?',
          'ask-king': 'Kral kaybolmadan önce sağlığı iyi miydi?',
          'ask-vial': 'Hekimlik işaretinizi taşıyan bir şişe buldum.',
        },
      },
      'mineral': {
        text: "Bir tedavi için. Eklem ağrısı çeken bir hasta. Bileşik doğru hazırlandığında ağrı kesici özelliklere sahip.",
        options: {
          'press-records': 'Kayıtlarınızda böyle bir hasta görünmüyor.',
          'accept': 'Anlıyorum.',
        },
      },
      'records': {
        text: "Ben... bazı kayıtlarımı gizli tutarım. Hasta gizliliği uygulamam için kutsaldır.",
        options: {
          'press-more': 'Kayıtlarını gizleyen bir hekim. Bu oldukça suçlayıcı.',
          'return': 'Buna geri döneceğim.',
        },
      },
      'breaking': {
        text: "Lütfen... başka seçeneğim yoktu. Ailem tehdit edildi. Yalnızca uyku hapı olarak kullanılacağı söylendi. Yemin ederim, bunun... yalnızca uyuyacağını sanıyordum—",
        options: { 'ask-who': 'Sizi kim tehdit etti? Bir isim verin.' },
      },
      'confess': {
        text: "Lord Cedric. Haftalar önce geldi. Yeğenimin acı çekeceğini söyledi. Bileşiği konsantre olarak hazırlamamı istedi. Nightshade Cevheri şarapta çözülüyor. Yeterli miktarda... tam felç yaratıyor. Bir saat içinde.",
        options: { 'return': 'Cesaretin için teşekkürler, Mira.' },
      },
      'health': {
        text: "Kral mükemmel bir sağlığa sahipti. O son gecede onu rahatsız eden şey doğal değildi.",
        options: { 'return': 'Not alındı.' },
      },
      'vial': {
        text: "Bunu nerede... o şişe Nightshade Cevheri konsantresi içeriyor. Eğer buldunuzsa... kullanılmış demek.",
        options: { 'ask-effects': 'Birisine ne yapardı?' },
      },
      'effects': {
        text: "Bir saat içinde tam felç. Kurban bayılıyormuş gibi görünür. Ardından... hiçbir şey. İz yok. Tam olarak ne arayacağını bilmeden kanda belirtisi yok. Bu bir hekimin zehiridir.",
        options: { 'return': 'İhtiyacım olan her şeye sahibim.' },
      },
    },
    'garrett-blacksmith': {
      'start': {
        text: "Ben bir zanaatkârım, dedektif. Ücret karşılığı ne istenirse onu dövüyorum. Politikadan anlamam.",
        options: {
          'ask-blade': 'Gizli sipariş hakkında anlatır mısınız?',
          'ask-sword': "Kralın kılıcının kaybolduğunu ilk ne zaman fark ettiniz?",
          'ask-mine': 'Unutulmuş Maden yakınında ne arıyordunuz?',
        },
      },
      'blade': {
        text: "Her yıl yüzlerce kılıç dövüyorum. Daha açık olun.",
        options: {
          'press-blade': 'Gece vakti. Çırak olmadan. Gizli dövülen.',
          'return': 'Anlıyorum.',
        },
      },
      'blade-pressed': {
        text: "Bir adam sipariş etti. İsim vermedi. Altın ödedi — piyasa fiyatının iki katı. Özel bir hediye olduğunu söyledi. Para doğru olunca soru sormam.",
        options: {
          'ask-description': 'Onu tarif edin.',
          'return': 'Kim olduğuna dair şüpheniz yok mu?',
        },
      },
      'description': {
        text: "Askeri duruşu vardı. Seyahat pelerini altında güzel giysiler. Sol elinde bir yara izi — eski kılıç kesisi. Size söyleyebileceğim bu kadar.",
        options: { 'return': 'Bu işe yarar.' },
      },
      'sword': {
        text: "Dawnbringer'ı her ay bakımını yaparım. Ama kral kaybolmadan iki gece önce kın çoktan boştu. Lord Cedric'e bildirdim. Kimseye söylemememi ve kendisinin halledeceğini söyledi.",
        options: { 'return': 'Cedric biliyordu ve hiçbir şey söylemedi. Teşekkürler.' },
      },
      'mine': {
        text: "Cevher numuneleri arıyordum. Vardığımda, kasalar yükleyen adamlar gördüm — tanımadığım adamlar. Madenci değillerdi. Baktiğimi fark edince beni kovdular.",
        options: {
          'ask-crates': 'Kasalarda ne vardı?',
          'return': 'İlginç.',
        },
      },
      'crates': {
        text: "Bir kasanın çatlağı vardı. Kokusunu aldım — acı, ezilmiş taş ve çürük gibi. Benzerini daha önce hiç koklamamıştım. Adamlarda askeri duruş vardı. Cedric'in adamları, bahse girerim.",
        options: { 'return': 'Teşekkürler, Garrett.' },
      },
    },
  },

  inspectItems: {
    'throne-room': {
      name: 'Taht Odası',
      description: 'Kralın mahkeme kurduğu büyük salon.',
      text: "Taht boş ve gölge içinde duruyor. Kürsü yakınındaki zeminde sürtünme izleri görüyorsunuz — sanki ağır bir şey sürüklenmiş gibi. Şöminenin yanında boş bir törensel kın buluyorsunuz.",
    },
    'treasury-door': {
      name: 'Hazine Girişi',
      description: 'Kraliyet hazinesine açılan demir kaplı kapı.',
      text: "Kapıda zorla girme izleri yok — doğru mühürle açılmış. Eşiğin yakınında, taş bir çıkıntının altında yarı gizli bir ipek eldiven yatıyor. Kan olduğu görülen koyu bir lekeyle kaplı.",
    },
    'guard-post': {
      name: 'Muhafız Nöbet Defteri',
      description: 'Hazine yakınındaki muhafız nöbet yeri.',
      text: "Titizlikle tutulmuş bir defter tüm girişleri kaydediyor. Kaybolma gecesi üçüncü saatte, Lord Cedric'in mührü standart güvenliği devre dışı bırakmak için kullanılmış. Giriş, muhafızın dikkatli el yazısıyla açıkça yazılmış.",
    },
    'ravens-nest': {
      name: 'Yaşlı Meşenin Dibinde',
      description: 'Kocaman düğümlü meşenin köklerinin arasında.',
      text: 'Kadim meşenin kökleri arasında yangın kalıntıları buluyorsunuz — hâlâ sıcak. Biri yakın zamanda burada belgeler yakmış. Külden tek bir parça kurtulmuş: bir mektubun yarısı, mürekkep hâlâ okunabilir. "...iş bitince taht bizim olacak."',
    },
    'raven-perch': {
      name: 'Taş Tünek',
      description: 'Kargaların toplandığı oymalı taş.',
      text: "Taşın üzerinde alışılmadık büyüklükte siyah bir tüy yatıyor. Bu kuşlar manastırda yetiştirilmiş — yazışma için. Sapın dibinde manastır mühürü ve bir gönderim tarihi taşıyan bir etiket var: üç gece önce.",
    },
    'scriptorium': {
      name: 'Yazıhane',
      description: "Manastırın kadim elyazmalarıyla dolu yazma odası.",
      text: "Bir dolap yakın zamanda kırılmış — kilidi zorlanmış. İçeride, büyük bir haritanın bir zamanlar asıldığı boş bir çerçeve. Zeminin yakınında bir parşömen köşesi kalmış: kalenin altındaki geçitleri gösteren bir haritanın kenarı.",
    },
    'aviary': {
      name: 'Karga Kafesliği',
      description: 'Boş bir kafesli kule.',
      text: "Kafes kapıları açık ve boş duruyor. Peder Tomas tüm haberleşme kargalarını kralın kaybolduğu gece serbest bıraktı. Dağılmış tüyler arasında manastır mühürü taşıyan biri buluyorsunuz.",
    },
    'forest-path': {
      name: 'Gizli Orman Yolu',
      description: 'Doğuya, kaleye doğru uzanan neredeyse görünmez bir patika.',
      text: "Patikayı doğuya doğru izleyerek yumuşak toprakta zırhlı çizme izleri buluyorsunuz. Sol topukta bir tamir parçası var — düzensiz dikiş. İzler kalenin doğu duvarı yönünden geliyor ve standart planlarda görünmeyen bir bölüme uzanıyor.",
    },
    'forest-camp': {
      name: 'Terk Edilmiş Kamp',
      description: 'Yakın zamanda kullanıldığına dair işaretler.',
      text: "Yakın zamanda kullanılmış ateş çemberi. Bir yemeğin kemikleri. Askeri kalitede ip, standart teçhizat. Biri burada kalenin doğu girişini izleyerek saatler geçirmiş. Çok sabırlıydılar.",
    },
    'road-crossroads': {
      name: "Kavşak",
      description: "Kral Yolu'nun orman patikasıyla kesiştiği yer.",
      text: "Kavşaktaki zemin alt üst olmuş. Burada bir kavga ya da bir buluşma gerçekleşmiş. Yol işaretinin yakınındaki çamura bastırılmış kırık bir kraliyet mühürü buluyorsunuz: kralın kişisel arması, ikiye bölünmüş.",
    },
    'mine-shaft': {
      name: 'Derin Galeri',
      description: "Madenin yakın zamanda kazılan en derin bölümü.",
      text: "Taşta yeni kazma izleri. Demir aramıyorlar — aradıkları cevher koyu mor bir parıltıyla parlıyor. Galeri duvarı yakınındaki zeminde küçük bir cam şişe bir çatlağa yuvarlanmış. Hekim işaretini taşıyor. İçindeki kalıntı Nightshade Cevheri özünün acı kokusunu yayıyor.",
    },
    'ferryman-crossing': {
      name: "Kayıkçı Geçidi",
      description: 'Aşınmış tahtalarca işaretlenmiş eski bir geçiş noktası.',
      text: "Kayıkçının defteri üç gece önce ikinci saatte olağandışı bir geçişi kaydediyor. Ağır binici kıyafetleri içinde — askeri duruşlu, seyahat pelerin — yalnız geçmiş biri. Altınla ödedi. Pelini astarlığında askeri bir amblem taşıyordu.",
    },
    'village-well': {
      name: 'Köy Kuyusu',
      description: 'Köylülerin toplanıp haber aldığı yer.',
      text: 'Yaşlı bir kadın sizi kenara çekiyor: "Askerler geldi. Bizim askerlerimiz değil — Cedric\'in adamları. Her evi aradılar. Ne aradıklarını söylemediler. O gece tam da kral kaybolmuştu."',
    },
  },

  motives: {
    'seize-throne': { label: 'Tahtı Ele Geçirmek', description: 'Kralı ortadan kaldırıp kraliçeyle ya da onsuz iktidarı almak.' },
    'revenge': { label: 'Kişisel İntikam', description: 'Uzun süredir taşınan bir kin, sonunda gizlice eyleme dönüştürüldü.' },
    'protect-secret': { label: 'Bir Sırrı Korumak', description: 'Kral, onunla birlikte gömülmesi gereken bir şeyi keşfetti.' },
    'ransom': { label: 'Fidye İçin Tutmak', description: 'Kral, siyasi baskı aracı olarak canlı tutuluyor.' },
    'foreign-power': { label: 'Yabancı Güç Komplosu', description: "Dış bir düşman, kralın kaldırılması için ödeme yaptı." },
  },

  methods: {
    'poison': { label: 'Zehir', description: 'Kraliyet şarabında çözülmüş Nightshade Cevheri özüyle sessiz ölüm.' },
    'blade': { label: 'Suikast Kılıcı', description: 'Karanlıkta bir bıçak — hızlı, kararlı, izlenebilir.' },
    'abduction': { label: 'Kaçırma', description: 'Kral, gizli geçitler aracılığıyla canlı alındı.' },
    'exile': { label: 'Zorla Sürgün', description: 'Kral tehdit edilip kaçmaya mecbur bırakıldı.' },
    'accident': { label: 'Sahte Kaza', description: 'Talihsizlik gibi gösterilmek üzere düzenlenmiş bir "kaza."' },
  },

  fullStory: `Kraliyet Ordusu Komutanı Lord Cedric, Kraliçe Elara ile birlikte tahtı ele geçirmek için komplo kurdu.
Düzenlemeleri basitti: kraliçe iktidarı miras alacak, Cedric de onun yanında hükmedecekti.

Söz konusu geceden haftalar önce, Cedric — saray hekimi — Mira'yı Nightshade Cevheri özü konsantresi
hazırlamaya zorladı; yeğeninin hayatını tehdit ederek. Manastırın geçit haritalarından çaldığı kopyayı kullanarak
Cedric, gece yarısı kendi mührüyle güvenliği aşıp hazine üzerinden kraliyet şarap mahzenine girdi.

O akşamki yemek için kralın şarabını zehirledi.

Kral Aldric, ihanet kanıtı olduğuna inandığı şeyle yüzleşmeye çalışırken hazinede yere yığıldı.
Sir Rowan kasıtlı olarak görevden uzaklaştırılmıştı. Kralın cesedi gizli geçitten orman kenarına taşındı
ve Demir Ormanı'nda saklandı.

Peder Tomas, itiraf yoluyla komployu öğrenerek bir kargayla uyarı gönderdi — çok geç.
Kral Yolu'ndaki kırık mühür, Cedric'in adamlarının izi karıştırmak için kralın atını taşımasıyla bırakıldı.

Demirci Garrett, Cedric'in adamlarını madende görmüş ve bilmeden Cedric'in Mira'yı tehdit etmek için
kullandığı kılıcı dövmüştü.

Krallık yalnızca kralını kaybetmedi. Kral, ondan — en çok güvendiği elden — alındı.`,
};
