type Props = {
  href: string;
  label: string;
  kicker?: string;
  className?: string;
};

export default function NextLabel({ href, label, kicker = "Next", className = "" }: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 md:gap-4 ${className}`}
      data-cursor="grow"
    >
      <span className="text-right leading-none">
        <span className="kicker block opacity-55">{kicker}</span>
        <span className="display mt-2 block text-[clamp(20px,2.6vw,34px)]">{label}</span>
      </span>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-current transition-transform duration-300 group-hover:translate-y-1 md:h-14 md:w-14">
        <svg
          viewBox="0 0 24 24"
          className="next-arrow h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4v15M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
