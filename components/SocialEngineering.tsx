import React, { useRef, useEffect, useState } from 'react';
import { Lang } from '../types';

interface SocialEngineeringProps {
  lang: Lang;
  onBack: () => void;
}

const t = (lang: Lang, bg: string, en: string, de: string) =>
  lang === 'bg' ? bg : lang === 'en' ? en : de;

const SocialEngineering: React.FC<SocialEngineeringProps> = ({ lang, onBack }) => {
  const topRef = useRef<HTMLDivElement>(null);
  const [expandedTechnique, setExpandedTechnique] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const principles = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t(lang, 'Авторитет', 'Authority', 'Autoritaet'),
      description: t(
        lang,
        'Измамниците се представят за представители на банки, полиция или институции, за да спечелят доверие.',
        'Scammers impersonate banks, police, or institutions to gain trust and compliance.',
        'Betrueger geben sich als Vertreter von Banken, Polizei oder Institutionen aus, um Vertrauen zu gewinnen.'
      ),
      color: 'blue',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t(lang, 'Спешност', 'Urgency', 'Dringlichkeit'),
      description: t(
        lang,
        'Създават усещане за спешност — „Действайте СЕГА или ще загубите достъп!" — за да не ви оставят време да мислите.',
        'They create a sense of urgency — "Act NOW or lose access!" — to prevent you from thinking critically.',
        'Sie erzeugen ein Gefuehl der Dringlichkeit — „Handeln Sie JETZT oder verlieren Sie den Zugang!" — damit Sie nicht nachdenken koennen.'
      ),
      color: 'red',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t(lang, 'Социално доказателство', 'Social Proof', 'Sozialer Beweis'),
      description: t(
        lang,
        '„Хиляди хора вече спечелиха!" — използват фалшиви отзиви и препоръки, за да ви убедят да последвате стадото.',
        '"Thousands have already profited!" — they use fake reviews and testimonials to convince you to follow the crowd.',
        '„Tausende haben bereits profitiert!" — Sie nutzen gefaelschte Bewertungen und Empfehlungen, um Sie zum Mitmachen zu bewegen.'
      ),
      color: 'amber',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t(lang, 'Реципрочност', 'Reciprocity', 'Reziprozitaet'),
      description: t(
        lang,
        'Предлагат ви нещо „безплатно" или „бонус", за да се чувствате задължени да дадете нещо в замяна.',
        'They offer something "free" or a "bonus" so you feel obligated to give something back in return.',
        'Sie bieten Ihnen etwas „Kostenloses" oder einen „Bonus" an, damit Sie sich verpflichtet fuehlen, etwas zurueckzugeben.'
      ),
      color: 'emerald',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: t(lang, 'Страх', 'Fear', 'Angst'),
      description: t(
        lang,
        '„Вашият акаунт е компрометиран!" — използват страха, за да ви накарат да действате импулсивно.',
        '"Your account has been compromised!" — they weaponize fear to make you act impulsively.',
        '„Ihr Konto wurde kompromittiert!" — Sie nutzen Angst, um Sie zu impulsivem Handeln zu bewegen.'
      ),
      color: 'rose',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: t(lang, 'Съчувствие', 'Sympathy', 'Mitgefuehl'),
      description: t(
        lang,
        'Разказват тъжни истории или молят за помощ, за да разоръжат критичното ви мислене чрез емоции.',
        'They tell sad stories or plead for help to disarm your critical thinking through emotions.',
        'Sie erzaehlen traurige Geschichten oder bitten um Hilfe, um Ihr kritisches Denken durch Emotionen auszuschalten.'
      ),
      color: 'purple',
    },
  ];

  const techniques = [
    {
      title: t(lang, 'Фишинг', 'Phishing', 'Phishing'),
      subtitle: t(lang, 'Имейли и фалшиви сайтове', 'Emails & Fake Websites', 'E-Mails & gefaelschte Webseiten'),
      description: t(
        lang,
        'Фишингът е най-разпространената форма на социално инженерство. Измамниците изпращат имейли, съобщения или създават уебсайтове, които изглеждат идентични с легитимни организации (банки, пощенски услуги, социални мрежи). Целта е да ви накарат да въведете данните си за достъп, лична информация или финансови данни.',
        'Phishing is the most common form of social engineering. Scammers send emails, messages, or create websites that look identical to legitimate organizations (banks, postal services, social media). The goal is to trick you into entering your login credentials, personal information, or financial data.',
        'Phishing ist die haeufigste Form des Social Engineering. Betrueger versenden E-Mails, Nachrichten oder erstellen Webseiten, die identisch mit legitimen Organisationen aussehen (Banken, Postdienste, soziale Medien). Das Ziel ist es, Sie dazu zu bringen, Ihre Anmeldedaten, persoenliche Informationen oder Finanzdaten einzugeben.'
      ),
      example: t(
        lang,
        '„Вашата пратка е задържана. Платете 2.99 лв. такса, за да я получите" — с линк към фалшив сайт на куриерска фирма.',
        '"Your package is on hold. Pay a $2.99 fee to receive it" — with a link to a fake courier website.',
        '„Ihr Paket wird zurueckgehalten. Zahlen Sie eine Gebuehr von 2,99 €, um es zu erhalten" — mit einem Link zu einer gefaelschten Kurierwebseite.'
      ),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Вишинг', 'Vishing', 'Vishing'),
      subtitle: t(lang, 'Телефонни измами', 'Voice Phishing', 'Telefonbetrug'),
      description: t(
        lang,
        'Вишингът е фишинг по телефона. Измамниците се обаждат и се представят за служители на банка, полиция или техническа поддръжка. Използват спешен тон и заплахи, за да ви принудят да споделите лична информация, пароли или да направите превод.',
        'Vishing is phishing over the phone. Scammers call pretending to be bank employees, police, or tech support. They use urgent tones and threats to pressure you into sharing personal information, passwords, or making transfers.',
        'Vishing ist Phishing per Telefon. Betrueger rufen an und geben sich als Bankmitarbeiter, Polizei oder technischen Support aus. Sie verwenden dringliche Toene und Drohungen, um Sie zur Weitergabe persoenlicher Informationen, Passwoerter oder Ueberweisungen zu draengen.'
      ),
      example: t(
        lang,
        '„Обаждаме се от банката ви. Засечена е подозрителна транзакция. Моля, потвърдете данните си за верификация."',
        '"We\'re calling from your bank. A suspicious transaction has been detected. Please confirm your details for verification."',
        '„Wir rufen von Ihrer Bank an. Eine verdaechtige Transaktion wurde erkannt. Bitte bestaetigen Sie Ihre Daten zur Verifizierung."'
      ),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Смишинг', 'Smishing', 'Smishing'),
      subtitle: t(lang, 'SMS измами', 'SMS Phishing', 'SMS-Betrug'),
      description: t(
        lang,
        'Смишингът е фишинг чрез SMS съобщения. Получавате кратко съобщение с линк, което изглежда от банка, куриер или държавна институция. Линкът води към фалшив сайт, който краде данните ви.',
        'Smishing is phishing via SMS messages. You receive a short message with a link that appears to be from a bank, courier, or government agency. The link leads to a fake website that steals your data.',
        'Smishing ist Phishing per SMS-Nachrichten. Sie erhalten eine kurze Nachricht mit einem Link, der von einer Bank, einem Kurier oder einer Behoerde zu stammen scheint. Der Link fuehrt zu einer gefaelschten Webseite, die Ihre Daten stiehlt.'
      ),
      example: t(
        lang,
        '„НАП: Имате неплатено задължение от 156.00 лв. Платете тук: [фалшив линк]"',
        '"IRS: You have an unpaid obligation of $156.00. Pay here: [fake link]"',
        '„Finanzamt: Sie haben eine unbezahlte Verpflichtung von 156,00 €. Zahlen Sie hier: [gefaelschter Link]"'
      ),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Претекстинг', 'Pretexting', 'Pretexting'),
      subtitle: t(lang, 'Измислени сценарии', 'Fabricated Scenarios', 'Erfundene Szenarien'),
      description: t(
        lang,
        'Претекстингът е създаване на измислена история или самоличност, за да се спечели доверието на жертвата. Измамникът може да се представи за колега, IT специалист, или дори роднина в беда. Целта е да се извлече чувствителна информация или пари.',
        'Pretexting involves creating a fabricated story or identity to gain the victim\'s trust. The scammer may pose as a colleague, IT specialist, or even a relative in trouble. The goal is to extract sensitive information or money.',
        'Pretexting ist das Erstellen einer erfundenen Geschichte oder Identitaet, um das Vertrauen des Opfers zu gewinnen. Der Betrueger kann sich als Kollege, IT-Spezialist oder sogar als Verwandter in Not ausgeben. Das Ziel ist es, sensible Informationen oder Geld zu erlangen.'
      ),
      example: t(
        lang,
        '„Здравейте, аз съм от IT отдела. Имаме проблем със сървъра и се нуждаем от вашата парола, за да проверим акаунта ви."',
        '"Hello, I\'m from the IT department. We have a server issue and need your password to check your account."',
        '„Hallo, ich bin von der IT-Abteilung. Wir haben ein Serverproblem und benoetigen Ihr Passwort, um Ihr Konto zu ueberpruefen."'
      ),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Примамка (Baiting)', 'Baiting', 'Koederangriff'),
      subtitle: t(lang, 'Примамливи оферти', 'Tempting Offers', 'Verlockende Angebote'),
      description: t(
        lang,
        'Примамката използва обещания за нещо привлекателно — безплатен софтуер, награда, голяма печалба — за да ви накара да кликнете на зловреден линк, да изтеглите заразен файл или да споделите лична информация.',
        'Baiting uses promises of something attractive — free software, a prize, big profits — to make you click a malicious link, download an infected file, or share personal information.',
        'Koederangriffe nutzen Versprechen von etwas Attraktivem — kostenlose Software, ein Preis, grosse Gewinne — um Sie dazu zu bringen, auf einen schaedlichen Link zu klicken, eine infizierte Datei herunterzuladen oder persoenliche Informationen zu teilen.'
      ),
      example: t(
        lang,
        '„Спечелихте iPhone 15! Кликнете тук, за да заявите наградата си" — изисква лична информация и данни за кредитна карта.',
        '"You\'ve won an iPhone 15! Click here to claim your prize" — requires personal information and credit card details.',
        '„Sie haben ein iPhone 15 gewonnen! Klicken Sie hier, um Ihren Preis zu beanspruchen" — erfordert persoenliche Informationen und Kreditkartendaten.'
      ),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Quid Pro Quo', 'Quid Pro Quo', 'Quid Pro Quo'),
      subtitle: t(lang, 'Услуга за услуга', 'Something for Something', 'Gegenleistung'),
      description: t(
        lang,
        'Измамникът предлага услуга (техническа помощ, безплатна консултация) в замяна на информация или достъп. Например, обаждат ви се и предлагат „безплатна антивирусна проверка", при която всъщност инсталират зловреден софтуер.',
        'The scammer offers a service (tech help, free consultation) in exchange for information or access. For example, they call offering a "free antivirus scan" which actually installs malware.',
        'Der Betrueger bietet eine Dienstleistung (technische Hilfe, kostenlose Beratung) im Austausch fuer Informationen oder Zugang an. Zum Beispiel rufen sie an und bieten einen „kostenlosen Virenscan" an, der tatsaechlich Malware installiert.'
      ),
      example: t(
        lang,
        '„Обаждаме се от Microsoft. Вашият компютър е заразен с вирус. Нека се свържем отдалечено, за да го поправим безплатно."',
        '"We\'re calling from Microsoft. Your computer is infected with a virus. Let us connect remotely to fix it for free."',
        '„Wir rufen von Microsoft an. Ihr Computer ist mit einem Virus infiziert. Lassen Sie uns eine Fernverbindung herstellen, um ihn kostenlos zu reparieren."'
      ),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
  ];

  const redFlags = [
    {
      text: t(
        lang,
        'Непоискани съобщения или обаждания с искане за лични данни',
        'Unsolicited messages or calls requesting personal data',
        'Unaufgeforderte Nachrichten oder Anrufe mit der Bitte um persoenliche Daten'
      ),
    },
    {
      text: t(
        lang,
        'Натиск за незабавно действие — „Имате само 24 часа!"',
        'Pressure for immediate action — "You only have 24 hours!"',
        'Druck fuer sofortiges Handeln — „Sie haben nur 24 Stunden!"'
      ),
    },
    {
      text: t(
        lang,
        'Оферти, които звучат твърде добре, за да бъдат истински',
        'Offers that sound too good to be true',
        'Angebote, die zu gut klingen, um wahr zu sein'
      ),
    },
    {
      text: t(
        lang,
        'Граматически грешки и непрофесионален стил в официални съобщения',
        'Grammar errors and unprofessional tone in official messages',
        'Grammatikfehler und unprofessioneller Stil in offiziellen Nachrichten'
      ),
    },
    {
      text: t(
        lang,
        'Подозрителни линкове, които не съвпадат с официалния домейн',
        'Suspicious links that don\'t match the official domain',
        'Verdaechtige Links, die nicht mit der offiziellen Domain uebereinstimmen'
      ),
    },
    {
      text: t(
        lang,
        'Искане за пароли, ПИН кодове или финансова информация',
        'Requests for passwords, PIN codes, or financial information',
        'Anfragen nach Passwoertern, PIN-Codes oder Finanzinformationen'
      ),
    },
    {
      text: t(
        lang,
        'Заплахи за последствия, ако не се подчините',
        'Threats of consequences if you don\'t comply',
        'Drohungen mit Konsequenzen, wenn Sie nicht gehorchen'
      ),
    },
    {
      text: t(
        lang,
        'Непознат подател, който ви се обръща с „Уважаеми клиент" вместо по име',
        'Unknown sender addressing you as "Dear Customer" instead of by name',
        'Unbekannter Absender, der Sie als „Sehr geehrter Kunde" statt mit Namen anspricht'
      ),
    },
  ];

  const protectionSteps = [
    {
      title: t(lang, 'Проверявайте източника', 'Verify the Source', 'Ueberpruefen Sie die Quelle'),
      description: t(
        lang,
        'Никога не се доверявайте сляпо на имейл, обаждане или съобщение. Проверете самоличността на подателя чрез официални канали — обадете се на официалния телефон на организацията, не на номера от съобщението.',
        'Never blindly trust an email, call, or message. Verify the sender\'s identity through official channels — call the organization\'s official number, not the one from the message.',
        'Vertrauen Sie niemals blind einer E-Mail, einem Anruf oder einer Nachricht. Ueberpruefen Sie die Identitaet des Absenders ueber offizielle Kanaele — rufen Sie die offizielle Nummer der Organisation an, nicht die aus der Nachricht.'
      ),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Не бързайте', 'Don\'t Rush', 'Keine Eile'),
      description: t(
        lang,
        'Измамниците разчитат на паника и бързане. Спрете се, помислете и не вземайте решения под натиск. Легитимните организации никога не ви притискат за незабавно действие.',
        'Scammers rely on panic and rushing. Stop, think, and don\'t make decisions under pressure. Legitimate organizations never pressure you for immediate action.',
        'Betrueger setzen auf Panik und Eile. Halten Sie inne, denken Sie nach und treffen Sie keine Entscheidungen unter Druck. Serioese Organisationen draengen Sie nie zu sofortigem Handeln.'
      ),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Не споделяйте пароли', 'Never Share Passwords', 'Teilen Sie niemals Passwoerter'),
      description: t(
        lang,
        'Никоя легитимна организация, банка или техническа поддръжка никога няма да ви поиска паролата. Ако някой я иска — това е измама, без изключение.',
        'No legitimate organization, bank, or tech support will ever ask for your password. If someone asks for it — it\'s a scam, no exceptions.',
        'Keine serioese Organisation, Bank oder technischer Support wird jemals nach Ihrem Passwort fragen. Wenn jemand danach fragt — es ist Betrug, ohne Ausnahme.'
      ),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Активирайте 2FA', 'Enable 2FA', 'Aktivieren Sie 2FA'),
      description: t(
        lang,
        'Двуфакторната автентикация (2FA) добавя допълнителен слой защита. Дори ако измамник получи паролата ви, няма да може да влезе без втория фактор.',
        'Two-factor authentication (2FA) adds an extra layer of protection. Even if a scammer gets your password, they can\'t log in without the second factor.',
        'Zwei-Faktor-Authentifizierung (2FA) fuegt eine zusaetzliche Schutzschicht hinzu. Selbst wenn ein Betrueger Ihr Passwort erhaelt, kann er sich ohne den zweiten Faktor nicht anmelden.'
      ),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Обучавайте околните', 'Educate Others', 'Informieren Sie andere'),
      description: t(
        lang,
        'Споделяйте знанията си с близки, особено с по-възрастни роднини. Те са най-уязвими към социално инженерство. Научете ги да разпознават основните тактики.',
        'Share your knowledge with loved ones, especially elderly relatives. They are most vulnerable to social engineering. Teach them to recognize basic tactics.',
        'Teilen Sie Ihr Wissen mit Angehoerigen, besonders mit aelteren Verwandten. Sie sind am anfaelligsten fuer Social Engineering. Bringen Sie ihnen bei, grundlegende Taktiken zu erkennen.'
      ),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: t(lang, 'Докладвайте опити', 'Report Attempts', 'Melden Sie Versuche'),
      description: t(
        lang,
        'Докладвайте подозрителни съобщения и обаждания на съответните органи и на организацията, от чието име се представят измамниците.',
        'Report suspicious messages and calls to the relevant authorities and to the organization the scammers are impersonating.',
        'Melden Sie verdaechtige Nachrichten und Anrufe den zustaendigen Behoerden und der Organisation, als deren Vertreter sich die Betrueger ausgeben.'
      ),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={topRef} className="scroll-mt-[72px]">
      {/* Hero / Header */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">
              {t(lang, 'Назад', 'Back', 'Zurueck')}
            </span>
          </button>

          <div className="flex flex-col items-center text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-900/40 backdrop-blur-md border border-purple-500/30 rounded-full text-purple-400 text-[11px] font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              {t(lang, 'СОЦИАЛНО ИНЖЕНЕРСТВО', 'SOCIAL ENGINEERING', 'SOCIAL ENGINEERING')}
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl drop-shadow-2xl">
              {t(
                lang,
                'Как измамниците манипулират хората',
                'How Scammers Manipulate People',
                'Wie Betrueger Menschen manipulieren'
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-medium">
              {t(
                lang,
                'Социалното инженерство е изкуството на манипулацията — използване на човешката психология вместо технически уязвимости. Разберете как работи, за да не станете жертва.',
                'Social engineering is the art of manipulation — exploiting human psychology instead of technical vulnerabilities. Understand how it works so you don\'t become a victim.',
                'Social Engineering ist die Kunst der Manipulation — die Ausnutzung menschlicher Psychologie statt technischer Schwachstellen. Verstehen Sie, wie es funktioniert, damit Sie kein Opfer werden.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* What is Social Engineering */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12 border border-slate-700/50 bg-slate-900/60">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-900/40 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                  {t(lang, 'Какво е социално инженерство?', 'What is Social Engineering?', 'Was ist Social Engineering?')}
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                {t(
                  lang,
                  'Социалното инженерство е метод за манипулация, при който измамниците експлоатират човешките емоции и поведенчески модели, вместо да атакуват технически системи. Вместо да хакнат компютъра ви, те „хакват" вас — вашето доверие, страх или желание за печалба.',
                  'Social engineering is a manipulation method where scammers exploit human emotions and behavioral patterns instead of attacking technical systems. Instead of hacking your computer, they "hack" you — your trust, fear, or desire for profit.',
                  'Social Engineering ist eine Manipulationsmethode, bei der Betrueger menschliche Emotionen und Verhaltensmuster ausnutzen, anstatt technische Systeme anzugreifen. Statt Ihren Computer zu hacken, „hacken" sie Sie — Ihr Vertrauen, Ihre Angst oder Ihren Wunsch nach Gewinn.'
                )}
              </p>
              <p>
                {t(
                  lang,
                  'Тази техника е в основата на над 90% от успешните кибератаки. Независимо колко добра е техническата ви защита, ако измамник успее да ви убеди да кликнете на линк или да споделите парола — защитата е безполезна.',
                  'This technique is at the core of over 90% of successful cyberattacks. No matter how good your technical defenses are, if a scammer convinces you to click a link or share a password — the defenses are useless.',
                  'Diese Technik steht im Kern von ueber 90% der erfolgreichen Cyberangriffe. Egal wie gut Ihre technischen Abwehrmassnahmen sind, wenn ein Betrueger Sie ueberzeugt, auf einen Link zu klicken oder ein Passwort zu teilen — sind die Abwehrmassnahmen nutzlos.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Psychological Principles */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t(lang, 'Защо работи?', 'Why Does It Work?', 'Warum funktioniert es?')}
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t(
                lang,
                'Измамниците използват фундаментални психологически принципи, на които всеки човек е податлив.',
                'Scammers exploit fundamental psychological principles that every person is susceptible to.',
                'Betrueger nutzen grundlegende psychologische Prinzipien aus, fuer die jeder Mensch anfaellig ist.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, i) => {
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                blue: { bg: 'bg-blue-900/30', border: 'border-blue-500/20', text: 'text-blue-400' },
                red: { bg: 'bg-red-900/30', border: 'border-red-500/20', text: 'text-red-400' },
                amber: { bg: 'bg-amber-900/30', border: 'border-amber-500/20', text: 'text-amber-400' },
                emerald: { bg: 'bg-emerald-900/30', border: 'border-emerald-500/20', text: 'text-emerald-400' },
                rose: { bg: 'bg-rose-900/30', border: 'border-rose-500/20', text: 'text-rose-400' },
                purple: { bg: 'bg-purple-900/30', border: 'border-purple-500/20', text: 'text-purple-400' },
              };
              const colors = colorMap[principle.color];

              return (
                <div key={i} className={`rounded-xl p-6 border ${colors.border} ${colors.bg} hover:brightness-125 transition-all`}>
                  <div className={`w-14 h-14 bg-slate-950/60 rounded-xl flex items-center justify-center mb-4 border ${colors.border}`}>
                    <span className={colors.text}>{principle.icon}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{principle.title}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t(lang, 'Техники за атака', 'Attack Techniques', 'Angriffstechniken')}
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t(
                lang,
                'Основните методи, които измамниците използват, за да достигнат до жертвите си.',
                'The main methods scammers use to reach their victims.',
                'Die wichtigsten Methoden, die Betrueger verwenden, um ihre Opfer zu erreichen.'
              )}
            </p>
          </div>

          <div className="space-y-4">
            {techniques.map((technique, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-700/50 overflow-hidden transition-all bg-slate-900/40"
              >
                <button
                  onClick={() => setExpandedTechnique(expandedTechnique === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-600/30">
                    <span className="text-blue-400">{technique.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-white">{technique.title}</h4>
                    <p className="text-sm text-slate-400">{technique.subtitle}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${expandedTechnique === i ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedTechnique === i && (
                  <div className="px-6 pb-6 border-t border-slate-700/30">
                    <p className="text-slate-300 leading-relaxed mt-4 mb-4">{technique.description}</p>
                    <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="text-red-300 text-sm font-semibold mb-1">
                            {t(lang, 'Пример:', 'Example:', 'Beispiel:')}
                          </p>
                          <p className="text-red-200/80 text-sm italic">{technique.example}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t(lang, 'Червени флагове', 'Red Flags', 'Warnsignale')}
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t(
                lang,
                'Ако забележите някой от тези признаци, бъдете нащрек — вероятно е опит за измама.',
                'If you notice any of these signs, be alert — it\'s likely a scam attempt.',
                'Wenn Sie eines dieser Anzeichen bemerken, seien Sie wachsam — es handelt sich wahrscheinlich um einen Betrugsversuch.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {redFlags.map((flag, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-4 border border-red-900/30 bg-red-950/20">
                <div className="w-6 h-6 rounded-full bg-red-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{flag.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protection Steps */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t(lang, 'Как да се защитите', 'How to Protect Yourself', 'Wie Sie sich schuetzen')}
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t(
                lang,
                'Следвайте тези стъпки, за да намалите значително риска от атака чрез социално инженерство.',
                'Follow these steps to significantly reduce your risk of a social engineering attack.',
                'Befolgen Sie diese Schritte, um Ihr Risiko eines Social-Engineering-Angriffs erheblich zu reduzieren.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protectionSteps.map((step, i) => (
              <div key={i} className="rounded-xl p-6 border border-slate-700/50 relative bg-slate-900/40">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {i + 1}
                </div>
                <div className="w-10 h-10 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
                  <span className="text-emerald-400">{step.icon}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Takeaway / CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12 border border-purple-500/20 text-center bg-purple-950/30">
            <div className="w-16 h-16 bg-purple-900/40 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
              <svg className="w-9 h-9 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              {t(
                lang,
                'Най-добрата защита е знанието',
                'Knowledge is the Best Defense',
                'Wissen ist die beste Verteidigung'
              )}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
              {t(
                lang,
                'Социалното инженерство разчита на неведението. Сега, когато знаете как работи, вие сте значително по-трудна мишена. Споделете тези знания с близките си.',
                'Social engineering relies on ignorance. Now that you know how it works, you are a significantly harder target. Share this knowledge with your loved ones.',
                'Social Engineering beruht auf Unwissenheit. Jetzt, da Sie wissen, wie es funktioniert, sind Sie ein deutlich schwierigeres Ziel. Teilen Sie dieses Wissen mit Ihren Angehoerigen.'
              )}
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-600/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t(lang, 'Обратно към началото', 'Back to Homepage', 'Zurueck zur Startseite')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialEngineering;
