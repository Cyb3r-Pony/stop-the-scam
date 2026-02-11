import React, { useState } from 'react';
import { Lang } from '../types';
import { PoolQuestion, individualsPool } from './individualsQuestions';
import { itAdminsPool } from './itAdminsQuestions';
import { executivesPool } from './executivesQuestions';

type QuizCategory = 'individuals' | 'it-admins' | 'executives';

interface Recommendation {
  tier: string;
  tierColor: string;
  tierBg: string;
  tierBorder: string;
  message: string;
  actions: string[];
  priority: string;
}

// Category metadata (title, subtitle, icon) — no questions here
const getCategoryMeta = (lang: Lang) => ({
  'individuals': {
    title: lang === 'bg' ? 'Физически лица' : 'Individuals',
    subtitle: lang === 'bg' ? 'Ежедневни потребители' : 'Everyday Users',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  'it-admins': {
    title: lang === 'bg' ? 'IT Администратори' : 'IT Administrators',
    subtitle: lang === 'bg' ? 'Технически персонал' : 'Technical Staff',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  'executives': {
    title: lang === 'bg' ? 'Ръководители' : 'Executives',
    subtitle: lang === 'bg' ? 'CEO, CFO, бизнес лидери' : 'CEO, CFO, Business Leaders',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
});

// Pools by category
const pools: Record<QuizCategory, PoolQuestion[]> = {
  'individuals': individualsPool,
  'it-admins': itAdminsPool,
  'executives': executivesPool
};

// Shuffle and pick 10 questions from a pool
const pickRandomQuestions = (pool: PoolQuestion[], count: number = 10): PoolQuestion[] => {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Score-based recommendations (unchanged from original)
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

// Topic-based recommendations using actual topic tags from wrong answers
const getTopicRecommendations = (lang: Lang, category: QuizCategory, wrongQuestions: PoolQuestion[]): string[] => {
  const wrongTopics = new Set(wrongQuestions.map(q => q.topic));
  const tips: string[] = [];

  if (category === 'individuals') {
    if (wrongTopics.has('Phishing')) {
      tips.push(lang === 'bg'
        ? 'Допълнете обучението си по фишинг симулации — попаднахте в капана на въпросите за фишинг.'
        : 'Complete phishing simulation training — you fell for phishing-related questions.');
    }
    if (wrongTopics.has('Password Security')) {
      tips.push(lang === 'bg'
        ? 'Внедрете мениджър на пароли + MFA — паролите ви имат нужда от подобрение.'
        : 'Deploy a password manager + MFA — your password practices need improvement.');
    }
    if (wrongTopics.has('MFA')) {
      tips.push(lang === 'bg'
        ? 'Активирайте MFA за всички критични акаунти — пропуснахте въпросите за многофакторно удостоверяване.'
        : 'Enable MFA on all critical accounts — you missed multi-factor authentication questions.');
    }
    if (wrongTopics.has('Social Engineering')) {
      tips.push(lang === 'bg'
        ? 'Научете се да разпознавате тактиките за социално инженерство — спешност, страх и имитация.'
        : 'Learn to recognize social engineering tactics — urgency, fear, and impersonation.');
    }
    if (wrongTopics.has('Network Security')) {
      tips.push(lang === 'bg'
        ? 'Прегледайте защитата на мрежата — помислете за VPN и проверка на HTTPS.'
        : 'Review your network protection — consider VPN and HTTPS verification.');
    }
    if (wrongTopics.has('Identity Protection')) {
      tips.push(lang === 'bg'
        ? 'Ограничете споделянето на лична информация онлайн — атакуващите я използват за кражба на самоличност.'
        : 'Limit sharing personal information online — attackers use it for identity theft.');
    }
    if (wrongTopics.has('Incident Response')) {
      tips.push(lang === 'bg'
        ? 'Подгответе план за действие при компрометиран акаунт — знайте какво да направите веднага.'
        : 'Prepare an action plan for compromised accounts — know what to do immediately.');
    }
  } else if (category === 'it-admins') {
    if (wrongTopics.has('Ransomware')) {
      tips.push(lang === 'bg'
        ? 'Тествайте възстановяването от резервни копия в рамките на 30 дни — пропуснахте въпросите за рансъмуер.'
        : 'Test backup recovery within 30 days — you missed ransomware-related questions.');
    }
    if (wrongTopics.has('MFA')) {
      tips.push(lang === 'bg'
        ? 'Приоритизирайте внедряването на FIDO2/MFA — удостоверяването ви има слабости.'
        : 'Prioritize FIDO2/MFA deployment — your authentication has weaknesses.');
    }
    if (wrongTopics.has('Monitoring')) {
      tips.push(lang === 'bg'
        ? 'Подобрете възможностите за мониторинг и откриване — внедрете SIEM/XDR решение.'
        : 'Improve monitoring and detection capabilities — deploy a SIEM/XDR solution.');
    }
    if (wrongTopics.has('Access Control')) {
      tips.push(lang === 'bg'
        ? 'Прегледайте политиките за контрол на достъпа — приложете принципа на минималните привилегии.'
        : 'Review access control policies — apply the principle of least privilege.');
    }
    if (wrongTopics.has('Incident Response')) {
      tips.push(lang === 'bg'
        ? 'Създайте и тествайте план за реакция при инциденти в рамките на 30 дни.'
        : 'Create and test an incident response plan within 30 days.');
    }
    if (wrongTopics.has('Network Security')) {
      tips.push(lang === 'bg'
        ? 'Прегледайте мрежовата сегментация и отдалечения достъп — намалете повърхността за атака.'
        : 'Review network segmentation and remote access — reduce the attack surface.');
    }
    if (wrongTopics.has('Endpoint Security')) {
      tips.push(lang === 'bg'
        ? 'Внедрете EDR и application whitelisting за по-добра защита на крайните точки.'
        : 'Deploy EDR and application whitelisting for better endpoint protection.');
    }
    if (wrongTopics.has('Patch Management')) {
      tips.push(lang === 'bg'
        ? 'Автоматизирайте управлението на пачове — непачнатите системи са основна входна точка.'
        : 'Automate patch management — unpatched systems are a primary entry point.');
    }
  } else {
    // executives
    if (wrongTopics.has('BEC')) {
      tips.push(lang === 'bg'
        ? 'Въведете работни процеси за двойно одобрение на плащания — пропуснахте въпросите за BEC измама.'
        : 'Introduce dual approval workflows for payments — you missed BEC fraud questions.');
    }
    if (wrongTopics.has('Governance')) {
      tips.push(lang === 'bg'
        ? 'Установете кибер управление на ниво борд — регулаторното съответствие е критично.'
        : 'Establish board-level cyber governance — regulatory compliance is critical.');
    }
    if (wrongTopics.has('Incident Response')) {
      tips.push(lang === 'bg'
        ? 'Създайте и тествайте план за реакция при инциденти в рамките на 30 дни.'
        : 'Create and test an incident response plan within 30 days.');
    }
    if (wrongTopics.has('Ransomware')) {
      tips.push(lang === 'bg'
        ? 'Осигурете тествани резервни копия и план за непрекъснатост на бизнеса.'
        : 'Ensure tested backups and a business continuity plan are in place.');
    }
    if (wrongTopics.has('Social Engineering')) {
      tips.push(lang === 'bg'
        ? 'Инвестирайте в обучение на служителите — човешката грешка е основна входна точка.'
        : 'Invest in employee training — human error is the primary entry point.');
    }
    if (wrongTopics.has('Third-Party Risk')) {
      tips.push(lang === 'bg'
        ? 'Прегледайте риска от трети страни — доставчиците могат да станат пътища за атака.'
        : 'Review third-party risk — suppliers can become attack paths.');
    }
    if (wrongTopics.has('Compliance')) {
      tips.push(lang === 'bg'
        ? 'Осигурете готовност за GDPR и NIS2 — неспазването носи сериозни санкции.'
        : 'Ensure GDPR and NIS2 readiness — non-compliance carries serious penalties.');
    }
    if (wrongTopics.has('Monitoring')) {
      tips.push(lang === 'bg'
        ? 'Изисквайте редовни доклади за време за откриване и реакция при инциденти.'
        : 'Demand regular reporting on detection and response times.');
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
  const [sessionQuestions, setSessionQuestions] = useState<PoolQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<PoolQuestion[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(10).fill(false));

  const categoryMeta = getCategoryMeta(lang);
  const categories: QuizCategory[] = ['individuals', 'it-admins', 'executives'];

  const resetQuiz = (cat?: QuizCategory) => {
    const category = cat || selectedCategory;
    if (category) {
      setSessionQuestions(pickRandomQuestions(pools[category]));
    }
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setWrongQuestions([]);
    setQuizComplete(false);
    setAnsweredQuestions(new Array(10).fill(false));
  };

  const handleCategorySelect = (cat: QuizCategory) => {
    setSelectedCategory(cat);
    const picked = pickRandomQuestions(pools[cat]);
    setSessionQuestions(picked);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setWrongQuestions([]);
    setQuizComplete(false);
    setAnsweredQuestions(new Array(10).fill(false));
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    const q = sessionQuestions[currentQuestion];
    const isCorrect = index === q.correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongQuestions(prev => [...prev, q]);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sessionQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  // ─── Category selection screen ─────────────────────────────────
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
                ? 'Практически въпроси за вземане на решения, свързани с реални измами, фишинг, рансъмуер и бизнес рискове. Всяка сесия е различна — 10 произволни въпроса от 30.'
                : 'Practical decision-making questions tied to real-world scams, phishing, ransomware, and business risk. Each session is different — 10 random questions from a pool of 30.'}
            </p>
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const meta = categoryMeta[cat];
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
                    {meta.icon}
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-2 group-hover:${catColors.text} transition-colors`}>
                    {meta.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">{meta.subtitle}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>10 {lang === 'bg' ? 'от 30 въпроса' : 'of 30 questions'}</span>
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

  // ─── Results screen ────────────────────────────────────────────
  if (quizComplete) {
    const recommendation = getRecommendations(lang, selectedCategory, score);
    const topicTips = getTopicRecommendations(lang, selectedCategory, wrongQuestions);
    const percentage = Math.round((score / 10) * 100);

    return (
      <div className="min-h-screen pt-8 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => { setSelectedCategory(null); }}
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
              {lang === 'bg' ? 'Опитай с нови въпроси' : 'Try With New Questions'}
            </button>
            <button
              onClick={() => { setSelectedCategory(null); }}
              className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all border border-white/10"
            >
              {lang === 'bg' ? 'Избери друг тест' : 'Choose Another Quiz'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Active quiz screen ────────────────────────────────────────
  const question = sessionQuestions[currentQuestion];
  if (!question) return null;

  const langData = lang === 'bg' ? question.bg : question.en;
  const topicLabel = lang === 'bg' ? question.topicBg : question.topic;
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="min-h-screen pt-8 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => { setSelectedCategory(null); }}
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
              {categoryMeta[selectedCategory].title}
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

        {/* Topic tag */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-900/30 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {topicLabel}
          </span>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg">
              {currentQuestion + 1}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight pt-1">
              {langData.question}
            </h3>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {langData.options.map((option, i) => {
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
              <p className="text-slate-300 leading-relaxed">{langData.explanation}</p>
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
