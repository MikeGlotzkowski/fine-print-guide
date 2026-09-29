// Single questions people search for, one page each, answered plainly.
// short = the answer in one or two sentences; it's shown first and used as the
// page description unless desc (160 characters at most) is given. sections = the why, in a few short blocks. Each body item is
// a paragraph, or an array for a bullet list.

export const questions = [
  {
    slug: 'is-renters-insurance-required',
    q: 'Is renters insurance required?',
    area: 'Home and renting',
    short: 'No law requires it, but many landlords do. If your lease says you need it, you have to buy it to keep the lease.',
    sections: [
      {
        h: 'When you have to have it',
        body: [
          'No state requires tenants to carry renters insurance. A landlord can require it in the lease, and many do, especially larger apartment buildings. The lease usually sets a minimum liability limit, often $100,000, and asks you to list the landlord as an "interested party" so they hear if the policy lapses.',
        ],
      },
      {
        h: 'Why it\'s worth having anyway',
        body: [
          'The landlord\'s insurance covers the building, not you. Without your own policy, you pay for these yourself:',
          [
            '**Your belongings** after a fire, theft, smoke or a burst pipe, including things stolen from your car.',
            '**A hotel and meals** if the apartment becomes unlivable after a covered loss ([[loss-of-use]]).',
            '**Damage you cause**, like an overflowing bathtub that ruins the unit below, and injuries to guests ([[personal-liability]]).',
          ],
          'It\'s one of the cheaper policies you can buy, often less than a streaming subscription or two per month.',
        ],
      },
      {
        h: 'What it doesn\'t cover',
        body: [['Flood and earthquake damage. Each needs its own policy.', 'Your roommate\'s things, unless they\'re named on your policy.', 'Pests like bedbugs.']],
      },
    ],
    policies: ['renters', 'flood'],
    situations: ['renting', 'new-to-the-us'],
  },

  {
    slug: 'car-insurance-with-foreign-license',
    q: 'Can I get car insurance with a foreign driver\'s license?',
    area: 'Cars',
    short: 'Yes, some insurers will cover you, but you\'ll have fewer choices and pay more. Getting a US state license soon is the single biggest fix.',
    sections: [
      {
        h: 'What to expect',
        body: [
          [
            '**Fewer insurers:** many only quote drivers with a US license. Others accept a foreign or international license, usually at a higher price.',
            '**New-driver pricing:** your years of driving abroad usually don\'t count, so you may be priced like a beginner until you build a US record. A few insurers accept driving records from some countries, so ask.',
            '**Credit history:** in most states insurers use credit to price car insurance, and a new arrival has none yet.',
          ],
        ],
      },
      {
        h: 'Your license may stop being valid',
        body: [
          'Once you become a resident of a state, most states expect you to get their license within a set time, often somewhere between 10 and 90 days. After that, driving on a foreign license can be illegal, and a crash could become a claims problem. An International Driving Permit is only a translation of your home license, not a license of its own.',
          'Check your state\'s motor vehicle agency for the exact rule, and book the tests early, because appointments can take weeks.',
        ],
      },
      {
        h: 'What you need to buy',
        body: ['Almost every state requires liability insurance before you drive. State minimum limits are low; higher limits protect your savings if you cause a serious crash. If you have a car loan or lease, the lender will also require [[collision]] and [[comprehensive]].'],
      },
    ],
    policies: ['auto'],
    situations: ['new-to-the-us', 'buying-a-car'],
  },

  {
    slug: 'what-does-umbrella-insurance-cover',
    q: 'What does umbrella insurance cover?',
    area: 'Liability',
    short: 'Extra liability coverage on top of your home and car policies, usually $1 million or more, for when someone sues you for more than those policies pay.',
    sections: [
      {
        h: 'How it works',
        body: [
          'Say you cause a crash and the other driver\'s injuries lead to a $700,000 judgment. Your car policy pays up to its liability limit, say $300,000. Without an umbrella, the other $400,000 can come from your savings and future wages. An umbrella policy pays that part.',
          'Insurers require you to keep certain limits on your home and car policies first, for example $300,000 of personal liability. The umbrella starts where they stop.',
        ],
      },
      {
        h: 'What it usually covers',
        body: [
          [
            'Injuries and property damage you cause to others, at home, in your car and elsewhere.',
            'Your legal defense, often on top of the limit.',
            'In many policies, claims your other policies don\'t cover, like libel, slander or false arrest.',
          ],
        ],
      },
      {
        h: 'What it doesn\'t cover',
        body: [['Damage to your own house, car or belongings.', 'Your business activities. That needs a commercial umbrella.', 'Harm you cause on purpose.']],
      },
    ],
    policies: ['umbrella', 'home', 'auto'],
    situations: ['buying-a-home'],
  },

  {
    slug: 'hmo-vs-ppo',
    desc: "An HMO covers care only in its network and often needs referrals. A PPO lets you go out of network at a higher cost, and usually costs more each month.",
    q: 'HMO vs PPO: what\'s the difference?',
    area: 'Health',
    short: 'An HMO covers care only from its own network and often needs a referral to see a specialist. A PPO lets you go outside the network for a higher share of the cost, and usually costs more each month.',
    sections: [
      {
        h: 'Side by side',
        body: [
          [
            '**[[hmo|HMO]]:** you pick a primary care doctor, who refers you to specialists. Care outside the [[network]] isn\'t covered except in emergencies. Premiums are usually lower.',
            '**[[ppo|PPO]]:** no referrals needed. Out-of-network care is covered, but you pay more of it, and the out-of-network provider can bill you the difference. Premiums are usually higher.',
            '**[[epo|EPO]]:** in between. No referrals, but like an HMO, nothing outside the network except emergencies.',
          ],
        ],
      },
      {
        h: 'How to choose',
        body: [
          'Look up your doctors first. If they\'re all in the HMO\'s network and you don\'t mind referrals, the HMO is usually the cheaper choice. If you want to keep a doctor outside the network, travel a lot within the US, or have family in another state, a PPO can be worth the higher premium.',
          'Emergencies are protected either way. Plans must cover emergency care outside the network at in-network cost sharing, and federal law protects you from most surprise bills from out-of-network providers in emergencies and at in-network hospitals.',
        ],
      },
    ],
    policies: ['health'],
    situations: ['new-to-the-us'],
    links: ['[HealthCare.gov: health plan types](https://www.healthcare.gov/choose-a-plan/plan-types/)', '[CMS: protections against surprise bills](https://www.cms.gov/nosurprises)'],
  },

  {
    slug: 'missed-open-enrollment',
    desc: "Missed open enrollment? You can still get a health plan after moving, losing coverage, marriage or a new baby. Medicaid and CHIP accept people all year.",
    q: 'I missed open enrollment. Can I still get health insurance?',
    area: 'Health',
    short: 'Only if a life event gives you a special enrollment period, like moving, losing other coverage, marriage or a new baby. Medicaid and CHIP accept people all year.',
    sections: [
      {
        h: 'Events that open a special enrollment period',
        body: [
          'Outside [[open-enrollment]], you can buy a [[marketplace]] plan only during a [[sep|special enrollment period]]. You usually have 60 days from the event. Common ones:',
          [
            'Losing health coverage, for example when a job ends. Quitting a plan or not paying premiums doesn\'t count.',
            'Moving to a new ZIP code or county, or moving to the US.',
            'Getting married, having or adopting a child.',
            'Big income changes that make you newly eligible for help with premiums, in some cases.',
          ],
        ],
      },
      {
        h: 'Employer plans have their own window',
        body: ['A job-based plan has its own enrollment period, often in the fall. Life events like marriage or losing other coverage also let you join it mid-year, but usually only within 30 days. If you lose a job-based plan, you can often keep it for a while through [[cobra|COBRA]], at the full price.'],
      },
      {
        h: 'Be careful with stopgap plans',
        body: ['Short-term health plans can be bought any time, but they don\'t have to cover pre-existing conditions or all the basics a Marketplace plan must cover. Read what\'s excluded before relying on one.'],
      },
    ],
    policies: ['health'],
    situations: ['new-to-the-us'],
    links: ['[HealthCare.gov: special enrollment periods](https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/)'],
  },

  {
    slug: 'does-my-car-insurance-cover-rental-cars',
    desc: "Usually yes for personal rentals in the US. Your liability carries over; damage to the rental is covered only if you have collision and comprehensive.",
    q: 'Does my car insurance cover a rental car?',
    area: 'Cars',
    short: 'Usually yes, within the US and for personal use: your policy\'s coverage carries over to the rental. It covers damage to the rental only if you carry collision and comprehensive on your own car.',
    sections: [
      {
        h: 'What carries over',
        body: [
          [
            '**Liability** for injuries and damage you cause to others, up to your limits.',
            '**Damage to the rental** only if you have [[collision]] and [[comprehensive]], minus your [[deductible]].',
          ],
          'The rental company may also charge for the days the car can\'t be rented and an administrative fee. Many personal policies don\'t pay those.',
        ],
      },
      {
        h: 'When you may need the rental company\'s cover',
        body: [
          [
            'You don\'t own a car and have no policy, so there\'s nothing to carry over.',
            'You\'re renting abroad. Most US car policies cover only the US and Canada.',
            'You\'re renting for work. Your employer\'s policy or a business policy is the one to check.',
            'You carry only liability on your own car and don\'t want to pay for rental damage yourself.',
          ],
          'The damage waiver sold at the counter isn\'t insurance: the rental company agrees not to charge you for damage. Many credit cards include rental car coverage, but it often only pays what your own policy doesn\'t. Check before you travel.',
        ],
      },
    ],
    policies: ['auto', 'travel'],
    situations: ['traveling'],
  },

  {
    slug: 'freelancer-insurance',
    desc: "Freelancers need health coverage first, then professional liability for client work, general liability for client sites, and cover for their equipment.",
    q: 'What insurance do I need as a freelancer?',
    area: 'Business',
    short: 'Health coverage first, since no employer provides it. After that, it depends on the work: professional liability if you give advice or build things for clients, general liability if you work at client sites, and cover for your equipment.',
    sections: [
      {
        h: 'For you',
        body: [
          [
            '**Health insurance** from the [[marketplace]] or a spouse\'s plan. Self-employed people can often deduct the premiums.',
            '**Disability insurance**, because no employer plan replaces your income if you can\'t work.',
          ],
        ],
      },
      {
        h: 'For the work',
        body: [
          [
            '**Professional liability** ([[eo|E&O]]) if a client could blame your advice, design or code for their losses. Consultants, designers and developers usually need this first.',
            '**General liability** if you work at client sites or meet clients in person. Many client contracts require it and ask for a [[coi|certificate of insurance]].',
            '**Your equipment:** a home or renters policy usually covers business equipment only up to a small amount, often $2,500. A [[bop|business owner\'s policy]] or inland marine cover fills the gap.',
            '**Your car:** a personal car policy may not cover driving that is part of the job, like deliveries. Tell your insurer.',
          ],
        ],
      },
      {
        h: 'An LLC doesn\'t replace insurance',
        body: ['An LLC can keep business debts away from your personal assets, but it usually won\'t protect you from claims about your own professional mistakes. Workers\' compensation usually only becomes required once you hire employees, and the rules vary by state.'],
      },
    ],
    policies: ['professional-liability', 'general-liability', 'bop', 'health', 'disability'],
    situations: ['starting-a-business'],
    links: ['[HealthCare.gov: coverage for the self-employed](https://www.healthcare.gov/self-employed/)'],
  },

  {
    slug: 'is-an-eob-a-bill',
    desc: "No. An explanation of benefits is your health plan's summary of a claim. The bill comes from the provider and should match what the EOB says you owe.",
    q: 'Is an explanation of benefits a bill?',
    area: 'Health',
    short: 'No. An explanation of benefits (EOB) is your health plan\'s summary of a claim. The bill comes separately from the doctor or hospital, and it should match what the EOB says you owe.',
    sections: [
      {
        h: 'How to read one',
        body: [
          [
            '**Amount billed:** what the provider charged.',
            '**Allowed amount:** what your plan has agreed to pay for that service. In-network providers can\'t charge you more than this.',
            '**Plan paid:** what the insurer paid.',
            '**You may owe:** your share, from your [[deductible]], [[copay]] or [[coinsurance]].',
          ],
        ],
      },
      {
        h: 'What to do with it',
        body: [
          'Keep the EOB until the bill arrives, then compare the two. If the bill asks for more than "you may owe", call the provider\'s billing office first, then your plan.',
          'If the claim was denied, the EOB gives a reason code. You can ask the plan to reconsider through an internal appeal, and if it still says no, ask for an independent external review.',
        ],
      },
    ],
    policies: ['health'],
    situations: ['new-to-the-us'],
    links: ['[HealthCare.gov: appealing a health plan decision](https://www.healthcare.gov/appeal-insurance-company-decision/)'],
  },

  {
    slug: 'does-homeowners-insurance-cover-flooding',
    q: 'Does homeowners insurance cover flooding?',
    area: 'Home and renting',
    short: 'No. Standard home and renters policies exclude flood. You need a separate flood policy, and it usually takes 30 days to start.',
    sections: [
      {
        h: 'What counts as flood',
        body: [
          'Flood means water rising from outside and covering normally dry land: an overflowing river, storm surge, or heavy rain that pools and pours in. Water from a burst pipe inside the house is not flood, and your home policy covers it.',
        ],
      },
      {
        h: 'Where to get flood insurance',
        body: [
          [
            '**The [[nfip|National Flood Insurance Program]]** sells through regular insurance agents. It covers up to $250,000 for the building and $100,000 for belongings.',
            '**Private flood insurers** can offer higher limits and sometimes shorter waiting periods.',
            '**Renters** can buy contents-only flood cover.',
          ],
          'NFIP coverage usually starts 30 days after you buy it, so buying when a storm is forecast is too late.',
        ],
      },
      {
        h: 'Do you need it outside a flood zone?',
        body: ['Lenders require flood insurance only in high-risk [[flood-zone|flood zones]], but many flood claims come from lower-risk areas. Federal disaster aid, when it\'s available, is limited and often a loan you have to pay back.'],
      },
    ],
    policies: ['flood', 'home', 'renters'],
    situations: ['buying-a-home'],
    links: ['[FloodSmart: the NFIP\'s official site](https://www.floodsmart.gov/)'],
  },

  {
    slug: 'is-health-insurance-mandatory-in-the-us',
    q: 'Is health insurance mandatory in the US?',
    area: 'Health',
    short: 'Not under federal law: there has been no federal penalty since 2019. But a few states require it, and some visas do too.',
    sections: [
      {
        h: 'States that require coverage',
        body: [
          'California, Massachusetts, New Jersey, Rhode Island and Washington, D.C. charge a tax penalty if you go without coverage, unless you qualify for an exemption. Vermont requires coverage but has no penalty. Rules can change, so check your state\'s tax agency or insurance marketplace.',
        ],
      },
      {
        h: 'Visas with their own rules',
        body: ['Some visas set minimum coverage, notably J-1 exchange visitors and their dependents. Universities often require international students to carry the school plan or an equivalent.'],
      },
      {
        h: 'Why go insured even where it\'s optional',
        body: ['US medical care is expensive: a hospital stay can cost tens of thousands of dollars. A plan\'s [[oop-max|out-of-pocket maximum]] caps what you pay in a year for covered care.'],
      },
    ],
    policies: ['health'],
    situations: ['new-to-the-us'],
    links: ['[HealthCare.gov: the fee for not having coverage](https://www.healthcare.gov/fees/fee-for-not-being-covered/)'],
  },
];
