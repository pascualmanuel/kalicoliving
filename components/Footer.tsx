"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useApplyPopup } from "@/context/ApplyPopupContext";
import redDviderSvg2 from "../public/assets/icons/red-divider-2.svg";
import logoSvg from "../public/assets/logos/logo.svg";
import linkedinIcon from "../public/assets/icons/linkedin-icon.svg";
import instagramIcon from "../public/assets/icons/instagram-icon.svg";
export default function Footer() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const { openApplyPopup } = useApplyPopup();
  const hideCta = pathname?.includes("landlords") || pathname?.includes("blog");

  return (
    <>
      <Image
        src={redDviderSvg2}
        alt=""
        width={1512}
        height={193}
        className="w-full   mx-auto"
      />
      <div className="w-full lg:px-20 px-5 bg-red flex flex-col items-center justify-center pb-10 md:mt-[-11%]">
        {!hideCta && (
          <>
            <h2 className="lg:text-[64px] text-[45px] text-white title text-center max-w-[400px]">
              {t("ctaTitle")}
            </h2>
            <button
              type="button"
              onClick={openApplyPopup}
              className="mt-8 mb-24 w-[350px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-2 text-black my-2 hover:bg-white-hover transition-colors"
            >
              {t("applyNow")}
            </button>
          </>
        )}
        <footer className="w-full py-[52px] px-[44px] rounded-[20px] bg-[#651514]">
          {/* Top Section - Logo and Links */}
          <div className="flex flex-col md:flex-row justify-between pb-10 md:items-center gap-6 md:gap-0">
            <div>
              <Image src={logoSvg} alt="logo" width={156} height={100} />
            </div>
            <div className="flex gap-4">
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/kali-co-living"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Image
                  src={linkedinIcon}
                  alt="linkedin"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/kali_coliving/"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Image
                  src={instagramIcon}
                  alt="instagram"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between border-b border-[#fff2e21c] pb-10 md:items-center gap-6 md:gap-0">
            <div>
              {/* <Image src={logoSvg} alt="logo" width={156} height={100} /> */}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10">
              <Link
                href="/blog"
                className="group block text-white text-[16px] leading-[130%]"
              >
                <span className="inline-block h-[1.3em] overflow-hidden align-middle">
                  <span className="block transition-transform duration-300 ease-out group-hover:[transform:translateY(calc(-1.3em-20px))]">
                    <span className="block h-[1.3em] leading-[130%]">Blog</span>
                    <span className="block h-[1.3em] leading-[130%] mt-5">
                      Blog
                    </span>
                  </span>
                </span>
              </Link>
              <Link
                href="/community"
                className="group block text-white text-[16px] leading-[130%]"
              >
                <span className="inline-block h-[1.3em] overflow-hidden align-middle">
                  <span className="block transition-transform duration-300 ease-out group-hover:[transform:translateY(calc(-1.3em-20px))]">
                    <span className="block h-[1.3em] leading-[130%]">
                      Community
                    </span>
                    <span className="block h-[1.3em] leading-[130%] mt-5">
                      Community
                    </span>
                  </span>
                </span>
              </Link>
              <Link
                href="/landlords"
                className="group block text-white text-[16px] leading-[130%]"
              >
                <span className="inline-block h-[1.3em] overflow-hidden align-middle">
                  <span className="block transition-transform duration-300 ease-out group-hover:[transform:translateY(calc(-1.3em-20px))]">
                    <span className="block h-[1.3em] leading-[130%]">
                      Landlords
                    </span>
                    <span className="block h-[1.3em] leading-[130%] mt-5">
                      Landlords
                    </span>
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={openApplyPopup}
                className="group block text-left text-white text-[16px] leading-[130%]"
              >
                <span className="inline-block h-[1.3em] overflow-hidden align-middle">
                  <span className="block transition-transform duration-300 ease-out group-hover:[transform:translateY(calc(-1.3em-20px))]">
                    <span className="block h-[1.3em] leading-[130%]">
                      Apply
                    </span>
                    <span className="block h-[1.3em] leading-[130%] mt-5">
                      Apply
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between mt-10 gap-4 md:gap-0">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Link
                href="/cookies"
                className="text-[#A95251] text-[14px] leading-[130%]"
              >
                Cookies
              </Link>
              {/* <span className='hidden md:inline text-[#A95251] text-[14px]'>|</span> */}
              <Link
                href="/privacy-policy"
                className="text-[#A95251] text-[14px] leading-[130%]"
              >
                Privacy Policy
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
