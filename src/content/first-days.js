// The first 72 hours after a loss: an evergreen, step-by-step page for the
// three days that set up a claim. Plain language, US insurance.
// Sections render in order: an h2 and a body of paragraphs (string) or
// bullet lists (array of strings). `related` links onward from the page.

export const firstDays = {
  slug: 'first-72-hours',
  title: 'The first 72 hours after a loss',
  eyebrow: 'Guide',
  description: 'The first three days after a home or car loss: who to call, what to photograph, the deadlines that matter, and when to pay a small claim yourself.',
  intro: 'The first three days set up the whole claim. Most of the deadlines are written into your policy, and a few start counting right away, so the order you do things in matters. Here is what to sort out first.',
  sections: [
    {
      h: 'Start here: make it safe and stop the damage',
      body: [
        'Before anything else, get people and pets somewhere safe and stop the damage from spreading. Turn off the water, shut off the gas if you smell it, cover a broken window or a hole in the roof with a tarp, and move what you can out of the wet. Call 911 for any injury or ongoing danger.',
        'Your policy usually expects you to take reasonable steps to protect the property after a loss. Keep the receipts for tarps, boards, a hotel or a locksmith, because these emergency costs are often paid on top of the claim. A few things not to do:',
        [
          '**Don\'t throw damaged items away.** The [[adjuster]] may want to see them. Perishable food and anything unsafe can go, but photograph it first.',
          '**Don\'t start permanent repairs** or sign a repair contract until the insurer has seen the damage, unless something has to be secured now.',
          '**Don\'t sign over your claim to a contractor,** or agree to pay your [[deductible]] to them. Some repair firms ask; the promise rarely ends well.',
          '**Don\'t accept a quick cash offer** to settle before you know what the repair will cost.',
        ],
      ],
    },
    {
      h: 'Who to call, and in what order',
      body: [
        '**If anyone is hurt, or a crime may have happened, call 911 first.** For a theft, a break-in or a crash with injuries, ask for a police report and write down the report number. Insurers often ask for it, and some claims need it.',
        '**Your insurer or agent, as soon as you reasonably can.** Most policies require prompt notice of a loss, and some set a short window in days. Call the claims line on your policy or your agent, or file in the insurer\'s app or website. Ask for a claim number and the name of whoever will handle it, and write down the date, the time and who you spoke to.',
        '**Your mortgage lender or servicer, if the loss is to your home.** The lender is named on your home policy as the [[mortgagee]], and larger claim checks for the house are usually made out to you and the lender together. Telling the servicer early avoids a hold-up once the money is approved.',
        '**Your agent, not just the toll-free number, if you have one.** An [[agent]] can explain what your policy does and does not cover, help you file, and chase the adjuster. In a serious loss the agent is often the fastest way to get a response.',
        '**A public adjuster or an attorney, only if the claim goes wrong.** You do not need one to file. A public adjuster works for you for a fee, usually a percentage of the settlement, and most states cap it. See [how a claim works](/basics/#claim-h) before you decide.',
      ],
    },
    {
      h: 'What to document, before you clean up',
      body: [
        'Photograph and film everything **before** you move it and before anyone hauls the wet carpet away. Take wide shots of each room, then close-ups of the damage, then a photo of any model or serial number. Walk through opening closets and drawers, the way you would to film a room for a listing.',
        'Keep the damaged items if you safely can. Do not repair, replace or throw away anything the insurer has not seen; the adjuster may want to inspect it.',
        'Make a list of what was damaged or lost, room by room. For each item, note what it was, roughly when you bought it and what it cost. Receipts, bank and credit-card statements, warranty cards and online order history all help, and so do old photos of the room as it normally looked.',
        'Keep every receipt for money you spend because of the loss: a hotel, meals above your normal grocery bill, a locksmith, storage. If you cannot live at home, [[loss-of-use|loss of use]] can pay some of these.',
        '**Write down dates and names as you go.** The date and time of the loss, the police or fire report number, the claim number, and who you spoke to at the insurer and when. A notes file or a notebook is enough, and it matters if a dispute comes up months later.',
      ],
    },
    {
      h: 'The deadlines and time limits that matter',
      body: [
        'Exact deadlines are set by your policy and by your state, so read both. The insurer lists its own requirements in the policy, and state law often sets outer limits that a policy cannot shorten. These are the ones to watch:',
        [
          '**Notice of loss:** report promptly, and check the policy for a stated number of days. Late notice is one of the most common reasons insurers deny a claim.',
          '**Cooperation and documentation:** answer the insurer\'s requests and send what it asks for. A claim can stall, and later be denied, if you do not.',
          '**Proof of loss:** for many property claims the insurer asks you to sign a formal statement of the amounts you are claiming. It is often due within a set number of days of the request, commonly 60, so treat the request itself as a deadline.',
          '**Mitigation:** you have a duty to take reasonable steps to prevent further damage. Damage you could reasonably have prevented after the event can be left out of the payout.',
          '**Suit-limitation period:** most policies set a time limit for suing over a claim, often one or two years from the loss, with some states setting a longer minimum. It can pass while you are still negotiating, so if talks stall, get advice before the clock runs out.',
          '**Replacement and receipts:** a [[replacement-cost]] policy often pays [[acv|actual cash value]] first and the rest once you have replaced the item. There is usually a time limit, often six months to two years, to claim that difference.',
        ],
        'These limits run from your policy and your state\'s law, not from when you feel ready. When in doubt, put your notice and your questions in writing so there is a record of the date.',
      ],
    },
    {
      h: 'Claim, or pay it yourself?',
      body: [
        'Insurance is for losses you could not easily absorb. For a small loss, filing can cost more over time than paying it, so run the numbers before you call.',
        [
          '**Your [[deductible]] comes off the top.** If the repair is close to the deductible, the insurer may pay nothing or very little.',
          '**Claims leave a record.** Insurers share claims history through databases such as CLUE, and even a small claim can raise your [[premium]] or lead to non-renewal. One home claim can follow you for several years.',
          '**Some losses are worth a conversation, not a claim.** Call your agent and ask how a claim would affect your policy, without filing, then decide. A first small claim is not automatically a bad idea; it depends on your history, your insurer and your state.',
          '**But never skip required notice.** If the loss is serious, involves an injury, or is the kind your policy says to report, report it. Late notice can cost you coverage, and that is a bigger risk than a premium increase.',
        ],
      ],
    },
  ],
  related: [
    { href: '/basics/', label: 'The basics: how a policy and a claim work', note: 'Guide' },
    { href: '/read-your-policy/', label: 'How to read your policy', note: 'Guide' },
    { href: '/is-it-covered/', label: 'Is it covered? Common situations', note: 'Examples' },
    { href: '/situations/renting/', label: 'Renting a home', note: 'Checklist' },
    { href: '/situations/buying-a-home/', label: 'Buying a home', note: 'Checklist' },
    { href: '/questions/does-renters-insurance-cover-theft-outside-home/', label: 'Does renters insurance cover theft away from home?', note: 'Question' },
  ],
  note: 'This is general information about how US policies usually work, not legal advice. Your own policy\'s wording and your state\'s rules decide the details. If a claim is denied and you think it should not be, ask the insurer to explain its reason in writing and point to the policy wording it relies on, then try your state insurance department; complaints there are free.',
};
