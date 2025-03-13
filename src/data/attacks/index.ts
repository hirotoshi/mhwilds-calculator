import { Attack, Weapon } from "@/types";
import { BowAttacks } from "./bow";
import { DualBladesAttacks } from "./dualBlades";
import { GreatSwordAttacks } from "./greatSword";
import { GunlanceAttacks } from "./gunlance";
import { HeavyBowgunAttacks } from "./heavyBowgun";
import { HuntingHornAttacks } from "./huntingHorn";
import { LightBowgunAttacks } from "./lightBowgun";
import { LongSwordAttacks } from "./longSword";
import { SwitchAxeAttacks } from "./switchAxe";
import { SwordAndShieldAttacks } from "./swordAndShield";

const Attacks: Record<Weapon, Attack[]> = {
  Bow: BowAttacks,
  ["Dual Blades"]: DualBladesAttacks,
  ["Great Sword"]: GreatSwordAttacks,
  ["Gunlance"]: GunlanceAttacks,
  ["Heavy Bowgun"]: HeavyBowgunAttacks,
  ["Hunting Horn"]: HuntingHornAttacks,
  ["Light Bowgun"]: LightBowgunAttacks,
  ["Long Sword"]: LongSwordAttacks,
  ["Switch Axe"]: SwitchAxeAttacks,
  ["Sword and Shield"]: SwordAndShieldAttacks,
  Hammer: [],
  Lance: [],
  ["Charge Blade"]: [],
  ["Insect Glaive"]: [],
};

export default Attacks;
