import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "@pages/_app";
import Button from "../Button";
import SignOut from "../Svg/signOut";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userinfo } = useContext(UserContext) as any;
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('login-user');
    router.push('login');
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });


  return (
    <div className="relative">
      <div className="flex items-center gap-3 dark:border-strokedark">
          <span className="hidden text-right sm:flex gap-2 ">
            Welcome,
           <Link href="/profile">
              <span className="block text-md font-medium text-primary dark:text-primarydark">
                {'<'} {userinfo?.name?.split(" ")[0]} {'/>'}
              </span>
            </Link>
          </span>
        <span className="h-10 w-10 rounded-full overflow-hidden bg-primary bg-opacity-20 text-black dark:text-white flex items-center justify-center uppercase font-bold">
          {
            userinfo?.photo ?
              <img
                width={60}
                height={60}
                src={userinfo.photo}
                alt="User"
              />
              :
              userinfo?.name?.slice(0, 2)
          }
        </span>
      </div>
      {/* <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >

        
      </Link> */}

      {/* <!-- Dropdown Start --> */}
      {/* <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                  fill=""
                />
                <path
                  d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                  fill=""
                />
              </svg>
              My Profile
            </Link>
          </li>
        </ul>
        <Button
          label={"Sign Out"}
          type={"submit"}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"  
          handleClick={handleLogout}
          icon={<SignOut/>}
        />
      </div> */}
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
