import { PoolQuestion } from './individualsQuestions';

export const itAdminsPool: PoolQuestion[] = [
  {
    id: 'it-1',
    topic: 'MFA',
    topicBg: 'МФУ',
    en: {
      question: 'What is the most effective control against credential theft?',
      options: [
        'Password rotation',
        'MFA everywhere',
        'Longer usernames',
        'Disabling logging'
      ],
      explanation: 'MFA blocks most credential reuse and phishing attacks.'
    },
    bg: {
      question: 'Кой е най-ефективният контрол срещу кражба на идентификационни данни?',
      options: [
        'Ротация на пароли',
        'MFA навсякъде',
        'По-сложни потребителски имена',
        'Деактивиране на логирането'
      ],
      explanation: 'MFA спира повечето атаки за повторно използване на идентификационни данни и фишинг атаки.'
    },
    correct: 1
  },
  {
    id: 'it-2',
    topic: 'Ransomware',
    topicBg: 'Рансъмуер',
    en: {
      question: 'Why is exposing RDP directly to the internet dangerous?',
      options: [
        'It reduces bandwidth',
        'It enables brute force and ransomware entry',
        'It improves remote work',
        'It breaks DNS'
      ],
      explanation: 'Open RDP is one of the most exploited ransomware entry points.'
    },
    bg: {
      question: 'Какъв е най-grootkият риск от излагането на RDP директно в интернет?',
      options: [
        'Бавна производителност',
        'Brute force + влизане на рансъмуер',
        'По-добър отдалечен достъп',
        'DNS грешки'
      ],
      explanation: 'Излагането на RDP е една от основните входни точки за рансъмуер.'
    },
    correct: 1
  },
  {
    id: 'it-3',
    topic: 'Access Control',
    topicBg: 'Контрол на достъпа',
    en: {
      question: 'Least Privilege means:',
      options: [
        'Everyone is admin',
        'Users get only required access',
        'Disable all accounts',
        'Share credentials'
      ],
      explanation: 'Reducing privileges limits impact of compromise.'
    },
    bg: {
      question: 'Принципът на минималните привилегии означава:',
      options: [
        'Всеки е администратор',
        'Потребителите получават само достъпа, от който се нуждаят',
        'Деактивиране на акаунти',
        'Споделяне на идентификационни данни'
      ],
      explanation: 'Намаляването на привилегиите ограничава обхвата на щетите при компрометиране.'
    },
    correct: 1
  },
  {
    id: 'it-4',
    topic: 'Ransomware',
    topicBg: 'Рансъмуер',
    en: {
      question: 'Best backup strategy is:',
      options: [
        'Single backup copy',
        'Backups on same server',
        '3-2-1 with offline/immutable storage',
        'No backups needed'
      ],
      explanation: 'Ransomware targets backups; offline/immutable storage is critical.'
    },
    bg: {
      question: 'Коя е най-добрата стратегия за резервно копиране?',
      options: [
        'Едно резервно копие',
        'Резервни копия на същия сървър',
        'Правило 3-2-1 с офлайн/неизменяемо съхранение',
        'Не са нужни резервни копия'
      ],
      explanation: 'Рансъмуерът първо атакува резервните копия. Офлайн/неизменяемото съхранение е критично важно.'
    },
    correct: 2
  },
  {
    id: 'it-5',
    topic: 'Monitoring',
    topicBg: 'Мониторинг',
    en: {
      question: 'What is a SIEM used for?',
      options: [
        'Password storage',
        'Log collection and threat detection',
        'Disk encryption',
        'DNS hosting'
      ],
      explanation: 'SIEM correlates logs for security monitoring.'
    },
    bg: {
      question: 'За какво се използва SIEM?',
      options: [
        'Съхранение на пароли',
        'Събиране на логове + откриване на заплахи',
        'Криптиране на файлове',
        'Сигурност на браузъра'
      ],
      explanation: 'SIEM корелира логове, за да открива подозрително поведение.'
    },
    correct: 1
  },
  {
    id: 'it-6',
    topic: 'MFA',
    topicBg: 'МФУ',
    en: {
      question: 'Most phishing-resistant authentication method?',
      options: [
        'SMS codes',
        'Security questions',
        'FIDO2 hardware keys',
        'Password hints'
      ],
      explanation: 'Hardware-backed keys prevent phishing replay attacks.'
    },
    bg: {
      question: 'Най-устойчивият на фишинг метод за удостоверяване?',
      options: [
        'SMS кодове',
        'Сигурностни въпроси',
        'FIDO2 хардуерни ключове',
        'Подсказки за пароли'
      ],
      explanation: 'Хардуерните ключове предотвратяват повторно възпроизвеждане и фишинг.'
    },
    correct: 2
  },
  {
    id: 'it-7',
    topic: 'Patch Management',
    topicBg: 'Управление на пачове',
    en: {
      question: 'Why is patch management critical?',
      options: [
        'Cosmetic updates',
        'Fixes exploited vulnerabilities',
        'Improves monitor resolution',
        'Avoids MFA'
      ],
      explanation: 'Unpatched systems are a primary compromise vector.'
    },
    bg: {
      question: 'Защо управлението на пачове е критично?',
      options: [
        'Козметични актуализации',
        'Поправя уязвимости, експлоатирани в реалния свят',
        'Прави компютрите по-бързи',
        'Избягва MFA'
      ],
      explanation: 'Непачнатите системи са основни вектори за компрометиране.'
    },
    correct: 1
  },
  {
    id: 'it-8',
    topic: 'Lateral Movement',
    topicBg: 'Странично движение',
    en: {
      question: 'What is lateral movement?',
      options: [
        'VPN login',
        'Attacker moving between internal systems',
        'Firewall update',
        'Disk cleanup'
      ],
      explanation: 'Attackers pivot after initial access to reach critical assets.'
    },
    bg: {
      question: 'Какво е странично движение (lateral movement)?',
      options: [
        'VPN влизане',
        'Атакуващ, движещ се между вътрешни системи',
        'Филтриране на имейли',
        'Конфигуриране на защитна стена'
      ],
      explanation: 'След първоначалното проникване, атакуващите се придвижват до домейн контролери и данни.'
    },
    correct: 1
  },
  {
    id: 'it-9',
    topic: 'Monitoring',
    topicBg: 'Мониторинг',
    en: {
      question: 'Best way to detect compromised credentials?',
      options: [
        'Disable all accounts',
        'Monitor anomalous logins and impossible travel',
        'Use shorter passwords',
        'Ignore login logs'
      ],
      explanation: 'Behavior-based detection catches credential theft early.'
    },
    bg: {
      question: 'Най-добрият начин за откриване на компрометирани идентификационни данни?',
      options: [
        'Деактивиране на всички акаунти',
        'Мониторинг за невъзможни пътувания + аномални влизания',
        'Използване само на по-дълги пароли',
        'Игнориране на логове за влизане'
      ],
      explanation: 'Поведенческото откриване улавя откраднати идентификационни данни рано.'
    },
    correct: 1
  },
  {
    id: 'it-10',
    topic: 'Ransomware',
    topicBg: 'Рансъмуер',
    en: {
      question: 'Top priority after ransomware encryption starts?',
      options: [
        'Pay immediately',
        'Isolate infected systems to stop spread',
        'Delete logs',
        'Reboot servers'
      ],
      explanation: 'Containment comes first; paying does not guarantee recovery.'
    },
    bg: {
      question: 'Какъв е основният приоритет след като рансъмуер криптиране започне?',
      options: [
        'Плати незабавно',
        'Изолирай заразените системи и спри разпространението',
        'Изтрий логовете',
        'Рестартирай сървърите'
      ],
      explanation: 'Ограничаването е на първо място. Плащането не гарантира възстановяване.'
    },
    correct: 1
  },
  {
    id: 'it-11',
    topic: 'Network Security',
    topicBg: 'Мрежова сигурност',
    en: {
      question: 'What is the primary goal of network segmentation?',
      options: [
        'Improve Wi-Fi speed',
        'Prevent attackers from moving freely inside the network',
        'Make DNS resolution faster',
        'Replace endpoint protection'
      ],
      explanation: 'Segmentation limits lateral movement and reduces the blast radius of a compromise.'
    },
    bg: {
      question: 'Каква е основната цел на мрежовата сегментация?',
      options: [
        'Подобряване на Wi-Fi скоростта',
        'Предотвратяване атакуващите да се движат свободно вътре в мрежата',
        'По-бързо разрешаване на DNS',
        'Замяна на защитата на крайни точки'
      ],
      explanation: 'Сегментацията ограничава странично движение и намалява обхвата на щетите при компрометиране.'
    },
    correct: 1
  },
  {
    id: 'it-12',
    topic: 'Access Control',
    topicBg: 'Контрол на достъпа',
    en: {
      question: 'Which practice best reduces the risk of Active Directory compromise?',
      options: [
        'Using shared admin accounts',
        'Tiered admin model and separate privileged accounts',
        'Disabling all logs',
        'Allowing admin login from any device'
      ],
      explanation: 'Separating privileged accounts and restricting where they can log in protects domain control.'
    },
    bg: {
      question: 'Коя практика най-добре намалява риска от компрометиране на Active Directory?',
      options: [
        'Използване на споделени администраторски акаунти',
        'Модел на нива администратори и отделни привилегирани акаунти',
        'Деактивиране на всички логове',
        'Разрешаване администраторско влизане от всяко устройство'
      ],
      explanation: 'Разделянето на привилегирани акаунти и ограничаване където могат да се влизат защитава домейн контролера.'
    },
    correct: 1
  },
  {
    id: 'it-13',
    topic: 'Incident Response',
    topicBg: 'Реакция при инциденти',
    en: {
      question: 'What is the most important first step in incident response?',
      options: [
        'Post publicly about the breach',
        'Containment and evidence preservation',
        'Immediately wipe affected systems',
        'Ignore until business hours'
      ],
      explanation: 'Containment stops spread and evidence preservation enables investigation and recovery.'
    },
    bg: {
      question: 'Какво е най-важното първо действие при реакция на инцидент?',
      options: [
        'Публично публикуване на информацията за пробива',
        'Ограничаване и запазване на доказателства',
        'Веднага изтриване на засегнатите системи',
        'Игнориране до работното време'
      ],
      explanation: 'Ограничаването спира разпространението и запазването на доказателствата дава възможност за разследване и възстановяване.'
    },
    correct: 1
  },
  {
    id: 'it-14',
    topic: 'Endpoint Security',
    topicBg: 'Защита на крайни точки',
    en: {
      question: 'What is EDR primarily designed for?',
      options: [
        'Replacing firewalls',
        'Detecting and responding to endpoint threats',
        'Storing backups',
        'Encrypting emails'
      ],
      explanation: 'EDR provides endpoint visibility, detection, and response capabilities against malware and attacker activity.'
    },
    bg: {
      question: 'За какво е главно предназначена EDR?',
      options: [
        'Замяна на защитни стени',
        'Descoberta и реагиране на заплахи в крайни точки',
        'Съхранение на резервни копия',
        'Криптиране на имейли'
      ],
      explanation: 'EDR осигурява видимост на крайни точки, както и възможности за открит и отговор на малуер и активност на атакуващите.'
    },
    correct: 1
  },
  {
    id: 'it-15',
    topic: 'Monitoring',
    topicBg: 'Мониторинг',
    en: {
      question: 'Why is disabling PowerShell logging a bad idea?',
      options: [
        'It slows down systems',
        'Attackers frequently abuse PowerShell, and logs are critical for detection',
        'It increases patch frequency',
        'It breaks MFA'
      ],
      explanation: 'PowerShell is a common attack tool; logging is essential for visibility.'
    },
    bg: {
      question: 'Защо деактивирането на PowerShell логирането е лоша идея?',
      options: [
        'Забавя системите',
        'Атакуващите често се злоупотребляват PowerShell, и логовете са критични за открит',
        'Увеличава честотата на пачовете',
        'Разрушава MFA'
      ],
      explanation: 'PowerShell е често използван инструмент за атака; логирането е от съществено значение за видимост.'
    },
    correct: 1
  },
  {
    id: 'it-16',
    topic: 'Endpoint Security',
    topicBg: 'Защита на крайни точки',
    en: {
      question: 'What is the purpose of an allow-list (application whitelisting)?',
      options: [
        'Block all network traffic',
        'Allow only approved applications to execute',
        'Encrypt backups',
        'Replace password managers'
      ],
      explanation: 'Allow-listing reduces malware execution by limiting what can run.'
    },
    bg: {
      question: 'Каква е целта на списъка на позволени приложения (application whitelisting)?',
      options: [
        'Блокиране на целия мрежов трафик',
        'Разрешаване на само одобрени приложения да работят',
        'Криптиране на резервни копия',
        'Замяна на мениджърите на пароли'
      ],
      explanation: 'Списъкът на позволените приложения намалява изпълнението на малуер чрез ограничаване на това какво може да работи.'
    },
    correct: 1
  },
  {
    id: 'it-17',
    topic: 'Network Security',
    topicBg: 'Мрежова сигурност',
    en: {
      question: 'Which is the best approach for securing remote access?',
      options: [
        'Expose RDP with strong passwords',
        'Use VPN with MFA and conditional access policies',
        'Allow admin access from personal devices',
        'Disable encryption'
      ],
      explanation: 'Secure remote access requires MFA, controlled entry points, and policy enforcement.'
    },
    bg: {
      question: 'Кой е най-добрият подход за сигурност на отдалечен достъп?',
      options: [
        'Излагане на RDP със силни пароли',
        'Използване на VPN с MFA и политики за условен достъп',
        'Разрешаване администраторски достъп от лични устройства',
        'Деактивиране на криптирането'
      ],
      explanation: 'Безопасният отдалечен достъп изисква MFA, контролирани входни точки и прилагане на политики.'
    },
    correct: 1
  },
  {
    id: 'it-18',
    topic: 'Ransomware',
    topicBg: 'Рансъмуер',
    en: {
      question: 'What is the key benefit of immutable backups?',
      options: [
        'They run faster',
        'They cannot be modified or deleted by ransomware',
        'They remove the need for patching',
        'They prevent phishing'
      ],
      explanation: 'Immutable backups protect recovery data from attacker tampering.'
    },
    bg: {
      question: 'Каква е ключовата полза на неизменяемите резервни копия?',
      options: [
        'Работят по-бързо',
        'Не могат да бъдат модифицирани или изтрити от рансъмуер',
        'Премахват нуждата от пачане',
        'Предотвратяват фишинг'
      ],
      explanation: 'Неизменяемите резервни копия защитават данните за възстановяване от манипулация от страна на атакуващите.'
    },
    correct: 1
  },
  {
    id: 'it-19',
    topic: 'Password Security',
    topicBg: 'Сигурност на пароли',
    en: {
      question: 'What is credential stuffing?',
      options: [
        'Encrypting passwords',
        'Using leaked credentials to access multiple services',
        'Blocking DNS queries',
        'Installing certificates'
      ],
      explanation: 'Attackers reuse breached username/password pairs across systems.'
    },
    bg: {
      question: 'Какво е credential stuffing?',
      options: [
        'Криптиране на пароли',
        'Използване на изтекли идентификационни данни за достъп до множество услуги',
        'Блокиране на DNS заявки',
        'Инсталиране на сертификати'
      ],
      explanation: 'Атакуващите преизползват нарушени двойки потребител/парола в различни системи.'
    },
    correct: 1
  },
  {
    id: 'it-20',
    topic: 'Monitoring',
    topicBg: 'Мониторинг',
    en: {
      question: 'Which log source is most critical for detecting AD attacks?',
      options: [
        'Printer logs',
        'Domain Controller security event logs',
        'Browser history',
        'Monitor brightness settings'
      ],
      explanation: 'DC logs provide the strongest visibility into authentication and privilege abuse.'
    },
    bg: {
      question: 'Кой е най-критичния източник на логове за открит на AD атаки?',
      options: [
        'Логове на принтер',
        'Логове на събитие сигурност на домейн контролер',
        'История на браузър',
        'Настройки на яркост на монитор'
      ],
      explanation: 'DC логовете дават най-силната видимост в удостоверяване и злоупотреба на привилегии.'
    },
    correct: 1
  },
  {
    id: 'it-21',
    topic: 'Vulnerability Management',
    topicBg: 'Управление на уязвимости',
    en: {
      question: 'What is the purpose of vulnerability management?',
      options: [
        'Only running antivirus scans',
        'Identifying, prioritizing, and remediating security weaknesses',
        'Disabling updates',
        'Replacing SIEM'
      ],
      explanation: 'Vulnerability management reduces exploitable attack surface systematically.'
    },
    bg: {
      question: 'Каква е целта на управлението на уязвимостите?',
      options: [
        'Само пускане на антивирусни сканирания',
        'Идентифициране, приоритизиране и отстраняване на слабости в сигурността',
        'Деактивиране на актуализации',
        'Замяна на SIEM'
      ],
      explanation: 'Управлението на уязвимостите систематично намалява експлоатируемата повърхност на атака.'
    },
    correct: 1
  },
  {
    id: 'it-22',
    topic: 'Access Control',
    topicBg: 'Контрол на достъпа',
    en: {
      question: 'What does Zero Trust mean in practice?',
      options: [
        'Trust all internal traffic',
        'Never trust, always verify access requests',
        'Disable MFA',
        'Only use antivirus'
      ],
      explanation: 'Zero Trust assumes breach and requires continuous verification.'
    },
    bg: {
      question: 'Какво означава Zero Trust на практика?',
      options: [
        'Доверие на целия вътрешен трафик',
        'Никога не доверяй, винаги проверяй заявки за достъп',
        'Деактивиране на MFA',
        'Използване на само антивирус'
      ],
      explanation: 'Zero Trust предполага нарушение и изисква непрекъсната верификация.'
    },
    correct: 1
  },
  {
    id: 'it-23',
    topic: 'Access Control',
    topicBg: 'Контрол на достъпа',
    en: {
      question: 'Why are service accounts high risk?',
      options: [
        'They have no passwords',
        'They often have excessive privileges and long-lived credentials',
        'They cannot access systems',
        'They replace firewalls'
      ],
      explanation: 'Service accounts are frequently abused due to weak governance and high privilege.'
    },
    bg: {
      question: 'Защо сервизните акаунти са висок риск?',
      options: [
        'Те нямат пароли',
        'Те често имат прекомерни привилегии и дълго живущи идентификационни данни',
        'Не могат да достъпят системи',
        'Заменят защитни стени'
      ],
      explanation: 'Сервизните акаунти често се злоупотребяват поради слабо управление и високи привилегии.'
    },
    correct: 1
  },
  {
    id: 'it-24',
    topic: 'Phishing',
    topicBg: 'Фишинг',
    en: {
      question: 'What is the best defense against phishing emails reaching users?',
      options: [
        'No email filtering',
        'Layered controls: secure email gateway + DMARC + training',
        'Only strong passwords',
        'Disabling HTTPS'
      ],
      explanation: 'Phishing defense requires multiple layers, not a single control.'
    },
    bg: {
      question: 'Каква е най-добрата защита срещу фишингови имейли до потребители?',
      options: [
        'Без филтриране на имейли',
        'Слойни контроли: сигурен имейл шлюз + DMARC + обучение',
        'Само силни пароли',
        'Деактивиране на HTTPS'
      ],
      explanation: 'Защитата от фишинг изисква множество слои, не един контрол.'
    },
    correct: 1
  },
  {
    id: 'it-25',
    topic: 'Access Control',
    topicBg: 'Контрол на достъпа',
    en: {
      question: 'What is the main reason to implement PAM (Privileged Access Management)?',
      options: [
        'Speed up logins',
        'Control, monitor, and secure privileged accounts',
        'Replace backups',
        'Disable auditing'
      ],
      explanation: 'PAM reduces the likelihood of admin credential abuse.'
    },
    bg: {
      question: 'Каква е основната причина за внедряването на PAM (управление на привилегиран достъп)?',
      options: [
        'Ускоряване на влизанията',
        'Контрол, мониторинг и защита на привилегирани акаунти',
        'Замяна на резервни копия',
        'Деактивиране на одита'
      ],
      explanation: 'PAM намалява вероятността за злоупотреба на администраторски идентификационни данни.'
    },
    correct: 1
  },
  {
    id: 'it-26',
    topic: 'Incident Response',
    topicBg: 'Реакция при инциденти',
    en: {
      question: 'What should be done immediately after detecting data exfiltration?',
      options: [
        'Ignore it',
        'Contain, investigate scope, and notify according to policy/law',
        'Delete all logs',
        'Shut down permanently'
      ],
      explanation: 'Data exfiltration requires containment and regulatory-aware response.'
    },
    bg: {
      question: 'Какво трябва да се направи веднага след открит на изтичане на данни?',
      options: [
        'Игнориране',
        'Ограничаване, разследване обхвата и уведомление според политиката/закона',
        'Изтриване на всички логове',
        'Постоянно изключване'
      ],
      explanation: 'Изтичането на данни изисква ограничаване и отговор, с известност към регулаторните изисквания.'
    },
    correct: 1
  },
  {
    id: 'it-27',
    topic: 'Monitoring',
    topicBg: 'Мониторинг',
    en: {
      question: 'Why is DNS monitoring valuable?',
      options: [
        'It replaces patching',
        'Attackers often use DNS for C2 and exfiltration',
        'It improves keyboard speed',
        'It blocks all malware automatically'
      ],
      explanation: 'Suspicious DNS traffic is a common indicator of compromise.'
    },
    bg: {
      question: 'Защо е ценен мониторингът на DNS?',
      options: [
        'Замяна на пачане',
        'Атакуващите често използват DNS за C2 и изтичане на данни',
        'Подобрява скоростта на клавиатура',
        'Автоматично блокира целия малуер'
      ],
      explanation: 'Подозрителния DNS трафик е често срещан показател на компрометиране.'
    },
    correct: 1
  },
  {
    id: 'it-28',
    topic: 'Access Control',
    topicBg: 'Контрол на достъпа',
    en: {
      question: 'Which is the best practice for admin workstation security?',
      options: [
        'Use admin accounts everywhere',
        'Dedicated privileged access workstations (PAWs)',
        'Disable endpoint controls',
        'Share admin passwords'
      ],
      explanation: 'PAWs reduce exposure of privileged credentials to malware.'
    },
    bg: {
      question: 'Коя е най-добрата практика за сигурност на администраторската работна станция?',
      options: [
        'Използване на администраторски акаунти навсякъде',
        'Посветени работни станции за привилегиран достъп (PAWs)',
        'Деактивиране на контроли за крайни точки',
        'Споделяне на администраторски пароли'
      ],
      explanation: 'PAWs намаляват експозицията на привилегирани идентификационни данни на малуер.'
    },
    correct: 1
  },
  {
    id: 'it-29',
    topic: 'Incident Response',
    topicBg: 'Реакция при инциденти',
    en: {
      question: 'What is the primary goal of tabletop exercises?',
      options: [
        'Replace penetration testing',
        'Test incident response readiness and decision-making',
        'Increase phishing volume',
        'Remove backups'
      ],
      explanation: 'Exercises validate response capability before real incidents occur.'
    },
    bg: {
      question: 'Каква е основната цел на настолните упражнения?',
      options: [
        'Замяна на тестване за проникване',
        'Тестване на готовност при реакция на инциденти и вземане на решения',
        'Увеличаване на обема на фишинг',
        'Премахване на резервни копия'
      ],
      explanation: 'Упражненията валидират способност за отговор преди реални инциденти да възникнат.'
    },
    correct: 1
  },
  {
    id: 'it-30',
    topic: 'Monitoring',
    topicBg: 'Мониторинг',
    en: {
      question: 'What is the best measure of SOC effectiveness?',
      options: [
        'Number of emails sent',
        'Mean Time To Detect (MTTD) and Mean Time To Respond (MTTR)',
        'Number of printers installed',
        'Password length only'
      ],
      explanation: 'Detection and response speed determines breach impact.'
    },
    bg: {
      question: 'Каква е най-добрата мярка за ефективност на SOC?',
      options: [
        'Брой изпратени имейли',
        'Средно време за открит (MTTD) и средно време за отговор (MTTR)',
        'Брой инсталирани принтери',
        'Само дължина на парола'
      ],
      explanation: 'Скоростта на открит и отговор определя въздействието на пробива.'
    },
    correct: 1
  }
];
