"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  FlaskConical,
  LayoutDashboard,
  MapPin,
  MonitorSpeaker,
  Stethoscope,
  User,
} from "lucide-react";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="text-3xl font-semibold text-white">
          Satish Wagle
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ArrowLeft />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}

          <ul>
            <li>
              <Link
                href="/"
                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  (pathname === "/" || pathname.includes("administration")) &&
                  "bg-graydark dark:bg-meta-4"
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
            </li>
          </ul>

          <SidebarLinkGroup
            activeCondition={
              pathname === "/patient" ||
              pathname === "/location" ||
              pathname === "/organization" ||
              pathname === "/practitioner" ||
              pathname === "/care-team" ||
              pathname === "/device"
            }
          >
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <Link
                    href="#"
                    className={`$ } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark
                    dark:hover:bg-meta-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    Administration
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </Link>
                  {/* <!-- Dropdown Menu Start --> */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                      <li>
                        <Link
                          href="/patient"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("patient") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <User className="h-4 w-4" />
                          Patient
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/location"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("location") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <MapPin className="h-4 w-4" />
                          Location
                        </Link>
                      </li>
                      {/* <!-- Menu Item location --> */}

                      {/* <!-- Menu Item organization --> */}
                      <li>
                        <Link
                          href="/organization"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("organization") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <Building2 className="h-4 w-4" />
                          Organization
                        </Link>
                      </li>
                      {/* <!-- Menu Item organization --> */}

                      {/* <!-- Menu Item Practitioner --> */}
                      <li>
                        <Link
                          href="/practitioner"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("practitioner") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <Stethoscope className="h-4 w-4" />
                          Practitioner
                        </Link>
                      </li>
                      {/* <!-- Menu Item Practitioner --> */}

                      {/* <!-- Menu Item Care Team --> */}
                      <li>
                        <Link
                          href="/care-team"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("care-team") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <FlaskConical className="h-4 w-4" />
                          Care Team
                        </Link>
                      </li>
                      {/* <!-- Menu Item Care Team --> */}

                      {/* <!-- Menu Item Device --> */}
                      <li>
                        <Link
                          href="/device"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("device") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <MonitorSpeaker className="h-4 w-4" />
                          Device
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Dropdown Menu End --> */}
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup>

          <SidebarLinkGroup activeCondition={pathname === "/clinical"}>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <Link
                    href="#"
                    className={`$ } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark
                    dark:hover:bg-meta-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    Clinical
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </Link>
                  {/* <!-- Dropdown Menu Start --> */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/" ||
                              pathname.includes("clinical")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Allergy
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Problem
                        </Link>
                      </li>
                      {/* <!-- Menu Item location --> */}

                      {/* <!-- Menu Item organization --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Procedure
                        </Link>
                      </li>
                      {/* <!-- Menu Item organization --> */}

                      {/* <!-- Menu Item Practitioner --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Care Plan
                        </Link>
                      </li>
                      {/* <!-- Menu Item Practitioner --> */}

                      {/* <!-- Menu Item Care Team --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Family History
                        </Link>
                      </li>
                      {/* <!-- Menu Item Care Team --> */}
                    </ul>
                  </div>
                  {/* <!-- Dropdown Menu End --> */}
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup>

          <SidebarLinkGroup activeCondition={pathname === "/clinical"}>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <Link
                    href="#"
                    className={`$ } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark
                    dark:hover:bg-meta-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    Diagnostics
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </Link>
                  {/* <!-- Dropdown Menu Start --> */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/" ||
                              pathname.includes("clinical")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Observation
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Report
                        </Link>
                      </li>
                      {/* <!-- Menu Item location --> */}

                      {/* <!-- Menu Item organization --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Specimen
                        </Link>
                      </li>
                      {/* <!-- Menu Item organization --> */}

                      {/* <!-- Menu Item Practitioner --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Imaging Study
                        </Link>
                      </li>
                      {/* <!-- Menu Item Practitioner --> */}

                      {/* <!-- Menu Item Care Team --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Genomics
                        </Link>
                      </li>
                      {/* <!-- Menu Item Care Team --> */}
                    </ul>
                  </div>
                  {/* <!-- Dropdown Menu End --> */}
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup>

          <SidebarLinkGroup activeCondition={pathname === "/clinical"}>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <Link
                    href="#"
                    className={`$ } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark
                    dark:hover:bg-meta-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    Medications
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </Link>
                  {/* <!-- Dropdown Menu Start --> */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/" ||
                              pathname.includes("clinical")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Medication
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Request
                        </Link>
                      </li>
                      {/* <!-- Menu Item location --> */}

                      {/* <!-- Menu Item organization --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Dispense
                        </Link>
                      </li>
                      {/* <!-- Menu Item organization --> */}

                      {/* <!-- Menu Item Practitioner --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Administration
                        </Link>
                      </li>
                      {/* <!-- Menu Item Practitioner --> */}

                      {/* <!-- Menu Item Care Team --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Statement
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Immunization
                        </Link>
                      </li>

                      {/* <!-- Menu Item Care Team --> */}
                    </ul>
                  </div>
                  {/* <!-- Dropdown Menu End --> */}
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup>

          <SidebarLinkGroup activeCondition={pathname === "/clinical"}>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <Link
                    href="#"
                    className={`$ } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark
                    dark:hover:bg-meta-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    Workflow
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </Link>
                  {/* <!-- Dropdown Menu Start --> */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/" ||
                              pathname.includes("clinical")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Introduction + Task
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Appointment
                        </Link>
                      </li>
                      {/* <!-- Menu Item location --> */}

                      {/* <!-- Menu Item organization --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Schedule
                        </Link>
                      </li>
                      {/* <!-- Menu Item organization --> */}

                      {/* <!-- Menu Item Practitioner --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Referral
                        </Link>
                      </li>
                      {/* <!-- Menu Item Practitioner --> */}

                      {/* <!-- Menu Item Care Team --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Plan Definition
                        </Link>
                      </li>

                      {/* <!-- Menu Item Care Team --> */}
                    </ul>
                  </div>
                  {/* <!-- Dropdown Menu End --> */}
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup>

          <SidebarLinkGroup activeCondition={pathname === "/clinical"}>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <Link
                    href="#"
                    className={`$ } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark
                    dark:hover:bg-meta-4`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    Financial
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </Link>
                  {/* <!-- Dropdown Menu Start --> */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === "/" ||
                              pathname.includes("clinical")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Claim
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Account
                        </Link>
                      </li>
                      {/* <!-- Menu Item location --> */}

                      {/* <!-- Menu Item organization --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Invoice
                        </Link>
                      </li>
                      {/* <!-- Menu Item organization --> */}

                      {/* <!-- Menu Item Practitioner --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Charge Item
                        </Link>
                      </li>
                      {/* <!-- Menu Item Practitioner --> */}

                      {/* <!-- Menu Item Care Team --> */}
                      <li>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes("clinical") &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          Coverage
                        </Link>
                      </li>
                      {/* <!-- Menu Item Care Team --> */}
                    </ul>
                  </div>
                  {/* <!-- Dropdown Menu End --> */}
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup>
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Patient --> */}

              {/* <!-- Menu Item Patient --> */}

              {/* <!-- Menu Item location --> */}

              {/* <!-- Menu Item Device --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
