export interface PoolQuestion {
  id: string;
  topic: string;
  topicBg: string;
  topicDe: string;
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
  de: {
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
    topicDe: "Phishing",
    en: {
      question: "You receive an email saying your bank account will be locked unless you click a link. What should you do?",
      options: ["Click immediately to prevent locking", "Reply asking if it's real", "Open your bank app directly, not the email link", "Forward it to friends"],
      explanation: "Banks do not require urgent action through email links. Always access accounts via official apps or typed URLs."
    },
    bg: {
      question: "Получавате имейл от банката ви: \u201EВашият акаунт ще бъде заключен след 1 час. Натиснете тук.\u201D Какво правите?",
      options: ["Натискам незабавно", "Отговарям с въпрос дали е истински", "Отварям приложението на банката директно, без линка", "Препращам го на приятели"],
      explanation: "Банките не принуждават спешни действия чрез линкове в имейли. Винаги достъпвайте услугите чрез официални приложения или въведени URL адреси."
    },
    de: {
      question: "Sie erhalten eine E-Mail, die besagt, dass Ihr Bankkonto gesperrt wird, wenn Sie nicht auf einen Link klicken. Was sollten Sie tun?",
      options: ["Sofort klicken, um die Sperrung zu verhindern", "Antworten und fragen, ob es echt ist", "Die Bank-App direkt oeffnen, nicht den E-Mail-Link", "An Freunde weiterleiten"],
      explanation: "Banken verlangen keine dringenden Aktionen ueber E-Mail-Links. Greifen Sie immer ueber offizielle Apps oder eingegebene URLs auf Konten zu."
    },
    correct: 2
  },
  {
    id: "ind-2",
    topic: "Password Security",
    topicBg: "Сигурност на пароли",
    topicDe: "Passwortsicherheit",
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
    de: {
      question: "Welches Passwort ist am staerksten?",
      options: ["password123", "Summer2026", "John1988", "X9!qR#2mZ@7p"],
      explanation: "Starke Passwoerter sind lang, zufaellig und basieren nicht auf Woerterbuchwoertern oder persoenlichen Daten."
    },
    correct: 3
  },
  {
    id: "ind-3",
    topic: "MFA",
    topicBg: "МФУ",
    topicDe: "MFA",
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
    de: {
      question: "Was ist der Hauptzweck der Multi-Faktor-Authentifizierung (MFA)?",
      options: ["Antivirus ersetzen", "Einen zweiten Verifizierungsschritt ueber Passwoerter hinaus hinzufuegen", "Passwoerter kuerzer machen", "WLAN-Verkehr verschluesseln"],
      explanation: "MFA verhindert die Kontouebernahme, selbst wenn Angreifer Ihr Passwort stehlen."
    },
    correct: 1
  },
  {
    id: "ind-4",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
    en: {
      question: "A stranger calls claiming to be Microsoft Support. What is most likely happening?",
      options: ["A legitimate update process", "A scam attempt", "A warranty check", "A password reset request"],
      explanation: "Microsoft does not call customers unsolicited. This is a common tech support scam."
    },
    bg: {
      question: "Непознат се обажда, представяйки се за \u201EПоддръжка на Microsoft\u201D. Какво най-вероятно се случва?",
      options: ["Легитимна помощ", "Опит за измама", "Софтуерна актуализация", "Предложение за възстановяване на средства"],
      explanation: "Microsoft не се обажда на клиенти непоискано. Това е класическа измама с техническа поддръжка."
    },
    de: {
      question: "Ein Fremder ruft an und behauptet, vom Microsoft-Support zu sein. Was passiert hoechstwahrscheinlich?",
      options: ["Ein legitimer Update-Vorgang", "Ein Betrugsversuch", "Eine Garantiepruefung", "Eine Anfrage zum Zuruecksetzen des Passworts"],
      explanation: "Microsoft ruft Kunden nicht unaufgefordert an. Dies ist ein haeufiger Technik-Support-Betrug."
    },
    correct: 1
  },
  {
    id: "ind-5",
    topic: "Phishing",
    topicBg: "Фишинг",
    topicDe: "Phishing",
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
    de: {
      question: "Was ist der sicherste Schritt, bevor Sie einen Anhang oeffnen?",
      options: ["Vertrauen, wenn es offiziell aussieht", "Schnell oeffnen, um zu pruefen", "Den Absender ueber einen anderen Kanal verifizieren", "Zuerst den Virenschutz deaktivieren"],
      explanation: "E-Mail-Faelschung ist einfach. Verifizierung verhindert Malware-Infektionen."
    },
    correct: 2
  },
  {
    id: "ind-6",
    topic: "Network Security",
    topicBg: "Мрежова сигурност",
    topicDe: "Netzwerksicherheit",
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
    de: {
      question: "Was ist die sicherste Praxis bei oeffentlichem WLAN?",
      options: ["Online-Banking", "In geschaeftliche E-Mails einloggen", "Sensible Anmeldungen vermeiden oder ein VPN verwenden", "Passwoerter mit Freunden teilen"],
      explanation: "Oeffentliches WLAN ist unsicher und kann von Angreifern ueberwacht werden."
    },
    correct: 2
  },
  {
    id: "ind-7",
    topic: "Phishing",
    topicBg: "Фишинг",
    topicDe: "Phishing",
    en: {
      question: "A website URL looks like paypaI.com (capital i instead of l). What is this?",
      options: ["Normal PayPal", "Typo-squatting phishing domain", "Secure login method", "Browser display bug"],
      explanation: "Attackers use lookalike domains to steal credentials."
    },
    bg: {
      question: "Ако URL адресът на уебсайт е paypaI.com (с главно \u201Ei\u201D), какво е това?",
      options: ["Нормален PayPal", "Фишинг домейн с typo-squatting", "Сигурен вход", "Грешка на браузъра"],
      explanation: "Атакуващите използват подобно изглеждащи символи, за да крадат данни за достъп."
    },
    de: {
      question: "Eine Website-URL sieht aus wie paypaI.com (grosses I statt kleines l). Was ist das?",
      options: ["Normales PayPal", "Phishing-Domain mit Typo-Squatting", "Sichere Anmeldemethode", "Browser-Anzeigefehler"],
      explanation: "Angreifer verwenden aehnlich aussehende Domains, um Zugangsdaten zu stehlen."
    },
    correct: 1
  },
  {
    id: "ind-8",
    topic: "Password Security",
    topicBg: "Сигурност на пароли",
    topicDe: "Passwortsicherheit",
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
    de: {
      question: "Was ist der sicherste Weg, Passwoerter zu speichern?",
      options: ["Klebezettel neben dem Computer", "Notiz-App ohne Verschluesselung", "Passwort-Manager", "Ein starkes Passwort ueberall wiederverwenden"],
      explanation: "Passwort-Manager speichern einzigartige Passwoerter fuer jeden Dienst sicher. Beliebte Optionen sind Bitwarden, 1Password, NordPass, Password (fuer iOS) oder die integrierten von Google/Samsung."
    },
    correct: 2
  },
  {
    id: "ind-9",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
    en: {
      question: "A friend sends you 'Is this you in this video?' with a strange link. What should you do?",
      options: ["Click immediately", "Ask them through another message first", "Forward it to others", "Ignore browser warnings"],
      explanation: "Friends' accounts get hacked. Always confirm suspicious links."
    },
    bg: {
      question: "Приятел изпраща \u201EТи ли си на това видео?\u201D със странен линк. Какво трябва да направите?",
      options: ["Натисни го", "Попитай го/я чрез друго съобщение първо", "Препрати го", "Игнорирай предупрежденията на антивирусната"],
      explanation: "Акаунтите биват хакнати. Винаги потвърждавайте подозрителни съобщения."
    },
    de: {
      question: "Ein Freund schickt Ihnen 'Bist du das in diesem Video?' mit einem seltsamen Link. Was sollten Sie tun?",
      options: ["Sofort klicken", "Ihn/sie zuerst ueber eine andere Nachricht fragen", "Weiterleiten", "Browser-Warnungen ignorieren"],
      explanation: "Konten werden gehackt. Bestaetigen Sie verdaechtige Links immer separat."
    },
    correct: 1
  },
  {
    id: "ind-10",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
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
    de: {
      question: "Was ist die beste Verteidigung gegen Betrug?",
      options: ["Menschen online vertrauen", "Schnell unter Druck handeln", "Skepsis und Verifizierung", "Das Internet komplett meiden"],
      explanation: "Die meisten Betrugsversuche gelingen, weil Opfer unter Druck handeln, ohne zu pruefen."
    },
    correct: 2
  },
  {
    id: "ind-11",
    topic: "MFA",
    topicBg: "МФУ",
    topicDe: "MFA",
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
    de: {
      question: "Wenn Sie einen Einmalcode erhalten, den Sie nicht angefordert haben, was bedeutet das wahrscheinlich?",
      options: ["Ein Systemfehler", "Jemand versucht, sich in Ihr Konto einzuloggen", "Ihr Telefon ist infiziert", "Nichts Wichtiges"],
      explanation: "Unerwartete MFA-Codes deuten darauf hin, dass gestohlene Zugangsdaten verwendet werden."
    },
    correct: 1
  },
  {
    id: "ind-12",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
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
    de: {
      question: "Welche Nachricht ist eine gaengige Betrugstaktik?",
      options: ["Nehmen Sie sich Zeit zur Pruefung", "Dringend: Handeln Sie jetzt oder verlieren Sie den Zugang", "Hier ist unsere offizielle Support-Seite", "Monatlicher Newsletter"],
      explanation: "Betrueger setzen auf Dringlichkeit und Angst, um rationales Denken zu umgehen."
    },
    correct: 1
  },
  {
    id: "ind-13",
    topic: "Phishing",
    topicBg: "Фишинг",
    topicDe: "Phishing",
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
    de: {
      question: "Was ist Phishing?",
      options: ["Eine Firewall-Konfiguration", "Benutzer dazu verleiten, sensible Informationen preiszugeben", "Eine Art der Verschluesselung", "Eine Backup-Strategie"],
      explanation: "Phishing nutzt Taeuschung, um Zugangsdaten oder Geld zu stehlen."
    },
    correct: 1
  },
  {
    id: "ind-14",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    topicDe: "Reaktion auf Vorfaelle",
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
    de: {
      question: "Was sollten Sie tun, wenn Sie vermuten, dass Ihr Konto kompromittiert wurde?",
      options: ["Ignorieren", "Passwort aendern und MFA sofort aktivieren", "Auf Bestaetigungs-E-Mail warten", "Oeffentlich darueber posten"],
      explanation: "Sofortige Eindaemmung reduziert den Schaden und verhindert die Uebernahme."
    },
    correct: 1
  },
  {
    id: "ind-15",
    topic: "Malware",
    topicBg: "Зловреден софтуер",
    topicDe: "Schadsoftware",
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
    de: {
      question: "Welcher Dateityp ist von unbekannten E-Mail-Absendern am riskantesten?",
      options: [".jpg", ".pdf", ".exe", ".txt"],
      explanation: "Ausfuehrbare Dateien koennen direkt Schadsoftware ausfuehren."
    },
    correct: 2
  },
  {
    id: "ind-16",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
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
    de: {
      question: "Was ist Social Engineering?",
      options: ["Programmierung sozialer Netzwerke", "Menschen manipulieren, damit sie Sicherheitsregeln brechen", "Antivirus installieren", "Datenbanken verschluesseln"],
      explanation: "Angreifer nutzen menschliches Vertrauen staerker aus als technische Schwachstellen."
    },
    correct: 1
  },
  {
    id: "ind-17",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
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
    de: {
      question: "Was ist die sicherste Reaktion auf eine Gewinn-SMS, an der Sie nie teilgenommen haben?",
      options: ["Link anklicken, um den Preis zu erhalten", "Persoenliche Daten angeben", "Loeschen und Absender blockieren", "Mit Freunden teilen"],
      explanation: "Unaufgeforderte Gewinne sind klassische Betrugsmaschen."
    },
    correct: 2
  },
  {
    id: "ind-18",
    topic: "Patch Management",
    topicBg: "Управление на пачове",
    topicDe: "Patch-Management",
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
    de: {
      question: "Warum sollten Sie Software regelmaessig aktualisieren?",
      options: ["Es aendert die Benutzeroberflaeche", "Es behebt Sicherheitsluecken", "Es entfernt Passwoerter", "Es macht Phishing unmoeglich"],
      explanation: "Updates beheben Schwachstellen, die von Angreifern ausgenutzt werden."
    },
    correct: 1
  },
  {
    id: "ind-19",
    topic: "Online Safety",
    topicBg: "Онлайн безопасност",
    topicDe: "Online-Sicherheit",
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
    de: {
      question: "Welche ist eine sichere Zahlungspraxis online?",
      options: ["Ueberweisung an Fremde", "Nur ueber vertrauenswuerdige Plattformen bezahlen", "Kartenfoto per E-Mail senden", "OTP-Codes teilen"],
      explanation: "Vertrauenswuerdige Zahlungssysteme bieten Betrugsschutz."
    },
    correct: 1
  },
  {
    id: "ind-20",
    topic: "MFA",
    topicBg: "МФУ",
    topicDe: "MFA",
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
    de: {
      question: "Wenn jemand nach Ihrem MFA-Code fragt, was stimmt?",
      options: ["Es ist normale Support-Praxis", "Es bedeutet, dass versucht wird, Zugang zu stehlen", "Es ist fuer Rueckerstattungen erforderlich", "Es ist harmlos"],
      explanation: "Kein serioeses Unternehmen wird Sie nach Ihrem MFA-Code fragen."
    },
    correct: 1
  },
  {
    id: "ind-21",
    topic: "Phishing",
    topicBg: "Фишинг",
    topicDe: "Phishing",
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
    de: {
      question: "Was ist der sicherste Weg, um zu bestaetigen, dass eine Firmen-E-Mail legitim ist?",
      options: ["Dem Logo vertrauen", "Das Unternehmen ueber die offizielle Website-Nummer anrufen", "Abmeldelink anklicken", "Direkt antworten"],
      explanation: "Unabhaengige Verifizierung verhindert Spoofing-Angriffe."
    },
    correct: 1
  },
  {
    id: "ind-22",
    topic: "Online Safety",
    topicBg: "Онлайн безопасност",
    topicDe: "Online-Sicherheit",
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
    de: {
      question: "Was ist ein Warnsignal beim Online-Shopping?",
      options: ["HTTPS-Schloss-Symbol", "Unrealistische Rabatte und Dringlichkeit", "Klare Rueckgaberegelung", "Bekannter Markenname"],
      explanation: "Gefaelschte Shops setzen auf zu-gut-um-wahr-zu-sein-Angebote."
    },
    correct: 1
  },
  {
    id: "ind-23",
    topic: "Identity Protection",
    topicBg: "Защита на самоличността",
    topicDe: "Identitaetsschutz",
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
    de: {
      question: "Was ist Identitaetsdiebstahl?",
      options: ["Social-Media-Likes von jemandem stehlen", "Persoenliche Daten nutzen, um sich finanziell als jemand auszugeben", "Browsereinstellungen aendern", "Cookies loeschen"],
      explanation: "Identitaetsdiebstahl kann zu Betrug, Krediten und Kontomissbrauch fuehren."
    },
    correct: 1
  },
  {
    id: "ind-24",
    topic: "Device Security",
    topicBg: "Сигурност на устройства",
    topicDe: "Geraetesicherheit",
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
    de: {
      question: "Wenn Ihr Geraet verloren geht, was hilft am meisten?",
      options: ["Keine Bildschirmsperre", "Vollstaendige Festplattenverschluesselung und Fernloeschung", "Einfache PIN 1111 verwenden", "Passwoerter in Notizen speichern"],
      explanation: "Verschluesselung verhindert Datenexposition, selbst wenn das Geraet gestohlen wird."
    },
    correct: 1
  },
  {
    id: "ind-25",
    topic: "Password Security",
    topicBg: "Сигурност на пароли",
    topicDe: "Passwortsicherheit",
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
    de: {
      question: "Warum sollten Sie die Wiederverwendung von Passwoertern vermeiden?",
      options: ["Es ist unpraktisch", "Ein Datenleck kompromittiert mehrere Konten", "Es verlangsamt die Anmeldung", "Es stoert MFA"],
      explanation: "Credential-Stuffing-Angriffe nutzen die Wiederverwendung von Passwoertern aus."
    },
    correct: 1
  },
  {
    id: "ind-26",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
    en: {
      question: "What is the safest response to a suspicious pop-up saying 'Virus detected'?",
      options: ["Call the number shown", "Click 'Fix Now'", "Close browser and run trusted antivirus", "Enter payment details"],
      explanation: "Fake virus pop-ups are common scams to steal money."
    },
    bg: {
      question: "Какво е най-безопасното отговорено на подозрителен pop-up, който казва \u201EВирус открит\u201D?",
      options: ["Обадете се на показания номер", "Натиснете 'Поправи сега'", "Затворете браузъра и изпълнете надежен антивирус", "Въведете детайли на плащане"],
      explanation: "Фалшивите pop-up съобщения за вирус са често срещани измамни схеми, за да крадат пари."
    },
    de: {
      question: "Was ist die sicherste Reaktion auf ein verdaechtiges Pop-up mit 'Virus erkannt'?",
      options: ["Die angezeigte Nummer anrufen", "'Jetzt beheben' klicken", "Browser schliessen und vertrauenswuerdigen Virenschutz ausfuehren", "Zahlungsdaten eingeben"],
      explanation: "Gefaelschte Virus-Pop-ups sind gaengige Betrugsmaschen, um Geld zu stehlen."
    },
    correct: 2
  },
  {
    id: "ind-27",
    topic: "Identity Protection",
    topicBg: "Защита на самоличността",
    topicDe: "Identitaetsschutz",
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
    de: {
      question: "Welches persoenliche Detail ist am gefaehrlichsten, online zu teilen?",
      options: ["Lieblingsfilm", "Vollstaendiges Geburtsdatum + Adresse", "Essensvorlieben", "Sportmannschaft"],
      explanation: "Angreifer verwenden persoenliche Daten fuer Identitaetsbetrug und Passwortzuruecksetzungen."
    },
    correct: 1
  },
  {
    id: "ind-28",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    topicDe: "Social Engineering",
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
    de: {
      question: "Was ist ein sicherer Weg, Support von Ihrer Bank zu erhalten?",
      options: ["Ueber zufaellige Telefonanrufe", "Ueber die offizielle App oder bekannte Filialkontakte", "Ueber Telegram-Nachrichten", "Ueber Social-Media-Kommentare"],
      explanation: "Verwenden Sie immer offizielle Support-Kanaele."
    },
    correct: 1
  },
  {
    id: "ind-29",
    topic: "Network Security",
    topicBg: "Мрежова сигурност",
    topicDe: "Netzwerksicherheit",
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
    de: {
      question: "Was garantiert HTTPS?",
      options: ["Die Website ist kein Betrug", "Die Verbindung ist verschluesselt", "Die Website ist staatlich genehmigt", "Es gibt keine Malware"],
      explanation: "HTTPS verschluesselt den Datenverkehr, garantiert aber keine Legitimitaet."
    },
    correct: 1
  },
  {
    id: "ind-30",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    topicDe: "Reaktion auf Vorfaelle",
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
    de: {
      question: "Was ist der beste erste Schritt, nachdem Sie auf einen verdaechtigen Link geklickt haben?",
      options: ["Ignorieren", "Verbindung trennen, Geraet scannen und Passwoerter aendern", "Den Link an andere senden", "Neustarten und nichts tun"],
      explanation: "Sofortige Reaktion reduziert das Risiko von Malware oder Zugangsdatendiebstahl."
    },
    correct: 1
  }
];
