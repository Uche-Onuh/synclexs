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
    path: "about-us",
    display: "About us",
  },
  {
    id: "service",
    path: "service",
    display: "Service",
  },
  {
    id: "faq",
    path: "#faq",
    display: "FAQs",
  },
];

export const cards = [
  {
    id: "innovation",
    title: "Innovation",
    text: `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit`,
    icon: FaRegLightbulb,
    bg: "bg-alternate",
  },
  {
    id: "secure",
    title: "Secure deals",
    text: `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit`,
    icon: GrSecure,
    bg: "bg-primary",
  },
  {
    id: "top",
    title: "Top Services",
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
    title: "Experience",
    text: `Lorem ipsum dolor sit amet, consectetur 
            adipisng elit. Sed do eiusmod tempor.`,
  },
  {
    id: "support",
    icon: MdOutlineSupportAgent,
    title: "24/7 Support",
    text: `Lorem ipsum dolor sit amet, consectetur 
            adipisng elit. Sed do eiusmod tempor.`,
  },
  {
    id: "cert",
    icon: GrCertificate,
    title: "Certified",
    text: `Lorem ipsum dolor sit amet, consectetur 
            adipisng elit. Sed do eiusmod tempor.`,
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
    text: `Lorem ipsum dolor sit amet,
          consectetur adipisng elit.`,
    icon: CiLocationOn,
    bg: "bg-grey",
    textCol: "text-black",
  },
  {
    id: "step2",
    head: "Step 2",
    title: "Estimate",
    text: `Lorem ipsum dolor sit amet,
          consectetur adipisng elit.`,
    icon: RiContractLine,
    bg: "bg-alternate",
    textCol: "text-white",
  },
  {
    id: "step3",
    head: "Step 3",
    title: "Deal",
    text: `Lorem ipsum dolor sit amet,
          consectetur adipisng elit.`,
    icon: PiHandshakeThin,
    bg: "bg-grey",
    textCol: "text-black",
  },
];

export const faqs = [
  {
    id: "q1",
    question: "What services does TanahAir Offer?",
    reply: "This is a default reply",
  },
  {
    id: "q2",
    question: "What services does TanahAir Offer?",
    reply: "This is a default reply",
  },
  {
    id: "q3",
    question: "What services does TanahAir Offer?",
    reply: "This is a default reply",
  },
  {
    id: "q4",
    question: "What services does TanahAir Offer?",
    reply: "This is a default reply",
  },
  {
    id: "q5",
    question: "What services does TanahAir Offer?",
    reply: "This is a default reply",
  },
];

export const deals = [
  { id: "1590876546", location: "Alimosho" },
  { id: "1590876547", location: "Kosofe" },
  { id: "1590876548", location: "Lagos Island" },
];
