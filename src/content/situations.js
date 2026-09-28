// Guides by life situation. Each step says how required it is:
//   law = required by law, others = often required by a lender/landlord/client,
//   optional, check = depends on your state or visa.

export const situations = [
  {
    slug: 'new-to-the-us',
    title: 'New to the US',
    short: 'I\'m new to the US',
    teaser: 'What to set up first when you move here, and what\'s different.',
    keywords: ['expat', 'immigrant', 'moving to the us', 'newcomer', 'visa', 'foreigner', 'relocation', 'green card', 'h-1b', 'international'],
    intro: 'US insurance may work very differently from what you\'re used to. Health coverage is mostly tied to jobs, car insurance is priced on your history in the US, and every state sets its own rules. Here is the order most newcomers sort things out in.',
    steps: [
      {
        title: 'Get health coverage from day one',
        req: 'check',
        body: 'Medical care in the US is expensive: an emergency room visit can cost thousands of dollars. There\'s no national health service, so you need a plan.',
        points: [
          '**If you have a US job:** ask HR when the employer plan starts. Some plans have a waiting period of up to 90 days. Some people cover the gap with a short-term travel medical plan.',
          '**If you don\'t:** moving to the US opens a [[sep|special enrollment period]], usually 60 days from your arrival, to buy a plan on the [[marketplace]].',
          'Help with Marketplace premiums depends on your income and immigration status, and a 2025 federal law narrowed it. From 2027, many lawfully present immigrants who don\'t have a green card can still buy a Marketplace plan but won\'t get help with premiums. Check [HealthCare.gov](https://www.healthcare.gov/immigrants/) for the current rules.',
          'Some visas, like J-1, set their own minimum coverage. Some states, including California and Massachusetts, require residents to have coverage.',
        ],
        details: {
          title: 'The four numbers that decide what a health plan costs you',
          body: ['The **premium** is what you pay monthly. The [[deductible]] is what you pay before the plan starts sharing costs. After that you pay a [[copay]] or [[coinsurance]]. The [[oop-max|out-of-pocket maximum]] caps your yearly total. See the worked example on the [health insurance page](/personal/health/).'],
        },
        policies: ['health', 'travel'],
      },
      {
        title: 'Get renters insurance before you move in',
        req: 'others',
        body: 'Many leases require it. It covers your belongings against fire, theft and water damage, and protects you if you accidentally damage someone else\'s property or a guest is hurt. The landlord\'s insurance covers none of that.',
        policies: ['renters'],
      },
      {
        title: 'Get car insurance before you drive',
        req: 'law',
        body: 'Almost every state requires liability insurance, and you need it the moment you drive a car you own off the lot.',
        points: [
          '**License:** most insurers want a US driver\'s license. Many states only let you use a foreign license for a limited time, so start early.',
          '**No US driving record:** your record abroad usually doesn\'t count, so you may be priced like a new driver for a year or two. Ask insurers whether they accept driving records from your home country; a few do.',
          '**No US credit history:** in most states, insurers use credit history in pricing. Building credit will lower your price over time.',
          '**Limits:** state minimums are low. Higher liability limits cost more but protect more of your savings.',
        ],
        policies: ['auto'],
      },
      {
        title: 'Understand why liability limits are high here',
        req: 'optional',
        body: 'Lawsuits over injuries can lead to large awards in the US, and the person who wins can pursue your savings and future wages. That\'s why Americans often carry higher liability limits on car and home policies and add an umbrella policy for $1 million or more.',
        policies: ['umbrella'],
      },
      {
        title: 'Check what your job gives you: life and disability',
        req: 'optional',
        body: 'Employers often offer group life and disability insurance when you start, sometimes free. It\'s easy to overlook in the first weeks, and it usually ends when the job ends. If your family depends on your income, see whether it\'s enough.',
        policies: ['life', 'disability'],
      },
      {
        title: 'If you buy a home: home insurance, and check flood risk',
        req: 'others',
        body: 'Your lender will require home insurance. Federally regulated or backed lenders also require flood insurance if the house is in a high-risk zone. Standard home insurance doesn\'t cover flood, even outside those zones.',
        policies: ['home', 'flood'],
      },
    ],
    surprises: [
      'Health insurance usually comes through your job, and changing jobs can mean changing plans and doctors.',
      'Doctors and hospitals outside your plan\'s [[network]] can cost far more, or not be covered.',
      'An [[eob|explanation of benefits]] from your health plan is not a bill.',
      'Car insurance prices depend on your ZIP code and, in most states, your credit history.',
      'Parents visiting you need visitor medical insurance. Green-card holders can usually buy into Medicare only after 5 years of residence, and it\'s premium-free only with enough US work history.',
      'Insurance is regulated by each state, so the rules and required coverages change when you move between states.',
      'Standard home and renters policies don\'t cover flood.',
      'Using some public benefits can matter for certain immigration applications. Check the [USCIS public charge guidance](https://www.uscis.gov/public-charge) before applying for programs like Medicaid.',
    ],
    links: [
      '[HealthCare.gov: coverage for immigrants](https://www.healthcare.gov/immigrants/)',
      '[Find your state insurance department (NAIC)](https://content.naic.org/state-insurance-departments)',
    ],
  },

  {
    slug: 'renting',
    title: 'Renting a home',
    short: 'I\'m renting',
    teaser: 'Protecting your things and yourself as a tenant.',
    keywords: ['tenant', 'apartment', 'lease', 'landlord'],
    intro: 'When you rent, the landlord insures the building. Your belongings, your hotel if the place becomes unlivable, and your liability are up to you.',
    steps: [
      { title: 'Read what your lease requires', req: 'others', body: 'Many leases require renters insurance with a minimum liability limit, often $100,000, and ask you to name the landlord as an "interested party" so they\'re told if you cancel.' },
      { title: 'Buy a renters policy', req: 'optional', body: 'Pick a personal property limit that would replace everything you own. [[replacement-cost|Replacement cost]] costs a little more; [[acv|actual cash value]] pays little for used furniture.', policies: ['renters'] },
      { title: 'Record what you own', req: 'optional', body: 'Walk through each room with your phone camera, opening closets and drawers. Store the video online. It makes a claim much faster.' },
      { title: 'Check flood risk if you\'re on a ground floor', req: 'optional', body: 'Renters policies exclude flood. You can buy contents-only flood insurance, often cheaply outside high-risk zones.', policies: ['flood'] },
    ],
    surprises: [
      'Your roommate\'s things aren\'t covered by your policy unless they\'re named on it.',
      'If you cause a fire or a leak, the landlord\'s insurer can pay the landlord and then come after you through [[subrogation]].',
      'Things stolen from your car are covered by renters insurance, not car insurance.',
    ],
  },

  {
    slug: 'buying-a-home',
    title: 'Buying a home',
    short: 'I\'m buying a home',
    teaser: 'What the lender requires, and what\'s worth adding.',
    keywords: ['house', 'mortgage', 'closing', 'homeowner', 'title insurance', 'pmi'],
    intro: 'Your lender will require proof of home insurance before closing. The policy you choose matters more than people expect, because the exclusions are where the big surprises are.',
    steps: [
      { title: 'Get home insurance before closing', req: 'others', body: 'Choose a Coverage A limit that would rebuild the house at today\'s prices. Compare [[deductible|deductibles]], and see whether the policy pays [[replacement-cost]] for belongings.', policies: ['home'] },
      { title: 'Check the flood zone', req: 'others', body: 'If the home is in a high-risk [[flood-zone]], a federally regulated or backed lender will require flood insurance. Outside those zones it\'s optional, but standard home insurance doesn\'t cover flood, and many flood claims come from moderate-risk areas.', policies: ['flood'] },
      { title: 'Look at earthquake and wind', req: 'optional', body: 'In earthquake regions, consider a separate policy. On the coast, check the [[wind-deductible|hurricane or wind deductible]], which may be several thousand dollars.', policies: ['earthquake'] },
      {
        title: 'Understand title insurance',
        req: 'others',
        body: 'Title insurance is a one-time purchase at closing. It protects against problems with ownership, like an old lien or a forged deed from a past sale.',
        points: ['The **lender\'s policy** is required and protects only the lender.', 'The **owner\'s policy** is optional and protects you, for as long as you own the home.'],
      },
      { title: 'Review liability and life coverage', req: 'optional', body: 'A home is an asset worth protecting with enough liability coverage, maybe an umbrella. If a partner or children depend on your income to pay the mortgage, [[term-life|term life insurance]] is inexpensive.', policies: ['umbrella', 'life'] },
    ],
    surprises: [
      'Private mortgage insurance (PMI) protects the lender if you stop paying, not you.',
      'Home insurance is based on the cost to rebuild, not the price you paid.',
      'Your insurance is often paid from an escrow account through your mortgage payment, so check it once a year anyway.',
      'Sewer backup, flood, earthquake and slow leaks are excluded from standard policies.',
    ],
  },

  {
    slug: 'buying-a-car',
    title: 'Buying a car',
    short: 'I\'m getting a car',
    teaser: 'What you need before driving away.',
    keywords: ['vehicle', 'auto', 'lease', 'finance', 'loan', 'driving'],
    intro: 'You need insurance before you drive a car you own. The dealer or seller will often ask for proof.',
    steps: [
      { title: 'Have liability coverage in place', req: 'law', body: 'Every state except New Hampshire requires it. Check your state\'s minimum, then consider higher limits.', policies: ['auto'] },
      { title: 'If you finance or lease: collision, comprehensive and gap', req: 'others', body: 'The lender will require [[collision]] and [[comprehensive]]. Consider [[gap|gap insurance]]: if the car is totaled early, it pays what you still owe beyond the car\'s value.' },
      { title: 'Choose limits and deductibles', req: 'optional', body: 'Higher deductibles lower your premium, but you pay more after a claim. Higher liability and [[uninsured-motorist|uninsured motorist]] limits cost more but protect more.' },
      { title: 'List every regular driver', req: 'others', body: 'Anyone in your household who drives the car regularly usually has to be listed. Leaving someone off can lead to a denied claim.' },
    ],
    surprises: ['Insurance generally follows the car: if a friend borrows it and crashes, your policy pays first.', 'Driving for a rideshare or delivery app isn\'t covered by a personal policy without an add-on.', 'Hitting a deer is a [[comprehensive]] claim, not a collision claim.'],
  },

  {
    slug: 'traveling',
    title: 'Planning a trip',
    short: 'I\'m traveling',
    teaser: 'Cancellations, delays, lost bags and getting sick abroad.',
    keywords: ['trip', 'vacation', 'flight', 'travel insurance', 'abroad', 'cancellation', 'delay'],
    intro: 'Before buying travel insurance, check what you already have. Then buy early, since the best protections depend on when you buy.',
    steps: [
      {
        title: 'Check what you already have',
        req: 'optional',
        body: 'You may already be partly covered:',
        points: [
          '**Credit card:** many cards include trip delay, cancellation, lost baggage and rental car damage if you paid with the card.',
          '**Health plan:** check whether it covers you abroad. Many pay little, and Medicare generally pays nothing outside the US.',
          '**Home or renters policy:** covers theft of your belongings while traveling.',
        ],
        policies: ['health', 'renters'],
      },
      { title: 'Buy soon after your first payment', req: 'optional', body: 'The [[pre-existing|pre-existing condition]] waiver and [[cfar|cancel for any reason]] upgrade usually must be bought within 14 to 21 days of your first trip payment. Buying early also protects you before a storm is named.', policies: ['travel'] },
      { title: 'Check the medical and evacuation limits', req: 'optional', body: 'Emergency care abroad and a medical evacuation can each cost $50,000 to $100,000 or more, especially from remote places. Compare that with the limits in the policy.' },
      { title: 'Keep receipts and records', req: 'optional', body: 'Claims need proof: airline delay notices, receipts for meals and hotels, doctor\'s notes, and police reports for theft.' },
    ],
    surprises: [
      'If an airline cancels a flight to, from or within the US and you don\'t accept the alternative, it owes you a cash refund. You don\'t need insurance for that.',
      'Once a hurricane is named, it\'s no longer covered for policies bought afterward.',
      '"Changed my mind" is only covered with [[cfar|cancel for any reason]], and only partly.',
    ],
  },

  {
    slug: 'starting-a-business',
    title: 'Starting a business',
    short: 'I\'m starting a business',
    teaser: 'The basic insurance for a new business.',
    keywords: ['small business', 'llc', 'freelance', 'self-employed', 'startup', 'contractor', 'side business'],
    intro: 'An LLC or corporation protects your personal assets in some cases, but it doesn\'t pay claims. Insurance does. Most small businesses start with liability coverage and add what their work needs.',
    steps: [
      { title: 'Start with general liability, or a BOP', req: 'others', body: 'Covers claims that your business injured someone or damaged property. If you have a location, equipment or stock, a [[bop|business owner\'s policy]] bundles liability with property and lost-income coverage.', policies: ['general-liability', 'bop'] },
      { title: 'Add professional liability if you give advice or services', req: 'check', body: 'Consultants, designers, developers, accountants and other experts face claims that their work cost a client money. General liability doesn\'t cover that.', policies: ['professional-liability'] },
      { title: 'Insure vehicles used for the business', req: 'check', body: 'Vehicles the business owns, or uses heavily, usually need [commercial auto](/business/commercial-auto/); a personal policy may exclude some business use. If you or employees drive personal cars for work, [[hnoa|hired and non-owned auto]] protects the business. The driver\'s own policy pays first.', policies: ['commercial-auto'] },
      { title: 'Consider cyber insurance', req: 'optional', body: 'If you hold customer data or take payments online, a breach can mean notification costs, lawsuits and downtime.', policies: ['cyber'] },
      { title: 'Check licenses and bonds', req: 'check', body: 'Some trades need a license, and some licenses require a [[surety-bond]] or proof of insurance. Your state or city licensing office will say.' },
    ],
    surprises: [
      'A home policy covers very little business property and no business liability, even if you work from home.',
      'Clients may ask for a [[coi|certificate of insurance]] and to be named as an [[additional-insured]] before you start work.',
      'Professional, cyber and management policies are usually [[claims-made]]: the policy must be active when the claim arrives.',
    ],
  },

  {
    slug: 'hiring-employees',
    title: 'Hiring employees',
    short: 'I\'m hiring',
    teaser: 'What becomes required when you have staff.',
    keywords: ['employer', 'staff', 'payroll', 'workers comp', 'employees', 'benefits'],
    intro: 'Hiring your first employee brings new legal requirements, mainly workers\' compensation, and new risks, like claims about how people are treated.',
    steps: [
      { title: 'Get workers\' compensation', req: 'law', body: 'Required in nearly every state once you have employees, sometimes from the first part-time hire. It pays for work injuries, and generally protects you from being sued over them.', policies: ['workers-comp'] },
      { title: 'Check state disability and paid leave programs', req: 'check', body: 'Some states, like California, New York, New Jersey, Washington and Massachusetts, run disability or paid family leave programs funded through payroll.' },
      { title: 'Consider employment practices liability', req: 'optional', body: 'Claims of discrimination, harassment or wrongful firing are among the most common against small businesses. [[epli|EPLI]] pays for your defense and settlements.', policies: ['management-liability'] },
      { title: 'Cover employees driving for work', req: 'optional', body: 'If employees run errands in their own cars, [[hnoa|hired and non-owned auto]] coverage protects the business.', policies: ['commercial-auto'] },
      { title: 'Understand health insurance rules for employers', req: 'check', body: 'Businesses with 50 or more full-time-equivalent employees must offer affordable health coverage or pay a penalty. Smaller businesses can choose to offer it.', policies: ['health'] },
    ],
    surprises: ['Calling someone a contractor doesn\'t make them one; if they\'re really an employee, you can owe workers\' comp for them.', 'Workers\' comp premiums are based on payroll and audited after the year ends, so the final bill can change.'],
  },
];
