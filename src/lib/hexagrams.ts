export const hexagramNames = [
  "乾",
  "坤",
  "屯",
  "蒙",
  "需",
  "訟",
  "師",
  "比",
  "小畜",
  "履",
  "泰",
  "否",
  "同人",
  "大有",
  "謙",
  "豫",
  "隨",
  "蠱",
  "臨",
  "觀",
  "噬嗑",
  "賁",
  "剝",
  "復",
  "無妄",
  "大畜",
  "頤",
  "大過",
  "坎",
  "離",
  "咸",
  "恆",
  "遯",
  "大壯",
  "晉",
  "明夷",
  "家人",
  "睽",
  "蹇",
  "解",
  "損",
  "益",
  "夬",
  "姤",
  "萃",
  "升",
  "困",
  "井",
  "革",
  "鼎",
  "震",
  "艮",
  "漸",
  "歸妹",
  "豐",
  "旅",
  "巽",
  "兌",
  "渙",
  "節",
  "中孚",
  "小過",
  "既濟",
  "未濟",
];

export const pages = [
  25, 47, 59, 67, 75, 81, 89, 97, 103, 109, 115, 123, 129, 137, 143, 149, 155,
  163, 171, 177, 183, 191, 197, 203, 211, 217, 223, 229, 235, 241, 249, 257,
  263, 279, 275, 281, 289, 295, 303, 309, 317, 325, 333, 339, 347, 355, 361,
  369, 375, 383, 389, 395, 401, 407, 413, 419, 425, 431, 437, 443, 449, 457,
  465, 473,
];

export const hexagramMapping: { [key: string]: number } = {
  "111111": 1,
  "000000": 2,
  "010001": 3,
  "100010": 4,
  "111010": 5,
  "010111": 6,
  "000010": 7,
  "010000": 8,
  "111011": 9,
  "110111": 10,
  "000111": 11,
  "111000": 12,
  "111101": 13,
  "101111": 14,
  "000100": 15,
  "001000": 16,
  "011001": 17,
  "100110": 18,
  "000011": 19,
  "110000": 20,
  "101001": 21,
  "100101": 22,
  "100000": 23,
  "000001": 24,
  "111001": 25,
  "100111": 26,
  "100001": 27,
  "011110": 28,
  "010010": 29,
  "101101": 30,
  "011100": 31,
  "001110": 32,
  "111100": 33,
  "001111": 34,
  "101000": 35,
  "000101": 36,
  "110101": 37,
  "101011": 38,
  "010100": 39,
  "001010": 40,
  "100011": 41,
  "110001": 42,
  "011111": 43,
  "111110": 44,
  "011000": 45,
  "000110": 46,
  "011010": 47,
  "010110": 48,
  "011101": 49,
  "101110": 50,
  "001001": 51,
  "100100": 52,
  "110100": 53,
  "001011": 54,
  "001101": 55,
  "101100": 56,
  "110110": 57,
  "011011": 58,
  "110010": 59,
  "010011": 60,
  "110011": 61,
  "001100": 62,
  "010101": 63,
  "101010": 64,
};

export interface HexagramInfo {
  number: number;
  name: string;
  fullName: string;
  page: number;
}

export function getHexagramInfo(select: boolean[]): HexagramInfo | null {
  const binaryString = select.map((isYang) => (isYang ? "1" : "0")).join("");
  const hexagramNumber = hexagramMapping[binaryString];

  if (hexagramNumber) {
    const name = hexagramNames[hexagramNumber - 1];
    const fullName = `第${hexagramNumber}卦 - ${name}`;
    const page = pages[hexagramNumber - 1];
    return { number: hexagramNumber, name, fullName, page };
  }
  return null;
}

export interface ChangedHexagramInfo extends HexagramInfo {
  changedLines: boolean[];
}

export function getChangedHexagramInfo(
  select: boolean[],
  changingLines: boolean[]
): ChangedHexagramInfo | null {
  const changedSelect = select.map((isYang, index) =>
    changingLines[index] ? !isYang : isYang
  );
  const info = getHexagramInfo(changedSelect);
  if (info) {
    return {
      ...info,
      changedLines: changedSelect,
    };
  }
  return null;
}
