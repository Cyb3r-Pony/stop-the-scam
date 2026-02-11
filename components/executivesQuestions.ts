import { PoolQuestion } from './individualsQuestions';

export const executivesPool: PoolQuestion[] = [
  {
    id: "exec-1",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "Biggest cybersecurity risk for executives?",
      options: ["Hackers guessing passwords", "Human error and phishing", "Too many firewalls", "Antivirus updates"],
      explanation: "Most breaches begin with social engineering, not brute force."
    },
    bg: {
      question: "Какъв е най-големият риск за киберсигурността на ръководители?",
      options: ["Хакери, отгатващи пароли", "Човешка грешка + фишинг", "Твърде много защитни стени", "Актуализации на антивирусната"],
      explanation: "Повечето пробиви започват със социално инженерство, а не с brute force."
    },
    correct: 1
  },
  {
    id: "exec-2",
    topic: "BEC",
    topicBg: "Имейл измама (BEC)",
    en: {
      question: "Business Email Compromise (BEC) usually targets:",
      options: ["Gamers", "Finance teams and wire transfers", "Students", "Developers only"],
      explanation: "BEC attacks focus on payment redirection and invoice fraud."
    },
    bg: {
      question: "Business Email Compromise (BEC) обикновено е насочен към:",
      options: ["Геймъри", "Финансови екипи и банкови преводи", "Студенти", "Само софтуерни разработчици"],
      explanation: "CFO и финансовите отдели са основни цели."
    },
    correct: 1
  },
  {
    id: "exec-3",
    topic: "Ransomware",
    topicBg: "Рансъмуер",
    en: {
      question: "If ransomware hits, what matters most?",
      options: ["Paying fast", "Staying silent", "Business continuity and recovery plan", "Ignoring it"],
      explanation: "Preparedness determines survival more than negotiation."
    },
    bg: {
      question: "Ако рансъмуер удари, какво е най-важно?",
      options: ["Бързо плащане", "Публично мълчание", "План за непрекъснатост на бизнеса и възстановяване", "Игнориране"],
      explanation: "Подготвеността определя оцеляването повече от преговорите."
    },
    correct: 2
  },
  {
    id: "exec-4",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    en: {
      question: "What is the costliest impact of a breach?",
      options: ["Replacing laptops", "Downtime, reputational loss, and legal exposure", "More spam emails", "Slower Wi-Fi"],
      explanation: "The true cost is operational disruption, trust damage, and regulatory penalties."
    },
    bg: {
      question: "Какво е най-скъпото въздействие на пробив?",
      options: ["Подмяна на лаптоп", "Загуба на доверие + престой + правна отговорност", "Повреда на принтер", "Имейл спам"],
      explanation: "Реалните щети са оперативни и репутационни."
    },
    correct: 1
  },
  {
    id: "exec-5",
    topic: "Governance",
    topicBg: "Управление",
    en: {
      question: "Who is responsible for cybersecurity in a company?",
      options: ["Only IT", "Only the CEO", "Leadership, governance, and IT together", "External auditors only"],
      explanation: "Cybersecurity is a business risk requiring leadership ownership."
    },
    bg: {
      question: "Кой е отговорен за киберсигурността в компанията?",
      options: ["Само IT", "Само служителите", "Ръководство + управление + IT заедно", "Външни одитори"],
      explanation: "Киберсигурността е бизнес риск, а не само технически."
    },
    correct: 2
  },
  {
    id: "exec-6",
    topic: "BEC",
    topicBg: "Имейл измама (BEC)",
    en: {
      question: "Best defense against CEO fraud is:",
      options: ["Trust urgent emails", "Independent payment verification workflows", "Removing MFA", "Allowing single-person approvals"],
      explanation: "Wire transfers must require independent confirmation and dual control."
    },
    bg: {
      question: "Най-добрата защита срещу CEO измама?",
      options: ["Доверете се на спешните имейли", "Процес за верификация на плащания", "По-бързо банкиране", "Без пароли"],
      explanation: "Одобренията на плащания трябва да изискват независима верификация."
    },
    correct: 1
  },
  {
    id: "exec-7",
    topic: "Compliance",
    topicBg: "Съответствие",
    en: {
      question: "Why should executives care about GDPR/NIS2?",
      options: ["They are optional", "Fines and accountability apply at leadership level", "Only IT needs them", "They stop phishing automatically"],
      explanation: "Regulations create legal and financial consequences for poor governance."
    },
    bg: {
      question: "Защо ръководителите трябва да се интересуват от NIS2 / GDPR?",
      options: ["Само за юристи", "Регулаторни глоби + отговорност", "Незадължителни насоки", "Само за банки"],
      explanation: "Неспазването на съответствието може да доведе до отговорност на ниво ръководство."
    },
    correct: 1
  },
  {
    id: "exec-8",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    en: {
      question: "What is the main purpose of an Incident Response Plan?",
      options: ["Marketing", "Clear roles and actions during a breach", "Reducing taxes", "Hiring more staff"],
      explanation: "Without a plan, response becomes chaos and delays increase damage."
    },
    bg: {
      question: "Каква е целта на плана за реакция при инциденти?",
      options: ["Маркетинг", "Ясни стъпки по време на пробив", "Данъчна отчетност", "HR въвеждане"],
      explanation: "Без план, реакцията се превръща в хаос, а забавянията увеличават щетите."
    },
    correct: 1
  },
  {
    id: "exec-9",
    topic: "Ransomware",
    topicBg: "Рансъмуер",
    en: {
      question: "What is the biggest mistake during ransomware incidents?",
      options: ["Containing systems", "Assuming paying guarantees recovery", "Activating IR team", "Restoring backups"],
      explanation: "Paying does not guarantee decryption or prevent future targeting."
    },
    bg: {
      question: "Каква е най-голямата грешка по време на рансъмуер инциденти?",
      options: ["Ограничаване на системи", "Предположение, че плащането гарантира възстановяване", "Активиране на IR екип", "Възстановяване на резервни копия"],
      explanation: "Плащането не гарантира дешифриране или предотвратява бъдещо насочване."
    },
    correct: 1
  },
  {
    id: "exec-10",
    topic: "Third-Party Risk",
    topicBg: "Риск от трети страни",
    en: {
      question: "What is third-party risk?",
      options: ["Risk from your own employees", "Risk introduced by suppliers and service providers", "Risk from printers only", "Risk from office furniture"],
      explanation: "Vendors can become attack paths into your organization."
    },
    bg: {
      question: "Какво е риск от трети страни?",
      options: ["Риск от вашите служители", "Риск, въведен от доставчици и доставчици на услуги", "Риск само от принтери", "Риск от офис мебели"],
      explanation: "Доставчиците могат да станат пътища за атака във вашата организация."
    },
    correct: 1
  },
  {
    id: "exec-11",
    topic: "Monitoring",
    topicBg: "Мониторинг",
    en: {
      question: "Which is the best executive-level cyber metric?",
      options: ["Number of IT tickets", "Time to detect and respond (MTTD/MTTR)", "Number of passwords reset", "Logo redesign frequency"],
      explanation: "Speed of detection and response determines incident impact."
    },
    bg: {
      question: "Коя е най-добрата метрика за киберсигурност на ниво ръководство?",
      options: ["Брой IT билети", "Време за откриване и отговор (MTTD/MTTR)", "Брой нулирани пароли", "Честота на редизайн на лого"],
      explanation: "Скоростта на откритие и отговор определя въздействието на инцидента."
    },
    correct: 1
  },
  {
    id: "exec-12",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "Why is security awareness training necessary?",
      options: ["It is just compliance paperwork", "Humans are the most exploited attack surface", "Firewalls make it irrelevant", "It reduces internet costs"],
      explanation: "Most attacks succeed through phishing and manipulation, not technical brute force."
    },
    bg: {
      question: "Защо обучението по киберсигурност е необходимо?",
      options: ["Това е само документация за съответствие", "Хората са най-експлоатираната повърхност за атака", "Защитните стени го правят неуместно", "Намалява интернет разходите"],
      explanation: "Повечето атаки успяват чрез фишинг и манипулация, не чрез технически brute force."
    },
    correct: 1
  },
  {
    id: "exec-13",
    topic: "BEC",
    topicBg: "Имейл измама (BEC)",
    en: {
      question: "What is Business Email Compromise primarily about?",
      options: ["Website defacement", "Manipulating payments and invoices", "Gaming fraud", "Software bugs"],
      explanation: "BEC targets financial processes, not infrastructure."
    },
    bg: {
      question: "Какво е Business Email Compromise главно?",
      options: ["Дефигуриране на уебсайтове", "Манипулиране на плащания и фактури", "Мошенничество при игри", "Софтуерни грешки"],
      explanation: "BEC се насочва към финансови процеси, не към инфраструктура."
    },
    correct: 1
  },
  {
    id: "exec-14",
    topic: "Ransomware",
    topicBg: "Рансъмуер",
    en: {
      question: "What should executives demand from backups?",
      options: ["That they exist somewhere", "That they are tested and recoverable quickly", "That they are stored on the same server", "That they are never used"],
      explanation: "Untested backups often fail during real recovery."
    },
    bg: {
      question: "Какво трябва ръководителите да изискват от резервните копия?",
      options: ["Да съществуват някъде", "Да бъдат тествани и възстановяеми бързо", "Да бъдат съхранени на един и същи сървър", "Никога да не се използват"],
      explanation: "Нетествани резервни копия често не успяват при реално възстановяване."
    },
    correct: 1
  },
  {
    id: "exec-15",
    topic: "Governance",
    topicBg: "Управление",
    en: {
      question: "Cybersecurity budget should be viewed as:",
      options: ["Pure cost with no return", "Business resilience investment", "Optional spending", "Only an IT luxury"],
      explanation: "Security reduces downtime, fraud, and catastrophic losses."
    },
    bg: {
      question: "Киберсигурният бюджет трябва да се разглежда като:",
      options: ["Чист разход без възвращаемост", "Инвестиция в устойчивост на бизнеса", "Факултативни разходи", "Само IT лукс"],
      explanation: "Сигурността намалява престоя, мошенничеството и катастрофалните загуби."
    },
    correct: 1
  },
  {
    id: "exec-16",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    en: {
      question: "What is the executive role during a breach?",
      options: ["Ignore IT decisions", "Make governance, legal, and business continuity decisions", "Write malware signatures", "Disable monitoring"],
      explanation: "Executives own risk decisions, communications, and continuity priorities."
    },
    bg: {
      question: "Каква е ролята на ръководителя по време на пробив?",
      options: ["Игнориране на IT решения", "Вземане на решения за управление, юридически и непрекъснатост на бизнеса", "Писане на малуер сигнатури", "Деактивиране на мониторинг"],
      explanation: "Ръководителите разпределят рисковите решения, комуникации и приоритети на непрекъснатост."
    },
    correct: 1
  },
  {
    id: "exec-17",
    topic: "BEC",
    topicBg: "Имейл измама (BEC)",
    en: {
      question: "Why is dual approval important for payments?",
      options: ["It slows down finance", "It prevents single-person fraud and BEC scams", "It replaces audits", "It eliminates phishing"],
      explanation: "Dual control blocks urgent fraudulent transfer requests."
    },
    bg: {
      question: "Защо двойното одобрение е важно за плащанията?",
      options: ["Забавя финансирането", "Предотвратява мошенничество на един човек и BEC измами", "Замяна на одити", "Елиминира фишинг"],
      explanation: "Двойната контрола блокира спешни измамни преводи."
    },
    correct: 1
  },
  {
    id: "exec-18",
    topic: "Governance",
    topicBg: "Управление",
    en: {
      question: "What is the best approach to cyber insurance?",
      options: ["Rely on it instead of security", "Use it as a supplement, not a replacement", "Assume it covers all ransom payments", "Ignore exclusions"],
      explanation: "Insurance helps financially but does not prevent incidents."
    },
    bg: {
      question: "Какъв е най-добрия подход към кибер застраховката?",
      options: ["Разчитайте на нея вместо на сигурност", "Използвайте я като допълнение, не замяна", "Предполагайте, че покрива всички плащания на откуп", "Игнорирайте изключенията"],
      explanation: "Застраховката помага финансово, но не предотвратява инцидентите."
    },
    correct: 1
  },
  {
    id: "exec-19",
    topic: "Governance",
    topicBg: "Управление",
    en: {
      question: "Why should boards receive cyber risk reporting?",
      options: ["For entertainment", "Cyber risk is enterprise-level business risk", "Only IT needs metrics", "It is unrelated to strategy"],
      explanation: "Boards must oversee major operational and financial risks."
    },
    bg: {
      question: "Защо бордовете трябва да получават отчети за киберриск?",
      options: ["За развлечение", "Киберрискът е бизнес риск на ниво предприятие", "Само IT нуждаят се от метрики", "Това е несвързано със стратегията"],
      explanation: "Бордовете трябва да надзирават основните оперативни и финансови рискове."
    },
    correct: 1
  },
  {
    id: "exec-20",
    topic: "Ransomware",
    topicBg: "Рансъмуер",
    en: {
      question: "What is the most common entry point for ransomware?",
      options: ["Employee phishing and stolen credentials", "Office printers", "Coffee machines", "Company logo files"],
      explanation: "Ransomware usually begins with phishing or exposed credentials."
    },
    bg: {
      question: "Каква е най-честата входна точка за рансъмуер?",
      options: ["Служителски фишинг и крадени идентификационни данни", "Офис принтери", "Кофейни машини", "Файлове на фирмени логота"],
      explanation: "Рансъмуерът обикновено започва с фишинг или експонирани идентификационни данни."
    },
    correct: 0
  },
  {
    id: "exec-21",
    topic: "Third-Party Risk",
    topicBg: "Риск от трети страни",
    en: {
      question: "A supplier is breached. Why does it matter to you?",
      options: ["It never affects customers", "Attackers may pivot into your environment through trust relationships", "It improves your security", "It reduces compliance obligations"],
      explanation: "Supply-chain attacks are a major modern threat vector."
    },
    bg: {
      question: "Доставчик е пробит. Защо това е важно за вас?",
      options: ["Никога не засяга клиентите", "Атакуващите могат да се преместят във вашата среда чрез доверителни отношения", "Подобрява вашата сигурност", "Намалява задълженията за съответствие"],
      explanation: "Атаките на веригата на доставки са основен вектор на съвременната заплаха."
    },
    correct: 1
  },
  {
    id: "exec-22",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    en: {
      question: "What should executives avoid doing during incidents?",
      options: ["Following the IR plan", "Making impulsive decisions without facts", "Engaging legal counsel", "Activating crisis communications"],
      explanation: "Poor decisions under pressure often worsen outcomes."
    },
    bg: {
      question: "Какво трябва да избегнат ръководителите по време на инциденти?",
      options: ["Следване на плана за реакция", "Вземане на импулсивни решения без факти", "Ангажиране на юридическо съвещание", "Активиране на кризисна комуникация"],
      explanation: "Лошите решения под налягане често влошават резултатите."
    },
    correct: 1
  },
  {
    id: "exec-23",
    topic: "Vulnerability Management",
    topicBg: "Управление на уязвимости",
    en: {
      question: "What is the primary purpose of penetration testing?",
      options: ["Marketing", "Identifying exploitable weaknesses before attackers do", "Replacing audits", "Reducing HR workload"],
      explanation: "Testing reveals gaps in controls and exposure."
    },
    bg: {
      question: "Каква е основната цел на тестовете на проникване?",
      options: ["Маркетинг", "Идентификуване на експлоатируеми слабости преди атакуващите", "Замяна на одити", "Намаляване на HR работата"],
      explanation: "Тестването разкрива пропуски в контролите и експозицията."
    },
    correct: 1
  },
  {
    id: "exec-24",
    topic: "Access Control",
    topicBg: "Контрол на достъпа",
    en: {
      question: "What does 'assume breach' mean?",
      options: ["No security is needed", "Design controls expecting attackers may already be inside", "Ignore compliance", "Stop using email"],
      explanation: "Assume breach drives stronger monitoring and containment strategies."
    },
    bg: {
      question: "Какво означава 'предполагайте пробив'?",
      options: ["Не е необходима сигурност", "Проектирайте контроли очаквайки атакуващите да бъдат вътре", "Игнорирайте съответствието", "Спрете да използвате имейл"],
      explanation: "Предположението за пробив стимулира по-силно мониторинг и стратегии за ограничаване."
    },
    correct: 1
  },
  {
    id: "exec-25",
    topic: "Phishing",
    topicBg: "Фишинг",
    en: {
      question: "Which is the best approach to executive phishing protection?",
      options: ["Executives are too busy for training", "High-value targets require stronger controls and awareness", "Only interns get phished", "Remove email access"],
      explanation: "Executives are prime targets for BEC and spearphishing."
    },
    bg: {
      question: "Какъв е най-добрия подход за защита на ръководителите от фишинг?",
      options: ["Ръководителите са твърде заети за обучение", "Целите с висока стойност изискват по-силни контроли и осведоменост", "Само стажанти попадат в фишинг", "Премахнете достъпа до имейл"],
      explanation: "Ръководителите са основни цели за BEC и копиеломни фишинг атаки."
    },
    correct: 1
  },
  {
    id: "exec-26",
    topic: "Governance",
    topicBg: "Управление",
    en: {
      question: "What is a realistic cybersecurity goal?",
      options: ["Perfect security forever", "Risk reduction and resilience", "No policies needed", "Only compliance checklists"],
      explanation: "Security is about managing risk and ensuring continuity."
    },
    bg: {
      question: "Каква е реалистична цел за киберсигурност?",
      options: ["Перфектна сигурност завинаги", "Намаляване на риска и устойчивост", "Не са необходими политики", "Само контролни списъци за съответствие"],
      explanation: "Сигурността е за управление на риска и осигуряване на непрекъснатост."
    },
    correct: 1
  },
  {
    id: "exec-27",
    topic: "Monitoring",
    topicBg: "Мониторинг",
    en: {
      question: "Why is logging and monitoring important at leadership level?",
      options: ["It increases printer usage", "You cannot respond to threats you cannot see", "It replaces insurance", "It stops all breaches automatically"],
      explanation: "Visibility determines detection speed and containment."
    },
    bg: {
      question: "Защо логирането и мониторингът са важни на ниво ръководство?",
      options: ["Увеличава употребата на принтери", "Не можете да отговорите на заплахи, които не виждате", "Замяна на застраховката", "Спира всички пробиви автоматично"],
      explanation: "Видимостта определя скоростта на откритие и ограничаване."
    },
    correct: 1
  },
  {
    id: "exec-28",
    topic: "Social Engineering",
    topicBg: "Социално инженерство",
    en: {
      question: "What is the most effective cultural security message?",
      options: ["Security is IT's job", "Verification is normal and expected", "Never report mistakes", "Speed matters more than safety"],
      explanation: "Healthy security culture encourages verification and reporting."
    },
    bg: {
      question: "Какво е най-ефективното културно послание за сигурност?",
      options: ["Сигурността е работа на IT", "Верификацията е нормална и очаквана", "Никога не докладвайте грешки", "Скоростта е по-важна от безопасността"],
      explanation: "Здравата сигурностна култура стимулира верификацията и докладването."
    },
    correct: 1
  },
  {
    id: "exec-29",
    topic: "Incident Response",
    topicBg: "Реакция при инциденти",
    en: {
      question: "Why should incident simulations be run regularly?",
      options: ["They waste time", "They reveal decision gaps before real crises", "They replace backups", "They prevent all phishing"],
      explanation: "Practice improves readiness and reduces chaos during real incidents."
    },
    bg: {
      question: "Защо симулациите на инциденти трябва да се провеждат редовно?",
      options: ["Пропилат време", "Разкриват пропуски в решенията преди реални кризи", "Замяна на резервни копия", "Предотвратяват всички фишинг"],
      explanation: "Практиката подобрява готовността и намалява хаоса по време на реални инциденти."
    },
    correct: 1
  },
  {
    id: "exec-30",
    topic: "Governance",
    topicBg: "Управление",
    en: {
      question: "What is the most important executive takeaway about cybersecurity?",
      options: ["It is purely technical", "It is business survival and trust management", "It is optional", "It ends with antivirus"],
      explanation: "Cybersecurity directly impacts revenue, operations, reputation, and legal accountability."
    },
    bg: {
      question: "Какво е най-важното, което ръководителем трябва да знае за киберсигурност?",
      options: ["Това е чисто технически", "Това е оцеляване на бизнеса и управление на доверието", "Това е факултативно", "Завършва с антивирус"],
      explanation: "Киберсигурността директно влияе на приходите, операциите, репутацията и юридическата отговорност."
    },
    correct: 1
  }
];
