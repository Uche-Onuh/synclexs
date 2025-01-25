import { FaRegLightbulb } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuThumbsUp } from "react-icons/lu";
import { GrCertificate } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { RiContractLine } from "react-icons/ri";
import { PiHandshakeThin } from "react-icons/pi";

import { brand1, brand2, brand3 } from "../assets";

export const navLinks = [
  {
    id: "about",
    path: "/#about",
    display: "About us",
  },
  {
    id: "service",
    path: "/#services",
    display: "Service",
  },
  {
    id: "faq",
    path: "/#faqs",
    display: "FAQs",
  },
  {
    id: "contact & support",
    path: "/contact&support",
    display: "Contact & Support",
  },
];

export const cards = [
  {
    id: "innovation",
    title: "Efficient Workflow Management",
    text: `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit`,
    icon: FaRegLightbulb,
    bg: "bg-alternate",
  },
  {
    id: "secure",
    title: "Secure Transaction Processing",
    text: `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit`,
    icon: GrSecure,
    bg: "bg-primary",
  },
  {
    id: "top",
    title: "Timely Updates and Notifications",
    text: `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit`,
    icon: IoMdCheckmarkCircleOutline,
    bg: "bg-alternate",
  },
];

export const badges = [
  {
    id: "exp",
    icon: LuThumbsUp,
    title: "Fee Standardization",
    text: `Snyclexs enforces NBA's fee standards, preventing undercharging while allowing lawyers to set higher rates based on their value. This ensures fair compensation and preserves lawyer autonomy.`,
  },
  {
    id: "support",
    icon: MdOutlineSupportAgent,
    title: "Synergy with NBA",
    text: `Snyclexs, in partnership with the NBA, protects lawyers from undervaluation,akin to pricing controls in other industries, ensuring fair compensation despiteeconomic pressures.`,
  },
  {
    id: "cert",
    icon: GrCertificate,
    title: "Market Impact",
    text: `Snyclexs, in partnership with the NBA, protects lawyers from undervaluation, akin to pricing controls other industries, ensuring fair compensation despite economic pressures.`,
  },
];

export const partners = [
  {
    id: "partner1",
    src: brand1,
  },
  {
    id: "partner2",
    src: brand2,
  },
  {
    id: "partner3",
    src: brand3,
  },
];

export const steps = [
  {
    id: "step1",
    head: "Step 1",
    title: "Locate",
    text: `Snyclexs enforces NBA's fee standards, preventing undercharging while allowing lawyers to set higher rates based on their value. This ensures fair compensation and preserves lawyer autonomy.`,
    icon: CiLocationOn,
    bg: "bg-grey",
    textCol: "text-black",
  },
  {
    id: "step2",
    head: "Step 2",
    title: "Estimate",
    text: `Snyclexs, in partnership with the NBA, protects lawyers from undervaluation, akin to pricing controls in other industries. This approach ensures fair compensation despite economic pressures.`,
    icon: RiContractLine,
    bg: "bg-alternate",
    textCol: "text-white",
  },
  {
    id: "step3",
    head: "Step 3",
    title: "Deal",
    text: `Through strategic partnerships with the NBA, Snyclexs safeguards lawyers against undervaluation. This pricing model ensures competitive and fair compensation while maintaining the integrity of the legal industry.`,
    icon: PiHandshakeThin,
    bg: "bg-grey",
    textCol: "text-black",
  },
];

export const faqs = [
  {
    id: "q1",
    question: "What is Snyclexs?",
    reply:
      "Snyclexs is a cutting-edge platform designed to streamline transaction management for lawyers",
  },
  {
    id: "q2",
    question: "How secure is Snyclexs?",
    reply:
      " Snyclexs employs robust security measures, including encryption and two-factor authentication, to protect sensitive information.",
  },
  {
    id: "q3",
    question: "Can I customize the platform to suit my firm's needs?",
    reply:
      " Yes, Snyclexs offers customization options to accommodate the unique needs of your firm.",
  },
];

export const deals = [
  { id: "1590876546", location: "Alimosho" },
  { id: "1590876547", location: "Kosofe" },
  { id: "1590876548", location: "Lagos Island" },
];

export const options = [
  { value: "Agege", label: "Agege" },
  { value: " Alimosho", label: " Alimosho" },
  { value: "Apapa", label: "Apapa" },
  { value: "Ifako-Ijaye", label: "Ifako-Ijaye" },
  { value: "Ikeja", label: "Ikeja" },
  { value: "Kosofe", label: "Kosofe" },
  { value: "Mushin", label: "Mushin" },
  { value: "Oshodi-Isolo", label: "Oshodi-Isolo" },
  { value: "Shomolu", label: "Shomolu" },
  { value: "Eti-Osa", label: "Eti-Osa" },
  { value: "Lagos Island", label: "Lagos Island" },
  { value: "Lagos Mainland", label: "Lagos Mainland" },
  { value: "Surulere", label: "Surulere" },
  { value: "Ojo", label: "Ojo" },
  { value: "Ajeromi-Ifelodun", label: "Ajeromi-Ifelodun" },
  { value: "Amuwo-Odofin", label: "Amuwo-Odofin" },
  { value: "Badagry", label: "Badagry" },
  { value: "Ikorodu", label: "Ikorodu" },
  { value: "Ibeju-Lekki", label: "Ibeju-Lekki" },
  { value: "Epe", label: "Epe" },
];

export const options2 = [
  {
    id: "conveyancing",
    value: "Conveyancing & Assignments",
    label: "Conveyancing & Assignments",
  },
  { id: "mortgage", value: "Mortgage", label: "Mortgage" },
];
