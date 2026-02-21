import { ContentStrings, Lang } from './types';

export const SCAM_DOMAINS = [
    "crescent-trustee.org", "ipgatetrade.pro", "saxogroup.biz", "bg.finance-investapp.com", "brevistechnology.co", "wealthoa.com", "aclon-finance.net", "cfixtrade.com", "bitstus.com",
    "connectiveneuron.dev", "comexvault.com", "comexcloud.shop", "ammapp.cc", "tubezuo3.pro", "cacewuo0.pro", "taktkk.shop", "teletabi.sbs",
    "fastertradingfx.com", "pay1exchange.com", "gpgttkk.net", "moon-market.com", "aliexpress.hnyoueryuan.com", "usdc-eth.icu",
    "dashboard.white-arrow.org", "fondex.io", "bats.currency-r.com", "tkyin.com", "vip.bybxt.com", "limbeto.com",
    "yuart.sbs", "trevolswapro.com", "ic-market.app", "usumming.com", "dashboard.system-capital.org",
    "user.maca-trading.com", "fxpeaktrade.com", "gacapitalm.com", "brugazom.com", "hillsfinancialgroup.io", "tiktok.tkyin.com",
    "avatrada.com", "pp66p.lol", "concordia-fp.com", "elevatetrading.org", "wv65175.com", "isptraders.com", "oakwell-cl.net",
    "b-tl.cc", "paklucktrading.com", "fiveskweb.com", "trust.market-ic.trade", "richtechglobal.com", "voip520.com",
    "user.altaconivestment.info", "aibot5r.cc", "aibotz.cc", "zobest.tv", "user.memberaccount.icu", "tiktshop.cc",
    "ytbsbe.top", "zobest.co", "nflixcasting.com", "yiaospc.com", "keiob.com", "trackaml.com", "trade.green-art.org",
    "onlinedigitainvestmentplatform.com", "global-trd.com", "hcpoes.cc", "freyabot.com", "apvapp.com", "losssmall.com",
    "malllegend.com", "jp-gaultier-marketplace.com", "aliexpresvip1.com", "trendlawyers.com", "ytbmyy.top", "ytbhib.top",
    "dcqqp.com", "ytbenn.top", "app.spaceaius.com", "ytbzkl.top", "ytbjcb.cfd", "lwexgr.com", "pearlcommercialfinance.co.uk",
    "onchainpro.vip", "solaxy-dashboard.web.app", "h-cl.top", "vanadotrade.com", "therealcop.com", "zobest.vip",
    "vexgroup.one", "vixspacehub.com", "apexcryptotrades.com", "profittrades.vip", "pairminer.com", "vcjobnetwork.com",
    "algoesp.com", "netviewtrading.com", "lasbert.com", "wealthsolutionsltd.com", "fxmeridian.com", "web3.dytodx.com",
    "affluenceexpress.com", "live.royal-ventures.vip", "trade350app.net", "ripple-etf.online", "lasbert.ltd",
    "lasbert.net", "ytbstr.top", "dashboard.capital-system.org", "trade.green-art.biz", "s-group.io",
    "trade.greenartinv.net", "capitalunipremier.com", "bilaxt.com", "uk-tkmall.azureedge.net", "dcqwn.com",
    "glvirtualworkforce.com", "capital-system.org", "crazywins.life", "ytbxzu.top", "bitcone.net", "bitconemine.cc",
    "goinvesthub.com", "term.w-sol.online", "vtbglf.top", "prospbid.com", "trade.pamioerutex.com", "fihao.com",
    "zqdlb.com", "ytbwjw.top", "xuex.top", "capital-systematics.com", "you2bevideos.homes", "coinstem.com",
    "sigma-exchange.com", "ytbors.top", "trade.alpha-solutuons.cc", "bg.batm.pro", "usdttodefi.net",
    "m-i.pro", "vipsolutionprivateltd.com", "vipsolutionprivate.com", "quaerocapital.pro", "vex-group.pro",
    "ordercast.city", "bigonejyc.top", "unifiedtrustb.online", "offvteam.shop", "s-systemsgroupltd.com",
    "angloadvies.online", "v-g.cc", "hoponline.cc", "shopfusion.vip", "bgshopp11.com", "bmfnvt.com", "soltechx.com",
    "maxtrademarket.com", "klbfteam.top", "scm-investment.com", "rjteam.cc", "kunacv.com", "rjteam.top",
    "trade.contract-group.cc", "user.curion-finance.info", "app-flutterlab.com", "interbrokers.trade",
    "interbrokers.pro", "pw20.com", "bigonea2.com", "gainvalley.com", "fppremium.com", "express-wallet.com",
    "tikmining.com", "mine-lab.biz", "cryptobrowser.site", "dnny.com", "cco-market.com", "imperialchange.com",
    "nod-exchanger.com", "bigonea.vip", "l3n.cam", "aipoolweb3.com", "investing24.com", "mine.anokas.tech",
    "esteltechnologies.world", "jaxxliberty.io", "zforex.com", "app.ntost.com", "marketmakers.cc", "vindateam.shop",
    "tostadon.com", "corpteck.com", "gs-company.pro", "activex.trademql5.com", "switchmarkets.com", "m.dwdfv.com",
    "flutterlab.net", "octeam.com", "consistcapital.com", "rockhillcapital.org", "zsline.com", "merixstudio.top",
    "mcuteam.top", "btczzcoins.cc", "mcateam.cc", "izalandos.com", "m.fsfwe.com", "trade.carat-company.cc",
    "bitcise.com", "hanbitsco.com", "hee34ee.com", "repaste.top", "repaste.cc", "tk849611.com", "bytecryptojo.top",
    "assemblyglobal.com", "shop1e.js-mn.com", "neweraiscoming.top", "link.makebig.money", "makebig.money",
    "esteltechnologies.ltd", "fadsteam.shop", "trade.cap-platform.cc", "fadsteam.top", "skillledgermf.top",
    "skillcrafting.top", "metamax.vip", "blocktasker.top", "ethweb1.vip", "ecateam.shop",
    "cryptocapital-investment.com", "okdefi19.xyz", "repaste.com", "cointaskproqz.top", "crescentcapitalmg.com",
    "facsteam.top", "trustcoin.vip", "tsh-portal.trade", "doex.com", "bigone.z11.web.core.windows.net",
    "shopbbob.com", "shoplieo.com", "capi-platform.co", "fadsteam.cc", "capi-invest.co", "xpoken.com",
    "coin-wealth-trade.org", "oniccapitals.com", "webtrader.makani.vc", "client.makani.vc",
    "user.atlas-finance.info", "akselinvest.ltd", "kku2uuqu.xyz", "skteam.shop", "site.cashbackoptimizer.com",
    "stocket.net", "tethermexm.com", "axexkku.com", "bigoneexchange.org", "bigonevip.org", "bigonea.org",
    "therealrealka.com", "agmunion.vip", "horizon-limited.group", "oeteam.shop", "octeam.shop", "naristech.com",
    "comp-cap.co", "t-capital.ltd", "avaloncapmark.org", "casseize.com", "explorefxtrades.live", "gfemarkets.com",
    "eth20vip.com", "a-in.cc", "e-f.pro", "drydenpartners.com", "freelancetrustfunds.com", "braiinsminer.com", "mbsos.com",
    "extremetechnology.live", "easymining.top", "edgefinance.ltd", "bybio2.vip", "zigeo.com", "vector-fin.com", "hermitage-holding.co",
    "homebosslife.org", "q-ca.cc", "g-inv.cc", "simplexswifttrade.com", "mirainvestments.ltd", "jumomall.com", "compasscapital.cc",
    "wh-c.cc", "btcetftoken.io", "xtradesness.com", "hfinvest.net", "vmlyrpro.com", "c-ca.cc", "bitcoin-sprint.com", "bitcoinsprint.io",
    "wiltonoptions.com", "wiltonoption.com", "omersfinance.ltd", "importcapital.cc", "tinder-miner.com", "trade.van-guard.eu"
];

export const CONTENT: Record<Lang, ContentStrings> = {
  bg: {
    header: {
      title: "Спри Измамата",
      subtitle: "Официален наръчник за защита на гражданите и инвеститорите",
      ctaList: "Черна листа",
      ctaRegisters: "Проверка на лиценз"
    },
    hero: {
      title: "Защитете своите спестявания от инвестиционни измами",
      description: "Вашият първи щит срещу финансови злоупотреби. Научете как да разпознавате фалшиви платформи и да инвестирате сигурно."
    },
    alert: {
      title: "Критично предупреждение",
      description: "Този портал използва данни от Дирекция 'Киберпрестъпност' при ГДБОП-МВР. Ако ви канят да инвестирате в сайт от черния списък, прекъснете връзката незабавно."
    },
    warningSigns: {
      title: "Признаци на измама",
      items: [
        { title: "Обещания за бърза печалба", desc: "Гарантирана висока доходност без риск е невъзможна. Измамниците показват фалшиви графики с 200-300% ръст за броени дни, за да ви подтикнат към действие." },
        { title: "Typosquatting (Грешни домейни)", desc: "Имитират известни брандове: microsoft.com става mircosoft.com; използват 'rn' вместо 'm' (amzon vs arnzon) или обратното." },
        { title: "Натиск за решение", desc: "Измамниците винаги бързат – 'офертата изтича сега'. Те не искат да имате време да проучите лиценза им или да се консултирате с експерт." },
        { title: "Фалшиви препоръки", desc: "Снимки на известни личности (Илон Мъск, Григор Димитров) в измамни реклами. Тези хора никога не са рекламирали подобни платформи." },
        { title: "Нестандартни плащания", desc: "Искат плащания само в криптовалута или банкови преводи към сметки на физически лица, вместо към корпоративни сметки на брокери." },
        { title: "Липса на прозрачност", desc: "Сайтът няма реален адрес, лиценз или данни за компанията. Ако информацията е скрита зад общи условия, вероятно е измама." }
      ],
      campaignLink: {
        text: "Кампания на КФН: Разпознай лицензирания инвестиционен посредник",
        url: "https://www.fsc.bg/za-potrebitelya/investiczionna-dejnost/razpoznay-litsenziraniya-investitsionen-posrednik/",
        linkText: "Към кампанията"
      }
    },
    schemes: {
      title: "Най-чести схеми",
      items: [
        { type: 'crypto', title: "Фалшива крипто търговия", desc: "Платформи с красиви графики, които показват фалшив баланс. Парите ви никога не се инвестират реално." },
        { type: 'stock', title: "Фалшива борса", desc: "Предлагат акции на Apple, Tesla или Amazon. Когато решите да теглите, ви искат 'такса за отблокиране'." },
        { type: 'recovery', title: "Измама за връщане на пари", desc: "Обаждат се след като сте били измамени, обещавайки помощ. Това е втора измама срещу същата жертва." }
      ]
    },
    technical: {
      title: "Технически маркери за внимание",
      broker: {
        title: "В комуникацията:",
        items: [
          "Ползват Gmail/Outlook вместо корпоративен имейл",
          "Искат отдалечен достъп през AnyDesk или TeamViewer",
          "Говорят български, но звънят от екзотични държави",
          "Ползват stock снимки за аватари"
        ]
      },
      platform: {
        title: "В платформата:",
        items: [
          "Балансът расте през уикенда (когато пазарите спят)",
          "Графиките никога не падат – само печалба",
          "Искат 'данък 27%' при опит за теглене",
          "Нереална доходност – 10% на ден"
        ]
      }
    },
    protection: {
      title: "Как да се предпазите",
      steps: [
        { title: "Защита на лични данни", desc: "Не предоставяйте лични данни, снимки на лични карти или банкова информация в непроверени сайтове, обещаващи награди, награди от реклами или томболи." },
        { title: "Двустепенна верификация (2FA)", desc: "Винаги активирайте 2FA за вашите банкови и финансови апликации. Това е най-сигурната бариера срещу неоторизиран достъп." },
        { title: "Сигурност на софтуера", desc: "Поддържайте актуална антивирусна програма и абсолютно избягвайте инсталирането на пиратски софтуер, който може да компрометира вашето устройство." },
        { title: "Пароли и Мениджъри", desc: "Използвайте уникални и сложни пароли за всяко приложение. Password Manager (мениджър на пароли) е най-добрият начин да ги съхранявате сигурно." },
        { title: "Доверие към брандове", desc: "Инвестирайте само чрез известни, лицензирани и международно разпознаваеми платформи. Проверявайте тяхната история и репутация." },
        { title: "Игнорирайте реклами", desc: "Не се доверявайте на реклами в социални мрежи или Google при търсене на думи като 'купуване на крипто' или 'бърза инвестиция'." }
      ]
    },
    registers: {
      title: "Официални регистри",
      sections: [
        {
          region: "🇧🇬 България",
          items: [
            { name: "КФН – Инвестиционни посредници", desc: "Регистър на лицензираните инвестиционни посредници в България.", link: "https://www.fsc.bg/investitsionna-deynost/spisatsi-podnadzorni-litsa/investitsionni-posrednitsi/", linkText: "Към КФН" },
            { name: "БНБ – Регистър по чл. 3а ЗКИ", desc: "Регистър на финансовите институции, поддържан от Българската народна банка.", link: "https://www.bnb.bg/RegistersAndServices/RSFIRegister/index.htm", linkText: "Към БНБ" },
            { name: "Търговски регистър (ТРРЮЛНЦ)", desc: "Проверка на регистрация на български фирми и юридически лица.", link: "https://portal.registryagency.bg/CR/reports/VerificationPersonOrg", linkText: "Към Търговски Регистър" }
          ]
        },
        {
          region: "🇪🇺 Европейски съюз",
          items: [
            { name: "ESMA – MiFID II Firms Database", desc: "Европейска база данни на лицензираните финансови посредници по MiFID II.", link: "https://registers.esma.europa.eu/publication/searchRegister?core=esma_registers_upreg", linkText: "Към ESMA" },
            { name: "ESMA – Interim MiCA Register", desc: "Временен регистър на доставчиците на криптоуслуги (CASP) по регламент MiCA.", link: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica#InterimMiCARegister", linkText: "Към MiCA" }
          ]
        },
        {
          region: "🌍 Международни регулатори",
          items: [
            { name: "FINRA BrokerCheck (САЩ)", desc: "Проверка на брокери и инвестиционни съветници в САЩ.", link: "https://brokercheck.finra.org/", linkText: "Към FINRA" },
            { name: "FCA Register (Великобритания)", desc: "Регистър на лицензираните финансови компании във Великобритания.", link: "https://register.fca.org.uk/s/", linkText: "Към FCA" },
            { name: "FINMA Register (Швейцария)", desc: "Регистър на лицензираните финансови институции в Швейцария.", link: "https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/", linkText: "Към FINMA" },
            { name: "SEC Investment Adviser (САЩ)", desc: "База данни на регулатора SEC за инвестиционни посредници.", link: "https://adviserinfo.sec.gov/", linkText: "Към SEC" },
            { name: "IOSCO I-SCAN", desc: "Международна мрежа за сигнали и предупреждения за финансови измами.", link: "https://www.iosco.org/i-scan/", linkText: "Към IOSCO" }
          ]
        }
      ]
    },
    faq: {
      title: "Често задавани въпроси",
      items: [
        { q: "Ако сайтът не е в списъка, безопасен ли е?", a: "НЕ! Списъкът не е изчерпателен. Нови сайтове се появяват ежедневно. Винаги проверявайте лиценза." },
        { q: "Какво означават скобите [ ] в имената?", a: "Вече не се използват в списъка за по-добра индексация, но по принцип се добавят от органите, за да направят линковете некликаеми." }
      ]
    },
    domains: {
      title: "Черна листа на домейни",
      notice: "Тези домейни са официално идентифицирани като измамни от ГДБОП.",
      placeholder: "Въведете домейн за проверка...",
      showing: "Показани",
      of: "от"
    },
    victim: {
      title: "Вече сте жертва? Действайте веднага!",
      steps: [
        "Спрете всякаква комуникация с измамниците",
        "Не правете повече плащания под никакъв предлог",
        "Информирайте своята банка незабавно",
        "Подайте сигнал в най-близкото РПУ или ГДБОП",
        "Запазете всички чатове, имейли и банкови преписки"
      ],
      emergencyNote: "НЕ ЧАКАЙТЕ. ВСЕКИ ЧАС Е ОТ ЗНАЧЕНИЕ ЗА ВЪЗСТАНОВЯВАНЕТО НА СРЕДСТВАТА."
    },
    footer: {
      legal: "Правна информация",
      disclaimer: "Сайтът е с превантивна цел. Данните са от официалния сайт на ГДБОП-МВР. Сайтът не носи отговорност за индивидуални инвестиционни решения."
    },
    phishing: {
      title: "Фишинг Детектор",
      description: "Автоматично засечени фишинг домейни, насочени към български потребители. Данните се актуализират в реално време от нашия скенер.",
      placeholder: "Търсене на фишинг домейн...",
      detectionDate: "Засечен на",
      source: "Източник: github.com/Cyb3r-Pony",
      noResults: "Няма намерени резултати",
      entries: "Засечени"
    }
  },
  en: {
    header: {
      title: "Stop The Scam",
      subtitle: "Official Security Guide for Citizens and Investors",
      ctaList: "Blacklist",
      ctaRegisters: "Verify License"
    },
    hero: {
      title: "Protect Your Savings from Investment Fraud",
      description: "Your primary shield against financial abuse. Learn to recognize fraudulent platforms and invest securely."
    },
    alert: {
      title: "Critical Warning",
      description: "This portal uses official data from the Cybercrime Directorate of GDCOC-Ministry of Interior. If invited to invest via a site on the blacklist, terminate communication immediately."
    },
    warningSigns: {
      title: "Warning Signs",
      items: [
        { title: "Promises of Quick Profit", desc: "Guaranteed high returns without risk are impossible. Scammers often show fake charts with 200-300% growth." },
        { title: "Typosquatting", desc: "Imitating famous brands: microsoft.com becomes mircosoft.com; using 'rn' instead of 'm' or vice versa to mislead." },
        { title: "Pressure to Decide", desc: "Scammers are always in a hurry – 'offer expires now'. They don't want you to have time to research or consult others." },
        { title: "Fake Testimonials", desc: "AI-generated or stolen photos of celebrities (Elon Musk) in ads. These people have no connection to these platforms." },
        { title: "Unusual Payments", desc: "Requests for crypto-only payments or bank transfers to personal accounts rather than corporate ones." },
        { title: "Lack of Transparency", desc: "No physical address, license info, or registration details. If the info is hidden, it's a red flag." }
      ],
      campaignLink: {
        text: "FSC Campaign: \"Recognize the Licensed Investment Intermediary\"",
        url: "https://www.fsc.bg/za-potrebitelya/investiczionna-dejnost/razpoznay-litsenziraniya-investitsionen-posrednik/",
        linkText: "View Campaign"
      }
    },
    schemes: {
      title: "Common Scam Schemes",
      items: [
        { type: 'crypto', title: "Fake Crypto Trading", desc: "Platforms with fake charts showing massive growth. Your money is never actually invested." },
        { type: 'stock', title: "Fake Stock Exchange", desc: "Offering Apple/Tesla stocks. They later demand 'unlocking fees' to withdraw funds." },
        { type: 'recovery', title: "Recovery Scams", desc: "Someone calls promising to recover your lost money for a fee. It's a second scam targeting the same victim." }
      ]
    },
    technical: {
      title: "Technical Red Flags",
      broker: {
        title: "Communication:",
        items: [
          "Using Gmail/Outlook instead of professional email",
          "Demanding remote access via AnyDesk or TeamViewer",
          "Speaking your language but calling from abroad",
          "Using stock photos for profile pictures"
        ]
      },
      platform: {
        title: "On the platform:",
        items: [
          "Balance grows during weekends (when markets are closed)",
          "Charts never drop – only profit shown",
          "Demanding '27% tax' during withdrawal attempts",
          "Unrealistic yields like 10% per day"
        ]
      }
    },
    protection: {
      title: "How to Protect Yourself",
      steps: [
        { title: "Data Protection", desc: "Never provide personal data, ID copies, or banking info to unverified sites promising awards or prizes from ads/lotteries." },
        { title: "Two-Step Verification (2FA)", desc: "Always enable 2FA for all your banking and financial applications. It's the strongest barrier against hackers." },
        { title: "Software Security", desc: "Use up-to-date antivirus software and strictly avoid pirated software, which can contain hidden threats like keyloggers." },
        { title: "Passwords & Managers", desc: "Use unique, complex passwords for every important account. A Password Manager is the safest way to store them." },
        { title: "Trust Verified Brands", desc: "Only invest through known, licensed, and internationally recognized financial institutions. Check their history." },
        { title: "Ignore Search Ads", desc: "Don't trust social media ads or Google recommended results for keywords like 'buy crypto' or 'quick investment'." }
      ]
    },
    registers: {
      title: "Official Registers",
      sections: [
        {
          region: "🇧🇬 Bulgaria",
          items: [
            { name: "FSC – Investment Intermediaries", desc: "Complete register of licensed entities in Bulgaria.", link: "https://www.fsc.bg/investitsionna-deynost/spisatsi-podnadzorni-litsa/investitsionni-posrednitsi/", linkText: "To FSC" },
            { name: "BNB – Financial Institutions", desc: "Register under Art. 3a of the Law on Credit Institutions.", link: "https://www.bnb.bg/RegistersAndServices/RSFIRegister/index.htm", linkText: "To BNB" },
            { name: "Commercial Register (TR)", desc: "Verification of registration for Bulgarian legal entities.", link: "https://portal.registryagency.bg/CR/reports/VerificationPersonOrg", linkText: "To Commercial Register" }
          ]
        },
        {
          region: "🇪🇺 European Union",
          items: [
            { name: "ESMA – MiFID II Database", desc: "EU-wide database of licensed financial intermediaries under MiFID II.", link: "https://registers.esma.europa.eu/publication/searchRegister?core=esma_registers_upreg", linkText: "To ESMA" },
            { name: "ESMA – Interim MiCA Register", desc: "Register of Crypto-Asset Service Providers (CASP) under MiCA regulation.", link: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica#InterimMiCARegister", linkText: "To MiCA" }
          ]
        },
        {
          region: "🌍 International Regulators",
          items: [
            { name: "FINRA BrokerCheck (USA)", desc: "Check brokers and investment advisors in the USA.", link: "https://brokercheck.finra.org/", linkText: "To FINRA" },
            { name: "FCA Register (UK)", desc: "Register of licensed financial companies in the United Kingdom.", link: "https://register.fca.org.uk/s/", linkText: "To FCA" },
            { name: "FINMA Register (CH)", desc: "Register of licensed financial institutions in Switzerland.", link: "https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/", linkText: "To FINMA" },
            { name: "SEC IAPD (USA)", desc: "SEC database for investment intermediaries and advisors.", link: "https://adviserinfo.sec.gov/", linkText: "To SEC" },
            { name: "IOSCO I-SCAN", desc: "International network for financial fraud signals and alerts.", link: "https://www.iosco.org/i-scan/", linkText: "To IOSCO" }
          ]
        }
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "If a site is not on the list, is it safe?", a: "NO! The list is not exhaustive. New sites appear daily. Always verify the license first." },
        { q: "What do the [ ] brackets mean?", a: "They are no longer used for indexing purposes, but typically added by police to prevent accidental clicks." }
      ]
    },
    domains: {
      title: "Domain Blacklist",
      notice: "These domains are officially identified as fraudulent by the GDCOC-MoI.",
      placeholder: "Enter domain to check...",
      showing: "Showing",
      of: "of"
    },
    victim: {
      title: "Already a victim? Act now!",
      steps: [
        "Stop all communication with scammers",
        "Do not make any further payments",
        "Inform your bank immediately",
        "Report to the nearest police station or GDCOC",
        "Keep all chats, emails, and bank receipts"
      ],
      emergencyNote: "DO NOT WAIT. EVERY HOUR COUNTS IN FINANCIAL RECOVERY."
    },
    footer: {
      legal: "Legal Info",
      disclaimer: "Informational purpose only. Data from official GDCOC-MoI sources. We are not responsible for individual financial decisions."
    },
    phishing: {
      title: "Phishing Detector",
      description: "Automatically detected phishing domains targeting Bulgarian users. Data is updated in real-time from our scanner.",
      placeholder: "Search phishing domain...",
      detectionDate: "Detected on",
      source: "Source: github.com/Cyb3r-Pony",
      noResults: "No results found",
      entries: "Detected"
    }
  },
  de: {
    header: {
      title: "Stopp den Betrug",
      subtitle: "Offizieller Sicherheitsleitfaden zum Schutz von Anlegern",
      ctaList: "Schwarze Liste",
      ctaRegisters: "Lizenz pruefen"
    },
    hero: {
      title: "Schuetzen Sie Ihre Ersparnisse vor Anlagebetrug",
      description: "Ihr erster Schutzschild gegen Finanzbetrug. Lernen Sie, betruegerische Plattformen zu erkennen und sicher zu investieren."
    },
    alert: {
      title: "Kritische Warnung",
      description: "Dieses Portal verwendet offizielle Daten der Direktion Cyberkriminalitaet des bulgarischen Innenministeriums. Wenn Sie aufgefordert werden, ueber eine Seite auf der schwarzen Liste zu investieren, brechen Sie den Kontakt sofort ab."
    },
    warningSigns: {
      title: "Warnzeichen",
      items: [
        { title: "Versprechen schneller Gewinne", desc: "Garantiert hohe Renditen ohne Risiko sind unmoeglich. Betrueger zeigen gefaelschte Diagramme mit 200-300% Wachstum." },
        { title: "Typosquatting (falsche Domains)", desc: "Bekannte Marken werden imitiert: microsoft.com wird zu mircosoft.com; 'rn' wird statt 'm' verwendet, um zu taeuschen." },
        { title: "Entscheidungsdruck", desc: "Betrueger draengen immer zur Eile – 'das Angebot laeuft jetzt ab'. Sie wollen nicht, dass Sie Zeit haben, die Lizenz zu pruefen." },
        { title: "Gefaelschte Empfehlungen", desc: "KI-generierte oder gestohlene Fotos von Prominenten (Elon Musk) in Werbung. Diese Personen haben keine Verbindung zu diesen Plattformen." },
        { title: "Unuebliche Zahlungsmethoden", desc: "Nur Krypto-Zahlungen oder Bankueberweisungen auf Privatkonten statt auf Firmenkonten von lizenzierten Brokern." },
        { title: "Fehlende Transparenz", desc: "Keine physische Adresse, keine Lizenzinformationen oder Registrierungsdaten. Wenn die Informationen verborgen sind, ist es ein Warnsignal." }
      ],
      campaignLink: {
        text: "FSC-Kampagne: Den lizenzierten Anlagevermittler erkennen",
        url: "https://www.fsc.bg/za-potrebitelya/investiczionna-dejnost/razpoznay-litsenziraniya-investitsionen-posrednik/",
        linkText: "Zur Kampagne"
      }
    },
    schemes: {
      title: "Haeufigste Betrugsmaschen",
      items: [
        { type: 'crypto', title: "Gefaelschter Kryptohandel", desc: "Plattformen mit gefaelschten Diagrammen und massivem Wachstum. Ihr Geld wird nie tatsaechlich investiert." },
        { type: 'stock', title: "Gefaelschte Boerse", desc: "Angebote fuer Apple-/Tesla-Aktien. Spaeter verlangen sie 'Freischaltungsgebuehren' fuer Auszahlungen." },
        { type: 'recovery', title: "Rueckgewinnungsbetrug", desc: "Jemand ruft an und verspricht, Ihr verlorenes Geld zurueckzuholen – gegen eine Gebuehr. Es ist ein zweiter Betrug am selben Opfer." }
      ]
    },
    technical: {
      title: "Technische Warnhinweise",
      broker: {
        title: "In der Kommunikation:",
        items: [
          "Verwendung von Gmail/Outlook statt professioneller E-Mail",
          "Fernzugriff ueber AnyDesk oder TeamViewer wird verlangt",
          "Sprechen Ihre Sprache, rufen aber aus dem Ausland an",
          "Verwendung von Stock-Fotos als Profilbilder"
        ]
      },
      platform: {
        title: "Auf der Plattform:",
        items: [
          "Guthaben waechst am Wochenende (wenn die Maerkte geschlossen sind)",
          "Diagramme fallen nie – nur Gewinn wird angezeigt",
          "Forderung von '27% Steuer' bei Auszahlungsversuchen",
          "Unrealistische Renditen wie 10% pro Tag"
        ]
      }
    },
    protection: {
      title: "So schuetzen Sie sich",
      steps: [
        { title: "Datenschutz", desc: "Geben Sie niemals persoenliche Daten, Ausweiskopien oder Bankdaten auf unverifizierten Seiten an, die Preise oder Gewinne versprechen." },
        { title: "Zwei-Faktor-Authentifizierung (2FA)", desc: "Aktivieren Sie immer 2FA fuer alle Ihre Bank- und Finanzanwendungen. Dies ist die staerkste Barriere gegen Hacker." },
        { title: "Software-Sicherheit", desc: "Verwenden Sie aktuelle Antivirensoftware und vermeiden Sie unbedingt Raubkopien, die versteckte Bedrohungen enthalten koennen." },
        { title: "Passwoerter & Manager", desc: "Verwenden Sie einzigartige, komplexe Passwoerter fuer jedes Konto. Ein Passwort-Manager ist der sicherste Weg, sie zu speichern." },
        { title: "Vertrauenswuerdige Marken", desc: "Investieren Sie nur ueber bekannte, lizenzierte und international anerkannte Finanzinstitute. Pruefen Sie deren Geschichte." },
        { title: "Werbung ignorieren", desc: "Vertrauen Sie keinen Anzeigen in sozialen Medien oder Google-Ergebnissen fuer Begriffe wie 'Krypto kaufen' oder 'schnelle Investition'." }
      ]
    },
    registers: {
      title: "Offizielle Register",
      sections: [
        {
          region: "🇧🇬 Bulgarien",
          items: [
            { name: "KFN – Anlagevermittler", desc: "Vollstaendiges Register der lizenzierten Anlagevermittler in Bulgarien.", link: "https://www.fsc.bg/investitsionna-deynost/spisatsi-podnadzorni-litsa/investitsionni-posrednitsi/", linkText: "Zur KFN" },
            { name: "BNB – Finanzinstitute", desc: "Register gemaess Art. 3a des Kreditinstitutsgesetzes.", link: "https://www.bnb.bg/RegistersAndServices/RSFIRegister/index.htm", linkText: "Zur BNB" },
            { name: "Handelsregister (TR)", desc: "Ueberpruefung der Registrierung bulgarischer juristischer Personen.", link: "https://portal.registryagency.bg/CR/reports/VerificationPersonOrg", linkText: "Zum Handelsregister" }
          ]
        },
        {
          region: "🇪🇺 Europaeische Union",
          items: [
            { name: "ESMA – MiFID-II-Datenbank", desc: "EU-weite Datenbank lizenzierter Finanzvermittler nach MiFID II.", link: "https://registers.esma.europa.eu/publication/searchRegister?core=esma_registers_upreg", linkText: "Zur ESMA" },
            { name: "ESMA – MiCA-Uebergangsregister", desc: "Register der Krypto-Dienstleister (CASP) gemaess MiCA-Verordnung.", link: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica#InterimMiCARegister", linkText: "Zu MiCA" }
          ]
        },
        {
          region: "🌍 Internationale Regulierungsbehoerden",
          items: [
            { name: "FINRA BrokerCheck (USA)", desc: "Ueberpruefung von Brokern und Anlageberatern in den USA.", link: "https://brokercheck.finra.org/", linkText: "Zur FINRA" },
            { name: "FCA Register (GB)", desc: "Register lizenzierter Finanzunternehmen in Grossbritannien.", link: "https://register.fca.org.uk/s/", linkText: "Zur FCA" },
            { name: "FINMA Register (CH)", desc: "Register lizenzierter Finanzinstitute in der Schweiz.", link: "https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/", linkText: "Zur FINMA" },
            { name: "SEC IAPD (USA)", desc: "SEC-Datenbank fuer Anlagevermittler und -berater.", link: "https://adviserinfo.sec.gov/", linkText: "Zur SEC" },
            { name: "IOSCO I-SCAN", desc: "Internationales Netzwerk fuer Warnsignale bei Finanzbetrug.", link: "https://www.iosco.org/i-scan/", linkText: "Zu IOSCO" }
          ]
        }
      ]
    },
    faq: {
      title: "Haeufig gestellte Fragen",
      items: [
        { q: "Wenn eine Seite nicht auf der Liste steht, ist sie dann sicher?", a: "NEIN! Die Liste ist nicht vollstaendig. Taeglich erscheinen neue Seiten. Pruefen Sie immer zuerst die Lizenz." },
        { q: "Was bedeuten die eckigen Klammern [ ]?", a: "Sie werden nicht mehr fuer die Indexierung verwendet, wurden aber urspruenglich von der Polizei hinzugefuegt, um versehentliche Klicks zu verhindern." }
      ]
    },
    domains: {
      title: "Schwarze Liste der Domains",
      notice: "Diese Domains wurden offiziell vom GDBOP-MdI als betruegerisch identifiziert.",
      placeholder: "Domain zur Pruefung eingeben...",
      showing: "Angezeigt",
      of: "von"
    },
    victim: {
      title: "Bereits betroffen? Handeln Sie sofort!",
      steps: [
        "Beenden Sie jegliche Kommunikation mit den Betruegern",
        "Leisten Sie keine weiteren Zahlungen",
        "Informieren Sie sofort Ihre Bank",
        "Erstatten Sie Anzeige bei der naechsten Polizeidienststelle oder dem GDBOP",
        "Bewahren Sie alle Chats, E-Mails und Bankunterlagen auf"
      ],
      emergencyNote: "WARTEN SIE NICHT. JEDE STUNDE ZAEHLT BEI DER RUECKGEWINNUNG IHRER GELDER."
    },
    footer: {
      legal: "Rechtliche Hinweise",
      disclaimer: "Nur zu Informationszwecken. Daten aus offiziellen Quellen des GDBOP-MdI. Wir uebernehmen keine Verantwortung fuer individuelle Finanzentscheidungen."
    },
    phishing: {
      title: "Phishing-Detektor",
      description: "Automatisch erkannte Phishing-Domains, die auf bulgarische Nutzer abzielen. Die Daten werden in Echtzeit von unserem Scanner aktualisiert.",
      placeholder: "Phishing-Domain suchen...",
      detectionDate: "Erkannt am",
      source: "Quelle: github.com/Cyb3r-Pony",
      noResults: "Keine Ergebnisse gefunden",
      entries: "Erkannt"
    }
  }
};