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

  // === SCENARIO 11: AI Deepfake Voice — Family Emergency ===
  {
    id: 'deepfake_voice_11',
    category: 'AI Deepfake',
    categoryBg: 'AI Deepfake',
    categoryDe: 'KI-Deepfake',
    type: 'message',
    difficulty: 'advanced',
    en: {
      title: 'Urgent Voice Message from Your Son',
      content: {
        app: 'WhatsApp',
        senderName: 'Alex (Son)',
        body: '[Voice Message — 0:47]\n\n"Dad, please don\'t panic but I\'m in serious trouble. I was in a car accident in Plovdiv and the other driver is threatening to press charges unless I pay him 2,000 EUR right now. I can\'t use my bank app — my phone screen is cracked. Can you send the money to this IBAN? I\'ll explain everything when I get home. Please hurry, he\'s getting aggressive."\n\nIBAN: BG80BNBG96611020345678\nReceiver: Dimitar Stoyanov\n\n[The voice sounds exactly like your son Alex]',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is an AI deepfake voice scam. Modern AI can clone a person\'s voice from just a few seconds of audio found on social media. The scammer creates a convincing voice message impersonating a family member to extract urgent payments.',
        redFlags: [
          { title: 'AI-cloned voice', description: 'Deepfake technology can replicate voices with startling accuracy. A familiar voice does NOT guarantee authenticity.' },
          { title: 'Emergency + money request', description: 'The classic scam formula: fabricated crisis + immediate payment demand. Real emergencies don\'t require instant IBAN transfers to strangers.' },
          { title: 'Third-party IBAN', description: 'The payment goes to "Dimitar Stoyanov" — not your son\'s account. This is a money mule account.' },
          { title: 'Prevents verification', description: '"Phone screen is cracked" is an excuse to prevent you from calling back to verify. Scammers always have a reason you can\'t reach the person directly.' },
          { title: 'Emotional pressure', description: '"He\'s getting aggressive" and "please hurry" are designed to trigger a panic response that overrides critical thinking.' },
        ],
        defensiveAdvice: 'ALWAYS hang up and call the person directly on their known number. Establish a family code word for emergencies. Never transfer money based on voice messages alone — AI can clone any voice.',
      },
    },
    bg: {
      title: 'Спешно гласово съобщение от сина ви',
      content: {
        app: 'WhatsApp',
        senderName: 'Алекс (Син)',
        body: '[Гласово съобщение — 0:47]\n\n"Тате, моля не се паникьосвай, но имам сериозен проблем. Катастрофирах в Пловдив и другият шофьор заплашва да ме съди, ако не му платя 2 000 EUR веднага. Не мога да ползвам банковото приложение — екранът на телефона ми е счупен. Можеш ли да изпратиш парите на този IBAN? Ще обясня всичко като се прибера. Моля побързай, става агресивен."\n\nIBAN: BG80BNBG96611020345678\nПолучател: Димитър Стоянов\n\n[Гласът звучи точно като вашия син Алекс]',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е измама с AI deepfake глас. Съвременният AI може да клонира гласа на човек от само няколко секунди аудио от социалните мрежи. Измамникът създава убедително гласово съобщение, имитиращо член на семейството, за да извлече спешни плащания.',
        redFlags: [
          { title: 'AI-клониран глас', description: 'Deepfake технологията може да възпроизведе гласове с поразителна точност. Познат глас НЕ гарантира автентичност.' },
          { title: 'Спешност + искане за пари', description: 'Класическата формула на измамата: измислена криза + незабавно искане за плащане. Реалните извънредни ситуации не изискват мигновени IBAN преводи към непознати.' },
          { title: 'IBAN на трето лице', description: 'Плащането отива към "Димитър Стоянов" — не към сметката на сина ви. Това е сметка на паричен мул.' },
          { title: 'Предотвратява проверка', description: '"Екранът на телефона ми е счупен" е извинение, за да ви попречи да се обадите обратно. Измамниците винаги имат причина да не можете да достигнете човека директно.' },
          { title: 'Емоционален натиск', description: '"Става агресивен" и "моля побързай" са предназначени да предизвикат паника, която преодолява критичното мислене.' },
        ],
        defensiveAdvice: 'ВИНАГИ затворете и се обадете на човека директно на познатия му номер. Установете семейна кодова дума за извънредни ситуации. Никога не превеждайте пари само на базата на гласови съобщения — AI може да клонира всеки глас.',
      },
    },
    de: {
      title: 'Dringende Sprachnachricht von Ihrem Sohn',
      content: {
        app: 'WhatsApp',
        senderName: 'Alex (Sohn)',
        body: '[Sprachnachricht — 0:47]\n\n"Papa, bitte keine Panik, aber ich bin in ernsten Schwierigkeiten. Ich hatte einen Autounfall in Plovdiv und der andere Fahrer droht, mich anzuzeigen, wenn ich ihm nicht sofort 2.000 EUR zahle. Ich kann meine Bank-App nicht nutzen — mein Handybildschirm ist kaputt. Kannst du das Geld auf diese IBAN ueberweisen? Ich erklaere alles, wenn ich zu Hause bin. Bitte beeil dich, er wird aggressiv."\n\nIBAN: BG80BNBG96611020345678\nEmpfaenger: Dimitar Stoyanov\n\n[Die Stimme klingt genau wie Ihr Sohn Alex]',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist ein KI-Deepfake-Stimmbetrug. Moderne KI kann die Stimme einer Person aus nur wenigen Sekunden Audio aus sozialen Medien klonen. Der Betrueger erstellt eine ueberzeugende Sprachnachricht, die ein Familienmitglied imitiert, um dringende Zahlungen zu erpressen.',
        redFlags: [
          { title: 'KI-geklonte Stimme', description: 'Deepfake-Technologie kann Stimmen mit erstaunlicher Genauigkeit nachbilden. Eine vertraute Stimme garantiert NICHT die Authentizitaet.' },
          { title: 'Notfall + Geldforderung', description: 'Die klassische Betrugsformel: erfundene Krise + sofortige Zahlungsaufforderung. Echte Notfaelle erfordern keine sofortigen IBAN-Ueberweisungen an Fremde.' },
          { title: 'IBAN eines Dritten', description: 'Die Zahlung geht an "Dimitar Stoyanov" — nicht an das Konto Ihres Sohnes. Dies ist ein Geldwaesche-Konto.' },
          { title: 'Verhindert Verifizierung', description: '"Handybildschirm ist kaputt" ist eine Ausrede, um Sie daran zu hindern, zurueckzurufen. Betrueger haben immer einen Grund, warum Sie die Person nicht direkt erreichen koennen.' },
          { title: 'Emotionaler Druck', description: '"Er wird aggressiv" und "bitte beeil dich" sollen eine Panikreaktion ausloesen, die kritisches Denken ueberwindet.' },
        ],
        defensiveAdvice: 'Legen Sie IMMER auf und rufen Sie die Person direkt unter ihrer bekannten Nummer an. Vereinbaren Sie ein Familien-Codewort fuer Notfaelle. Ueberweisen Sie nie Geld nur auf Basis von Sprachnachrichten — KI kann jede Stimme klonen.',
      },
    },
  },

  // === SCENARIO 12: Pig Butchering — Long-Con Investment ===
  {
    id: 'pig_butchering_12',
    category: 'Pig Butchering Scam',
    categoryBg: 'Pig Butchering измама',
    categoryDe: 'Pig-Butchering-Betrug',
    type: 'message',
    difficulty: 'advanced',
    en: {
      title: 'Conference Contact Shares Investment Tips',
      content: {
        app: 'WhatsApp',
        senderName: 'Elena K. — Met at Tech Summit',
        body: 'Hey! How was your weekend? I finally tried that Italian place you recommended — the pasta was amazing!\n\nBtw, remember when I mentioned my side income from trading? I took a screenshot of my portfolio this morning — I\'m up 340% since September. My mentor runs a private group where he shares analysis before the market opens.\n\nI\'m not trying to sell you anything haha, I just thought of you because you mentioned wanting to diversify. He only accepts 5 new people per month.\n\nHere\'s the platform we use: https://nexus-tradepro.com\n\nMy referral code gets you a waived minimum deposit. No pressure at all — just thought I\'d share since we\'re friends now. Let me know if you have questions!',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a "pig butchering" scam — a sophisticated long-con where the scammer invests weeks or months building a genuine-seeming friendship before gradually introducing a fraudulent investment platform. The casual, non-pushy tone is deliberate and calculated.',
        redFlags: [
          { title: 'Manufactured friendship', description: 'The relationship was built specifically to exploit trust. References to shared experiences ("Italian place") create false intimacy designed to lower your guard.' },
          { title: 'Unrealistic returns', description: '340% returns since September is extraordinarily high. Legitimate investors don\'t casually share such figures with acquaintances.' },
          { title: 'Exclusive access illusion', description: '"Only accepts 5 new people per month" and "private group" create artificial scarcity — a classic manipulation technique.' },
          { title: 'Unregulated platform', description: '"nexus-tradepro.com" is not a registered financial platform. Legitimate brokers are licensed and appear in regulatory registers.' },
          { title: 'Calculated casualness', description: '"Not trying to sell you anything" and "no pressure" are psychological techniques. Real friends don\'t systematically guide you toward investment platforms.' },
        ],
        defensiveAdvice: 'Be wary of anyone who builds a friendship and then steers conversations toward investments. Always verify trading platforms in official regulatory registers (FSC, FCA, ESMA). Remember: if someone you barely know shares "secret" investment opportunities, it\'s almost certainly a scam.',
      },
    },
    bg: {
      title: 'Познат от конференция споделя инвестиционни съвети',
      content: {
        app: 'WhatsApp',
        senderName: 'Елена К. — От Tech Summit',
        body: 'Здравей! Как мина уикендът ти? Най-накрая пробвах онзи италиански ресторант, който препоръча — пастата беше невероятна!\n\nМежду другото, помниш ли как споменах за допълнителния ми доход от търговия? Направих скрийншот на портфолиото си тази сутрин — имам 340% ръст от септември. Менторът ми води частна група, където споделя анализи преди отварянето на пазара.\n\nНе се опитвам да ти продавам нищо хаха, просто се сетих за теб, защото спомена, че искаш да диверсифицираш. Той приема само 5 нови души на месец.\n\nЕто платформата, която ползваме: https://nexus-tradepro.com\n\nС моя реферален код минималният депозит е отменен. Без натиск — просто исках да споделя, щом вече сме приятели. Кажи ако имаш въпроси!',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е "pig butchering" измама — усъвършенстван дългосрочен кон, при който измамникът инвестира седмици или месеци в изграждане на истинско приятелство, преди постепенно да въведе измамна инвестиционна платформа. Небрежният, ненатрапчив тон е умишлен и пресметнат.',
        redFlags: [
          { title: 'Конструирано приятелство', description: 'Връзката е изградена специално за експлоатация на доверието. Препратките към общи преживявания ("италианския ресторант") създават фалшива близост.' },
          { title: 'Нереалистична доходност', description: '340% доходност от септември е извънредно висока. Легитимните инвеститори не споделят подобни цифри небрежно с познати.' },
          { title: 'Илюзия за ексклузивност', description: '"Приема само 5 нови души на месец" и "частна група" създават изкуствен дефицит — класическа манипулативна техника.' },
          { title: 'Нерегулирана платформа', description: '"nexus-tradepro.com" не е регистрирана финансова платформа. Легитимните брокери са лицензирани и фигурират в регулаторни регистри.' },
          { title: 'Пресметната небрежност', description: '"Не се опитвам да ти продавам нищо" и "без натиск" са психологически техники. Истинските приятели не ви насочват систематично към инвестиционни платформи.' },
        ],
        defensiveAdvice: 'Бъдете внимателни към всеки, който изгражда приятелство и след това насочва разговорите към инвестиции. Винаги проверявайте платформите в официални регулаторни регистри (КФН, FCA, ESMA). Ако някой, когото почти не познавате, споделя "тайни" инвестиционни възможности — почти сигурно е измама.',
      },
    },
    de: {
      title: 'Konferenzbekanntschaft teilt Investmenttipps',
      content: {
        app: 'WhatsApp',
        senderName: 'Elena K. — Vom Tech Summit',
        body: 'Hey! Wie war dein Wochenende? Ich habe endlich das italienische Restaurant ausprobiert, das du empfohlen hast — die Pasta war fantastisch!\n\nUebrigens, erinnerst du dich, als ich mein Nebeneinkommen vom Trading erwaehnt habe? Ich habe heute Morgen einen Screenshot meines Portfolios gemacht — ich bin seit September um 340% gestiegen. Mein Mentor leitet eine private Gruppe, in der er Analysen vor Markteroeffnung teilt.\n\nIch versuche dir nichts zu verkaufen haha, ich dachte nur an dich, weil du erwaehnt hast, dass du diversifizieren willst. Er nimmt nur 5 neue Leute pro Monat auf.\n\nHier ist die Plattform, die wir nutzen: https://nexus-tradepro.com\n\nMit meinem Empfehlungscode entfaellt die Mindesteinlage. Kein Druck — wollte es nur teilen, da wir jetzt Freunde sind. Sag Bescheid, wenn du Fragen hast!',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist ein "Pig Butchering"-Betrug — ein ausgekluegelter Langzeitbetrug, bei dem der Betrueger Wochen oder Monate in den Aufbau einer echten Freundschaft investiert, bevor er allmaehlich eine betruegerische Investitionsplattform einfuehrt. Der beilaeufige, unaufdringliche Ton ist absichtlich und kalkuliert.',
        redFlags: [
          { title: 'Konstruierte Freundschaft', description: 'Die Beziehung wurde speziell zum Ausnutzen von Vertrauen aufgebaut. Bezuege auf gemeinsame Erlebnisse schaffen falsche Vertrautheit.' },
          { title: 'Unrealistische Renditen', description: '340% Rendite seit September ist aussergewoehnlich hoch. Legitime Investoren teilen solche Zahlen nicht beilaeufig mit Bekannten.' },
          { title: 'Exklusivitaetsillusion', description: '"Nimmt nur 5 neue Leute pro Monat" und "private Gruppe" schaffen kuenstliche Knappheit — eine klassische Manipulationstechnik.' },
          { title: 'Unregulierte Plattform', description: '"nexus-tradepro.com" ist keine registrierte Finanzplattform. Legitime Broker sind lizenziert und erscheinen in Regulierungsregistern.' },
          { title: 'Kalkulierte Beilaeufigkeit', description: '"Versuche dir nichts zu verkaufen" und "kein Druck" sind psychologische Techniken. Echte Freunde leiten Sie nicht systematisch zu Investitionsplattformen.' },
        ],
        defensiveAdvice: 'Seien Sie vorsichtig bei jedem, der eine Freundschaft aufbaut und dann Gespraeche auf Investitionen lenkt. Ueberpruefen Sie Handelsplattformen immer in offiziellen Regulierungsregistern (BaFin, FCA, ESMA). Wenn jemand, den Sie kaum kennen, "geheime" Investitionsmoeglichkeiten teilt — ist es fast sicher Betrug.',
      },
    },
  },

  // === SCENARIO 13: Spear Phishing — Payroll Update ===
  {
    id: 'spear_phishing_13',
    category: 'Spear Phishing',
    categoryBg: 'Целеви фишинг',
    categoryDe: 'Spear-Phishing',
    type: 'email',
    difficulty: 'advanced',
    en: {
      title: 'HR Department — Annual Payroll Verification',
      content: {
        sender: 'HR Department <hr-notifications@company-corp.com>',
        subject: 'Action Required: Annual Payroll & Tax Information Verification (2025-2026)',
        body: 'Dear [Your First Name],\n\nAs part of our annual compliance review, all employees are required to verify their payroll and tax withholding information by March 15, 2026.\n\nThis is mandated by the updated National Revenue Agency (NRA) guidelines effective January 2026.\n\nPlease log into the Employee Self-Service Portal to review and confirm:\n\n• Bank account details for salary deposit\n• Tax identification number\n• Emergency contact information\n• Home address\n\nAccess the portal: https://company-corp-hrportal.com/verify\n\nPlease note: Failure to complete verification may result in delayed salary processing for Q2.\n\nIf you have already completed this process, please disregard this email.\n\nBest regards,\nMaria Todorova\nHR Business Partner\nDirect: +359 2 981 7340\ncompany-corp.com',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'This is a sophisticated spear phishing email that uses your real name, references actual regulatory bodies (NRA), includes a realistic deadline, and mimics corporate HR communication style. The goal is to harvest banking and personal data through a fake self-service portal.',
        redFlags: [
          { title: 'Subtle domain mismatch', description: '"company-corp.com" and "company-corp-hrportal.com" are not your company\'s actual domain. Spear phishers register convincing lookalike domains.' },
          { title: 'Sensitive data collection', description: 'Asking for bank details, tax ID, and home address through a link is a major red flag — even if it appears to come from HR.' },
          { title: 'Consequence threat', description: '"Delayed salary processing" creates urgency without seeming alarmist — more sophisticated than typical "account suspended" threats.' },
          { title: 'False authority', description: 'Referencing NRA guidelines and compliance reviews adds legitimacy, but real HR departments use internal systems, not external links.' },
          { title: 'Realistic but fake sender', description: 'The email includes a direct phone number and signature to appear genuine. Spear phishers research organizations to craft convincing impersonations.' },
        ],
        defensiveAdvice: 'Never update payroll information through email links. Contact your HR department directly using known internal channels. Verify the sender domain matches your company\'s actual domain letter by letter.',
      },
    },
    bg: {
      title: 'HR отдел — Годишна проверка на заплатите',
      content: {
        sender: 'HR отдел <hr-notifications@company-corp.com>',
        subject: 'Необходимо действие: Годишна верификация на данни за заплати и данъци (2025-2026)',
        body: 'Уважаеми/а [Вашето име],\n\nКато част от годишния ни преглед за съответствие, всички служители трябва да потвърдят информацията си за заплати и данъчни удръжки до 15 март 2026 г.\n\nТова е задължително съгласно актуализираните насоки на Националната агенция за приходите (НАП), в сила от януари 2026 г.\n\nМоля, влезте в Портала за самообслужване на служители, за да прегледате и потвърдите:\n\n• Данни за банкова сметка за превод на заплата\n• Данъчен идентификационен номер\n• Информация за контакт при спешност\n• Домашен адрес\n\nДостъп до портала: https://company-corp-hrportal.com/verify\n\nМоля, имайте предвид: Непотвърждаването може да доведе до забавяне на заплатата за Q2.\n\nАко вече сте завършили този процес, моля игнорирайте този имейл.\n\nС уважение,\nМария Тодорова\nHR бизнес партньор\nДиректен: +359 2 981 7340\ncompany-corp.com',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Това е усъвършенстван целеви фишинг имейл, който използва истинското ви име, цитира реални регулаторни органи (НАП), включва реалистичен краен срок и имитира стила на корпоративна HR комуникация. Целта е да се съберат банкови и лични данни чрез фалшив портал за самообслужване.',
        redFlags: [
          { title: 'Субтилно несъвпадение на домейн', description: '"company-corp.com" и "company-corp-hrportal.com" не са истинският домейн на компанията ви. Целевите фишъри регистрират убедителни домейни-имитации.' },
          { title: 'Събиране на чувствителни данни', description: 'Искането на банкови данни, данъчен номер и адрес чрез линк е сериозен червен флаг — дори да изглежда от HR.' },
          { title: 'Заплаха с последствия', description: '"Забавяне на заплатата" създава спешност без да изглежда алармистично — по-усъвършенствано от типичните заплахи "акаунтът е спрян".' },
          { title: 'Фалшив авторитет', description: 'Цитирането на насоки на НАП и прегледи за съответствие добавя легитимност, но реалните HR отдели използват вътрешни системи, не външни линкове.' },
          { title: 'Реалистичен, но фалшив подател', description: 'Имейлът включва директен телефон и подпис, за да изглежда истински. Целевите фишъри проучват организации за убедителни имитации.' },
        ],
        defensiveAdvice: 'Никога не обновявайте информация за заплати чрез линкове от имейли. Свържете се с HR отдела директно чрез известни вътрешни канали. Проверете домейна на подателя буква по буква дали съвпада с реалния домейн на компанията ви.',
      },
    },
    de: {
      title: 'HR-Abteilung — Jaehrliche Gehaltsverifizierung',
      content: {
        sender: 'HR-Abteilung <hr-notifications@company-corp.com>',
        subject: 'Handlung erforderlich: Jaehrliche Gehalts- und Steuerinformationsverifizierung (2025-2026)',
        body: 'Sehr geehrte/r [Ihr Vorname],\n\nIm Rahmen unserer jaehrlichen Compliance-Pruefung muessen alle Mitarbeiter ihre Gehalts- und Steuerabzugsinformationen bis zum 15. Maerz 2026 verifizieren.\n\nDies ist gemaess den aktualisierten Richtlinien des Finanzamtes, gueltig ab Januar 2026, vorgeschrieben.\n\nBitte melden Sie sich im Mitarbeiter-Self-Service-Portal an, um folgende Daten zu ueberpruefen und zu bestaetigen:\n\n• Bankverbindung fuer Gehaltsueberweisungen\n• Steueridentifikationsnummer\n• Notfallkontaktinformationen\n• Privatadresse\n\nPortal-Zugang: https://company-corp-hrportal.com/verify\n\nBitte beachten: Nicht abgeschlossene Verifizierung kann zu einer verzoegerten Gehaltsabrechnung fuer Q2 fuehren.\n\nWenn Sie diesen Vorgang bereits abgeschlossen haben, ignorieren Sie bitte diese E-Mail.\n\nMit freundlichen Gruessen,\nMaria Todorova\nHR Business Partner\nDirekt: +359 2 981 7340\ncompany-corp.com',
      },
      correctAnswer: 'malicious',
      explanation: {
        summary: 'Dies ist eine ausgekluegelte Spear-Phishing-E-Mail, die Ihren echten Namen verwendet, tatsaechliche Regulierungsbehoerden zitiert, eine realistische Frist enthaelt und den Stil der Unternehmens-HR-Kommunikation imitiert. Das Ziel ist das Abgreifen von Bank- und persoenlichen Daten ueber ein gefaelschtes Self-Service-Portal.',
        redFlags: [
          { title: 'Subtile Domain-Abweichung', description: '"company-corp.com" und "company-corp-hrportal.com" sind nicht die tatsaechliche Domain Ihres Unternehmens. Spear-Phisher registrieren ueberzeugende Lookalike-Domains.' },
          { title: 'Sammlung sensibler Daten', description: 'Die Abfrage von Bankdaten, Steuer-ID und Adresse ueber einen Link ist ein ernstes Warnsignal — auch wenn es von HR zu kommen scheint.' },
          { title: 'Konsequenz-Drohung', description: '"Verzoegerte Gehaltsabrechnung" erzeugt Dringlichkeit ohne alarmistisch zu wirken — ausgekluegelter als typische "Konto gesperrt"-Drohungen.' },
          { title: 'Falsche Autoritaet', description: 'Das Zitieren von Finanzamt-Richtlinien und Compliance-Pruefungen verleiht Legitimitaet, aber echte HR-Abteilungen nutzen interne Systeme, keine externen Links.' },
          { title: 'Realistischer aber falscher Absender', description: 'Die E-Mail enthaelt eine Durchwahl und Signatur fuer Authentizitaet. Spear-Phisher recherchieren Organisationen fuer ueberzeugende Imitationen.' },
        ],
        defensiveAdvice: 'Aktualisieren Sie nie Gehaltsinformationen ueber E-Mail-Links. Kontaktieren Sie Ihre HR-Abteilung direkt ueber bekannte interne Kanaele. Ueberpruefen Sie die Absenderdomain Buchstabe fuer Buchstabe.',
      },
    },
  },

  // === SCENARIO 14: Legitimate Government Tax Notification — SAFE ===
  {
    id: 'legitimate_gov_14',
    category: 'Government Notification',
    categoryBg: 'Държавно известие',
    categoryDe: 'Behoerdenbenachrichtigung',
    type: 'email',
    difficulty: 'advanced',
    en: {
      title: 'Tax Authority — Annual Declaration Reminder',
      content: {
        sender: 'no-reply@nra.bg',
        subject: 'Reminder: Annual Tax Declaration Deadline — April 30, 2026',
        body: 'Dear Taxpayer,\n\nThis is a reminder that the deadline for submitting your Annual Tax Declaration for the 2025 fiscal year is April 30, 2026.\n\nYou can submit your declaration through:\n• The NRA electronic services portal at www.nra.bg\n• In person at your local NRA office\n\nFor more information, visit the official NRA website or contact the NRA information line at 0700 18 700.\n\nThis is an automated notification. Please do not reply to this email.\n\nNational Revenue Agency\nMinistry of Finance\nBulgaria',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'This is a legitimate government reminder about tax filing deadlines. It follows proper communication practices — no links to click, directs users to the known official website, provides a public phone number, and does not request personal data.',
        redFlags: [
          { title: 'Official sender domain', description: 'The email comes from "nra.bg" — the actual domain of Bulgaria\'s National Revenue Agency. However, always verify sender domains carefully.' },
          { title: 'No embedded login links', description: 'The email tells you to visit www.nra.bg yourself rather than providing a clickable login link — this is how legitimate institutions communicate.' },
          { title: 'No personal data requested', description: 'The email does not ask for passwords, bank details, or personal information. It simply reminds you of a deadline.' },
          { title: 'Public contact information', description: 'The phone number 0700 18 700 is the publicly listed NRA helpline, verifiable independently.' },
        ],
        defensiveAdvice: 'Even for legitimate-looking government emails, never click embedded links. Always navigate to the official website manually. You can verify the sender domain and phone numbers through independent searches.',
      },
    },
    bg: {
      title: 'Данъчна служба — Напомняне за годишна декларация',
      content: {
        sender: 'no-reply@nra.bg',
        subject: 'Напомняне: Краен срок за годишна данъчна декларация — 30 април 2026 г.',
        body: 'Уважаеми данъкоплатец,\n\nНапомняме ви, че крайният срок за подаване на Годишната данъчна декларация за фискалната 2025 година е 30 април 2026 г.\n\nМожете да подадете декларацията чрез:\n• Портала за електронни услуги на НАП на www.nra.bg\n• Лично в местния офис на НАП\n\nЗа повече информация посетете официалния уебсайт на НАП или се свържете с информационната линия на НАП на 0700 18 700.\n\nТова е автоматично известие. Моля, не отговаряйте на този имейл.\n\nНационална агенция за приходите\nМинистерство на финансите\nБългария',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'Това е легитимно държавно напомняне за сроковете за подаване на данъчна декларация. Следва правилните комуникационни практики — няма линкове за кликване, насочва към известния официален уебсайт, предоставя публичен телефонен номер и не иска лични данни.',
        redFlags: [
          { title: 'Официален домейн на подателя', description: 'Имейлът идва от "nra.bg" — истинският домейн на Националната агенция за приходите. Въпреки това, винаги проверявайте домейните внимателно.' },
          { title: 'Без вградени линкове за вход', description: 'Имейлът ви казва сами да посетите www.nra.bg, вместо да предоставя кликаем линк — така комуникират легитимните институции.' },
          { title: 'Не се искат лични данни', description: 'Имейлът не иска пароли, банкови данни или лична информация. Просто напомня за краен срок.' },
          { title: 'Публична информация за контакт', description: 'Телефонният номер 0700 18 700 е публично обявената линия на НАП, проверима независимо.' },
        ],
        defensiveAdvice: 'Дори за легитимно изглеждащи държавни имейли никога не кликайте на вградени линкове. Винаги навигирайте до официалния уебсайт ръчно. Можете да проверите домейна на подателя и телефоните чрез независимо търсене.',
      },
    },
    de: {
      title: 'Finanzamt — Erinnerung an Jahressteuererklaerung',
      content: {
        sender: 'no-reply@nra.bg',
        subject: 'Erinnerung: Frist fuer Jahressteuererklaerung — 30. April 2026',
        body: 'Sehr geehrter Steuerzahler,\n\nDies ist eine Erinnerung, dass die Frist fuer die Abgabe Ihrer Jahressteuererklaerung fuer das Steuerjahr 2025 am 30. April 2026 ist.\n\nSie koennen Ihre Erklaerung einreichen ueber:\n• Das elektronische Serviceportal der NRA unter www.nra.bg\n• Persoenlich in Ihrem lokalen NRA-Buero\n\nFuer weitere Informationen besuchen Sie die offizielle NRA-Website oder kontaktieren Sie die NRA-Informationshotline unter 0700 18 700.\n\nDies ist eine automatische Benachrichtigung. Bitte antworten Sie nicht auf diese E-Mail.\n\nNationale Einnahmeagentur\nFinanzministerium\nBulgarien',
      },
      correctAnswer: 'safe',
      explanation: {
        summary: 'Dies ist eine legitime behoerdliche Erinnerung an Steuererklaerungs-Fristen. Sie folgt korrekten Kommunikationspraktiken — keine anklickbaren Links, verweist auf die bekannte offizielle Website, nennt eine oeffentliche Telefonnummer und fragt keine persoenlichen Daten ab.',
        redFlags: [
          { title: 'Offizielle Absender-Domain', description: 'Die E-Mail kommt von "nra.bg" — der tatsaechlichen Domain der bulgarischen Nationalen Einnahmeagentur. Ueberpruefen Sie Absender-Domains dennoch immer sorgfaeltig.' },
          { title: 'Keine eingebetteten Login-Links', description: 'Die E-Mail fordert Sie auf, www.nra.bg selbst zu besuchen, anstatt einen anklickbaren Login-Link bereitzustellen — so kommunizieren legitime Institutionen.' },
          { title: 'Keine persoenlichen Daten angefordert', description: 'Die E-Mail fragt nicht nach Passwoertern, Bankdaten oder persoenlichen Informationen. Sie erinnert lediglich an eine Frist.' },
          { title: 'Oeffentliche Kontaktinformationen', description: 'Die Telefonnummer 0700 18 700 ist die oeffentlich gelistete NRA-Hotline, unabhaengig ueberpruefbar.' },
        ],
        defensiveAdvice: 'Auch bei legitim aussehenden Behoerden-E-Mails klicken Sie nie auf eingebettete Links. Navigieren Sie immer manuell zur offiziellen Website. Sie koennen die Absender-Domain und Telefonnummern durch unabhaengige Recherche verifizieren.',
      },
    },
  },

  // === SCENARIO 15: Suspicious Bank SMS with Shortened URL ===
  {
    id: 'suspicious_bank_sms_15',
    category: 'Ambiguous Notification',
    categoryBg: 'Нееднозначно известие',
    categoryDe: 'Mehrdeutige Benachrichtigung',
    type: 'sms',
    difficulty: 'advanced',
    en: {
      title: 'Bank Card Transaction Alert',
      content: {
        phoneNumber: 'UniCredit',
        body: 'UniCredit Bulbank: A transaction of 289.50 BGN was made with your card ending *4821 at 14:32 on 10.03.2026 at merchant POS FANTASTICO.\n\nIf you did not authorize this transaction, block your card immediately:\nhttps://bit.ly/ucb-block\n\nOr call: +359 2 923 2111',
      },
      correctAnswer: 'suspicious',
      explanation: {
        summary: 'This SMS contains both legitimate and suspicious elements. Real banks do send transaction alerts with card details, but the use of a shortened URL (bit.ly) is a red flag. Some banks unfortunately use shortened links, but this practice makes it impossible to verify the destination. The safest approach is to treat it as suspicious and verify independently.',
        redFlags: [
          { title: 'Shortened URL', description: 'The "bit.ly" link hides the actual destination. Legitimate banks should use their official domain. Shortened URLs are commonly used in phishing to mask malicious sites.' },
          { title: 'Specific transaction details', description: 'The inclusion of your real card digits and a specific merchant is convincing — but data breaches can provide scammers with partial card numbers.' },
          { title: 'Urgency to act', description: '"Block your card immediately" pushes you toward clicking the link instead of independently contacting the bank.' },
          { title: 'Phone number may be real', description: '+359 2 923 2111 appears to be a real UniCredit number, adding legitimacy — but smart scammers include real numbers alongside fake links.' },
        ],
        defensiveAdvice: 'Never click shortened URLs in banking SMS messages. Call the number on the back of your physical bank card — not the one in the SMS. Open your banking app directly to check recent transactions.',
      },
    },
    bg: {
      title: 'Известие за транзакция с банкова карта',
      content: {
        phoneNumber: 'UniCredit',
        body: 'УниКредит Булбанк: Извършена е транзакция от 289.50 лв. с вашата карта, завършваща на *4821 в 14:32 на 10.03.2026 при търговец POS ФАНТАСТИКО.\n\nАко не сте разрешили тази транзакция, блокирайте картата си незабавно:\nhttps://bit.ly/ucb-block\n\nИли се обадете: +359 2 923 2111',
      },
      correctAnswer: 'suspicious',
      explanation: {
        summary: 'Този SMS съдържа както легитимни, така и подозрителни елементи. Реалните банки наистина изпращат известия за транзакции с данни за картата, но използването на съкратен URL (bit.ly) е червен флаг. Някои банки за съжаление използват съкратени линкове, но тази практика прави невъзможна проверката на дестинацията. Най-безопасният подход е да го третирате като подозрително и да проверите независимо.',
        redFlags: [
          { title: 'Съкратен URL', description: 'Линкът "bit.ly" скрива истинската дестинация. Легитимните банки трябва да използват официалния си домейн. Съкратените URL адреси често се използват при фишинг за маскиране на зловредни сайтове.' },
          { title: 'Конкретни данни за транзакция', description: 'Включването на реални цифри от картата и конкретен търговец е убедително — но пробиви на данни могат да предоставят на измамниците частични номера на карти.' },
          { title: 'Спешност за действие', description: '"Блокирайте картата незабавно" ви тласка към кликване на линка, вместо да се свържете с банката независимо.' },
          { title: 'Телефонният номер може да е истински', description: '+359 2 923 2111 изглежда истински номер на УниКредит, което добавя легитимност — но интелигентните измамници включват истински номера заедно с фалшиви линкове.' },
        ],
        defensiveAdvice: 'Никога не кликайте на съкратени URL адреси в банкови SMS съобщения. Обадете се на номера на гърба на физическата си банкова карта — не на този в SMS-а. Отворете банковото си приложение директно, за да проверите последните транзакции.',
      },
    },
    de: {
      title: 'Kartentransaktions-Benachrichtigung der Bank',
      content: {
        phoneNumber: 'UniCredit',
        body: 'UniCredit Bulbank: Eine Transaktion von 289,50 BGN wurde mit Ihrer Karte endend auf *4821 um 14:32 am 10.03.2026 beim Haendler POS FANTASTICO durchgefuehrt.\n\nWenn Sie diese Transaktion nicht autorisiert haben, sperren Sie Ihre Karte sofort:\nhttps://bit.ly/ucb-block\n\nOder rufen Sie an: +359 2 923 2111',
      },
      correctAnswer: 'suspicious',
      explanation: {
        summary: 'Diese SMS enthaelt sowohl legitime als auch verdaechtige Elemente. Echte Banken senden tatsaechlich Transaktionswarnungen mit Kartendaten, aber die Verwendung einer verkuerzten URL (bit.ly) ist ein Warnsignal. Der sicherste Ansatz ist, es als verdaechtig zu behandeln und unabhaengig zu verifizieren.',
        redFlags: [
          { title: 'Verkuerzte URL', description: 'Der "bit.ly"-Link verbirgt das tatsaechliche Ziel. Legitime Banken sollten ihre offizielle Domain verwenden. Verkuerzte URLs werden haeufig beim Phishing verwendet.' },
          { title: 'Spezifische Transaktionsdetails', description: 'Die Angabe echter Kartenziffern und eines bestimmten Haendlers ist ueberzeugend — aber Datenlecks koennen Betruegern teilweise Kartennummern liefern.' },
          { title: 'Dringlichkeit zum Handeln', description: '"Sperren Sie Ihre Karte sofort" draengt Sie zum Klicken des Links, anstatt die Bank unabhaengig zu kontaktieren.' },
          { title: 'Telefonnummer koennte echt sein', description: '+359 2 923 2111 scheint eine echte UniCredit-Nummer zu sein — aber clevere Betrueger fuegen echte Nummern neben gefaelschten Links ein.' },
        ],
        defensiveAdvice: 'Klicken Sie nie auf verkuerzte URLs in Bank-SMS. Rufen Sie die Nummer auf der Rueckseite Ihrer physischen Bankkarte an — nicht die in der SMS. Oeffnen Sie Ihre Banking-App direkt, um letzte Transaktionen zu pruefen.',
      },
    },
  },
];
