import { Browser, Page, test } from "@playwright/test";

// export const useState = (state: "loggedIn" | "clean") => {
//   const paths = {
//     loggedIn: "./src/data/states/state.json",
//     clean: "./src/data/states/default.json",
//   };
//   const path = paths[state];

//   test.use({
//     storageState: path,
//   });
// };

// export const useDevice = (device: TDevices) => {
//   const devices = {
//     "iphone-16": { width: 393, height: 852 }, // same as iphone 15, iphone 15 pro, iphone 16
//     "iphone-16-pro": { width: 402, height: 874 },
//     "iphone-16-pro-max": { width: 440, height: 956 },
//     "galaxy-s24": { width: 384, height: 824 },
//     "ipad-pro-12.9-p": { width: 1024, height: 1366 },
//     "ipad-pro-12.9-l": { width: 1366, height: 1024 },
//     "ipad-10.9-p": { width: 820, height: 1180 },
//     "ipad-10.9-l": { width: 1180, height: 820 },
//   };

//   const { width, height } = devices[device];

//   test.use({
//     viewport: { width, height },
//     isMobile: true,
//   });
// };

// iphone 15, iphone 15 pro, iphone 16
export const useNativeMobile = () => {
  test.use({
    viewport: { width: 393, height: 852 },
    isMobile: true,
    userAgent: "jOS Mobile",
  });
};

export const createPage = async (browser: Browser): Promise<Page> => {
  const context = await browser.newContext();
  return context.newPage();
};

export const hasDuplicates = (array: string[]): boolean =>
  new Set(array).size !== array.length;

export const stringifyTxt = (text: string): string =>
  text.split("\n").join(" ").trim();

export const removeHttpTags = (arr: string[]): string[] =>
  arr.map(title =>
    title.replace(/<(\/?strong>)|(&nbsp;)|(\u00a0)|(\u2006)/gi, " ")
  );

export const umlautsRelpacer = (str: string): string =>
  str.toLocaleLowerCase().replace(/[äöüß]/g, match => {
    switch (match) {
      case "ä":
        return "ae";
      case "ö":
        return "oe";
      case "ü":
        return "ue";
      case "ß":
        return "ss";
      default:
        return str;
    }
  });

export const replacer = (str: string): string => {
  const replacedStr = umlautsRelpacer(str);
  return replacedStr
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .concat("-li");
};

export const removeExtraSpaces = (str: string): string =>
  str.trim().replace(/\s+/g, " ").replace(/-\s/g, "-");

export const isAlphabeticallySorted = (arr: string[]) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].toLowerCase() < arr[i - 1].toLowerCase()) return false;
  }
  return true;
};

export const getByDataTestId = (selector: string): string =>
  `[data-testid="${selector}"], [data-test-id="${selector}"]`;

export const capitalize = (str: string): string =>
  str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("-");

// Helper function to check if an image size value is within a range
export const isWithinRange = (
  value: number,
  target: number,
  range: number
): boolean => value >= target - range && value <= target + range;
