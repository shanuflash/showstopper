import "../styles/globals.css";
import styles from "../styles/page.module.css";
import Nav from "../components/nav";

import { Montserrat } from "next/font/google";
// import Providers from "@/redux/provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "ShowStopper",
  description: "A streaming service for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${styles.body}`}>
        {/* <Providers> */}
        <Nav />
        <div className={styles.content}>{children}</div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
