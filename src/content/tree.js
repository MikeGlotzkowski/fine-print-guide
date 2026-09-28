// The insurance tree: from the two big families down to individual perils.
// Node fields:
//   t     label
//   d     one plain line shown next to the label
//   href  optional link to the page that explains it
//   v     optional usual verdict for a peril: 'yes' | 'no' | 'depends'
//   kids  child nodes (rendered as a fold-out branch)

// What can damage property, grouped the way insurers and catastrophe
// modelers group it. Verdicts are for a standard open-perils home policy (HO-3).
const perils = (extra = []) => ({
  t: 'What can cause damage (perils)',
  d: 'The causes a property policy covers or excludes. Verdicts are for a standard home policy.',
  href: '/perils/',
  kids: [
    {
      t: 'Wind',
      d: 'The most common source of big property claims in the US.',
      kids: [
        {
          t: 'Tropical cyclones',
          d: 'Storms that form over warm ocean water.',
          kids: [
            { t: 'Hurricane wind', v: 'yes', d: 'Covered, often with a separate [[wind-deductible|hurricane deductible]] of 1–5% of the dwelling limit.' },
            { t: 'Tropical storm wind', v: 'yes', d: 'Covered. The hurricane deductible may apply once a storm is named, depending on your state.' },
            { t: 'Storm surge', v: 'no', d: 'Seawater pushed ashore by the storm counts as **flood**, so only a [flood policy](/personal/flood/) pays.' },
            { t: 'Hurricane rainfall flooding', v: 'no', d: 'Rising water from the rain is flood too. Rain that gets in through a wind-damaged roof is covered.' },
          ],
        },
        {
          t: 'Severe convective storms',
          d: 'Thunderstorms and what they bring. Most frequent in spring and summer.',
          kids: [
            { t: 'Tornado', v: 'yes', d: 'Covered as windstorm.' },
            { t: 'Straight-line wind and derechos', v: 'yes', d: 'Covered as windstorm, whatever the wind direction.' },
            { t: 'Hail', v: 'yes', d: 'Covered, often with a wind/hail deductible. Some policies exclude cosmetic dents or pay older roofs less.' },
            { t: 'Lightning', v: 'yes', d: 'Covered, including electronics damaged by a lightning strike.' },
          ],
        },
        {
          t: 'Winter storms',
          d: 'Snow, ice and cold. Nor\'easters are the big coastal ones.',
          kids: [
            { t: 'Weight of snow, ice or sleet', v: 'yes', d: 'Covered when the weight damages the roof or makes part of the house collapse.' },
            { t: 'Frozen and burst pipes', v: 'depends', d: 'Covered if you kept the heat on, or shut off and drained the water.' },
            { t: 'Ice dams', v: 'depends', d: 'Water that backs up under the shingles is usually covered; fixing the roof\'s poor drainage isn\'t.' },
            { t: 'Winter wind', v: 'yes', d: 'Covered as windstorm.' },
          ],
        },
      ],
    },
    {
      t: 'Water',
      d: 'Where the water came from decides everything.',
      kids: [
        { t: 'Burst pipe or appliance leak', v: 'yes', d: 'Sudden water from inside the house is covered.' },
        { t: 'Slow leak over weeks or months', v: 'no', d: 'Treated as a maintenance problem, and so is the mold that follows.' },
        { t: 'Sewer or drain backup', v: 'depends', d: 'Only with a [[water-backup]] add-on.' },
        {
          t: 'Flood',
          v: 'no',
          href: '/personal/flood/',
          d: 'Rising water from outside. Excluded from home policies; covered by a separate [flood policy](/personal/flood/).',
          kids: [
            { t: 'River flooding', v: 'no', d: 'A river or creek overflowing its banks.' },
            { t: 'Flash and surface-water flooding', v: 'no', d: 'Heavy rain the ground and drains can\'t absorb.' },
            { t: 'Coastal flooding and storm surge', v: 'no', d: 'Seawater pushed inland by storms or very high tides.' },
            { t: 'Mudflow', v: 'no', d: 'A river of liquid mud. Covered by flood policies, unlike landslides.' },
          ],
        },
        { t: 'Groundwater seeping in', v: 'no', d: 'Water coming up through the foundation or basement floor.' },
      ],
    },
    {
      t: 'Fire',
      d: 'The oldest and most basic covered peril.',
      kids: [
        { t: 'House fire', v: 'yes', d: 'Covered, whatever started it, unless it was set on purpose by you.' },
        { t: 'Wildfire', v: 'yes', d: 'Covered, including smoke damage and living costs during an evacuation caused by nearby damage. In high-risk areas, getting a policy at all can be hard.' },
        { t: 'Smoke', v: 'yes', d: 'Sudden smoke damage is covered; normal fireplace smoke isn\'t.' },
        { t: 'Explosion', v: 'yes', d: 'Covered, such as a gas leak igniting.' },
      ],
    },
    {
      t: 'Earth movement',
      d: 'The ground shifting under the house. Mostly excluded.',
      kids: [
        { t: 'Earthquake', v: 'no', d: 'Needs a separate [earthquake policy](/personal/earthquake/). Fire caused by an earthquake is covered.' },
        { t: 'Landslide', v: 'no', d: 'Excluded, and hard to insure anywhere.' },
        { t: 'Sinkhole', v: 'depends', d: 'Excluded in most policies. In Florida, catastrophic ground collapse must be covered.' },
        { t: 'Volcanic eruption', v: 'yes', d: 'Lava, ash and blast are a named peril. The quakes it causes aren\'t.' },
      ],
    },
    {
      t: 'Human actions',
      d: 'Damage caused by someone, on purpose or by accident.',
      kids: [
        { t: 'Theft and burglary', v: 'yes', d: 'Covered, with low limits for cash, jewelry and firearms.' },
        { t: 'Vandalism', v: 'depends', d: 'Covered, unless the home has been empty for more than about 60 days.' },
        { t: 'Riot and civil commotion', v: 'yes', d: 'Covered.' },
        { t: 'Vehicle or aircraft hitting the house', v: 'yes', d: 'Covered.' },
        { t: 'Damage you cause on purpose', v: 'no', d: 'Never covered.' },
      ],
    },
    {
      t: 'Wear, time and living things',
      d: 'Slow damage insurers treat as upkeep, not accidents.',
      kids: [
        { t: 'Wear and tear, rust, rot', v: 'no', d: 'Not insurable.' },
        { t: 'Mold', v: 'no', d: 'Usually excluded, with a small allowance when a covered leak caused it.' },
        { t: 'Termites, rodents and other pests', v: 'no', d: 'Excluded; a sudden collapse from hidden insect damage is an exception.' },
        { t: 'Power surge from the utility', v: 'depends', d: 'Covered for wiring, but standard wording excludes electronic parts.' },
      ],
    },
    ...extra,
  ],
});

export const tree = [
  {
    t: 'Personal lines',
    d: 'Insurance for you, your household and your things.',
    href: '/personal/',
    kids: [
      {
        t: 'Property',
        d: 'Pays to repair or replace **your own** things after damage.',
        kids: [
          {
            t: 'Your home',
            d: 'The building and your belongings.',
            kids: [
              { t: 'Homeowners (HO-3, HO-5, HO-2)', d: 'The house you own and live in.', href: '/personal/home/' },
              { t: 'Renters (HO-4)', d: 'Your belongings when you rent.', href: '/personal/renters/' },
              { t: 'Condo (HO-6)', d: 'The inside of your unit.', href: '/personal/condo/' },
              { t: 'Landlord (DP-1, DP-2, DP-3)', d: 'A home you rent out, and the rent.', href: '/personal/landlord/' },
              { t: 'Flood', d: 'Bought separately; home policies exclude it.', href: '/personal/flood/' },
              { t: 'Earthquake', d: 'Bought separately or added on.', href: '/personal/earthquake/' },
            ],
          },
          {
            t: 'Your car',
            d: 'Damage to your own vehicle.',
            kids: [
              { t: 'Collision', d: 'Your car after a crash, whoever was at fault.', href: '/personal/auto/' },
              { t: 'Comprehensive', d: 'Theft, hail, flood, fire, animals and falling objects.', href: '/personal/auto/' },
            ],
          },
          perils(),
        ],
      },
      {
        t: 'Liability',
        d: 'Pays when **you harm someone else**, and pays your lawyers.',
        kids: [
          {
            t: 'At home and in daily life',
            d: 'Personal liability (Coverage E) in a home, renters or condo policy.',
            href: '/personal/home/',
            kids: [
              { t: 'Bodily injury', d: 'A guest slips on your stairs; your dog bites someone.' },
              { t: 'Property damage', d: 'Your bathtub overflows into the unit below.' },
              { t: 'Medical payments to others', d: 'A guest\'s small medical bills, whoever was at fault.' },
            ],
          },
          {
            t: 'On the road',
            d: 'The liability part of car insurance. Required in almost every state.',
            href: '/personal/auto/',
            kids: [
              { t: 'Bodily injury liability', d: 'Other people hurt in a crash you caused.' },
              { t: 'Property damage liability', d: 'Their car, fence or building.' },
              { t: 'Uninsured motorist', d: 'The reverse: pays you when the at-fault driver can\'t.' },
            ],
          },
          { t: 'Extra layer: umbrella', d: 'Adds $1 million or more on top of home and car liability.', href: '/personal/umbrella/' },
        ],
      },
      {
        t: 'People',
        d: 'Pays for **your health, income or life**, not for things.',
        kids: [
          { t: 'Health', d: 'Doctor, hospital and prescription costs.', href: '/personal/health/' },
          { t: 'Disability', d: 'Part of your income if you can\'t work.', href: '/personal/disability/' },
          { t: 'Life', d: 'Money for your family if you die.', href: '/personal/life/' },
        ],
      },
      {
        t: 'Trips and pets',
        d: 'Smaller policies that mix the three kinds.',
        kids: [
          {
            t: 'Travel',
            d: 'A bundle of property, money and health cover for one trip.',
            href: '/personal/travel/',
            kids: [
              { t: 'Trip cancellation and interruption', d: 'Prepaid costs, for listed reasons only.' },
              { t: 'Travel delay', d: 'Meals and a hotel after a set number of hours.' },
              { t: 'Baggage', d: 'Delayed or lost bags, above what the airline pays.' },
              { t: 'Emergency medical and evacuation', d: 'Care while abroad.' },
            ],
          },
          { t: 'Pet', d: 'Vet bills for accidents and illness.', href: '/personal/pet/' },
        ],
      },
    ],
  },
  {
    t: 'Commercial lines',
    d: 'Insurance for a business, its people and its work.',
    href: '/business/',
    kids: [
      {
        t: 'Property',
        d: 'The business\'s own buildings, equipment, stock and income.',
        kids: [
          { t: 'Buildings, equipment and stock', d: 'Commercial property, often inside a BOP.', href: '/business/commercial-property/' },
          { t: 'Lost income after damage', d: 'Business income and extra expense.', href: '/business/business-income/' },
          { t: 'Property that moves', d: 'Tools, equipment and goods in transit (inland marine).', href: '/business/inland-marine/' },
          { t: 'Vehicle damage', d: 'Collision and comprehensive on business vehicles.', href: '/business/commercial-auto/' },
          perils([
            {
              t: 'Business-only causes',
              d: 'Extra causes that matter to businesses. Usually need an add-on.',
              kids: [
                { t: 'Equipment breakdown', v: 'depends', d: 'A compressor, boiler or server failing. Needs an equipment breakdown add-on.' },
                { t: 'Spoilage', v: 'depends', d: 'Food or stock ruined by a power or cooling failure. Needs an add-on.' },
                { t: 'Employee theft and fraud', v: 'no', d: 'Needs a crime policy.' },
                { t: 'Cyberattack', v: 'no', d: 'Needs [cyber insurance](/business/cyber/).' },
              ],
            },
          ]),
        ],
      },
      {
        t: 'Liability',
        d: 'Claims that the business **harmed someone else**.',
        kids: [
          {
            t: 'General liability',
            d: 'Physical harm to the public, and harm through ads.',
            href: '/business/general-liability/',
            kids: [
              { t: 'Bodily injury and property damage (A)', d: 'A customer slips; a worker floods a client\'s home.' },
              { t: 'Products and completed work', d: 'Harm from something you sold or finished.' },
              { t: 'Personal and advertising injury (B)', d: 'Libel, slander, copying an ad idea.' },
              { t: 'Medical payments (C)', d: 'A visitor\'s small medical bills.' },
            ],
          },
          { t: 'Professional liability (E&O)', d: 'Money a client lost because of your advice or service.', href: '/business/professional-liability/' },
          { t: 'Management liability', d: 'D&O for leaders\' decisions; EPLI for employee claims.', href: '/business/management-liability/' },
          { t: 'Cyber liability', d: 'Claims after customer data is exposed.', href: '/business/cyber/' },
          { t: 'Commercial auto liability', d: 'Crashes involving business vehicles.', href: '/business/commercial-auto/' },
          { t: 'Extra layer: commercial umbrella', d: 'Sits on top of general, auto and employer\'s liability.', href: '/business/commercial-umbrella/' },
        ],
      },
      {
        t: 'People',
        d: 'The business\'s employees.',
        kids: [
          {
            t: 'Workers\' compensation',
            d: 'Required in nearly every state once you have employees.',
            href: '/business/workers-comp/',
            kids: [
              { t: 'Part 1: workers\' comp benefits', d: 'Medical care and lost wages for work injuries, set by state law.' },
              { t: 'Part 2: employer\'s liability', d: 'Lawsuits connected to work injuries.' },
            ],
          },
          { t: 'Employee benefits', d: 'Group health, life and disability plans offered to staff.', href: '/personal/health/' },
        ],
      },
    ],
  },
];
