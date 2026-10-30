import Link from "next/link";

export function CategoryBreadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-[#ebe6de] px-4 py-6 sm:px-6 lg:px-20"
    >
      <ol className="flex items-center gap-2 text-[12px]">
        <li>
          <Link
            href="/"
            className="text-[#605a54] transition-colors hover:text-[#1a1a1a] cursor-pointer"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-[#605a54]">
          ›
        </li>
        <li className="font-semibold text-[#1a1a1a]" aria-current="page">
          Categories
        </li>
      </ol>
    </nav>
  );
}
