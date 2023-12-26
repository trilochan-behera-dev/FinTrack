import Link from "next/link";
import { useRouter } from "next/router";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const router = useRouter();
  const page = router.pathname.split("/")[1]

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary dark:text-primarydark capitalize"> {page ? `${page}` : 'Overview'}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
