// The 16 named perils in standard broad-form home policies (HO-2, and
// belongings under HO-3), and the causes of loss usually excluded.

export const perils = [
  { id: 'fire', name: 'Fire or lightning', what: 'Damage from flames, heat and smoke from a fire, and from lightning strikes.', example: 'A candle sets the curtains alight and the living room burns; lightning splits a chimney.' },
  { id: 'wind-hail', name: 'Windstorm or hail', what: 'Wind, including hurricanes and tornadoes, and hail.', example: 'Hail dents the siding and cracks roof shingles.', catch: 'Rain or snow damage inside is covered only if wind or hail first made an opening in the roof or a wall.' },
  { id: 'explosion', name: 'Explosion', what: 'A sudden burst, like a gas leak igniting.', example: 'A gas grill explodes and damages the back porch.' },
  { id: 'riot', name: 'Riot or civil commotion', what: 'Damage by a crowd during a riot or violent disturbance.', example: 'Windows are smashed during unrest in your street.' },
  { id: 'aircraft', name: 'Aircraft', what: 'Anything from an aircraft hitting your property, including parts falling off.', example: 'A part falls off a passing plane and crashes through the roof.' },
  { id: 'vehicles', name: 'Vehicles', what: 'A car or truck hitting your house or belongings.', example: 'A driver loses control and crashes into your garage.', catch: 'Damage to a fence or driveway by a car someone in your household drives is often excluded.' },
  { id: 'smoke', name: 'Smoke', what: 'Sudden, accidental smoke damage, such as from a furnace malfunction or a nearby fire.', example: 'A furnace puffs back and coats the basement with soot.', catch: 'Smoke from a fireplace used normally, or from farming or industrial work, isn\'t covered.' },
  { id: 'vandalism', name: 'Vandalism or malicious mischief', what: 'Damage someone causes on purpose.', example: 'Someone spray-paints your garage door.', catch: 'Usually not covered once the home has been vacant for more than 60 days in a row.' },
  { id: 'theft', name: 'Theft', what: 'Things stolen, from your home or elsewhere, and damage done during a break-in.', example: 'A burglar breaks the back door and takes a laptop.', catch: 'Cash, jewelry, firearms and some other items have low limits. Theft by someone in your household isn\'t covered.' },
  { id: 'falling-objects', name: 'Falling objects', what: 'Something falling onto the house or your belongings.', example: 'A heavy branch crashes onto your patio furniture.', catch: 'Damage inside the house is covered only if the object first damaged the roof or an outside wall.' },
  { id: 'ice-snow', name: 'Weight of ice, snow or sleet', what: 'Damage when heavy ice or snow makes part of the house give way.', example: 'Wet snow piles up and the carport roof collapses.' },
  { id: 'water-discharge', name: 'Accidental discharge or overflow of water or steam', what: 'Water that escapes suddenly from plumbing, heating, air conditioning, a sprinkler system or an appliance.', example: 'The washing machine hose splits and soaks the laundry room floor.', catch: 'Slow, continuous leaks, sewer backup and flood aren\'t part of this peril.' },
  { id: 'tearing-apart', name: 'Sudden tearing apart, cracking, burning or bulging', what: 'A water heater, boiler, heating or air-conditioning system, or fire sprinkler system suddenly breaking apart.', example: 'The water heater tank splits and damages the floor around it.' },
  { id: 'freezing', name: 'Freezing', what: 'Plumbing, heating or air-conditioning systems, or appliances, freezing and breaking.', example: 'A pipe in an outside wall freezes and cracks during a cold snap.', catch: 'Covered only if you kept the house heated, or shut off and drained the water.' },
  { id: 'electrical', name: 'Sudden damage from artificial electrical current', what: 'Damage from a power surge or short circuit (not lightning, which is covered under fire).', example: 'A surge melts the wiring in a light fixture.', catch: 'The standard wording excludes damage to electronic parts, like TVs, computers and appliance circuit boards.' },
  { id: 'volcano', name: 'Volcanic eruption', what: 'Damage from lava, ash, dust and blast from an eruption.', example: 'Volcanic ash clogs the air conditioning in Hawaii.', catch: 'An earthquake caused by a volcano isn\'t included.' },
];

export const excludedCauses = [
  { name: 'Flood', example: 'Rising water from rain, rivers or storm surge.', fix: 'A separate [flood policy](/personal/flood/). For cars, [[comprehensive]].' },
  { name: 'Earthquake and earth movement', example: 'Shaking, landslides, sinkholes, mudflow.', fix: 'An [earthquake policy](/personal/earthquake/) or add-on. Sinkhole coverage in some states.' },
  { name: 'Sewer or drain backup', example: 'Sewage coming up through a basement drain.', fix: 'A [[water-backup]] endorsement.' },
  { name: 'Wear and tear', example: 'An old roof, worn pipes, rust, rot.', fix: 'Not insurable. It\'s maintenance.' },
  { name: 'Mold and rot', example: 'Mold after a leak that went on for months.', fix: 'Some policies cover a small amount when the mold resulted from a covered sudden leak.' },
  { name: 'Pests and animals', example: 'Termites, rats, birds, bedbugs.', fix: 'Not insurable. Prevention and pest control. A sudden collapse caused by hidden insect damage is usually covered, though.' },
  { name: 'Neglect', example: 'Not protecting the house after a loss, like leaving a broken window open to the rain.', fix: 'Not insurable. Take reasonable steps to prevent more damage and keep receipts.' },
  { name: 'Intentional damage', example: 'Damage you or a household member cause on purpose.', fix: 'Not insurable.' },
  { name: 'Power failure away from your home', example: 'A regional blackout spoils your freezer.', fix: 'Some policies offer food spoilage coverage.' },
  { name: 'Building code upgrades', example: 'The city requires new wiring when you rebuild.', fix: '[[ordinance-or-law|Ordinance or law coverage]], for more than the small amount included.' },
  { name: 'War and nuclear hazard', example: 'Acts of war, radiation.', fix: 'Not available to individuals.' },
];
