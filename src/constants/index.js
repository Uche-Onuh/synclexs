import { FaRegLightbulb } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const navLinks = [
  {
    id: "home",
    path: "/",
    display: "Home",
  },
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
