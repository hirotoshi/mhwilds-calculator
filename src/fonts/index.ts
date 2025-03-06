import localFont from "next/font/local";

export const inter = localFont({
  variable: "--font-inter",
  src: [
    { path: "./InterVariable.ttf" },
    { path: "./InterItalicVariable.ttf", style: "italic" },
  ],
});

export const fonts = { inter };

export default fonts;
