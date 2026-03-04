"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import redDviderSvg2 from "../public/assets/icons/red-divider-2.svg";
import logoSvg from "../public/assets/logos/logo.svg";

export default function Footer() {
  const pathname = usePathname();
  const hideCta = pathname?.includes("landlords") || pathname?.includes("blog");

  return (
    <>
      <Image
        src={redDviderSvg2}
        alt="divider"
        width={1512}
        height={193}
        className="w-full   mx-auto"
      />
      <div className="w-full lg:px-20 px-5 bg-red flex flex-col items-center justify-center pb-10 md:mt-[-11%]">
        {!hideCta && (
          <>
            <h2 className="lg:text-[64px] text-[45px] text-white title text-center ">
              Ready to live <br /> together?
            </h2>
            <a href="#" className="mt-8 mb-24">
              <div className="w-[350px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-2 text-black  my-2 ">
                Apply now
              </div>
            </a>
          </>
        )}
        <footer className="w-full py-[52px] px-[44px] rounded-[20px] bg-[#651514]">
          {/* Top Section - Logo and Links */}
          <div className="flex flex-col md:flex-row justify-between border-b border-[#fff2e21c] pb-10 md:items-center gap-6 md:gap-0">
            <div>
              <Image src={logoSvg} alt="logo" width={156} height={100} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10">
              <Link
                href="/blog"
                className="text-white text-[16px] leading-[130%]"
              >
                Blog
              </Link>
              <Link
                href="/community"
                className="text-white text-[16px] leading-[130%]"
              >
                Community
              </Link>
              <Link
                href="/landlords"
                className="text-white text-[16px] leading-[130%]"
              >
                Landlords
              </Link>
              <Link
                href="/apply"
                className="text-white text-[16px] leading-[130%]"
              >
                Apply
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between mt-10 gap-4 md:gap-0">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Link
                href="/privacy-policy"
                className="text-[#A95251] text-[14px] leading-[130%]"
              >
                Privacy Policy
              </Link>
              {/* <span className='hidden md:inline text-[#A95251] text-[14px]'>|</span> */}
              <Link
                href="/terms-of-service"
                className="text-[#A95251] text-[14px] leading-[130%]"
              >
                Terms & conditions
              </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Link
                href="https://www.labba.studio"
                className="text-[#A95251] text-[14px] leading-[130%]"
              >
                Made by Labba Studio
              </Link>
              {/* <span className='hidden md:inline text-[#A95251] text-[14px]'>|</span> */}
              <p className="text-[#A95251] text-[14px] leading-[130%]">
                © {new Date().getFullYear()} Kali Coliving. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
