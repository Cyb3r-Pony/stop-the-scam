export interface PoolQuestion {
  id: string;
  topic: string;
  topicBg: string;
  en: {
    question: string;
    options: [string, string, string, string];
    explanation: string;
  };
  bg: {
    question: string;
    options: [string, string, string, string];
    explanation: string;
  };
  correct: number; // 0-based: A=0, B=1, C=2, D=3
}

export const individualsPool: PoolQuestion[] = [
  {
    id: "ind-1",
    topic: "Phishing",
    topicBg: "Фишинг",
    en: {
      question: "You receive an email saying your bank account will be locked unless you click a link. What should you do?",
      options: ["Click immediately to prevent locking", "Reply asking if it's real", "Open your bank app directly, not the email link", "Forward it to friends"],
      explanation: "Banks do not require urgent action through email links. Always access accounts via official apps or typed URLs."
    },
    bg: {
      question: "Получавате имейл от банката ви: „Вашият акаунт ще бъде заключен след 1 час. Натиснете тук." Какво правите?",
      options: ["Натискам незабавно", "Отговарям с въпрос дали е истински", "Отварям приложението на банката директно, без линка", "Препращам го на приятели"],
      explanation: "Банките не принуждават спешни действия чрез линкове в имейли. Винаги достъпвайте услугите чрез официални приложения или въведени URL адреси."
    },
    correct: 2
  },
  {
    id: "ind-2",
    topic: "Password Security",
    topicBg: "Сигурност на пароли",
    en: {
      question: "Which password is strongest?",
      options: ["password123", "Summer2026", "John1988", "X9!qR#2mZ@7p"],
      explanation: "Strong passwords are long, random, and not based on dictionary words or personal details."
    },
    bg: {
      question: "Коя е най-силната парола?",
      options: ["password123", "Summer2026", "John1988", "X9!qR#2mZ@7p"],
      explanation: "Силните пароли са дълги, случайни и не се базират на думи от речника или лична информация."
    },
    correct: 3
  },
  {
    id: "ind-3",
    topic: "MFA",
    topicBg: "МФУ",
    en: {
      question: "What is the main purpose of Multi-Factor Authentication (MFA)?",
      options: ["To replace antivirus", "To add a second verification step beyond passwords", "To make passwords shorter", "To encrypt Wi-Fi traffic"],
      explanation: "MFA prevents account takeover even if attackers steal your password."
    },
    bg: {
      question: "Какво представлява многофакторното удостоверяване (MFA)?",
      options: ["Втора парола", "Втора стъпка за верификация (код/приложение/устройство)", "Защитна стена", "Антивирусен софтуер"],
      explanation: "MFA блокира атакуващите дори ако откраднат паролата ви."
    },
    correct: 1
  },
  {
    id: "ind-4",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "A stranger calls claiming to be Microsoft Support. What is most likely happening?",
      options: ["A legitimate update process", "A scam attempt", "A warranty check", "A password reset request"],
      explanation: "Microsoft does not call customers unsolicited. This is a common tech support scam."
    },
    bg: {
      question: "Непознат се обажда, представяйки се за „Поддръжка на Microsoft". Какво най-вероятно се случва?",
      options: ["Легитимна помощ", "Опит за измама", "Софтуерна актуализация", "Предложение за възстановяване на средства"],
      explanation: "Microsoft не се обажда на клиенти непоискано. Това е класическа измама с техническа поддръжка."
    },
    correct: 1
  },
  {
    id: "ind-5",
    topic: "Phishing",
    topicBg: "Фишинг",
    en: {
      question: "Before opening an attachment, what is the safest step?",
      options: ["Trust it if it looks official", "Open it quickly to check", "Verify the sender through another channel", "Disable antivirus first"],
      explanation: "Email spoofing is easy. Verification prevents malware infection."
    },
    bg: {
      question: "Какво трябва да направите преди да изтеглите прикачен файл?",
      options: ["Да му се доверите, ако изглежда официално", "Да го отворите бързо", "Да проверите подателя чрез друг канал", "Да деактивирате антивирусната програма"],
      explanation: "Подправянето на имейли е лесно. Проверката предотвратява заразяване с малуер."
    },
    correct: 2
  },
  {
    id: "ind-6",
    topic: "Network Security",
    topicBg: "Мрежова сигурност",
    en: {
      question: "What is the safest practice on public Wi-Fi?",
      options: ["Online banking", "Logging into work email", "Avoid sensitive logins or use a VPN", "Sharing passwords with friends"],
      explanation: "Public Wi-Fi is insecure and can be monitored by attackers."
    },
    bg: {
      question: "Кое е най-безопасно при използване на обществен Wi-Fi?",
      options: ["Онлайн банкиране", "Влизане в работен имейл", "Използване на VPN или избягване на чувствителни влизания", "Споделяне на пароли"],
      explanation: "Обществените Wi-Fi мрежи често са несигурни и наблюдавани."
    },
    correct: 2
  },
  {
    id: "ind-7",
    topic: "Phishing",
    topicBg: "Фишинг",
    en: {
      question: "A website URL looks like paypaI.com (capital i instead of l). What is this?",
      options: ["Normal PayPal", "Typo-squatting phishing domain", "Secure login method", "Browser display bug"],
      explanation: "Attackers use lookalike domains to steal credentials."
    },
    bg: {
      question: "Ако URL адресът на уебсайт е paypaI.com (с главно „i"), какво е това?",
      options: ["Нормален PayPal", "Фишинг домейн с typo-squatting", "Сигурен вход", "Грешка на браузъра"],
      explanation: "Атакуващите използват подобно изглеждащи символи, за да крадат данни за достъп."
    },
    correct: 1
  },
  {
    id: "ind-8",
    topic: "Password Security",
    topicBg: "Сигурност на пароли",
    en: {
      question: "What is the safest way to store passwords?",
      options: ["Sticky note near computer", "Notes app without encryption", "Password manager", "Reuse one strong password everywhere"],
      explanation: "Password managers securely store unique passwords for every service."
    },
    bg: {
      question: "Кой е най-безопасният начин за съхранение на пароли?",
      options: ["Приложение за бележки", "Само в браузъра", "Мениджър на пароли", "Лепящо листче на монитора"],
      explanation: "Мениджърите на пароли генерират и съхраняват силни уникални пароли по сигурен начин. Популярни опции включват Bitwarden, 1Password, NordPass, Password (за iOS) или вградените от Google/Samsung."
    },
    correct: 2
  },
  {
    id: "ind-9",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "A friend sends you 'Is this you in this video?' with a strange link. What should you do?",
      options: ["Click immediately", "Ask them through another message first", "Forward it to others", "Ignore browser warnings"],
      explanation: "Friends' accounts get hacked. Always confirm suspicious links."
    },
    bg: {
      question: "Приятел изпраща „Ти ли си на това видео?" със странен линк. Какво трябва да направите?",
      options: ["Натисни го", "Попитай го/я чрез друго съобщение първо", "Препрати го", "Игнорирай предупрежденията на антивирусната"],
      explanation: "Акаунтите биват хакнати. Винаги потвърждавайте подозрителни съобщения."
    },
    correct: 1
  },
  {
    id: "ind-10",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "What is the best defense against scams?",
      options: ["Trusting people online", "Acting quickly under pressure", "Verification and skepticism", "Avoiding the internet completely"],
      explanation: "Most scams succeed because victims act urgently without verifying."
    },
    bg: {
      question: "Коя е най-добрата защита срещу измами?",
      options: ["Доверие към хората", "Бързо действие", "Скептицизъм + проверка", "Избягване на интернет"],
      explanation: "Повечето измами успяват, защото жертвите действат под натиск, без да проверят."
    },
    correct: 2
  },
  {
    id: "ind-11",
    topic: "MFA",
    topicBg: "МФУ",
    en: {
      question: "If you receive a one-time code you did not request, what does it likely mean?",
      options: ["A system error", "Someone is trying to log into your account", "Your phone is infected", "Nothing important"],
      explanation: "Unexpected MFA codes indicate stolen credentials being used."
    },
    bg: {
      question: "Ако получите еднократен код, който не сте поискали, какво вероятно означава това?",
      options: ["Системна грешка", "Някой се опитва да влезе в акаунта ви", "Телефонът ви е заразен", "Нищо важно"],
      explanation: "Неочаквани МФУ кодове означават, че откраднати идентификационни данни се използват."
    },
    correct: 1
  },
  {
    id: "ind-12",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "Which message is a common scam tactic?",
      options: ["Take your time to review", "Urgent: act now or lose access", "Here is our official support page", "Monthly newsletter"],
      explanation: "Scammers rely on urgency and fear to bypass rational thinking."
    },
    bg: {
      question: "Кое съобщение е често използвано в измами?",
      options: ["Отнеми си време за преглед", "Спешно: действай сега или ще загубиш достъп", "Ето нашата официална страница за поддръжка", "Месечна информационна бюлетина"],
      explanation: "Измамниците разчитат на спешност и страх, за да заобиколят рационалното мислене."
    },
    correct: 1
  },
  {
    id: "ind-13",
    topic: "Phishing",
    topicBg: "Фишинг",
    en: {
      question: "What is phishing?",
      options: ["A firewall configuration", "Tricking users into revealing sensitive information", "A type of encryption", "A backup strategy"],
      explanation: "Phishing uses deception to steal credentials or money."
    },
    bg: {
      question: "Какво е фишинг?",
      options: ["Конфигурация на защитна стена", "Спелване на потребители, за да разкрият чувствителна информация", "Вид криптиране", "Стратегия за резервно копиране"],
      explanation: "Фишингът използва измама, за да краде идентификационни данни или пари."
    },
    correct: 1
  },
  {
    id: "ind-14",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    en: {
      question: "What should you do if you suspect your account is compromised?",
      options: ["Ignore it", "Change password and enable MFA immediately", "Wait for confirmation email", "Post about it publicly"],
      explanation: "Immediate containment reduces damage and prevents takeover."
    },
    bg: {
      question: "Какво трябва да направите, ако подозирате, че акаунтът ви е компрометиран?",
      options: ["Игнорирайте го", "Променете паролата и активирайте MFA незабавно", "Чакайте потвърждаващ имейл", "Публикувайте в социалните мрежи"],
      explanation: "Незабавното ограничаване намалява щетите и предотвратява превземането."
    },
    correct: 1
  },
  {
    id: "ind-15",
    topic: "Malware",
    topicBg: "Зловреден софтуер",
    en: {
      question: "Which file type is most risky from unknown email senders?",
      options: [".jpg", ".pdf", ".exe", ".txt"],
      explanation: "Executable files can directly run malware."
    },
    bg: {
      question: "Какъв вид файл е най-опасен от неизвестни податели?",
      options: [".jpg", ".pdf", ".exe", ".txt"],
      explanation: "Изпълнимите файлове могат директно да изпълнят малуер."
    },
    correct: 2
  },
  {
    id: "ind-16",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "What is social engineering?",
      options: ["Programming social networks", "Manipulating people into breaking security rules", "Installing antivirus", "Encrypting databases"],
      explanation: "Attackers exploit human trust more than technical flaws."
    },
    bg: {
      question: "Какво е социално инженерство?",
      options: ["Програмиране на социални мрежи", "Манипулиране на хората, за да нарушат правилата на сигурността", "Инсталиране на антивирус", "Криптиране на бази данни"],
      explanation: "Атакуващите експлоатират човешкото доверие повече от технически недостатъци."
    },
    correct: 1
  },
  {
    id: "ind-17",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "What is the safest response to a prize-winning SMS you never entered?",
      options: ["Click link to claim prize", "Provide personal details", "Delete and block sender", "Share with friends"],
      explanation: "Unsolicited prizes are classic fraud schemes."
    },
    bg: {
      question: "Какво е най-безопасното отговорено на SMS за награда, която не сте печелили?",
      options: ["Натиснете линка, за да получите награда", "Предоставете лични данни", "Изтрийте и блокирайте подателя", "Поделете с приятели"],
      explanation: "Неистински награди са класически измамни схеми."
    },
    correct: 2
  },
  {
    id: "ind-18",
    topic: "Patch Management",
    topicBg: "Управление на пачове",
    en: {
      question: "Why should you update software regularly?",
      options: ["It changes the interface", "It fixes security vulnerabilities", "It removes passwords", "It makes phishing impossible"],
      explanation: "Updates patch vulnerabilities exploited by attackers."
    },
    bg: {
      question: "Защо трябва редовно да актуализирате софтуера?",
      options: ["Променя интерфейса", "Поправя уязвимости в сигурността", "Премахва пароли", "Прави фишингът невъзможен"],
      explanation: "Актуализациите поправят уязвимостите, които експлоатират атакуващите."
    },
    correct: 1
  },
  {
    id: "ind-19",
    topic: "Online Safety",
    topicBg: "Онлайн безопасност",
    en: {
      question: "Which is a safe payment practice online?",
      options: ["Wire transfer to strangers", "Pay only through trusted platforms", "Send card photo by email", "Share OTP codes"],
      explanation: "Trusted payment systems provide fraud protections."
    },
    bg: {
      question: "Кое е безопасна практика при плащане онлайн?",
      options: ["Банков превод на незнайомци", "Плащане само чрез надежни платформи", "Изпращане на снимка на карта по имейл", "Споделяне на OTP кодове"],
      explanation: "Надежните платежни системи осигуряват защита от измама."
    },
    correct: 1
  },
  {
    id: "ind-20",
    topic: "MFA",
    topicBg: "МФУ",
    en: {
      question: "If someone asks for your MFA code, what is true?",
      options: ["It is normal support practice", "It means they are trying to steal access", "It is required for refunds", "It is harmless"],
      explanation: "No legitimate company will ask for your MFA code."
    },
    bg: {
      question: "Ако някой попроси вашия MFA код, какво е вярно?",
      options: ["Это нормална практика на поддръжка", "Означава, че се опитват да краят достъп", "Необходимо е за възврата", "Е безвредно"],
      explanation: "Нито една легитимна компания няма да поиска вашия MFA код."
    },
    correct: 1
  },
  {
    id: "ind-21",
    topic: "Phishing",
    topicBg: "Фишинг",
    en: {
      question: "What is the safest way to confirm a company email is legitimate?",
      options: ["Trust the logo", "Call the company using the official website number", "Click unsubscribe link", "Reply directly"],
      explanation: "Independent verification prevents spoofing attacks."
    },
    bg: {
      question: "Какво е най-безопасният начин да потвърдите, че имейлът на компанията е легитимен?",
      options: ["Доверие в логото", "Обадете се на компанията, използвайки официалния номер на уебсайта", "Натиснете линка за отписване", "Отговорете директно"],
      explanation: "Независимата проверка предотвратява атаки на подправяне."
    },
    correct: 1
  },
  {
    id: "ind-22",
    topic: "Online Safety",
    topicBg: "Онлайн безопасност",
    en: {
      question: "Which is a red flag in online shopping?",
      options: ["HTTPS lock icon", "Unrealistic discounts and urgency", "Clear return policy", "Known brand name"],
      explanation: "Fake shops rely on too-good-to-be-true offers."
    },
    bg: {
      question: "Кое е червен флаг при онлайн пазаруване?",
      options: ["HTTPS икона с катинар", "Нереалистични намаления и спешност", "Ясна политика за връщане", "Известно име на марката"],
      explanation: "Фалшивите магазини разчитат на прекалено добри предложения."
    },
    correct: 1
  },
  {
    id: "ind-23",
    topic: "Identity Protection",
    topicBg: "Защита на самоличността",
    en: {
      question: "What is identity theft?",
      options: ["Stealing someone's social media likes", "Using personal data to impersonate someone financially", "Changing browser settings", "Deleting cookies"],
      explanation: "Identity theft can lead to fraud, loans, and account abuse."
    },
    bg: {
      question: "Какво е кража на идентичност?",
      options: ["Краденето на социални медии харесвания на някого", "Използване на лични данни, за да издадеш някого финансово", "Промяна на настройките на браузъра", "Изтриване на бисквитки"],
      explanation: "Кражата на идентичност може да доведе до измама, заеми и злоупотреба на акаунт."
    },
    correct: 1
  },
  {
    id: "ind-24",
    topic: "Device Security",
    topicBg: "Сигурност на устройства",
    en: {
      question: "If your device is lost, what helps most?",
      options: ["No screen lock", "Full-disk encryption and remote wipe", "Using simple PIN 1111", "Saving passwords in notes"],
      explanation: "Encryption prevents data exposure even if the device is stolen."
    },
    bg: {
      question: "Ако устройството ви е загубено, какво помага най-много?",
      options: ["Няма блокировка на екран", "Пълно криптиране на диск и дистанционно изтриване", "Използване на прост PIN 1111", "Съхранение на пароли в бележки"],
      explanation: "Криптирането предотвратява експозицията на данни дори ако устройството е откраднато."
    },
    correct: 1
  },
  {
    id: "ind-25",
    topic: "Password Security",
    topicBg: "Сигурност на пароли",
    en: {
      question: "Why should you avoid reusing passwords?",
      options: ["It is inconvenient", "One breach compromises multiple accounts", "It slows down login", "It breaks MFA"],
      explanation: "Credential stuffing attacks exploit password reuse."
    },
    bg: {
      question: "Защо трябва да избегнете повторното използване на пароли?",
      options: ["Е неудобно", "Един пробив компрометира множество акаунти", "Забавя влизането", "Разбива MFA"],
      explanation: "Атаките за пълнене на идентификационни данни експлоатират повторното използване на пароли."
    },
    correct: 1
  },
  {
    id: "ind-26",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "What is the safest response to a suspicious pop-up saying 'Virus detected'?",
      options: ["Call the number shown", "Click 'Fix Now'", "Close browser and run trusted antivirus", "Enter payment details"],
      explanation: "Fake virus pop-ups are common scams to steal money."
    },
    bg: {
      question: "Какво е най-безопасното отговорено на подозрителен pop-up, който казва „Вирус открит"?",
      options: ["Обадете се на показания номер", "Натиснете 'Поправи сега'", "Затворете браузъра и изпълнете надежен антивирус", "Въведете детайли на плащане"],
      explanation: "Фалшивите pop-up съобщения за вирус са често срещани измамни схеми, за да крадат пари."
    },
    correct: 2
  },
  {
    id: "ind-27",
    topic: "Identity Protection",
    topicBg: "Защита на самоличността",
    en: {
      question: "Which personal detail is most dangerous to overshare online?",
      options: ["Favorite movie", "Full birthdate + address", "Food preferences", "Sports team"],
      explanation: "Attackers use personal data for identity fraud and password resets."
    },
    bg: {
      question: "Кой личен детайл е най-опасен да преразпределяш онлайн?",
      options: ["Любимия филм", "Пълна дата на раждане + адрес", "Предпочитания относно храна", "Спортен отбор"],
      explanation: "Атакуващите използват лични данни за идентификационна измама и нулиране на пароли."
    },
    correct: 1
  },
  {
    id: "ind-28",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "What is a safe way to receive support from your bank?",
      options: ["Through random phone calls", "Through official app or known branch contacts", "Through Telegram messages", "Through social media comments"],
      explanation: "Always use official support channels."
    },
    bg: {
      question: "Какво е безопасен начин да получите поддръжка от банката?",
      options: ["Чрез случайни телефонни обаждания", "Чрез официално приложение или познати контакти на клона", "Чрез съобщения в Telegram", "Чрез коментари в социалните мрежи"],
      explanation: "Винаги използвайте официални канали за поддръжка."
    },
    correct: 1
  },
  {
    id: "ind-29",
    topic: "Network Security",
    topicBg: "Мрежова сигурност",
    en: {
      question: "What does HTTPS guarantee?",
      options: ["The website is not a scam", "The connection is encrypted", "The website is government-approved", "No malware exists"],
      explanation: "HTTPS encrypts traffic but does not guarantee legitimacy."
    },
    bg: {
      question: "Какво гарантира HTTPS?",
      options: ["Уебсайтът не е измама", "Връзката е криптирана", "Уебсайтът е одобрен от правителството", "Няма малуер"],
      explanation: "HTTPS криптира трафика, но не гарантира легитимност."
    },
    correct: 1
  },
  {
    id: "ind-30",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    en: {
      question: "What is the best first step after clicking a suspicious link?",
      options: ["Ignore it", "Disconnect and scan device, change passwords", "Send the link to others", "Restart and do nothing"],
      explanation: "Immediate response reduces risk of malware or credential theft."
    },
    bg: {
      question: "Какво е най-добрата първа стъпка след натискане на подозрителен линк?",
      options: ["Игнорирайте го", "Отключете се и сканирайте устройство, променете пароли", "Изпратете линка на други", "Рестартирайте и не правете нищо"],
      explanation: "Незабавната реакция намалява риска от малуер или кража на идентификационни данни."
    },
    correct: 1
  }
];
