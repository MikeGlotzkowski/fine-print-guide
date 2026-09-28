// The core ideas behind almost every policy, and how a claim works.

export const basics = [
  {
    id: 'price-and-share',
    label: 'Premium and deductible',
    title: 'You pay a premium, and share losses through a deductible.',
    short: 'The [[premium]] is the price of the policy. The [[deductible]] is the part of each loss you pay yourself.',
    body: ['Choosing a higher deductible lowers your premium, because you\'re taking on the small losses yourself. Many people choose a deductible they could pay without real hardship.'],
    example: {
      title: 'Worked example',
      lines: ['A storm causes $6,000 of damage to your roof. Your deductible is $1,000.', 'You pay **$1,000**. The insurer pays **$5,000**.', 'If the damage were $800, below the deductible, you\'d pay it all, and filing a claim would make no sense.'],
    },
  },
  {
    id: 'limits',
    label: 'Limits',
    title: 'Limits cap what the insurer pays.',
    short: 'A [[limit]] is the most the policy pays. Anything above it is yours.',
    body: [
      'Each part of a policy has its own limit, and some kinds of items have smaller [[sublimit|sublimits]] inside it, like jewelry or cash.',
      'Liability limits matter most, because a serious injury can cost far more than property damage. If a court awards more than your limit, you owe the difference personally.',
    ],
    example: { title: 'Worked example', lines: ['Your car liability limit is $50,000 per person. You injure someone and the court awards $120,000.', 'Your insurer pays **$50,000**. You owe **$70,000** yourself.'] },
  },
  {
    id: 'causes',
    label: 'Covered causes',
    title: 'Coverage depends on the cause.',
    short: 'Policies pay for damage from certain causes, called [[peril|perils]], and exclude others, like flood.',
    body: [
      'A policy is written one of two ways. [[named-perils|Named perils]]: only the causes listed are covered. [[open-perils|Open perils]]: every cause is covered except the ones excluded.',
      'The same damage can be covered or not depending on the cause. Water on your floor from a burst pipe is covered; water from a flooding river isn\'t.',
      'Then read the [[exclusion|exclusions]]. They take things away, and [[endorsement|endorsements]] can add them back.',
    ],
    example: { title: 'See it in practice', lines: ['Browse the [16 named perils and the usual exclusions](/perils/), or check [common situations](/is-it-covered/).'] },
  },
  {
    id: 'payout',
    label: 'New for old, or what it was worth',
    title: 'New for old, or what it was worth?',
    short: '[[replacement-cost|Replacement cost]] pays for new. [[acv|Actual cash value]] subtracts wear and age.',
    body: ['Which one your policy uses can double or halve a payout. Many replacement cost policies first pay the actual cash value, then the rest once you\'ve actually replaced the item.'],
    example: {
      title: 'Worked example',
      lines: ['A fire destroys a 5-year-old sofa. A similar new one costs $1,500. It had lost about half its value.', 'Replacement cost pays **$1,500**. Actual cash value pays about **$750**. Both are minus your deductible.'],
    },
  },
  {
    id: 'yours-and-theirs',
    label: 'Your losses, and harm you cause',
    title: 'Your losses versus harm you cause others.',
    short: 'Some coverage pays for **your** things and bills. [[liability|Liability]] pays for harm you cause **other people**.',
    body: [
      'A homeowners policy has both: Coverage A to C for your house and things, Coverage E for liability. A car policy has both: collision for your car, liability for others.',
      'Liability also pays your legal defense, which can cost a lot even if the claim is unfounded.',
    ],
  },
  {
    id: 'record',
    label: 'Claims leave a record',
    title: 'Claims leave a record.',
    short: 'Claims, even small ones, are logged in a shared industry database and can affect your price.',
    body: ['Insurers share claims history through databases such as CLUE. Several claims in a few years can raise your premium or lead to non-renewal. That is one reason to use insurance for losses you couldn\'t easily absorb. Still, follow your policy\'s rules on reporting, because late notice can cost you coverage.'],
  },
];

export const claimSteps = [
  { title: 'Make it safe and stop more damage', body: 'Turn off the water, cover the broken window, move things to dry areas. Keep receipts; reasonable costs are usually reimbursed. Policies can refuse to pay for damage you could have prevented after the event.' },
  { title: 'Document everything', body: 'Photos and video of the damage before you clean up, a list of damaged items, and a police report for theft.' },
  { title: 'Report it quickly', body: 'Call your insurer or agent, or use their app. Policies require "prompt notice". Ask for a claim number and write down who you spoke to.' },
  { title: 'Meet the adjuster', body: 'An [[adjuster]] inspects the damage and estimates the cost. Keep damaged items until they\'ve seen them. You can get your own repair estimates.' },
  { title: 'Get paid, then fix', body: 'The insurer pays the covered amount minus your [[deductible]]. For a home with a mortgage, the check may be made out to you and your lender together.' },
  { title: 'If you disagree', body: 'Ask for the denial or the calculation in writing, with the policy wording it relies on. For disputes about the amount, many property policies have an appraisal process. Watch deadlines, such as the proof of loss (often due within 60 days of the insurer asking) and the time limit for going to court. Your state insurance department takes complaints for free.' },
];
