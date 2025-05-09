window.CommonData = window.CommonData || {};

CommonData.STATS_MAPPING = {
  experienceGainIncrease: "경험치획득증가",
  lootAcquisitionIncrease: "전리품획득증가",
  movementSpeed: "이동속도",
  damageResistancePenetration: "피해저항관통",
  healthIncreasePercent: "체력증가%",
  magicIncreasePercent: "마력증가%",
  damageResistance: "피해저항",
  pvpDamagePercent: "대인피해%",
  pvpDefensePercent: "대인방어%",
  pvpDamage: "대인피해",
  pvpDefense: "대인방어",
  statusEffectAccuracy: "상태이상적중",
  statusEffectResistance: "상태이상저항",
  normalMonsterAdditionalDamage: "일반몬스터추가피해",
  normalMonsterPenetration: "일반몬스터관통",
  normalMonsterResistance: "일반몬스터저항",
  bossMonsterAdditionalDamage: "보스몬스터추가피해",
  bossMonsterPenetration: "보스몬스터관통",
  bossMonsterResistance: "보스몬스터저항",
  criticalPowerPercent: "치명위력%",
  destructionPowerIncrease: "파괴력증가",
  destructionPowerPercent: "파괴력증가%",
  criticalDamageResistance: "치명피해저항",
  criticalResistance: "치명저항",
  armorStrength: "무장도",
  strength: "힘",
  agility: "민첩",
  intelligence: "지력",
  power: "위력",
  damageAbsorption: "피해흡수",
  healthIncrease: "체력증가",
  magicIncrease: "마력증가",
  healthPotionEnhancement: "체력시약향상",
  magicPotionEnhancement: "마력시약향상",
  damageIncrease: "피해증가",
  healthRecoveryImprovement: "체력회복향상",
  magicRecoveryImprovement: "마나회복향상",
  criticalChance: "치명확률",
  criticalPower: "치명위력",
};

CommonData.CATEGORY_FILE_MAP = {
  수호: {
    registration: "guardian-registration-stats",
    bind: "guardian-bind-stats",
  },
  탑승: {
    registration: "ride-registration-stats",
    bind: "ride-bind-stats",
  },
  변신: {
    registration: "transform-registration-stats",
    bind: "transform-bind-stats",
  },
};

CommonData.DOCUMENT_MAP = {
  "guardian-bind-stats.json": "data-1745203971906",
  "guardian-registration-stats.json": "data-1745203990701",
  "ride-bind-stats.json": "data-1745204015994",
  "ride-registration-stats.json": "data-1745204029836",
  "transform-bind-stats.json": "data-1745204045512",
  "transform-registration-stats.json": "data-1745204058405",
  "gradeSetEffects.json": "data-1745204079667",
  "factionSetEffects.json": "data-1745204094503",
  "chak.json": "data-1745204108850",
};

CommonData.FACTION_ICONS = {
  결의: "assets/img/bond/결의.jpg",
  고요: "assets/img/bond/고요.jpg",
  냉정: "assets/img/bond/냉정.jpg",
  의지: "assets/img/bond/의지.jpg",
  침착: "assets/img/bond/침착.jpg",
  활력: "assets/img/bond/활력.jpg",
};

CommonData.FIXED_LEVEL25_SPIRITS = [
  "결의의 탑승",
  "결의의 수호",
  "결의의 변신",
  "의지의 탑승",
  "의지의 수호",
  "의지의 변신",
  "냉정의 탑승",
  "냉정의 수호",
  "냉정의 변신",
  "침착의 탑승",
  "침착의 수호",
  "침착의 변신",
  "고요의 탑승",
  "고요의 수호",
  "고요의 변신",
  "활력의 탑승",
  "활력의 수호",
  "활력의 변신",
];

CommonData.STAT_COLOR_MAP = {
  damageResistance: "stat-damage-resistance",
  damageResistancePenetration: "stat-damage-resistance-penetration",
  pvpDefensePercent: "stat-pvp-defense-percent",
  pvpDamagePercent: "stat-pvp-damage-percent",
  healthIncreasePercent: "stat-health-increase-percent",
  criticalPowerPercent: "stat-critical-power-percent",
  magicIncreasePercent: "stat-magic-increase-percent",
  destructionPowerPercent: "stat-destruction-power-percent",
  criticalChance: "stat-critical-chance",
  bossMonsterAdditionalDamage: "stat-boss-monster-additional-damage",
};

CommonData.PERCENT_STATS = [
  "healthIncreasePercent",
  "magicIncreasePercent",
  "criticalPowerPercent",
  "pvpDamagePercent",
  "pvpDefensePercent",
  "destructionPowerPercent",
];

CommonData.SPECIAL_STAT_CLASSES = {
  피해저항: "stat-damage-resistance",
  피해저항관통: "stat-damage-resistance-penetration",
  "대인방어%": "stat-pvp-defense-percent",
  "대인피해%": "stat-pvp-damage-percent",
};

CommonData.STATS_ORDER = [
  "lootAcquisitionIncrease",
  "experienceGainIncrease",
  "pvpDamagePercent",
  "pvpDefensePercent",
  "damageResistancePenetration",
  "damageResistance",
  "pvpDamage",
  "pvpDefense",
  "healthIncreasePercent",
  "magicIncreasePercent",
  "bossMonsterAdditionalDamage",
  "bossMonsterPenetration",
  "statusEffectAccuracy",
  "statusEffectResistance",
  "criticalPowerPercent",
  "movementSpeed",
];

CommonData.GRADE_SET_EFFECTS = {
  수호: {
    전설: {
      2: { power: 150 },
      3: { power: 150, experienceGainIncrease: 10 },
      4: {
        power: 150,
        experienceGainIncrease: 10,
        damageResistancePenetration: 100,
      },
      5: {
        power: 150,
        experienceGainIncrease: 10,
        damageResistancePenetration: 100,
        statusEffectResistance: 150,
      },
      6: {
        power: 150,
        experienceGainIncrease: 10,
        damageResistancePenetration: 100,
        statusEffectResistance: 150,
        damageResistance: 100,
      },
    },
    불멸: {
      2: { damageResistancePenetration: 200 },
      3: { damageResistancePenetration: 200, damageResistance: 150 },
      4: {
        damageResistancePenetration: 200,
        damageResistance: 150,
        experienceGainIncrease: 15,
      },
      5: {
        damageResistancePenetration: 200,
        damageResistance: 150,
        experienceGainIncrease: 15,
        pvpDamagePercent: 20,
      },
      6: {
        damageResistancePenetration: 200,
        damageResistance: 150,
        experienceGainIncrease: 15,
        pvpDamagePercent: 20,
        pvpDefensePercent: 20,
      },
    },
  },
  탑승: {
    전설: {
      2: { normalMonsterAdditionalDamage: 50 },
      3: { normalMonsterAdditionalDamage: 50, bossMonsterAdditionalDamage: 50 },
      4: {
        normalMonsterAdditionalDamage: 50,
        bossMonsterAdditionalDamage: 50,
        damageResistancePenetration: 50,
      },
      5: {
        normalMonsterAdditionalDamage: 50,
        bossMonsterAdditionalDamage: 50,
        damageResistancePenetration: 50,
        statusEffectAccuracy: 50,
      },
      6: {
        normalMonsterAdditionalDamage: 50,
        bossMonsterAdditionalDamage: 50,
        damageResistancePenetration: 50,
        statusEffectAccuracy: 50,
        damageResistance: 50,
      },
    },
    불멸: {
      2: { damageResistancePenetration: 150 },
      3: { damageResistancePenetration: 150, damageResistance: 150 },
      4: {
        damageResistancePenetration: 150,
        damageResistance: 150,
        movementSpeed: 5,
      },
      5: {
        damageResistancePenetration: 150,
        damageResistance: 150,
        movementSpeed: 5,
        pvpDamagePercent: 20,
      },
      6: {
        damageResistancePenetration: 150,
        damageResistance: 150,
        movementSpeed: 5,
        pvpDamagePercent: 20,
        pvpDefensePercent: 20,
      },
    },
  },
  변신: {
    전설: {
      2: { magicIncreasePercent: 3 },
      3: { magicIncreasePercent: 3, healthIncreasePercent: 3 },
      4: {
        magicIncreasePercent: 3,
        healthIncreasePercent: 3,
        damageResistancePenetration: 100,
      },
      5: {
        magicIncreasePercent: 3,
        healthIncreasePercent: 3,
        damageResistancePenetration: 100,
        movementSpeed: 3,
      },
      6: {
        magicIncreasePercent: 3,
        healthIncreasePercent: 3,
        damageResistancePenetration: 100,
        movementSpeed: 3,
        damageResistance: 100,
      },
    },
    불멸: {
      2: { damageResistancePenetration: 150 },
      3: { damageResistancePenetration: 150, damageResistance: 150 },
      4: {
        damageResistancePenetration: 150,
        damageResistance: 150,
        criticalPowerPercent: 30,
      },
      5: {
        damageResistancePenetration: 150,
        damageResistance: 150,
        criticalPowerPercent: 30,
        pvpDamagePercent: 20,
      },
      6: {
        damageResistancePenetration: 150,
        damageResistance: 150,
        criticalPowerPercent: 30,
        pvpDamagePercent: 20,
        pvpDefensePercent: 20,
      },
    },
  },
};

CommonData.FACTION_SET_EFFECTS = {
  탑승: {
    고요: [
      {
        criticalChance: 200,
        healthIncreasePercent: 1,
        destructionPowerIncrease: 7000,
        개수: 2,
      },
      {
        criticalChance: 400,
        healthIncreasePercent: 1,
        destructionPowerIncrease: 12000,
        개수: 3,
      },
      {
        개수: 4,
        destructionPowerIncrease: 15000,
        healthIncreasePercent: 2,
        criticalChance: 600,
      },
      {
        criticalChance: 700,
        destructionPowerIncrease: 21000,
        개수: 5,
        healthIncreasePercent: 2,
      },
      {
        개수: 6,
        destructionPowerIncrease: 25000,
        criticalChance: 1000,
        healthIncreasePercent: 3,
      },
    ],
    침착: [
      {
        magicIncreasePercent: 1,
        피해증가: 5,
        개수: 2,
        마력회복향상: 3,
      },
      {
        개수: 3,
        피해증가: 7,
        magicIncreasePercent: 1,
        마력회복향상: 4,
      },
      {
        magicIncreasePercent: 2,
        개수: 4,
        마력회복향상: 7,
        피해증가: 12,
      },
      {
        피해증가: 14,
        개수: 5,
        마력회복향상: 8,
        magicIncreasePercent: 2,
      },
      {
        피해증가: 20,
        마력회복향상: 12,
        개수: 6,
        magicIncreasePercent: 3,
      },
    ],
    냉정: [
      {
        criticalPowerPercent: 5,
        개수: 2,
        pvpDefense: 600,
        healthIncreasePercent: 1,
      },
      {
        healthIncreasePercent: 1,
        개수: 3,
        pvpDefense: 900,
        criticalPowerPercent: 7,
      },
      {
        healthIncreasePercent: 2,
        개수: 4,
        pvpDefense: 1500,
        criticalPowerPercent: 12,
      },
      {
        healthIncreasePercent: 2,
        criticalPowerPercent: 14,
        개수: 5,
        pvpDefense: 1700,
      },
      {
        criticalPowerPercent: 20,
        pvpDefense: 2500,
        healthIncreasePercent: 3,
        개수: 6,
      },
    ],
    의지: [
      {
        magicIncreasePercent: 1,
        개수: 2,
        damageAbsorption: 500,
        criticalDamageResistance: 60,
      },
      {
        개수: 3,
        damageAbsorption: 700,
        criticalDamageResistance: 90,
        magicIncreasePercent: 1,
      },
      {
        damageAbsorption: 1200,
        criticalDamageResistance: 150,
        개수: 4,
        magicIncreasePercent: 2,
      },
      {
        criticalDamageResistance: 170,
        damageAbsorption: 1300,
        magicIncreasePercent: 2,
        개수: 5,
      },
      {
        개수: 6,
        magicIncreasePercent: 3,
        criticalDamageResistance: 250,
        damageAbsorption: 2000,
      },
    ],
    활력: [
      {
        체력회복향상: 3,
        healthIncreasePercent: 1,
        power: 50,
        개수: 2,
      },
      {
        체력회복향상: 4,
        power: 70,
        healthIncreasePercent: 1,
        개수: 3,
      },
      {
        healthIncreasePercent: 2,
        power: 120,
        체력회복향상: 7,
        개수: 4,
      },
      {
        개수: 5,
        체력회복향상: 8,
        power: 140,
        healthIncreasePercent: 2,
      },
      {
        power: 200,
        개수: 6,
        체력회복향상: 12,
        healthIncreasePercent: 3,
      },
    ],
    결의: [
      {
        magicIncreasePercent: 1,
        시전향상: 60,
        criticalPower: 250,
        개수: 2,
      },
      {
        criticalPower: 500,
        시전향상: 90,
        개수: 3,
        magicIncreasePercent: 1,
      },
      {
        시전향상: 150,
        개수: 4,
        magicIncreasePercent: 2,
        criticalPower: 750,
      },
      {
        criticalPower: 850,
        시전향상: 170,
        magicIncreasePercent: 2,
        개수: 5,
      },
      {
        criticalPower: 1200,
        시전향상: 200,
        개수: 6,
        magicIncreasePercent: 3,
      },
    ],
  },
  변신: {
    활력: [
      {
        damageResistance: 50,
        bossMonsterAdditionalDamage: 120,
        movementSpeed: 1,
        개수: 2,
      },
      {
        damageResistance: 80,
        movementSpeed: 1,
        bossMonsterAdditionalDamage: 200,
        개수: 3,
      },
      {
        movementSpeed: 3,
        bossMonsterAdditionalDamage: 300,
        개수: 4,
        damageResistance: 130,
      },
      {
        movementSpeed: 3,
        개수: 5,
        damageResistance: 150,
        bossMonsterAdditionalDamage: 350,
      },
      {
        damageResistance: 200,
        movementSpeed: 4,
        개수: 6,
        bossMonsterAdditionalDamage: 450,
      },
    ],
    침착: [
      {
        개수: 2,
        damageResistance: 50,
        movementSpeed: 1,
        normalMonsterAdditionalDamage: 120,
      },
      {
        개수: 3,
        normalMonsterAdditionalDamage: 200,
        movementSpeed: 1,
        damageResistance: 80,
      },
      {
        normalMonsterAdditionalDamage: 300,
        movementSpeed: 3,
        개수: 4,
        damageResistance: 130,
      },
      {
        normalMonsterAdditionalDamage: 350,
        movementSpeed: 3,
        damageResistance: 150,
        개수: 5,
      },
      {
        개수: 6,
        damageResistance: 200,
        normalMonsterAdditionalDamage: 450,
        movementSpeed: 4,
      },
    ],
    고요: [
      {
        damageResistancePenetration: 30,
        pvpDefense: 1000,
        개수: 2,
        movementSpeed: 1,
      },
      {
        damageResistancePenetration: 50,
        pvpDefense: 1500,
        movementSpeed: 1,
        개수: 3,
      },
      {
        movementSpeed: 3,
        개수: 4,
        damageResistancePenetration: 80,
        pvpDefense: 2500,
      },
      {
        movementSpeed: 3,
        개수: 5,
        damageResistancePenetration: 90,
        pvpDefense: 2800,
      },
      {
        movementSpeed: 4,
        개수: 6,
        damageResistancePenetration: 130,
        pvpDefense: 4000,
      },
    ],
    의지: [
      {
        damageResistance: 50,
        movementSpeed: 1,
        개수: 2,
        criticalDamageResistance: 120,
      },
      {
        movementSpeed: 1,
        criticalDamageResistance: 200,
        개수: 3,
        damageResistance: 80,
      },
      {
        개수: 4,
        criticalDamageResistance: 300,
        damageResistance: 130,
        movementSpeed: 3,
      },
      {
        movementSpeed: 3,
        개수: 5,
        damageResistance: 150,
        criticalDamageResistance: 370,
      },
      {
        개수: 6,
        movementSpeed: 4,
        criticalDamageResistance: 450,
        damageResistance: 200,
      },
    ],
    결의: [
      {
        damageResistancePenetration: 30,
        movementSpeed: 1,
        damageAbsorption: 700,
        개수: 2,
      },
      {
        개수: 3,
        movementSpeed: 1,
        damageAbsorption: 1200,
        damageResistancePenetration: 50,
      },
      {
        movementSpeed: 3,
        damageAbsorption: 2000,
        개수: 4,
        damageResistancePenetration: 80,
      },
      {
        damageResistancePenetration: 90,
        movementSpeed: 3,
        damageAbsorption: 2300,
        개수: 5,
      },
      {
        damageAbsorption: 3000,
        movementSpeed: 4,
        개수: 6,
        damageResistancePenetration: 130,
      },
    ],
    냉정: [
      {
        개수: 2,
        damageResistancePenetration: 30,
        시전향상: 100,
        movementSpeed: 1,
      },
      {
        개수: 3,
        damageResistancePenetration: 50,
        movementSpeed: 1,
        시전향상: 150,
      },
      {
        시전향상: 250,
        damageResistancePenetration: 80,
        movementSpeed: 3,
        개수: 4,
      },
      {
        시전향상: 270,
        movementSpeed: 3,
        개수: 5,
        damageResistancePenetration: 90,
      },
      {
        개수: 6,
        movementSpeed: 4,
        시전향상: 400,
        damageResistancePenetration: 130,
      },
    ],
  },
  수호: {
    침착: [
      {
        damageResistancePenetration: 30,
        experienceGainIncrease: 4,
        damageAbsorption: 700,
        개수: 2,
      },
      {
        damageAbsorption: 1200,
        damageResistancePenetration: 50,
        개수: 3,
        experienceGainIncrease: 6,
      },
      {
        damageResistancePenetration: 80,
        experienceGainIncrease: 10,
        개수: 4,
        damageAbsorption: 2000,
      },
      {
        experienceGainIncrease: 12,
        damageAbsorption: 2200,
        damageResistancePenetration: 90,
        개수: 5,
      },
      {
        experienceGainIncrease: 15,
        damageAbsorption: 3000,
        개수: 6,
        damageResistancePenetration: 130,
      },
    ],
    결의: [
      {
        damageResistance: 50,
        normalMonsterAdditionalDamage: 100,
        개수: 2,
        experienceGainIncrease: 4,
      },
      {
        개수: 3,
        experienceGainIncrease: 6,
        damageResistance: 80,
        normalMonsterAdditionalDamage: 150,
      },
      {
        normalMonsterAdditionalDamage: 250,
        개수: 4,
        damageResistance: 130,
        experienceGainIncrease: 10,
      },
      {
        damageResistance: 150,
        normalMonsterAdditionalDamage: 270,
        experienceGainIncrease: 12,
        개수: 5,
      },
      {
        experienceGainIncrease: 15,
        damageResistance: 200,
        개수: 6,
        normalMonsterAdditionalDamage: 400,
      },
    ],
    냉정: [
      {
        개수: 2,
        damageResistancePenetration: 30,
        pvpDefense: 1000,
        experienceGainIncrease: 4,
      },
      {
        damageResistancePenetration: 50,
        개수: 3,
        experienceGainIncrease: 6,
        pvpDefense: 1500,
      },
      {
        damageResistancePenetration: 80,
        pvpDefense: 2500,
        experienceGainIncrease: 10,
        개수: 4,
      },
      {
        개수: 5,
        damageResistancePenetration: 90,
        experienceGainIncrease: 12,
        pvpDefense: 2700,
      },
      {
        experienceGainIncrease: 15,
        damageResistancePenetration: 130,
        pvpDefense: 4000,
        개수: 6,
      },
    ],
    고요: [
      {
        experienceGainIncrease: 4,
        개수: 2,
        bossMonsterAdditionalDamage: 100,
        damageResistance: 50,
      },
      {
        개수: 3,
        damageResistance: 80,
        experienceGainIncrease: 6,
        bossMonsterAdditionalDamage: 150,
      },
      {
        experienceGainIncrease: 10,
        개수: 4,
        damageResistance: 130,
        bossMonsterAdditionalDamage: 250,
      },
      {
        개수: 5,
        damageResistance: 150,
        bossMonsterAdditionalDamage: 270,
        experienceGainIncrease: 12,
      },
      {
        bossMonsterAdditionalDamage: 400,
        experienceGainIncrease: 15,
        개수: 6,
        damageResistance: 200,
      },
    ],
    의지: [
      {
        개수: 2,
        criticalDamageResistance: 100,
        damageResistance: 50,
        experienceGainIncrease: 4,
      },
      {
        criticalDamageResistance: 150,
        damageResistance: 80,
        experienceGainIncrease: 6,
        개수: 3,
      },
      {
        experienceGainIncrease: 10,
        damageResistance: 130,
        개수: 4,
        criticalDamageResistance: 250,
      },
      {
        experienceGainIncrease: 12,
        damageResistance: 150,
        개수: 5,
        criticalDamageResistance: 270,
      },
      {
        damageResistance: 200,
        criticalDamageResistance: 400,
        개수: 6,
        experienceGainIncrease: 15,
      },
    ],
    활력: [
      {
        시전향상: 100,
        개수: 2,
        experienceGainIncrease: 4,
        damageResistancePenetration: 30,
      },
      {
        experienceGainIncrease: 6,
        개수: 3,
        시전향상: 150,
        damageResistancePenetration: 50,
      },
      {
        개수: 4,
        experienceGainIncrease: 10,
        시전향상: 250,
        damageResistancePenetration: 80,
      },
      {
        시전향상: 270,
        개수: 5,
        experienceGainIncrease: 12,
        damageResistancePenetration: 90,
      },
      {
        experienceGainIncrease: 15,
        시전향상: 400,
        damageResistancePenetration: 130,
        개수: 6,
      },
    ],
  },
};
