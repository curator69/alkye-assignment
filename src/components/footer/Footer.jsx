import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mx-auto flex flex-col items-start gap-12 pt-[8rem] pl-[5vw] pb-[10vw] w-[80vw]">
      <div className="flex items-center justify-center gap-10">
        {links.map((link, index) => (
          <Image
            key={index}
            src={link.icon}
            width={50}
            height={50}
            alt={link.alt}
            className="w-6 h-6 md:w-12 md:h-12 cursor-pointe"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {footerLinks.map((link, index) => (
          <p
            key={index}
            className="text-xs leading-6 font-semibold md:text-2xl md:leading-custom-50 cursor-pointer hover:underline underline-offset-[10px]"
          >
            {link.title}
          </p>
        ))}
        {footerLinks.map((link, index) => (
          <p
            key={index}
            className="text-xs leading-6 font-semibold md:text-2xl md:leading-custom-50 cursor-pointer hover:underline underline-offset-[10px]"
          >
            {link.title}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs leading-6 font-semibold md:text-2xl md:leading-custom-50 mt-10 md:mt-20">
        <span>&#169;</span>
        <p>Alkye Test</p>
      </div>
    </footer>
  );
};

export default Footer;

const links = [
  {
    icon: "/facebook-icon.svg",
    alt: "facebook-icon",
  },
  {
    icon: "/instagram-icon.svg",
    alt: "instagram-icon",
  },
  {
    icon: "/twitter-icon.svg",
    alt: "twitter-icon",
  },
  {
    icon: "/twitch-icon.svg",
    alt: "twitch-icon",
  },
  {
    icon: "/youtube-icon.svg",
    alt: "youtube-icon",
  },
];

const footerLinks = [
  {
    title: "Privacy Policy",
  },
  {
    title: "Contact Us",
  },
  {
    title: "Cookie preferences",
  },
  {
    title: "Corporate Information",
  },
];
