import React, { useState } from 'react';
import { Lang } from '../types';

type QuizCategory = 'individuals' | 'it-admins' | 'executives';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // 0-based index
  explanation: string;
}

interface QuizData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  questions: QuizQuestion[];
}

interface Recommendation {
  tier: string;
  tierColor: string;
  tierBg: string;
  tierBorder: string;
  message: string;
  actions: string[];
  priority: string;
}

const getQuizData = (lang: Lang): Record<QuizCategory, QuizData> => ({
  'individuals': {
    title: lang === 'bg' ? 'Физически лица' : 'Individuals',
    subtitle: lang === 'bg' ? 'Ежедневни потребители' : 'Everyday Users',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    questions: [
      {
        question: lang === 'bg'
          ? 'Получавате имейл от банката ви: „Вашият акаунт ще бъде заключен след 1 час. Натиснете тук." Какво правите?'
          : 'You receive an email from your bank saying: "Your account will be locked in 1 hour. Click here." What do you do?',
        options: [
          lang === 'bg' ? 'Натискам незабавно' : 'Click immediately',
          lang === 'bg' ? 'Отговарям с въпрос дали е истински' : 'Reply asking if it\'s real',
          lang === 'bg' ? 'Отварям приложението на банката директно, без линка' : 'Open your bank app directly, not the link',
          lang === 'bg' ? 'Препращам го на приятели' : 'Forward it to friends'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Банките не принуждават спешни действия чрез линкове в имейли. Винаги достъпвайте услугите чрез официални приложения или въведени URL адреси.'
          : 'Banks don\'t force urgent actions through email links. Always access services through official apps or typed URLs.'
      },
      {
        question: lang === 'bg' ? 'Коя е най-силната парола?' : 'What is the strongest password?',
        options: [
          'password123',
          'Summer2026',
          'John1988',
          'X9!qR#2mZ@7p'
        ],
        correct: 3,
        explanation: lang === 'bg'
          ? 'Силните пароли са дълги, случайни и не се базират на думи от речника или лична информация.'
          : 'Strong passwords are long, random, and not based on dictionary words or personal info.'
      },
      {
        question: lang === 'bg'
          ? 'Какво представлява многофакторното удостоверяване (MFA)?'
          : 'What is Multi-Factor Authentication (MFA)?',
        options: [
          lang === 'bg' ? 'Втора парола' : 'A second password',
          lang === 'bg' ? 'Втора стъпка за верификация (код/приложение/устройство)' : 'A second verification step (code/app/device)',
          lang === 'bg' ? 'Защитна стена' : 'A firewall',
          lang === 'bg' ? 'Антивирусен софтуер' : 'Antivirus software'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'MFA блокира атакуващите дори ако откраднат паролата ви.'
          : 'MFA blocks attackers even if they steal your password.'
      },
      {
        question: lang === 'bg'
          ? 'Непознат се обажда, представяйки се за „Поддръжка на Microsoft". Какво най-вероятно се случва?'
          : 'A stranger calls claiming to be "Microsoft Support." What is most likely happening?',
        options: [
          lang === 'bg' ? 'Легитимна помощ' : 'Legitimate help',
          lang === 'bg' ? 'Опит за измама' : 'A scam attempt',
          lang === 'bg' ? 'Софтуерна актуализация' : 'A software update',
          lang === 'bg' ? 'Предложение за възстановяване на средства' : 'A refund offer'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Microsoft не се обажда на клиенти непоискано. Това е класическа измама с техническа поддръжка.'
          : 'Microsoft does not call customers unsolicited. This is classic tech support fraud.'
      },
      {
        question: lang === 'bg'
          ? 'Какво трябва да направите преди да изтеглите прикачен файл?'
          : 'What should you do before downloading an attachment?',
        options: [
          lang === 'bg' ? 'Да му се доверите, ако изглежда официално' : 'Trust it if it looks official',
          lang === 'bg' ? 'Да го отворите бързо' : 'Open it quickly',
          lang === 'bg' ? 'Да проверите подателя чрез друг канал' : 'Verify the sender through another channel',
          lang === 'bg' ? 'Да деактивирате антивирусната програма' : 'Disable antivirus'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Подправянето на имейли е лесно. Проверката предотвратява заразяване с малуер.'
          : 'Email spoofing is easy. Verification prevents malware infection.'
      },
      {
        question: lang === 'bg'
          ? 'Кое е най-безопасно при използване на обществен Wi-Fi?'
          : 'Which is safest on public Wi-Fi?',
        options: [
          lang === 'bg' ? 'Онлайн банкиране' : 'Online banking',
          lang === 'bg' ? 'Влизане в работен имейл' : 'Logging into work email',
          lang === 'bg' ? 'Използване на VPN или избягване на чувствителни влизания' : 'Using a VPN or avoiding sensitive logins',
          lang === 'bg' ? 'Споделяне на пароли' : 'Sharing passwords'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Обществените Wi-Fi мрежи често са несигурни и наблюдавани.'
          : 'Public Wi-Fi is often insecure and monitored.'
      },
      {
        question: lang === 'bg'
          ? 'Ако URL адресът на уебсайт е paypaI.com (с главно „i"), какво е това?'
          : 'If a website URL is paypaI.com (capital i), what is this?',
        options: [
          lang === 'bg' ? 'Нормален PayPal' : 'Normal PayPal',
          lang === 'bg' ? 'Фишинг домейн с typo-squatting' : 'Typo-squatting phishing domain',
          lang === 'bg' ? 'Сигурен вход' : 'Secure login',
          lang === 'bg' ? 'Грешка на браузъра' : 'Browser bug'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Атакуващите използват подобно изглеждащи символи, за да крадат данни за достъп.'
          : 'Attackers use lookalike characters to steal credentials.'
      },
      {
        question: lang === 'bg'
          ? 'Кой е най-безопасният начин за съхранение на пароли?'
          : 'What is the safest way to store passwords?',
        options: [
          lang === 'bg' ? 'Приложение за бележки' : 'Notes app',
          lang === 'bg' ? 'Само в браузъра' : 'Browser only',
          lang === 'bg' ? 'Мениджър на пароли' : 'Password manager',
          lang === 'bg' ? 'Лепящо листче на монитора' : 'Sticky note on monitor'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Мениджърите на пароли генерират и съхраняват силни уникални пароли по сигурен начин. Популярни опции включват Bitwarden, 1Password, NordPass, Password (за iOS) или вградените от Google/Samsung.'
          : 'Password managers generate and store strong unique passwords securely. Popular options include Bitwarden, 1Password, NordPass, Password (for iOS), or built-in Google/Samsung managers.'
      },
      {
        question: lang === 'bg'
          ? 'Приятел изпраща „Ти ли си на това видео?" със странен линк. Какво трябва да направите?'
          : 'A friend sends "Is this you in this video?" with a strange link. What should you do?',
        options: [
          lang === 'bg' ? 'Натисни го' : 'Click it',
          lang === 'bg' ? 'Попитай го/я чрез друго съобщение първо' : 'Ask them via message first',
          lang === 'bg' ? 'Препрати го' : 'Forward it',
          lang === 'bg' ? 'Игнорирай предупрежденията на антивирусната' : 'Ignore antivirus warnings'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Акаунтите биват хакнати. Винаги потвърждавайте подозрителни съобщения.'
          : 'Accounts get hijacked. Always confirm suspicious messages.'
      },
      {
        question: lang === 'bg'
          ? 'Коя е най-добрата защита срещу измами?'
          : 'What is the best defense against scams?',
        options: [
          lang === 'bg' ? 'Доверие към хората' : 'Trusting people',
          lang === 'bg' ? 'Бързо действие' : 'Fast action',
          lang === 'bg' ? 'Скептицизъм + проверка' : 'Skepticism + verification',
          lang === 'bg' ? 'Избягване на интернет' : 'Avoiding the internet'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Повечето измами успяват, защото жертвите действат под натиск, без да проверят.'
          : 'Most scams succeed because victims act under pressure without verifying.'
      }
    ]
  },
  'it-admins': {
    title: lang === 'bg' ? 'IT Администратори' : 'IT Administrators',
    subtitle: lang === 'bg' ? 'Технически персонал' : 'Technical Staff',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    questions: [
      {
        question: lang === 'bg'
          ? 'Кой е най-ефективният контрол срещу кражба на идентификационни данни?'
          : 'What is the most effective control against credential theft?',
        options: [
          lang === 'bg' ? 'Ротация на пароли' : 'Password rotation',
          lang === 'bg' ? 'MFA навсякъде' : 'MFA everywhere',
          lang === 'bg' ? 'По-сложни потребителски имена' : 'More complex usernames',
          lang === 'bg' ? 'Деактивиране на логирането' : 'Disabling logging'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'MFA спира повечето атаки за повторно използване на идентификационни данни и фишинг атаки.'
          : 'MFA stops most credential reuse and phishing attacks.'
      },
      {
        question: lang === 'bg'
          ? 'Какъв е най-големият риск от излагането на RDP директно в интернет?'
          : 'What is the biggest risk of exposing RDP directly to the internet?',
        options: [
          lang === 'bg' ? 'Бавна производителност' : 'Slow performance',
          lang === 'bg' ? 'Brute force + влизане на рансъмуер' : 'Brute force + ransomware entry',
          lang === 'bg' ? 'По-добър отдалечен достъп' : 'Better remote access',
          lang === 'bg' ? 'DNS грешки' : 'DNS errors'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Излагането на RDP е една от основните входни точки за рансъмуер.'
          : 'RDP exposure is one of the top ransomware entry points.'
      },
      {
        question: lang === 'bg'
          ? 'Принципът на минималните привилегии означава:'
          : 'Principle of Least Privilege means:',
        options: [
          lang === 'bg' ? 'Всеки е администратор' : 'Everyone is admin',
          lang === 'bg' ? 'Потребителите получават само достъпа, от който се нуждаят' : 'Users get only the access they need',
          lang === 'bg' ? 'Деактивиране на акаунти' : 'Disable accounts',
          lang === 'bg' ? 'Споделяне на идентификационни данни' : 'Share credentials'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Намаляването на привилегиите ограничава обхвата на щетите при компрометиране.'
          : 'Reducing privileges limits blast radius during compromise.'
      },
      {
        question: lang === 'bg'
          ? 'Коя е най-добрата стратегия за резервно копиране?'
          : 'What is the best backup strategy?',
        options: [
          lang === 'bg' ? 'Едно резервно копие' : 'One backup copy',
          lang === 'bg' ? 'Резервни копия на същия сървър' : 'Backups on same server',
          lang === 'bg' ? 'Правило 3-2-1 с офлайн/неизменяемо съхранение' : '3-2-1 rule with offline/immutable storage',
          lang === 'bg' ? 'Не са нужни резервни копия' : 'No backups needed'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Рансъмуерът първо атакува резервните копия. Офлайн/неизменяемото съхранение е критично важно.'
          : 'Ransomware targets backups first. Offline/immutable is critical.'
      },
      {
        question: lang === 'bg'
          ? 'За какво се използва SIEM?'
          : 'What is a SIEM used for?',
        options: [
          lang === 'bg' ? 'Съхранение на пароли' : 'Password storage',
          lang === 'bg' ? 'Събиране на логове + откриване на заплахи' : 'Log collection + threat detection',
          lang === 'bg' ? 'Криптиране на файлове' : 'File encryption',
          lang === 'bg' ? 'Сигурност на браузъра' : 'Browser security'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'SIEM корелира логове, за да открива подозрително поведение.'
          : 'SIEM correlates logs to detect suspicious behavior.'
      },
      {
        question: lang === 'bg'
          ? 'Най-устойчивият на фишинг метод за удостоверяване?'
          : 'Most phishing-resistant authentication method?',
        options: [
          lang === 'bg' ? 'SMS кодове' : 'SMS codes',
          lang === 'bg' ? 'Сигурностни въпроси' : 'Security questions',
          lang === 'bg' ? 'FIDO2 хардуерни ключове' : 'FIDO2 hardware keys',
          lang === 'bg' ? 'Подсказки за пароли' : 'Password hints'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Хардуерните ключове предотвратяват повторно възпроизвеждане и фишинг.'
          : 'Hardware-backed keys prevent replay and phishing.'
      },
      {
        question: lang === 'bg'
          ? 'Защо управлението на пачове е критично?'
          : 'Why is patch management critical?',
        options: [
          lang === 'bg' ? 'Козметични актуализации' : 'Cosmetic updates',
          lang === 'bg' ? 'Поправя уязвимости, експлоатирани в реалния свят' : 'Fixes vulnerabilities exploited in the wild',
          lang === 'bg' ? 'Прави компютрите по-бързи' : 'Makes PCs faster',
          lang === 'bg' ? 'Избягва MFA' : 'Avoids MFA'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Непачнатите системи са основни вектори за компрометиране.'
          : 'Unpatched systems are primary compromise vectors.'
      },
      {
        question: lang === 'bg'
          ? 'Какво е странично движение (lateral movement)?'
          : 'What is lateral movement?',
        options: [
          lang === 'bg' ? 'VPN влизане' : 'VPN login',
          lang === 'bg' ? 'Атакуващ, движещ се между вътрешни системи' : 'Attacker moving between internal systems',
          lang === 'bg' ? 'Филтриране на имейли' : 'Email filtering',
          lang === 'bg' ? 'Конфигуриране на защитна стена' : 'Firewall configuration'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'След първоначалното проникване, атакуващите се придвижват до домейн контролери и данни.'
          : 'After initial breach, attackers pivot to domain controllers and data.'
      },
      {
        question: lang === 'bg'
          ? 'Най-добрият начин за откриване на компрометирани идентификационни данни?'
          : 'Best way to detect compromised credentials?',
        options: [
          lang === 'bg' ? 'Деактивиране на всички акаунти' : 'Disable all accounts',
          lang === 'bg' ? 'Мониторинг за невъзможни пътувания + аномални влизания' : 'Monitor impossible travel + anomalous logins',
          lang === 'bg' ? 'Използване само на по-дълги пароли' : 'Use longer passwords only',
          lang === 'bg' ? 'Игнориране на логове за влизане' : 'Ignore login logs'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Поведенческото откриване улавя откраднати идентификационни данни рано.'
          : 'Behavioral detection catches stolen credentials early.'
      },
      {
        question: lang === 'bg'
          ? 'Какъв е основният приоритет след като рансъмуер криптиране започне?'
          : 'What is the top priority after ransomware encryption starts?',
        options: [
          lang === 'bg' ? 'Плати незабавно' : 'Pay immediately',
          lang === 'bg' ? 'Изолирай заразените системи и спри разпространението' : 'Isolate infected systems and stop spread',
          lang === 'bg' ? 'Рестартирай сървърите' : 'Reboot servers',
          lang === 'bg' ? 'Изтрий логовете' : 'Delete logs'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Ограничаването е на първо място. Плащането не гарантира възстановяване.'
          : 'Containment comes first. Paying does not guarantee recovery.'
      }
    ]
  },
  'executives': {
    title: lang === 'bg' ? 'Ръководители' : 'Executives',
    subtitle: lang === 'bg' ? 'CEO, CFO, бизнес лидери' : 'CEO, CFO, Business Leaders',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    questions: [
      {
        question: lang === 'bg'
          ? 'Какъв е най-големият риск за киберсигурността на ръководители?'
          : 'Biggest cybersecurity risk for executives?',
        options: [
          lang === 'bg' ? 'Хакери, отгатващи пароли' : 'Hackers guessing passwords',
          lang === 'bg' ? 'Човешка грешка + фишинг' : 'Human error + phishing',
          lang === 'bg' ? 'Твърде много защитни стени' : 'Too many firewalls',
          lang === 'bg' ? 'Актуализации на антивирусната' : 'Antivirus updates'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Повечето пробиви започват със социално инженерство, а не с brute force.'
          : 'Most breaches begin with social engineering, not brute force.'
      },
      {
        question: lang === 'bg'
          ? 'Business Email Compromise (BEC) обикновено е насочен към:'
          : 'Business Email Compromise (BEC) usually targets:',
        options: [
          lang === 'bg' ? 'Геймъри' : 'Gamers',
          lang === 'bg' ? 'Финансови екипи и банкови преводи' : 'Finance teams and wire transfers',
          lang === 'bg' ? 'Студенти' : 'Students',
          lang === 'bg' ? 'Само софтуерни разработчици' : 'Software developers only'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'CFO и финансовите отдели са основни цели.'
          : 'CFOs and finance departments are prime targets.'
      },
      {
        question: lang === 'bg'
          ? 'Ако рансъмуер удари, какво е най-важно?'
          : 'If ransomware hits, what matters most?',
        options: [
          lang === 'bg' ? 'Бързо плащане' : 'Paying fast',
          lang === 'bg' ? 'Публично мълчание' : 'Public silence',
          lang === 'bg' ? 'План за непрекъснатост на бизнеса и възстановяване' : 'Business continuity and recovery plan',
          lang === 'bg' ? 'Игнориране' : 'Ignoring it'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Подготвеността определя оцеляването повече от преговорите.'
          : 'Preparedness determines survival more than negotiation.'
      },
      {
        question: lang === 'bg'
          ? 'Какво е най-скъпото въздействие на пробив?'
          : 'What is the costliest breach impact?',
        options: [
          lang === 'bg' ? 'Подмяна на лаптоп' : 'Laptop replacement',
          lang === 'bg' ? 'Загуба на доверие + престой + правна отговорност' : 'Loss of trust + downtime + legal exposure',
          lang === 'bg' ? 'Повреда на принтер' : 'Printer failure',
          lang === 'bg' ? 'Имейл спам' : 'Email spam'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Реалните щети са оперативни и репутационни.'
          : 'Real damage is operational and reputational.'
      },
      {
        question: lang === 'bg'
          ? 'Кой е отговорен за киберсигурността в компанията?'
          : 'Who is responsible for cybersecurity in a company?',
        options: [
          lang === 'bg' ? 'Само IT' : 'Only IT',
          lang === 'bg' ? 'Само служителите' : 'Only employees',
          lang === 'bg' ? 'Ръководство + управление + IT заедно' : 'Leadership + governance + IT together',
          lang === 'bg' ? 'Външни одитори' : 'External auditors'
        ],
        correct: 2,
        explanation: lang === 'bg'
          ? 'Киберсигурността е бизнес риск, а не само технически.'
          : 'Cybersecurity is a business risk, not just technical.'
      },
      {
        question: lang === 'bg'
          ? 'Най-добрата инвестиция за намаляване вероятността от пробив?'
          : 'Best investment for reducing breach likelihood?',
        options: [
          lang === 'bg' ? 'Повече постери' : 'More posters',
          lang === 'bg' ? 'Обучение на служители + MFA + реакция при инциденти' : 'Employee training + MFA + incident response',
          lang === 'bg' ? 'Ново лого' : 'New logo',
          lang === 'bg' ? 'Игнориране на съответствието' : 'Ignoring compliance'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Тези контроли спират повечето реални атаки.'
          : 'These controls stop most real attacks.'
      },
      {
        question: lang === 'bg'
          ? 'Каква е целта на плана за реакция при инциденти?'
          : 'What is the purpose of an Incident Response Plan?',
        options: [
          lang === 'bg' ? 'Маркетинг' : 'Marketing',
          lang === 'bg' ? 'Ясни стъпки по време на пробив' : 'Clear steps during a breach',
          lang === 'bg' ? 'Данъчна отчетност' : 'Tax reporting',
          lang === 'bg' ? 'HR въвеждане' : 'HR onboarding'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Без план, реакцията се превръща в хаос, а забавянията увеличават щетите.'
          : 'Without a plan, response becomes chaos and delays increase damage.'
      },
      {
        question: lang === 'bg'
          ? 'Защо ръководителите трябва да се интересуват от NIS2 / GDPR?'
          : 'Why should executives care about NIS2 / GDPR?',
        options: [
          lang === 'bg' ? 'Само за юристи' : 'Only for lawyers',
          lang === 'bg' ? 'Регулаторни глоби + отговорност' : 'Regulatory fines + accountability',
          lang === 'bg' ? 'Незадължителни насоки' : 'Optional guidelines',
          lang === 'bg' ? 'Само за банки' : 'Only for banks'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Неспазването на съответствието може да доведе до отговорност на ниво ръководство.'
          : 'Compliance failures can become leadership-level liability.'
      },
      {
        question: lang === 'bg'
          ? 'Най-добрата защита срещу CEO измама („Изпратете този превод сега")?'
          : 'What is the best defense against CEO fraud ("Send this transfer now")?',
        options: [
          lang === 'bg' ? 'Доверете се на спешните имейли' : 'Trust urgent emails',
          lang === 'bg' ? 'Процес за верификация на плащания' : 'Verification process for payments',
          lang === 'bg' ? 'По-бързо банкиране' : 'Faster banking',
          lang === 'bg' ? 'Без пароли' : 'No passwords'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Одобренията на плащания трябва да изискват независима верификация.'
          : 'Payment approvals must require independent verification.'
      },
      {
        question: lang === 'bg'
          ? 'Метриката #1 за киберсигурност, която ръководството трябва да изисква е:'
          : 'The #1 cybersecurity metric leadership should demand is:',
        options: [
          lang === 'bg' ? 'Брой изпратени имейли' : 'Number of emails sent',
          lang === 'bg' ? 'Време за откриване + реакция при инциденти' : 'Time to detect + respond to incidents',
          lang === 'bg' ? 'Брой IT служители' : 'Number of IT staff',
          lang === 'bg' ? 'Обновяване на лого' : 'Logo refresh'
        ],
        correct: 1,
        explanation: lang === 'bg'
          ? 'Скоростта на откриване и реакция определя въздействието на пробива.'
          : 'Speed of detection and response determines breach impact.'
      }
    ]
  }
});

const getRecommendations = (lang: Lang, category: QuizCategory, score: number): Recommendation => {
  if (category === 'individuals') {
    if (score <= 3) {
      return {
        tier: lang === 'bg' ? 'Висок риск' : 'High Risk',
        tierColor: 'text-red-400',
        tierBg: 'bg-red-950/40',
        tierBorder: 'border-red-600/50',
        message: lang === 'bg'
          ? 'В момента сте уязвими към най-честите измами.'
          : 'You are currently vulnerable to the most common scams.',
        actions: lang === 'bg' ? [
          'Активирайте многофакторно удостоверяване (MFA) за имейл, банкиране и социални акаунти.',
          'Започнете да използвате мениджър на пароли (Bitwarden, 1Password, NordPass, Password за iOS, или вградените от Google/Samsung).',
          'Никога не натискайте линкове за вход от имейли или SMS — винаги отваряйте приложенията ръчно.',
          'Научете се да разпознавате езика на измамите, базиран на спешност („акаунтът заключен", „последно предупреждение").',
          'Използвайте VPN за допълнителна сигурност (препоръка: NordVPN или WireGuard).',
          'Инсталирайте платена антивирусна програма (препоръка: Bitdefender, Kaspersky или Malwarebytes).'
        ] : [
          'Enable Multi-Factor Authentication (MFA) on email, banking, and social accounts.',
          'Start using a password manager (Bitwarden, 1Password, NordPass, Password for iOS, or built-in Google/Samsung managers).',
          'Never click login links in emails or SMS — always open apps manually.',
          'Learn to identify urgency-based scam language ("account locked", "final warning").',
          'Use a VPN for additional security (recommended: NordVPN or WireGuard).',
          'Install a paid antivirus program (recommended: Bitdefender, Kaspersky, or Malwarebytes).'
        ],
        priority: lang === 'bg' ? 'Предотвратяване на превземане на акаунт.' : 'Prevent account takeover.'
      };
    } else if (score <= 7) {
      return {
        tier: lang === 'bg' ? 'Умерен риск' : 'Moderate Risk',
        tierColor: 'text-yellow-400',
        tierBg: 'bg-yellow-950/40',
        tierBorder: 'border-yellow-600/50',
        message: lang === 'bg'
          ? 'Имате добра осведоменост, но остават пропуски.'
          : 'You have good awareness, but gaps remain.',
        actions: lang === 'bg' ? [
          'Заменете повтарящите се пароли с уникални.',
          'Прегледайте настройките за поверителност/сигурност в социалните платформи.',
          'Избягвайте обществен Wi-Fi за чувствителни влизания, освен ако не използвате VPN (препоръка: NordVPN или WireGuard).',
          'Практикувайте проверка на подозрителни съобщения, като се обадите директно на подателя.',
          'Обмислете платена антивирусна програма за по-добра защита (Bitdefender, Kaspersky или Malwarebytes).'
        ] : [
          'Replace reused passwords with unique ones.',
          'Review privacy/security settings on social platforms.',
          'Avoid public Wi-Fi for sensitive logins unless using a VPN (recommended: NordVPN or WireGuard).',
          'Practice verifying suspicious messages by calling the sender directly.',
          'Consider a paid antivirus for better protection (Bitdefender, Kaspersky, or Malwarebytes).'
        ],
        priority: lang === 'bg' ? 'Намаляване вероятността за успех на фишинг.' : 'Reduce phishing success probability.'
      };
    } else {
      return {
        tier: lang === 'bg' ? 'Силна осведоменост' : 'Strong Awareness',
        tierColor: 'text-emerald-400',
        tierBg: 'bg-emerald-950/40',
        tierBorder: 'border-emerald-600/50',
        message: lang === 'bg'
          ? 'Значително по-трудно е да бъдете измамени от средностатистическия потребител.'
          : 'You are significantly harder to scam than average.',
        actions: lang === 'bg' ? [
          'Използвайте хардуерни ключове за сигурност (FIDO2) за критични акаунти.',
          'Наблюдавайте за компрометирани идентификационни данни (HaveIBeenPwned).',
          'Обучете членовете на семейството — атакуващите се насочват към най-слабото звено.'
        ] : [
          'Use hardware security keys (FIDO2) for critical accounts.',
          'Monitor for breached credentials (HaveIBeenPwned).',
          'Educate family members — attackers target the weakest link.'
        ],
        priority: lang === 'bg' ? 'Поддържане на устойчивост и помощ на другите.' : 'Maintain resilience and help others.'
      };
    }
  } else if (category === 'it-admins') {
    if (score <= 3) {
      return {
        tier: lang === 'bg' ? 'Критично излагане' : 'Critical Exposure',
        tierColor: 'text-red-400',
        tierBg: 'bg-red-950/40',
        tierBorder: 'border-red-600/50',
        message: lang === 'bg'
          ? 'Вашата среда вероятно е готова за компрометиране.'
          : 'Your environment is likely compromise-ready.',
        actions: lang === 'bg' ? [
          'Наложете MFA за целия отдалечен достъп и администраторски акаунти.',
          'Премахнете директното излагане на RDP/VPN портали към интернет.',
          'Пачнете всички системи с известни експлоатирани уязвимости.',
          'Проверете дали резервните копия са офлайн/неизменяеми и тествани.'
        ] : [
          'Enforce MFA across all remote access and admin accounts.',
          'Remove direct exposure of RDP/VPN portals to the internet.',
          'Patch all systems with known exploited vulnerabilities.',
          'Verify backups are offline/immutable and tested.'
        ],
        priority: lang === 'bg' ? 'Спиране на входните пътища за рансъмуер.' : 'Stop ransomware entry paths.'
      };
    } else if (score <= 7) {
      return {
        tier: lang === 'bg' ? 'Нуждае се от укрепване' : 'Needs Hardening',
        tierColor: 'text-yellow-400',
        tierBg: 'bg-yellow-950/40',
        tierBorder: 'border-yellow-600/50',
        message: lang === 'bg'
          ? 'Разбирате основите, но може да ви липсва оперативна зрялост.'
          : 'You understand the basics but may lack operational maturity.',
        actions: lang === 'bg' ? [
          'Приложете минимални привилегии и премахнете ненужните администраторски права.',
          'Централизирайте логовете в SIEM/XDR за откриване.',
          'Внедрете устойчиво на фишинг удостоверяване (FIDO2).',
          'Проведете настолни упражнения за рансъмуер инциденти.'
        ] : [
          'Apply least privilege and remove unnecessary admin rights.',
          'Centralize logs into SIEM/XDR for detection.',
          'Deploy phishing-resistant authentication (FIDO2).',
          'Run tabletop ransomware incident exercises.'
        ],
        priority: lang === 'bg' ? 'Подобряване скоростта на откриване и ограничаване.' : 'Improve detection + containment speed.'
      };
    } else {
      return {
        tier: lang === 'bg' ? 'Зряла сигурностна позиция' : 'Mature Security Posture',
        tierColor: 'text-emerald-400',
        tierBg: 'bg-emerald-950/40',
        tierBorder: 'border-emerald-600/50',
        message: lang === 'bg'
          ? 'Работите над базовото ниво.'
          : 'You\'re operating above baseline.',
        actions: lang === 'bg' ? [
          'Имплементирайте Zero Trust сегментация.',
          'Добавете неизменяеми резервни копия + тримесечни учения за възстановяване.',
          'Наблюдавайте индикатори за странично движение (Kerberos аномалии, достъп до DC).',
          'Редовно тествайте защитите с red-team симулации.'
        ] : [
          'Implement Zero Trust segmentation.',
          'Add immutable backups + quarterly recovery drills.',
          'Monitor lateral movement indicators (Kerberos anomalies, DC access).',
          'Regularly test defenses with red-team simulations.'
        ],
        priority: lang === 'bg' ? 'Устойчивост срещу софистицирани актьори.' : 'Resilience against sophisticated actors.'
      };
    }
  } else {
    // executives
    if (score <= 3) {
      return {
        tier: lang === 'bg' ? 'Бизнес-ниво риск' : 'Business-Level Risk',
        tierColor: 'text-red-400',
        tierBg: 'bg-red-950/40',
        tierBorder: 'border-red-600/50',
        message: lang === 'bg'
          ? 'Киберсигурността е в момента основна слабост в управлението.'
          : 'Cybersecurity is currently a major governance weakness.',
        actions: lang === 'bg' ? [
          'Третирайте кибер като корпоративен риск, не като „IT проблем".',
          'Създайте контроли за верификация на плащания срещу CEO измама/BEC.',
          'Изискайте план за реакция при инциденти с определени отговорници за решения.',
          'Осигурете готовност за съответствие (GDPR, NIS2).'
        ] : [
          'Treat cyber as enterprise risk, not "an IT problem."',
          'Establish payment verification controls against CEO fraud/BEC.',
          'Require an incident response plan with assigned decision owners.',
          'Ensure compliance readiness (GDPR, NIS2).'
        ],
        priority: lang === 'bg' ? 'Предотвратяване на финансова и правна катастрофа.' : 'Prevent financial and legal catastrophe.'
      };
    } else if (score <= 7) {
      return {
        tier: lang === 'bg' ? 'Подобрява се, но с пропуски' : 'Improving, But Gaps Exist',
        tierColor: 'text-yellow-400',
        tierBg: 'bg-yellow-950/40',
        tierBorder: 'border-yellow-600/50',
        message: lang === 'bg'
          ? 'Разпознавате заплахите, но може да ви липсва структуриран надзор.'
          : 'You recognize threats but may lack structured oversight.',
        actions: lang === 'bg' ? [
          'Изисквайте измерими метрики: време за откриване, време за реакция, време за възстановяване от резервно копие.',
          'Одобрете задължително обучение по сигурност.',
          'Валидирайте покритието на кибер застраховката и изключенията.',
          'Провеждайте тримесечни упражнения за симулация на пробив.'
        ] : [
          'Demand measurable metrics: detection time, response time, backup recovery time.',
          'Approve mandatory security awareness training.',
          'Validate cyber insurance coverage and exclusions.',
          'Conduct quarterly breach simulation exercises.'
        ],
        priority: lang === 'bg' ? 'Управление и готовност.' : 'Governance and preparedness.'
      };
    } else {
      return {
        tier: lang === 'bg' ? 'Силна лидерска осведоменост' : 'Strong Leadership Awareness',
        tierColor: 'text-emerald-400',
        tierBg: 'bg-emerald-950/40',
        tierBorder: 'border-emerald-600/50',
        message: lang === 'bg'
          ? 'Вашето мислене е в съответствие с най-добрите практики.'
          : 'Your mindset aligns with best practice.',
        actions: lang === 'bg' ? [
          'Интегрирайте киберсигурността в отчетността на борда.',
          'Финансирайте проактивна устойчивост: SOC мониторинг, тестове за проникване.',
          'Изисквайте управление на риска от трети страни за доставчици.',
          'Изградете култура, в която верификацията е нормална, а не обидна.'
        ] : [
          'Integrate cybersecurity into board-level reporting.',
          'Fund proactive resilience: SOC monitoring, penetration testing.',
          'Require third-party risk management for suppliers.',
          'Build a culture where verification is normal, not rude.'
        ],
        priority: lang === 'bg' ? 'Дългосрочно оперативно доверие и непрекъснатост.' : 'Long-term operational trust and continuity.'
      };
    }
  }
};

// Topic-based bonus recommendations
const getTopicRecommendations = (lang: Lang, category: QuizCategory, wrongIndices: number[]): string[] => {
  const tips: string[] = [];

  if (category === 'individuals') {
    // Check phishing-related questions (Q1, Q4, Q7, Q9)
    if (wrongIndices.some(i => [0, 3, 6, 8].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Допълнете обучението си по фишинг симулации — попаднахте в капана на въпросите за фишинг.'
        : 'Complete phishing simulation training — you fell for phishing-related questions.');
    }
    // Password-related (Q2, Q8)
    if (wrongIndices.some(i => [1, 7].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Внедрете мениджър на пароли + MFA — паролите ви имат нужда от подобрение.'
        : 'Deploy a password manager + MFA — your password practices need improvement.');
    }
    // MFA/VPN (Q3, Q5, Q6)
    if (wrongIndices.some(i => [2, 4, 5].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Прегледайте защитата на мрежата и удостоверяването — помислете за VPN и MFA.'
        : 'Review your network protection and authentication — consider VPN and MFA.');
    }
  } else if (category === 'it-admins') {
    // Ransomware-related (Q2, Q4, Q10)
    if (wrongIndices.some(i => [1, 3, 9].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Тествайте възстановяването от резервни копия в рамките на 30 дни — пропуснахте въпросите за рансъмуер.'
        : 'Test backup recovery within 30 days — you missed ransomware-related questions.');
    }
    // Auth-related (Q1, Q6)
    if (wrongIndices.some(i => [0, 5].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Приоритизирайте внедряването на FIDO2/MFA — удостоверяването ви има слабости.'
        : 'Prioritize FIDO2/MFA deployment — your authentication has weaknesses.');
    }
    // Detection (Q5, Q8, Q9)
    if (wrongIndices.some(i => [4, 7, 8].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Подобрете възможностите за мониторинг и откриване — внедрете SIEM/XDR решение.'
        : 'Improve monitoring and detection capabilities — deploy a SIEM/XDR solution.');
    }
  } else {
    // BEC/Fraud (Q2, Q9)
    if (wrongIndices.some(i => [1, 8].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Въведете работни процеси за двойно одобрение на плащания — пропуснахте въпросите за CEO измама.'
        : 'Introduce dual approval workflows for payments — you missed CEO fraud questions.');
    }
    // Governance (Q5, Q8)
    if (wrongIndices.some(i => [4, 7].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Установете кибер управление на ниво борд — регулаторното съответствие е критично.'
        : 'Establish board-level cyber governance — regulatory compliance is critical.');
    }
    // Incident Response (Q3, Q7, Q10)
    if (wrongIndices.some(i => [2, 6, 9].includes(i))) {
      tips.push(lang === 'bg'
        ? 'Създайте и тествайте план за реакция при инциденти в рамките на 30 дни.'
        : 'Create and test an incident response plan within 30 days.');
    }
  }

  return tips;
};

interface QuizProps {
  lang: Lang;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ lang, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(10).fill(false));

  const quizData = getQuizData(lang);
  const categories: QuizCategory[] = ['individuals', 'it-admins', 'executives'];

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setWrongAnswers([]);
    setQuizComplete(false);
    setAnsweredQuestions(new Array(10).fill(false));
  };

  const handleCategorySelect = (cat: QuizCategory) => {
    setSelectedCategory(cat);
    resetQuiz();
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return; // Already answered
    setSelectedAnswer(index);
    setShowExplanation(true);

    const currentQuiz = quizData[selectedCategory!];
    const isCorrect = index === currentQuiz.questions[currentQuestion].correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion]);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    const currentQuiz = quizData[selectedCategory!];
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  // Category selection screen
  if (!selectedCategory) {
    return (
      <div className="min-h-screen pt-8 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">
              {lang === 'bg' ? 'Обратно към началото' : 'Back to Home'}
            </span>
          </button>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-0.5 bg-emerald-600/30 rounded-full hidden sm:block"></div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900/40 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {lang === 'bg' ? 'ТЕСТ ЗА КИБЕРСИГУРНОСТ' : 'CYBERSECURITY QUIZ'}
              </div>
              <div className="w-12 h-0.5 bg-emerald-600/30 rounded-full hidden sm:block"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6">
              {lang === 'bg' ? 'Тествайте знанията си' : 'Test Your Knowledge'}
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {lang === 'bg'
                ? 'Практически въпроси за вземане на решения, свързани с реални измами, фишинг, рансъмуер и бизнес рискове.'
                : 'Practical decision-making questions tied to real-world scams, phishing, ransomware, and business risk.'}
            </p>
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const data = quizData[cat];
              const catColors = cat === 'individuals'
                ? { border: 'border-blue-500/30', hover: 'hover:border-blue-400', bg: 'bg-blue-600', text: 'text-blue-400', glow: 'hover:shadow-blue-900/30' }
                : cat === 'it-admins'
                ? { border: 'border-cyan-500/30', hover: 'hover:border-cyan-400', bg: 'bg-cyan-600', text: 'text-cyan-400', glow: 'hover:shadow-cyan-900/30' }
                : { border: 'border-purple-500/30', hover: 'hover:border-purple-400', bg: 'bg-purple-600', text: 'text-purple-400', glow: 'hover:shadow-purple-900/30' };

              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`relative p-8 rounded-xl border ${catColors.border} ${catColors.hover} bg-white/5 hover:bg-white/10 transition-all group text-left hover:shadow-2xl ${catColors.glow} hover:-translate-y-1 duration-300`}
                >
                  <div className={`w-14 h-14 rounded-lg ${catColors.bg} text-white flex items-center justify-center mb-6 shadow-lg`}>
                    {data.icon}
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-2 group-hover:${catColors.text} transition-colors`}>
                    {data.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">{data.subtitle}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>10 {lang === 'bg' ? 'въпроса' : 'questions'}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentQuiz = quizData[selectedCategory];

  // Quiz complete screen
  if (quizComplete) {
    const recommendation = getRecommendations(lang, selectedCategory, score);
    const topicTips = getTopicRecommendations(lang, selectedCategory, wrongAnswers);
    const percentage = Math.round((score / 10) * 100);

    return (
      <div className="min-h-screen pt-8 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => { setSelectedCategory(null); resetQuiz(); }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">
              {lang === 'bg' ? 'Обратно към тестовете' : 'Back to Quizzes'}
            </span>
          </button>

          {/* Score Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 ${recommendation.tierBg} backdrop-blur-md border ${recommendation.tierBorder} rounded-full ${recommendation.tierColor} text-[11px] font-bold uppercase tracking-[0.2em] mb-8`}>
              {recommendation.tier}
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
              {score}<span className="text-slate-600">/10</span>
            </h2>
            <p className="text-xl text-slate-400">{percentage}% {lang === 'bg' ? 'правилни' : 'correct'}</p>

            {/* Score bar */}
            <div className="max-w-md mx-auto mt-8">
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    score <= 3 ? 'bg-red-500' : score <= 7 ? 'bg-yellow-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recommendation card */}
          <div className={`p-8 rounded-xl ${recommendation.tierBg} border ${recommendation.tierBorder} mb-8`}>
            <p className="text-lg text-white font-medium mb-6">{recommendation.message}</p>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
              {lang === 'bg' ? 'Препоръчани действия:' : 'Recommended Actions:'}
            </h4>
            <div className="space-y-3">
              {recommendation.actions.map((action, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-black ${
                    score <= 3 ? 'bg-red-600' : score <= 7 ? 'bg-yellow-600' : 'bg-emerald-600'
                  } text-white`}>
                    {i + 1}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                {lang === 'bg' ? 'Приоритет:' : 'Priority:'}
              </span>
              <p className={`${recommendation.tierColor} font-bold mt-1`}>{recommendation.priority}</p>
            </div>
          </div>

          {/* Topic-based bonus recommendations */}
          {topicTips.length > 0 && (
            <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                {lang === 'bg' ? 'Допълнителни препоръки по теми:' : 'Topic-Based Recommendations:'}
              </h4>
              <div className="space-y-3">
                {topicTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { resetQuiz(); }}
              className="flex-1 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {lang === 'bg' ? 'Опитай отново' : 'Try Again'}
            </button>
            <button
              onClick={() => { setSelectedCategory(null); resetQuiz(); }}
              className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all border border-white/10"
            >
              {lang === 'bg' ? 'Избери друг тест' : 'Choose Another Quiz'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz screen
  const question = currentQuiz.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="min-h-screen pt-8 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => { setSelectedCategory(null); resetQuiz(); }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">
              {lang === 'bg' ? 'Изход' : 'Exit'}
            </span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {currentQuiz.title}
            </span>
            <div className="px-3 py-1 bg-slate-800 rounded text-emerald-400 text-sm font-bold mono">
              {score}/{currentQuestion + (showExplanation ? 1 : 0)}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {lang === 'bg' ? 'Напредък' : 'Progress'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {currentQuestion + 1}/10
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / 10) * 100}%` }}
            />
          </div>
          {/* Question dots */}
          <div className="flex gap-1.5 mt-3 justify-center">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentQuestion
                    ? 'bg-emerald-400 scale-125'
                    : answeredQuestions[i]
                    ? 'bg-slate-600'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg">
              {currentQuestion + 1}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight pt-1">
              {question.question}
            </h3>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, i) => {
            let optionStyle = 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 cursor-pointer';

            if (showExplanation) {
              if (i === question.correct) {
                optionStyle = 'border-emerald-500 bg-emerald-950/40 cursor-default';
              } else if (i === selectedAnswer && !isCorrect) {
                optionStyle = 'border-red-500 bg-red-950/40 cursor-default';
              } else {
                optionStyle = 'border-white/5 bg-white/[0.02] opacity-50 cursor-default';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswerSelect(i)}
                disabled={showExplanation}
                className={`w-full p-5 rounded-lg border ${optionStyle} transition-all text-left flex items-center gap-4 group`}
              >
                <div className={`w-10 h-10 rounded flex items-center justify-center font-black text-sm flex-shrink-0 ${
                  showExplanation && i === question.correct
                    ? 'bg-emerald-600 text-white'
                    : showExplanation && i === selectedAnswer && !isCorrect
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-emerald-600/20 group-hover:text-emerald-400'
                } transition-all`}>
                  {showExplanation && i === question.correct ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : showExplanation && i === selectedAnswer && !isCorrect ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    optionLabels[i]
                  )}
                </div>
                <span className={`text-sm md:text-base font-medium ${
                  showExplanation && i === question.correct ? 'text-emerald-200' :
                  showExplanation && i === selectedAnswer && !isCorrect ? 'text-red-200' :
                  showExplanation ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback + Explanation */}
        {showExplanation && (
          <div className="space-y-4 mb-8">
            {/* Correct/Incorrect banner */}
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              isCorrect
                ? 'bg-emerald-950/40 border border-emerald-600/50'
                : 'bg-red-950/40 border border-red-600/50'
            }`}>
              <span className="text-2xl">{isCorrect ? '\u2705' : '\u274C'}</span>
              <span className={`font-bold text-lg ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                {isCorrect
                  ? (lang === 'bg' ? 'Правилно!' : 'Correct!')
                  : (lang === 'bg' ? 'Грешно!' : 'Incorrect!')}
              </span>
            </div>

            {/* Explanation */}
            <div className="p-6 rounded-lg bg-slate-900/60 border border-slate-800">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-3">
                {lang === 'bg' ? 'Обяснение' : 'Explanation'}
              </h4>
              <p className="text-slate-300 leading-relaxed">{question.explanation}</p>
            </div>

            {/* Next button */}
            <button
              onClick={handleNextQuestion}
              className="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {currentQuestion < 9
                ? (lang === 'bg' ? 'Следващ въпрос' : 'Next Question')
                : (lang === 'bg' ? 'Виж резултатите' : 'See Results')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
