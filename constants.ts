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
    statistics: {
      title: "Мащабът на проблема",
      subtitle: "Реални данни за финансовите измами в България и Европа",
      items: [
        { value: "4 млрд. EUR", label: "Годишни загуби от онлайн инвестиционни измами в Европа" },
        { value: "240 млн. USD", label: "Общи плащания към мрежа от кол центрове за измами, оперираща от София" },
        { value: "27 000+", label: "Жертви на една единствена измамническа мрежа в 24 държави за 3 години" },
        { value: "300+", label: "Регистрирани платформи, насочени към български граждани, с жертви на инвестиционни измами в България" },
        { value: "20 000+", label: "Български граждани, пострадали от пирамидалната схема BETL през 2024 г." },
        { value: "80 млн. USD", label: "Приблизителна сума, събрана от BETL преди прекратяване на плащанията" }
      ]
    },
    scamLifecycle: {
      title: "Как работи типична инвестиционна измама",
      subtitle: "Стъпка по стъпка: от първия контакт до пълната загуба",
      steps: [
        { label: "Реклама / Контакт", desc: "Виждате реклама в социални мрежи или получавате обаждане от \"брокер\" с обещание за лесни печалби" },
        { label: "Регистрация", desc: "Регистрирате се във фалшива платформа и депозирате малка сума (250-500 EUR)" },
        { label: "Фалшива печалба", desc: "Платформата показва бърз ръст на баланса ви – всичко е фалшиво" },
        { label: "Малко теглене", desc: "Позволяват ви да изтеглите малка сума, за да спечелят доверието ви" },
        { label: "Голям депозит", desc: "\"Брокерът\" ви убеждава да инвестирате значително повече – 5 000, 10 000 или повече EUR" },
        { label: "Блокиране", desc: "При опит за теглене ви искат \"данък 27%\", \"такса за отблокиране\" или \"застраховка\"" },
        { label: "Пълна загуба", desc: "Платформата спира да работи или брокерът изчезва. Парите ви са загубени безвъзвратно" },
        { label: "Повторна измама", desc: "Месеци по-късно ви звънят от \"адвокатска кантора\" с обещание да възстановят парите – за нова такса" }
      ]
    },
    stopChallengeProtect: {
      title: "Спри. Помисли. Провери.",
      subtitle: "Три прости стъпки, които могат да ви спасят от измама",
      items: [
        { keyword: "СПРИ", desc: "Спрете за момент и помислете, преди да дадете парите си или личните си данни. Не бързайте – измамниците разчитат на емоционални и прибързани решения." },
        { keyword: "ПОМИСЛИ", desc: "Може ли да е измама? Имате право да откажете, да отхвърлите или да игнорирате всяка молба. Само измамниците ще се опитат да ви притиснат или да ви вкарат в паника." },
        { keyword: "ПРОВЕРИ", desc: "Свържете се с банката си незабавно, ако подозирате измама. Проверете лиценза на компанията в официалните регистри. Обадете се на познати, ако получите съмнителна молба от тяхно име." }
      ],
      source: "Адаптирано от Take Five to Stop Fraud (UK)"
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
        { title: "Непоискан контакт", desc: "Свързват се с вас без повод чрез телефон, социални мрежи или месинджър. Легитимни брокери не правят студени обаждания с обещания за бързи печалби." },
        { title: "AI Deepfakes – клонирани гласове и видеа", desc: "Измамниците използват изкуствен интелект за клониране на гласове, снимки и видеа. Може да получите обаждане с гласа на ваш близък, който моли за спешна помощ. Винаги се обадете лично на човека за потвърждение." },
        { title: "Фалшиви покупки и доставки", desc: "Обяви за несъществуващи продукти на изгодни цени в социални мрежи или фалшиви онлайн магазини. Плащате, но никога не получавате стоката. Сайтът изчезва след няколко дни." }
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
        { title: "Неоторизиран отдалечен достъп", desc: "Измамници получават достъп до компютъра ви чрез фишинг, изтекли/откраднати пароли или злонамерени файлове. След това инсталират AnyDesk или TeamViewer за пълен контрол.", example: "\"Техническа поддръжка на Microsoft\" ви звъни и моли да инсталирате AnyDesk, за да \"поправят проблем\". След като получат достъп, крадат данни или инсталират malware." },
        { title: "Пирамидални / Понци схеми", desc: "Инвестиционни схеми, при които печалбите на ранните участници се изплащат от вноските на новите. Схемата неизбежно рухва, когато новите инвеститори намалеят. Всички плащания обикновено са в криптовалута.", example: "BETL (Blue Technologies Lending) в България: обещаваше 20$/ден от пакет за 540$. Над 20 000 българи пострадаха, събрани са около 80 млн. USD преди схемата да рухне през декември 2024 г." },
        { title: "AI Deepfake измами", desc: "Изкуственият интелект позволява клониране на глас, лице и видео на реални хора. Измамниците създават убедителни обаждания или видео съобщения от \"ваши близки\" или \"известни личности\", които молят за пари или рекламират фалшиви инвестиции.", example: "Получавате видео обаждане от \"вашия син\" с неговия глас и лице, който моли за спешен превод от 5 000 лв. В действителност е AI-генериран deepfake. Винаги се обадете лично за потвърждение." },
        { title: "Фалшиви покупки и доставки", desc: "Несъществуващи продукти на изгодни цени в социални мрежи или фалшиви онлайн магазини. Плащате, но никога не получавате стоката. Фалшиви SMS от \"куриерски\" фирми водят към сайтове за кражба на данни.", example: "Реклама във Facebook за маркови маратонки на 70% отстъпка. Сайтът изглежда професионално, но след плащане стоката никога не пристига, а данните на картата ви са откраднати." }
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
        { title: "Образовайте близките си", desc: "Споделяйте знанията за измами с възрастни роднини и деца, които са по-уязвими. Един разговор може да предотврати загуба на хиляди левове." },
        { title: "Внимавайте с AI Deepfakes", desc: "Изкуственият интелект може да клонира гласове и създава фалшиви видеа. Ако получите обаждане или видео от близък с молба за пари, затворете и им се обадете лично на познатия ви номер за потвърждение." }
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
        "Запазете всички чатове, имейли, банкови преписки, хешове на транзакции и крипто адреси, към които сте изпращали средства"
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
    statistics: {
      title: "The Scale of the Problem",
      subtitle: "Real data on financial fraud in Bulgaria and Europe",
      items: [
        { value: "EUR 4 Billion", label: "Annual losses from online investment fraud across Europe" },
        { value: "USD 240 Million", label: "Total payments to a scam call center network operating from Sofia, Bulgaria" },
        { value: "27,000+", label: "Victims of a single fraud network across 24 countries over 3 years" },
        { value: "300+", label: "Registered platforms targeting Bulgarian citizens with investment fraud victims in Bulgaria" },
        { value: "20,000+", label: "Bulgarian citizens defrauded by the BETL pyramid scheme in 2024" },
        { value: "USD 80 Million", label: "Approximate amount collected by BETL before payments ceased" }
      ]
    },
    scamLifecycle: {
      title: "How a Typical Investment Scam Works",
      subtitle: "Step by step: from first contact to total loss",
      steps: [
        { label: "Ad / Cold Call", desc: "You see a social media ad or receive a call from a \"broker\" promising easy profits" },
        { label: "Registration", desc: "You register on a fake platform and deposit a small amount (EUR 250-500)" },
        { label: "Fake Profits", desc: "The platform shows rapid balance growth – it's all fabricated" },
        { label: "Small Withdrawal", desc: "They allow you to withdraw a small sum to build your trust" },
        { label: "Large Deposit", desc: "The \"broker\" convinces you to invest significantly more – EUR 5,000, 10,000 or more" },
        { label: "Blocked", desc: "When you try to withdraw, they demand a \"27% tax\", \"unlocking fee\", or \"insurance\"" },
        { label: "Total Loss", desc: "The platform goes offline or the broker vanishes. Your money is gone permanently" },
        { label: "Recovery Scam", desc: "Months later, a \"law firm\" calls promising to recover your funds – for yet another fee" }
      ]
    },
    stopChallengeProtect: {
      title: "Stop. Challenge. Protect.",
      subtitle: "Three simple steps that can save you from fraud",
      items: [
        { keyword: "STOP", desc: "Take a moment to stop and think before parting with your money or personal information. Don't rush – scammers rely on emotional, hasty decisions." },
        { keyword: "CHALLENGE", desc: "Could it be fake? It's okay to reject, refuse, or ignore any request. Only criminals will try to rush or panic you into action." },
        { keyword: "PROTECT", desc: "Contact your bank immediately if you suspect fraud. Verify the company's license through official registers. Call your relatives directly if you receive a suspicious request in their name." }
      ],
      source: "Adapted from Take Five to Stop Fraud (UK)"
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
        { title: "Unsolicited Contact", desc: "They reach out to you uninvited via phone, social media, or messaging apps. Legitimate brokers don't make cold calls promising quick profits." },
        { title: "AI Deepfakes – Cloned Voices & Videos", desc: "Scammers use artificial intelligence to clone voices, photos, and videos. You may receive a call with a family member's voice asking for urgent help. Always call the person directly to verify." },
        { title: "Fake Purchases & Delivery Scams", desc: "Non-existent products at bargain prices on social media or fake online stores. You pay but never receive the goods. The site disappears within days." }
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
        { title: "Unauthorized Remote Access", desc: "Scammers gain access to your PC via phishing, leaked/stolen credentials, or malicious files. They then install AnyDesk or TeamViewer for full control over your device.", example: "\"Microsoft Tech Support\" calls and asks you to install AnyDesk to \"fix a problem\". Once they have access, they steal data or install malware." },
        { title: "Pyramid / Ponzi Schemes", desc: "Investment schemes where early participants are paid with new investors' money. The scheme inevitably collapses when recruitment slows. All payments are typically in cryptocurrency to avoid banking oversight.", example: "BETL (Blue Technologies Lending) in Bulgaria: promised $20/day from a $540 package. Over 20,000 Bulgarians were defrauded, approximately USD 80 million collected before the scheme collapsed in December 2024." },
        { title: "AI Deepfake Scams", desc: "Artificial intelligence enables cloning of real people's voice, face, and video. Scammers create convincing calls or video messages from \"your relatives\" or \"celebrities\" requesting money or promoting fake investments.", example: "You receive a video call from \"your son\" with his voice and face, asking for an urgent transfer of $5,000. In reality, it's an AI-generated deepfake. Always call back personally to verify." },
        { title: "Fake Purchase & Delivery Scams", desc: "Non-existent products at bargain prices on social media or fake online stores. You pay but never receive the goods. Fake SMS from \"courier\" services lead to sites that steal your payment details.", example: "Facebook ad for branded sneakers at 70% off. The site looks professional, but after payment the goods never arrive and your card details are stolen." }
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
        { title: "Educate Your Family", desc: "Share scam awareness with elderly relatives and children who may be more vulnerable. One conversation can prevent thousands in losses." },
        { title: "Beware of AI Deepfakes", desc: "AI can clone voices and create fake videos. If you receive a call or video from a loved one asking for money, hang up and call them directly on their known number to verify." }
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
        "Keep all chats, emails, bank receipts, transaction hashes, and crypto addresses you sent assets to"
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
      ctaRegisters: "Lizenz prüfen"
    },
    hero: {
      title: "Schützen Sie Ihre Ersparnisse vor Anlagebetrug",
      description: "Ihr erster Schutzschild gegen Finanzbetrug. Lernen Sie, betrügerische Plattformen zu erkennen und sicher zu investieren."
    },
    statistics: {
      title: "Das Ausmass des Problems",
      subtitle: "Echte Daten zu Finanzbetrug in Bulgarien und Europa",
      items: [
        { value: "4 Mrd. EUR", label: "Jährliche Verluste durch Online-Anlagebetrug in Europa" },
        { value: "240 Mio. USD", label: "Gesamtzahlungen an ein Betrugs-Callcenter-Netzwerk mit Sitz in Sofia" },
        { value: "27.000+", label: "Opfer eines einzelnen Betrugsnetzwerks in 24 Ländern über 3 Jahre" },
        { value: "300+", label: "Registrierte Plattformen, die bulgarische Bürger ins Visier nehmen, mit Opfern von Anlagebetrug in Bulgarien" },
        { value: "20.000+", label: "Bulgarische Bürger, die 2024 durch das BETL-Pyramidensystem betrogen wurden" },
        { value: "80 Mio. USD", label: "Geschätzter Betrag, der von BETL vor Einstellung der Zahlungen gesammelt wurde" }
      ]
    },
    scamLifecycle: {
      title: "Wie ein typischer Anlagebetrug funktioniert",
      subtitle: "Schritt für Schritt: vom Erstkontakt bis zum Totalverlust",
      steps: [
        { label: "Werbung / Kaltakquise", desc: "Sie sehen eine Social-Media-Werbung oder erhalten einen Anruf von einem \"Broker\" mit Versprechen leichter Gewinne" },
        { label: "Registrierung", desc: "Sie registrieren sich auf einer gefälschten Plattform und zahlen einen kleinen Betrag ein (250-500 EUR)" },
        { label: "Gefälschte Gewinne", desc: "Die Plattform zeigt schnelles Wachstum Ihres Guthabens – alles ist gefälscht" },
        { label: "Kleine Auszahlung", desc: "Sie dürfen einen kleinen Betrag abheben, um Ihr Vertrauen zu gewinnen" },
        { label: "Grosse Einzahlung", desc: "Der \"Broker\" überredet Sie, deutlich mehr zu investieren – 5.000, 10.000 EUR oder mehr" },
        { label: "Blockierung", desc: "Bei Auszahlungsversuchen fordern sie eine \"27% Steuer\", \"Freischaltungsgebühr\" oder \"Versicherung\"" },
        { label: "Totalverlust", desc: "Die Plattform geht offline oder der Broker verschwindet. Ihr Geld ist unwiederbringlich verloren" },
        { label: "Rückgewinnungsbetrug", desc: "Monate später ruft eine \"Anwaltskanzlei\" an und verspricht, Ihr Geld zurückzuholen – gegen eine weitere Gebühr" }
      ]
    },
    stopChallengeProtect: {
      title: "Stopp. Hinterfragen. Schützen.",
      subtitle: "Drei einfache Schritte, die Sie vor Betrug bewahren können",
      items: [
        { keyword: "STOPP", desc: "Nehmen Sie sich einen Moment Zeit zum Nachdenken, bevor Sie Geld oder persönliche Daten weitergeben. Hetzen Sie nicht – Betrüger setzen auf emotionale, übereilte Entscheidungen." },
        { keyword: "HINTERFRAGEN", desc: "Könnte es Betrug sein? Es ist völlig in Ordnung, Anfragen abzulehnen oder zu ignorieren. Nur Kriminelle werden versuchen, Sie unter Druck zu setzen oder in Panik zu versetzen." },
        { keyword: "SCHÜTZEN", desc: "Kontaktieren Sie sofort Ihre Bank, wenn Sie Betrug vermuten. Überprüfen Sie die Lizenz des Unternehmens in offiziellen Registern. Rufen Sie Angehörige direkt an, wenn Sie eine verdächtige Anfrage in deren Namen erhalten." }
      ],
      source: "Adaptiert von Take Five to Stop Fraud (UK)"
    },
    alert: {
      title: "Kritische Warnung",
      description: "Dieses Portal verwendet offizielle Daten der Direktion Cyberkriminalität des GDBOP (Generaldirektion zur Bekämpfung der Organisierten Kriminalität), bulgarisches Innenministerium. Wenn Sie aufgefordert werden, über eine Seite auf der schwarzen Liste zu investieren, brechen Sie den Kontakt sofort ab."
    },
    warningSigns: {
      title: "Warnzeichen",
      items: [
        { title: "Versprechen schneller Gewinne", desc: "Garantiert hohe Renditen ohne Risiko sind unmöglich. Betrüger zeigen gefälschte Diagramme mit 200-300% Wachstum." },
        { title: "Typosquatting (falsche Domains)", desc: "Bekannte Marken werden imitiert: microsoft.com wird zu mircosoft.com; 'rn' wird statt 'm' verwendet, um zu täuschen." },
        { title: "Entscheidungsdruck", desc: "Betrüger drängen immer zur Eile – 'das Angebot läuft jetzt ab'. Sie wollen nicht, dass Sie Zeit haben, die Lizenz zu prüfen." },
        { title: "Gefälschte Empfehlungen", desc: "KI-generierte oder gestohlene Fotos von Prominenten (Elon Musk) in Werbung. Diese Personen haben keine Verbindung zu diesen Plattformen." },
        { title: "Unübliche Zahlungsmethoden", desc: "Nur Krypto-Zahlungen oder Banküberweisungen auf Privatkonten statt auf Firmenkonten von lizenzierten Brokern." },
        { title: "Fehlende Transparenz", desc: "Keine physische Adresse, keine Lizenzinformationen oder Registrierungsdaten. Wenn die Informationen verborgen sind, ist es ein Warnsignal." },
        { title: "Social Engineering", desc: "Betrüger manipulieren durch Schmeichelei, vorgetäuschte Freundschaft oder Romantik. Sie bauen Vertrauen auf, bevor sie Geld oder persönliche Daten verlangen." },
        { title: "Isolation von anderen", desc: "Sie warnen Sie davor, Familie, Freunde oder Finanzexperten zu konsultieren. Das Ziel ist, niemanden an Ihrer \"Investition\" zweifeln zu lassen." },
        { title: "\"Rückgewinnungs\"-Betrug", desc: "Nachdem Sie Geld verloren haben, kontaktiert Sie jemand und verspricht, Ihr Geld gegen eine Gebühr zurückzuholen. Es ist ein zweiter Betrug am selben Opfer." },
        { title: "Gefälschte Lizenzen", desc: "Sie zeigen gefälschte Zertifikate von Regulierungsbehörden (FSC, FCA, CySEC). Überprüfen Sie Lizenzen immer direkt in offiziellen Registern." },
        { title: "\"Kleiner Gewinn\"-Taktik", desc: "Sie erlauben eine kleine Auszahlung, um Vertrauen aufzubauen. Dann fordern sie eine deutlich grössere Einzahlung, die Sie nie zurückbekommen." },
        { title: "Unaufgeforderte Kontaktaufnahme", desc: "Sie melden sich ungefragt per Telefon, Social Media oder Messenger-Apps. Seriöse Broker machen keine Kaltakquise mit Versprechen schneller Gewinne." },
        { title: "AI Deepfakes – Geklonte Stimmen & Videos", desc: "Betrüger nutzen künstliche Intelligenz zum Klonen von Stimmen, Fotos und Videos. Sie könnten einen Anruf mit der Stimme eines Familienmitglieds erhalten, das um dringende Hilfe bittet. Rufen Sie die Person immer direkt an." },
        { title: "Gefälschte Käufe & Lieferbetrug", desc: "Nicht existierende Produkte zu Schnäppchenpreisen in sozialen Medien oder gefälschten Online-Shops. Sie zahlen, erhalten aber nie die Ware. Die Seite verschwindet innerhalb von Tagen." }
      ],
      campaignLink: {
        text: "FSC-Kampagne: Den lizenzierten Anlagevermittler erkennen",
        url: "https://www.fsc.bg/za-potrebitelya/investiczionna-dejnost/razpoznay-litsenziraniya-investitsionen-posrednik/",
        linkText: "Zur Kampagne"
      }
    },
    schemes: {
      title: "Häufigste Betrugsmaschen",
      items: [
        { type: 'crypto', title: "Gefälschter Kryptohandel", desc: "Plattformen mit gefälschten Diagrammen und massivem Wachstum. Ihr Geld wird nie tatsächlich investiert." },
        { type: 'stock', title: "Gefälschte Börse", desc: "Angebote für Apple-/Tesla-Aktien. Später verlangen sie 'Freischaltungsgebühren' für Auszahlungen." },
        { type: 'recovery', title: "Rückgewinnungsbetrug", desc: "Jemand ruft an und verspricht, Ihr verlorenes Geld zurückzuholen – gegen eine Gebühr. Es ist ein zweiter Betrug am selben Opfer." }
      ]
    },
    scamTypes: {
      title: "Die häufigsten Finanzbetrugsarten",
      subtitle: "Das Wissen über verschiedene Betrugsarten ist der erste Schritt zu Ihrem Schutz",
      items: [
        { title: "Anlagebetrug", desc: "Gefälschte Plattformen für den Handel mit Forex, Aktien oder Rohstoffen. Sie versprechen unrealistische Renditen und zeigen gefälschte Gewinndiagramme. Ihr Geld wird nie tatsächlich investiert.", example: "Sie erhalten einen Anruf von einem \"Broker\" bei IG Markets, aber die Website ist ig-markets-pro.com statt der echten igmarkets.com." },
        { title: "Business-E-Mail-Betrug (BEC)", desc: "Betrüger geben sich per gefälschter oder kompromittierter E-Mail als Führungskräfte oder Geschäftspartner aus. Sie fordern dringende Überweisungen auf \"neue Lieferantenkonten\".", example: "Eine E-Mail vom \"Chef\" mit der Bitte, 50.000 EUR für ein dringendes Geschäft zu überweisen. Die E-Mail sieht authentisch aus, aber die Adresse ist leicht verändert." },
        { title: "Romantik-Betrug", desc: "Sie bauen online über Wochen oder Monate eine falsche romantische Beziehung auf. Nachdem sie Ihr Vertrauen gewonnen haben, bitten sie wegen eines \"Notfalls\" um Geld.", example: "Eine neue Bekanntschaft aus einer Dating-App sagt, sie sitze im Ausland fest und brauche Geld für ein Flugticket oder eine medizinische Behandlung." },
        { title: "Krypto-Betrug", desc: "Gefälschte Krypto-Börsen, DeFi-Projekte und Pump-and-Dump-Schemata. Sie versprechen schnellen Reichtum durch neue Token, Mining-Plattformen oder \"exklusive\" Investitionsmöglichkeiten.", example: "Social-Media-Werbung für einen \"Neuen Bitcoin-ETF mit 500% garantierter Rendite\" führt zu einer gefälschten Website, die eine echte Börse imitiert." },
        { title: "Phishing", desc: "Gefälschte Websites oder E-Mails, die Banken, Lieferdienste oder Behörden imitieren. Ziel ist der Diebstahl von Passwörtern, persönlichen Daten oder Bank-/Finanzinformationen.", example: "E-Mail von \"Ihrer Bank\" mit einem Link zur \"Profilbestätigung\" führt zu einer identischen, aber betrügerischen Seite, die Ihre Zugangsdaten stiehlt." },
        { title: "Schädliche E-Mail-Anhänge", desc: "E-Mails mit .pdf-, .docx- oder .exe-Anhängen, die Malware enthalten. Beim Öffnen wird Ihr Gerät mit Keyloggern, Ransomware oder Trojanern infiziert.", example: "E-Mail \"Rechnung von DHL\" oder \"Steuerdokument\" mit einem ZIP-Anhang, der beim Öffnen einen Keylogger auf Ihrem Computer installiert." },
        { title: "SMS-Phishing (Smishing)", desc: "Gefälschte SMS von Banken, Kurierdiensten oder Steuerbehörden. Sie enthalten Links zu betrügerischen Seiten zum Diebstahl Ihrer persönlichen und finanziellen Daten.", example: "SMS \"Ihr Paket wird zurückgehalten, zahlen Sie 2,99 EUR hier:\" mit Link zu einer gefälschten Kurier-Website, die Ihre Kartendaten stiehlt." },
        { title: "Messenger-Betrug", desc: "Gefälschte Investmentgruppen auf WhatsApp, Viber oder Telegram. Sie locken mit Versprechen von gut bezahlter Fernarbeit oder kontaktieren Sie wegen des \"Kaufs\" Ihrer zum Verkauf angebotenen Artikel.", example: "Telegram-Gruppeneinladung für \"VIP-Investments\" mit gefälschten Gewinn-Screenshots, oder eine Nachricht über den \"Kauf\" Ihres Online-Inserats über eine gefälschte Zahlungsseite." },
        { title: "Unbefugter Fernzugriff", desc: "Betrüger erhalten Zugriff auf Ihren PC über Phishing, geleakte/gestohlene Zugangsdaten oder schädliche Dateien. Dann installieren sie AnyDesk oder TeamViewer für volle Kontrolle über Ihr Gerät.", example: "\"Microsoft Tech Support\" ruft an und bittet Sie, AnyDesk zu installieren, um \"ein Problem zu beheben\". Sobald sie Zugang haben, stehlen sie Daten oder installieren Malware." },
        { title: "Pyramiden- / Ponzi-Systeme", desc: "Anlageschemata, bei denen frühe Teilnehmer mit dem Geld neuer Investoren bezahlt werden. Das Schema bricht unweigerlich zusammen, wenn die Rekrutierung nachlässt. Alle Zahlungen erfolgen typischerweise in Kryptowährung.", example: "BETL (Blue Technologies Lending) in Bulgarien: versprach 20$/Tag aus einem 540$-Paket. Über 20.000 Bulgaren wurden betrogen, ca. 80 Mio. USD gesammelt, bevor das Schema im Dezember 2024 zusammenbrach." },
        { title: "AI-Deepfake-Betrug", desc: "Künstliche Intelligenz ermöglicht das Klonen von Stimme, Gesicht und Video realer Personen. Betrüger erstellen überzeugende Anrufe oder Videonachrichten von \"Ihren Angehörigen\" oder \"Prominenten\", die um Geld bitten.", example: "Sie erhalten einen Videoanruf von \"Ihrem Sohn\" mit seiner Stimme und seinem Gesicht, der um eine dringende Überweisung von 5.000 EUR bittet. In Wirklichkeit ist es ein KI-generierter Deepfake. Rufen Sie immer persönlich zurück." },
        { title: "Gefälschte Käufe & Lieferbetrug", desc: "Nicht existierende Produkte zu Schnäppchenpreisen in sozialen Medien oder gefälschten Online-Shops. Sie zahlen, aber die Ware kommt nie an. Gefälschte SMS von \"Kurierdiensten\" führen zu Datendiebstahl-Seiten.", example: "Facebook-Werbung für Marken-Sneaker mit 70% Rabatt. Die Seite sieht professionell aus, aber nach der Zahlung kommt die Ware nie an und Ihre Kartendaten werden gestohlen." }
      ]
    },
    technical: {
      title: "Technische Warnhinweise",
      broker: {
        title: "In der Kommunikation:",
        items: [
          "Verwendung von Gmail/Outlook statt professioneller E-Mail",
          "Fernzugriff über AnyDesk oder TeamViewer wird verlangt",
          "Sprechen Ihre Sprache, rufen aber aus dem Ausland an",
          "Verwendung von Stock-Fotos als Profilbilder"
        ]
      },
      platform: {
        title: "Auf der Plattform:",
        items: [
          "Guthaben wächst am Wochenende (wenn die Märkte geschlossen sind)",
          "Diagramme fallen nie – nur Gewinn wird angezeigt",
          "Forderung von '27% Steuer' bei Auszahlungsversuchen",
          "Unrealistische Renditen wie 10% pro Tag"
        ]
      }
    },
    protection: {
      title: "So schützen Sie sich",
      steps: [
        { title: "Datenschutz", desc: "Geben Sie niemals persönliche Daten, Ausweiskopien oder Bankdaten auf unverifizierten Seiten an, die Preise oder Gewinne versprechen." },
        { title: "Zwei-Faktor-Authentifizierung (2FA)", desc: "Aktivieren Sie immer 2FA für alle Ihre Bank- und Finanzanwendungen. Dies ist die stärkste Barriere gegen Hacker." },
        { title: "Software-Sicherheit", desc: "Verwenden Sie aktuelle Antivirensoftware und vermeiden Sie unbedingt Raubkopien, die versteckte Bedrohungen enthalten können." },
        { title: "Passwörter & Manager", desc: "Verwenden Sie einzigartige, komplexe Passwörter für jedes Konto. Ein Passwort-Manager ist der sicherste Weg, sie zu speichern." },
        { title: "Vertrauenswürdige Marken", desc: "Investieren Sie nur über bekannte, lizenzierte und international anerkannte Finanzinstitute. Prüfen Sie deren Geschichte." },
        { title: "Werbung ignorieren", desc: "Vertrauen Sie keinen Anzeigen in sozialen Medien oder Google-Ergebnissen für Begriffe wie 'Krypto kaufen' oder 'schnelle Investition'." },
        { title: "Links überprüfen", desc: "Bewegen Sie den Mauszeiger über Links, um die echte URL zu sehen, bevor Sie klicken. Öffnen Sie keine Links aus unbekannten E-Mails, SMS oder Messenger-Nachrichten." },
        { title: "Regelmässige Updates", desc: "Halten Sie Betriebssystem, Browser und Apps aktuell. Sicherheitsupdates beheben bekannte Schwachstellen, die von Hackern ausgenutzt werden." },
        { title: "Daten sichern", desc: "Erstellen Sie regelmässige Backups wichtiger Dateien auf einer externen Festplatte oder in der Cloud. Dies schützt vor Ransomware und Datenverlust." },
        { title: "Kontoauszüge prüfen", desc: "Überprüfen Sie regelmässig Ihre Bank- und Kreditkartenauszüge auf unautorisierte Transaktionen. Bei Verdacht kontaktieren Sie sofort Ihre Bank." },
        { title: "WLAN absichern", desc: "Verwenden Sie ein starkes Passwort für Ihr Heim-WLAN. Vermeiden Sie öffentliche WLAN-Netze für Bankgeschäfte oder die Eingabe von Passwörtern." },
        { title: "Familie aufklären", desc: "Teilen Sie Ihr Wissen über Betrug mit älteren Verwandten und Kindern, die möglicherweise anfälliger sind. Ein Gespräch kann Tausende an Verlusten verhindern." },
        { title: "Vorsicht vor AI-Deepfakes", desc: "KI kann Stimmen klonen und gefälschte Videos erstellen. Wenn Sie einen Anruf oder ein Video von einem Angehörigen mit einer Geldforderung erhalten, legen Sie auf und rufen Sie direkt unter der bekannten Nummer zurück." }
      ]
    },
    registers: {
      title: "Offizielle Register",
      sections: [
        {
          region: "🇧🇬 Bulgarien",
          items: [
            { name: "KFN – Anlagevermittler", desc: "Vollständiges Register der lizenzierten Anlagevermittler in Bulgarien.", link: "https://www.fsc.bg/investitsionna-deynost/spisatsi-podnadzorni-litsa/investitsionni-posrednitsi/", linkText: "Zur KFN" },
            { name: "BNB – Finanzinstitute", desc: "Register gemäss Art. 3a des Kreditinstitutsgesetzes.", link: "https://www.bnb.bg/RegistersAndServices/RSFIRegister/index.htm", linkText: "Zur BNB" },
            { name: "Handelsregister (TR)", desc: "Überprüfung der Registrierung bulgarischer juristischer Personen.", link: "https://portal.registryagency.bg/CR/reports/VerificationPersonOrg", linkText: "Zum Handelsregister" }
          ]
        },
        {
          region: "🇪🇺 Europäische Union",
          items: [
            { name: "ESMA – MiFID-II-Datenbank", desc: "EU-weite Datenbank lizenzierter Finanzvermittler nach MiFID II.", link: "https://registers.esma.europa.eu/publication/searchRegister?core=esma_registers_upreg", linkText: "Zur ESMA" },
            { name: "ESMA – MiCA-Übergangsregister", desc: "Register der Krypto-Dienstleister (CASP) gemäss MiCA-Verordnung.", link: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica#InterimMiCARegister", linkText: "Zu MiCA" }
          ]
        },
        {
          region: "🌍 Internationale Regulierungsbehörden",
          items: [
            { name: "FINRA BrokerCheck (USA)", desc: "Überprüfung von Brokern und Anlageberatern in den USA.", link: "https://brokercheck.finra.org/", linkText: "Zur FINRA" },
            { name: "FCA Register (GB)", desc: "Register lizenzierter Finanzunternehmen in Grossbritannien.", link: "https://register.fca.org.uk/s/", linkText: "Zur FCA" },
            { name: "FINMA Register (CH)", desc: "Register lizenzierter Finanzinstitute in der Schweiz.", link: "https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/", linkText: "Zur FINMA" },
            { name: "SEC IAPD (USA)", desc: "SEC-Datenbank für Anlagevermittler und -berater.", link: "https://adviserinfo.sec.gov/", linkText: "Zur SEC" },
            { name: "IOSCO I-SCAN", desc: "Internationales Netzwerk für Warnsignale bei Finanzbetrug.", link: "https://www.iosco.org/i-scan/", linkText: "Zu IOSCO" }
          ]
        }
      ]
    },
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Wenn eine Seite nicht auf der Liste steht, ist sie dann sicher?", a: "NEIN! Die Liste ist nicht vollständig. Täglich erscheinen neue Seiten. Prüfen Sie immer zuerst die Lizenz." },
        { q: "Was bedeuten die eckigen Klammern [ ]?", a: "Sie werden nicht mehr für die Indexierung verwendet, wurden aber ursprünglich von der Polizei hinzugefügt, um versehentliche Klicks zu verhindern." }
      ]
    },
    domains: {
      title: "Schwarze Liste der Domains",
      notice: "Diese Domains wurden offiziell vom GDBOP (Generaldirektion zur Bekämpfung der Organisierten Kriminalität), bulgarisches Innenministerium, als betrügerisch identifiziert.",
      placeholder: "Domain zur Prüfung eingeben...",
      showing: "Angezeigt",
      of: "von"
    },
    victim: {
      title: "Bereits betroffen? Handeln Sie sofort!",
      steps: [
        "Beenden Sie jegliche Kommunikation mit den Betrügern",
        "Leisten Sie keine weiteren Zahlungen",
        "Informieren Sie sofort Ihre Bank",
        "Erstatten Sie Anzeige bei der nächsten Polizeidienststelle oder dem GDBOP (Generaldirektion zur Bekämpfung der Organisierten Kriminalität, Bulgarien)",
        "Bewahren Sie alle Chats, E-Mails, Bankunterlagen, Transaktions-Hashes und Krypto-Adressen auf, an die Sie Vermögenswerte gesendet haben"
      ],
      emergencyNote: "WARTEN SIE NICHT. JEDE STUNDE ZÄHLT BEI DER RÜCKGEWINNUNG IHRER GELDER."
    },
    footer: {
      legal: "Rechtliche Hinweise",
      disclaimer: "Nur zu Informationszwecken. Daten aus offiziellen Quellen des GDBOP (Generaldirektion zur Bekämpfung der Organisierten Kriminalität), bulgarisches Innenministerium. Wir übernehmen keine Verantwortung für individuelle Finanzentscheidungen.",
      officialLinks: [
        { name: "Direktion Cyberkriminalität (Bulgarien)", url: "https://cybercrime.bg" },
        { name: "GDBOP - Generaldirektion zur Bekämpfung der Organisierten Kriminalität (Bulgarien)", url: "https://gdbop.bg" }
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