"use client";

import { sans } from "@/app/fonts";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";

  return (
    <header className="flex justify-between items-center mb-14">
      <Link
        href="/"
        className={[
          sans.className,
          "inline-block text-2xl font-black",
          isActive ? "" : "hover:scale-[1.02]",
        ].join(" ")}
      >
        <span
          className="inline-block text-2xl font-black scale-100 active:scale-100"
          style={{
            "--myColor1": isActive ? "var(--text)" : "var(--pink)",
            "--myColor2": isActive ? "var(--text)" : "var(--purple)",
            backgroundImage:
              "linear-gradient(45deg, var(--myColor1), var(--myColor2))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            transition: "--myColor1 0.2s ease-out, --myColor2 0.2s ease-in-out",
          }}
        >
          overreacted
        </span>
      </Link>

      <Typography component="span" className="relative top-[4px] italic">
        by{" "}
        <Link href="https://danabra.mov" target="_blank" className="relative">
          <Image
            alt="Dan Abramov"
            src="https://github.com/gaearon.png"
            className="relative -top-1 mx-1 inline h-8 w-8 rounded-full"
            width={36}
            height={36}
          />
        </Link>
      </Typography>
    </header>
  );
};

export default Header;
