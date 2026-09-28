// "How to read your policy": policy anatomy and a sample declarations page.
// The sample is invented and uses round numbers.

export const declarations = {
  lead: 'A policy is long, but it has a predictable structure. Start with the one-to-three page summary, the declarations page, and you\'ll know most of what matters in five minutes.',
  parts: [
    { name: 'Declarations page', what: 'The summary: who and what is insured, the dates, each coverage with its limit, your deductibles, the price, and a list of the endorsements that apply. Start here.' },
    { name: 'Insuring agreement', what: 'The promise: what the insurer agrees to pay for, in broad terms.' },
    { name: 'Definitions', what: 'What the words mean in this policy. Words in bold or quotes in the policy are defined here, and the policy\'s definition wins over everyday meaning.' },
    { name: 'Exclusions', what: 'What is not covered. Read these carefully: most surprises live here.' },
    { name: 'Conditions', what: 'Your duties and the rules, like reporting claims promptly, protecting property after a loss, and how disputes are settled.' },
    { name: 'Endorsements', what: 'Changes added to the standard policy. They override the main text, so a policy can be broader or narrower than the standard form.' },
  ],
  decIntro: 'Here is a made-up homeowners declarations page. Yours will look different, but it will contain the same kinds of lines.',
  sample: [
    { n: 1, label: 'Named insured', value: 'Alex and Sam Rivera', explain: 'The people the policy covers. Relatives living with them are usually covered too. Anyone else, like a roommate, isn\'t unless added.' },
    { n: 2, label: 'Policy period', value: 'June 1, 2026 to June 1, 2027, 12:01 a.m.', explain: 'Coverage applies to losses that happen between these dates. On real US forms dates are written month first: 06/01/2026 is June 1.' },
    { n: 3, label: 'Policy form', value: 'HO 00 03 (HO-3 Special Form)', explain: 'The standard form it\'s based on. This tells you whether damage is covered by named or open perils. See the [form comparison](/personal/home/).' },
    { n: 4, label: 'Coverage A, Dwelling', value: '$400,000', explain: 'The most it pays to rebuild the house. Check that it\'s enough to rebuild at today\'s prices.' },
    { n: 5, label: 'Coverage B, Other structures', value: '$40,000', explain: 'Detached garage, fences and sheds. Here it\'s 10% of A, the usual default.' },
    { n: 6, label: 'Coverage C, Personal property', value: '$200,000, replacement cost', explain: 'Your belongings, and how they\'re valued. "Replacement cost" is better than "actual cash value".' },
    { n: 7, label: 'Coverage D, Loss of use', value: '$80,000', explain: 'Extra living costs if you have to move out during repairs.' },
    { n: 8, label: 'Coverage E, Personal liability', value: '$300,000 each occurrence', explain: 'The most it pays for claims against you from one incident.' },
    { n: 9, label: 'Coverage F, Medical payments', value: '$5,000 each person', explain: 'Small medical bills for guests, whoever was at fault.' },
    { n: 10, label: 'Deductible, all perils', value: '$1,000', explain: 'What you pay on each claim before the insurer pays.' },
    { n: 11, label: 'Deductible, wind/hail', value: '2% of Coverage A ($8,000)', explain: 'A separate, larger deductible for wind and hail damage. Easy to miss, and common in storm-prone states.' },
    { n: 12, label: 'Endorsements', value: 'HO 04 95 Water backup $10,000; HO 04 61 Scheduled jewelry', explain: 'Add-ons that change the policy: here, sewer backup cover and a listed piece of jewelry. Look each one up in the policy packet.' },
    { n: 13, label: 'Mortgagee', value: 'First Example Bank, loan #12345', explain: 'Your lender. Claim payments for the house may be made out to you and the lender together.' },
    { n: 14, label: 'Annual premium', value: '$2,140', explain: 'The price for the year. Discounts, like for alarms or bundling with car insurance, are often listed here.' },
  ],
  steps: [
    '**Check the dates.** Did the loss happen during the policy period?',
    '**Check the property or person.** Is what was damaged, or who was hurt, insured under this policy?',
    '**Check the cause.** Is the cause covered: listed in a named-perils policy, or not excluded in an open-perils one?',
    '**Check the exclusions and endorsements.** Does an exclusion take it away, or an endorsement add it back?',
    '**Check the numbers.** What are the limit, any sublimit, and the deductible for this kind of loss?',
  ],
  questions: [
    'Would my dwelling limit rebuild the house at today\'s prices?',
    'Are my belongings paid at replacement cost or actual cash value?',
    'Do I have a separate wind, hail or hurricane deductible, and how much is it in dollars?',
    'Am I covered for sewer backup? For flood? For earthquake?',
    'What are the limits for jewelry, electronics or anything valuable I own?',
    'Is my liability limit enough, given what I own?',
    'Can you send that in writing?',
  ],
};
