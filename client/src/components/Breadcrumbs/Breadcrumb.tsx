import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold text-primary dark:text-primarydark capitalize">
        {pageName ? `${pageName}` : 'Dashboard'}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary dark:text-primarydark capitalize"> {pageName ? `${pageName}` : 'Overview'}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
