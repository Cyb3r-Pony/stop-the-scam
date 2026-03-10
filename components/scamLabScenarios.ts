export type ScenarioType = 'email' | 'sms' | 'login_page' | 'investment' | 'notification' | 'message';
export type Classification = 'safe' | 'suspicious' | 'malicious';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface RedFlag {
  title: string;
  description: string;
}

export interface ScenarioContent {
  // Email fields
  sender?: string;
  subject?: string;
  body?: string;
  // SMS fields
  phoneNumber?: string;
  // Login page / investment / message fields
  domain?: string;
  platform?: string;
  description?: string;
  details?: string[];
  // Message fields (Viber/WhatsApp/Telegram)
  app?: string;
  senderName?: string;
}

export interface ScenarioExplanation {
  summary: string;
  redFlags: RedFlag[];
  defensiveAdvice: string;
}

export interface LabScenario {
  id: string;
  category: string;
  categoryBg: string;
  categoryDe: string;
  type: ScenarioType;
  difficulty: Difficulty;
  en: {
    title: string;
    content: ScenarioContent;
    correctAnswer: Classification;
    explanation: ScenarioExplanation;
  };
  bg: {
    title: string;
    content: ScenarioContent;
    correctAnswer: Classification;
    explanation: ScenarioExplanation;
  };
  de: {
    title: string;
    content: ScenarioContent;
    correctAnswer: Classification;
    explanation: ScenarioExplanation;
  };
}

export const scenarios: LabScenario[] = [
  // === SCENARIO 1: Phishing Email — Bank Security Alert ===
  {
    id: 'phishing_email_01',
    category: 'Email Phishing',
    categoryBg: 'Фишинг имейл',
    categoryDe: 'E-Mail-Phishing',
    type: 'email',
    difficulty: 'beginner',
    en: {
      title: 'Urgent Account Security Alert',
      content: {
        sender: 'Security Team <security@bank-secure-alerts.com>',
        subject: 'Immediate Action Required – Suspicious Login Detected',
        body: 'Dear Customer,\n\nWe detected an unusual login attempt from a new device.\nFor your protection your online banking access has been temporarily limited.\n\nTo restore full access please confirm your account information.\n\nConfirm your identity here:\nhttps://bank-secure-alerts.com/login\n\nFailure to verify within 24 hours may result in account suspension.\n\nSecurity Department',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a phishing email impersonating a bank security alert. The attacker attempts to trick the user into entering login credentials on a fake website.',
        redFlags: [
          { title: 'Domain impersonation', description: 'The sender domain "bank-secure-alerts.com" does not match any legitimate bank domain.' },
          { title: 'Urgency tactic', description: 'The message creates pressure with a 24-hour deadline to force quick action.' },
          { title: 'Credential harvesting', description: 'The link directs users to a login page designed to steal credentials.' },
          { title: 'Generic greeting', description: 'Legitimate banks address customers by name, not "Dear Customer".' },
        ],
        defensiveAdvice: 'Never log in through links provided in emails. Always access your bank account by manually typing the official website into your browser.',
      },
    },
    bg: {
      title: 'Спешно предупреждение за сигурност на акаунта',
      content: {
        sender: 'Екип по сигурност <security@bank-secure-alerts.com>',
        subject: 'Необходимо е незабавно действие – Засечен подозрителен вход',
        body: 'Уважаеми клиент,\n\nЗасякохме необичаен опит за вход от ново устройство.\nЗа ваша защита, онлайн банкирането ви е временно ограничено.\n\nЗа да възстановите пълния достъп, моля потвърдете информацията на акаунта си.\n\nПотвърдете самоличността си тук:\nhttps://bank-secure-alerts.com/login\n\nАко не потвърдите в рамките на 24 часа, акаунтът ви може да бъде спрян.\n\nОтдел за сигурност',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е фишинг имейл, имитиращ предупреждение за сигурност от банка. Атакуващият се опитва да накара потребителя да въведе данните си за вход на фалшив уебсайт.',
        redFlags: [
          { title: 'Имитация на домейн', description: 'Домейнът на подателя "bank-secure-alerts.com" не съвпада с легитимен банков домейн.' },
          { title: 'Тактика на спешност', description: 'Съобщението създава натиск с 24-часов срок, за да принуди бързо действие.' },
          { title: 'Кражба на данни за достъп', description: 'Линкът насочва потребителите към страница за вход, предназначена за кражба на пароли.' },
          { title: 'Общо обръщение', description: 'Легитимните банки се обръщат по име, а не с "Уважаеми клиент".' },
        ],
        defensiveAdvice: 'Никога не влизайте чрез линкове от имейли. Винаги достъпвайте банковата си сметка, като въведете официалния уебсайт ръчно в браузъра.',
      },
    },
    de: {
      title: 'Dringende Sicherheitswarnung fuer Ihr Konto',
      content: {
        sender: 'Sicherheitsteam <security@bank-secure-alerts.com>',
        subject: 'Sofortiges Handeln erforderlich – Verdaechtiger Login erkannt',
        body: 'Sehr geehrter Kunde,\n\nWir haben einen ungewoehnlichen Anmeldeversuch von einem neuen Geraet erkannt.\nZu Ihrem Schutz wurde Ihr Online-Banking-Zugang voruebergehend eingeschraenkt.\n\nUm den vollen Zugang wiederherzustellen, bestaetigen Sie bitte Ihre Kontoinformationen.\n\nBestaetigen Sie Ihre Identitaet hier:\nhttps://bank-secure-alerts.com/login\n\nWenn Sie nicht innerhalb von 24 Stunden verifizieren, kann Ihr Konto gesperrt werden.\n\nSicherheitsabteilung',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist eine Phishing-E-Mail, die eine Bank-Sicherheitswarnung imitiert. Der Angreifer versucht, den Benutzer dazu zu bringen, Anmeldedaten auf einer gefaelschten Website einzugeben.',
        redFlags: [
          { title: 'Domain-Imitation', description: 'Die Absenderdomain "bank-secure-alerts.com" stimmt mit keiner legitimen Bankdomain ueberein.' },
          { title: 'Dringlichkeitstaktik', description: 'Die Nachricht erzeugt Druck mit einer 24-Stunden-Frist.' },
          { title: 'Zugangsdaten-Diebstahl', description: 'Der Link fuehrt zu einer Anmeldeseite, die zum Stehlen von Zugangsdaten dient.' },
          { title: 'Allgemeine Anrede', description: 'Legitime Banken sprechen Kunden mit Namen an, nicht mit "Sehr geehrter Kunde".' },
        ],
        defensiveAdvice: 'Melden Sie sich niemals ueber Links in E-Mails an. Greifen Sie immer auf Ihr Bankkonto zu, indem Sie die offizielle Website manuell in den Browser eingeben.',
      },
    },
  },

  // === SCENARIO 2: SMS Scam — Parcel Delivery ===
  {
    id: 'smishing_delivery_02',
    category: 'SMS Scam',
    categoryBg: 'SMS измама',
    categoryDe: 'SMS-Betrug',
    type: 'sms',
    difficulty: 'beginner',
    en: {
      title: 'Parcel Delivery Notification',
      content: {
        phoneNumber: '+447582931112',
        body: 'DHL: Your package delivery failed due to an incomplete address.\n\nPlease update your delivery details immediately to avoid return to sender.\n\nUpdate delivery address here:\nhttps://dhl-parcel-update.com',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a smishing attack pretending to be a parcel delivery notification. Attackers exploit expectations of online deliveries to trick victims into clicking malicious links.',
        redFlags: [
          { title: 'Unknown sender number', description: 'Legitimate delivery companies send messages from short codes or official channels, not random phone numbers.' },
          { title: 'Suspicious domain', description: '"dhl-parcel-update.com" is not an official DHL website. The real domain is dhl.com.' },
          { title: 'Urgency manipulation', description: 'The message pressures you to act quickly with "immediately" to avoid rational thinking.' },
        ],
        defensiveAdvice: 'Never click delivery links from unsolicited SMS messages. Check delivery status directly through the official courier website or app.',
      },
    },
    bg: {
      title: 'Известие за доставка на пратка',
      content: {
        phoneNumber: '+447582931112',
        body: 'DHL: Доставката на вашата пратка е неуспешна поради непълен адрес.\n\nМоля, актуализирайте данните за доставка незабавно, за да избегнете връщане на пратката.\n\nАктуализирайте адреса тук:\nhttps://dhl-parcel-update.com',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е смишинг атака, представяща се за известие за доставка. Атакуващите използват очакванията за онлайн доставки, за да подмамят жертвите да кликнат на зловредни линкове.',
        redFlags: [
          { title: 'Непознат номер на подател', description: 'Легитимните куриерски компании изпращат съобщения от кратки номера или официални канали, не от случайни телефонни номера.' },
          { title: 'Подозрителен домейн', description: '"dhl-parcel-update.com" не е официален уебсайт на DHL. Истинският домейн е dhl.com.' },
          { title: 'Манипулация чрез спешност', description: 'Съобщението ви притиска да действате бързо с "незабавно", за да предотврати рационално мислене.' },
        ],
        defensiveAdvice: 'Никога не кликайте на линкове за доставки от нежелани SMS съобщения. Проверявайте статуса на доставката директно чрез официалния уебсайт или приложение на куриера.',
      },
    },
    de: {
      title: 'Paketzustellungsbenachrichtigung',
      content: {
        phoneNumber: '+447582931112',
        body: 'DHL: Ihre Paketzustellung ist aufgrund einer unvollstaendigen Adresse fehlgeschlagen.\n\nBitte aktualisieren Sie Ihre Lieferdetails sofort, um eine Ruecksendung zu vermeiden.\n\nLieferadresse hier aktualisieren:\nhttps://dhl-parcel-update.com',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist ein Smishing-Angriff, der sich als Paketzustellungsbenachrichtigung ausgibt. Angreifer nutzen die Erwartung von Online-Lieferungen, um Opfer zum Klicken auf schaedliche Links zu verleiten.',
        redFlags: [
          { title: 'Unbekannte Absendernummer', description: 'Legitime Lieferunternehmen senden Nachrichten von Kurzwahlnummern oder offiziellen Kanaelen, nicht von zufaelligen Telefonnummern.' },
          { title: 'Verdaechtige Domain', description: '"dhl-parcel-update.com" ist keine offizielle DHL-Website. Die echte Domain ist dhl.com.' },
          { title: 'Dringlichkeitsmanipulation', description: 'Die Nachricht draengt Sie mit "sofort" zum schnellen Handeln, um rationales Denken zu verhindern.' },
        ],
        defensiveAdvice: 'Klicken Sie niemals auf Lieferlinks aus unaufgeforderten SMS-Nachrichten. Pruefen Sie den Lieferstatus direkt ueber die offizielle Kurier-Website oder App.',
      },
    },
  },

  // === SCENARIO 3: Fake Login Page — Cloud Storage ===
  {
    id: 'login_page_03',
    category: 'Fake Login Page',
    categoryBg: 'Фалшива страница за вход',
    categoryDe: 'Gefaelschte Login-Seite',
    type: 'login_page',
    difficulty: 'intermediate',
    en: {
      title: 'Cloud Storage Login Portal',
      content: {
        domain: 'https://secure-cloudfiles-login.com',
        description: 'A user receives a link to view a shared document. The link opens a login page that visually resembles a popular cloud storage service.',
        details: [
          'The page asks for: Email address and Password',
          'The URL is: secure-cloudfiles-login.com',
          'The page design looks identical to a well-known cloud service',
          'There is no company logo in the browser tab',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a fake login page designed to harvest account credentials. Attackers clone legitimate login pages and host them on lookalike domains.',
        redFlags: [
          { title: 'Lookalike domain', description: 'The domain "secure-cloudfiles-login.com" resembles a cloud provider but is not the official service.' },
          { title: 'Credential harvesting', description: 'The page directly requests login credentials — email and password.' },
          { title: 'Unexpected authentication', description: 'Users should not be asked to log in through third-party document sharing links.' },
        ],
        defensiveAdvice: 'Before entering credentials, always verify the domain name in the browser address bar. Access cloud services directly through the official website.',
      },
    },
    bg: {
      title: 'Портал за вход в облачно хранилище',
      content: {
        domain: 'https://secure-cloudfiles-login.com',
        description: 'Потребител получава линк за преглед на споделен документ. Линкът отваря страница за вход, която визуално наподобява популярна услуга за облачно съхранение.',
        details: [
          'Страницата иска: Имейл адрес и Парола',
          'URL адресът е: secure-cloudfiles-login.com',
          'Дизайнът на страницата изглежда идентичен с известна облачна услуга',
          'Няма фирмено лого в таба на браузъра',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е фалшива страница за вход, предназначена за кражба на данни за достъп. Атакуващите клонират легитимни страници за вход и ги хостват на домейни-имитации.',
        redFlags: [
          { title: 'Домейн-имитация', description: 'Домейнът "secure-cloudfiles-login.com" прилича на облачен доставчик, но не е официалната услуга.' },
          { title: 'Кражба на данни за достъп', description: 'Страницата директно иска данни за вход — имейл и парола.' },
          { title: 'Неочаквано удостоверяване', description: 'Потребителите не трябва да бъдат карани да влизат чрез линкове за споделяне на документи от трети страни.' },
        ],
        defensiveAdvice: 'Преди да въведете данни за достъп, винаги проверявайте домейна в адресната лента на браузъра. Достъпвайте облачните услуги директно чрез официалния уебсайт.',
      },
    },
    de: {
      title: 'Cloud-Speicher-Anmeldeportal',
      content: {
        domain: 'https://secure-cloudfiles-login.com',
        description: 'Ein Benutzer erhaelt einen Link, um ein freigegebenes Dokument anzuzeigen. Der Link oeffnet eine Anmeldeseite, die einem beliebten Cloud-Speicherdienst visuell aehnelt.',
        details: [
          'Die Seite fragt nach: E-Mail-Adresse und Passwort',
          'Die URL ist: secure-cloudfiles-login.com',
          'Das Seitendesign sieht identisch mit einem bekannten Cloud-Dienst aus',
          'Es gibt kein Firmenlogo im Browser-Tab',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist eine gefaelschte Anmeldeseite zum Abfangen von Zugangsdaten. Angreifer klonen legitime Anmeldeseiten und hosten sie auf aehnlich aussehenden Domains.',
        redFlags: [
          { title: 'Aehnlich aussehende Domain', description: 'Die Domain "secure-cloudfiles-login.com" aehnelt einem Cloud-Anbieter, ist aber nicht der offizielle Dienst.' },
          { title: 'Zugangsdaten-Abfrage', description: 'Die Seite fragt direkt nach Anmeldedaten — E-Mail und Passwort.' },
          { title: 'Unerwartete Authentifizierung', description: 'Benutzer sollten nicht aufgefordert werden, sich ueber Links von Drittanbietern anzumelden.' },
        ],
        defensiveAdvice: 'Ueberpruefen Sie vor der Eingabe von Zugangsdaten immer den Domainnamen in der Browser-Adressleiste. Greifen Sie direkt ueber die offizielle Website auf Cloud-Dienste zu.',
      },
    },
  },

  // === SCENARIO 4: Crypto Investment Platform ===
  {
    id: 'investment_platform_04',
    category: 'Investment Scam',
    categoryBg: 'Инвестиционна измама',
    categoryDe: 'Anlagebetrug',
    type: 'investment',
    difficulty: 'intermediate',
    en: {
      title: 'Crypto Investment Platform',
      content: {
        platform: 'CryptoFutureGain',
        domain: 'https://cryptofuturegain.io',
        description: 'A user discovers an online platform called CryptoFutureGain that advertises AI-powered crypto trading.',
        details: [
          'Guaranteed daily returns of 5-8%',
          'AI-powered crypto trading system',
          'Instant withdrawals promised',
          'Limited time investment opportunity',
          'Minimum deposit: $500',
          'No regulatory or license information visible',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a fraudulent crypto investment platform. Many scams promise unrealistic profits to lure victims into depositing funds that they will never recover.',
        redFlags: [
          { title: 'Guaranteed profits', description: 'No legitimate investment can guarantee daily returns. All investments carry risk.' },
          { title: 'Unrealistic returns', description: '5-8% daily returns are mathematically implausible and a hallmark of Ponzi schemes.' },
          { title: 'Pressure marketing', description: '"Limited time opportunity" is a classic scam tactic to push you into quick deposits.' },
          { title: 'No regulatory info', description: 'Legitimate financial platforms always disclose licensing and regulation details.' },
        ],
        defensiveAdvice: 'Always research investment platforms before depositing funds. Verify regulatory licenses through official registers (FSC, FCA, CySEC, ESMA).',
      },
    },
    bg: {
      title: 'Крипто инвестиционна платформа',
      content: {
        platform: 'CryptoFutureGain',
        domain: 'https://cryptofuturegain.io',
        description: 'Потребител открива онлайн платформа, наречена CryptoFutureGain, която рекламира AI-базирана крипто търговия.',
        details: [
          'Гарантирана дневна доходност от 5-8%',
          'Система за крипто търговия с изкуствен интелект',
          'Обещани мигновени тегления',
          'Ограничена по време инвестиционна възможност',
          'Минимален депозит: $500',
          'Няма видима информация за регулация или лиценз',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е измамна крипто инвестиционна платформа. Много измами обещават нереалистични печалби, за да примамят жертвите да депозират средства, които никога няма да възстановят.',
        redFlags: [
          { title: 'Гарантирани печалби', description: 'Нито една легитимна инвестиция не може да гарантира дневна доходност. Всички инвестиции носят риск.' },
          { title: 'Нереалистична доходност', description: '5-8% дневна доходност е математически невъзможна и е отличителен белег на схеми на Понци.' },
          { title: 'Маркетинг с натиск', description: '"Ограничена по време възможност" е класическа тактика за принуждаване към бърз депозит.' },
          { title: 'Липса на регулаторна информация', description: 'Легитимните финансови платформи винаги разкриват информация за лицензиране и регулация.' },
        ],
        defensiveAdvice: 'Винаги проучвайте инвестиционните платформи преди депозиране. Проверявайте лицензите чрез официални регистри (КФН, FCA, CySEC, ESMA).',
      },
    },
    de: {
      title: 'Krypto-Investitionsplattform',
      content: {
        platform: 'CryptoFutureGain',
        domain: 'https://cryptofuturegain.io',
        description: 'Ein Benutzer entdeckt eine Online-Plattform namens CryptoFutureGain, die KI-gestuetzten Krypto-Handel bewirbt.',
        details: [
          'Garantierte taegliche Renditen von 5-8%',
          'KI-gestuetztes Krypto-Handelssystem',
          'Sofortige Auszahlungen versprochen',
          'Zeitlich begrenzte Investitionsmoeglichkeit',
          'Mindesteinlage: 500 $',
          'Keine Regulierungs- oder Lizenzinformationen sichtbar',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist eine betruegerische Krypto-Investitionsplattform. Viele Betrueger versprechen unrealistische Gewinne, um Opfer zur Einzahlung von Geldern zu verleiten, die sie nie zurueckerhalten.',
        redFlags: [
          { title: 'Garantierte Gewinne', description: 'Keine legitime Investition kann taegliche Renditen garantieren. Alle Investitionen bergen Risiken.' },
          { title: 'Unrealistische Renditen', description: '5-8% taegliche Renditen sind mathematisch unplausibel und ein Kennzeichen von Ponzi-Systemen.' },
          { title: 'Druckmarketing', description: '"Zeitlich begrenzte Moeglichkeit" ist eine klassische Betrugstaktik fuer schnelle Einzahlungen.' },
          { title: 'Keine regulatorischen Infos', description: 'Legitime Finanzplattformen legen immer Lizenz- und Regulierungsdetails offen.' },
        ],
        defensiveAdvice: 'Recherchieren Sie immer Investitionsplattformen vor einer Einzahlung. Ueberpruefen Sie Lizenzen ueber offizielle Register (BaFin, FCA, CySEC, ESMA).',
      },
    },
  },

  // === SCENARIO 5: Legitimate Notification — SAFE ===
  {
    id: 'legitimate_notification_05',
    category: 'Security Notification',
    categoryBg: 'Известие за сигурност',
    categoryDe: 'Sicherheitsbenachrichtigung',
    type: 'notification',
    difficulty: 'advanced',
    en: {
      title: 'Account Login Notification',
      content: {
        sender: 'security@company.com',
        subject: 'New login detected',
        body: 'A new login to your account was detected.\n\nDevice: Chrome on Windows\nLocation: Berlin, Germany\nTime: 21:17 UTC\n\nIf this was you, no action is required.\n\nIf you do not recognize this activity, reset your password immediately through your account settings.',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'This is a legitimate account security notification. Many online services send alerts when logins occur from new locations or devices.',
        redFlags: [
          { title: 'No urgent pressure', description: 'The message does not demand immediate action or threaten consequences.' },
          { title: 'No external links', description: 'Users are instructed to access account settings themselves, not through a provided link.' },
          { title: 'Contextual information', description: 'The notification includes specific device, location, and time details — typical of real security alerts.' },
        ],
        defensiveAdvice: 'Security notifications should always be reviewed carefully. If an unexpected login occurs, access the account directly and change your password.',
      },
    },
    bg: {
      title: 'Известие за нов вход в акаунта',
      content: {
        sender: 'security@company.com',
        subject: 'Засечен нов вход',
        body: 'Засечен е нов вход във вашия акаунт.\n\nУстройство: Chrome на Windows\nМестоположение: Берлин, Германия\nЧас: 21:17 UTC\n\nАко това сте вие, не е необходимо действие.\n\nАко не разпознавате тази активност, сменете паролата си незабавно чрез настройките на акаунта.',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'Това е легитимно известие за сигурност на акаунта. Много онлайн услуги изпращат предупреждения при вход от нови местоположения или устройства.',
        redFlags: [
          { title: 'Без спешен натиск', description: 'Съобщението не изисква незабавно действие и не заплашва с последствия.' },
          { title: 'Без външни линкове', description: 'Потребителите са инструктирани сами да достъпят настройките на акаунта, а не чрез предоставен линк.' },
          { title: 'Контекстуална информация', description: 'Известието включва конкретни данни за устройство, местоположение и час — типично за реални предупреждения.' },
        ],
        defensiveAdvice: 'Известията за сигурност трябва винаги да се преглеждат внимателно. При неочакван вход, достъпете акаунта директно и сменете паролата си.',
      },
    },
    de: {
      title: 'Konto-Anmeldebenachrichtigung',
      content: {
        sender: 'security@company.com',
        subject: 'Neue Anmeldung erkannt',
        body: 'Eine neue Anmeldung bei Ihrem Konto wurde erkannt.\n\nGeraet: Chrome auf Windows\nStandort: Berlin, Deutschland\nZeit: 21:17 UTC\n\nWenn Sie das waren, ist keine Aktion erforderlich.\n\nWenn Sie diese Aktivitaet nicht erkennen, aendern Sie Ihr Passwort sofort ueber Ihre Kontoeinstellungen.',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'Dies ist eine legitime Konto-Sicherheitsbenachrichtigung. Viele Online-Dienste senden Warnungen bei Anmeldungen von neuen Standorten oder Geraeten.',
        redFlags: [
          { title: 'Kein dringender Druck', description: 'Die Nachricht verlangt keine sofortige Aktion und droht nicht mit Konsequenzen.' },
          { title: 'Keine externen Links', description: 'Benutzer werden angewiesen, selbst auf die Kontoeinstellungen zuzugreifen, nicht ueber einen bereitgestellten Link.' },
          { title: 'Kontextinformationen', description: 'Die Benachrichtigung enthaelt spezifische Geraete-, Standort- und Zeitdetails — typisch fuer echte Sicherheitswarnungen.' },
        ],
        defensiveAdvice: 'Sicherheitsbenachrichtigungen sollten immer sorgfaeltig geprueft werden. Bei einer unerwarteten Anmeldung greifen Sie direkt auf das Konto zu und aendern Sie Ihr Passwort.',
      },
    },
  },

  // === SCENARIO 6: Romance Scam Message ===
  {
    id: 'romance_scam_06',
    category: 'Romance Scam',
    categoryBg: 'Романтична измама',
    categoryDe: 'Liebesbetrug',
    type: 'message',
    difficulty: 'intermediate',
    en: {
      title: 'New Online Acquaintance Asking for Help',
      content: {
        app: 'WhatsApp',
        senderName: 'Sofia M.',
        body: 'Hey, I know we just met on the dating app last week, but I feel such a strong connection with you.\n\nI\'m actually in a terrible situation right now. I\'m stuck abroad in Thailand and my wallet was stolen. I can\'t access my bank from here.\n\nCould you please send me $800 through Western Union? I promise I\'ll pay you back as soon as I get home. I really need your help.\n\nI\'ve never asked anyone for money before, but you\'re the only person I trust right now.',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a classic romance scam. The scammer builds emotional connection quickly, then fabricates an emergency requiring money. Victims rarely recover sent funds.',
        redFlags: [
          { title: 'Rapid emotional escalation', description: 'Claiming a "strong connection" after just one week is a manipulation tactic to build false trust.' },
          { title: 'Emergency money request', description: 'Fabricated emergencies abroad are one of the most common romance scam scripts.' },
          { title: 'Untraceable payment method', description: 'Western Union transfers are nearly impossible to reverse — a preferred method for scammers.' },
          { title: 'Isolation tactic', description: '"You\'re the only person I trust" is designed to prevent you from consulting others.' },
        ],
        defensiveAdvice: 'Never send money to someone you have only met online. If they claim an emergency, suggest they contact their embassy or local authorities.',
      },
    },
    bg: {
      title: 'Нов онлайн познат моли за помощ',
      content: {
        app: 'WhatsApp',
        senderName: 'София М.',
        body: 'Здравей, знам че се запознахме в приложението за запознанства едва миналата седмица, но чувствам толкова силна връзка с теб.\n\nВ момента съм в ужасна ситуация. Заседнала съм в Тайланд и портфейлът ми беше откраднат. Не мога да достъпя банката си от тук.\n\nМоже ли да ми изпратиш $800 чрез Western Union? Обещавам да ти ги върна веднага щом се прибера. Наистина имам нужда от помощта ти.\n\nНикога не съм молила никого за пари, но ти си единственият човек, на когото имам доверие в момента.',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е класическа романтична измама. Измамникът бързо изгражда емоционална връзка, след което измисля спешна ситуация, изискваща пари. Жертвите рядко възстановяват изпратените средства.',
        redFlags: [
          { title: 'Бърза емоционална ескалация', description: 'Твърдението за "силна връзка" след само една седмица е тактика за изграждане на фалшиво доверие.' },
          { title: 'Спешна молба за пари', description: 'Измислени извънредни ситуации в чужбина са един от най-честите сценарии на романтични измами.' },
          { title: 'Непроследим метод на плащане', description: 'Преводите чрез Western Union са почти невъзможни за връщане — предпочитан метод на измамниците.' },
          { title: 'Тактика на изолация', description: '"Ти си единственият, на когото имам доверие" е предназначено да ви попречи да се консултирате с други.' },
        ],
        defensiveAdvice: 'Никога не изпращайте пари на някого, когото сте срещнали само онлайн. Ако твърдят спешна ситуация, предложете да се свържат с посолството или местните власти.',
      },
    },
    de: {
      title: 'Neue Online-Bekanntschaft bittet um Hilfe',
      content: {
        app: 'WhatsApp',
        senderName: 'Sofia M.',
        body: 'Hey, ich weiss, wir haben uns erst letzte Woche auf der Dating-App kennengelernt, aber ich fuehle eine so starke Verbindung zu dir.\n\nIch bin gerade in einer schrecklichen Situation. Ich sitze in Thailand fest und meine Geldboerse wurde gestohlen. Ich kann von hier aus nicht auf meine Bank zugreifen.\n\nKoenntest du mir bitte 800 $ ueber Western Union schicken? Ich verspreche, ich zahle es zurueck, sobald ich zu Hause bin. Ich brauche wirklich deine Hilfe.\n\nIch habe noch nie jemanden um Geld gebeten, aber du bist die einzige Person, der ich gerade vertraue.',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist ein klassischer Liebesbetrug. Der Betrueger baut schnell eine emotionale Bindung auf und erfindet dann einen Notfall, der Geld erfordert. Opfer erhalten gesendete Gelder selten zurueck.',
        redFlags: [
          { title: 'Schnelle emotionale Eskalation', description: 'Eine "starke Verbindung" nach nur einer Woche zu behaupten, ist eine Manipulationstaktik fuer falsches Vertrauen.' },
          { title: 'Notfall-Geldforderung', description: 'Erfundene Notfaelle im Ausland sind eines der haeufigsten Liebesbetrug-Szenarien.' },
          { title: 'Nicht rueckverfolgbare Zahlungsmethode', description: 'Western-Union-Ueberweisungen sind fast unmoeglich rueckgaengig zu machen — eine bevorzugte Methode von Betruegern.' },
          { title: 'Isolationstaktik', description: '"Du bist die einzige Person, der ich vertraue" soll verhindern, dass Sie andere konsultieren.' },
        ],
        defensiveAdvice: 'Senden Sie niemals Geld an jemanden, den Sie nur online kennengelernt haben. Bei behaupteten Notfaellen schlagen Sie vor, die Botschaft oder lokale Behoerden zu kontaktieren.',
      },
    },
  },

  // === SCENARIO 7: Legitimate 2FA Code — SAFE ===
  {
    id: 'legitimate_2fa_07',
    category: 'Two-Factor Authentication',
    categoryBg: 'Двуфакторна автентикация',
    categoryDe: 'Zwei-Faktor-Authentifizierung',
    type: 'sms',
    difficulty: 'advanced',
    en: {
      title: 'Verification Code SMS',
      content: {
        phoneNumber: 'Google',
        body: 'G-482916 is your Google verification code. Don\'t share this code with anyone. If you didn\'t request it, ignore this message.\n\nhttps://goo.gl/UERgF7',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'This is a legitimate two-factor authentication code from Google, triggered by a login attempt. The message follows standard 2FA format.',
        redFlags: [
          { title: 'Standard format', description: 'The message follows the typical 2FA pattern: code + "don\'t share" warning.' },
          { title: 'No action demanded', description: 'The message does not pressure you to click a link or enter data on an external site.' },
          { title: 'Self-triggered', description: 'If you just attempted to log in, this code is expected and part of normal security flow.' },
        ],
        defensiveAdvice: 'Only enter 2FA codes on the service you are actively logging into. Never share verification codes with anyone who contacts you by phone or message.',
      },
    },
    bg: {
      title: 'SMS с код за потвърждение',
      content: {
        phoneNumber: 'Google',
        body: 'G-482916 е вашият код за потвърждение от Google. Не споделяйте този код с никого. Ако не сте го поискали, игнорирайте това съобщение.\n\nhttps://goo.gl/UERgF7',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'Това е легитимен код за двуфакторна автентикация от Google, задействан от опит за вход. Съобщението следва стандартния формат на 2FA.',
        redFlags: [
          { title: 'Стандартен формат', description: 'Съобщението следва типичния 2FA модел: код + предупреждение "не споделяйте".' },
          { title: 'Не се изисква действие', description: 'Съобщението не ви притиска да кликнете линк или да въведете данни на външен сайт.' },
          { title: 'Самостоятелно задействан', description: 'Ако току-що сте се опитали да влезете, този код е очакван и част от нормалния процес за сигурност.' },
        ],
        defensiveAdvice: 'Въвеждайте 2FA кодове само в услугата, в която активно влизате. Никога не споделяйте кодове за потвърждение с никого, който ви се обади или напише.',
      },
    },
    de: {
      title: 'SMS mit Bestaetigungscode',
      content: {
        phoneNumber: 'Google',
        body: 'G-482916 ist Ihr Google-Bestaetigungscode. Teilen Sie diesen Code mit niemandem. Wenn Sie ihn nicht angefordert haben, ignorieren Sie diese Nachricht.\n\nhttps://goo.gl/UERgF7',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'Dies ist ein legitimer Zwei-Faktor-Authentifizierungscode von Google, ausgeloest durch einen Anmeldeversuch. Die Nachricht folgt dem Standard-2FA-Format.',
        redFlags: [
          { title: 'Standardformat', description: 'Die Nachricht folgt dem typischen 2FA-Muster: Code + "Nicht teilen"-Warnung.' },
          { title: 'Keine Aktion verlangt', description: 'Die Nachricht draengt Sie nicht, auf einen Link zu klicken oder Daten auf einer externen Seite einzugeben.' },
          { title: 'Selbst ausgeloest', description: 'Wenn Sie gerade versucht haben, sich anzumelden, ist dieser Code erwartet und Teil des normalen Sicherheitsablaufs.' },
        ],
        defensiveAdvice: 'Geben Sie 2FA-Codes nur bei dem Dienst ein, bei dem Sie sich gerade anmelden. Teilen Sie Bestaetigungscodes niemals mit jemandem, der Sie per Telefon oder Nachricht kontaktiert.',
      },
    },
  },

  // === SCENARIO 8: BEC Email — CEO Wire Transfer ===
  {
    id: 'bec_email_08',
    category: 'Business Email Compromise',
    categoryBg: 'Компрометиране на бизнес имейл',
    categoryDe: 'Business-E-Mail-Betrug',
    type: 'email',
    difficulty: 'advanced',
    en: {
      title: 'Urgent Wire Transfer Request from CEO',
      content: {
        sender: 'Martin Petrov <m.petrov@company-bg.net>',
        subject: 'Urgent — Confidential Wire Transfer Needed',
        body: 'Hi,\n\nI need you to process an urgent wire transfer of EUR 47,000 to a new supplier account today. This is time-sensitive and must be completed before 3 PM.\n\nPlease do not discuss this with anyone else — it\'s related to a confidential acquisition.\n\nI\'m in meetings all day so email me when it\'s done.\n\nBest,\nMartin Petrov\nCEO',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a Business Email Compromise (BEC) attack. The scammer impersonates a CEO to trick employees into making unauthorized wire transfers to attacker-controlled accounts.',
        redFlags: [
          { title: 'Spoofed sender', description: 'The email domain "company-bg.net" is subtly different from the real company domain — a common BEC tactic.' },
          { title: 'Urgency and secrecy', description: '"Do not discuss with anyone" and tight deadline are pressure tactics to prevent verification.' },
          { title: 'New supplier account', description: 'Requests to send money to new or changed accounts should always be verified through separate channels.' },
          { title: 'Unavailable for contact', description: '"In meetings all day" prevents the recipient from calling to verify the request.' },
        ],
        defensiveAdvice: 'Always verify wire transfer requests through a separate communication channel (phone call to known number). Never process urgent financial requests based on email alone.',
      },
    },
    bg: {
      title: 'Спешна молба за банков превод от изпълнителния директор',
      content: {
        sender: 'Мартин Петров <m.petrov@company-bg.net>',
        subject: 'Спешно — Необходим е поверителен банков превод',
        body: 'Здравейте,\n\nТрябва да обработите спешен банков превод от 47 000 EUR към нова сметка на доставчик днес. Това е времево чувствително и трябва да бъде завършено преди 15:00 ч.\n\nМоля, не обсъждайте това с никой друг — свързано е с поверително придобиване.\n\nЦял ден съм в срещи, така че ми пишете по имейл, когато е готово.\n\nС уважение,\nМартин Петров\nИзпълнителен директор',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е атака чрез компрометиране на бизнес имейл (BEC). Измамникът се представя за изпълнителен директор, за да подмами служителите да направят неоторизирани банкови преводи.',
        redFlags: [
          { title: 'Фалшив подател', description: 'Домейнът "company-bg.net" е леко различен от истинския фирмен домейн — често срещана BEC тактика.' },
          { title: 'Спешност и секретност', description: '"Не обсъждайте с никого" и строг срок са тактики за натиск, предотвратяващи проверка.' },
          { title: 'Нова сметка на доставчик', description: 'Молби за изпращане на пари към нови или променени сметки трябва винаги да се проверяват чрез отделни канали.' },
          { title: 'Недостъпен за контакт', description: '"Цял ден в срещи" предотвратява получателя да се обади за потвърждение.' },
        ],
        defensiveAdvice: 'Винаги проверявайте молби за банкови преводи чрез отделен комуникационен канал (обаждане на известен номер). Никога не обработвайте спешни финансови молби само на базата на имейл.',
      },
    },
    de: {
      title: 'Dringende Ueberweisungsanfrage vom Geschaeftsfuehrer',
      content: {
        sender: 'Martin Petrov <m.petrov@company-bg.net>',
        subject: 'Dringend — Vertrauliche Ueberweisung erforderlich',
        body: 'Hallo,\n\nIch brauche Sie, um heute eine dringende Ueberweisung von 47.000 EUR auf ein neues Lieferantenkonto zu veranlassen. Dies ist zeitkritisch und muss vor 15:00 Uhr abgeschlossen sein.\n\nBitte besprechen Sie dies mit niemandem — es bezieht sich auf eine vertrauliche Uebernahme.\n\nIch bin den ganzen Tag in Meetings, schreiben Sie mir eine E-Mail, wenn es erledigt ist.\n\nMit freundlichen Gruessen,\nMartin Petrov\nGeschaeftsfuehrer',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist ein Business-E-Mail-Compromise (BEC) Angriff. Der Betrueger gibt sich als Geschaeftsfuehrer aus, um Mitarbeiter zu unautorisierten Ueberweisungen zu verleiten.',
        redFlags: [
          { title: 'Gefaelschter Absender', description: 'Die E-Mail-Domain "company-bg.net" unterscheidet sich subtil von der echten Firmendomain — eine gaengige BEC-Taktik.' },
          { title: 'Dringlichkeit und Geheimhaltung', description: '"Mit niemandem besprechen" und enge Fristen sind Drucktaktiken zur Verhinderung einer Ueberpruefung.' },
          { title: 'Neues Lieferantenkonto', description: 'Anfragen, Geld auf neue oder geaenderte Konten zu senden, sollten immer ueber separate Kanaele verifiziert werden.' },
          { title: 'Nicht erreichbar', description: '"Den ganzen Tag in Meetings" verhindert, dass der Empfaenger anruft, um die Anfrage zu verifizieren.' },
        ],
        defensiveAdvice: 'Verifizieren Sie Ueberweisungsanfragen immer ueber einen separaten Kommunikationskanal (Telefonanruf an bekannte Nummer). Verarbeiten Sie nie dringende Finanzanfragen nur auf Basis einer E-Mail.',
      },
    },
  },

  // === SCENARIO 9: Fake Job Offer on Telegram — SUSPICIOUS ===
  {
    id: 'fake_job_09',
    category: 'Job Scam',
    categoryBg: 'Измама с работа',
    categoryDe: 'Job-Betrug',
    type: 'message',
    difficulty: 'intermediate',
    en: {
      title: 'High-Paying Remote Job Offer',
      content: {
        app: 'Telegram',
        senderName: 'HR Manager — Global Corp',
        body: 'Hello! We found your profile and would like to offer you a remote position.\n\nPosition: Data Entry Specialist\nSalary: $3,500/week\nHours: 2-3 hours/day\nNo experience required\n\nTo get started, please visit our registration portal:\nhttps://globalcorp-careers-apply.com\n\nYou will need to provide your full name, address, and bank details for payroll setup.\n\nLimited positions available — apply today!',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a fake job offer scam commonly distributed through messaging apps. The goal is to harvest personal and financial data or trick victims into money laundering schemes.',
        redFlags: [
          { title: 'Unrealistic salary', description: '$3,500/week for 2-3 hours of data entry with no experience is far above market rates.' },
          { title: 'Unsolicited contact', description: 'Legitimate employers don\'t recruit through random Telegram messages.' },
          { title: 'Bank details upfront', description: 'Requesting bank information before any interview or contract is a data harvesting tactic.' },
          { title: 'Urgency pressure', description: '"Limited positions" creates artificial scarcity to prevent research.' },
        ],
        defensiveAdvice: 'Research any company offering unsolicited jobs. Legitimate employers don\'t ask for bank details before hiring. Never click registration links from messaging app contacts you don\'t know.',
      },
    },
    bg: {
      title: 'Високоплатена оферта за дистанционна работа',
      content: {
        app: 'Telegram',
        senderName: 'HR Мениджър — Global Corp',
        body: 'Здравейте! Намерихме вашия профил и бихме искали да ви предложим дистанционна позиция.\n\nПозиция: Специалист по въвеждане на данни\nЗаплата: $3,500/седмица\nЧасове: 2-3 часа/ден\nНе се изисква опит\n\nЗа да започнете, моля посетете портала за регистрация:\nhttps://globalcorp-careers-apply.com\n\nЩе трябва да предоставите пълно име, адрес и банкови данни за настройка на заплащането.\n\nОграничен брой позиции — кандидатствайте днес!',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е измама с фалшива оферта за работа, често разпространявана чрез приложения за съобщения. Целта е събиране на лични и финансови данни или въвличане на жертвите в схеми за пране на пари.',
        redFlags: [
          { title: 'Нереалистична заплата', description: '$3,500/седмица за 2-3 часа въвеждане на данни без опит е далеч над пазарните ставки.' },
          { title: 'Непоискан контакт', description: 'Легитимните работодатели не набират чрез случайни съобщения в Telegram.' },
          { title: 'Банкови данни предварително', description: 'Искането на банкова информация преди интервю или договор е тактика за събиране на данни.' },
          { title: 'Натиск чрез спешност', description: '"Ограничен брой позиции" създава изкуствен дефицит, за да предотврати проучване.' },
        ],
        defensiveAdvice: 'Проучвайте всяка компания, предлагаща непоискана работа. Легитимните работодатели не искат банкови данни преди наемане. Никога не кликайте линкове за регистрация от непознати контакти.',
      },
    },
    de: {
      title: 'Hochbezahltes Remote-Jobangebot',
      content: {
        app: 'Telegram',
        senderName: 'HR Manager — Global Corp',
        body: 'Hallo! Wir haben Ihr Profil gefunden und moechten Ihnen eine Remote-Position anbieten.\n\nPosition: Dateneingabe-Spezialist\nGehalt: 3.500 $/Woche\nStunden: 2-3 Stunden/Tag\nKeine Erfahrung erforderlich\n\nUm zu beginnen, besuchen Sie bitte unser Registrierungsportal:\nhttps://globalcorp-careers-apply.com\n\nSie muessen Ihren vollstaendigen Namen, Adresse und Bankdaten fuer die Gehaltseinrichtung angeben.\n\nBegrenzte Plaetze verfuegbar — bewerben Sie sich heute!',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist ein gefaelschtes Jobangebot, das haeufig ueber Messaging-Apps verbreitet wird. Das Ziel ist das Abgreifen persoenlicher und finanzieller Daten oder die Verwicklung der Opfer in Geldwaescheschemata.',
        redFlags: [
          { title: 'Unrealistisches Gehalt', description: '3.500 $/Woche fuer 2-3 Stunden Dateneingabe ohne Erfahrung liegt weit ueber den Marktraten.' },
          { title: 'Unaufgeforderter Kontakt', description: 'Serioese Arbeitgeber rekrutieren nicht ueber zufaellige Telegram-Nachrichten.' },
          { title: 'Bankdaten im Voraus', description: 'Das Anfordern von Bankdaten vor einem Vorstellungsgespraech oder Vertrag ist eine Datensammlungstaktik.' },
          { title: 'Dringlichkeitsdruck', description: '"Begrenzte Plaetze" erzeugt kuenstliche Knappheit, um Recherche zu verhindern.' },
        ],
        defensiveAdvice: 'Recherchieren Sie jedes Unternehmen, das unaufgefordert Jobs anbietet. Serioese Arbeitgeber fragen nicht vor der Einstellung nach Bankdaten. Klicken Sie nie auf Registrierungslinks von unbekannten Kontakten.',
      },
    },
  },

  // === SCENARIO 10: Fake Tech Support Popup ===
  {
    id: 'tech_support_10',
    category: 'Tech Support Scam',
    categoryBg: 'Измама с техническа поддръжка',
    categoryDe: 'Tech-Support-Betrug',
    type: 'login_page',
    difficulty: 'beginner',
    en: {
      title: 'Windows Security Warning Popup',
      content: {
        domain: 'https://microsoft-alert-center.com/warning',
        description: 'While browsing the web, a full-screen popup appears with a loud alarm sound and the following message:',
        details: [
          'WARNING: Your computer has been infected!',
          'Trojan Spyware detected — Your personal data is at risk!',
          'Do NOT shut down or restart your computer',
          'Call Microsoft Support immediately: +1-888-555-0147',
          'Your Windows license will be suspended if you don\'t call within 5 minutes',
          'The popup prevents you from closing the browser tab',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a fake tech support scam popup. The website displays a fake security warning to scare users into calling a fraudulent support number, where scammers will request remote access or payment.',
        redFlags: [
          { title: 'Fake domain', description: '"microsoft-alert-center.com" is not a Microsoft domain. Microsoft never displays virus warnings through browser popups.' },
          { title: 'Scare tactics', description: 'Loud alarms, threatening language, and urgency are designed to cause panic and prevent rational thinking.' },
          { title: 'Phone number scam', description: 'The provided number connects to scammers who will request remote access via AnyDesk/TeamViewer or payment for fake repairs.' },
          { title: 'Browser lockout', description: 'Preventing tab closure is a technical trick — the actual computer is not infected.' },
        ],
        defensiveAdvice: 'Force-close the browser (Ctrl+Alt+Delete or Cmd+Q). Microsoft and other companies never display virus alerts through browser popups. Never call phone numbers shown in browser warnings.',
      },
    },
    bg: {
      title: 'Изскачащо предупреждение за сигурност на Windows',
      content: {
        domain: 'https://microsoft-alert-center.com/warning',
        description: 'Докато сърфирате в интернет, се появява пълноекранен попъп с силен алармен звук и следното съобщение:',
        details: [
          'ПРЕДУПРЕЖДЕНИЕ: Вашият компютър е заразен!',
          'Открит е троянски шпионски софтуер — Вашите лични данни са в опасност!',
          'НЕ изключвайте и не рестартирайте компютъра си',
          'Обадете се на поддръжката на Microsoft незабавно: +1-888-555-0147',
          'Вашият Windows лиценз ще бъде спрян, ако не се обадите в рамките на 5 минути',
          'Попъпът не ви позволява да затворите таба на браузъра',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е фалшив попъп за техническа поддръжка. Уебсайтът показва фалшиво предупреждение за сигурност, за да изплаши потребителите да се обадят на измамнически номер за поддръжка.',
        redFlags: [
          { title: 'Фалшив домейн', description: '"microsoft-alert-center.com" не е домейн на Microsoft. Microsoft никога не показва вирусни предупреждения чрез браузърни попъпи.' },
          { title: 'Тактики на страх', description: 'Силни аларми, заплашителен език и спешност са предназначени да причинят паника и да предотвратят рационално мислене.' },
          { title: 'Измама с телефонен номер', description: 'Предоставеният номер свързва с измамници, които ще поискат отдалечен достъп чрез AnyDesk/TeamViewer или плащане.' },
          { title: 'Блокиране на браузъра', description: 'Предотвратяването на затваряне на таб е технически трик — компютърът ви всъщност не е заразен.' },
        ],
        defensiveAdvice: 'Принудително затворете браузъра (Ctrl+Alt+Delete или Cmd+Q). Microsoft и другите компании никога не показват вирусни предупреждения чрез браузърни попъпи. Никога не се обаждайте на номера от браузърни предупреждения.',
      },
    },
    de: {
      title: 'Windows-Sicherheitswarnung-Popup',
      content: {
        domain: 'https://microsoft-alert-center.com/warning',
        description: 'Beim Surfen im Internet erscheint ein Vollbild-Popup mit einem lauten Alarmsignal und folgender Nachricht:',
        details: [
          'WARNUNG: Ihr Computer wurde infiziert!',
          'Trojaner-Spyware erkannt — Ihre persoenlichen Daten sind in Gefahr!',
          'Fahren Sie Ihren Computer NICHT herunter und starten Sie ihn NICHT neu',
          'Rufen Sie den Microsoft-Support sofort an: +1-888-555-0147',
          'Ihre Windows-Lizenz wird gesperrt, wenn Sie nicht innerhalb von 5 Minuten anrufen',
          'Das Popup verhindert, dass Sie den Browser-Tab schliessen',
        ],
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist ein gefaelschtes Tech-Support-Popup. Die Website zeigt eine gefaelschte Sicherheitswarnung, um Benutzer zum Anruf einer betruegerischen Support-Nummer zu bewegen.',
        redFlags: [
          { title: 'Gefaelschte Domain', description: '"microsoft-alert-center.com" ist keine Microsoft-Domain. Microsoft zeigt nie Viruswarnungen ueber Browser-Popups an.' },
          { title: 'Angsttaktiken', description: 'Laute Alarme, bedrohliche Sprache und Dringlichkeit sollen Panik verursachen und rationales Denken verhindern.' },
          { title: 'Telefonnummern-Betrug', description: 'Die angegebene Nummer verbindet mit Betruegern, die Fernzugriff ueber AnyDesk/TeamViewer oder Zahlung verlangen.' },
          { title: 'Browser-Sperrung', description: 'Das Verhindern des Tab-Schliessens ist ein technischer Trick — Ihr Computer ist nicht wirklich infiziert.' },
        ],
        defensiveAdvice: 'Erzwingen Sie das Schliessen des Browsers (Strg+Alt+Entf oder Cmd+Q). Microsoft und andere Unternehmen zeigen nie Viruswarnungen ueber Browser-Popups. Rufen Sie nie Nummern an, die in Browser-Warnungen angezeigt werden.',
      },
    },
  },
];
