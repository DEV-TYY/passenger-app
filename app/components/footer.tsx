import Link from "next/link";
import { Navigation } from "lucide-react";
import { footerHrefs } from "@/app/data/homepage-data";
import type { HomepageCopy } from "@/app/data/homepage-data";

export function Footer({ t }: { t: HomepageCopy }) {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-xl font-bold text-white">
            <span className="grid size-10 place-items-center rounded-md bg-brand text-white">
              <Navigation size={22} />
            </span>
            MovePlus
          </div>
          <p className="mt-4 max-w-sm leading-7 text-slate-300">
            {t.footer.description}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {t.footer.columns.map((column, columnIndex) => (
            <FooterColumn
              key={column.title}
              title={column.title}
              links={column.links.map((label, linkIndex) => [label, footerHrefs[columnIndex][linkIndex]])}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 grid gap-3 text-sm text-slate-300">
        {links.map(([label, href]) => (
          <Link key={label} href={href} className="hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
