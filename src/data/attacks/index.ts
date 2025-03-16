import { Attack, Weapon } from "@/types";
import { BowAttacks } from "./bow";
import { DualBladesAttacks } from "./dualBlades";
import { GreatSwordAttacks } from "./greatSword";
import { GunlanceAttacks } from "./gunlance";
import { HammerAttacks } from "./hammer";
import { HeavyBowgunAttacks } from "./heavyBowgun";
import { HuntingHornAttacks } from "./huntingHorn";
import { InsectGlaiveAttacks } from "./insectGlaive";
import { LanceAttacks } from "./lance";
import { LightBowgunAttacks } from "./lightBowgun";
import { LongSwordAttacks } from "./longSword";
import { SwitchAxeAttacks } from "./switchAxe";
import { SwordAndShieldAttacks } from "./swordAndShield";

const Attacks: Record<Weapon, Attack[]> = {
  Bow: BowAttacks,
  ["Charge Blade"]: [],
  ["Dual Blades"]: DualBladesAttacks,
  ["Great Sword"]: GreatSwordAttacks,
  ["Gunlance"]: GunlanceAttacks,
  Hammer: HammerAttacks,
  ["Heavy Bowgun"]: HeavyBowgunAttacks,
  ["Hunting Horn"]: HuntingHornAttacks,
  ["Insect Glaive"]: InsectGlaiveAttacks,
  Lance: LanceAttacks,
  ["Light Bowgun"]: LightBowgunAttacks,
  ["Long Sword"]: LongSwordAttacks,
  ["Switch Axe"]: SwitchAxeAttacks,
  ["Sword and Shield"]: SwordAndShieldAttacks,
};

export default Attacks;
