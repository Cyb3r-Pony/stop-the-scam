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
        { title: "Липса на прозрачност", desc: "Сайтът няма реален адрес, лиценз или данни за компанията. Ако информацията е скрита зад общи условия, вероятно е измама." },
        { title: "Социално инженерство", desc: "Измамниците ви манипулират чрез ласкавост, фалшиво приятелство или романтика. Те изграждат доверие, преди да поискат пари или лични данни." },
        { title: "Изолиране от близки", desc: "Предупреждават ви да не се консултирате с роднини, приятели или експерти. Целта е да няма кой да ви спре от \"инвестицията\"." },
        { title: "Измами за \"възстановяване\"", desc: "След като сте загубили пари, ви се обаждат с обещание да ги върнат срещу заплащане. Това е повторна измама, насочена към същата жертва." },
        { title: "Фалшиви лицензи", desc: "Показват ви фалшиви сертификати от регулатори (КФН, FCA, CySEC). Винаги проверявайте лиценза директно в официалните регистри." },
        { title: "Тактика \"малка печалба\"", desc: "Позволяват ви да изтеглите малка сума, за да спечелят доверието ви. След това поискват значително по-голяма инвестиция, която никога няма да върнат." },
        { title: "Непоискан контакт", desc: "Свързват се с вас без повод чрез телефон, социални мрежи или месинджър. Легитимни брокери не правят студени обаждания с обещания за бързи печалби." }
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
    scamTypes: {
      title: "Най-разпространени финансови измами",
      subtitle: "Познаването на различните видове измами е първата стъпка към вашата защита",
      items: [
        { title: "Инвестиционни измами", desc: "Фалшиви платформи за търговия с форекс, акции или стоки. Обещават нереалистична доходност и показват фалшиви графики на печалба. Парите ви никога не се инвестират реално.", example: "Получавате обаждане от \"брокер\" на IG Markets, но сайтът е ig-markets-pro.com вместо истинския igmarkets.com." },
        { title: "Компрометиране на бизнес имейл (BEC)", desc: "Измамниците имитират ръководители или бизнес партньори чрез фалшиви или компрометирани имейли. Нареждат спешен превод към \"нова сметка\" на доставчик.", example: "Имейл от \"шефа\" с молба да преведете 50 000 лв. към нова сметка за спешна сделка. Имейлът изглежда автентичен, но адресът е леко променен." },
        { title: "Романтични измами", desc: "Изграждат фалшива романтична връзка онлайн в продължение на седмици или месеци. След като спечелят доверието ви, молят за пари поради \"спешен случай\".", example: "Нов познат от приложение за запознанства казва, че е заседнал в чужбина и се нуждае от пари за самолетен билет или медицинско лечение." },
        { title: "Крипто измами", desc: "Фалшиви крипто борси, DeFi проекти и \"pump-and-dump\" схеми. Обещават бързо обогатяване чрез нови токени, mining платформи или \"уникални\" инвестиционни възможности.", example: "Реклама в социални мрежи за \"Нов Bitcoin ETF с 500% гарантирана печалба\" води към фалшив сайт, имитиращ истинска борса." },
        { title: "Фишинг", desc: "Фалшиви уебсайтове или имейли, копиращи банки, доставчици или институции. Целят кражба на пароли, лични данни или банкова/финансова информация.", example: "Имейл от \"Вашата банка\" с линк за \"потвърждение на профила\" води към идентичен, но фалшив сайт, който краде вашите данни за вход." },
        { title: "Зловредни прикачени файлове", desc: "Имейли с прикачени .pdf, .docx или .exe файлове, съдържащи malware (зловреден софтуер). При отваряне инфектират устройството ви с keylogger, ransomware или троянец.", example: "Имейл \"Фактура от DHL\" или \"Документ от НАП\" с прикачен ZIP файл, който при отваряне инсталира keylogger на компютъра ви." },
        { title: "SMS фишинг (Smishing)", desc: "Фалшиви SMS съобщения от банки, куриерски фирми или данъчни служби. Съдържат линкове към фалшиви сайтове за кражба на лични и финансови данни.", example: "SMS \"Пратката ви е задържана, заплатете 2.99 лв. тук:\" с линк към фалшив сайт на Еконт или Спиди, който краде данните на банковата ви карта." },
        { title: "Измами в месинджъри", desc: "Фалшиви инвестиционни групи в WhatsApp, Viber или Telegram. Примамват с обещания за високоплатена дистанционна работа, или се свързват за \"купуване\" на обявен от вас артикул.", example: "Покана за Telegram група \"VIP Инвестиции\" с фалшиви скрийншоти на печалби, или съобщение за \"купуване\" на вашата обява в OLX с линк към фалшива страница." },
        { title: "Малуер (зловреден софтуер)", desc: "Троянски коне, рансъмуер, шпионски софтуер. Разпространяват се чрез пиратски софтуер, фалшиви реклами, компрометирани сайтове или злонамерени прикачени файлове.", example: "Изтегляте \"безплатен\" Photoshop от торент сайт, а вместо него получавате банков троянец, който краде паролите и финансовите ви данни." },
        { title: "Неоторизиран отдалечен достъп", desc: "Измамници получават достъп до компютъра ви чрез фишинг, изтекли/откраднати пароли или злонамерени файлове. След това инсталират AnyDesk или TeamViewer за пълен контрол.", example: "\"Техническа поддръжка на Microsoft\" ви звъни и моли да инсталирате AnyDesk, за да \"поправят проблем\". След като получат достъп, крадат данни или инсталират malware." }
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
        { title: "Игнорирайте реклами", desc: "Не се доверявайте на реклами в социални мрежи или Google при търсене на думи като 'купуване на крипто' или 'бърза инвестиция'." },
        { title: "Проверявайте линкове", desc: "Преди да кликнете, задръжте курсора върху линка за да видите реалния URL адрес. Не отваряйте линкове от непознати имейли, SMS или съобщения в месинджъри." },
        { title: "Редовни актуализации", desc: "Поддържайте операционната система, браузъра и приложенията актуални. Обновленията за сигурност поправят известни уязвимости, използвани от хакери." },
        { title: "Архивиране на данни", desc: "Правете редовни резервни копия (backup) на важните си файлове на външен диск или облачно хранилище. Това е защита срещу рансъмуер и загуба на данни." },
        { title: "Следете банковите извлечения", desc: "Проверявайте редовно извлеченията на банковите си сметки и кредитни карти за неоторизирани транзакции. При съмнение информирайте банката незабавно." },
        { title: "Защитете Wi-Fi мрежата", desc: "Използвайте силна парола за домашния Wi-Fi. Избягвайте публични Wi-Fi мрежи за банкови операции или въвеждане на пароли." },
        { title: "Образовайте близките си", desc: "Споделяйте знанията за измами с възрастни роднини и деца, които са по-уязвими. Един разговор може да предотврати загуба на хиляди левове." }
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
      disclaimer: "Сайтът е с превантивна цел. Данните са от официалния сайт на ГДБОП-МВР. Сайтът не носи отговорност за индивидуални инвестиционни решения.",
      officialLinks: [
        { name: "Дирекция \"Киберпрестъпност\"", url: "https://cybercrime.bg" },
        { name: "ГДБОП - Главна дирекция \"Борба с организираната престъпност\"", url: "https://gdbop.bg" }
      ]
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
      description: "This portal uses official data from the Cybercrime Directorate of GDCOC (General Directorate Combating Organised Crime), Bulgarian Ministry of Interior. If invited to invest via a site on the blacklist, terminate communication immediately."
    },
    warningSigns: {
      title: "Warning Signs",
      items: [
        { title: "Promises of Quick Profit", desc: "Guaranteed high returns without risk are impossible. Scammers often show fake charts with 200-300% growth." },
        { title: "Typosquatting", desc: "Imitating famous brands: microsoft.com becomes mircosoft.com; using 'rn' instead of 'm' or vice versa to mislead." },
        { title: "Pressure to Decide", desc: "Scammers are always in a hurry – 'offer expires now'. They don't want you to have time to research or consult others." },
        { title: "Fake Testimonials", desc: "AI-generated or stolen photos of celebrities (Elon Musk) in ads. These people have no connection to these platforms." },
        { title: "Unusual Payments", desc: "Requests for crypto-only payments or bank transfers to personal accounts rather than corporate ones." },
        { title: "Lack of Transparency", desc: "No physical address, license info, or registration details. If the info is hidden, it's a red flag." },
        { title: "Social Engineering", desc: "Scammers manipulate through flattery, fake friendship, or romance. They build trust over time before requesting money or personal data." },
        { title: "Isolation from Others", desc: "They warn you not to consult family, friends, or financial experts. The goal is to prevent anyone from stopping your \"investment\"." },
        { title: "\"Recovery\" Scams", desc: "After you've lost money, someone contacts you promising to recover your funds for a fee. It's a second scam targeting the same victim." },
        { title: "Fake Regulatory Approval", desc: "They show fake certificates from regulators (FSC, FCA, CySEC). Always verify licenses directly through official registers." },
        { title: "\"Small Win\" Tactic", desc: "They allow you to withdraw a small amount to build trust. Then they request a significantly larger deposit that you'll never get back." },
        { title: "Unsolicited Contact", desc: "They reach out to you uninvited via phone, social media, or messaging apps. Legitimate brokers don't make cold calls promising quick profits." }
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
    scamTypes: {
      title: "Most Common Financial Scams",
      subtitle: "Knowing the different types of scams is the first step toward protecting yourself",
      items: [
        { title: "Investment Fraud", desc: "Fake platforms for trading forex, stocks, or commodities. They promise unrealistic returns and show fabricated profit charts. Your money is never actually invested.", example: "You receive a call from a \"broker\" at IG Markets, but the website is ig-markets-pro.com instead of the real igmarkets.com." },
        { title: "Business Email Compromise (BEC)", desc: "Scammers impersonate executives or business partners via spoofed or compromised emails. They request urgent wire transfers to \"new supplier accounts\".", example: "An email from your \"CEO\" asking you to transfer $50,000 to a new account for an urgent deal. The email looks authentic but the address is slightly altered." },
        { title: "Romance Scams", desc: "They build a fake romantic relationship online over weeks or months. After gaining your trust, they ask for money due to an \"emergency\".", example: "A new acquaintance from a dating app says they're stranded abroad and need money for a plane ticket or medical treatment." },
        { title: "Crypto Investment Scams", desc: "Fake crypto exchanges, DeFi projects, and pump-and-dump schemes. They promise quick wealth through new tokens, mining platforms, or \"exclusive\" investment opportunities.", example: "Social media ad for a \"New Bitcoin ETF with 500% guaranteed returns\" leads to a fake website mimicking a real exchange." },
        { title: "Phishing", desc: "Fake websites or emails mimicking banks, delivery services, or institutions. They aim to steal passwords, personal data, or banking/financial information.", example: "Email from \"Your Bank\" with a link to \"verify your profile\" leads to an identical but fraudulent site that steals your login credentials." },
        { title: "Malicious Email Attachments", desc: "Emails with .pdf, .docx, or .exe attachments containing malware. Opening them infects your device with keyloggers, ransomware, or trojans.", example: "Email titled \"Invoice from DHL\" or \"Tax Document\" with a ZIP attachment that installs a keylogger on your computer when opened." },
        { title: "SMS Phishing (Smishing)", desc: "Fake SMS messages from banks, courier services, or tax authorities. They contain links to fraudulent sites designed to steal your personal and financial data.", example: "SMS \"Your package is held, pay $2.99 here:\" with a link to a fake courier website that steals your card details." },
        { title: "Messaging App Scams", desc: "Fake investment groups on WhatsApp, Viber, or Telegram. They lure victims with promises of high-paying remote jobs, or contact you about \"buying\" items you've listed for sale.", example: "Telegram group invite for \"VIP Investments\" with fake profit screenshots, or a message about \"buying\" your online listing via a fake payment page." },
        { title: "Malware", desc: "Trojans, ransomware, spyware. Spread through pirated software, fake advertisements, compromised websites, or malicious email attachments.", example: "You download \"free\" Photoshop from a torrent site, but instead receive a banking trojan that steals your passwords and financial data." },
        { title: "Unauthorized Remote Access", desc: "Scammers gain access to your PC via phishing, leaked/stolen credentials, or malicious files. They then install AnyDesk or TeamViewer for full control over your device.", example: "\"Microsoft Tech Support\" calls and asks you to install AnyDesk to \"fix a problem\". Once they have access, they steal data or install malware." }
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
        { title: "Ignore Search Ads", desc: "Don't trust social media ads or Google recommended results for keywords like 'buy crypto' or 'quick investment'." },
        { title: "Verify Before You Click", desc: "Hover over links to check the real URL before clicking. Never open links from unknown emails, SMS, or messenger messages." },
        { title: "Regular Software Updates", desc: "Keep your operating system, browser, and apps up to date. Security patches fix known vulnerabilities exploited by hackers." },
        { title: "Back Up Your Data", desc: "Make regular backups of important files to an external drive or cloud storage. This protects against ransomware and data loss." },
        { title: "Monitor Bank Statements", desc: "Regularly check your bank and credit card statements for unauthorized transactions. If anything looks suspicious, contact your bank immediately." },
        { title: "Secure Your Wi-Fi", desc: "Use a strong password for your home Wi-Fi. Avoid public Wi-Fi networks for banking operations or entering passwords." },
        { title: "Educate Your Family", desc: "Share scam awareness with elderly relatives and children who may be more vulnerable. One conversation can prevent thousands in losses." }
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
      notice: "These domains are officially identified as fraudulent by GDCOC (General Directorate Combating Organised Crime), Bulgarian Ministry of Interior.",
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
        "Report to the nearest police station or GDCOC (General Directorate Combating Organised Crime, Bulgaria)",
        "Keep all chats, emails, and bank receipts"
      ],
      emergencyNote: "DO NOT WAIT. EVERY HOUR COUNTS IN FINANCIAL RECOVERY."
    },
    footer: {
      legal: "Legal Info",
      disclaimer: "Informational purpose only. Data from official GDCOC (General Directorate Combating Organised Crime), Bulgarian Ministry of Interior sources. We are not responsible for individual financial decisions.",
      officialLinks: [
        { name: "Cybercrime Directorate (Bulgaria)", url: "https://cybercrime.bg" },
        { name: "GDCOC - General Directorate Combating Organised Crime (Bulgaria)", url: "https://gdbop.bg" }
      ]
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
      description: "Dieses Portal verwendet offizielle Daten der Direktion Cyberkriminalitaet des GDBOP (Generaldirektion zur Bekaempfung der Organisierten Kriminalitaet), bulgarisches Innenministerium. Wenn Sie aufgefordert werden, ueber eine Seite auf der schwarzen Liste zu investieren, brechen Sie den Kontakt sofort ab."
    },
    warningSigns: {
      title: "Warnzeichen",
      items: [
        { title: "Versprechen schneller Gewinne", desc: "Garantiert hohe Renditen ohne Risiko sind unmoeglich. Betrueger zeigen gefaelschte Diagramme mit 200-300% Wachstum." },
        { title: "Typosquatting (falsche Domains)", desc: "Bekannte Marken werden imitiert: microsoft.com wird zu mircosoft.com; 'rn' wird statt 'm' verwendet, um zu taeuschen." },
        { title: "Entscheidungsdruck", desc: "Betrueger draengen immer zur Eile – 'das Angebot laeuft jetzt ab'. Sie wollen nicht, dass Sie Zeit haben, die Lizenz zu pruefen." },
        { title: "Gefaelschte Empfehlungen", desc: "KI-generierte oder gestohlene Fotos von Prominenten (Elon Musk) in Werbung. Diese Personen haben keine Verbindung zu diesen Plattformen." },
        { title: "Unuebliche Zahlungsmethoden", desc: "Nur Krypto-Zahlungen oder Bankueberweisungen auf Privatkonten statt auf Firmenkonten von lizenzierten Brokern." },
        { title: "Fehlende Transparenz", desc: "Keine physische Adresse, keine Lizenzinformationen oder Registrierungsdaten. Wenn die Informationen verborgen sind, ist es ein Warnsignal." },
        { title: "Social Engineering", desc: "Betrueger manipulieren durch Schmeichelei, vorgetaeuschte Freundschaft oder Romantik. Sie bauen Vertrauen auf, bevor sie Geld oder persoenliche Daten verlangen." },
        { title: "Isolation von anderen", desc: "Sie warnen Sie davor, Familie, Freunde oder Finanzexperten zu konsultieren. Das Ziel ist, niemanden an Ihrer \"Investition\" zweifeln zu lassen." },
        { title: "\"Rueckgewinnungs\"-Betrug", desc: "Nachdem Sie Geld verloren haben, kontaktiert Sie jemand und verspricht, Ihr Geld gegen eine Gebuehr zurueckzuholen. Es ist ein zweiter Betrug am selben Opfer." },
        { title: "Gefaelschte Lizenzen", desc: "Sie zeigen gefaelschte Zertifikate von Regulierungsbehoerden (FSC, FCA, CySEC). Ueberpruefen Sie Lizenzen immer direkt in offiziellen Registern." },
        { title: "\"Kleiner Gewinn\"-Taktik", desc: "Sie erlauben eine kleine Auszahlung, um Vertrauen aufzubauen. Dann fordern sie eine deutlich groessere Einzahlung, die Sie nie zurueckbekommen." },
        { title: "Unaufgeforderte Kontaktaufnahme", desc: "Sie melden sich ungefragt per Telefon, Social Media oder Messenger-Apps. Serioese Broker machen keine Kaltakquise mit Versprechen schneller Gewinne." }
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
    scamTypes: {
      title: "Die haeufigsten Finanzbetrugsarten",
      subtitle: "Das Wissen ueber verschiedene Betrugsarten ist der erste Schritt zu Ihrem Schutz",
      items: [
        { title: "Anlagebetrug", desc: "Gefaelschte Plattformen fuer den Handel mit Forex, Aktien oder Rohstoffen. Sie versprechen unrealistische Renditen und zeigen gefaelschte Gewinndiagramme. Ihr Geld wird nie tatsaechlich investiert.", example: "Sie erhalten einen Anruf von einem \"Broker\" bei IG Markets, aber die Website ist ig-markets-pro.com statt der echten igmarkets.com." },
        { title: "Business-E-Mail-Betrug (BEC)", desc: "Betrueger geben sich per gefaelschter oder kompromittierter E-Mail als Fuehrungskraefte oder Geschaeftspartner aus. Sie fordern dringende Ueberweisungen auf \"neue Lieferantenkonten\".", example: "Eine E-Mail vom \"Chef\" mit der Bitte, 50.000 EUR fuer ein dringendes Geschaeft zu ueberweisen. Die E-Mail sieht authentisch aus, aber die Adresse ist leicht veraendert." },
        { title: "Romantik-Betrug", desc: "Sie bauen online ueber Wochen oder Monate eine falsche romantische Beziehung auf. Nachdem sie Ihr Vertrauen gewonnen haben, bitten sie wegen eines \"Notfalls\" um Geld.", example: "Eine neue Bekanntschaft aus einer Dating-App sagt, sie sitze im Ausland fest und brauche Geld fuer ein Flugticket oder eine medizinische Behandlung." },
        { title: "Krypto-Betrug", desc: "Gefaelschte Krypto-Boersen, DeFi-Projekte und Pump-and-Dump-Schemata. Sie versprechen schnellen Reichtum durch neue Token, Mining-Plattformen oder \"exklusive\" Investitionsmoeglichkeiten.", example: "Social-Media-Werbung fuer einen \"Neuen Bitcoin-ETF mit 500% garantierter Rendite\" fuehrt zu einer gefaelschten Website, die eine echte Boerse imitiert." },
        { title: "Phishing", desc: "Gefaelschte Websites oder E-Mails, die Banken, Lieferdienste oder Behoerden imitieren. Ziel ist der Diebstahl von Passwoertern, persoenlichen Daten oder Bank-/Finanzinformationen.", example: "E-Mail von \"Ihrer Bank\" mit einem Link zur \"Profilbestaetigung\" fuehrt zu einer identischen, aber betruegerischen Seite, die Ihre Zugangsdaten stiehlt." },
        { title: "Schaedliche E-Mail-Anhaenge", desc: "E-Mails mit .pdf-, .docx- oder .exe-Anhaengen, die Malware enthalten. Beim Oeffnen wird Ihr Geraet mit Keyloggern, Ransomware oder Trojanern infiziert.", example: "E-Mail \"Rechnung von DHL\" oder \"Steuerdokument\" mit einem ZIP-Anhang, der beim Oeffnen einen Keylogger auf Ihrem Computer installiert." },
        { title: "SMS-Phishing (Smishing)", desc: "Gefaelschte SMS von Banken, Kurierdiensten oder Steuerbehoerden. Sie enthalten Links zu betruegerischen Seiten zum Diebstahl Ihrer persoenlichen und finanziellen Daten.", example: "SMS \"Ihr Paket wird zurueckgehalten, zahlen Sie 2,99 EUR hier:\" mit Link zu einer gefaelschten Kurier-Website, die Ihre Kartendaten stiehlt." },
        { title: "Messenger-Betrug", desc: "Gefaelschte Investmentgruppen auf WhatsApp, Viber oder Telegram. Sie locken mit Versprechen von gut bezahlter Fernarbeit oder kontaktieren Sie wegen des \"Kaufs\" Ihrer zum Verkauf angebotenen Artikel.", example: "Telegram-Gruppeneinladung fuer \"VIP-Investments\" mit gefaelschten Gewinn-Screenshots, oder eine Nachricht ueber den \"Kauf\" Ihres Online-Inserats ueber eine gefaelschte Zahlungsseite." },
        { title: "Malware (Schadsoftware)", desc: "Trojaner, Ransomware, Spyware. Verbreitung ueber Raubkopien, gefaelschte Werbung, kompromittierte Websites oder schaedliche E-Mail-Anhaenge.", example: "Sie laden \"kostenloses\" Photoshop von einer Torrent-Seite herunter, erhalten aber stattdessen einen Banking-Trojaner, der Ihre Passwoerter und Finanzdaten stiehlt." },
        { title: "Unbefugter Fernzugriff", desc: "Betrueger erhalten Zugriff auf Ihren PC ueber Phishing, geleakte/gestohlene Zugangsdaten oder schaedliche Dateien. Dann installieren sie AnyDesk oder TeamViewer fuer volle Kontrolle ueber Ihr Geraet.", example: "\"Microsoft Tech Support\" ruft an und bittet Sie, AnyDesk zu installieren, um \"ein Problem zu beheben\". Sobald sie Zugang haben, stehlen sie Daten oder installieren Malware." }
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
        { title: "Werbung ignorieren", desc: "Vertrauen Sie keinen Anzeigen in sozialen Medien oder Google-Ergebnissen fuer Begriffe wie 'Krypto kaufen' oder 'schnelle Investition'." },
        { title: "Links ueberpruefen", desc: "Bewegen Sie den Mauszeiger ueber Links, um die echte URL zu sehen, bevor Sie klicken. Oeffnen Sie keine Links aus unbekannten E-Mails, SMS oder Messenger-Nachrichten." },
        { title: "Regelmaessige Updates", desc: "Halten Sie Betriebssystem, Browser und Apps aktuell. Sicherheitsupdates beheben bekannte Schwachstellen, die von Hackern ausgenutzt werden." },
        { title: "Daten sichern", desc: "Erstellen Sie regelmaessige Backups wichtiger Dateien auf einer externen Festplatte oder in der Cloud. Dies schuetzt vor Ransomware und Datenverlust." },
        { title: "Kontoauszuege pruefen", desc: "Ueberpruefen Sie regelmaessig Ihre Bank- und Kreditkartenauszuege auf unautorisierte Transaktionen. Bei Verdacht kontaktieren Sie sofort Ihre Bank." },
        { title: "WLAN absichern", desc: "Verwenden Sie ein starkes Passwort fuer Ihr Heim-WLAN. Vermeiden Sie oeffentliche WLAN-Netze fuer Bankgeschaefte oder die Eingabe von Passwoertern." },
        { title: "Familie aufklaeren", desc: "Teilen Sie Ihr Wissen ueber Betrug mit aelteren Verwandten und Kindern, die moeglicherweise anfaelliger sind. Ein Gespraech kann Tausende an Verlusten verhindern." }
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
      notice: "Diese Domains wurden offiziell vom GDBOP (Generaldirektion zur Bekaempfung der Organisierten Kriminalitaet), bulgarisches Innenministerium, als betruegerisch identifiziert.",
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
        "Erstatten Sie Anzeige bei der naechsten Polizeidienststelle oder dem GDBOP (Generaldirektion zur Bekaempfung der Organisierten Kriminalitaet, Bulgarien)",
        "Bewahren Sie alle Chats, E-Mails und Bankunterlagen auf"
      ],
      emergencyNote: "WARTEN SIE NICHT. JEDE STUNDE ZAEHLT BEI DER RUECKGEWINNUNG IHRER GELDER."
    },
    footer: {
      legal: "Rechtliche Hinweise",
      disclaimer: "Nur zu Informationszwecken. Daten aus offiziellen Quellen des GDBOP (Generaldirektion zur Bekaempfung der Organisierten Kriminalitaet), bulgarisches Innenministerium. Wir uebernehmen keine Verantwortung fuer individuelle Finanzentscheidungen.",
      officialLinks: [
        { name: "Direktion Cyberkriminalitaet (Bulgarien)", url: "https://cybercrime.bg" },
        { name: "GDBOP - Generaldirektion zur Bekaempfung der Organisierten Kriminalitaet (Bulgarien)", url: "https://gdbop.bg" }
      ]
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