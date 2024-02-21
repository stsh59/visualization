import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type TUserDetail = {
  name: string;
  email: string;
};

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<TUserDetail>({} as TUserDetail);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`${BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUserDetail(data.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const router = useRouter();

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
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className=" block text-right">
          {userDetail?.name && (
            <Fragment>
              <span className="block text-sm font-medium text-black dark:text-white">
                {userDetail.name}
              </span>
              <span className="block text-xs">{userDetail.email}</span>
            </Fragment>
          )}

          {isLoading && <Loader2 className="animate-spin " />}
        </span>

        <ChevronDown className="h-5 w-5" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-6 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          onClick={() => {
            localStorage.clear();
            router.push("/auth/signin");
          }}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
